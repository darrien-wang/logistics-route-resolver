import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, Check, Layers } from 'lucide-react';
import { RouteStack } from '../types';
import { ExportEngine, exportTemplates, ExportTemplate } from '../lib/export';

interface ExportConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedStacks: RouteStack[];  // Selected stacks
    allStacks: RouteStack[];       // All available stacks
}

type ExportScope = 'selected' | 'all';

const ExportConfigModal: React.FC<ExportConfigModalProps> = ({ isOpen, onClose, selectedStacks, allStacks }) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('or');
    const [exportScope, setExportScope] = useState<ExportScope>(selectedStacks.length > 0 ? 'selected' : 'all');

    // Auto-select scope when modal opens based on current selection
    React.useEffect(() => {
        if (isOpen) {
            setExportScope(selectedStacks.length > 0 ? 'selected' : 'all');
        }
    }, [isOpen, selectedStacks.length]);

    if (!isOpen) return null;

    const selectedTemplate = exportTemplates.find(t => t.id === selectedTemplateId);
    const stacksToExport = exportScope === 'all' ? allStacks : selectedStacks;

    const handleExport = () => {
        if (!selectedTemplate || stacksToExport.length === 0) return;

        // Prepare sheets for multi-sheet export
        const sheets = stacksToExport.map(stack => {
            // Build lookup for merged stacks
            const routeStackLookup = new Map<string, number>();
            if (stack.mergeInfo?.components) {
                stack.mergeInfo.components.forEach(comp => {
                    routeStackLookup.set(comp.route, comp.stackNumber);
                });
            }

            // Enrich orders with source info
            const enrichedOrders = stack.orders.map(order => {
                let sourceRoute = '';
                let sourceStackNum: number | string = '';

                if (order.overflowSource) {
                    sourceRoute = order.overflowSource.route;
                    sourceStackNum = order.overflowSource.stackNumber;
                } else if (order.route?.routeConfiguration) {
                    sourceRoute = order.route.routeConfiguration;
                    if (stack.mergeInfo) {
                        sourceStackNum = routeStackLookup.get(sourceRoute) || 1;
                    } else {
                        sourceStackNum = stack.stackNumber;
                    }
                }

                return {
                    ...order,
                    sourceRoute,
                    sourceStackNum
                };
            });

            // Generate sheet name
            let sheetName = `${stack.route}-${stack.stackNumber}`;
            if (stack.type === 'overflow') {
                sheetName = `OVFL-${stack.route}`;
            }

            return {
                name: sheetName,
                data: enrichedOrders,
                columns: selectedTemplate.columns
            };
        });

        const scopeLabel = exportScope === 'all' ? 'ALL' : 'SELECTED';
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        ExportEngine.exportMultiSheet({
            sheets,
            filename: `Export_${scopeLabel}_${selectedTemplate.id.toUpperCase()}_${timestamp}`
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border-white/10 shadow-[0_0_100px_rgba(56,189,248,0.2)] animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Export Stacks</h2>
                            <p className="text-sm text-slate-400">
                                {stacksToExport.length} stack{stacksToExport.length !== 1 ? 's' : ''} will be exported
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Export Scope Selection */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Export Scope</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setExportScope('selected')}
                            disabled={selectedStacks.length === 0}
                            className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${exportScope === 'selected'
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                : 'bg-slate-800/30 border-white/5 text-slate-400 hover:bg-slate-800/50'
                                } ${selectedStacks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Layers className="w-4 h-4" />
                            <span className="font-medium">Selected ({selectedStacks.length})</span>
                        </button>
                        <button
                            onClick={() => setExportScope('all')}
                            className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${exportScope === 'all'
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                : 'bg-slate-800/30 border-white/5 text-slate-400 hover:bg-slate-800/50'
                                }`}
                        >
                            <Download className="w-4 h-4" />
                            <span className="font-medium">All Stacks ({allStacks.length})</span>
                        </button>
                    </div>
                </div>

                {/* Template Selection */}
                <div className="space-y-3 mb-6">
                    <label className="text-sm font-medium text-slate-300">Export Template</label>
                    <div className="space-y-2">
                        {exportTemplates.map((template) => (
                            <TemplateOption
                                key={template.id}
                                template={template}
                                selected={selectedTemplateId === template.id}
                                onSelect={() => setSelectedTemplateId(template.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Preview */}
                {selectedTemplate && (
                    <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                        <div className="text-xs font-medium text-slate-400 mb-2">Columns Preview</div>
                        <div className="flex flex-wrap gap-1">
                            {selectedTemplate.columns.slice(0, 8).map((col, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                                    {col.header}
                                </span>
                            ))}
                            {selectedTemplate.columns.length > 8 && (
                                <span className="px-2 py-1 text-xs text-slate-500">
                                    +{selectedTemplate.columns.length - 8} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={stacksToExport.length === 0}
                        className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="w-4 h-4" />
                        Export ({stacksToExport.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

// Template Option Component
interface TemplateOptionProps {
    template: ExportTemplate;
    selected: boolean;
    onSelect: () => void;
}

const TemplateOption: React.FC<TemplateOptionProps> = ({ template, selected, onSelect }) => {
    return (
        <button
            onClick={onSelect}
            className={`w-full p-4 rounded-xl border transition-all text-left ${selected
                ? 'bg-emerald-500/10 border-emerald-500/30 ring-2 ring-emerald-500/20'
                : 'bg-slate-800/30 border-white/5 hover:bg-slate-800/50 hover:border-white/10'
                }`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <div className="font-semibold text-white">{template.name}</div>
                    <div className="text-sm text-slate-400 mt-1">{template.description}</div>
                </div>
                {selected && (
                    <div className="p-1 bg-emerald-500 rounded-full">
                        <Check className="w-3 h-3 text-white" />
                    </div>
                )}
            </div>
        </button>
    );
};

export default ExportConfigModal;
