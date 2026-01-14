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
import { lanSyncService } from '../services/LanSyncService';
import { printMappingConditionService } from '../services/PrintMappingConditionService';
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
    type QueueItem = { searchId: string; options?: SearchOptions };
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

    const handleSearchInternal = useCallback(async (searchId: string, options?: SearchOptions) => {
        const ids = searchId.split(/[\s,;]+/).filter(id => id.length > 0);
        if (ids.length === 0) return;

        // REMOVED HARCODED ZX/WP CHECK - Handled by Print Mapping Conditions

        // CLIENT MODE: Send scan action to Host instead of processing locally
        if (lanSyncService.isClient() && lanSyncService.isConnected()) {
            console.log(`[LanSync] CLIENT mode: Sending scan to Host: ${ids.join(', ')}`);
            for (const id of ids) {
                const upperId = id.toUpperCase();
                // Register pending so we can update currentResult (and print) when result comes back from Host
                lanSyncService.registerPendingPrint(upperId);
                lanSyncService.sendScanAction({
                    orderId: upperId,
                    routeName: '', // Will be resolved by Host
                    timestamp: Date.now(),
                });
            }
            // Clear input and wait for Host to broadcast result
            setOrderId('');
            return;
        }

        // Block operations if token is expired (and API is enabled)
        if (apiSettings.enabled && isTokenExpired()) {
            // ... (token logic remains same)
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

                            // Auto-print label on every scan (skip for remote scans - client will print)
                            if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                                console.log(`[Perf] Queueing print (${(performance.now() - t0).toFixed(0)}ms)`);
                                setPrintStatus('printing');
                                labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, uppercaseId);
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

                            // Auto-print label on every scan (skip for remote scans - client will print)
                            if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                                labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, uppercaseId);
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
                                voiceService.announceStackFull(
                                    result.route.routeConfiguration,
                                    stackInfo.stackNumber - 1,
                                    stackInfo.stackNumber
                                );
                            } else {
                                voiceService.announceRoute(result.route.routeConfiguration, stackInfo.stackNumber);
                            }
                        }

                        // Auto-print label on every scan (skip for remote scans - client will print)
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                            labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, targetId);
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

                        // Auto-print label on every scan (skip for remote scans - client will print)
                        if (apiSettings.autoPrintLabelEnabled && !options?.isRemoteScan) {
                            labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, targetId);
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
                }
            }
        } catch (err: any) {
            setError(err.message || "RESOLUTION ERROR");
            setCurrentResult(null);
            setBatchMode({ active: false, ids: [] });
        } finally {
            setLoading(false);
            if (view === 'operator' && scannerInputRef?.current) {
                setTimeout(() => scannerInputRef.current?.focus(), 50);
            }
        }
    }, [dataSource, view, selectedEventTypes, handleEventInitiated, handleEventFinished, apiSettings, isTokenExpired, history, setHistory, setOperationLog, setShowTokenExpired, scannerInputRef]);


    // Queue processing function - processes one scan at a time to prevent race conditions
    const processNextInQueue = useCallback(async () => {
        if (isProcessingRef.current || processingQueueRef.current.length === 0) {
            return;
        }

        isProcessingRef.current = true;
        const item = processingQueueRef.current.shift()!;

        try {
            await handleSearchInternal(item.searchId, item.options);
        } finally {
            isProcessingRef.current = false;

            // Process next item in queue if any
            if (processingQueueRef.current.length > 0) {
                setTimeout(() => processNextInQueue(), 0);
            }
        }
    }, [handleSearchInternal]);

    // Main search handler - adds scans to queue for sequential processing
    const handleSearch = useCallback(async (searchId: string, options?: SearchOptions) => {
        if (!searchId.trim()) return;

        // Add to queue with options
        processingQueueRef.current.push({ searchId: searchId.trim(), options });

        // Start processing if not already processing
        if (!isProcessingRef.current) {
            processNextInQueue();
        }
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
