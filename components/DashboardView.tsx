import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Database,
    Download,
    Upload,
    Key,
    Trash2,
    RefreshCcw,
    Activity,
    Package,
    Save,
    Wifi,
    WifiOff,
    Server,
    RotateCw
} from 'lucide-react';
import { lanSyncService, type ConnectionStatus } from '../services/LanSyncService';
import { ResolvedRouteInfo, OrderEventStatus, EventType, ApiSettings } from '../types';
import { FlexibleDataSource } from '../services/RouteService';
import { ExcelExportService } from '../services/ExportService';
import StatCard from './StatCard';
import { useI18n } from '../contexts/I18nContext';

interface DashboardViewProps {
    apiSettings: ApiSettings;
    history: ResolvedRouteInfo[];
    operationLog: Record<string, OrderEventStatus[]>;
    selectedEventTypes: EventType[];
    dataSource: FlexibleDataSource;
    exportService: ExcelExportService;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onShowApiConfig: () => void;
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClearHistory: () => void;
    isSyncing?: boolean;
    onRequestSync?: (amount: 'full' | number) => void;
    onPushData?: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
    apiSettings,
    history,
    operationLog,
    selectedEventTypes,
    dataSource,
    exportService,
    fileInputRef,
    onShowApiConfig,
    onFileUpload,
    onClearHistory,
    isSyncing = false,
    onRequestSync = (_: 'full' | number) => { },
    onPushData = () => { }
}) => {
    const [syncStatus, setSyncStatus] = useState<ConnectionStatus>({
        connected: false,
        mode: 'standalone',
    });

    useEffect(() => {
        // Get initial status
        const initialStatus = lanSyncService.getStatus();
        setSyncStatus(initialStatus);

        // Subscribe to status updates
        const handleStatusChange = (status: ConnectionStatus) => {
            setSyncStatus(status);
        };

        lanSyncService.on('status', handleStatusChange);

        return () => {
            lanSyncService.off('status', handleStatusChange);
        };
    }, []);

    const { t } = useI18n();

    // Progressive loading for activity stream - only render visible items
    const INITIAL_VISIBLE = 30;
    const LOAD_MORE_COUNT = 20;
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        // Load more when scrolled near bottom (within 100px)
        if (scrollBottom < 100) {
            const totalItems = Object.keys(operationLog).length;
            if (visibleCount < totalItems) {
                setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, totalItems));
            }
        }
    }, [operationLog, visibleCount]);

    // Get visible entries only
    const allEntries = Object.entries(operationLog).reverse();
    const visibleEntries = allEntries.slice(0, visibleCount);

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.controlCenter')}</h1>
                        <div className="text-slate-500 text-sm mt-1">Source: <span className="text-emerald-400 font-mono uppercase">{dataSource.getCurrentSourceName()}</span></div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${apiSettings.enabled ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500'}`}>
                        <Database className="w-3 h-3" /> {apiSettings.enabled ? t('dashboard.remoteEngineOn') : t('dashboard.localOnly')}
                    </div>
                    {syncStatus.connected && (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${syncStatus.mode === 'host'
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            : 'bg-green-500/10 border-green-500/20 text-green-400'
                            }`}>
                            {syncStatus.mode === 'host' ? (
                                <>
                                    <Server className="w-3 h-3" /> Host ({syncStatus.clientCount || 0})
                                </>
                            ) : (
                                <>
                                    <Wifi className="w-3 h-3" /> Client
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onShowApiConfig} className="bg-slate-800 p-3 px-5 rounded-xl border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors"><Key className="w-4 h-4" /> {t('dashboard.apiConfig')}</button>
                    <button onClick={() => exportService.exportActivityLog(operationLog)} disabled={Object.keys(operationLog).length === 0} className="bg-sky-500 p-3 px-5 rounded-xl border border-sky-400/50 flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"><Download className="w-4 h-4" /> {t('dashboard.exportLog')}</button>
                    <button
                        onClick={onClearHistory}
                        disabled={syncStatus.mode === 'client'}
                        title={syncStatus.mode === 'client' ? 'Reset is disabled in Client mode' : ''}
                        className={`p-3 px-5 rounded-xl border flex items-center gap-2 transition-colors ${syncStatus.mode === 'client'
                            ? 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed'
                            : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                            }`}
                    >
                        <Trash2 className="w-4 h-4" /> {t('common.reset')}
                    </button>
                    {/* Sync Request Button - Only visible in Client mode */}
                    {/* Sync Request Button - Only visible in Client mode */}
                    {syncStatus.mode === 'client' && (
                        <div className="flex gap-2 items-center">
                            {/* Push Data Button */}
                            <button
                                onClick={onPushData}
                                disabled={isSyncing}
                                className={`p-3 px-5 rounded-xl border flex items-center gap-2 transition-colors ${isSyncing
                                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300 cursor-not-allowed'
                                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                                    }`}
                                title="Push local data to Host"
                            >
                                <Upload className={`w-4 h-4 ${isSyncing ? 'animate-bounce' : ''}`} />
                                {t('common.push')}
                            </button>

                            <div className="relative group">
                                <button
                                    onClick={() => onRequestSync('full')}
                                    disabled={isSyncing}
                                    className={`p-3 px-5 rounded-xl border flex items-center gap-2 transition-colors ${isSyncing
                                        ? 'bg-blue-500/20 border-blue-500/30 text-blue-300 cursor-not-allowed'
                                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
                                        }`}
                                    title="Request full sync from Host"
                                >
                                    <RotateCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                                    {isSyncing ? t('common.loading') : t('common.sync')}
                                </button>
                                {/* Dropdown for sync options - Hide when syncing */}
                                {!isSyncing && (
                                    <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[150px]">
                                        <button
                                            onClick={() => onRequestSync('full')}
                                            className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                                        >
                                            🔄 Full Sync
                                        </button>
                                        <button
                                            onClick={() => onRequestSync(500)}
                                            className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                                        >
                                            📦 Last 500
                                        </button>
                                        <button
                                            onClick={() => onRequestSync(200)}
                                            className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                                        >
                                            📋 Last 200
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label={t('dashboard.liveSync')} value={apiSettings.enabled ? t('common.active') : t('common.disabled')} colorClass={apiSettings.enabled ? "text-emerald-400" : "text-slate-500"} icon={<RefreshCcw className={`w-4 h-4 ${apiSettings.enabled ? 'animate-spin-slow' : ''}`} />} />
                <StatCard label={t('dashboard.routesResolved')} value={history.length} />
                <StatCard label={t('dashboard.totalActivity')} value={Object.keys(operationLog).length} colorClass="text-purple-400" />
                <StatCard label={t('dashboard.operationalMode')} value={selectedEventTypes.join(' + ')} colorClass="text-amber-400" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 glass-panel p-8 rounded-3xl min-h-[400px] flex flex-col shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-400 uppercase tracking-widest">{t('dashboard.liveActivityStream')}</h2>
                        <div className="flex gap-4">
                            <div className="text-xs text-slate-600 font-mono">{t('dashboard.storageOk')}</div>
                            <div className="text-xs text-slate-600 font-mono">{t('common.backend')}: {apiSettings.enabled ? 'WPGLB' : t('common.local').toUpperCase()}</div>
                        </div>
                    </div>
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[500px]"
                    >
                        {Object.keys(operationLog).length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-slate-500 space-y-4">
                                <Activity className="w-16 h-16" />
                                <p className="uppercase tracking-[0.3em] text-sm">{t('dashboard.waitingForActivity')}</p>
                            </div>
                        ) : (
                            <>
                                {visibleEntries.map(([id, events]) => (
                                    <div key={id} className="flex items-center justify-between p-5 bg-slate-900/40 rounded-[24px] border border-white/5 hover:border-sky-500/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-sky-400 border border-white/5">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-mono font-black text-white text-lg tracking-wider uppercase">{id}</div>
                                                <div className="text-[10px] text-slate-500 uppercase tracking-widest">{(events as OrderEventStatus[]).every(e => e.status === 'SUCCESS') ? t('dashboard.processingComplete') : t('dashboard.inTransit')}</div>
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
                                ))}
                                {visibleCount < allEntries.length && (
                                    <div className="text-center py-4 text-slate-500 text-sm">
                                        ↓ Scroll to load more ({visibleCount}/{allEntries.length})
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="glass-panel p-8 rounded-3xl flex flex-col shadow-2xl">
                    <h2 className="font-bold mb-6 text-slate-400 uppercase tracking-widest text-sm">{t('dashboard.systemHealth')}</h2>
                    <div className="space-y-6">
                        <div className="p-6 bg-slate-800/30 rounded-[24px] border border-white/5 flex items-center justify-between">
                            <div>
                                <div className="text-slate-500 text-[10px] font-black uppercase mb-1">{t('dashboard.localStorage')}</div>
                                <div className="text-3xl font-black text-white">{(JSON.stringify(operationLog).length / 1024).toFixed(1)} KB</div>
                            </div>
                            <Save className="w-8 h-8 text-sky-500/40" />
                        </div>
                        <div className="p-6 bg-slate-800/30 rounded-[24px] border border-white/5 flex items-center justify-between">
                            <div>
                                <div className="text-slate-500 text-[10px] font-black uppercase mb-1">{t('dashboard.lookupSource')}</div>
                                <div className="text-2xl font-black text-white truncate max-w-[150px] uppercase">{apiSettings.enabled ? 'Wpglb API' : dataSource.getCurrentSourceName()}</div>
                            </div>
                            <Database className="w-8 h-8 text-emerald-500/40" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
