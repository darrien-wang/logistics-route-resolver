import React from 'react';
import { AlertCircle, Droplet } from 'lucide-react';
import { ResolvedRouteInfo } from '../types';

interface ExceptionPoolProps {
    orders: ResolvedRouteInfo[];
    onClick: () => void;
    onReasonClick: (reason: string) => void;
}

const ExceptionPool: React.FC<ExceptionPoolProps> = ({ orders, onClick, onReasonClick }) => {
    const orderCount = orders.length;

    return (
        <button
            onClick={onClick}
            className="glass-panel p-8 rounded-[40px] border-2 border-red-500/30 hover:border-red-500/50 transition-all hover:scale-[1.02] cursor-pointer group w-full"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border-2 border-red-500/30">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-3xl font-black uppercase tracking-widest text-red-400">
                            Exception Pool
                        </h3>
                        <div className="text-sm text-slate-500 uppercase tracking-wider mt-1">
                            Unrouted Orders • No Capacity Limit
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-6xl font-black text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                        {orderCount}
                    </div>
                    <div className="text-xs text-slate-600 uppercase tracking-widest mt-1">Orders</div>
                </div>
            </div>

            {/* Large Water Tank Visualization */}
            <div className="relative w-full h-64 bg-slate-900/50 rounded-3xl border-4 border-red-500/20 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent" />

                {/* Water Fill Effect - grows from bottom */}
                <div
                    className="absolute bottom-0 left-0 right-0 bg-red-500/20 transition-all duration-1000 ease-out"
                    style={{
                        height: orderCount > 0 ? `${Math.min(orderCount * 5, 100)}%` : '10%',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 to-transparent animate-pulse" />
                </div>

                {/* Ripple Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Droplet className="w-24 h-24 text-red-500/20 group-hover:text-red-500/40 transition-colors animate-bounce" />
                </div>

                {/* Warning Message */}
                {orderCount > 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="bg-red-900/80 backdrop-blur-md border-2 border-red-500/50 px-8 py-4 rounded-2xl shadow-2xl">
                            <div className="text-2xl font-black text-red-400 uppercase tracking-wider">
                                Attention Required
                            </div>
                            <div className="text-sm text-red-300/80 mt-1">
                                {orderCount} order{orderCount !== 1 ? 's' : ''} without route
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {orderCount === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-slate-700">
                            <AlertCircle className="w-16 h-16 mx-auto mb-3 opacity-30" />
                            <div className="text-xl font-black uppercase tracking-widest">All Clear</div>
                            <div className="text-xs uppercase tracking-wider mt-1">No Exceptions</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Exception Reasons Summary */}
            {orderCount > 0 && (
                <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
                    {(() => {
                        // Group by reason
                        const reasonCounts = new Map<string, number>();
                        orders.forEach(o => {
                            const reason = o.exceptionReason || 'Unknown';
                            reasonCounts.set(reason, (reasonCounts.get(reason) || 0) + 1);
                        });

                        return Array.from(reasonCounts.entries()).map(([reason, count]) => (
                            <button
                                key={reason}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReasonClick(reason);
                                }}
                                className="flex items-center justify-between w-full px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all text-left"
                            >
                                <span className="text-xs text-red-300 truncate flex-1">{reason}</span>
                                <span className="text-sm font-bold text-red-400 ml-2">{count}</span>
                            </button>
                        ));
                    })()}
                </div>
            )}

            {/* Footer Stats */}
            <div className="mt-6 flex justify-center">
                <div className="px-6 py-3 rounded-full border-2 border-red-500/30 bg-red-500/10 font-black text-lg uppercase tracking-wider text-red-400">
                    Click to View Details
                </div>
            </div>
        </button>
    );
};

export default ExceptionPool;
