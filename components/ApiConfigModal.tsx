import React from 'react';
import { Lock, X, Database, RefreshCcw, Activity, Printer } from 'lucide-react';
import { ApiSettings } from '../types';

interface ApiConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    apiSettings: ApiSettings;
    onSettingsChange: (settings: ApiSettings) => void;
}

const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
    isOpen,
    onClose,
    apiSettings,
    onSettingsChange
}) => {
    if (!isOpen) return null;

    const setApiSettings = (settings: ApiSettings) => onSettingsChange(settings);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 p-4">
            <div className="w-full max-w-xl max-h-[90vh] glass-panel rounded-[32px] border-white/10 shadow-[0_0_100px_rgba(56,189,248,0.2)] animate-in zoom-in-95 duration-300 flex flex-col">
                <div className="flex justify-between items-center p-6 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-widest">Network Config</h2>
                            <p className="text-slate-500 text-[10px]">Configure Wpglb API credentials</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <div className="overflow-y-auto px-6 flex-1 custom-scrollbar">
                    <div className="space-y-4 pb-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Wpglb-Auth Token</label>
                            <textarea
                                value={apiSettings.wpglbAuth}
                                onChange={(e) => setApiSettings({ ...apiSettings, wpglbAuth: e.target.value })}
                                placeholder="bearer eyJ..."
                                className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50 h-20 resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Authorization Header</label>
                            <input
                                type="text"
                                value={apiSettings.authorization}
                                onChange={(e) => setApiSettings({ ...apiSettings, authorization: e.target.value })}
                                placeholder="Basic YWRtaW46..."
                                className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Task Code</label>
                                <input
                                    type="text"
                                    value={apiSettings.taskCode}
                                    onChange={(e) => setApiSettings({ ...apiSettings, taskCode: e.target.value })}
                                    placeholder="WPLS-..."
                                    className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">PT ID</label>
                                <input
                                    type="number"
                                    value={apiSettings.ptId}
                                    onChange={(e) => setApiSettings({ ...apiSettings, ptId: parseInt(e.target.value) || 0 })}
                                    placeholder="3391"
                                    className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Pickup Site ID</label>
                                <input
                                    type="number"
                                    value={apiSettings.pickupSite}
                                    onChange={(e) => setApiSettings({ ...apiSettings, pickupSite: parseInt(e.target.value) || 0 })}
                                    placeholder="3"
                                    className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs font-mono text-sky-400 focus:outline-none focus:border-sky-500/50"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-bold text-white">Remote Lookup</span>
                            </div>
                            <button
                                onClick={() => setApiSettings({ ...apiSettings, enabled: !apiSettings.enabled })}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.enabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.enabled ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                                <RefreshCcw className="w-4 h-4 text-sky-400" />
                                <span className="text-xs font-bold text-white">Pickup Scan (RECEIVE)</span>
                            </div>
                            <button
                                onClick={() => setApiSettings({ ...apiSettings, pickupEnabled: !apiSettings.pickupEnabled })}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.pickupEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.pickupEnabled ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-purple-400" />
                                <span className="text-xs font-bold text-white">Voice Announcements</span>
                            </div>
                            <button
                                onClick={() => setApiSettings({ ...apiSettings, voiceEnabled: !apiSettings.voiceEnabled })}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.voiceEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.voiceEnabled ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                                <Printer className="w-4 h-4 text-amber-400" />
                                <span className="text-xs font-bold text-white">Auto-Print Labels</span>
                            </div>
                            <button
                                onClick={() => setApiSettings({ ...apiSettings, autoPrintLabelEnabled: !apiSettings.autoPrintLabelEnabled })}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${apiSettings.autoPrintLabelEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${apiSettings.autoPrintLabelEnabled ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-4 flex-shrink-0">
                    {/* Token Last Updated Display */}
                    {apiSettings.tokenUpdatedAt && (
                        <div className="bg-slate-800/50 border border-white/5 rounded-xl p-3 mb-4 text-center">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Token Last Updated: </span>
                            <span className="text-xs font-mono text-sky-400">{new Date(apiSettings.tokenUpdatedAt).toLocaleString()}</span>
                        </div>
                    )}
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                // Update tokenUpdatedAt when saving
                                onSettingsChange({ ...apiSettings, tokenUpdatedAt: new Date().toISOString() });
                                onClose();
                            }}
                            className="flex-1 bg-sky-500 text-white font-black uppercase py-3 rounded-xl shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Save & Refresh Token
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiConfigModal;
