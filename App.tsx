
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Settings,
  AlertCircle,
  CheckCircle2,
  Maximize2,
  Minimize2,
  ScanBarcode,
  RefreshCcw,
  Activity,
  ChevronRight,
  ClipboardList,
  Layers,
  Download,
  Printer,
  Wifi
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { OrderData, ResolvedRouteInfo, ZipRouteRecord, EventType, OrderEventStatus, ApiSettings, DEFAULT_CAPACITY_CONFIG } from './types';
import {
  MiddlewareChain,
  createOrderLookupMiddleware,
  createRouteResolverMiddleware,
  createEnrichmentMiddleware,
  createEventTriggerMiddleware,
  createPersistenceMiddleware,
  createRemoteLookupMiddleware,
  createPickupScanMiddleware,
} from './services/MiddlewareChain';
import { executeUnload } from './services/UnloadService';
import { batchSearchOrders } from './services/BatchOrderService';
import { FlexibleDataSource } from './services/RouteService';
import { ExcelExportService } from './services/ExportService';
import { routeStackService } from './services/RouteStackService';
import { voiceService } from './services/VoiceService';
import { labelPrintService } from './services/LabelPrintService';
import { lanSyncService, SYNC_EVENTS } from './services/LanSyncService';
import RouteStackManager from './components/RouteStackManager';
import ApiConfigModal from './components/ApiConfigModal';
import RulesManagementView from './components/RulesManagementView';
import DashboardView from './components/DashboardView';
import OperatorView from './components/OperatorView';
import NetworkSettingsView from './components/NetworkSettingsView';
import UpdateNotification from './components/UpdateNotification';
import TokenExpiredModal from './components/TokenExpiredModal';
import { MOCK_ORDERS } from './constants/mockData';

const STORAGE_KEY = 'LOGISTICS_ACTIVITY_STREAM';
const API_CONFIG_KEY = 'LOGISTICS_API_CONFIG';


const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'operator' | 'rules' | 'stacks' | 'network'>('dashboard');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ResolvedRouteInfo[]>([]);
  const [printStatus, setPrintStatus] = useState<'idle' | 'printing'>('idle');
  const [currentResult, setCurrentResult] = useState<ResolvedRouteInfo | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [showTokenExpired, setShowTokenExpired] = useState(false);
  const [appVersion, setAppVersion] = useState<string>('');

  const [batchMode, setBatchMode] = useState<{ active: boolean; ids: string[] }>({ active: false, ids: [] });
  const [selectedEventTypes, setSelectedEventTypes] = useState<EventType[]>([]);

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

  const scannerInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dataSource = useMemo(() => new FlexibleDataSource(), []);
  const exportService = useMemo(() => new ExcelExportService(), []);

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

  // Token expiration helper (check if older than 24 hours OR empty)
  const isTokenExpired = useCallback(() => {
    // Check if tokens are empty
    if (!apiSettings.wpglbAuth?.trim() || !apiSettings.authorization?.trim()) return true;
    // Check if never set
    if (!apiSettings.tokenUpdatedAt) return true;
    // Check if older than 24 hours
    const lastUpdated = new Date(apiSettings.tokenUpdatedAt).getTime();
    const now = Date.now();
    const hoursElapsed = (now - lastUpdated) / (1000 * 60 * 60);
    return hoursElapsed >= 24;
  }, [apiSettings.tokenUpdatedAt, apiSettings.wpglbAuth, apiSettings.authorization]);

  // Initialize services on mount
  useEffect(() => {
    voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
    labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? true);
    if (apiSettings.stackCapacityConfig) {
      routeStackService.setCapacityConfig(apiSettings.stackCapacityConfig);
    } else {
      routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
    }

    // Check token expiration on app mount (only if API is enabled)
    if (apiSettings.enabled && isTokenExpired()) {
      setShowTokenExpired(true);
    }

    // Get app version from Electron API
    const electronAPI = (window as any).electronAPI;
    if (electronAPI?.updater?.getAppVersion) {
      electronAPI.updater.getAppVersion().then((version: string) => {
        setAppVersion(version || 'dev');
      }).catch(() => setAppVersion('dev'));
    } else {
      setAppVersion('dev');
    }
  }, []);

  // LAN Sync integration
  useEffect(() => {
    // Setup Host mode: broadcast state changes to clients
    const handleStateChange = (state: any) => {
      if (window.electron?.broadcastSyncState) {
        window.electron.broadcastSyncState(state);
      }
    };

    routeStackService.onStateChange(handleStateChange);

    // Setup Host mode: listen for scan actions from clients
    const cleanup = window.electron?.onSyncServerMessage?.((message: any) => {
      if (message.event === SYNC_EVENTS.ACTION_SCAN) {
        // Execute scan action on behalf of client
        const { orderId, routeName, dimensions } = message.data;
        handleSearch(orderId);
      } else if (message.event === 'client:connected') {
        // Send full state sync to newly connected client
        const currentState = routeStackService.serializeState();
        if (window.electron?.syncStateToClient) {
          window.electron.syncStateToClient(message.clientId, currentState);
        }
      }
    });

    // Setup Client mode: listen for state updates from host
    const handleSyncState = (state: any) => {
      routeStackService.applyRemoteState(state);
      // TODO: Update UI to reflect new state
    };

    const handleStateUpdate = (state: any) => {
      routeStackService.applyRemoteState(state);
      // TODO: Update UI to reflect new state
    };

    lanSyncService.on(SYNC_EVENTS.SYNC_STATE, handleSyncState);
    lanSyncService.on(SYNC_EVENTS.STATE_UPDATE, handleStateUpdate);

    return () => {
      routeStackService.offStateChange(handleStateChange);
      lanSyncService.off(SYNC_EVENTS.SYNC_STATE, handleSyncState);
      lanSyncService.off(SYNC_EVENTS.STATE_UPDATE, handleStateUpdate);
      if (cleanup) cleanup();
    };
  }, []);

  const isBatchComplete = useMemo(() => {
    if (!batchMode.active || batchMode.ids.length === 0) return false;
    return batchMode.ids.every(id => {
      const events = operationLog[id.toUpperCase()];
      if (!events) return false;
      return events.every(e => e.status === 'SUCCESS' || e.status === 'FAILED');
    });
  }, [batchMode, operationLog]);

  const handleEventInitiated = useCallback((id: string, events: OrderEventStatus[]) => {
    setOperationLog(prev => ({ ...prev, [id]: events }));
  }, []);

  const handleEventFinished = useCallback((id: string, type: EventType, success: boolean, message?: string) => {
    setOperationLog(prev => {
      const orderEvents = prev[id] || [];
      return {
        ...prev,
        [id]: orderEvents.map(e => e.type === type ? { ...e, status: success ? 'SUCCESS' : 'FAILED', message } : e)
      };
    });
  }, []);

  const clearHistory = () => {
    if (confirm("Clear all activity history?")) {
      // Clear all state to match first-launch state
      setOperationLog({});
      setHistory([]);
      setCurrentResult(null);
      setError(null);
      setBatchMode({ active: false, ids: [] });
      setSelectedEventTypes([]);
      setOrderId('');
      setLoading(false);
      // Also reset stack tracking
      routeStackService.reset();
      // Refocus input after clear
      setTimeout(() => scannerInputRef.current?.focus(), 100);
    }
  };

  const handleSearch = useCallback(async (searchId: string) => {
    if (!searchId.trim()) return;
    const ids = searchId.trim().split(/[\s,;]+/).filter(id => id.length > 0);
    if (ids.length === 0) return;

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

        // Use Middleware chain to resolve all IDs in batch if remote API is enabled
        // otherwise just trigger events
        // [x] Fixing Pickup Scan Feedback Logic [x]
        //     [x] Update Types with message field [x]
        //     [x] Prevent mock trigger for RECEIVE when pickup enabled [x]
        //     [x] Update UI to display API message [x]
        //     [x] Verify fix with ZX123456 [x]
        // [x] Refine Event Selection Logic [x]
        //     [x] Change Event Triggers to single-select [x]
        //     [x] Fix DashboardView type safety [x]
        // Batch search all orders first (handles chunking and caching)
        const allIds = ids.map(id => id.toUpperCase());
        const orderDataMap = await batchSearchOrders(allIds, apiSettings);
        console.log(`[Batch] Got ${orderDataMap.size} orders from search`);

        for (const id of ids) {
          const uppercaseId = id.toUpperCase();
          const cachedOrder = orderDataMap.get(uppercaseId);

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

              // Auto-print label on every scan
              if (apiSettings.autoPrintLabelEnabled) {
                console.log(`[Perf] Queueing print (${(performance.now() - t0).toFixed(0)}ms)`);
                setPrintStatus('printing');
                labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, uppercaseId);
                // Reset status after a short delay to simulate completion (or use event if we had one)
                setTimeout(() => setPrintStatus('idle'), 2000);
              }
            } else {
              if (apiSettings.autoPrintLabelEnabled) {
                labelPrintService.queueExceptionPrint(uppercaseId);
              }
            }

            setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)].slice(0, 500));

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

              // Auto-print label on every scan (not just new stacks)
              if (apiSettings.autoPrintLabelEnabled) {
                labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, uppercaseId);
              }
            } else {
              // EXCEPTION: No route found
              if (apiSettings.autoPrintLabelEnabled) {
                labelPrintService.queueExceptionPrint(uppercaseId);
              }
            }

            setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)].slice(0, 500));
          }
        }

        setCurrentResult(null);
        setOrderId('');
      } else {
        setBatchMode({ active: false, ids: [] });
        const targetId = ids[0].toUpperCase();

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

            // Auto-print label on every scan (not just new stacks)
            if (apiSettings.autoPrintLabelEnabled) {
              labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, targetId);
            }
          } else {
            // EXCEPTION
            if (apiSettings.autoPrintLabelEnabled) {
              labelPrintService.queueExceptionPrint(targetId);
            }
          }

          setCurrentResult(result);
          setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)].slice(0, 50));

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

            // Auto-print label on every scan (not just new stacks)
            if (apiSettings.autoPrintLabelEnabled) {
              labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber, targetId);
            }
          } else {
            // EXCEPTION
            if (apiSettings.autoPrintLabelEnabled) {
              labelPrintService.queueExceptionPrint(targetId);
            }
          }

          setCurrentResult(result);
          setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)].slice(0, 50));
          setOrderId('');
        }
      }
    } catch (err: any) {
      setError(err.message || "RESOLUTION ERROR");
      setCurrentResult(null);
      setBatchMode({ active: false, ids: [] });
    } finally {
      setLoading(false);
      if (view === 'operator' && !showApiConfig) setTimeout(() => scannerInputRef.current?.focus(), 50);
    }
  }, [dataSource, view, selectedEventTypes, handleEventInitiated, handleEventFinished, apiSettings, showApiConfig]);

  const handleAddTestData = useCallback((testOrders: ResolvedRouteInfo[]) => {
    setHistory(prev => {
      const existingIds = new Set(prev.map(o => o.orderId));
      const newOrders = testOrders.filter(o => !existingIds.has(o.orderId));
      return [...newOrders, ...prev];
    });
  }, []);

  const toggleEventType = (type: EventType) => {
    setSelectedEventTypes(prev =>
      prev.includes(type) ? [] : [type]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data: any[] = XLSX.utils.sheet_to_json(ws);
      const newRecords: ZipRouteRecord[] = data.map(row => ({
        zip: (row['Ship-to Zipcodes'] || row['Zipcode'] || "").toString(),
        metroArea: row['Metro Area'] || "",
        state: row['State'] || "",
        destinationZone: (row['Destination Zone'] || "").toString(),
        routeConfiguration: row['Route Configuration'] || "",
        route2Configuration: row['ROUTE2 Configuration'] || ""
      })).filter(r => r.zip);
      if (newRecords.length > 0) {
        dataSource.updateData(newRecords, file.name);
        alert(`Imported ${newRecords.length} rules.`);
      }
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    const handleGlobalFocus = (e: MouseEvent) => {
      if (view === 'operator' && !showApiConfig) {
        // Avoid stealing focus if user clicked an input/textarea
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
        scannerInputRef.current?.focus();
      }
    };

    if (view === 'operator' && !showApiConfig) {
      scannerInputRef.current?.focus();
    }

    window.addEventListener('click', handleGlobalFocus);
    return () => window.removeEventListener('click', handleGlobalFocus);
  }, [view, showApiConfig]);


  // Note: Using external OperatorView component from ./components/OperatorView.tsx
  const OperatorViewInternal = () => { // REMOVE_THIS_FUNCTION
    const currentEvents = currentResult ? operationLog[currentResult.orderId] || [] : [];
    const currentHasFailed = currentEvents.some(e => e.status === 'FAILED');

    return (
      <div className="grid grid-cols-12 gap-8 h-[calc(100vh-100px)] animate-in slide-in-from-bottom-8 duration-700">
        {/* Left Column */}
        <div className="col-span-3 flex flex-col space-y-6">
          <div className="glass-panel p-6 rounded-[40px] border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-4 h-4 text-sky-400" /> Event triggers
              </h3>
              <div className={`w-2 h-2 rounded-full ${apiSettings.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
            </div>
            <div className="space-y-3">
              {(['RECEIVE', 'UNLOAD', 'SORT', 'DISPATCH'] as EventType[]).map(type => (
                <button
                  key={type}
                  onClick={() => toggleEventType(type)}
                  className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${selectedEventTypes.includes(type) ? 'bg-sky-500/20 border-sky-500/50 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.1)]' : 'bg-slate-800/30 border-white/5 text-slate-500 hover:border-white/20'}`}
                >
                  <span className="font-black text-sm tracking-widest">{type}</span>
                  <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${selectedEventTypes.includes(type) ? 'border-sky-400 bg-sky-400' : 'border-slate-600'}`}>
                    {selectedEventTypes.includes(type) && <CheckCircle2 className="w-5 h-5 text-slate-900" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[40px] border border-white/10 flex-1 overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-400" /> Activity History
              </h3>
              <button onClick={() => exportService.exportActivityLog(operationLog)} className="text-sky-400 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[400px]">
              {Object.entries(operationLog).reverse().map(([id, events]) => (
                <div key={id} className="p-5 bg-slate-900/60 rounded-[24px] border border-white/5 hover:border-sky-500/20 transition-all group">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)] ${(events as OrderEventStatus[]).every(e => e.status === 'SUCCESS') ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-sky-400'}`}></div>
                      <span className="font-mono text-sm text-sky-400 font-black tracking-widest uppercase">{id}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-800 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(events as OrderEventStatus[]).map((e, idx) => (
                      <div key={idx} className="flex flex-col space-y-1">
                        <div className={`flex items-center justify-between p-2 rounded-xl border whitespace-nowrap ${e.status === 'SUCCESS' ? 'bg-emerald-500/5 border-emerald-500/10' : e.status === 'FAILED' ? 'bg-red-500/5 border-red-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                          <span className="text-[9px] uppercase font-bold text-slate-600 mr-2">{e.type}</span>
                          <div className="flex items-center gap-1">
                            <span className={`text-[10px] font-black ${e.status === 'SUCCESS' ? 'text-emerald-400' : e.status === 'FAILED' ? 'text-red-400' : 'text-amber-400'}`}>
                              {e.status}
                            </span>
                            {e.status === 'PENDING' && <RefreshCcw className="w-3 h-3 text-amber-500 animate-spin" />}
                          </div>
                        </div>
                        {e.message && (
                          <div className={`text-[8px] font-medium px-2 py-0.5 rounded-lg border ${e.status === 'FAILED' ? 'bg-red-500/10 border-red-500/10 text-red-400' : 'bg-emerald-500/10 border-emerald-500/10 text-emerald-400'}`}>
                            {e.message}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(operationLog).length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-800 opacity-20">
                  <Activity className="w-16 h-16 mb-2" />
                  <p className="text-xs font-black uppercase tracking-[0.2em]">Stream Ready</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Column */}
        <div className="col-span-9 flex flex-col space-y-10">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(orderId); }} className="relative group">
            <input
              ref={scannerInputRef}
              type="text"
              placeholder="USE SPACE TO BATCH"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-slate-900/60 border-[3px] border-white/5 rounded-[24px] py-4 px-8 text-xl font-black text-center text-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all placeholder:text-slate-500 uppercase tracking-widest shadow-2xl"
            />
            {loading && <RefreshCcw className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 text-sky-400 animate-spin" />}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
              <ScanBarcode className="w-8 h-8 text-slate-400" />
            </div>
          </form>

          <div className="flex-1 flex items-center justify-center">
            {error ? (
              <div className="bg-red-500/10 border-8 border-red-500/30 p-24 rounded-[80px] flex flex-col items-center space-y-8 text-red-500 animate-in zoom-in-90 shadow-[0_0_100px_rgba(239,68,68,0.2)]">
                <AlertCircle className="w-32 h-32" />
                <div className="text-7xl font-black uppercase tracking-tighter text-center">{error}</div>
              </div>
            ) : batchMode.active ? (
              <div className="flex flex-col items-center space-y-10 animate-in zoom-in-95 duration-200">
                <div className={`border-8 p-32 px-48 rounded-[110px] relative flex flex-col items-center transition-all duration-700 ${isBatchComplete ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_150px_rgba(52,211,153,0.3)]' : 'bg-sky-500/5 border-sky-500/10 shadow-[0_0_150px_rgba(56,189,248,0.2)]'}`}>
                  <div className={`text-[18rem] leading-none font-black drop-shadow-[0_0_80px_rgba(255,255,255,0.2)] tracking-tighter transition-colors duration-700 ${isBatchComplete ? 'text-emerald-400' : 'text-white'}`}>
                    {batchMode.ids.length}
                  </div>
                  <div className={`text-4xl font-black uppercase tracking-[0.5em] mt-8 transition-colors duration-700 ${isBatchComplete ? 'text-emerald-400' : 'text-sky-400'}`}>
                    {isBatchComplete ? 'Orders Success' : 'Orders Batching'}
                  </div>

                  <div className={`absolute -top-10 px-12 py-4 rounded-full shadow-2xl flex items-center gap-4 border-4 transition-all duration-700 ${isBatchComplete ? 'bg-emerald-900 border-emerald-400' : 'bg-slate-900 border-sky-400'}`}>
                    {isBatchComplete ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <Layers className="w-8 h-8 text-sky-400" />}
                    <span className="text-white font-black text-3xl tracking-widest uppercase">
                      {isBatchComplete ? 'Batch Completed' : 'Multi-Task Active'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6">
                  {selectedEventTypes.map(type => (
                    <div key={type} className={`flex items-center gap-4 px-10 py-5 rounded-3xl border shadow-xl transition-all duration-700 ${isBatchComplete ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-slate-800/90 border-white/10 text-slate-300'}`}>
                      {isBatchComplete ? <CheckCircle2 className="w-8 h-8" /> : <RefreshCcw className="w-6 h-6 text-sky-400 animate-spin" />}
                      <span className="font-black uppercase tracking-[0.2em] text-xl">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : currentResult ? (
              <div className="flex flex-col items-center space-y-10 animate-in zoom-in-95 duration-150 w-full h-full">
                <div className={`${currentHasFailed ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/10'} border-[10px] p-10 pb-20 rounded-[80px] shadow-[0_0_150px_rgba(52,211,153,0.15)] relative transition-colors duration-500 flex flex-col items-center w-full flex-1`}>
                  <div className={`text-[12rem] leading-none font-black ${currentHasFailed ? 'text-red-400 opacity-50' : 'text-white'} drop-shadow-[0_0_70px_rgba(255,255,255,0.3)] tracking-tighter whitespace-nowrap px-10 mt-10`}>
                    {currentResult.route?.routeConfiguration || 'N/A'}
                  </div>

                  {/* Stack Number Display */}
                  {currentResult.stackInfo && (
                    <div className="mt-8 flex flex-col items-center space-y-4">
                      <div className="text-6xl font-black text-sky-400">
                        #{String(currentResult.stackInfo.stackNumber).padStart(3, '0')}
                      </div>

                      {/* Capacity Bar */}
                      <div className="w-96 bg-slate-800/50 rounded-full h-8 overflow-hidden border-2 border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${(currentResult.stackInfo.currentCount / currentResult.stackInfo.capacity) * 100}%` }}
                        />
                      </div>
                      <div className="text-2xl font-bold text-slate-400">
                        {currentResult.stackInfo.currentCount} / {currentResult.stackInfo.capacity}
                      </div>
                    </div>
                  )}

                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border-4 ${currentHasFailed ? 'border-red-500' : 'border-emerald-500/50'} px-12 py-4 rounded-full shadow-2xl transition-colors`}>
                    <span className={`${currentHasFailed ? 'text-red-500' : 'text-emerald-400'} font-black text-4xl tracking-[0.2em] uppercase`}>{currentResult.orderId}</span>
                  </div>

                  {/* Stack Full Warning */}
                  {currentResult.stackInfo?.isNewStack && currentResult.stackInfo.stackNumber > 1 && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-black text-lg uppercase tracking-widest shadow-xl animate-pulse z-20">
                      ⚠️ Stack #{String(currentResult.stackInfo.stackNumber - 1).padStart(3, '0')} FULL - Now #{String(currentResult.stackInfo.stackNumber).padStart(3, '0')}
                    </div>
                  )}

                  {/* Result Card Content */}
                  <div className="flex-1 relative animate-in zoom-in-95 duration-500 flex flex-col w-full mt-12 mb-6">
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-full bg-sky-500/20 blur-[120px] rounded-full animate-pulse-slow"></div>

                    <div className="relative z-10 bg-slate-900/40 backdrop-blur-md border-4 border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center text-center shadow-xl flex-1">
                      {/* Print Status Badge */}
                      {printStatus === 'printing' && (
                        <div className="absolute top-6 right-6 flex items-center gap-3 bg-sky-500/20 border border-sky-500/30 px-4 py-2 rounded-full animate-in slide-in-from-top-4 fade-in duration-300">
                          <Printer className="w-4 h-4 text-sky-400 animate-pulse" />
                          <span className="text-sky-400 font-bold text-xs tracking-wider uppercase">Printing Sent</span>
                        </div>
                      )}

                      {currentHasFailed && (
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                          <div className="bg-red-600 text-white px-8 py-2 rounded-full font-black text-xl uppercase tracking-widest shadow-xl animate-bounce">
                            Process Failed
                          </div>
                          {currentEvents.find(e => e.status === 'FAILED')?.message && (
                            <div className="bg-slate-900/95 backdrop-blur-md border border-red-500/50 text-red-400 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-2xl">
                              {currentEvents.find(e => e.status === 'FAILED')?.message}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-8 justify-center">
                      {selectedEventTypes.map(type => {
                        const status = currentEvents.find(e => e.type === type)?.status;
                        return (
                          <div key={type} className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-500 ${status === 'SUCCESS' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.2)]' : status === 'FAILED' ? 'bg-red-500/10 border-red-500/40 text-red-400' : 'bg-slate-800/60 border-white/5 text-slate-500'}`}>
                            {status === 'SUCCESS' ? <CheckCircle2 className="w-6 h-6" /> : status === 'FAILED' ? <AlertCircle className="w-6 h-6" /> : <RefreshCcw className="w-6 h-6 animate-spin text-amber-500" />}
                            <span className="font-black uppercase tracking-[0.2em] text-lg">{type}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-6 opacity-20">
                <img
                  src="app_logo_fixed.png"
                  className="w-80 h-80"
                  alt="Logo"
                />
                <div className="text-5xl font-black uppercase tracking-[0.6em] text-slate-800">Awaiting Input</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };




  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 bottom-0 w-24 bg-slate-900 border-r border-white/5 flex flex-col items-center py-10 z-[200]">
        <div className="w-14 h-14 bg-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-14 shadow-2xl overflow-hidden border border-white/10 group">
          <img
            src="app_logo_fixed.png"
            className="w-14 h-14 object-contain p-1 group-hover:scale-110 transition-transform"
            alt="Logo"
          />
        </div>
        <div className="flex flex-col gap-8">
          <button onClick={() => setView('dashboard')} className={`p-4 rounded-2xl transition-all ${view === 'dashboard' ? 'bg-sky-500/20 text-sky-400 shadow-lg shadow-sky-500/10' : 'text-slate-600 hover:text-slate-400'}`}>
            <LayoutDashboard className="w-7 h-7" />
          </button>
          <button onClick={() => setView('operator')} className={`p-4 rounded-2xl transition-all ${view === 'operator' ? 'bg-sky-500/20 text-sky-400 shadow-lg shadow-sky-500/10' : 'text-slate-600 hover:text-slate-400'}`}>
            <Maximize2 className="w-7 h-7" />
          </button>
          <button onClick={() => setView('rules')} className={`p-4 rounded-2xl transition-all ${view === 'rules' ? 'bg-sky-500/20 text-sky-400 shadow-lg shadow-sky-500/10' : 'text-slate-600 hover:text-slate-400'}`}>
            <ClipboardList className="w-7 h-7" />
          </button>
          <button onClick={() => setView('stacks')} className={`p-4 rounded-2xl transition-all ${view === 'stacks' ? 'bg-sky-500/20 text-sky-400 shadow-lg shadow-sky-500/10' : 'text-slate-600 hover:text-slate-400'}`}>
            <Layers className="w-7 h-7" />
          </button>
          <button onClick={() => setView('network')} className={`p-4 rounded-2xl transition-all ${view === 'network' ? 'bg-sky-500/20 text-sky-400 shadow-lg shadow-sky-500/10' : 'text-slate-600 hover:text-slate-400'}`}>
            <Wifi className="w-7 h-7" />
          </button>
        </div>

        {/* Version Number - Click to update */}
        <button
          onClick={() => {
            const electronAPI = (window as any).electronAPI;
            if (electronAPI?.updater?.checkForUpdates) {
              electronAPI.updater.checkForUpdates();
            }
          }}
          className="mt-auto mb-2 text-slate-600 hover:text-sky-400 transition-colors text-xs font-mono"
          title="Click to check for updates"
        >
          v{appVersion}
        </button>

        <button onClick={() => setShowApiConfig(true)} className="p-4 text-slate-600 hover:text-sky-400 transition-colors">
          <Settings className="w-7 h-7" />
        </button>
      </div>

      <main className={`flex-1 ml-24 relative ${view === 'operator' ? 'h-screen overflow-hidden p-6' : 'p-10 lg:p-14 overflow-y-auto'}`}>
        {view === 'dashboard' ? (
          <DashboardView
            apiSettings={apiSettings}
            history={history}
            operationLog={operationLog}
            selectedEventTypes={selectedEventTypes}
            dataSource={dataSource}
            exportService={exportService}
            fileInputRef={fileInputRef}
            onShowApiConfig={() => setShowApiConfig(true)}
            onFileUpload={handleFileUpload}
            onClearHistory={clearHistory}
          />
        ) : view === 'operator' ? (
          <OperatorView
            apiSettings={apiSettings}
            operationLog={operationLog}
            selectedEventTypes={selectedEventTypes}
            orderId={orderId}
            loading={loading}
            error={error}
            batchMode={batchMode}
            isBatchComplete={isBatchComplete}
            currentResult={currentResult}
            printStatus={printStatus}
            exportService={exportService}
            scannerInputRef={scannerInputRef}
            onToggleEventType={toggleEventType}
            onOrderIdChange={setOrderId}
            onSearch={handleSearch}
          />
        ) : view === 'stacks' ? (
          <RouteStackManager history={history} apiSettings={apiSettings} onSettingsChange={setApiSettings} onAddTestData={handleAddTestData} />
        ) : view === 'network' ? (
          <NetworkSettingsView />
        ) : (
          <RulesManagementView dataSource={dataSource} />
        )}



        <ApiConfigModal
          isOpen={showApiConfig}
          onClose={() => setShowApiConfig(false)}
          apiSettings={apiSettings}
          onSettingsChange={setApiSettings}
        />

        <TokenExpiredModal
          isOpen={showTokenExpired}
          onClose={() => setShowTokenExpired(false)}
          onOpenSettings={() => setShowApiConfig(true)}
        />

        {/* Update Notification */}
        <UpdateNotification />
      </main>
      <UpdateNotification />
    </div>
  );
};

export default App;
