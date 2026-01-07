import React, { useState, useEffect } from 'react';
import { Download, RefreshCcw, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

type UpdateStatus =
    | { status: 'checking' }
    | { status: 'available'; version: string; releaseNotes?: string }
    | { status: 'not-available' }
    | { status: 'downloading'; percent: number }
    | { status: 'downloaded'; version?: string }
    | { status: 'error'; message: string };

interface ElectronAPI {
    updater: {
        checkForUpdates: () => Promise<any>;
        downloadUpdate: () => Promise<boolean>;
        installUpdate: () => void;
        getAppVersion: () => Promise<string>;
        onUpdateStatus: (callback: (status: UpdateStatus) => void) => () => void;
    };
}

declare global {
    interface Window {
        electronAPI?: ElectronAPI;
    }
}

const UpdateNotification: React.FC = () => {
    const [updateStatus, setUpdateStatus] = useState<UpdateStatus | null>(null);
    const [dismissed, setDismissed] = useState(false);
    const [appVersion, setAppVersion] = useState('');

    useEffect(() => {
        const api = window.electronAPI;
        if (!api?.updater) return;

        // Get current app version
        api.updater.getAppVersion().then(setAppVersion).catch(() => { });

        // Listen for update status
        const unsubscribe = api.updater.onUpdateStatus((status: UpdateStatus) => {
            console.log('[UpdateNotification] Status:', status);
            setUpdateStatus(status);
            if (status.status === 'available') {
                setDismissed(false);
            }
        });

        return unsubscribe;
    }, []);

    // Don't render if dismissed or no status
    if (dismissed || !updateStatus) return null;
    if (updateStatus.status === 'not-available' || updateStatus.status === 'checking') return null;

    const handleDownload = async () => {
        try {
            await window.electronAPI?.updater.downloadUpdate();
        } catch (err) {
            console.error('Download failed:', err);
        }
    };

    const handleInstall = () => {
        window.electronAPI?.updater.installUpdate();
    };

    const handleCheckManually = async () => {
        try {
            await window.electronAPI?.updater.checkForUpdates();
        } catch (err) {
            console.error('Check failed:', err);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[1000] animate-in slide-in-from-bottom-4 duration-300">
            <div className="glass-panel rounded-2xl border border-sky-500/30 p-5 shadow-2xl shadow-sky-500/20 max-w-sm">
                <div className="flex items-start gap-4">
                    {/* Update Available */}
                    {updateStatus.status === 'available' && (
                        <>
                            <div className="w-12 h-12 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-sky-500/20">
                                <Sparkles className="w-6 h-6 text-sky-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm flex items-center gap-2">
                                    Update Available
                                    <span className="px-2 py-0.5 bg-sky-500/20 rounded-full text-[10px] font-bold text-sky-400">
                                        v{updateStatus.version}
                                    </span>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    Click download to get latest features
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={handleDownload}
                                        className="flex-1 bg-sky-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-sky-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Update
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Downloading */}
                    {updateStatus.status === 'downloading' && (
                        <>
                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                                <RefreshCcw className="w-6 h-6 text-amber-400 animate-spin" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm">Downloading update...</div>
                                <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-sky-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${updateStatus.percent}%` }}
                                    />
                                </div>
                                <div className="text-xs text-slate-400 mt-2 font-mono">{updateStatus.percent}% Complete</div>
                            </div>
                        </>
                    )}

                    {/* Downloaded */}
                    {updateStatus.status === 'downloaded' && (
                        <>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm">Update Ready ✨</div>
                                <div className="text-xs text-slate-400 mt-1">
                                    Restart to install updates
                                </div>
                                <button
                                    onClick={handleInstall}
                                    className="mt-3 w-full bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    Restart Now
                                </button>
                            </div>
                        </>
                    )}

                    {/* Error */}
                    {updateStatus.status === 'error' && (
                        <>
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-red-500/20">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm">Update Failed</div>
                                <div className="text-xs text-red-400/80 mt-1 truncate">{updateStatus.message}</div>
                                <button
                                    onClick={handleCheckManually}
                                    className="mt-3 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        </>
                    )}

                    {/* Dismiss button */}
                    <button
                        onClick={() => setDismissed(true)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    >
                        <X className="w-4 h-4 text-slate-500" />
                    </button>
                </div>

                {/* Current version footer */}
                {appVersion && (
                    <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-slate-600 text-center font-mono">
                        Current Version: v{appVersion}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateNotification;
