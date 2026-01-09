import { useState, useEffect, useCallback } from 'react';
import { OrderEventStatus, ApiSettings, DEFAULT_CAPACITY_CONFIG, ResolvedRouteInfo } from '../types';
import { voiceService } from '../services/VoiceService';
import { labelPrintService } from '../services/LabelPrintService';
import { routeStackService, SerializedStackServiceState } from '../services/RouteStackService';

const STORAGE_KEY = 'LOGISTICS_ACTIVITY_STREAM';
const API_CONFIG_KEY = 'LOGISTICS_API_CONFIG';
const HISTORY_KEY = 'LOGISTICS_HISTORY';
const ROUTE_STACK_STATE_KEY = 'LOGISTICS_ROUTE_STACK_STATE';

export const useAppPersistence = () => {
    // Persistence logic: Initialize operationLog from LocalStorage
    const [operationLog, setOperationLog] = useState<Record<string, OrderEventStatus[]>>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    // API Settings logic: Initialize from LocalStorage
    const [apiSettings, setApiSettings] = useState<ApiSettings>(() => {
        const saved = localStorage.getItem(API_CONFIG_KEY);
        return saved ? JSON.parse(saved) : {
            wpglbAuth: '',
            authorization: '',
            enabled: true,
            pickupEnabled: false,
            taskCode: '',
            ptId: 0,
            pickupSite: 0,
            voiceEnabled: true,
            autoPrintLabelEnabled: true,
            stackCapacity: 40,
            stackCapacityConfig: DEFAULT_CAPACITY_CONFIG
        };
    });

    // History persistence: Scan history survives app restarts
    const [history, setHistory] = useState<ResolvedRouteInfo[]>(() => {
        try {
            const saved = localStorage.getItem(HISTORY_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('[Persistence] Failed to load history:', e);
            return [];
        }
    });

    // Persistence side-effects
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(operationLog));
    }, [operationLog]);

    useEffect(() => {
        localStorage.setItem(API_CONFIG_KEY, JSON.stringify(apiSettings));
        voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
        labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? true);
        // Use new capacity config if available, otherwise fall back to legacy
        if (apiSettings.stackCapacityConfig) {
            routeStackService.setCapacityConfig(apiSettings.stackCapacityConfig);
        } else {
            routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
        }
    }, [apiSettings]);

    // Persist history (throttled to avoid too many writes)
    useEffect(() => {
        // Limit history size to prevent localStorage from getting too large
        const historyToSave = history.slice(0, 1000);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(historyToSave));
    }, [history]);

    // Initialize services on mount
    useEffect(() => {
        voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
        labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? true);
        if (apiSettings.stackCapacityConfig) {
            routeStackService.setCapacityConfig(apiSettings.stackCapacityConfig);
        } else {
            routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
        }

        // Restore RouteStackService state from localStorage
        try {
            const savedStackState = localStorage.getItem(ROUTE_STACK_STATE_KEY);
            if (savedStackState) {
                const parsed: SerializedStackServiceState = JSON.parse(savedStackState);
                routeStackService.restoreState(parsed);
                console.log('[Persistence] RouteStackService state restored');
            }
        } catch (e) {
            console.error('[Persistence] Failed to restore RouteStackService state:', e);
        }
    }, []);

    // Subscribe to RouteStackService state changes and persist
    useEffect(() => {
        const handleStateChange = () => {
            const state = routeStackService.serializeState();
            localStorage.setItem(ROUTE_STACK_STATE_KEY, JSON.stringify(state));
        };

        routeStackService.onStateChange(handleStateChange);

        return () => {
            routeStackService.offStateChange(handleStateChange);
        };
    }, []);

    // Stack Logic: Initialize from LocalStorage
    // We persist imported stacks so they don't disappear on refresh/re-mount
    const [stackDefs, setStackDefs] = useState<any[]>(() => {
        const saved = localStorage.getItem('LOGISTICS_STACK_DEFS');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('LOGISTICS_STACK_DEFS', JSON.stringify(stackDefs));
    }, [stackDefs]);

    // Clear all persisted data (called on Reset)
    const clearAllData = useCallback(() => {
        localStorage.removeItem(HISTORY_KEY);
        localStorage.removeItem(ROUTE_STACK_STATE_KEY);
        localStorage.removeItem('LOGISTICS_STACK_DEFS');
        localStorage.removeItem(STORAGE_KEY);
        routeStackService.reset();
        // Also clear localStorage for RouteStackService
        localStorage.removeItem(ROUTE_STACK_STATE_KEY);
    }, []);

    return {
        operationLog,
        setOperationLog,
        apiSettings,
        setApiSettings,
        stackDefs,
        setStackDefs,
        history,
        setHistory,
        clearAllData
    };
};
