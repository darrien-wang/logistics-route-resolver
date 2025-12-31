import React, { useState } from 'react';
import { Package, Printer, CheckCircle, Database } from 'lucide-react';
import { RouteStack } from '../types';
import LabelPrintDialog from './LabelPrintDialog';

interface RouteStackCardProps {
    stack: RouteStack;
    onClick: () => void;
    selected?: boolean;
}

// Generate vertical label image (10cm x 15cm at 300 DPI = 1181 x 1772 pixels)
const generateLabelImage = (route: string, stackNumber: number): string => {
    const canvas = document.createElement('canvas');
    // 10cm x 15cm at 300 DPI
    const width = 1181;
    const height = 1772;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Left section dimensions (55% width for text)
    const leftWidth = width * 0.55;
    const rightStart = leftWidth + 60;
    const rightWidth = width - rightStart - 40;

    // Top half: Route name - centered and auto-sized
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Auto-size font to fit the left section width
    let fontSize = 200;
    ctx.font = `bold ${fontSize}px Arial`;
    let textWidth = ctx.measureText(route).width;

    // Scale down font if text is too wide
    while (textWidth > leftWidth - 80 && fontSize > 50) {
        fontSize -= 5;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(route).width;
    }

    // Draw route name centered in top half
    ctx.fillText(route, leftWidth / 2, height * 0.25);

    // Divider line - full width
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(20, height * 0.5);
    ctx.lineTo(width - 20, height * 0.5);
    ctx.stroke();

    // Bottom half: Stack number - centered in left section
    let stackFontSize = 300;
    ctx.font = `bold ${stackFontSize}px Arial`;
    let stackTextWidth = ctx.measureText(`${stackNumber}`).width;

    // Scale down if needed
    while (stackTextWidth > leftWidth - 80 && stackFontSize > 100) {
        stackFontSize -= 10;
        ctx.font = `bold ${stackFontSize}px Arial`;
        stackTextWidth = ctx.measureText(`${stackNumber}`).width;
    }

    ctx.fillText(`${stackNumber}`, leftWidth / 2, height * 0.75);

    // Right side: Dashed rectangle for manual writing (bottom half only)
    const notesBoxTop = height * 0.5 + 40; // Start below the divider line
    const notesBoxHeight = height * 0.5 - 120; // Bottom half minus margins

    ctx.setLineDash([20, 15]);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#666666';
    ctx.strokeRect(rightStart, notesBoxTop, rightWidth, notesBoxHeight);

    // Add small hint text
    ctx.setLineDash([]);
    ctx.font = '36px Arial';
    ctx.fillStyle = '#999999';
    ctx.textAlign = 'center';
    ctx.fillText('NOTES', rightStart + rightWidth / 2, height - 50);

    // Return data URL instead of auto-downloading
    return canvas.toDataURL('image/png');
};

const RouteStackCard: React.FC<RouteStackCardProps> = ({ stack, onClick, selected }) => {
    const [showDialog, setShowDialog] = useState(false);
    const fillPercentage = Math.min((stack.orders.length / stack.capacity) * 100, 100);

    // Color gradient: red → yellow → green (full = green)
    const getColor = (percentage: number): string => {
        if (percentage >= 90) return '#10b981'; // green
        if (percentage >= 70) return '#84cc16'; // lime
        if (percentage >= 50) return '#eab308'; // yellow
        return '#ef4444'; // red
    };

    const handlePrintClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDialog(true);
    };

    const handleConfirmPrint = (printer: string) => {
        const imageData = generateLabelImage(stack.route, stack.stackNumber);

        // Use Electron IPC to print
        if (window.electron?.printBase64) {
            window.electron.printBase64(imageData, printer);
        } else {
            // Fallback for web mode
            const link = document.createElement('a');
            link.download = `STACK_${stack.route}_${stack.stackNumber}.png`;
            link.href = imageData;
            link.click();
        }
        setShowDialog(false);
    };

    const isFull = stack.isFull || stack.orders.length >= stack.capacity;

    // Style determination
    const isOverflow = stack.isOverflow || stack.type === 'overflow';

    // Base styles
    const borderStyle = isOverflow
        ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' // Gold for overflow
        : selected
            ? 'border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]'
            : 'border-white/10 hover:border-white/20';

    const bgStyle = isOverflow
        ? 'bg-gradient-to-br from-yellow-900/20 to-slate-900' // Slight gold tint
        : 'bg-slate-900/50';

    return (
        <>
            <div
                onClick={onClick}
                className={`
                    relative group cursor-pointer 
                    rounded-[24px] border ${borderStyle} 
                    ${bgStyle} p-6 
                    transition-all duration-300 hover:transform hover:-translate-y-1
                    flex flex-col h-full
                `}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        {isOverflow ? (() => {
                            // Group orders by their individual overflow source
                            const sourceBreakdown = new Map<string, { route: string; stackNumber: number; count: number }>();
                            stack.orders.forEach(order => {
                                if (order.overflowSource) {
                                    const key = `${order.overflowSource.route}-${order.overflowSource.stackNumber}`;
                                    const existing = sourceBreakdown.get(key);
                                    if (existing) {
                                        existing.count++;
                                    } else {
                                        sourceBreakdown.set(key, {
                                            route: order.overflowSource.route,
                                            stackNumber: order.overflowSource.stackNumber,
                                            count: 1
                                        });
                                    }
                                }
                            });
                            const sources = Array.from(sourceBreakdown.values());
                            const totalOrders = stack.orders.length;

                            return (
                                <>
                                    {/* Overflow Pool Title */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-black text-yellow-400 tracking-tight">Overflow Pool</h3>
                                        <span className="px-1.5 py-0.5 rounded-md bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">
                                            Legacy
                                        </span>
                                    </div>
                                    {/* Stack number */}
                                    <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                                        Stack #{stack.stackNumber}
                                    </div>
                                    {/* Source breakdown - each source stack shown separately */}
                                    {sources.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {sources.map((src, idx) => {
                                                const srcPercent = totalOrders > 0 ? (src.count / totalOrders) * 100 : 0;
                                                return (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        {/* Route & Stack Label */}
                                                        <div className="min-w-[90px] text-xs">
                                                            <span className="text-yellow-500 font-bold">{src.route}</span>
                                                            <span className="text-slate-600"> #{src.stackNumber}:</span>
                                                        </div>
                                                        {/* Order count */}
                                                        <span className="text-white font-bold text-xs min-w-[50px]">
                                                            {src.count} <span className="text-slate-600 font-normal">orders</span>
                                                        </span>
                                                        {/* Mini progress bar */}
                                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                                                                style={{ width: `${srcPercent}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            );
                        })() : (
                            <>
                                {/* Normal Stack Title */}
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-2xl font-black font-mono text-white tracking-tight">{stack.route}</h3>
                                    {stack.importedAt && (
                                        <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                            Imp
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                                    Stack #{stack.stackNumber}
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={handlePrintClick}
                        className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-colors border border-white/5 opacity-0 group-hover:opacity-100"
                        title="Print Stack Label"
                    >
                        <Printer className="w-4 h-4" />
                    </button>
                </div>

                {/* Progress Circle (Center) */}
                <div className="flex-1 flex items-center justify-center py-2">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Background Circle */}
                        <svg className="absolute w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-800"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={351.86}
                                strokeDashoffset={351.86 - (351.86 * fillPercentage) / 100}
                                className="transition-all duration-1000 ease-out"
                                style={{ color: getColor(fillPercentage) }}
                            />
                        </svg>

                        {/* Center Text */}
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black text-white">{stack.orders.length}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                                / {stack.capacity}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Status */}
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {isFull ? (
                            <div className="flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-wider">Ready</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-slate-500">
                                <Package className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Collecting</span>
                            </div>
                        )}
                    </div>

                    {/* Database Icon for source indication if imported */}
                    {stack.sourceNote && (
                        <div className="text-slate-600" title={stack.sourceNote}>
                            <Database className="w-3 h-3" />
                        </div>
                    )}
                </div>

                {selected && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-sky-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                )}
            </div>

            <LabelPrintDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={handleConfirmPrint}
                routeName={stack.route}
            />
        </>
    );
};

export default RouteStackCard;
