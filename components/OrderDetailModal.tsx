import React from 'react';
import { X, Download, Package, MapPin, Calendar } from 'lucide-react';
import { ResolvedRouteInfo } from '../types';
import * as XLSX from 'xlsx';

interface OrderDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    orders: ResolvedRouteInfo[];
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, title, orders }) => {
    if (!isOpen) return null;

    const handleExport = () => {
        const exportData = orders.map(order => ({
            'Order ID': order.orderId,
            'Date': order.date || '',
            'Address': order.address || '',
            'Location ID': order.locationId || '',
            'Location Name': order.locationName || '',
            'Latitude': order.latitude ?? '',
            'Longitude': order.longitude ?? '',
            'Duration': order.duration ?? '',
            'TW from': order.twFrom || '',
            'TW to': order.twTo || '',
            'Weight': order.weight ?? '',
            'Volume': order.volume ?? '',
            'Vehicle Features': order.vehicleFeatures || '',
            'Skills': order.skills || '',
            'Assigned to Driver': order.assignedToDriver || '',
            'Notes': order.notes || '',
            'Email': order.email || '',
            'Phone': order.phone || '',
            'Notifications': order.notifications || '',
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Orders');
        XLSX.writeFile(wb, `${title.replace(/\s+/g, '_')}_Orders_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-5xl max-h-[90vh] glass-panel rounded-[40px] p-10 border-white/10 shadow-[0_0_100px_rgba(56,189,248,0.2)] animate-in zoom-in-95 duration-300 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                            <Package className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-widest text-white">{title}</h2>
                            <p className="text-slate-500 text-sm mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} in this stack</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExport}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                        >
                            <Download className="w-5 h-5" />
                            Export Excel
                        </button>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Order List */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {orders.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-700 opacity-30">
                            <Package className="w-20 h-20 mb-4" />
                            <p className="text-xl font-black uppercase tracking-widest">No Orders</p>
                        </div>
                    ) : (
                        orders.map((order, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-slate-900/40 rounded-[24px] border border-white/5 hover:border-sky-500/20 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-mono font-black text-xl text-sky-400 uppercase tracking-wider">
                                                {order.orderId}
                                            </div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                                                Route: <span className="text-emerald-400 font-bold">{order.route?.routeConfiguration || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-600 uppercase tracking-wider">Resolved</div>
                                        <div className="text-sm text-slate-400 font-mono">{new Date(order.resolvedAt).toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Address</div>
                                            <div className="text-sm text-slate-300 truncate">{order.address || 'N/A'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Date</div>
                                            <div className="text-sm text-slate-300">{order.date || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>

                                {order.route && (
                                    <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Metro Area</div>
                                            <div className="text-sm text-slate-400 font-bold">{order.route.metroArea}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">State</div>
                                            <div className="text-sm text-slate-400 font-bold uppercase">{order.route.state}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1">Zone</div>
                                            <div className="text-sm text-slate-400 font-bold">{order.route.destinationZone}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;
