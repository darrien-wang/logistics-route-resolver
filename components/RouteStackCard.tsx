import React, { useState } from 'react';
import { Package, Printer, CheckCircle } from 'lucide-react';
import { RouteStack } from '../types';
import LabelPrintDialog from './LabelPrintDialog';

interface RouteStackCardProps {
    stack: RouteStack;
    onClick: () => void;
}

// Generate vertical label image (10cm x 15cm at 300 DPI = 1181 x 1772 pixels)
const generateLabelImage = (baseRouteName: string, stackNumber: number): string => {
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
    let textWidth = ctx.measureText(baseRouteName).width;

    // Scale down font if text is too wide
    while (textWidth > leftWidth - 80 && fontSize > 50) {
        fontSize -= 5;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(baseRouteName).width;
    }

    // Draw route name centered in top half
    ctx.fillText(baseRouteName, leftWidth / 2, height * 0.25);

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

const RouteStackCard: React.FC<RouteStackCardProps> = ({ stack, onClick }) => {
    const [showDialog, setShowDialog] = useState(false);
    const fillPercentage = Math.min((stack.orders.length / stack.capacity) * 100, 100);

    // Color gradient: red → yellow → green (full = green)
    const getColor = (percentage: number): string => {
        if (percentage >= 90) return '#10b981'; // green
        if (percentage >= 70) return '#84cc16'; // lime
        if (percentage >= 50) return '#eab308'; // yellow
        if (percentage >= 30) return '#f97316'; // orange
        return '#ef4444'; // red
    };

    const color = getColor(fillPercentage);

    const handlePrintLabel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDialog(true);
    };

    const handleDownload = () => {
        const dataUrl = generateLabelImage(stack.baseRouteName, stack.stackNumber);
        const link = document.createElement('a');
        link.download = `${stack.baseRouteName}-${String(stack.stackNumber).padStart(3, '0')}_label.png`;
        link.href = dataUrl;
        link.click();
    };

    const handlePrint = (copies: number) => {
        const dataUrl = generateLabelImage(stack.baseRouteName, stack.stackNumber);

        // Create a hidden iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentWindow?.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(`
                <html>
                <head>
                    <title>Print Label</title>
                    <style>
                        @page { margin: 0; size: 10cm 15cm; }
                        body { margin: 0; padding: 0; }
                        img { width: 10cm; height: 15cm; display: block; }
                    </style>
                </head>
                <body>
                    ${Array(copies).fill(`<img src="${dataUrl}" />`).join('')}
                </body>
                </html>
            `);
            iframeDoc.close();

            // Wait for images to load then print
            iframe.contentWindow?.focus();
            setTimeout(() => {
                iframe.contentWindow?.print();
                setTimeout(() => document.body.removeChild(iframe), 1000);
            }, 250);
        }
    };

    return (
        <div
            onClick={onClick}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-sky-500/30 transition-all hover:scale-105 cursor-pointer group relative"
        >
            {/* Full Stack Badge */}
            {stack.isFull && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 shadow-lg shadow-emerald-500/30">
                    <CheckCircle className="w-5 h-5 text-white" />
                </div>
            )}

            {/* Route Name and Stack Number */}
            <div className="text-center mb-4">
                <h3 className="text-xl font-black uppercase tracking-widest text-white">
                    {stack.baseRouteName}
                </h3>
                <div className="text-3xl font-black text-sky-400 mt-1">
                    {stack.stackNumber}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {stack.orders.length} / {stack.capacity}
                </div>
            </div>

            {/* Water Tank Visualization */}
            <div className="relative w-full h-36 bg-slate-900/50 rounded-2xl border-4 border-white/10 overflow-hidden">
                {/* Fill Level */}
                <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out"
                    style={{
                        height: `${fillPercentage}%`,
                        backgroundColor: color,
                        opacity: 0.3,
                    }}
                >
                    <div
                        className="absolute inset-0 animate-pulse"
                        style={{
                            background: `linear-gradient(180deg, transparent 0%, ${color} 100%)`,
                        }}
                    />
                </div>

                {/* Water Wave Effect */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-2 transition-all duration-700"
                    style={{
                        bottom: `${fillPercentage}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 20px ${color}`,
                    }}
                />

                {/* Percentage Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        {Math.round(fillPercentage)}%
                    </div>
                </div>

                {/* Package Icon */}
                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Package className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-center gap-2">
                <div
                    className="px-3 py-2 rounded-full border-2 font-black text-xs uppercase tracking-wider"
                    style={{
                        borderColor: color,
                        color: color,
                        backgroundColor: `${color}20`,
                    }}
                >
                    {stack.orders.length} Orders
                </div>
                <button
                    onClick={handlePrintLabel}
                    className="px-3 py-2 rounded-full border-2 border-slate-600 text-slate-400 hover:border-sky-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all flex items-center gap-1 font-bold text-xs uppercase tracking-wider"
                >
                    <Printer className="w-3 h-3" />
                    Label
                </button>
            </div>

            {/* Label Print Dialog */}
            <LabelPrintDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                baseRouteName={stack.baseRouteName}
                stackNumber={stack.stackNumber}
                onDownload={handleDownload}
                onPrint={handlePrint}
            />
        </div>
    );
};

export default RouteStackCard;
