import React, { useState } from 'react';
import { X, Layers, Plus, ArrowRight } from 'lucide-react';
import { RouteStack } from '../types';

interface StackSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    stacks: RouteStack[];
    onSelect: (stackId: string | 'NEW_CUSTOM', customName?: string) => void;
}

const StackSelectorModal: React.FC<StackSelectorModalProps> = ({ isOpen, onClose, stacks, onSelect }) => {
    const [selectedStackId, setSelectedStackId] = useState<string>('');
    const [customName, setCustomName] = useState('');
    const [mode, setMode] = useState<'existing' | 'new'>('existing');

    if (!isOpen) return null;

    // Filter relevant stacks (e.g. Custom or Manual stacks, or even Merged)
    // For now list all stacks except the source? (We don't know the source here, but generic list is fine)
    // Maybe show only Custom/Merged stacks as targets for simplicity?
    // Or allow moving to ANY stack.
    const candidateStacks = stacks;

    const handleConfirm = () => {
        if (mode === 'new') {
            if (!customName.trim()) return;
            onSelect('NEW_CUSTOM', customName.trim());
        } else {
            if (!selectedStackId) return;
            onSelect(selectedStackId);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-lg glass-panel rounded-[32px] p-8 border-white/10 shadow-2xl flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                        <ArrowRight className="w-6 h-6 text-sky-400" />
                        Move to Stack
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <div className="flex gap-2 p-1 bg-slate-900/50 rounded-xl mb-6">
                    <button
                        onClick={() => setMode('existing')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'existing' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        EXISTING STACK
                    </button>
                    <button
                        onClick={() => setMode('new')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'new' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        NEW POOL
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[300px] custom-scrollbar mb-6 min-h-[200px]">
                    {mode === 'existing' ? (
                        <div className="space-y-2">
                            {candidateStacks.length === 0 ? (
                                <div className="text-center text-slate-500 py-8">No stacks available</div>
                            ) : (
                                candidateStacks.map(stack => (
                                    <button
                                        key={stack.id}
                                        onClick={() => setSelectedStackId(stack.id)}
                                        className={`w-full p-4 rounded-xl border text-left transition-all ${selectedStackId === stack.id
                                                ? 'bg-sky-500/10 border-sky-500/50 ring-1 ring-sky-500/50'
                                                : 'bg-slate-800/30 border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-slate-200">{stack.route}</div>
                                                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                                                    Stack {stack.stackNumber} • {stack.orders.length} Orders
                                                </div>
                                            </div>
                                            {selectedStackId === stack.id && <div className="w-3 h-3 bg-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" />}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pool Name</label>
                            <input
                                type="text"
                                value={customName}
                                onChange={e => setCustomName(e.target.value)}
                                placeholder="e.g. VIP Orders"
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                                autoFocus
                            />
                            <p className="text-xs text-slate-500">
                                Create a new empty custom stack to organize specific orders.
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={mode === 'existing' ? !selectedStackId : !customName.trim()}
                    className="w-full py-4 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                >
                    {mode === 'new' ? 'Create & Move' : 'Move Orders'}
                </button>
            </div>
        </div>
    );
};

export default StackSelectorModal;
