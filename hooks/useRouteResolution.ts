import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
    OrderData,
    ResolvedRouteInfo,
    OrderEventStatus,
    ApiSettings,
    EventType
} from '../types';
import {
    MiddlewareChain,
    createOrderLookupMiddleware,
    createRouteResolverMiddleware,
    createEnrichmentMiddleware,
    createEventTriggerMiddleware,
    createPersistenceMiddleware,
    createRemoteLookupMiddleware,
    createPickupScanMiddleware,
    createPlaceholderMiddleware,
} from '../services/MiddlewareChain';
import { executeUnload } from '../services/UnloadService';
import { batchSearchOrders } from '../services/BatchOrderService';
import { FlexibleDataSource } from '../services/RouteService';
import { routeStackService } from '../services/RouteStackService';
import { voiceService } from '../services/VoiceService';
import { labelPrintService } from '../services/LabelPrintService';
import { printMappingConditionService } from '../services/PrintMappingConditionService';
import { apiClient } from '../services/ApiClient';
import { MOCK_ORDERS } from '../constants/mockData';

export interface UseRouteResolutionProps {
    apiSettings: ApiSettings;
    operationLog: Record<string, OrderEventStatus[]>;
    history: ResolvedRouteInfo[];
    setHistory: React.Dispatch<React.SetStateAction<ResolvedRouteInfo[]>>;
    setOperationLog: React.Dispatch<React.SetStateAction<Record<string, OrderEventStatus[]>>>;
    selectedEventTypes: EventType[];
    dataSource: FlexibleDataSource;
    view: string;
    isTokenExpired: () => boolean;
    setShowTokenExpired: (show: boolean) => void;
    scannerInputRef?: React.RefObject<HTMLInputElement>;
}

export interface SearchOptions {
    isRemoteScan?: boolean;
    clientId?: string;
}

export const useRouteResolution = ({
    apiSettings,
    operationLog,
    history,
    setHistory,
    setOperationLog,
    selectedEventTypes,
    dataSource,
    view,
    isTokenExpired,
    setShowTokenExpired,
    scannerInputRef
}: UseRouteResolutionProps) => {

    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentResult, setCurrentResult] = useState<ResolvedRouteInfo | null>(null);
    const [printStatus, setPrintStatus] = useState<'idle' | 'printing'>('idle');
    const [batchMode, setBatchMode] = useState<{ active: boolean; ids: string[] }>({ active: false, ids: [] });

    // Queue item type with options
    type QueueItem = { searchId: string; options?: SearchOptions; resolve?: (result: ResolvedRouteInfo | null) => void };
    const processingQueueRef = useRef<QueueItem[]>([]);
    const isProcessingRef = useRef<boolean>(false);

    const handleEventInitiated = useCallback((id: string, events: OrderEventStatus[]) => {
        setOperationLog(prev => ({ ...prev, [id]: events }));
    }, [setOperationLog]);

    const handleEventFinished = useCallback((id: string, type: EventType, success: boolean, message?: string) => {
        setOperationLog(prev => {
            const orderEvents = prev[id] || [];
            return {
                ...prev,
                [id]: orderEvents.map(e => e.type === type ? { ...e, status: success ? 'SUCCESS' : 'FAILED', message } : e)
            };
        });
    }, [setOperationLog]);

    const handleSearchInternal = useCallback(async (searchId: string, options?: SearchOptions): Promise<ResolvedRouteInfo | null> => {
        const rawIds = searchId.split(/[\s,;]+/).filter(id => id.length > 0);
        if (rawIds.length === 0) return null;

        // GLOBAL RE-SCAN SHORTCUT (Applies to Client & Host, Single & Batch)
        // Filter out IDs that are already successfully resolved to prevent re-assignment/errors
        const idsToProcess: string[] = [];
        let lastCachedResult: ResolvedRouteInfo | null = null;

        for (const id of rawIds) {
            const upperId = id.toUpperCase();
            const existingSuccess = history.find(h => h.orderId === upperId && h.route && h.printedStack);

            if (existingSuccess) {
                console.log(`[Resolution] Re-scan shortcut for ${upperId}: Returning existing result.`);

                // Refresh timestamp but keep data identical (Stack # is LOCKED)
                const refreshedResult = {
                    ...existingSuccess,
                    resolvedAt: new Date().toISOString(),
                    scannedBy: options?.clientId || existingSuccess.scannedBy,
                    // Add unique processId for duplicate display
                    processId: `${existingSuccess.orderId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                };
                lastCachedResult = refreshedResult;

                // ALLOW DUPLICATES in UI: Prepend to history without filtering old one
                setHistory(prev => [refreshedResult, ...prev]);

                // Show in UI
                setCurrentResult(refreshedResult);

                // Re-trigger visual/audio feedback for confirmation
                if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                    labelPrintService.queuePrint(refreshedResult.printedStack!.routeName, refreshedResult.printedStack!.stackNumber, upperId);
                }
                if (apiSettings.voiceEnabled) {
                    // Slightly different tone or logic for re-scan? For now, standard announce is fine.
                    voiceService.announceRoute(refreshedResult.route.routeConfiguration, refreshedResult.printedStack!.stackNumber);
                }

                // Also update operation log to show a fresh "SCAN" event
                handleEventInitiated(upperId, [{ type: 'SCAN', status: 'SUCCESS', timestamp: new Date().toISOString(), message: 'Re-scan (Cached)' }]);

            } else {
                idsToProcess.push(id);
            }
        }

        // If all IDs were cached, return the last one immediately
        if (idsToProcess.length === 0) {
            return lastCachedResult;
        }

        const ids = idsToProcess;

        // CLIENT MODE: Send scan request to REST API server
        // Check if ApiClient is connected to a remote server
        if (apiClient.getIsConnected()) {
            console.log(`[REST API] CLIENT mode: Sending ${ids.length} scan(s) to server`);
            setLoading(true);
            setError(null);

            try {
                for (const id of ids) {
                    const upperId = id.toUpperCase();

                    // Submit scan to server (without dimensions for now)
                    const result = await apiClient.submitScan(upperId);

                    if (result.success && result.route) {
                        // Convert server result to ResolvedRouteInfo format
                        const resolvedResult: ResolvedRouteInfo = {
                            orderId: result.orderId,
                            address: '',
                            date: new Date().toLocaleDateString(),
                            resolvedAt: new Date().toISOString(),
                            route: {
                                zip: '',
                                metroArea: result.route.metroArea || '',
                                state: result.route.state || '',
                                destinationZone: result.route.destinationZone || '',
                                routeConfiguration: result.route.routeName,
                                route2Configuration: '',
                            },
                            stackInfo: result.stack ? {
                                stackNumber: result.stack.stackNumber,
                                currentCount: result.stack.currentCount,
                                capacity: result.stack.capacity,
                                isStackFull: result.stack.isStackFull,
                                isNewStack: result.stack.isNewStack,
                            } : undefined,
                            printedStack: result.stack ? {
                                routeName: result.route.routeName,
                                stackNumber: result.stack.stackNumber,
                                printedAt: new Date().toISOString()
                            } : undefined,
                        };

                        setCurrentResult(resolvedResult);
                        setHistory(prev => [resolvedResult, ...prev.filter(h => h.orderId !== upperId)]);
                        handleEventInitiated(upperId, [{ type: 'SCAN', status: 'SUCCESS', timestamp: new Date().toISOString() }]);

                        // Local printing with server-provided data
                        if (apiSettings.autoPrintLabelEnabled && result.printData) {
                            labelPrintService.queuePrint(
                                result.printData.routeName,
                                result.printData.stackNumber,
                                upperId
                            );
                            setPrintStatus('printing');
                            setTimeout(() => setPrintStatus('idle'), 2000);
                        }

                        // Voice feedback
                        if (apiSettings.voiceEnabled && result.route) {
                            voiceService.announceRoute(
                                result.route.routeName,
                                result.stack?.stackNumber || 1
                            );
                        }
                    } else {
                        // Server returned error or no route (exception)
                        console.log(`[REST API] Scan result for ${upperId}: exception=${result.isException}, error=${result.error}`);
                        handleEventInitiated(upperId, [{ type: 'SCAN', status: result.isException ? 'SUCCESS' : 'FAILED', timestamp: new Date().toISOString(), message: result.error }]);

                        if (apiSettings.autoPrintLabelEnabled && result.isException) {
                            labelPrintService.queueExceptionPrint(upperId);
                        } else if (apiSettings.autoPrintLabelEnabled && result.error) {
                            labelPrintService.queueExceptionPrint(upperId, true, 'ERROR', result.error);
                        }
                        if (apiSettings.voiceEnabled) {
                            voiceService.playError();
                        }
                    }
                }
            } catch (err: any) {
                console.error('[REST API] Connection error:', err);
                setError('SERVER CONNECTION ERROR');
                if (apiSettings.voiceEnabled) {
                    voiceService.playError();
                }
            } finally {
                setLoading(false);
                setOrderId('');
            }
            return;
        }

        // HOST/STANDALONE MODE: Process locally
        // Block operations if token is expired (and API is enabled)
        if (apiSettings.enabled && isTokenExpired()) {
            setError('TOKEN EXPIRED');
            setCurrentResult(null);
            setShowTokenExpired(true);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (ids.length > 1) {
                setBatchMode({ active: true, ids: ids.map(id => id.toUpperCase()) });

                // Batch search all orders first (handles chunking and caching)
                const allIds = ids.map(id => id.toUpperCase());
                const orderDataMap = await batchSearchOrders(allIds, apiSettings);
                console.log(`[Batch] Got ${orderDataMap.size} orders from search`);

                for (const id of ids) {
                    const uppercaseId = id.toUpperCase();

                    // RE-SCAN SHORTCUT:
                    // If this order was ALREADY successfully resolved, return the cached result immediately.
                    // This prevents "Stack #2" reassignment issues and accidental "No route found" on retry.
                    // It ensures the "Stack #" is absolutely immutable for a given session.
                    const existingSuccess = history.find(h => h.orderId === uppercaseId && h.route && h.printedStack);
                    if (existingSuccess) {
                        console.log(`[Resolution] Re-scan shortcut for ${uppercaseId}: Returning existing result.`);

                        // Refresh timestamp but keep data identical
                        const refreshedResult = {
                            ...existingSuccess,
                            resolvedAt: new Date().toISOString(),
                            scannedBy: options?.clientId || existingSuccess.scannedBy
                        };

                        // Move to top of history
                        setHistory(prev => [refreshedResult, ...prev.filter(h => h.orderId !== uppercaseId)]);

                        // Re-trigger visual/audio feedback for confirmation
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                            // Optional: debounce or skip print on re-scan if desired. 
                            // For now, consistent with user request "I support duplicate printing"
                            labelPrintService.queuePrint(refreshedResult.printedStack!.routeName, refreshedResult.printedStack!.stackNumber, uppercaseId);
                        }
                        if (apiSettings.voiceEnabled) {
                            voiceService.announceRoute(refreshedResult.route.routeConfiguration, refreshedResult.printedStack!.stackNumber);
                        }

                        return refreshedResult; // Return immediately
                    }

                    const cachedOrder = orderDataMap.get(uppercaseId);

                    // Print Condition Pool Check - before route resolution
                    if (printMappingConditionService.isEnabled()) {
                        const checkResult = printMappingConditionService.checkOrder(uppercaseId, cachedOrder?.zipCode);
                        console.log(`[Resolution] Condition Check for ${uppercaseId}: allowed=${checkResult.allowed}`, checkResult);

                        if (!checkResult.allowed) {
                            console.log(`[Resolution] ENTERING FILTER BLOCK. Reason: ${checkResult.reason}`);

                            // LOGIC: If Blocked block Blacklist (exclude rule) -> Print the raw string (Special handling)
                            // If just not Whitelisted -> Print Exception (Default handling) or nothing?
                            // User request: "If matched blacklist, print this string out"

                            if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                                // STRICT REQUIREMENT: If condition fails (blacklist or not whitelisted), PRINT NOTHING.
                                console.log('[PrintCondition] Item filtered/blocked. Enforcing SILENCE (No Print).');
                                /* 
                                if (checkResult.reason?.includes('Blocked by Blacklist')) {
                                    // It's a Blacklisted item (Special Exception) -> Print with custom labels
                                    console.log('[PrintCondition] Printing SPECIAL EXCEPTION for blocked item');
                                    labelPrintService.queueExceptionPrint(uppercaseId, true, 'BLOCKED', 'CONDITION FILTER');
                                } else {
                                    // Not whitelisted -> Normal Exception -> STOP -> DO NOT PRINT
                                    // Previously this was falling through or printing default exception?
                                    // We explicitly enforce NO PRINT here.
                                    console.log('[PrintCondition] Item filtered (not in whitelist). Skipping print.');
                                }
                                */
                            }

                            // Record to history as filtered exception
                            const exceptionResult: ResolvedRouteInfo = {
                                orderId: uppercaseId,
                                address: cachedOrder?.deliveryAddress || '',
                                date: new Date().toLocaleDateString(),
                                resolvedAt: new Date().toISOString(),
                                exceptionReason: `FILTERED: ${checkResult.reason}`,
                                scannedBy: options?.clientId,
                            };
                            setHistory(prev => [exceptionResult, ...prev.filter(h => h.orderId !== uppercaseId)]);
                            handleEventInitiated(uppercaseId, [{ type: 'SCAN', status: 'FAILED', timestamp: new Date().toISOString(), message: 'Condition not met' }]);
                            if (apiSettings.voiceEnabled) voiceService.playError();
                            continue; // Skip further processing
                        }
                    }

                    // Build initial data from cache
                    const initialData: OrderData = {
                        orderId: uppercaseId,
                        address: cachedOrder?.deliveryAddress || "",
                        date: new Date().toLocaleDateString(),
                        zipCode: cachedOrder?.zipCode || "",
                        weight: cachedOrder?.weight || 0,
                    };

                    // Check if UNLOAD is selected - use separate flow
                    if (selectedEventTypes.includes('UNLOAD')) {
                        // Start tracking latency
                        const t0 = performance.now();
                        console.log(`[Perf] Start processing ${uppercaseId}`);

                        // Run route resolution with cached data (skip remote lookup)
                        const chain = new MiddlewareChain();
                        chain
                            .use(createPlaceholderMiddleware(history))
                            .use(createOrderLookupMiddleware())
                            .use(createRouteResolverMiddleware(dataSource))
                            .use(createEnrichmentMiddleware());

                        const result = await chain.run(initialData);
                        console.log(`[Perf] Route resolved (${(performance.now() - t0).toFixed(0)}ms)`);

                        // Add stack tracking if route was resolved
                        if (result.route?.routeConfiguration) {
                            const stackInfo = routeStackService.addToStack(
                                result.route.routeConfiguration,
                                uppercaseId,
                                { weight: cachedOrder?.weight || 0, volume: cachedOrder?.volume || 0 }
                            );
                            result.stackInfo = stackInfo;

                            // Voice announcement (optional for batch, can be noisy)
                            if (apiSettings.voiceEnabled && ids.length === 1) {
                                if (stackInfo.isNewStack && stackInfo.stackNumber > 1) {
                                    voiceService.announceStackFull(
                                        result.route.routeConfiguration,
                                        stackInfo.stackNumber - 1,
                                        stackInfo.stackNumber
                                    );
                                } else {
                                    voiceService.announceRoute(result.route.routeConfiguration, stackInfo.stackNumber);
                                }
                            }

                            // ALWAYS set printedStack when route is resolved (regardless of print settings)
                            // This is the AUTHORITATIVE stack assignment for this order
                            const existingRecord = history.find(h => h.orderId === uppercaseId);
                            if (existingRecord?.printedStack) {
                                // Preserve existing printedStack - use the ORIGINAL stack assignment
                                result.printedStack = existingRecord.printedStack;
                                console.log(`[PrintedStack] Preserved existing: ${existingRecord.printedStack.routeName} #${existingRecord.printedStack.stackNumber}`);
                            } else {
                                // First scan: Lock printedStack
                                result.printedStack = {
                                    routeName: result.route.routeConfiguration,
                                    stackNumber: stackInfo.stackNumber,
                                    printedAt: new Date().toISOString()
                                };
                                console.log(`[PrintedStack] New assignment: ${result.printedStack.routeName} #${result.printedStack.stackNumber}`);
                            }

                            // Auto-print label on every scan (skip for remote scans - client will print)
                            if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                                console.log(`[Perf] Queueing print (${(performance.now() - t0).toFixed(0)}ms)`);
                                setPrintStatus('printing');
                                // Print labels with the LOCKED stack number (from printedStack)
                                labelPrintService.queuePrint(result.printedStack.routeName, result.printedStack.stackNumber, uppercaseId);
                                // Reset status after a short delay to simulate completion (or use event if we had one)
                                setTimeout(() => setPrintStatus('idle'), 2000);
                            }
                        } else {
                            if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                                labelPrintService.queueExceptionPrint(uppercaseId);
                            }
                            if (apiSettings.voiceEnabled) voiceService.playError();
                        }

                        // Add scannedBy for remote scan tracking
                        if (options?.clientId) result.scannedBy = options.clientId;
                        setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)]);

                        // Execute unload separately
                        handleEventInitiated(uppercaseId, [{ type: 'UNLOAD', status: 'PENDING', timestamp: new Date().toISOString() }]);
                        try {
                            await executeUnload(uppercaseId, apiSettings, handleEventFinished);
                        } catch (error: any) {
                            if (error.isTokenExpired) {
                                setShowTokenExpired(true);
                                handleEventFinished(uppercaseId, 'UNLOAD', false, error.originalMessage);
                            } else {
                                throw error;
                            }
                        }
                    } else {
                        // Use middleware chain for non-UNLOAD events (skip remote lookup, use cached data)

                        // If no event types selected, record a generic 'SCAN' event so it appears in history
                        if (selectedEventTypes.length === 0) {
                            handleEventInitiated(uppercaseId, [{ type: 'SCAN', status: 'SUCCESS', timestamp: new Date().toISOString() }]);
                        }

                        const chain = new MiddlewareChain();
                        chain
                            .use(createPlaceholderMiddleware(history))
                            .use(createOrderLookupMiddleware())
                            .use(createRouteResolverMiddleware(dataSource))
                            .use(createEventTriggerMiddleware(selectedEventTypes, handleEventInitiated, handleEventFinished))
                            .use(createPickupScanMiddleware(apiSettings, handleEventFinished));

                        const result = await chain.run(initialData);

                        // Add stack tracking if route was resolved
                        if (result.route?.routeConfiguration) {
                            const stackInfo = routeStackService.addToStack(
                                result.route.routeConfiguration,
                                uppercaseId,
                                { weight: cachedOrder?.weight || 0, volume: cachedOrder?.volume || 0 }
                            );
                            result.stackInfo = stackInfo;

                            // Voice announcement (optional for batch, can be noisy)
                            if (apiSettings.voiceEnabled && ids.length === 1) {
                                if (stackInfo.isNewStack && stackInfo.stackNumber > 1) {
                                    voiceService.announceStackFull(
                                        result.route.routeConfiguration,
                                        stackInfo.stackNumber - 1,
                                        stackInfo.stackNumber
                                    );
                                } else {
                                    voiceService.announceRoute(result.route.routeConfiguration, stackInfo.stackNumber);
                                }
                            }
                            // ALWAYS set printedStack when route is resolved
                            const existingRecord = history.find(h => h.orderId === uppercaseId);
                            if (existingRecord?.printedStack) {
                                result.printedStack = existingRecord.printedStack;
                            } else {
                                result.printedStack = {
                                    routeName: result.route.routeConfiguration,
                                    stackNumber: stackInfo.stackNumber,
                                    printedAt: new Date().toISOString()
                                };
                            }

                            // Auto-print label on every scan (skip for remote scans - client will print)
                            if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                                labelPrintService.queuePrint(result.printedStack.routeName, result.printedStack.stackNumber, uppercaseId);
                            }
                        } else {
                            // EXCEPTION: No route found
                            if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                                labelPrintService.queueExceptionPrint(uppercaseId);
                            }
                            if (apiSettings.voiceEnabled) voiceService.playError();
                        }

                        // Add scannedBy for remote scan tracking
                        if (options?.clientId) result.scannedBy = options.clientId;
                        setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)]);
                    }
                }

                setCurrentResult(null);
                setOrderId('');
            } else {
                setBatchMode({ active: false, ids: [] });
                const targetId = ids[0].toUpperCase();

                // Print Condition Pool Check - before route resolution (single order)
                if (printMappingConditionService.isEnabled()) {
                    const checkResult = printMappingConditionService.checkOrder(targetId);
                    if (!checkResult.allowed) {
                        console.log(`[PrintCondition] Order ${targetId} filtered: ${checkResult.reason}`);
                        // Print exception label (skip for remote scans)
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                            // STRICT REQUIREMENT: Fail condition -> No Print.
                            console.log('[PrintCondition] Filtered order. Skipping print.');
                            // labelPrintService.queueExceptionPrint(targetId);
                        }
                        // Show as filtered exception
                        const exceptionResult: ResolvedRouteInfo = {
                            orderId: targetId,
                            address: '',
                            date: new Date().toLocaleDateString(),
                            resolvedAt: new Date().toISOString(),
                            exceptionReason: `FILTERED: ${checkResult.reason}`,
                            scannedBy: options?.clientId,
                        };
                        setCurrentResult(exceptionResult);
                        setHistory(prev => [exceptionResult, ...prev.filter(h => h.orderId !== targetId)]);
                        handleEventInitiated(targetId, [{ type: 'SCAN', status: 'FAILED', timestamp: new Date().toISOString(), message: 'Condition not met' }]);
                        if (apiSettings.voiceEnabled) voiceService.playError();
                        setOrderId('');
                        setLoading(false);
                        return; // Exit early
                    }
                }

                // Check if UNLOAD is selected - use separate flow for unload, but still resolve route
                if (selectedEventTypes.includes('UNLOAD')) {
                    // Run route resolution without ordersSearch
                    const initialOrder = MOCK_ORDERS[targetId] || { orderId: targetId, address: "", date: new Date().toLocaleDateString() };

                    const chain = new MiddlewareChain();
                    chain
                        .use(createRemoteLookupMiddleware(apiSettings)) // Need ordersSearch to get address/zip
                        .use(createOrderLookupMiddleware())
                        .use(createRouteResolverMiddleware(dataSource))
                        .use(createEnrichmentMiddleware());

                    const result = await chain.run(initialOrder);

                    // Add stack tracking if route was resolved
                    if (result.route?.routeConfiguration) {
                        const stackInfo = routeStackService.addToStack(
                            result.route.routeConfiguration,
                            targetId,
                            { weight: result.weight || 0, volume: result.volume || 0 }
                        );
                        result.stackInfo = stackInfo;

                        // Voice announcement
                        if (apiSettings.voiceEnabled) {
                            if (stackInfo.isNewStack && stackInfo.stackNumber > 1) {
                                // Stack full warning
                                voiceService.announceStackFull(
                                    result.route.routeConfiguration,
                                    stackInfo.stackNumber - 1,
                                    stackInfo.stackNumber
                                );
                            } else {
                                // Normal route announcement
                                voiceService.announceRoute(result.route.routeConfiguration, stackInfo.stackNumber);
                            }
                        }

                        // ALWAYS set printedStack when route is resolved
                        const existingRecord = history.find(h => h.orderId === targetId);
                        if (existingRecord?.printedStack) {
                            result.printedStack = existingRecord.printedStack;
                        } else {
                            result.printedStack = {
                                routeName: result.route.routeConfiguration,
                                stackNumber: stackInfo.stackNumber,
                                printedAt: new Date().toISOString()
                            };
                        }

                        // Auto-print label on every scan (skip for remote scans - client will print)
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                            labelPrintService.queuePrint(result.printedStack.routeName, result.printedStack.stackNumber, targetId);
                        }
                    } else {
                        // EXCEPTION
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                            labelPrintService.queueExceptionPrint(targetId);
                        }
                        if (apiSettings.voiceEnabled) voiceService.playError();
                    }

                    setCurrentResult(result);
                    // Add scannedBy for remote scan tracking
                    if (options?.clientId) result.scannedBy = options.clientId;

                    // Add a unique processId to allow duplicates in Activity Stream
                    result.processId = `${result.orderId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

                    // ALLOW DUPLICATES in history (for Activity Stream)
                    // We do NOT filter out old entries anymore. This allows the stream to show A -> B -> A sequence.
                    // RouteStackManager handles deduplication internally for stack state.
                    setHistory(prev => [result, ...prev]);

                    // Execute unload separately

                    handleEventInitiated(targetId, [{ type: 'UNLOAD', status: 'PENDING', timestamp: new Date().toISOString() }]);
                    try {
                        await executeUnload(targetId, apiSettings, handleEventFinished);
                    } catch (error: any) {
                        if (error.isTokenExpired) {
                            setShowTokenExpired(true);
                            handleEventFinished(targetId, 'UNLOAD', false, error.originalMessage);
                        } else {
                            throw error;
                        }
                    }
                    setOrderId('');
                } else {
                    // Use middleware chain for non-UNLOAD events
                    const initialOrder = MOCK_ORDERS[targetId] || { orderId: targetId, address: "", date: new Date().toLocaleDateString() };

                    // If no event types selected, record a generic 'SCAN' event so it appears in history
                    if (selectedEventTypes.length === 0) {
                        handleEventInitiated(targetId, [{ type: 'SCAN', status: 'SUCCESS', timestamp: new Date().toISOString() }]);
                    }

                    const chain = new MiddlewareChain();
                    chain
                        .use(createPersistenceMiddleware((id) => console.log(`Processing ${id}...`)))
                        .use(createRemoteLookupMiddleware(apiSettings))
                        .use(createOrderLookupMiddleware())
                        .use(createRouteResolverMiddleware(dataSource))
                        .use(createEventTriggerMiddleware(selectedEventTypes, handleEventInitiated, handleEventFinished))
                        .use(createPickupScanMiddleware(apiSettings, handleEventFinished))
                        .use(createEnrichmentMiddleware());

                    const result = await chain.run(initialOrder);


                    // Add stack tracking if route was resolved
                    if (result.route?.routeConfiguration) {
                        const existingRecord = history.find(h => h.orderId === targetId);

                        // AUTHORITATIVE STACK LOGIC:
                        // If order already has a printedStack, we MUST reuse it.
                        // We do not ask the routeStackService for a new assignment because that would
                        // incorrectly treat it as a new "unit" taking up space, or assign a new stack number.

                        if (existingRecord?.printedStack) {
                            console.log(`[Resolution] Re-scan of ${targetId}: Preserving authoritative stack #${existingRecord.printedStack.stackNumber}`);
                            result.printedStack = existingRecord.printedStack;

                            // Mock stackInfo for consistency, but don't call addToStack logic that increments counters
                            // (or we can call a specific method to 'refresh' without adding new capacity logic if needed, 
                            // but for now we assume re-scan shouldn't change capacity state)
                            result.stackInfo = {
                                stackNumber: existingRecord.printedStack.stackNumber,
                                isNewStack: false,
                                currentCount: 0, // Placeholder
                                capacity: 0, // Placeholder 
                                isStackFull: false
                            };
                        } else {
                            // New scan: Assign to stack normally
                            const stackInfo = routeStackService.addToStack(
                                result.route.routeConfiguration,
                                targetId,
                                { weight: result.weight || 0, volume: result.volume || 0 }
                            );
                            result.stackInfo = stackInfo;

                            // Create new printedStack assignment
                            result.printedStack = {
                                routeName: result.route.routeConfiguration,
                                stackNumber: stackInfo.stackNumber,
                                printedAt: new Date().toISOString()
                            };

                            // Voice announcement
                            if (apiSettings.voiceEnabled) {
                                if (stackInfo.isNewStack && stackInfo.stackNumber > 1) {
                                    voiceService.announceStackFull(
                                        result.route.routeConfiguration,
                                        stackInfo.stackNumber - 1,
                                        stackInfo.stackNumber
                                    );
                                } else {
                                    voiceService.announceRoute(result.route.routeConfiguration, stackInfo.stackNumber);
                                }
                            }
                        }

                        // Auto-print label logic (only for new scans or forced reprints - usually skipping duplicates unless configured otherwise)
                        // Requirement: If it's a re-scan, we typically just show the info.
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan && !existingRecord?.printedStack) {
                            labelPrintService.queuePrint(result.printedStack.routeName, result.printedStack.stackNumber, targetId);
                        }
                    } else {

                        // EXCEPTION
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                            labelPrintService.queueExceptionPrint(targetId);
                        }
                        if (apiSettings.voiceEnabled) voiceService.playError();
                    }

                    setCurrentResult(result);
                    // Add scannedBy for remote scan tracking
                    if (options?.clientId) result.scannedBy = options.clientId;
                    setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)]);
                    setOrderId('');

                    return result; // Return result specifically for API/direct use
                }
            }
        } catch (err: any) {
            setError(err.message || "RESOLUTION ERROR");
            setCurrentResult(null);
            setBatchMode({ active: false, ids: [] });
            return null;
        } finally {
            setLoading(false);
            if (view === 'operator' && scannerInputRef?.current) {
                setTimeout(() => scannerInputRef.current?.focus(), 50);
            }
        }
        return null; // Fallback return
    }, [dataSource, view, selectedEventTypes, handleEventInitiated, handleEventFinished, apiSettings, isTokenExpired, history, setHistory, setOperationLog, setShowTokenExpired, scannerInputRef]);


    // Queue processing function - processes one scan at a time to prevent race conditions
    const processNextInQueue = useCallback(async () => {
        if (isProcessingRef.current || processingQueueRef.current.length === 0) {
            return;
        }

        isProcessingRef.current = true;
        const item = processingQueueRef.current.shift()!;

        try {
            const result = await handleSearchInternal(item.searchId, item.options);
            if (item.resolve) item.resolve(result);
        } catch (e) {
            console.error('Queue processing error:', e);
            if (item.resolve) item.resolve(null);
        } finally {
            isProcessingRef.current = false;

            // Process next item in queue if any
            if (processingQueueRef.current.length > 0) {
                setTimeout(() => processNextInQueue(), 0);
            }
        }
    }, [handleSearchInternal]);

    // Main search handler - adds scans to queue for sequential processing
    const handleSearch = useCallback((searchId: string, options?: SearchOptions): Promise<ResolvedRouteInfo | null> => {
        return new Promise((resolve) => {
            if (!searchId.trim()) {
                resolve(null);
                return;
            }

            // Add to queue with options and resolve callback
            processingQueueRef.current.push({ searchId: searchId.trim(), options, resolve });

            // Start processing if not already processing
            if (!isProcessingRef.current) {
                processNextInQueue();
            }
        });
    }, [processNextInQueue]);

    return {
        orderId,
        setOrderId,
        loading,
        error,
        setError,
        currentResult,
        setCurrentResult,
        printStatus,
        batchMode,
        setBatchMode,
        handleSearch,
        handleEventInitiated,
        handleEventFinished
    };
};
