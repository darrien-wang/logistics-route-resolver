import React, { useState } from 'react';
import { AlertCircle, Droplet, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { ResolvedRouteInfo } from '../types';
import LabelPrintDialog from './LabelPrintDialog';

interface ExceptionPoolProps {
    exceptions: ResolvedRouteInfo[];
    onResolve: () => void;
    initialExpanded?: boolean;
}

// Generate label for exception orders (blank route/stack)
const generateExceptionLabelImage = (orderId: string): string => {
    const canvas = document.createElement('canvas');
    const width = 1181;
    const height = 1772;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Left section dimensions
    const leftWidth = width * 0.55;
    const rightStart = leftWidth + 60;
    const rightWidth = width - rightStart - 40;

    // DATE in top-right corner
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    ctx.fillStyle = '#666666';
    ctx.font = '56px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(dateStr, width - 60, 25);

    // "EXCEPTION" label at top
    ctx.fillStyle = '#cc0000';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('EXCEPTION', leftWidth / 2, height * 0.15);

    // Order ID in center
    ctx.fillStyle = '#000000';
    let fontSize = 100;
    ctx.font = `bold ${fontSize}px Arial`;
    let textWidth = ctx.measureText(orderId).width;

    while (textWidth > leftWidth - 80 && fontSize > 40) {
        fontSize -= 5;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(orderId).width;
    }
    ctx.fillText(orderId, leftWidth / 2, height * 0.38);

    // Divider line
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(20, height * 0.5);
    ctx.lineTo(width - 20, height * 0.5);
    ctx.stroke();

    // "NO ROUTE" text in bottom half
    ctx.fillStyle = '#999999';
    ctx.font = 'bold 120px Arial';
    ctx.fillText('NO ROUTE', leftWidth / 2, height * 0.75);

    // Notes box
    const notesBoxTop = height * 0.5 + 40;
    const notesBoxHeight = height * 0.5 - 120;

    ctx.setLineDash([20, 15]);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#666666';
    ctx.strokeRect(rightStart, notesBoxTop, rightWidth, notesBoxHeight);

    ctx.setLineDash([]);
    ctx.font = '36px Arial';
    ctx.fillStyle = '#999999';
    ctx.fillText('NOTES', rightStart + rightWidth / 2, height - 50);

    return canvas.toDataURL('image/png');
};

const ExceptionPool: React.FC<ExceptionPoolProps> = ({ exceptions, onResolve, initialExpanded = false }) => {
    const [expanded, setExpanded] = useState(initialExpanded);
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [printingOrderId, setPrintingOrderId] = useState<string | null>(null);
    const orderCount = exceptions.length;

    const handlePrintOrder = (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        setPrintingOrderId(orderId);
        setShowPrintDialog(true);
    };

    const handleConfirmPrint = (printer: string) => {
        if (!printingOrderId) return;

        const imageData = generateExceptionLabelImage(printingOrderId);

        // Use Electron IPC to print
        if ((window as any).electron?.printBase64) {
            (window as any).electron.printBase64(imageData, printer);
        } else {
            // Fallback for web mode
            const link = document.createElement('a');
            link.download = `EXCEPTION_${printingOrderId}.png`;
            link.href = imageData;
            link.click();
        }
        setShowPrintDialog(false);
        setPrintingOrderId(null);
    };

    return (
        <>
            <div
                onClick={() => setExpanded(!expanded)}
                className="glass-panel p-6 rounded-[24px] border-2 border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer group"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/30">
                            <AlertCircle className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-wider text-red-400">
                                Exception Pool
                            </h3>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">
                                Unrouted Orders
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-4xl font-black text-red-400">
                            {orderCount}
                        </div>
                        {expanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                    </div>
                </div>

                {/* Expanded Order List */}
                {expanded && orderCount > 0 && (
                    <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                        {exceptions.map((order, idx) => (
                            <div
                                key={order.orderId || idx}
                                className="flex items-center justify-between px-4 py-3 bg-slate-800/50 rounded-xl border border-red-500/20"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-white truncate">
                                        {order.orderId}
                                    </div>
                                    <div className="text-xs text-red-400 truncate">
                                        {order.exceptionReason || 'No route found'}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => handlePrintOrder(e, order.orderId)}
                                    className="ml-3 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                    title="Print Exception Label"
                                >
                                    <Printer className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {orderCount === 0 && (
                    <div className="mt-4 text-center py-6 text-slate-600">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <div className="text-sm font-bold">All Clear - No Exceptions</div>
                    </div>
                )}
            </div>

            {/* Print Dialog */}
            <LabelPrintDialog
                isOpen={showPrintDialog}
                onClose={() => {
                    setShowPrintDialog(false);
                    setPrintingOrderId(null);
                }}
                onConfirm={handleConfirmPrint}
                title={`Print Exception: ${printingOrderId}`}
            />
        </>
    );
};

export default ExceptionPool;
