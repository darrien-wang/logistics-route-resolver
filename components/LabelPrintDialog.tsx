import React, { useState } from 'react';
import { X, Download, Printer } from 'lucide-react';

interface LabelPrintDialogProps {
    isOpen: boolean;
    onClose: () => void;
    baseRouteName: string;
    stackNumber: number;
    onDownload: () => void;
    onPrint: (copies: number) => void;
}

const LabelPrintDialog: React.FC<LabelPrintDialogProps> = ({
    isOpen,
    onClose,
    baseRouteName,
    stackNumber,
    onDownload,
    onPrint,
}) => {
    const [copies, setCopies] = useState(1);

    if (!isOpen) return null;

    const handlePrint = () => {
        onPrint(copies);
        onClose();
    };

    const handleDownload = () => {
        onDownload();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div
                className="w-full max-w-lg glass-panel rounded-[32px] p-8 border-white/10 shadow-[0_0_100px_rgba(56,189,248,0.2)] animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-widest text-white">
                            Print Label
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            {baseRouteName} - Stack {stackNumber}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Copies Input */}
                <div className="mb-6">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Number of Copies
                    </label>
                    <input
                        type="number"
                        value={copies}
                        onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-lg font-mono text-sky-400 focus:outline-none focus:border-sky-500"
                        min="1"
                        max="99"
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleDownload}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 text-sm"
                    >
                        <Download className="w-5 h-5" />
                        Download
                    </button>
                    <button
                        onClick={handlePrint}
                        className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-wider transition-all shadow-lg shadow-sky-500/20 text-sm"
                    >
                        <Printer className="w-5 h-5" />
                        Print {copies > 1 ? `(${copies})` : ''}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LabelPrintDialog;
