import React, { useEffect, useCallback } from 'react';
import { RouteStackState, ResolvedRouteInfo, OrderEventStatus, PrintMappingConditionState, ApiSettings } from '../types';
import { lanSyncService, SYNC_EVENTS } from '../services/LanSyncService';
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

    // Create full state snapshot for broadcasting
    const createFullStateSnapshot = useCallback(() => ({
        routeStacks: routeStackService.serializeState(),
        history: history.slice(0, 100), // Limit to last 100 entries
        operationLog,
        stackDefs, // Include imported stack definitions
        printConditions: printMappingConditionService.serializeState(),
        timestamp: Date.now(),
    }), [history, operationLog, stackDefs]);

    // Manual broadcast function for HOST mode
    const broadcastState = useCallback(() => {
        if (lanSyncService.isHost() && window.electron?.broadcastSyncState) {
            const fullState = createFullStateSnapshot();
            console.log('[LanSync] Broadcasting state', {
                timestamp: fullState.timestamp,
                historyCount: fullState.history?.length || 0,
                stackDefsCount: fullState.stackDefs?.length || 0,
            });
            window.electron.broadcastSyncState(fullState);
        }
    }, [createFullStateSnapshot]);

    // LAN Sync integration - Full state synchronization
    useEffect(() => {
        // Setup Host mode: broadcast state changes to clients
        const handleStateChange = () => {
            if (window.electron?.broadcastSyncState && lanSyncService.isHost()) {
                const fullState = createFullStateSnapshot();
                window.electron.broadcastSyncState(fullState);
                console.log('[LanSync] Broadcasting full state to clients');
            }
        };

        routeStackService.onStateChange(handleStateChange);

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
                // Client reconnected and requesting full state sync
                console.log(`[LanSync] Client ${message.clientId} reconnected, sending full state`);
                const fullState = createFullStateSnapshot();
                if (window.electron?.syncStateToClient) {
                    window.electron.syncStateToClient(message.clientId, fullState);
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
            console.log('[LanSync] Received state update from Host', {
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

        lanSyncService.on(SYNC_EVENTS.SYNC_STATE, handleSyncState);
        lanSyncService.on(SYNC_EVENTS.STATE_UPDATE, handleStateUpdate);

        return () => {
            routeStackService.offStateChange(handleStateChange);
            lanSyncService.off(SYNC_EVENTS.SYNC_STATE, handleSyncState);
            lanSyncService.off(SYNC_EVENTS.STATE_UPDATE, handleStateUpdate);
            if (cleanup) cleanup();
        };
    }, [createFullStateSnapshot, handleSearch, setHistory, setOperationLog, setStackDefs, apiSettings.autoPrintLabelEnabled]);

    // Auto-broadcast state when history, operationLog, or stackDefs changes (HOST mode only)
    useEffect(() => {
        if (lanSyncService.isHost()) {
            broadcastState();
        }
    }, [history, operationLog, stackDefs, broadcastState]);

    return { broadcastState };
};
