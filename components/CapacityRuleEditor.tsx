import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { StackCapacityConfig, StackCapacityRule, CapacityRuleType, CapacityOperator } from '../types';

interface CapacityRuleEditorProps {
    config: StackCapacityConfig;
    onChange: (config: StackCapacityConfig) => void;
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

const CapacityRuleEditor: React.FC<CapacityRuleEditorProps> = ({ config, onChange }) => {
    const addRule = () => {
        onChange({
            ...config,
            rules: [...config.rules, { type: 'count', operator: '>=', value: 40 }]
        });
    };

    const removeRule = (index: number) => {
        onChange({
            ...config,
            rules: config.rules.filter((_, i) => i !== index)
        });
    };

    const updateRule = (index: number, updates: Partial<StackCapacityRule>) => {
        onChange({
            ...config,
            rules: config.rules.map((rule, i) => i === index ? { ...rule, ...updates } : rule)
        });
    };

    const toggleLogic = () => {
        onChange({
            ...config,
            logic: config.logic === 'AND' ? 'OR' : 'AND'
        });
    };

    // Generate preview text
    const getPreviewText = () => {
        if (config.rules.length === 0) return 'No rules (stack never full)';

        const ruleTexts = config.rules.map(rule => {
            const typeInfo = RULE_TYPES.find(t => t.value === rule.type);
            return `${typeInfo?.label || rule.type} ${rule.operator} ${rule.value} ${typeInfo?.unit || ''}`;
        });

        return ruleTexts.join(config.logic === 'AND' ? ' AND ' : ' OR ');
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Stack Capacity Rules
                </label>
                <button
                    onClick={addRule}
                    className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                >
                    <Plus className="w-3 h-3" />
                    Add Rule
                </button>
            </div>

            {/* Logic Toggle */}
            {config.rules.length > 1 && (
                <button
                    onClick={toggleLogic}
                    className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${config.logic === 'AND'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                >
                    Logic: {config.logic === 'AND' ? 'ALL conditions (AND)' : 'ANY condition (OR)'}
                </button>
            )}

            {/* Rules List */}
            <div className="space-y-2">
                {config.rules.map((rule, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-slate-900 rounded-xl border border-white/5"
                    >
                        {/* Type Selector */}
                        <select
                            value={rule.type}
                            onChange={(e) => updateRule(index, { type: e.target.value as CapacityRuleType })}
                            className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                        >
                            {RULE_TYPES.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>

                        {/* Operator Selector */}
                        <select
                            value={rule.operator}
                            onChange={(e) => updateRule(index, { operator: e.target.value as CapacityOperator })}
                            className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500"
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
                            className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500 w-20"
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

                {config.rules.length === 0 && (
                    <div className="text-center py-6 text-slate-600 text-xs">
                        Click "Add Rule" to configure stack capacity conditions
                    </div>
                )}
            </div>

            {/* Preview */}
            <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
                <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                    Preview
                </div>
                <div className="text-xs text-slate-400">
                    Stack full when: <span className="text-white font-bold">{getPreviewText()}</span>
                </div>
            </div>
        </div>
    );
};

export default CapacityRuleEditor;
