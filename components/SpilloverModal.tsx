import React, { useState, useMemo } from 'react';
import { X, AlertCircle, ArrowRight, Download, Layers } from 'lucide-react';
import { RouteStack, ResolvedRouteInfo } from '../types';

interface SpilloverModalProps {
    isOpen: boolean;
    onClose: () => void;
    stack: RouteStack | null;
    onConfirmSpillover: (sourceStackId: string, orderIds: string[]) => void;
}

const SpilloverModal: React.FC<SpilloverModalProps> = ({ isOpen, onClose, stack, onConfirmSpillover }) => {
    const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());

    // Effect: Auto-select overflow items when opened
    React.useEffect(() => {
        if (isOpen && stack) {
            const overflowCount = stack.overflowCount;
            if (overflowCount > 0) {
                // Auto-select the last N items
                const lastN = stack.orders.slice(-overflowCount);
                setSelectedOrderIds(new Set(lastN.map(o => o.orderId)));
            }
        } else {
            setSelectedOrderIds(new Set());
        }
    }, [isOpen, stack]);

    const toggleOrder = (id: string) => {
        const newSet = new Set(selectedOrderIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedOrderIds(newSet);
    };

    if (!isOpen || !stack) return null;

    const selectedCount = selectedOrderIds.size;
    const remainingCount = stack.orders.length - selectedCount;
    const capacity = stack.capacity;
    const isStillOverflowing = remainingCount > capacity;

    // Reverse orders to show newest first (likely overflow candidates)
    const reversedOrders = [...stack.orders].reverse();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Resolve Overflow</h2>
                        </div>
                        <p className="text-slate-400">
                            Select orders to move to a new <span className="text-amber-400 font-bold">Overflow Stack</span>.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Status Bar */}
                <div className="px-6 py-4 bg-slate-950/50 flex items-center justify-between border-b border-white/5">
                    <div className="text-sm">
                        <span className="text-slate-500">Current Load: </span>
                        <span className="text-white font-mono font-bold">{stack.orders.length}</span>
                        <span className="text-slate-600"> / {capacity}</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-600" />

                    <div className="text-sm">
                        <span className="text-slate-500">New Load: </span>
                        <span className={`font-mono font-bold ${isStillOverflowing ? 'text-red-500' : 'text-emerald-500'}`}>
                            {remainingCount}
                        </span>
                        <span className="text-slate-600"> / {capacity}</span>
                    </div>
                </div>

                {/* Batch Input */}
                <div className="px-6 py-3 bg-slate-800/50 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Paste Order IDs (space or comma separated)..."
                            className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 font-mono"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const input = e.currentTarget.value.trim();
                                    if (input) {
                                        // Split by space or comma
                                        const ids = input.split(/[\s,]+/).filter(id => id.trim());
                                        const orderIdsSet = new Set(stack.orders.map(o => o.orderId));
                                        const newSelection = new Set(selectedOrderIds);
                                        ids.forEach(id => {
                                            const upperCaseId = id.toUpperCase();
                                            if (orderIdsSet.has(upperCaseId)) {
                                                newSelection.add(upperCaseId);
                                            }
                                        });
                                        setSelectedOrderIds(newSelection);
                                        e.currentTarget.value = '';
                                    }
                                }
                            }}
                            onPaste={(e) => {
                                setTimeout(() => {
                                    const input = e.currentTarget.value.trim();
                                    if (input) {
                                        const ids = input.split(/[\s,]+/).filter(id => id.trim());
                                        const orderIdsSet = new Set(stack.orders.map(o => o.orderId));
                                        const newSelection = new Set(selectedOrderIds);
                                        ids.forEach(id => {
                                            const upperCaseId = id.toUpperCase();
                                            if (orderIdsSet.has(upperCaseId)) {
                                                newSelection.add(upperCaseId);
                                            }
                                        });
                                        setSelectedOrderIds(newSelection);
                                        e.currentTarget.value = '';
                                    }
                                }, 50);
                            }}
                        />
                        <button
                            onClick={() => setSelectedOrderIds(new Set())}
                            className="px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {reversedOrders.map((order, index) => {
                        const isSelected = selectedOrderIds.has(order.orderId);
                        // Is this order structurally in the overflow zone? (Just a visual hint)
                        // If index (in regular list) >= capacity. 
                        // Since we reversed, index < (orders.length - capacity) is OK.
                        // Wait, easier: if ORIGINAL index >= capacity.
                        const originalIndex = stack.orders.length - 1 - index;
                        const isIdeallyOverflowing = originalIndex >= capacity;

                        return (
                            <div
                                key={order.orderId}
                                onClick={() => toggleOrder(order.orderId)}
                                className={`
                                    p-3 rounded-xl border flex items-center gap-4 cursor-pointer transition-all
                                    ${isSelected
                                        ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                                        : 'bg-slate-800/50 border-white/5 hover:border-white/10 hover:bg-slate-800'
                                    }
                                `}
                            >
                                <div className={`
                                    w-5 h-5 rounded border flex items-center justify-center transition-colors
                                    ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-slate-600 bg-slate-900'}
                                `}>
                                    {isSelected && <Layers className="w-3 h-3 text-black" />}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                                            {order.orderId}
                                        </span>
                                        {isIdeallyOverflowing && (
                                            <span className="text-[10px] bg-red-500/20 text-red-500 px-1.5 rounded uppercase font-bold">Overcap</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-slate-500 truncate mt-0.5">
                                        {order.address}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-300 font-bold hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirmSpillover(stack.id, Array.from(selectedOrderIds))}
                        disabled={selectedCount === 0}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Layers className="w-4 h-4" />
                        Move {selectedCount} to New Stack
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpilloverModal;
