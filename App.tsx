
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  Truck,
  Download,
  Upload,
  FileSpreadsheet,
  LayoutDashboard,
  Settings,
  AlertCircle,
  CheckCircle2,
  Maximize2,
  Minimize2,
  ScanBarcode,
  RefreshCcw,
  Package,
  Activity,
  ChevronRight,
  ClipboardList,
  Layers,
  Save,
  Trash2,
  Key,
  Lock,
  X,
  Database,
  Printer
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { OrderData, ResolvedRouteInfo, ZipRouteRecord, EventType, OrderEventStatus, EventStatus, ApiSettings } from './types';
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
import { batchSearchOrders, getCachedOrder } from './services/BatchOrderService';
import { FlexibleDataSource } from './services/RouteService';
import { ExcelExportService } from './services/ExportService';
import { routeStackService } from './services/RouteStackService';
import { voiceService } from './services/VoiceService';
import { labelPrintService } from './services/LabelPrintService';
import StatCard from './components/StatCard';
import RouteStackManager from './components/RouteStackManager';
import UpdateNotification from './components/UpdateNotification';

const STORAGE_KEY = 'LOGISTICS_ACTIVITY_STREAM';
const API_CONFIG_KEY = 'LOGISTICS_API_CONFIG';

const MOCK_ORDERS: Record<string, OrderData> = {
  "ORD001": { orderId: "ORD001", date: "12/13/2024", address: "Canal St, New York, NY 10013, USA", email: "john@example.com", weight: 5, volume: 10 },
  "ORD002": { orderId: "ORD002", date: "12/13/2024", address: "Smith St, San Diego, CA 92101, USA", phone: "+16505553010", weight: 2, volume: 30 },
};

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'operator' | 'rules' | 'stacks'>('dashboard');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ResolvedRouteInfo[]>([]);
  const [currentResult, setCurrentResult] = useState<ResolvedRouteInfo | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);

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
      enabled: false,
      pickupEnabled: false,
      taskCode: '',
      ptId: 0,
      pickupSite: 0,
      voiceEnabled: true,
      autoPrintLabelEnabled: false,
      stackCapacity: 40
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
    labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? false);
    routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
  }, [apiSettings]);

  // Initialize services on mount
  useEffect(() => {
    voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
    labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? false);
    routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
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
            // Run route resolution with cached data (skip remote lookup)
            const chain = new MiddlewareChain();
            chain
              .use(createOrderLookupMiddleware())
              .use(createRouteResolverMiddleware(dataSource))
              .use(createEnrichmentMiddleware());

            const result = await chain.run(initialData);

            // Add stack tracking if route was resolved
            if (result.route?.routeConfiguration) {
              const stackInfo = routeStackService.addToStack(result.route.routeConfiguration, uppercaseId);
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
                labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber);
              }
            }

            setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)].slice(0, 500));

            // Execute unload separately
            handleEventInitiated(uppercaseId, [{ type: 'UNLOAD', status: 'PENDING', timestamp: new Date().toISOString() }]);
            await executeUnload(uppercaseId, apiSettings, handleEventFinished);
          } else {
            // Use middleware chain for non-UNLOAD events (skip remote lookup, use cached data)
            const chain = new MiddlewareChain();
            chain
              .use(createOrderLookupMiddleware())
              .use(createRouteResolverMiddleware(dataSource))
              .use(createEventTriggerMiddleware(selectedEventTypes, handleEventInitiated, handleEventFinished))
              .use(createPickupScanMiddleware(apiSettings, handleEventFinished));

            const result = await chain.run(initialData);

            // Add stack tracking if route was resolved
            if (result.route?.routeConfiguration) {
              const stackInfo = routeStackService.addToStack(result.route.routeConfiguration, uppercaseId);
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
                labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber);
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
            const stackInfo = routeStackService.addToStack(result.route.routeConfiguration, targetId);
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
              labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber);
            }
          }

          setCurrentResult(result);
          setHistory(prev => [result, ...prev.filter(h => h.orderId !== result.orderId)].slice(0, 50));

          // Execute unload separately
          handleEventInitiated(targetId, [{ type: 'UNLOAD', status: 'PENDING', timestamp: new Date().toISOString() }]);
          await executeUnload(targetId, apiSettings, handleEventFinished);
          setOrderId('');
        } else {
          // Use middleware chain for non-UNLOAD events
          const initialOrder = MOCK_ORDERS[targetId] || { orderId: targetId, address: "", date: new Date().toLocaleDateString() };

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
            const stackInfo = routeStackService.addToStack(result.route.routeConfiguration, targetId);
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
              labelPrintService.queuePrint(result.route.routeConfiguration, stackInfo.stackNumber);
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

  // Dashboard View
  const DashboardView = () => (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Control Center</h1>
            <div className="text-slate-500 text-sm mt-1">Source: <span className="text-emerald-400 font-mono uppercase">{dataSource.getCurrentSourceName()}</span></div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${apiSettings.enabled ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500'}`}>
            <Database className="w-3 h-3" /> {apiSettings.enabled ? 'Remote Engine ON' : 'Local Only'}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowApiConfig(true)} className="bg-slate-800 p-3 px-5 rounded-xl border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors"><Key className="w-4 h-4" /> API Config</button>
          <button onClick={() => fileInputRef.current?.click()} className="bg-slate-800 p-3 px-5 rounded-xl border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors"><Upload className="w-4 h-4" /> Table Config</button>
          <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" />
          <button onClick={() => exportService.exportActivityLog(operationLog)} disabled={Object.keys(operationLog).length === 0} className="bg-sky-500 p-3 px-5 rounded-xl border border-sky-400/50 flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"><Download className="w-4 h-4" /> Export Log</button>
          <button onClick={clearHistory} className="bg-red-500/10 p-3 px-5 rounded-xl border border-red-500/20 text-red-400 flex items-center gap-2 hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4" /> Reset</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Live Sync" value={apiSettings.enabled ? "Active" : "Disabled"} colorClass={apiSettings.enabled ? "text-emerald-400" : "text-slate-500"} icon={<RefreshCcw className={`w-4 h-4 ${apiSettings.enabled ? 'animate-spin-slow' : ''}`} />} />
        <StatCard label="Routes Resolved" value={history.length} />
        <StatCard label="Total Activity" value={Object.keys(operationLog).length} colorClass="text-purple-400" />
        <StatCard label="Operational Mode" value={selectedEventTypes.join(' + ')} colorClass="text-amber-400" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 glass-panel p-8 rounded-3xl min-h-[400px] flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Live Activity Stream</h2>
            <div className="flex gap-4">
              <div className="text-xs text-slate-600 font-mono">Storage: OK</div>
              <div className="text-xs text-slate-600 font-mono">Backend: {apiSettings.enabled ? 'WPGLB' : 'LOCAL'}</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {Object.keys(operationLog).length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-slate-500 space-y-4">
                <Activity className="w-16 h-16" />
                <p className="uppercase tracking-[0.3em] text-sm">Waiting for scanning activity</p>
              </div>
            ) : (
              Object.entries(operationLog).reverse().map(([id, events]) => (
                <div key={id} className="flex items-center justify-between p-5 bg-slate-900/40 rounded-[24px] border border-white/5 hover:border-sky-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-sky-400 border border-white/5">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono font-black text-white text-lg tracking-wider uppercase">{id}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">{(events as OrderEventStatus[]).every(e => e.status === 'SUCCESS') ? 'Processing Complete' : 'In-Transit / Processing'}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {(events as OrderEventStatus[]).map((e, idx) => (
                      <div key={idx} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${e.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : e.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse'}`}>
                        {e.type}: {e.status}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="glass-panel p-8 rounded-3xl flex flex-col shadow-2xl">
          <h2 className="font-bold mb-6 text-slate-400 uppercase tracking-widest text-sm">System Health</h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-800/30 rounded-[24px] border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-slate-500 text-[10px] font-black uppercase mb-1">Local Storage</div>
                <div className="text-3xl font-black text-white">{(JSON.stringify(operationLog).length / 1024).toFixed(1)} KB</div>
              </div>
              <Save className="w-8 h-8 text-sky-500/40" />
            </div>
            <div className="p-6 bg-slate-800/30 rounded-[24px] border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-slate-500 text-[10px] font-black uppercase mb-1">Lookup Source</div>
                <div className="text-2xl font-black text-white truncate max-w-[150px] uppercase">{apiSettings.enabled ? 'Wpglb API' : dataSource.getCurrentSourceName()}</div>
              </div>
              <Database className="w-8 h-8 text-emerald-500/40" />
            </div>
            <div className="mt-auto p-4 bg-sky-500/5 rounded-2xl border border-sky-500/10 text-[10px] font-medium text-sky-500/60 leading-relaxed">
              * The system uses a middleware chain to resolve routing. If Remote API fails or is disabled, it automatically falls back to local configuration tables.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // API Config Modal
  const ApiConfigModal = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <div className="w-full max-w-xl max-h-[90vh] glass-panel rounded-[32px] border-white/10 shadow-[0_0_100px_rgba(56,189,248,0.2)] animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="flex justify-between items-center p-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest">Network Config</h2>
              <p className="text-slate-500 text-[10px]">Configure Wpglb API credentials</p>
            </div>
          </div>
          <button onClick={() => setShowApiConfig(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 flex-1 custom-scrollbar">
          <div className="space-y-4 pb-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Wpglb-Auth Token</label>
              <textarea
                value={apiSettings.wpglbAuth}
                onChange={(e) => setApiSettings({ ...apiSettings, wpglbAuth: e.target.value })}
                placeholder="bearer eyJ..."
                className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50 h-20 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Authorization Header</label>
              <input
                type="text"
                value={apiSettings.authorization}
                onChange={(e) => setApiSettings({ ...apiSettings, authorization: e.target.value })}
                placeholder="Basic YWRtaW46..."
                className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Task Code</label>
                <input
                  type="text"
                  value={apiSettings.taskCode}
                  onChange={(e) => setApiSettings({ ...apiSettings, taskCode: e.target.value })}
                  placeholder="WPLS-..."
                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">PT ID</label>
                <input
                  type="number"
                  value={apiSettings.ptId}
                  onChange={(e) => setApiSettings({ ...apiSettings, ptId: parseInt(e.target.value) || 0 })}
                  placeholder="3391"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Pickup Site ID</label>
                <input
                  type="number"
                  value={apiSettings.pickupSite}
                  onChange={(e) => setApiSettings({ ...apiSettings, pickupSite: parseInt(e.target.value) || 0 })}
                  placeholder="3"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Stack Capacity</label>
                <input
                  type="number"
                  value={apiSettings.stackCapacity}
                  onChange={(e) => setApiSettings({ ...apiSettings, stackCapacity: parseInt(e.target.value) || 40 })}
                  placeholder="40"
                  min="1"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Remote Lookup</span>
              </div>
              <button
                onClick={() => setApiSettings({ ...apiSettings, enabled: !apiSettings.enabled })}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.enabled ? 'bg-sky-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.enabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white">Pickup Scan (RECEIVE)</span>
              </div>
              <button
                onClick={() => setApiSettings({ ...apiSettings, pickupEnabled: !apiSettings.pickupEnabled })}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.pickupEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.pickupEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Voice Announcements</span>
              </div>
              <button
                onClick={() => setApiSettings({ ...apiSettings, voiceEnabled: !apiSettings.voiceEnabled })}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.voiceEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.voiceEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Auto-Print Labels</span>
              </div>
              <button
                onClick={() => setApiSettings({ ...apiSettings, autoPrintLabelEnabled: !apiSettings.autoPrintLabelEnabled })}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.autoPrintLabelEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.autoPrintLabelEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 flex-shrink-0">
          <div className="flex gap-4">
            <button
              onClick={() => setShowApiConfig(false)}
              className="flex-1 bg-sky-500 text-white font-black uppercase py-3 rounded-xl shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Save Configurations
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Operator View
  const OperatorView = () => (
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
            className="w-full bg-slate-900/60 border-[10px] border-white/5 rounded-[56px] py-14 px-14 text-5xl font-black text-center text-white focus:outline-none focus:border-sky-500 focus:ring-20 focus:ring-sky-500/5 transition-all placeholder:text-slate-500 uppercase tracking-widest shadow-2xl"
          />
          {loading && <RefreshCcw className="absolute right-16 top-1/2 -translate-y-1/2 w-16 h-16 text-sky-400 animate-spin" />}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 flex items-center gap-6 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
            <ScanBarcode className="w-16 h-16 text-slate-400" />
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
          ) : currentResult ? (() => {
            const events = operationLog[currentResult.orderId] || [];
            const hasFailed = events.some(e => e.status === 'FAILED');
            return (
              <div className="flex flex-col items-center space-y-10 animate-in zoom-in-95 duration-150">
                <div className={`${hasFailed ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/10'} border-[10px] p-28 px-44 rounded-[110px] shadow-[0_0_150px_rgba(52,211,153,0.15)] relative transition-colors duration-500`}>
                  <div className={`text-[18rem] leading-none font-black ${hasFailed ? 'text-red-400 opacity-50' : 'text-white'} drop-shadow-[0_0_70px_rgba(255,255,255,0.3)] tracking-tighter whitespace-nowrap px-10`}>
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

                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border-4 ${hasFailed ? 'border-red-500' : 'border-emerald-500/50'} px-12 py-4 rounded-full shadow-2xl transition-colors`}>
                    <span className={`${hasFailed ? 'text-red-500' : 'text-emerald-400'} font-black text-4xl tracking-[0.2em] uppercase`}>{currentResult.orderId}</span>
                  </div>

                  {/* Stack Full Warning */}
                  {currentResult.stackInfo?.isNewStack && currentResult.stackInfo.stackNumber > 1 && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-black text-lg uppercase tracking-widest shadow-xl animate-pulse">
                      ⚠️ Stack #{String(currentResult.stackInfo.stackNumber - 1).padStart(3, '0')} FULL - Now #{String(currentResult.stackInfo.stackNumber).padStart(3, '0')}
                    </div>
                  )}

                  {hasFailed && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                      <div className="bg-red-600 text-white px-8 py-2 rounded-full font-black text-xl uppercase tracking-widest shadow-xl animate-bounce">
                        Process Failed
                      </div>
                      {events.find(e => e.status === 'FAILED')?.message && (
                        <div className="bg-slate-900/90 backdrop-blur-md border border-red-500/50 text-red-400 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-2xl">
                          {events.find(e => e.status === 'FAILED')?.message}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-6">
                  {selectedEventTypes.map(type => {
                    const status = events.find(e => e.type === type)?.status;
                    return (
                      <div key={type} className={`flex items-center gap-4 px-10 py-5 rounded-3xl border transition-all duration-500 ${status === 'SUCCESS' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.2)]' : status === 'FAILED' ? 'bg-red-500/10 border-red-500/40 text-red-400' : 'bg-slate-800/80 border-white/10 text-slate-400'}`}>
                        {status === 'SUCCESS' ? <CheckCircle2 className="w-8 h-8" /> : status === 'FAILED' ? <AlertCircle className="w-8 h-8" /> : <RefreshCcw className="w-8 h-8 animate-spin text-amber-500" />}
                        <span className="font-black uppercase tracking-[0.2em] text-xl">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })() : (
            <div className="flex flex-col items-center space-y-6 opacity-20">
              <img
                src="/app_logo_fixed.png"
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

  // Rules Management View
  const RulesManagementView = () => {
    const [records, setRecords] = useState(dataSource.getAllRecords());
    const [searchTerm, setSearchTerm] = useState('');
    const [editingZip, setEditingZip] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const filteredRecords = records.filter(r =>
      r.zip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.metroArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.routeConfiguration.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (zip: string) => {
      if (confirm(`Delete rule for ZIP ${zip}?`)) {
        dataSource.deleteRecord(zip);
        setRecords([...dataSource.getAllRecords()]);
      }
    };

    const handleStartEdit = (r: ZipRouteRecord) => {
      setEditingZip(r.zip);
      setEditValue(r.routeConfiguration);
    };

    const handleSaveEdit = (zip: string) => {
      dataSource.updateRecord(zip, { routeConfiguration: editValue });
      setEditingZip(null);
      setRecords([...dataSource.getAllRecords()]);
    };

    const handleExport = () => {
      const data = dataSource.getAllRecords();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Rules");
      XLSX.writeFile(wb, `Rules_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
      <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rules Management</h1>
            <div className="text-slate-500 text-sm mt-1">Total Rules: <span className="text-sky-400 font-black">{records.length}</span></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search ZIP or Route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-sky-500 w-64 uppercase"
              />
              <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            </div>
            <button
              onClick={handleExport}
              className="bg-emerald-500 p-3 px-6 rounded-xl border border-emerald-400/50 flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 font-bold"
            >
              <Download className="w-5 h-5" /> Export Rules
            </button>
          </div>
        </header>

        <div className="glass-panel rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-white/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Zip Code</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Metro Area</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">State</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Route Code</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Zone</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRecords.map((r, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4 font-mono font-black text-sky-400">{r.zip}</td>
                    <td className="px-8 py-4 text-slate-300 font-bold">{r.metroArea}</td>
                    <td className="px-8 py-4 text-slate-500 uppercase font-black text-xs">{r.state}</td>
                    <td className="px-8 py-4">
                      {editingZip === r.zip ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(r.zip)}
                            className="bg-slate-800 border border-sky-500/50 rounded-lg px-3 py-1 text-emerald-400 font-bold w-32 focus:outline-none"
                            autoFocus
                          />
                          <button onClick={() => handleSaveEdit(r.zip)} className="text-emerald-400 hover:text-white transition-colors">
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => setEditingZip(null)} className="text-slate-500 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold tracking-wider">{r.routeConfiguration}</span>
                          <button
                            onClick={() => handleStartEdit(r)}
                            className="p-1 text-slate-600 hover:text-sky-400 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Save className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-4 text-slate-500">{r.destinationZone}</td>
                    <td className="px-8 py-4 text-right">
                      <button
                        onClick={() => handleDelete(r.zip)}
                        className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRecords.length === 0 && (
            <div className="p-20 flex flex-col items-center text-slate-800 opacity-20">
              <FileSpreadsheet className="w-20 h-20 mb-4" />
              <p className="font-black uppercase tracking-widest">No Rules Found</p>
            </div>
          )}
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
            src="/app_logo_fixed.png"
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
        </div>
        <button onClick={() => setShowApiConfig(true)} className="mt-auto p-4 text-slate-600 hover:text-sky-400 transition-colors">
          <Settings className="w-7 h-7" />
        </button>
      </div>

      <main className="flex-1 ml-24 p-10 lg:p-14 relative overflow-y-auto">
        {view === 'dashboard' ? <DashboardView /> : view === 'operator' ? <OperatorView /> : view === 'stacks' ? <RouteStackManager history={history} onAddTestData={handleAddTestData} /> : <RulesManagementView />}

        {view === 'operator' && (
          <button
            onClick={() => setView('dashboard')}
            className="fixed top-10 right-10 bg-slate-800/95 backdrop-blur-2xl border-2 border-sky-500/30 px-6 py-3 rounded-[20px] flex items-center gap-3 text-slate-200 hover:text-white hover:border-sky-500/50 transition-all hover:scale-105 z-[200] shadow-xl shadow-sky-500/10 group"
          >
            <Minimize2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-sm uppercase tracking-widest">Exit Station</span>
          </button>
        )}

        {showApiConfig && <ApiConfigModal />}

        {/* Update Notification */}
        <UpdateNotification />
      </main>
    </div>
  );
};

export default App;
