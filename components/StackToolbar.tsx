import React, { useRef } from 'react';
import { Download, Upload, RotateCcw, RotateCw, Archive } from 'lucide-react';

interface StackToolbarProps {
    onImport: (file: File) => void;
    onExportAll: () => void;
    onExportOverflow: () => void;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

const StackToolbar: React.FC<StackToolbarProps> = ({
    onImport,
    onExportAll,
    onExportOverflow,
    onUndo,
    onRedo,
    canUndo,
    canRedo
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImport(file);
        }
        // Reset input
        if (e.target) e.target.value = '';
    };

    return (
        <div className="flex items-center gap-2 mb-6 p-2 bg-slate-900/50 rounded-2xl border border-white/5 backdrop-blur-sm">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".json"
            />

            {/* Import Group */}
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20"
            >
                <Upload className="w-4 h-4" />
                Import Stacks
            </button>

            <div className="w-px h-8 bg-white/10 mx-2" />

            {/* Export Group */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onExportAll}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-white/5"
                    title="Export all stacks including normal and merged"
                >
                    <Download className="w-4 h-4" />
                    Export All
                </button>

                <button
                    onClick={onExportOverflow}
                    className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl font-bold transition-colors border border-amber-500/20"
                    title="Export only Gold Border / Overflow stacks"
                >
                    <Archive className="w-4 h-4" />
                    Export Overflow
                </button>
            </div>

            <div className="flex-1" />

            {/* History Group */}
            <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/5">
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={`
                        p-2 rounded-lg transition-colors
                        ${canUndo ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-700 cursor-not-allowed'}
                    `}
                    title="Undo Merge/Split"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
                <div className="w-px h-4 bg-white/5" />
                <button
                    onClick={onRedo}
                    disabled={!canRedo}
                    className={`
                        p-2 rounded-lg transition-colors
                        ${canRedo ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-700 cursor-not-allowed'}
                    `}
                    title="Redo Merge/Split"
                >
                    <RotateCw className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default StackToolbar;
