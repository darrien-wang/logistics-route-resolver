import React from 'react';
import {
    Settings,
    CheckCircle2,
    ClipboardList,
    Download,
    ChevronRight,
    RefreshCcw,
    Activity,
    ScanBarcode,
    AlertCircle,
    Layers,
    Printer
} from 'lucide-react';
import { ResolvedRouteInfo, OrderEventStatus, EventType, ApiSettings } from '../types';
import { ExcelExportService } from '../services/ExportService';

interface OperatorViewProps {
    // State props
    apiSettings: ApiSettings;
    operationLog: Record<string, OrderEventStatus[]>;
    selectedEventTypes: EventType[];
    orderId: string;
    loading: boolean;
    error: string | null;
    batchMode: { active: boolean; ids: string[] };
    isBatchComplete: boolean;
    currentResult: ResolvedRouteInfo | null;
    printStatus: 'idle' | 'printing';
    exportService: ExcelExportService;
    scannerInputRef: React.RefObject<HTMLInputElement>;

    // Callbacks
    onToggleEventType: (type: EventType) => void;
    onOrderIdChange: (value: string) => void;
    onSearch: (id: string) => void;
}

const OperatorView: React.FC<OperatorViewProps> = ({
    apiSettings,
    operationLog,
    selectedEventTypes,
    orderId,
    loading,
    error,
    batchMode,
    isBatchComplete,
    currentResult,
    printStatus,
    exportService,
    scannerInputRef,
    onToggleEventType,
    onOrderIdChange,
    onSearch
}) => {
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
                                onClick={() => onToggleEventType(type)}
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
                                        <span className="font-mono text-base text-sky-400 font-black tracking-widest uppercase">{id}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-800 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="space-y-3">
                                    {(events as OrderEventStatus[]).map((e, idx) => (
                                        <div key={idx} className="flex flex-col space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${e.status === 'FAILED' ? 'bg-red-500/10 border-red-500/20' : e.status === 'SUCCESS' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-800 border-white/10'}`}>
                                                    <span className="text-xs font-black text-slate-400 tracking-wider uppercase">{e.type}</span>
                                                    <span className={`text-xs font-black uppercase ${e.status === 'FAILED' ? 'text-red-400' : e.status === 'SUCCESS' ? 'text-emerald-400' : 'text-slate-400'}`}>
                                                        {e.status}
                                                    </span>
                                                </div>
                                            </div>
                                            {e.message && (
                                                <div className={`text-[10px] font-bold p-3 rounded-xl border ${e.status === 'FAILED' ? 'bg-red-950/30 border-red-500/20 text-red-400' : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'}`}>
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
                <form onSubmit={(e) => { e.preventDefault(); onSearch(orderId); }} className="relative group">
                    <input
                        ref={scannerInputRef}
                        type="text"
                        placeholder="USE SPACE TO BATCH"
                        value={orderId}
                        onChange={(e) => onOrderIdChange(e.target.value)}
                        className="w-full bg-slate-900/60 border-[3px] border-white/5 rounded-[24px] py-4 px-8 text-xl font-black text-center text-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all placeholder:text-slate-500 uppercase tracking-widest shadow-2xl"
                    />
                    {loading && <RefreshCcw className="absolute right-12 top-1/2 -translate-y-1/2 w-12 h-12 text-sky-400 animate-spin" />}
                    <div className="absolute left-12 top-1/2 -translate-y-1/2 flex items-center gap-4 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                        <ScanBarcode className="w-12 h-12 text-slate-400" />
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
                        <div className="flex flex-col items-center space-y-4 animate-in zoom-in-95 duration-150 w-full h-full">
                            <div className={`${currentHasFailed ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/10'} border-[4px] p-4 pb-8 rounded-[40px] shadow-[0_0_80px_rgba(52,211,153,0.15)] relative transition-colors duration-500 flex flex-col items-center w-full flex-1`}>
                                <div className={`text-[12rem] leading-none font-black text-white drop-shadow-[0_0_70px_rgba(255,255,255,0.3)] tracking-tighter whitespace-nowrap px-10 mt-6`}>
                                    <div className="flex items-center gap-8 justify-center">
                                        <span>{currentResult.route?.routeConfiguration || 'N/A'}</span>
                                    </div>
                                </div>



                                {/* Stack Number Display */}
                                {currentResult.stackInfo && (
                                    <div className="mt-4 flex flex-col items-center space-y-2">




                                        {currentResult.stackInfo.currentCount >= currentResult.stackInfo.capacity && (
                                            <div className="mt-8 bg-red-600 px-24 py-8 rounded-[3rem] shadow-[0_0_100px_rgba(220,38,38,0.6)] border-8 border-red-500">
                                                <span className="text-white font-black text-[10em] leading-none tracking-[0.1em] uppercase drop-shadow-2xl">FULL</span>
                                            </div>
                                        )}
                                        <div className="text-5xl font-black text-sky-400">
                                            #{String(currentResult.stackInfo.stackNumber).padStart(3, '0')}

                                        </div>
                                        {/* Capacity Bar */}
                                        <div className="w-72 bg-slate-800/50 rounded-full h-5 overflow-hidden border-2 border-white/10">
                                            <div
                                                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
                                                style={{ width: `${(currentResult.stackInfo.currentCount / currentResult.stackInfo.capacity) * 100}%` }}
                                            />
                                        </div>

                                    </div>
                                )}

                                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 border-3 ${currentHasFailed ? 'border-red-500' : 'border-emerald-500/50'} px-8 py-2 rounded-full shadow-2xl transition-colors`}>
                                    <span className="font-black text-2xl tracking-[0.15em] uppercase">
                                        <span className={currentHasFailed ? 'text-red-500' : 'text-emerald-400'}>{currentResult.orderId.slice(0, -4)}</span>
                                        <span className="text-yellow-400">{currentResult.orderId.slice(-4)}</span>
                                    </span>
                                </div>

                                {/* Stack Full Warning */}
                                {currentResult.stackInfo?.isNewStack && currentResult.stackInfo.stackNumber > 1 && (
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-black text-lg uppercase tracking-widest shadow-xl animate-pulse z-20">
                                        ⚠️ Stack #{String(currentResult.stackInfo.stackNumber - 1).padStart(3, '0')} FULL - Now #{String(currentResult.stackInfo.stackNumber).padStart(3, '0')}
                                    </div>
                                )}

                                {/* Result Card Content */}
                                <div className="flex-1 relative animate-in zoom-in-95 duration-500 flex flex-col w-full mt-4 mb-2">
                                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-full bg-sky-500/20 blur-[80px] rounded-full animate-pulse-slow"></div>
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

export default OperatorView;
