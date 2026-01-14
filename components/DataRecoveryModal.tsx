import React, { useEffect, useState } from 'react';
import { History, RotateCcw, X, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { indexedDBService } from '../services/IndexedDBService';

interface DataRecoveryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRestore: (timestamp: number) => Promise<boolean>;
}

interface BackupSummary {
    timestamp: number;
    date: string;
    itemCount: number;
}

const DataRecoveryModal: React.FC<DataRecoveryModalProps> = ({ isOpen, onClose, onRestore }) => {
    const [backups, setBackups] = useState<BackupSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [restoringId, setRestoringId] = useState<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            indexedDBService.getBackups().then(data => {
                setBackups(data);
                setLoading(false);
            });
        }
    }, [isOpen, refreshTrigger]);

    if (!isOpen) return null;

    const handleRestore = async (timestamp: number) => {
        if (confirm('⚠️ WARNING: Restoring a backup will REPLACE all current data. Any unsaved progress since the last backup will be lost. Are you sure?')) {
            setRestoringId(timestamp);
            const success = await onRestore(timestamp);
            setRestoringId(null);
            if (success) {
                alert('✅ Data restored successfully!');
                onClose();
            } else {
                alert('❌ Failed to restore data.');
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50 rounded-t-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/20 rounded-xl">
                            <History className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Data Recovery</h2>
                            <p className="text-slate-400 text-sm">Restore from auto-generated safety backups</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                        <div className="text-amber-200 text-sm">
                            <p className="font-bold mb-1">How Backups Work</p>
                            <p>Checkpoints are automatically created whenever you RESET/CLEAR data. They are kept for 48 hours. Restoring a checkpoint will overwrite your current active session.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-500">Scanning for backups...</p>
                        </div>
                    ) : backups.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl">
                            <History className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">No backups found</p>
                            <p className="text-slate-600 text-sm mt-1">Backups are created when you clear data.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {backups.map((backup) => (
                                <div key={backup.timestamp} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-lg">
                                                {new Date(backup.timestamp).toLocaleString()}
                                            </div>
                                            <div className="text-slate-500 text-sm font-mono mt-0.5">
                                                {backup.itemCount} items archived
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleRestore(backup.timestamp)}
                                        disabled={restoringId !== null}
                                        className="px-4 py-2 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 rounded-lg font-medium transition-all flex items-center gap-2 group-hover:bg-slate-800"
                                    >
                                        {restoringId === backup.timestamp ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <RotateCcw className="w-4 h-4" />
                                        )}
                                        {restoringId === backup.timestamp ? 'Restoring...' : 'Restore'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-800 bg-slate-800/30 text-center text-slate-500 text-xs">
                    Backups older than 48 hours are automatically deleted.
                </div>
            </div>
        </div>
    );
};

export default DataRecoveryModal;
