import React, { useState, useEffect } from 'react';
import { X, Package, MapPin, Calendar, CheckSquare, Square } from 'lucide-react';
import { ResolvedRouteInfo, MergedStackComponent } from '../types';

interface OrderDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    orders: ResolvedRouteInfo[];
    mergeInfo?: {
        components: MergedStackComponent[];
    };
    onMoveOrders?: (ids: string[]) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, title, orders, mergeInfo, onMoveOrders }) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Reset selection when modal opens/orders change
    useEffect(() => {
        setSelectedIds(new Set());
    }, [isOpen, orders]);

    if (!isOpen) return null;

    const toggleSelection = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const toggleAll = () => {
        if (selectedIds.size === orders.length) setSelectedIds(new Set());
        else setSelectedIds(new Set(orders.map(o => o.orderId)));
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-5xl max-h-[90vh] glass-panel rounded-[40px] p-10 border-white/10 shadow-[0_0_100px_rgba(56,189,248,0.2)] animate-in zoom-in-95 duration-300 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                            <Package className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-widest text-white">{title}</h2>
                            <p className="text-slate-500 text-sm mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} in this stack</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {onMoveOrders && selectedIds.size > 0 && (
                            <button
                                onClick={() => onMoveOrders(Array.from(selectedIds))}
                                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors flex items-center gap-2"
                            >
                                <Package className="w-4 h-4" />
                                MOVE SELECTED ({selectedIds.size})
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                {onMoveOrders && orders.length > 0 && (
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <button
                            onClick={toggleAll}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2 ${selectedIds.size === orders.length
                                    ? 'bg-sky-500/20 border-sky-500/50 text-sky-400'
                                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                                }`}
                        >
                            {selectedIds.size === orders.length ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            {selectedIds.size === orders.length ? 'DESELECT ALL' : 'SELECT ALL'}
                        </button>
                        <span className="text-xs text-slate-500 font-mono">
                            {selectedIds.size} SELECTED
                        </span>
                    </div>
                )}

                {/* Order List */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {orders.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-700 opacity-30">
                            <Package className="w-20 h-20 mb-4" />
                            <p className="text-xl font-black uppercase tracking-widest">No Orders</p>
                        </div>
                    ) : (
                        orders.map((order, idx) => (
                            <div
                                key={idx}
                                onClick={() => onMoveOrders && toggleSelection(order.orderId)}
                                className={`p-6 rounded-[24px] border transition-all cursor-pointer group ${selectedIds.has(order.orderId)
                                        ? 'bg-sky-500/10 border-sky-500/50'
                                        : 'bg-slate-900/40 border-white/5 hover:border-sky-500/20'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        {/* Checkbox / Icon */}
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors border ${selectedIds.has(order.orderId)
                                                ? 'bg-sky-500 border-sky-500 text-white'
                                                : 'bg-sky-500/10 border-sky-500/20 text-sky-400 group-hover:border-slate-400'
                                            }`}>
                                            {selectedIds.has(order.orderId) ? <CheckSquare className="w-6 h-6" /> : <Package className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <div className="font-mono font-black text-xl text-sky-400 uppercase tracking-wider">
                                                {order.orderId.slice(0, -4)}
                                                <span className="text-yellow-400">{order.orderId.slice(-4)}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1 flex items-center gap-2">
                                                {order.isPlaceholder && (
                                                    <span className="text-slate-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">PLACEHOLDER</span>
                                                )}
                                                {order.exceptionReason ? (
                                                    <>Reason: <span className="text-red-400 font-bold">{order.exceptionReason}</span></>
                                                ) : (
                                                    <>Route: <span className="text-emerald-400 font-bold">{order.route?.routeConfiguration || 'N/A'}</span></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-600 uppercase tracking-wider">Resolved</div>
                                        <div className="text-sm text-slate-400 font-mono">{new Date(order.resolvedAt).toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Address</div>
                                            <div className="text-sm text-slate-300 truncate">{order.address || 'N/A'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Date</div>
                                            <div className="text-sm text-slate-300">{order.date || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>

                                {order.route && (
                                    <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Metro Area</div>
                                            <div className="text-sm text-slate-400 font-bold">{order.route.metroArea}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">State</div>
                                            <div className="text-sm text-slate-400 font-bold uppercase">{order.route.state}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Zone</div>
                                            <div className="text-sm text-slate-400 font-bold">{order.route.destinationZone}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;
