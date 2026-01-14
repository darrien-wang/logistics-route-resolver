import React, { useEffect, useCallback, useState } from 'react';
import { RouteStackState, ResolvedRouteInfo, OrderEventStatus, PrintMappingConditionState, ApiSettings } from '../types';
import { lanSyncService, SYNC_EVENTS, ConnectionStatus } from '../services/LanSyncService';
import { routeStackService } from '../services/RouteStackService';
import { printMappingConditionService } from '../services/PrintMappingConditionService';
import { labelPrintService } from '../services/LabelPrintService';
import { SearchOptions } from './useRouteResolution';

export interface UseLanSyncProps {
    history: ResolvedRouteInfo[];
    operationLog: Record<string, OrderEventStatus[]>;
    stackDefs: any[];
    apiSettings: ApiSettings;
    setHistory: React.Dispatch<React.SetStateAction<ResolvedRouteInfo[]>>;
    setOperationLog: React.Dispatch<React.SetStateAction<Record<string, OrderEventStatus[]>>>;
    setStackDefs: React.Dispatch<React.SetStateAction<any[]>>;
    setCurrentResult?: React.Dispatch<React.SetStateAction<ResolvedRouteInfo | null>>;
    handleSearch: (orderId: string, options?: SearchOptions) => Promise<void>;
}

export const useLanSync = ({
    history,
    operationLog,
    stackDefs,
    apiSettings,
    setHistory,
    setOperationLog,
    setStackDefs,
    setCurrentResult,
    handleSearch
}: UseLanSyncProps) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(lanSyncService.getConnectionStatus());

    // Wrapper for manual sync request with loading state
    const requestSync = useCallback((amount: 'full' | number = 'full') => {
        setIsSyncing(true);
        lanSyncService.requestSync(amount);

        // Safety timeout to clear loading state if no response
        setTimeout(() => setIsSyncing(false), 10000);
    }, []);

    // Create full state snapshot for initial sync (new client connections)
    const createFullStateSnapshot = useCallback(() => ({
        routeStacks: routeStackService.serializeState(),
        history, // Full history for initial client sync
        operationLog,
        stackDefs,
        printConditions: printMappingConditionService.serializeState(),
        timestamp: Date.now(),
        isFullSync: true, // Flag for client to know this is full sync
    }), [history, operationLog, stackDefs]);

    // Create incremental snapshot for regular broadcasts (last 200 entries only)
    const createIncrementalSnapshot = useCallback(() => ({
        routeStacks: routeStackService.serializeState(),
        history: history.slice(0, 200), // Only last 200 for regular updates
        operationLog,
        stackDefs,
        printConditions: printMappingConditionService.serializeState(),
        timestamp: Date.now(),
        isFullSync: false, // Flag for incremental update
    }), [history, operationLog, stackDefs]);

    // Broadcast function for HOST mode - uses incremental snapshot for regular updates
    const broadcastState = useCallback(() => {
        if (lanSyncService.isHost() && window.electron?.broadcastSyncState) {
            const incrementalState = createIncrementalSnapshot();
            console.log('[LanSync] Broadcasting incremental state', {
                timestamp: incrementalState.timestamp,
                historyCount: incrementalState.history?.length || 0,
                stackDefsCount: incrementalState.stackDefs?.length || 0,
            });
            window.electron.broadcastSyncState(incrementalState);
        }
    }, [createIncrementalSnapshot]);

    // LAN Sync integration - Full state synchronization
    useEffect(() => {
        // Attempt auto-reconnect from saved config on mount
        lanSyncService.attemptAutoReconnect().then(reconnected => {
            if (reconnected) {
                // Update local state if mode changed due to reconnect
                setConnectionStatus(lanSyncService.getConnectionStatus());
            }
        });

        // Setup Host mode: broadcast state changes to clients
        const handleStateChange = () => {
            if (window.electron?.broadcastSyncState && lanSyncService.isHost()) {
                const fullState = createFullStateSnapshot();
                window.electron.broadcastSyncState(fullState);
                console.log('[LanSync] Broadcasting full state to clients');
            }
        };

        routeStackService.onStateChange(handleStateChange);

        // Subscription to connection status changes (Single Source of Truth)
        const handleStatusChange = (status: ConnectionStatus) => {
            console.log('[useLanSync] Connection status updated:', status);
            setConnectionStatus(status);
        };
        lanSyncService.on('status', handleStatusChange);

        // Setup Host mode: listen for scan actions from clients
        const cleanup = window.electron?.onSyncServerMessage?.((message: any) => {
            if (message.event === SYNC_EVENTS.ACTION_SCAN) {
                // Execute scan action on behalf of client (skip printing - client will print locally)
                const { orderId, clientName } = message.data;
                const clientId = message.clientId;
                console.log(`[LanSync] Processing remote scan from client ${clientName || clientId}: ${orderId}`);

                // Pass isRemoteScan=true to skip printing on Host
                // Use clientName if available for better display, otherwise fallback to ID
                // The Host will process and update state, then broadcast
                handleSearch(orderId, { isRemoteScan: true, clientId: clientName || clientId });
            } else if (message.event === 'client:connected') {
                // Send full state sync to newly connected client
                console.log(`[LanSync] New client connected: ${message.clientId}`);
                const fullState = createFullStateSnapshot();
                if (window.electron?.syncStateToClient) {
                    window.electron.syncStateToClient(message.clientId, fullState);
                }
            } else if (message.event === 'client:requestSync') {
                // Client requesting sync with configurable amount
                const requestedAmount = message.data?.amount || 'full'; // 'full', 200, 500, etc.
                console.log(`[LanSync] Client ${message.clientId} requesting sync: ${requestedAmount}`);

                let syncState;
                if (requestedAmount === 'full') {
                    syncState = createFullStateSnapshot();
                } else {
                    // Create snapshot with specific amount
                    const amount = parseInt(requestedAmount) || 200;
                    syncState = {
                        routeStacks: routeStackService.serializeState(),
                        history: history.slice(0, amount),
                        operationLog,
                        stackDefs,
                        printConditions: printMappingConditionService.serializeState(),
                        timestamp: Date.now(),
                        isFullSync: amount >= history.length, // Mark as full if requesting more than available
                    };
                }

                console.log(`[LanSync] Sending ${syncState.history?.length || 0} history items to client`);
                if (window.electron?.syncStateToClient) {
                    window.electron.syncStateToClient(message.clientId, syncState);
                }
            } else if (message.event === 'client:pushData') {
                // Client pushing local data to Host
                const clientHistory = message.data?.history as ResolvedRouteInfo[];
                const clientName = message.data?.clientName || message.clientId;
                console.log(`[LanSync] Received data push from ${clientName}:`, clientHistory?.length || 0, 'items');

                if (clientHistory && clientHistory.length > 0) {
                    // Filter out existing orders using current history state
                    const existingIds = new Set(history.map(h => h.orderId));
                    const newEntries = clientHistory.filter(h => !existingIds.has(h.orderId));

                    if (newEntries.length > 0) {
                        console.log(`[LanSync] Processing ${newEntries.length} new items from ${clientName}`);

                        // Process into Stack Service (Host Authority) and tag source
                        const processedEntries = newEntries.map(entry => {
                            let stackInfo = entry.stackInfo;

                            // Re-calculate stack info on Host to ensure global consistency
                            if (entry.route?.routeConfiguration) {
                                try {
                                    stackInfo = routeStackService.addToStack(
                                        entry.route.routeConfiguration,
                                        entry.orderId,
                                        {
                                            weight: entry.weight || 0,
                                            volume: entry.volume || 0
                                        }
                                    );
                                } catch (error) {
                                    console.warn(`[LanSync] Failed to add remote order ${entry.orderId} to stack:`, error);
                                }
                            }

                            return {
                                ...entry,
                                stackInfo, // Use authoritative stack info from Host
                                scannedBy: entry.scannedBy || clientName
                            };
                        });

                        // Update history state
                        setHistory(prev => {
                            // Double-check duplicates in case of race condition
                            const finalNew = processedEntries.filter(e => !prev.some(p => p.orderId === e.orderId));
                            return [...finalNew, ...prev].sort((a, b) =>
                                new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
                            );
                        });
                    } else {
                        console.log('[LanSync] No unique new items to merge from push');
                    }
                }
            }
        });

        // Setup Client mode: receive and apply full state from Host
        const handleSyncState = (fullState: any) => {
            console.log('[LanSync] Received full state sync from Host', {
                hasRouteStacks: !!fullState.routeStacks,
                hasHistory: !!fullState.history,
                historyCount: fullState.history?.length || 0,
                hasStackDefs: !!fullState.stackDefs,
                stackDefsCount: fullState.stackDefs?.length || 0,
            });
            if (fullState.routeStacks) {
                routeStackService.applyRemoteState(fullState.routeStacks);
            }
            if (fullState.history) {
                setHistory(fullState.history);
            }
            if (fullState.operationLog) {
                setOperationLog(fullState.operationLog);
            }
            if (fullState.stackDefs) {
                console.log('[LanSync] Applying stackDefs:', fullState.stackDefs.length, 'stacks');
                setStackDefs(fullState.stackDefs);
            }
            if (fullState.printConditions) {
                printMappingConditionService.applyRemoteState(fullState.printConditions);
            }
        };

        const handleStateUpdate = (fullState: any) => {
            setIsSyncing(false); // Clear loading state on response
            console.log('[LanSync] Received state update from Host', {
                hasRouteStacks: !!fullState.routeStacks,
                hasHistory: !!fullState.history,
                historyCount: fullState.history?.length || 0,
                hasStackDefs: !!fullState.stackDefs,
                stackDefsCount: fullState.stackDefs?.length || 0,
                isFullSync: fullState.isFullSync,
            });
            if (fullState.routeStacks) {
                routeStackService.applyRemoteState(fullState.routeStacks);
            }
            if (fullState.history) {
                const incomingHistory = fullState.history as ResolvedRouteInfo[];

                // Debug: Check how many synced orders have route info
                const historyWithRoute = incomingHistory.filter(h => h.route?.routeConfiguration);
                console.log('[LanSync] Synced history route check:', {
                    total: incomingHistory.length,
                    withRoute: historyWithRoute.length,
                    withoutRoute: incomingHistory.length - historyWithRoute.length,
                    isFullSync: fullState.isFullSync,
                });

                if (fullState.isFullSync) {
                    // Full sync: replace all history
                    console.log('[LanSync] Full sync - replacing all history');
                    setHistory(incomingHistory);
                } else {
                    // Incremental sync: merge new entries with existing history
                    setHistory(prev => {
                        const existingIds = new Set(prev.map(h => h.orderId));
                        const newEntries = incomingHistory.filter(h => !existingIds.has(h.orderId));
                        console.log('[LanSync] Incremental sync - merging', {
                            existing: prev.length,
                            incoming: incomingHistory.length,
                            newEntries: newEntries.length,
                        });
                        // Add new entries to the front and sort by timestamp (most recent first)
                        return [...newEntries, ...prev].sort((a, b) =>
                            new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
                        );
                    });
                }

                // CLIENT MODE: Process pending prints AND update currentResult for display
                // Check if any orders we scanned are now in history with route info
                const pendingPrints = lanSyncService.getPendingPrints();
                if (lanSyncService.isClient() && pendingPrints.length > 0) {
                    const historyArray = fullState.history as ResolvedRouteInfo[];
                    pendingPrints.forEach(orderId => {
                        const result = historyArray.find(h => h.orderId === orderId);
                        if (result) {
                            // CLIENT MODE: Update currentResult to display route info in OperatorView
                            if (setCurrentResult) {
                                console.log(`[LanSync] Client setting currentResult for: ${orderId}`);
                                setCurrentResult(result);
                            }

                            // Handle printing
                            if (apiSettings.autoPrintLabelEnabled) {
                                if (result.route?.routeConfiguration && result.stackInfo) {
                                    // Found matching order with route - print locally
                                    console.log(`[LanSync] Client printing for scanned order: ${orderId}`);
                                    labelPrintService.queuePrint(
                                        result.route.routeConfiguration,
                                        result.stackInfo.stackNumber,
                                        orderId
                                    );
                                } else if (result.exceptionReason) {
                                    // Exception - print exception label
                                    console.log(`[LanSync] Client printing exception for: ${orderId}`);
                                    labelPrintService.queueExceptionPrint(orderId);
                                }
                            }
                            // Remove from pending
                            lanSyncService.clearPendingPrint(orderId);
                        }
                    });
                }
            }
            if (fullState.operationLog) {
                setOperationLog(fullState.operationLog);
            }
            if (fullState.stackDefs) {
                console.log('[LanSync] Applying stackDefs update:', fullState.stackDefs.length, 'stacks');
                setStackDefs(fullState.stackDefs);
            }
            if (fullState.printConditions) {
                printMappingConditionService.applyRemoteState(fullState.printConditions);
            }
        };

        const handleConnection = () => {
            if (lanSyncService.isClient() && history.length > 0) {
                console.log('[LanSync] Connection established - Pushing local data to Host...');
                lanSyncService.pushDataToHost(history);
            }
        };

        lanSyncService.on(SYNC_EVENTS.SYNC_STATE, handleSyncState);
        lanSyncService.on(SYNC_EVENTS.STATE_UPDATE, handleStateUpdate);
        lanSyncService.on(SYNC_EVENTS.CONNECTION, handleConnection);

        return () => {
            routeStackService.offStateChange(handleStateChange);
            lanSyncService.off(SYNC_EVENTS.SYNC_STATE, handleSyncState);
            lanSyncService.off(SYNC_EVENTS.STATE_UPDATE, handleStateUpdate);
            lanSyncService.off(SYNC_EVENTS.CONNECTION, handleConnection);
            lanSyncService.off('status', handleStatusChange);
            if (cleanup) cleanup();
        };
    }, [createFullStateSnapshot, handleSearch, setHistory, setOperationLog, setStackDefs, apiSettings.autoPrintLabelEnabled]);

    // Auto-broadcast state when history, operationLog, or stackDefs changes (HOST mode only)
    useEffect(() => {
        if (lanSyncService.isHost()) {
            broadcastState();
        }
    }, [history, operationLog, stackDefs, broadcastState]);

    // Manual push of local data to Host (CLIENT mode only)
    const pushLocalData = useCallback(() => {
        if (lanSyncService.isClient()) {
            setIsSyncing(true); // Re-use syncing state for feedback
            lanSyncService.pushDataToHost(history);

            // Safety timeout
            setTimeout(() => setIsSyncing(false), 5000);
        }
    }, [history]);

    return {
        broadcastState,
        isSyncing,
        requestSync,
        pushLocalData,
        connectionStatus
    };
};
