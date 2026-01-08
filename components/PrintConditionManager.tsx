import React, { useState, useEffect, useRef } from 'react';
import { Filter, Plus, Trash2, ToggleLeft, ToggleRight, X, AlertCircle, HelpCircle, Upload, FileText, ClipboardPaste } from 'lucide-react';
import {
    printMappingConditionService,
    MappingCondition,
    ConditionType
} from '../services/PrintMappingConditionService';

interface PrintConditionManagerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CONDITION_TYPES: { value: ConditionType; label: string; description: string }[] = [
    { value: 'fileList', label: 'File List', description: 'Import order whitelist from TXT file or paste' },
    { value: 'prefix', label: 'Prefix Match', description: 'Order ID starts with specified prefix (supports *)' },
    { value: 'zipRange', label: 'ZIP Range', description: 'ZIP code within specified range (e.g. 90000-91999)' },
    { value: 'regex', label: 'Regex', description: 'Match order ID using regular expression' },
    { value: 'routeInclude', label: 'Route Filter', description: 'Only process specified routes (supports *)' }
];

const PrintConditionManager: React.FC<PrintConditionManagerProps> = ({ isOpen, onClose }) => {
    const [enabled, setEnabled] = useState(printMappingConditionService.isEnabled());
    const [conditions, setConditions] = useState<MappingCondition[]>(printMappingConditionService.getConditions());
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCondition, setNewCondition] = useState<{ type: ConditionType; value: string; description: string; mode: 'include' | 'exclude' }>({
        type: 'fileList',
        value: '',
        description: '',
        mode: 'include'
    });

    // For fileList type
    const [fileListInput, setFileListInput] = useState<string>('');
    const [parsedItems, setParsedItems] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync service state
    useEffect(() => {
        setConditions(printMappingConditionService.getConditions());
        setEnabled(printMappingConditionService.isEnabled());
    }, [isOpen]);

    // Parse input text to list
    useEffect(() => {
        if (newCondition.type === 'fileList' && fileListInput) {
            const items = fileListInput
                .split(/[\r\n,;\s]+/)
                .map(s => s.trim().toUpperCase())
                .filter(s => s.length > 0);
            setParsedItems([...new Set(items)]); // Dedupe
        } else {
            setParsedItems([]);
        }
    }, [fileListInput, newCondition.type]);

    const handleToggleService = () => {
        const newEnabled = !enabled;
        printMappingConditionService.setEnabled(newEnabled);
        setEnabled(newEnabled);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setFileListInput(content);
            setFileName(file.name);
        };
        reader.readAsText(file);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddCondition = () => {
        if (newCondition.type === 'fileList') {
            if (parsedItems.length === 0) return;

            printMappingConditionService.addCondition({
                type: 'fileList',
                value: `${parsedItems.length} orders`,
                enabled: true,
                description: newCondition.description.trim() || fileName || 'Manual paste',
                fileListData: parsedItems,
                fileName: fileName || undefined,
                mode: newCondition.mode
            });
        } else {
            if (!newCondition.value.trim()) return;

            printMappingConditionService.addCondition({
                type: newCondition.type,
                value: newCondition.value.trim(),
                enabled: true,
                description: newCondition.description.trim() || undefined,
                mode: newCondition.mode
            });
        }

        setConditions(printMappingConditionService.getConditions());
        setNewCondition({ type: 'fileList', value: '', description: '', mode: 'include' });
        setFileListInput('');
        setParsedItems([]);
        setFileName('');
        setShowAddForm(false);
    };

    const handleRemoveCondition = (id: string) => {
        printMappingConditionService.removeCondition(id);
        setConditions(printMappingConditionService.getConditions());
    };

    const handleToggleCondition = (id: string) => {
        printMappingConditionService.toggleCondition(id);
        setConditions(printMappingConditionService.getConditions());
    };

    const resetForm = () => {
        setShowAddForm(false);
        setNewCondition({ type: 'fileList', value: '', description: '', mode: 'include' });
        setFileListInput('');
        setParsedItems([]);
        setFileName('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[300] animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${enabled ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`}>
                            <Filter className={`w-6 h-6 transition-colors ${enabled ? 'text-emerald-400' : 'text-slate-400'}`} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-wide">Print Mapping Conditions</h2>
                            <p className="text-sm text-slate-500">Configure which orders can be route-mapped</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
                    {/* Master Toggle - Redesigned as a proper switch */}
                    <div className="flex items-center justify-between p-5 bg-slate-800/50 rounded-2xl border border-white/5 mb-6">
                        <div className="flex items-center gap-4">
                            <Filter className={`w-6 h-6 transition-colors ${enabled ? 'text-emerald-400' : 'text-slate-600'}`} />
                            <div>
                                <div className="font-bold text-white">Condition Filter</div>
                                <div className="text-sm text-slate-500">
                                    {enabled ? 'Only matching orders will be processed' : 'All orders processed normally'}
                                </div>
                            </div>
                        </div>
                        {/* Toggle Switch */}
                        <button
                            onClick={handleToggleService}
                            className={`relative w-16 h-8 rounded-full transition-all duration-300 ${enabled ? 'bg-emerald-500' : 'bg-slate-700'
                                }`}
                        >
                            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center ${enabled ? 'left-9' : 'left-1'
                                }`}>
                                {enabled ? (
                                    <span className="text-emerald-500 text-xs font-bold">ON</span>
                                ) : (
                                    <span className="text-slate-400 text-xs font-bold">OFF</span>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Info Banner */}
                    {enabled && conditions.filter(c => c.enabled).length === 0 && (
                        <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
                            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-amber-300">
                                <strong>Note:</strong> Condition pool is enabled but no conditions added. All orders will be processed normally.
                            </div>
                        </div>
                    )}

                    {/* Condition List */}
                    <div className="space-y-3 mb-6">
                        {conditions.length === 0 ? (
                            <div className="text-center py-12 text-slate-600">
                                <Filter className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                <p className="font-bold">No Conditions</p>
                                <p className="text-sm mt-1">Add conditions to control which orders can be processed</p>
                            </div>
                        ) : (
                            conditions.map(condition => (
                                <div
                                    key={condition.id}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${condition.enabled
                                        ? condition.mode === 'exclude'
                                            ? 'bg-red-900/20 border-red-500/30'
                                            : 'bg-slate-800/50 border-white/10'
                                        : 'bg-slate-900/50 border-white/5 opacity-50'
                                        }`}
                                >
                                    <button
                                        onClick={() => handleToggleCondition(condition.id)}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${condition.enabled
                                            ? condition.mode === 'exclude'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-slate-800 text-slate-600'
                                            }`}
                                    >
                                        {condition.enabled ? (
                                            <ToggleRight className="w-5 h-5" />
                                        ) : (
                                            <ToggleLeft className="w-5 h-5" />
                                        )}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            {/* Mode Badge */}
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg uppercase tracking-wider ${condition.mode === 'exclude'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-emerald-500 text-white'
                                                }`}>
                                                {condition.mode === 'exclude' ? 'BLOCK' : 'ALLOW'}
                                            </span>

                                            <span className={`px-2 py-0.5 text-xs font-bold rounded-lg uppercase ${condition.type === 'fileList'
                                                ? 'bg-amber-500/20 text-amber-400'
                                                : 'bg-sky-500/20 text-sky-400'
                                                }`}>
                                                {condition.type === 'fileList' ? 'LIST' : condition.type}
                                            </span>
                                            <span className="font-mono text-white font-bold truncate">
                                                {condition.type === 'fileList'
                                                    ? `${condition.fileListData?.length || 0} orders`
                                                    : condition.value
                                                }
                                            </span>
                                        </div>
                                        {condition.description && (
                                            <p className="text-sm text-slate-500 mt-1 truncate">{condition.description}</p>
                                        )}
                                        {condition.type === 'fileList' && condition.fileListData && condition.fileListData.length > 0 && (
                                            <p className="text-xs text-slate-600 mt-1 font-mono truncate">
                                                Sample: {condition.fileListData.slice(0, 3).join(', ')}{condition.fileListData.length > 3 ? '...' : ''}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleRemoveCondition(condition.id)}
                                        className="p-2 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Add Condition Form */}
                    {showAddForm ? (
                        <div className="p-5 bg-slate-800/30 rounded-2xl border border-white/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-white">Add New Condition</h3>
                                <button
                                    onClick={resetForm}
                                    className="p-1 rounded-lg hover:bg-white/5 text-slate-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Mode Selection */}
                            <div className="flex p-1 bg-slate-900 rounded-xl mb-4">
                                <button
                                    onClick={() => setNewCondition(prev => ({ ...prev, mode: 'include' }))}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newCondition.mode === 'include'
                                            ? 'bg-emerald-500 text-white shadow-lg'
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Whitelist (Allow)
                                </button>
                                <button
                                    onClick={() => setNewCondition(prev => ({ ...prev, mode: 'exclude' }))}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newCondition.mode === 'exclude'
                                            ? 'bg-red-500 text-white shadow-lg'
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Blacklist (Block)
                                </button>
                            </div>

                            {/* Type Selection */}
                            <div className="grid grid-cols-2 gap-2">
                                {CONDITION_TYPES.map(type => (
                                    <button
                                        key={type.value}
                                        onClick={() => setNewCondition(prev => ({ ...prev, type: type.value }))}
                                        className={`p-3 rounded-xl border text-left transition-all ${newCondition.type === type.value
                                            ? type.value === 'fileList'
                                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                                                : 'bg-sky-500/20 border-sky-500/50 text-sky-400'
                                            : 'bg-slate-800/30 border-white/5 text-slate-400 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="font-bold text-sm flex items-center gap-2">
                                            {type.value === 'fileList' && <FileText className="w-4 h-4" />}
                                            {type.label}
                                        </div>
                                        <div className="text-xs opacity-70 mt-0.5">{type.description}</div>
                                    </button>
                                ))}
                            </div>

                            {/* FileList Input */}
                            {newCondition.type === 'fileList' ? (
                                <div className="space-y-3">
                                    {/* File Upload */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".txt,.csv"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full py-4 rounded-xl border-2 border-dashed border-white/10 text-slate-400 font-bold hover:border-amber-500/30 hover:text-amber-400 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Upload className="w-5 h-5" />
                                        Import from TXT File
                                    </button>

                                    {/* Or Paste */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-px bg-white/10"></div>
                                        <span className="text-xs text-slate-500 font-bold">OR</span>
                                        <div className="flex-1 h-px bg-white/10"></div>
                                    </div>

                                    {/* Paste Area */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-2">
                                            <ClipboardPaste className="w-4 h-4" />
                                            Paste Order IDs (one per line or comma-separated)
                                        </label>
                                        <textarea
                                            value={fileListInput}
                                            onChange={e => setFileListInput(e.target.value)}
                                            placeholder="ZX123456&#10;ZX789012&#10;AB345678"
                                            rows={5}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 font-mono text-sm resize-none"
                                        />
                                    </div>

                                    {/* Preview */}
                                    {parsedItems.length > 0 && (
                                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-emerald-400">
                                                    Parsed {parsedItems.length} order IDs
                                                </span>
                                                {fileName && (
                                                    <span className="text-xs text-slate-500">From: {fileName}</span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {parsedItems.slice(0, 10).map((item, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 bg-slate-800/50 text-xs font-mono text-slate-300 rounded">
                                                        {item}
                                                    </span>
                                                ))}
                                                {parsedItems.length > 10 && (
                                                    <span className="px-2 py-0.5 text-xs text-slate-500">
                                                        +{parsedItems.length - 10} more...
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Value Input for other types */
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Match Value</label>
                                    <input
                                        type="text"
                                        value={newCondition.value}
                                        onChange={e => setNewCondition(prev => ({ ...prev, value: e.target.value }))}
                                        placeholder={
                                            newCondition.type === 'prefix' ? 'ZX, OR*, AB***' :
                                                newCondition.type === 'zipRange' ? '90000-91999 or 902' :
                                                    newCondition.type === 'regex' ? '^[A-Z]{2}\\d{6}$' :
                                                        'LA-001, SF-*'
                                        }
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 font-mono"
                                    />
                                </div>
                            )}

                            {/* Description Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Description (optional)</label>
                                <input
                                    type="text"
                                    value={newCondition.description}
                                    onChange={e => setNewCondition(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="e.g., Today's batch orders"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={resetForm}
                                    className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddCondition}
                                    disabled={newCondition.type === 'fileList' ? parsedItems.length === 0 : !newCondition.value.trim()}
                                    className="flex-1 py-3 rounded-xl bg-sky-500 text-white font-bold hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add Condition
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="w-full py-4 rounded-xl border-2 border-dashed border-white/10 text-slate-400 font-bold hover:border-sky-500/30 hover:text-sky-400 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Condition
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900/50">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <HelpCircle className="w-4 h-4" />
                        <span>Conditions use <strong className="text-slate-400">OR</strong> logic: match any condition to process</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintConditionManager;
