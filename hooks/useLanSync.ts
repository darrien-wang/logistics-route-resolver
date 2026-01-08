import { useEffect, useCallback } from 'react';
import { RouteStackState, ResolvedRouteInfo, OrderEventStatus, PrintMappingConditionState } from '../types';
import { lanSyncService, SYNC_EVENTS } from '../services/LanSyncService';
import { routeStackService } from '../services/RouteStackService';
import { printMappingConditionService } from '../services/PrintMappingConditionService';

export interface UseLanSyncProps {
    history: ResolvedRouteInfo[];
    operationLog: Record<string, OrderEventStatus[]>;
    setHistory: React.Dispatch<React.SetStateAction<ResolvedRouteInfo[]>>;
    setOperationLog: React.Dispatch<React.SetStateAction<Record<string, OrderEventStatus[]>>>;
    handleSearch: (orderId: string) => Promise<void>;
}

export const useLanSync = ({
    history,
    operationLog,
    setHistory,
    setOperationLog,
    handleSearch
}: UseLanSyncProps) => {

    // Create full state snapshot for broadcasting
    const createFullStateSnapshot = useCallback(() => ({
        routeStacks: routeStackService.serializeState(),
        history: history.slice(0, 100), // Limit to last 100 entries
        operationLog,
        printConditions: printMappingConditionService.serializeState(),
        timestamp: Date.now(),
    }), [history, operationLog]);

    // Manual broadcast function for HOST mode
    const broadcastState = useCallback(() => {
        if (lanSyncService.isHost() && window.electron?.broadcastSyncState) {
            const fullState = createFullStateSnapshot();
            window.electron.broadcastSyncState(fullState);
            console.log('[LanSync] Manual state broadcast triggered');
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
                // Execute scan action on behalf of client
                const { orderId } = message.data;
                console.log(`[LanSync] Processing remote scan from client: ${orderId}`);
                handleSearch(orderId);
            } else if (message.event === 'client:connected') {
                // Send full state sync to newly connected client
                console.log(`[LanSync] New client connected: ${message.clientId}`);
                const fullState = createFullStateSnapshot();
                if (window.electron?.syncStateToClient) {
                    window.electron.syncStateToClient(message.clientId, fullState);
                }
            }
        });

        // Setup Client mode: receive and apply full state from Host
        const handleSyncState = (fullState: any) => {
            console.log('[LanSync] Received full state sync from Host');
            if (fullState.routeStacks) {
                routeStackService.applyRemoteState(fullState.routeStacks);
            }
            if (fullState.history) {
                setHistory(fullState.history);
            }
            if (fullState.operationLog) {
                setOperationLog(fullState.operationLog);
            }
            if (fullState.printConditions) {
                printMappingConditionService.applyRemoteState(fullState.printConditions);
            }
        };

        const handleStateUpdate = (fullState: any) => {
            console.log('[LanSync] Received state update from Host');
            if (fullState.routeStacks) {
                routeStackService.applyRemoteState(fullState.routeStacks);
            }
            if (fullState.history) {
                setHistory(fullState.history);
            }
            if (fullState.operationLog) {
                setOperationLog(fullState.operationLog);
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
    }, [createFullStateSnapshot, handleSearch, setHistory, setOperationLog]);

    // Auto-broadcast state when history or operationLog changes (HOST mode only)
    useEffect(() => {
        if (lanSyncService.isHost()) {
            broadcastState();
        }
    }, [history, operationLog, broadcastState]);

    return { broadcastState };
};
