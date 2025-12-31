import React from 'react';
import {
    Database,
    Download,
    Upload,
    Key,
    Trash2,
    RefreshCcw,
    Activity,
    Package,
    Save
} from 'lucide-react';
import { ResolvedRouteInfo, OrderEventStatus, EventType, ApiSettings } from '../types';
import { FlexibleDataSource } from '../services/RouteService';
import { ExcelExportService } from '../services/ExportService';
import StatCard from './StatCard';

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
    onClearHistory
}) => {
    return (
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
                    <button onClick={onShowApiConfig} className="bg-slate-800 p-3 px-5 rounded-xl border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors"><Key className="w-4 h-4" /> API Config</button>
                    <button onClick={() => fileInputRef.current?.click()} className="bg-slate-800 p-3 px-5 rounded-xl border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors"><Upload className="w-4 h-4" /> Table Config</button>
                    <input ref={fileInputRef} type="file" onChange={onFileUpload} className="hidden" />
                    <button onClick={() => exportService.exportActivityLog(operationLog)} disabled={Object.keys(operationLog).length === 0} className="bg-sky-500 p-3 px-5 rounded-xl border border-sky-400/50 flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"><Download className="w-4 h-4" /> Export Log</button>
                    <button onClick={onClearHistory} className="bg-red-500/10 p-3 px-5 rounded-xl border border-red-500/20 text-red-400 flex items-center gap-2 hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4" /> Reset</button>
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
};

export default DashboardView;
