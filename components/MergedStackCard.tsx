import React, { useState } from 'react';
import { RouteStack } from '../types';
import { Layers, SplitSquareHorizontal, AlertCircle, Trash2 } from 'lucide-react';

interface MergedStackCardProps {
    stack: RouteStack;
    onClick: () => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    onSplit: (e: React.MouseEvent) => void;
    onResolveOverflow: (e: React.MouseEvent) => void;
    onDelete?: () => void;
    selected?: boolean;
}

const MergedStackCard: React.FC<MergedStackCardProps> = ({
    stack,
    onClick,
    onContextMenu,
    onSplit,
    onResolveOverflow,
    onDelete,
    selected
}) => {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const totalCount = stack.orders.length;
    // Assuming effective capacity is still roughly based on standard 40? 
    // Or sum of components?
    // Based on user image: "40 / 40 (Overflow: +10)". 
    // This implies capacity is fixed (e.g. 40) even for merged stack?
    // Let's use stack.capacity.
    const capacity = stack.capacity;
    const overflowCount = stack.overflowCount;
    const isOverflow = overflowCount > 0;

    // Calculate percentages
    const rawPercentage = (totalCount / capacity) * 100;
    const fillPercentage = Math.min(rawPercentage, 100);
    const overflowPercentage = isOverflow ? Math.min(rawPercentage - 100, 100) : 0;

    // Visual stack effect (layered look)
    const renderLayer = (offset: number, opacity: number, zIndex: number) => (
        <div
            className="absolute inset-0 bg-slate-800 rounded-[24px] border border-white/5"
            style={{
                top: `${-offset}px`,
                transform: `scale(${1 - offset * 0.02})`,
                zIndex,
                opacity
            }}
        />
    );

    const handleContextMenu = (e: React.MouseEvent) => {
        if (onContextMenu) {
            // Use parent's context menu handler
            onContextMenu(e);
        } else {
            // Fallback to internal context menu
            e.preventDefault();
            e.stopPropagation();
            setContextMenu({ x: e.clientX, y: e.clientY });
        }
    };

    const handleDelete = () => {
        setContextMenu(null);
        onDelete?.();
    };

    return (
        <>
            {/* Context menu backdrop - only show if using internal context menu */}
            {!onContextMenu && contextMenu && (
                <div
                    className="fixed inset-0 z-50"
                    onClick={() => setContextMenu(null)}
                />
            )}

            {/* Context menu - only show if using internal context menu */}
            {!onContextMenu && contextMenu && (
                <div
                    className="fixed z-50 bg-slate-800 border border-white/10 rounded-xl shadow-lg py-1 min-w-[120px]"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                >
                    <button
                        onClick={handleDelete}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Stack
                    </button>
                </div>
            )}

            <div
                className="relative h-full group mt-2"
                onClick={onClick}
                onContextMenu={handleContextMenu}
            >
                {/* Background Layers for Stacked Effect */}
                {renderLayer(12, 0.3, 0)}
                {renderLayer(6, 0.6, 1)}

                {/* Main Card */}
                <div className={`
                relative z-10 
                rounded-[24px] border border-white/10 
                bg-gradient-to-b from-slate-800 to-slate-900 
                p-6 h-full
                flex flex-col
                transition-all duration-300
                ${selected ? 'ring-2 ring-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'hover:border-white/20 hover:shadow-2xl'}
                ${isOverflow ? 'shadow-[0_0_15px_rgba(239,68,68,0.15)] border-red-500/30' : ''}
            `}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-5 h-5 text-sky-400" />
                                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Merged Pool</span>
                            </div>
                            {/* Source breakdown - use mergeInfo.components for correct stack numbers */}
                            {stack.mergeInfo?.components && stack.mergeInfo.components.length > 0 ? (
                                <div className="mt-2 space-y-1.5">
                                    {stack.mergeInfo.components.map((comp, idx) => {
                                        const srcPercent = totalCount > 0 ? (comp.orders.length / totalCount) * 100 : 0;
                                        return (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="min-w-[70px] text-xs">
                                                    <span className="text-sky-400 font-bold">{comp.route}</span>
                                                    <span className="text-slate-600"> #{comp.stackNumber}:</span>
                                                </div>
                                                <span className="text-white font-bold text-xs min-w-[50px]">
                                                    {comp.orders.length} <span className="text-slate-600 font-normal">orders</span>
                                                </span>
                                                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-sky-600 to-emerald-400 rounded-full"
                                                        style={{ width: `${srcPercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                // Fallback: group by route (for legacy stacks without mergeInfo)
                                (() => {
                                    const sourceBreakdown = new Map<string, { route: string; count: number }>();
                                    stack.orders.forEach(order => {
                                        const route = order.route?.routeConfiguration || 'Unknown';
                                        const existing = sourceBreakdown.get(route);
                                        if (existing) {
                                            existing.count++;
                                        } else {
                                            sourceBreakdown.set(route, { route, count: 1 });
                                        }
                                    });
                                    const sources = Array.from(sourceBreakdown.values());

                                    return (
                                        <div className="mt-2 space-y-1.5">
                                            {sources.map((src, idx) => {
                                                const srcPercent = totalCount > 0 ? (src.count / totalCount) * 100 : 0;
                                                return (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <div className="min-w-[70px] text-xs">
                                                            <span className="text-sky-400 font-bold">{src.route}</span>
                                                            <span className="text-slate-600"> #1:</span>
                                                        </div>
                                                        <span className="text-white font-bold text-xs min-w-[50px]">
                                                            {src.count} <span className="text-slate-600 font-normal">orders</span>
                                                        </span>
                                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-sky-600 to-emerald-400 rounded-full"
                                                                style={{ width: `${srcPercent}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })()
                            )}
                        </div>

                        {/* Options Menu (Three dots) could go here */}
                    </div>

                    {/* Progress Bar Section */}
                    <div className="flex-1 flex flex-col justify-center gap-4">
                        <div className="flex justify-end items-end gap-1 mb-1">
                            <span className={`text-4xl font-black ${isOverflow ? 'text-red-500' : 'text-white'}`}>
                                {Math.round(rawPercentage)}%
                            </span>
                        </div>

                        <div className="relative h-4 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                            {/* Base Fill - capped at 100% */}
                            <div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-600 to-emerald-500 rounded-l-full transition-all duration-500"
                                style={{ width: `${fillPercentage}%` }}
                            />
                            {/* Overflow Fill - shown after 100% in red */}
                            {isOverflow && (
                                <div
                                    className="absolute inset-y-0 bg-gradient-to-r from-red-600 to-red-500 rounded-r-full transition-all duration-500"
                                    style={{
                                        left: `${Math.min(fillPercentage, 100)}%`,
                                        width: `${Math.min(overflowPercentage, 100 - fillPercentage)}%`
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-slate-400">
                                {totalCount} <span className="text-slate-600">/ {capacity}</span>
                            </span>
                            {isOverflow && (
                                <span className="text-red-400 flex items-center gap-1">
                                    (Overflow: +{overflowCount})
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Actions / Badges */}
                    <div className="mt-6 flex flex-col gap-3">
                        {isOverflow ? (
                            <div
                                onClick={(e) => { e.stopPropagation(); onResolveOverflow(e); }}
                                className="cursor-pointer bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex items-center justify-between hover:bg-red-500/20 transition-colors"
                            >
                                <div className="flex items-center gap-2 text-red-400">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="font-bold text-sm">OVERFLOW! +{overflowCount}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-2 border border-transparent" /> /* Spacer */
                        )}

                        <div className="flex gap-3">
                            <div className="flex-1 bg-slate-950/50 rounded-lg border border-white/5 flex items-center justify-center py-2">
                                <span className="text-slate-300 font-bold text-sm">
                                    {totalCount} ORDERS
                                </span>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); onSplit(e); }}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-white/5 font-bold text-sm transition-colors flex items-center gap-2"
                            >
                                <SplitSquareHorizontal className="w-4 h-4" />
                                SPLIT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MergedStackCard;
