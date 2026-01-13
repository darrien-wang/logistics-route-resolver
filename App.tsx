
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Settings,
  Maximize2,
  ClipboardList,
  Layers,
  Wifi,
  Filter
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { ResolvedRouteInfo, ZipRouteRecord, EventType } from './types';
import { FlexibleDataSource } from './services/RouteService';
import { ExcelExportService } from './services/ExportService';
import { routeStackService } from './services/RouteStackService';
import { printMappingConditionService } from './services/PrintMappingConditionService';
import RouteStackManager from './components/RouteStackManager';
import ApiConfigModal from './components/ApiConfigModal';
import RulesManagementView from './components/RulesManagementView';
import DashboardView from './components/DashboardView';
import OperatorView from './components/OperatorView';
import NetworkSettingsView from './components/NetworkSettingsView';
import UpdateNotification from './components/UpdateNotification';
import TokenExpiredModal from './components/TokenExpiredModal';
import PrintConditionManager from './components/PrintConditionManager';
import WhatsNewModal from './components/WhatsNewModal';
import LanguageSwitcher from './components/LanguageSwitcher';
import { I18nProvider } from './contexts/I18nContext';
import { useAppPersistence } from './hooks/useAppPersistence';
import { useLanSync } from './hooks/useLanSync';
import { useRouteResolution } from './hooks/useRouteResolution';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'operator' | 'rules' | 'stacks' | 'network'>('dashboard');
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [showTokenExpired, setShowTokenExpired] = useState(false);
  const [showPrintConditions, setShowPrintConditions] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [appVersion, setAppVersion] = useState<string>('');

  // Persistence Hook - now uses IndexedDB for large data storage
  const {
    operationLog,
    setOperationLog,
    apiSettings,
    setApiSettings,
    stackDefs,
    setStackDefs,
    history,
    setHistory,
    clearAllData,
    isLoading
  } = useAppPersistence();

  const scannerInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dataSource = useMemo(() => new FlexibleDataSource(), []);
  const exportService = useMemo(() => new ExcelExportService(), []);

  // Token expiration helper
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



  // Load default rules from bundled Excel file
  const loadDefaultRulesFromExcel = useCallback(async () => {
    try {
      const response = await fetch('/已开发邮编线路汇总999999.xlsx');
      if (!response.ok) {
        console.warn('[App] Default rules file not found, using fallback constants.');
        return;
      }
      const arrayBuffer = await response.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data: any[] = XLSX.utils.sheet_to_json(ws);

      const newRecords: ZipRouteRecord[] = data.map(row => ({
        zip: (row['Ship-to Zipcodes'] || row['Zipcode'] || row['邮编'] || "").toString(),
        metroArea: row['Metro Area'] || row['城市'] || "",
        state: row['State'] || row['州'] || "",
        destinationZone: (row['Destination Zone'] || row['目的地区'] || "").toString(),
        routeConfiguration: row['Route Configuration'] || row['线路'] || "",
        route2Configuration: row['ROUTE2 Configuration'] || row['线路2'] || ""
      })).filter(r => r.zip);

      if (newRecords.length > 0) {
        dataSource.updateData(newRecords, '已开发邮编线路汇总999999.xlsx');
        console.log(`[App] Loaded ${newRecords.length} default rules from Excel.`);
      }
    } catch (error) {
      console.error('[App] Failed to load default rules:', error);
    }
  }, [dataSource]);

  // Check token expiration on app mount (only if API is enabled)
  useEffect(() => {
    if (apiSettings.enabled && isTokenExpired()) {
      setShowTokenExpired(true);
    }

    // Load default rules from bundled Excel file
    loadDefaultRulesFromExcel();

    // Get app version from Electron API
    const electronAPI = (window as any).electronAPI;
    if (electronAPI?.updater?.getAppVersion) {
      electronAPI.updater.getAppVersion().then((version: string) => {
        const v = version || 'dev';
        setAppVersion(v);
        // Check if version changed (for What's New popup)
        const lastSeenVersion = localStorage.getItem('lastSeenVersion');
        if (lastSeenVersion !== v && v !== 'dev') {
          setShowWhatsNew(true);
        }
      }).catch(() => setAppVersion('dev'));
    } else {
      setAppVersion('dev');
    }
  }, []);

  // Selected Event Types State (Local UI state)
  const [selectedEventTypes, setSelectedEventTypes] = useState<EventType[]>([]);

  const toggleEventType = (type: EventType) => {
    setSelectedEventTypes(prev =>
      prev.includes(type) ? [] : [type]
    );
  };

  // Route Resolution Hook
  const {
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
  } = useRouteResolution({
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
  });

  // LAN Sync Hook
  const { broadcastState } = useLanSync({
    history,
    operationLog,
    stackDefs,
    apiSettings,
    setHistory,
    setOperationLog,
    setStackDefs,
    setCurrentResult,
    handleSearch
  });

  const isBatchComplete = useMemo(() => {
    if (!batchMode.active || batchMode.ids.length === 0) return false;
    return batchMode.ids.every(id => {
      const events = operationLog[id.toUpperCase()];
      if (!events) return false;
      return events.every(e => e.status === 'SUCCESS' || e.status === 'FAILED');
    });
  }, [batchMode, operationLog]);

  const clearHistory = () => {
    if (confirm("Clear all activity history?")) {
      // Clear all persisted data
      clearAllData();
      // Clear React state to match first-launch state
      setOperationLog({});
      setHistory([]);
      setStackDefs([]);
      setCurrentResult(null);
      setError(null);
      setBatchMode({ active: false, ids: [] });
      setSelectedEventTypes([]);
      setOrderId('');
      // Refocus input after clear
      setTimeout(() => scannerInputRef.current?.focus(), 100);
    }
  };

  const handleAddTestData = useCallback((testOrders: ResolvedRouteInfo[]) => {
    setHistory(prev => {
      const existingIds = new Set(prev.map(o => o.orderId));
      const newOrders = testOrders.filter(o => !existingIds.has(o.orderId));
      return [...newOrders, ...prev];
    });
  }, []);

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

  const handleImportOrders = useCallback((newOrders: ResolvedRouteInfo[]) => {
    setHistory((prev) => {
      const merged = [...prev];
      const idMap = new Map();
      prev.forEach((o, i) => idMap.set(o.orderId, i));

      newOrders.forEach(order => {
        const idx = idMap.get(order.orderId);
        if (idx === undefined) {
          merged.push(order);
          idMap.set(order.orderId, merged.length - 1);
        } else {
          const existing = merged[idx];
          // Only update if existing is placeholder AND new is placeholder (preserve Active status)
          if (existing.isPlaceholder && order.isPlaceholder) {
            merged[idx] = order;
          }
        }
      });
      return merged;
    });
  }, []);

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

  // Show loading screen while IndexedDB initializes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <I18nProvider>
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

          {/* Version Number - Click for What's New, Right-click for updates */}
          <button
            onClick={() => setShowWhatsNew(true)}
            onContextMenu={(e) => {
              e.preventDefault();
              const electronAPI = (window as any).electronAPI;
              if (electronAPI?.updater?.checkForUpdates) {
                electronAPI.updater.checkForUpdates();
              }
            }}
            className="mt-auto mb-2 text-slate-600 hover:text-sky-400 transition-colors text-xs font-mono"
            title="Click for What's New • Right-click to check updates"
          >
            v{appVersion}
          </button>

          <LanguageSwitcher compact className="mb-2" />

          <button onClick={() => setShowApiConfig(true)} className="p-4 text-slate-600 hover:text-sky-400 transition-colors">
            <Settings className="w-7 h-7" />
          </button>

          {/* Print Condition Filter Button */}
          <button
            onClick={() => setShowPrintConditions(true)}
            className={`p-4 rounded-2xl transition-all ${printMappingConditionService.isEnabled()
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'text-slate-600 hover:text-slate-400'
              }`}
            title="Print Mapping Conditions"
          >
            <Filter className="w-7 h-7" />
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
              history={history}
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
            <RouteStackManager
              history={history}
              apiSettings={apiSettings}
              onSettingsChange={setApiSettings}
              onAddTestData={handleAddTestData}
              onImportOrders={handleImportOrders}
              stackDefs={stackDefs}
              setStackDefs={setStackDefs}
            />
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

          <PrintConditionManager
            isOpen={showPrintConditions}
            onClose={() => setShowPrintConditions(false)}
          />

          <WhatsNewModal
            isOpen={showWhatsNew}
            onClose={() => {
              setShowWhatsNew(false);
              // Save current version as seen
              if (appVersion && appVersion !== 'dev') {
                localStorage.setItem('lastSeenVersion', appVersion);
              }
            }}
            currentVersion={appVersion}
          />

          {/* Update Notification */}
          <UpdateNotification />
        </main>
      </div>
    </I18nProvider>
  );
};

export default App;
