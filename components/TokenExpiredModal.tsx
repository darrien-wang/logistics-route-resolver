import React from 'react';
import { AlertCircle, Settings, X } from 'lucide-react';

interface TokenExpiredModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenSettings: () => void;
}

const TokenExpiredModal: React.FC<TokenExpiredModalProps> = ({ isOpen, onClose, onOpenSettings }) => {
    if (!isOpen) return null;

    const handleOpenSettings = () => {
        onOpenSettings();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border-4 border-red-500/50 rounded-[40px] w-full max-w-md shadow-[0_0_100px_rgba(239,68,68,0.3)] p-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500/20 p-3 rounded-2xl border border-red-500/30">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Token Expired</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-8">
                    <p className="text-slate-300 text-lg mb-2">
                        Your authorization token has expired.
                    </p>
                    <p className="text-slate-500 text-sm">
                        Please update your <span className="text-amber-400 font-bold">Authorization</span> and <span className="text-sky-400 font-bold">WPGLB-Auth</span> tokens in the API settings to continue.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold transition-colors border border-white/10"
                    >
                        Dismiss
                    </button>
                    <button
                        onClick={handleOpenSettings}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-2xl font-black transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
                    >
                        <Settings className="w-5 h-5" />
                        Open Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TokenExpiredModal;
