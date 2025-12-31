import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Settings } from 'lucide-react';
import { StackCapacityConfig, StackCapacityRule, CapacityRuleType, CapacityOperator } from '../types';

interface CapacityRuleEditorProps {
    isOpen: boolean;
    onClose: () => void;
    config: StackCapacityConfig;
    onSave: (config: StackCapacityConfig) => void;
}

const RULE_TYPES: { value: CapacityRuleType; label: string; unit: string }[] = [
    { value: 'count', label: 'Count', unit: 'items' },
    { value: 'weight', label: 'Weight', unit: 'lb' },
    { value: 'volume', label: 'Volume', unit: 'ft³' },
];

const OPERATORS: { value: CapacityOperator; label: string }[] = [
    { value: '>=', label: '>=' },
    { value: '>', label: '>' },
    { value: '<=', label: '<=' },
    { value: '<', label: '<' },
];

const CapacityRuleEditor: React.FC<CapacityRuleEditorProps> = ({ isOpen, onClose, config, onSave }) => {
    const [localConfig, setLocalConfig] = useState<StackCapacityConfig>(config);

    // Sync local state when config prop changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setLocalConfig(config);
        }
    }, [isOpen, config]);

    if (!isOpen) return null;

    const addRule = () => {
        setLocalConfig({
            ...localConfig,
            rules: [...localConfig.rules, { type: 'count', operator: '>=', value: 40 }]
        });
    };

    const removeRule = (index: number) => {
        setLocalConfig({
            ...localConfig,
            rules: localConfig.rules.filter((_, i) => i !== index)
        });
    };

    const updateRule = (index: number, updates: Partial<StackCapacityRule>) => {
        setLocalConfig({
            ...localConfig,
            rules: localConfig.rules.map((rule, i) => i === index ? { ...rule, ...updates } : rule)
        });
    };

    const toggleLogic = () => {
        setLocalConfig({
            ...localConfig,
            logic: localConfig.logic === 'AND' ? 'OR' : 'AND'
        });
    };

    // Generate preview text
    const getPreviewText = () => {
        if (localConfig.rules.length === 0) return 'No rules (stack never full)';

        const ruleTexts = localConfig.rules.map(rule => {
            const typeInfo = RULE_TYPES.find(t => t.value === rule.type);
            return `${typeInfo?.label || rule.type} ${rule.operator} ${rule.value} ${typeInfo?.unit || ''}`;
        });

        return ruleTexts.join(localConfig.logic === 'AND' ? ' AND ' : ' OR ');
    };

    const handleSave = () => {
        onSave(localConfig);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-sky-500/10 p-2 rounded-lg border border-sky-500/20">
                            <Settings className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Stack Capacity Rules</h2>
                            <p className="text-sm text-slate-500">Configure when stacks are considered full</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Add Rule Button */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Rules
                        </span>
                        <button
                            onClick={addRule}
                            className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                        >
                            <Plus className="w-3 h-3" />
                            Add Rule
                        </button>
                    </div>

                    {/* Logic Toggle */}
                    {localConfig.rules.length > 1 && (
                        <button
                            onClick={toggleLogic}
                            className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${localConfig.logic === 'AND'
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                }`}
                        >
                            Logic: {localConfig.logic === 'AND' ? 'ALL conditions (AND)' : 'ANY condition (OR)'}
                        </button>
                    )}

                    {/* Rules List */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {localConfig.rules.map((rule, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-3 bg-slate-800 rounded-xl border border-white/5"
                            >
                                {/* Type Selector */}
                                <select
                                    value={rule.type}
                                    onChange={(e) => updateRule(index, { type: e.target.value as CapacityRuleType })}
                                    className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                                >
                                    {RULE_TYPES.map(t => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>

                                {/* Operator Selector */}
                                <select
                                    value={rule.operator}
                                    onChange={(e) => updateRule(index, { operator: e.target.value as CapacityOperator })}
                                    className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500"
                                >
                                    {OPERATORS.map(o => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>

                                {/* Value Input */}
                                <input
                                    type="number"
                                    value={rule.value}
                                    onChange={(e) => updateRule(index, { value: parseFloat(e.target.value) || 0 })}
                                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500 w-20"
                                    min="0"
                                    step={rule.type === 'volume' ? '0.1' : '1'}
                                />

                                {/* Unit Label */}
                                <span className="text-xs text-slate-500 w-10">
                                    {RULE_TYPES.find(t => t.value === rule.type)?.unit}
                                </span>

                                {/* Delete Button */}
                                <button
                                    onClick={() => removeRule(index)}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        {localConfig.rules.length === 0 && (
                            <div className="text-center py-6 text-slate-600 text-xs">
                                Click "Add Rule" to configure stack capacity conditions
                            </div>
                        )}
                    </div>

                    {/* Preview */}
                    <div className="p-3 bg-slate-800/50 rounded-xl border border-white/5">
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                            Preview
                        </div>
                        <div className="text-xs text-slate-400">
                            Stack full when: <span className="text-white font-bold">{getPreviewText()}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900 flex justify-end gap-3 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-300 font-bold hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CapacityRuleEditor;
