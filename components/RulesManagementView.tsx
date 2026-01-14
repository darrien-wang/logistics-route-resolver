import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Activity,
    Download,
    Upload,
    CheckCircle2,
    X,
    Save,
    Trash2,
    FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { ZipRouteRecord } from '../types';
import { FlexibleDataSource } from '../services/RouteService';
import { useI18n } from '../contexts/I18nContext';

interface RulesManagementViewProps {
    dataSource: FlexibleDataSource;
    onFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RulesManagementView: React.FC<RulesManagementViewProps> = ({ dataSource, onFileUpload }) => {
    const [records, setRecords] = useState(dataSource.getAllRecords());
    const [searchTerm, setSearchTerm] = useState('');
    const [editingZip, setEditingZip] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const { t } = useI18n();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Refresh records when dataSource changes (handles async Excel loading)
    const refreshRecords = () => setRecords([...dataSource.getAllRecords()]);

    // Process dropped or selected file
    const processFile = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data: any[] = XLSX.utils.sheet_to_json(ws);
            const newRecords: ZipRouteRecord[] = data.map(row => ({
                zip: (row['Ship-to Zipcodes'] || row['Zipcode'] || row['邮编'] || "").toString(),
                metroArea: row['Metro Area'] || row['城市'] || "",
                state: row['State'] || row['州'] || "",
                destinationZone: (row['Destination Zone'] || row['目的地区'] || "").toString(),
                routeConfiguration: row['Route Configuration'] || row['线路'] || "",
                route2Configuration: row['ROUTE2 Configuration'] || row['线路2'] || ""
            })).filter(r => r.zip);
            if (newRecords.length > 0) {
                dataSource.updateData(newRecords, file.name);
                refreshRecords();
                alert(`✅ Imported ${newRecords.length} rules from ${file.name}`);
            } else {
                alert('⚠️ No valid records found in file');
            }
        };
        reader.readAsBinaryString(file);
    }, [dataSource]);

    // Drag and Drop handlers
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.name.match(/\.(xlsx|xls|csv)$/i)) {
                processFile(file);
            } else {
                alert('⚠️ Please drop an Excel file (.xlsx, .xls, .csv)');
            }
        }
    }, [processFile]);

    // Poll for data source updates on mount (Excel loads async)
    useEffect(() => {
        // Check immediately
        refreshRecords();

        // Poll a few times to catch async Excel load
        const timer1 = setTimeout(refreshRecords, 200);
        const timer2 = setTimeout(refreshRecords, 500);
        const timer3 = setTimeout(refreshRecords, 1000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [dataSource]);

    const filteredRecords = records.filter(r =>
        r.zip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.metroArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.routeConfiguration.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Progressive loading for large rule sets
    const INITIAL_VISIBLE = 50;
    const LOAD_MORE_COUNT = 30;
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const handleTableScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        if (scrollBottom < 100) {
            if (visibleCount < filteredRecords.length) {
                setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredRecords.length));
            }
        }
    }, [filteredRecords.length, visibleCount]);

    const visibleRecords = filteredRecords.slice(0, visibleCount);


    const handleDelete = (zip: string) => {
        if (confirm(`Delete rule for ZIP ${zip}?`)) {
            dataSource.deleteRecord(zip);
            setRecords([...dataSource.getAllRecords()]);
        }
    };

    const handleStartEdit = (r: ZipRouteRecord) => {
        setEditingZip(r.zip);
        setEditValue(r.routeConfiguration);
    };

    const handleSaveEdit = (zip: string) => {
        dataSource.updateRecord(zip, { routeConfiguration: editValue });
        setEditingZip(null);
        setRecords([...dataSource.getAllRecords()]);
    };

    const handleExport = () => {
        const data = dataSource.getAllRecords();
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Rules");
        XLSX.writeFile(wb, `Rules_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div
            className={`flex flex-col space-y-8 animate-in fade-in duration-500 relative ${isDragOver ? 'ring-4 ring-sky-500 ring-opacity-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Drag Overlay */}
            {isDragOver && (
                <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-sm z-50 rounded-3xl flex flex-col items-center justify-center border-4 border-dashed border-sky-400 pointer-events-none">
                    <Upload className="w-16 h-16 text-sky-400 mb-4 animate-bounce" />
                    <p className="text-sky-400 font-bold text-xl">Drop Excel file to import rules</p>
                    <p className="text-sky-400/70 text-sm mt-2">.xlsx, .xls, .csv</p>
                </div>
            )}

            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('rules.title')}</h1>
                    <div className="text-slate-500 text-sm mt-1">{records.length} {t('rules.rulesLoaded')}</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={`${t('common.search')}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-sky-500 w-64 uppercase"
                        />
                        <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    </div>

                    {/* Import Rules Button */}
                    {onFileUpload && (
                        <>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => {
                                    onFileUpload(e);
                                    // Refresh records after import
                                    setTimeout(refreshRecords, 100);
                                }}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-500 p-3 px-6 rounded-xl border border-blue-400/50 flex items-center gap-2 hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/20 font-bold"
                            >
                                <Upload className="w-5 h-5" /> {t('common.import')}
                            </button>
                        </>
                    )}

                    <button
                        onClick={handleExport}
                        className="bg-emerald-500 p-3 px-6 rounded-xl border border-emerald-400/50 flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 font-bold"
                    >
                        <Download className="w-5 h-5" /> {t('rules.exportRules')}
                    </button>
                </div>
            </header>

            <div className="glass-panel rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto" onScroll={handleTableScroll}>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">{t('rules.zipCode')}</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">{t('rules.metroArea')}</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">{t('rules.state')}</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">{t('rules.route')}</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">{t('rules.zone')}</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {visibleRecords.map((r, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-8 py-4 font-mono font-black text-sky-400">{r.zip}</td>
                                    <td className="px-8 py-4 text-slate-300 font-bold">{r.metroArea}</td>
                                    <td className="px-8 py-4 text-slate-500 uppercase font-black text-xs">{r.state}</td>
                                    <td className="px-8 py-4">
                                        {editingZip === r.zip ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(r.zip)}
                                                    className="bg-slate-800 border border-sky-500/50 rounded-lg px-3 py-1 text-emerald-400 font-bold w-32 focus:outline-none"
                                                    autoFocus
                                                />
                                                <button onClick={() => handleSaveEdit(r.zip)} className="text-emerald-400 hover:text-white transition-colors">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => setEditingZip(null)} className="text-slate-500 hover:text-white transition-colors">
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-emerald-400 font-bold tracking-wider">{r.routeConfiguration}</span>
                                                <button
                                                    onClick={() => handleStartEdit(r)}
                                                    className="p-1 text-slate-600 hover:text-sky-400 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Save className="w-3 h-3" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-4 text-slate-500">{r.destinationZone}</td>
                                    <td className="px-8 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(r.zip)}
                                            className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredRecords.length === 0 && (
                    <div className="p-20 flex flex-col items-center text-slate-800 opacity-20">
                        <FileSpreadsheet className="w-20 h-20 mb-4" />
                        <p className="font-black uppercase tracking-widest">{t('rules.noRules')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RulesManagementView;
