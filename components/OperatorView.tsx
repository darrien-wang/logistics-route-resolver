import React, { useEffect, useRef, useState } from 'react';
import { Package, RotateCcw, Box, Scan, Printer, ChevronDown, Check } from 'lucide-react';
import { ResolvedRouteInfo, ApiSettings, OrderEventStatus, EventType } from '../types';
import { ExcelExportService } from '../services/ExportService';

interface OperatorViewProps {
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
    onToggleEventType: (type: EventType) => void;
    onOrderIdChange: (id: string) => void;
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

    const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
    const eventMenuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (eventMenuRef.current && !eventMenuRef.current.contains(event.target as Node)) {
                setIsEventMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Audio ---
    const scanSoundRef = useRef<HTMLAudioElement | null>(null);
    const errorSoundRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        scanSoundRef.current = new Audio('/sounds/scan.mp3');
        errorSoundRef.current = new Audio('/sounds/error.mp3');
    }, []);

    // Play sounds based on result changes
    useEffect(() => {
        if (currentResult?.operationStatus === 'error' || error) {
            errorSoundRef.current?.play().catch(() => { });
        } else if (currentResult?.operationStatus === 'success') {
            scanSoundRef.current?.play().catch(() => { });
        }
    }, [currentResult, error]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(orderId);
        }
    };

    // Helper to get latest event for an order ID
    const getLatestEvent = (id: string) => {
        const events = operationLog[id] || [];
        return events[events.length - 1]; // Simply take last one
    };

    // Flatten history for display (reverse chronological)
    const historyEntries = Object.entries(operationLog).reverse().map(([id, events]) => ({
        id,
        events: events as OrderEventStatus[],
        timestamp: (events as OrderEventStatus[])[0]?.timestamp // Use first event for timestamp
    }));

    const currentHasFailed = currentResult?.operationStatus === 'fail' || currentResult?.operationStatus === 'error' || error !== null;

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-sky-500/30">
            {/* Top Bar: Input Area */}
            <div className="flex-none p-6 bg-slate-900 border-b border-slate-800 shadow-xl z-20">
                <div className="max-w-7xl mx-auto w-full flex gap-6 items-center">
                    <div className="relative flex-1 group">
                        <div className={`absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors duration-300 ${loading ? 'text-sky-400' : 'text-slate-500 group-focus-within:text-sky-400'}`}>
                            <Scan className={`w-8 h-8 ${loading ? 'animate-pulse' : ''}`} />
                        </div>
                        <input
                            ref={scannerInputRef}
                            type="text"
                            value={orderId}
                            onChange={(e) => onOrderIdChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="block w-full pl-20 pr-48 py-6 bg-slate-950 border-2 border-slate-800 rounded-2xl text-4xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 transition-all shadow-inner tracking-wide uppercase"
                            placeholder="SCAN TRACKING LABELS..."
                            autoComplete="off"
                            autoFocus
                        />
                        {loading && (
                            <div className="absolute inset-y-0 right-40 pr-6 flex items-center">
                                <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* Event Selector Dropdown */}
                        <div className="absolute inset-y-2 right-2 flex items-center" ref={eventMenuRef}>
                            <button
                                onClick={() => setIsEventMenuOpen(!isEventMenuOpen)}
                                className={`h-full px-6 rounded-xl border-2 flex items-center gap-3 transition-colors ${selectedEventTypes.length > 0
                                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                                    : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <span className="font-bold tracking-wider text-sm">
                                    {selectedEventTypes.length === 0
                                        ? 'EVENTS'
                                        : selectedEventTypes.length === 1
                                            ? selectedEventTypes[0]
                                            : `${selectedEventTypes.length} EVENTS`
                                    }
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isEventMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isEventMenuOpen && (
                                <div className="absolute top-full right-0 mt-3 w-64 bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2">
                                    {(['RECEIVE', 'UNLOAD', 'SORT', 'DISPATCH'] as EventType[]).map(type => {
                                        const isSelected = selectedEventTypes.includes(type);
                                        return (
                                            <button
                                                key={type}
                                                onClick={() => onToggleEventType(type)}
                                                className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all ${isSelected
                                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                                                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                <span className="font-bold tracking-wider text-sm">{type}</span>
                                                {isSelected && <Check className="w-5 h-5" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Activity Feed */}
                <div className="w-1/3 min-w-[400px] max-w-xl bg-slate-900/50 border-r border-slate-800 flex flex-col backdrop-blur-sm">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <RotateCcw className="w-5 h-5" />
                            Activity Stream
                        </h2>
                        <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400">
                            {Object.keys(operationLog).length} EVENTS
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {historyEntries.map(({ id, events, timestamp }, idx) => {
                            const isError = events.some(e => e.status === 'FAILED');
                            const isSuccess = events.every(e => e.status === 'SUCCESS');

                            return (
                                <div key={idx} className={`group relative p-4 rounded-xl border transition-all duration-300 ${idx === 0
                                    ? 'bg-slate-800/80 border-slate-600 shadow-lg scale-[1.02] mb-4'
                                    : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-800 hover:border-slate-700 text-slate-400'
                                    }`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-mono text-sm tracking-tight opacity-70">
                                            {timestamp ? new Date(timestamp).toLocaleTimeString() : '--:--'}
                                        </div>
                                        {/* Status Badge */}
                                        <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${isSuccess ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            isError ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-slate-700 text-slate-400 border-slate-600'
                                            }`}>
                                            {isSuccess ? 'SUCCESS' : isError ? 'FAILED' : 'PENDING'}
                                        </div>
                                    </div>

                                    {/* Order ID */}
                                    <div className={`font-mono font-bold text-xl mb-1 tracking-tight ${idx === 0 ? 'text-white' : ''}`}>
                                        {id}
                                    </div>

                                    {/* Events Logic */}
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {events.map((e, eIdx) => (
                                            <span key={eIdx} className={`text-[10px] px-2 py-0.5 rounded border ${e.status === 'SUCCESS' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50' :
                                                e.status === 'FAILED' ? 'bg-red-950/30 text-red-400 border-red-900/50' :
                                                    'bg-amber-950/30 text-amber-400 border-amber-900/50'
                                                }`}>
                                                {e.type}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {historyEntries.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-600 space-y-4">
                                <Box className="w-16 h-16 opacity-20" />
                                <p className="font-medium">No activity yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Current Result Display */}
                <div className="flex-1 relative bg-slate-950 flex flex-col justify-center items-center p-12">
                    {/* Background Ambient Glow */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${currentResult || error ? 'opacity-100' : 'opacity-0'}`}>
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${currentHasFailed ? 'bg-red-900/20' : 'bg-sky-900/10'
                            }`}></div>
                    </div>

                    {/* Batch Mode Indicator */}
                    {batchMode.active && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col gap-3 items-center pointer-events-none">
                            <div className={`px-8 py-4 rounded-2xl border-[3px] font-black tracking-widest uppercase flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 ${isBatchComplete
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-125'
                                : 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                                }`}>
                                <Box className={`w-6 h-6 ${!isBatchComplete && 'animate-bounce'}`} />
                                <span className="text-lg drop-shadow-lg">{isBatchComplete ? 'Batch Complete' : 'Batch Active'}</span>
                            </div>
                            {!isBatchComplete && (
                                <div className="px-6 py-2 bg-slate-900/90 rounded-full border border-slate-700 text-sm font-mono text-slate-400 shadow-xl backdrop-blur-sm">
                                    <span className="text-white font-bold">{batchMode.ids.length}</span> items remaining
                                </div>
                            )}
                            {isBatchComplete && (
                                <div className="px-6 py-2 bg-emerald-900/90 rounded-full border border-emerald-500/30 text-sm font-bold text-emerald-400 shadow-xl backdrop-blur-sm animate-in slide-in-from-top-2">
                                    ALL ITEMS SCANNED
                                </div>
                            )}
                        </div>
                    )}

                    {error ? (
                        <div className={`${error === 'TOKEN EXPIRED' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-red-500/10 border-red-500/30'} border-8 p-24 rounded-[80px] flex flex-col items-center space-y-8 animate-in zoom-in-90 shadow-[0_0_100px_rgba(239,68,68,0.2)]`}>
                            <div className={`text-7xl font-black uppercase tracking-tighter text-center ${error === 'TOKEN EXPIRED' ? 'text-amber-400' : 'text-red-500'}`}>{error}</div>
                            {error === 'TOKEN EXPIRED' && (
                                <div className="text-2xl text-amber-300 font-bold animate-pulse">Please update your token in Settings</div>
                            )}
                        </div>
                    ) : currentResult ? (
                        <div className="relative w-full max-w-4xl z-10 animate-in fade-in zoom-in-50 duration-300">
                            {/* Floating Status Badge (Order ID) */}
                            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border-4 ${currentHasFailed ? 'border-red-500' : 'border-emerald-500/50'} px-10 py-3 rounded-full shadow-2xl transition-colors z-50`}>
                                <span className="font-black text-3xl tracking-[0.15em] uppercase whitespace-nowrap">
                                    <span className={currentHasFailed ? 'text-red-500' : 'text-emerald-400'}>{currentResult.orderId.slice(0, -4)}</span>
                                    <span className="text-yellow-400">{currentResult.orderId.slice(-4)}</span>
                                </span>
                            </div>

                            {/* Main Content Card */}
                            <div className={`relative bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border-4 overflow-hidden shadow-2xl transition-all duration-500 flex-1 flex flex-col justify-center ${currentHasFailed ? 'border-red-500 shadow-[0_0_100px_rgba(220,38,38,0.2)]' : 'border-slate-700 hover:border-sky-500/30 shadow-[0_0_80px_rgba(14,165,233,0.1)]'
                                }`}>
                                <div className="p-8 text-center flex-1 flex flex-col justify-center min-h-[300px]">

                                    {/* Print Status Badge */}
                                    {printStatus === 'printing' && (
                                        <div className="absolute top-6 right-6 flex items-center gap-3 bg-sky-500/20 border border-sky-500/30 px-4 py-2 rounded-full animate-in slide-in-from-top-4 fade-in duration-300 z-40">
                                            <Printer className="w-4 h-4 text-sky-400 animate-pulse" />
                                            <span className="text-sky-400 font-bold text-xs tracking-wider uppercase">Printing Sent</span>
                                        </div>
                                    )}

                                    {/* Route Configuration Display - Reduced Size */}
                                    <div className={`text-[10rem] leading-none font-black text-white drop-shadow-[0_0_70px_rgba(255,255,255,0.3)] tracking-tighter whitespace-nowrap px-4 mt-2 flex justify-center`}>
                                        <div className="flex items-center gap-8 justify-center">
                                            <span>{currentResult.route?.routeConfiguration || 'N/A'}</span>
                                        </div>
                                    </div>

                                    {/* Stack Logic Display */}
                                    {currentResult.stackInfo && (
                                        <div className="mt-4 flex flex-col items-center gap-4 animate-in zoom-in-50 duration-500">
                                            {/* FULL INDICATOR - Static & Compact */}
                                            {(currentResult.stackInfo.activeValue ?? currentResult.stackInfo.currentCount) >= (currentResult.stackInfo.activeCapacity ?? currentResult.stackInfo.capacity) && (
                                                <div className="mb-2 bg-red-600 px-16 py-4 rounded-[2rem] shadow-xl border-4 border-red-500 pointer-events-none">
                                                    <span className="text-white font-black text-[6em] leading-none tracking-[0.1em] uppercase drop-shadow-md">FULL</span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-6">
                                                {/* Stack # */}
                                                <div className="text-5xl font-black text-sky-400">
                                                    #{String(currentResult.stackInfo.stackNumber).padStart(3, '0')}
                                                </div>

                                                {/* Progress Bar (Linear) */}
                                                <div className="w-80 h-10 bg-slate-900 rounded-xl border-4 border-slate-700 relative overflow-hidden flex items-center shadow-inner">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-sky-600 to-emerald-500 transition-all duration-500 relative z-10"
                                                        style={{ width: `${Math.min(((currentResult.stackInfo.activeValue || currentResult.stackInfo.currentCount) / (currentResult.stackInfo.activeCapacity || currentResult.stackInfo.capacity)) * 100, 100)}%` }}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                                        <span className="font-black text-lg text-white tracking-widest drop-shadow-md">
                                                            {currentResult.stackInfo.activeValue ?? currentResult.stackInfo.currentCount} / {currentResult.stackInfo.activeCapacity ?? currentResult.stackInfo.capacity} {currentResult.stackInfo.activeUnit || 'pcs'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Stack Full Warning (Previous Stack) */}
                                {currentResult.stackInfo?.isNewStack && currentResult.stackInfo.stackNumber > 1 && (
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-black text-lg uppercase tracking-widest shadow-xl animate-pulse z-20">
                                        ⚠️ Stack #{String(currentResult.stackInfo.stackNumber - 1).padStart(3, '0')} FULL - Now #{String(currentResult.stackInfo.stackNumber).padStart(3, '0')}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Default Empty State
                        <div className="text-center space-y-8 opacity-30 animate-pulse">
                            <Package className="w-32 h-32 mx-auto text-slate-600" />
                            <h1 className="text-4xl font-black tracking-widest text-slate-700 uppercase">
                                Ready to Scan
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OperatorView;
