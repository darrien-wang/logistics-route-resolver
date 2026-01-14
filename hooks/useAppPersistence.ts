import { useState, useEffect, useCallback, useRef } from 'react';
import { OrderEventStatus, ApiSettings, DEFAULT_CAPACITY_CONFIG, ResolvedRouteInfo } from '../types';
import { voiceService } from '../services/VoiceService';
import { labelPrintService } from '../services/LabelPrintService';
import { routeStackService, SerializedStackServiceState } from '../services/RouteStackService';
import { indexedDBService } from '../services/IndexedDBService';

const API_CONFIG_KEY = 'LOGISTICS_API_CONFIG';

export const useAppPersistence = () => {
    // ============================================================================
    // 1. STATE DEFINITIONS
    // ============================================================================
    const [isLoading, setIsLoading] = useState(true);

    // Operation log - still using localStorage for now (smaller data)
    const [operationLog, setOperationLog] = useState<Record<string, OrderEventStatus[]>>({});

    // API Settings - using localStorage (small data)
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

    // History - using IndexedDB for large data
    const [history, setHistory] = useState<ResolvedRouteInfo[]>([]);

    // Stack definitions - using IndexedDB
    const [stackDefs, setStackDefs] = useState<any[]>([]);

    // ============================================================================
    // 2. REF DEFINITIONS (Must be before any usage in callbacks/effects)
    // ============================================================================
    // Track if initial load is complete
    const initialLoadComplete = useRef(false);

    // Timeout Refs for Debouncing
    const historyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const stackDefsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const operationLogTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // ============================================================================
    // 3. CALLBACKS & UTILITIES
    // ============================================================================

    // Initialize IndexedDB and load data
    const reloadData = useCallback(async () => {
        setIsLoading(true);
        try {
            await indexedDBService.init();

            // Load all data from IndexedDB
            const [loadedHistory, loadedStackDefs, loadedState, loadedLog] = await Promise.all([
                indexedDBService.loadHistory(),
                indexedDBService.loadStackDefs(),
                indexedDBService.loadRouteStackState(),
                indexedDBService.loadOperationLog()
            ]);

            setHistory(loadedHistory);
            setStackDefs(loadedStackDefs);
            setOperationLog(loadedLog);

            // Restore RouteStackService state
            if (loadedState) {
                routeStackService.restoreState(loadedState);
                console.log('[Persistence] RouteStackService state restored from IndexedDB');
            }

            console.log(`[Persistence] Loaded ${loadedHistory.length} history items, ${loadedStackDefs.length} stack defs`);
            initialLoadComplete.current = true;
        } catch (error) {
            console.error('[Persistence] Failed to load from IndexedDB:', error);
            initialLoadComplete.current = true;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Clear all persisted data (called on Reset)
    const clearAllData = useCallback(async () => {
        // Create a safety backup before clearing (Silent persistence protection)
        // CRITICAL: Pass current in-memory state to backup, as DB might be stale due to debounce
        await indexedDBService.createBackup({
            history,
            stackDefs,
            operationLog,
            routeStackState: routeStackService.serializeState()
        });

        await indexedDBService.clearAll();
        routeStackService.reset();
        await reloadData(); // Reload (empty) state to UI
        console.log('[Persistence] All data cleared (Backup created)');
    }, [history, stackDefs, operationLog, reloadData]);

    // Restore from backup
    const restoreFromBackup = useCallback(async (timestamp: number) => {
        // Clear any pending debounced saves to prevent overwriting restored data
        if (historyTimeoutRef.current) clearTimeout(historyTimeoutRef.current);
        if (stackDefsTimeoutRef.current) clearTimeout(stackDefsTimeoutRef.current);
        if (operationLogTimeoutRef.current) clearTimeout(operationLogTimeoutRef.current);

        const success = await indexedDBService.restoreBackup(timestamp);
        if (success) {
            await reloadData();
            console.log('[Persistence] Backup restored and state reloaded');
            return true;
        }
        return false;
    }, [reloadData]);

    // ============================================================================
    // 4. EFFECTS
    // ============================================================================

    // Load data on mount
    useEffect(() => {
        reloadData();
    }, [reloadData]);

    // Persist API settings to localStorage
    useEffect(() => {
        localStorage.setItem(API_CONFIG_KEY, JSON.stringify(apiSettings));
        voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
        labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? true);
        if (apiSettings.stackCapacityConfig) {
            routeStackService.setCapacityConfig(apiSettings.stackCapacityConfig);
        } else {
            routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
        }
    }, [apiSettings]);

    // Initialize services on mount
    useEffect(() => {
        voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
        labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? true);
        if (apiSettings.stackCapacityConfig) {
            routeStackService.setCapacityConfig(apiSettings.stackCapacityConfig);
        } else {
            routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
        }
    }, []);

    // Debounced save for history (avoid too many writes)
    useEffect(() => {
        if (!initialLoadComplete.current) return;

        // Debounce history saves - wait 1 second after last change
        if (historyTimeoutRef.current) {
            clearTimeout(historyTimeoutRef.current);
        }

        historyTimeoutRef.current = setTimeout(() => {
            indexedDBService.saveHistory(history).catch(err => {
                console.error('[Persistence] Failed to save history:', err);
            });
        }, 1000);

        return () => {
            if (historyTimeoutRef.current) {
                clearTimeout(historyTimeoutRef.current);
            }
        };
    }, [history]);

    // Debounced save for stackDefs
    useEffect(() => {
        if (!initialLoadComplete.current) return;

        if (stackDefsTimeoutRef.current) {
            clearTimeout(stackDefsTimeoutRef.current);
        }

        stackDefsTimeoutRef.current = setTimeout(() => {
            indexedDBService.saveStackDefs(stackDefs).catch(err => {
                console.error('[Persistence] Failed to save stackDefs:', err);
            });
        }, 500);

        return () => {
            if (stackDefsTimeoutRef.current) {
                clearTimeout(stackDefsTimeoutRef.current);
            }
        };
    }, [stackDefs]);

    // Debounced save for operation log
    useEffect(() => {
        if (!initialLoadComplete.current) return;

        if (operationLogTimeoutRef.current) {
            clearTimeout(operationLogTimeoutRef.current);
        }

        operationLogTimeoutRef.current = setTimeout(() => {
            indexedDBService.saveOperationLog(operationLog).catch(err => {
                console.error('[Persistence] Failed to save operationLog:', err);
            });
        }, 1000);

        return () => {
            if (operationLogTimeoutRef.current) {
                clearTimeout(operationLogTimeoutRef.current);
            }
        };
    }, [operationLog]);

    // Subscribe to RouteStackService state changes and persist
    useEffect(() => {
        const handleStateChange = () => {
            const state = routeStackService.serializeState();
            indexedDBService.saveRouteStackState(state).catch(err => {
                console.error('[Persistence] Failed to save RouteStackService state:', err);
            });
        };

        routeStackService.onStateChange(handleStateChange);

        return () => {
            routeStackService.offStateChange(handleStateChange);
        };
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
        clearAllData,
        restoreFromBackup,
        isLoading
    };
};
