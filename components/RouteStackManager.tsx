import React, { useState, useMemo } from 'react';
import { Settings, Layers, Database, Filter, Search, X } from 'lucide-react';
import { RouteStack, ResolvedRouteInfo, StackCapacityConfig, DEFAULT_CAPACITY_CONFIG, ApiSettings } from '../types';
import RouteStackCard from './RouteStackCard';
import ExceptionPool from './ExceptionPool';
import OrderDetailModal from './OrderDetailModal';
import CapacityRuleEditor from './CapacityRuleEditor';

interface RouteStackManagerProps {
    history: ResolvedRouteInfo[];
    apiSettings: ApiSettings;
    onSettingsChange: (settings: ApiSettings) => void;
    onAddTestData?: (testOrders: ResolvedRouteInfo[]) => void;
}

type FilterMode = 'all' | 'full' | 'notFull';

const RouteStackManager: React.FC<RouteStackManagerProps> = ({
    history,
    apiSettings,
    onSettingsChange,
    onAddTestData
}) => {
    const [selectedStack, setSelectedStack] = useState<{ title: string; orders: ResolvedRouteInfo[] } | null>(null);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [filterMode, setFilterMode] = useState<FilterMode>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<{ found: boolean; stackName?: string; isException?: boolean } | null>(null);

    // Get capacity from config
    const capacityConfig = apiSettings.stackCapacityConfig || DEFAULT_CAPACITY_CONFIG;
    const countRule = capacityConfig.rules.find(r => r.type === 'count');
    const capacity = countRule?.value || 40;

    // Build stacks from history - creating multiple stacks per route when capacity exceeded
    const { stacks, exceptionPool } = useMemo(() => {
        const routeOrdersMap = new Map<string, ResolvedRouteInfo[]>();
        const exceptions: ResolvedRouteInfo[] = [];
        const processedOrderIds = new Set<string>();

        // Group orders by route
        history.forEach(order => {
            if (processedOrderIds.has(order.orderId)) return;
            processedOrderIds.add(order.orderId);

            const routeName = order.route?.routeConfiguration;
            if (routeName) {
                if (!routeOrdersMap.has(routeName)) {
                    routeOrdersMap.set(routeName, []);
                }
                routeOrdersMap.get(routeName)!.push(order);
            } else {
                // Set exception reason
                let reason = 'Unknown';
                if (!order.zipCode || order.zipCode.length === 0) {
                    reason = 'No zip code found';
                } else if (!order.address || order.address.length === 0) {
                    reason = 'No address found';
                } else {
                    reason = `No route for zip: ${order.zipCode}`;
                }
                exceptions.push({ ...order, exceptionReason: reason });
            }
        });

        // Create multiple stacks per route when capacity exceeded
        const allStacks: RouteStack[] = [];

        routeOrdersMap.forEach((orders, baseRouteName) => {
            const stackCount = Math.ceil(orders.length / capacity);

            for (let i = 0; i < stackCount; i++) {
                const stackOrders = orders.slice(i * capacity, (i + 1) * capacity);
                const stackNumber = i + 1;
                const displayName = `${baseRouteName}-${String(stackNumber).padStart(3, '0')}`;

                allStacks.push({
                    routeName: displayName,
                    baseRouteName,
                    stackNumber,
                    displayName,
                    capacity,
                    orders: stackOrders,
                    isFull: stackOrders.length >= capacity,
                });
            }
        });

        return {
            stacks: allStacks.sort((a, b) => a.displayName.localeCompare(b.displayName)),
            exceptionPool: exceptions,
        };
    }, [history, capacity]);

    // Filter stacks based on filterMode
    const filteredStacks = useMemo(() => {
        switch (filterMode) {
            case 'full':
                return stacks.filter(s => s.isFull);
            case 'notFull':
                return stacks.filter(s => !s.isFull);
            default:
                return stacks;
        }
    }, [stacks, filterMode]);

    const fullStackCount = stacks.filter(s => s.isFull).length;
    const notFullStackCount = stacks.filter(s => !s.isFull).length;

    const handleStackClick = (stack: RouteStack) => {
        setSelectedStack({
            ...stack,
            orders: stack.orders,
        });
    };

    const handleExceptionClick = () => {
        setSelectedStack({
            routeName: 'Exception Pool',
            baseRouteName: 'Exception',
            stackNumber: 0,
            displayName: 'Exception Pool',
            capacity: 9999,
            orders: exceptionPool,
            isFull: false,
        });
    };

    const handleReasonClick = (reason: string) => {
        const filteredOrders = exceptionPool.filter(o => o.exceptionReason === reason);
        setSelectedStack({
            routeName: `Exceptions: ${reason}`,
            baseRouteName: 'Exception',
            stackNumber: 0,
            displayName: reason,
            capacity: 9999,
            orders: filteredOrders,
            isFull: false,
        });
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResult(null);
            return;
        }

        const query = searchQuery.trim().toUpperCase();

        // Search in stacks
        for (const stack of stacks) {
            const found = stack.orders.some(o => o.orderId.toUpperCase().includes(query));
            if (found) {
                setSearchResult({ found: true, stackName: stack.displayName });
                return;
            }
        }

        // Search in exception pool
        const foundInException = exceptionPool.some(o => o.orderId.toUpperCase().includes(query));
        if (foundInException) {
            setSearchResult({ found: true, isException: true });
            return;
        }

        setSearchResult({ found: false });
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResult(null);
    };

    const handleCloseModal = () => {
        setSelectedStack(null);
    };

    const handleCapacityConfigChange = (config: StackCapacityConfig) => {
        onSettingsChange({ ...apiSettings, stackCapacityConfig: config });
    };

    const handleGenerateTestData = () => {
        if (!onAddTestData) return;

        const routes = ['SD-007', 'SD-008', 'SD-009'];
        const cities = [
            { city: 'Los Angeles', state: 'CA', zip: '90001' },
            { city: 'San Francisco', state: 'CA', zip: '94102' },
            { city: 'New York', state: 'NY', zip: '10001' },
            { city: 'Chicago', state: 'IL', zip: '60601' },
            { city: 'Miami', state: 'FL', zip: '33101' },
            { city: 'Houston', state: 'TX', zip: '77001' },
        ];

        const testOrders: ResolvedRouteInfo[] = [];

        // Generate 300 test orders - each route gets 100 orders (2.5 full stacks)
        for (let i = 1; i <= 300; i++) {
            const hasRoute = i > 10; // First 10 orders have no route (exceptions)
            const routeIndex = Math.floor((i - 11) / 100) % routes.length;
            const cityData = cities[i % cities.length];

            const order: ResolvedRouteInfo = {
                orderId: `TEST-${String(i).padStart(4, '0')}`,
                date: new Date().toLocaleDateString(),
                address: `${100 + i} Main St, ${cityData.city}, ${cityData.state} ${cityData.zip}`,
                zipCode: cityData.zip,
                weight: Math.floor(Math.random() * 50) + 1,
                volume: Math.floor(Math.random() * 100) + 10,
                resolvedAt: new Date().toISOString(),
                route: hasRoute ? {
                    zip: cityData.zip,
                    metroArea: cityData.city,
                    state: cityData.state,
                    destinationZone: `ZONE-${routeIndex + 1}`,
                    routeConfiguration: routes[routeIndex],
                    route2Configuration: '',
                } : undefined,
            };

            testOrders.push(order);
        }

        onAddTestData(testOrders);
    };

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                        <Layers className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Route Stack Manager</h1>
                        <div className="text-slate-500 text-sm mt-1">
                            <span className="text-white font-black">{stacks.reduce((acc, s) => acc + s.orders.length, 0) + exceptionPool.length}</span> orders •
                            <span className="text-sky-400 font-black ml-2">{stacks.length}</span> stacks •
                            <span className="text-emerald-400 font-black ml-2">{fullStackCount}</span> full •
                            <span className="text-amber-400 font-black ml-2">{notFullStackCount}</span> partial •
                            <span className="text-red-400 font-black ml-2">{exceptionPool.length}</span> exceptions
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {false && onAddTestData && (
                        <button
                            onClick={handleGenerateTestData}
                            className="bg-purple-500 hover:bg-purple-400 p-3 px-5 rounded-xl border border-purple-400/50 flex items-center gap-2 transition-colors shadow-lg shadow-purple-500/20 font-bold text-white"
                        >
                            <Database className="w-4 h-4" />
                            Generate Test Data
                        </button>
                    )}
                    <button
                        onClick={() => setShowSettingsModal(true)}
                        className="bg-slate-800 p-3 px-5 rounded-xl border border-white/5 flex items-center gap-2 hover:bg-slate-700 transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                </div>
            </header>

            {/* Search Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-500" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search order ID..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 text-sm"
                />
                {searchQuery && (
                    <button onClick={clearSearch} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="w-4 h-4 text-slate-500" />
                    </button>
                )}
                <button
                    onClick={handleSearch}
                    className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                >
                    Search
                </button>
            </div>

            {/* Search Result */}
            {searchResult && (
                <div className={`p-4 rounded-2xl border ${searchResult.found ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    {searchResult.found ? (
                        searchResult.isException ? (
                            <span className="text-emerald-400 font-bold">
                                ✓ Found in <span className="text-red-400">Exception Pool</span>
                            </span>
                        ) : (
                            <span className="text-emerald-400 font-bold">
                                ✓ Found in stack <span className="text-sky-400">{searchResult.stackName}</span>
                            </span>
                        )
                    ) : (
                        <span className="text-red-400 font-bold">✗ Order not found in any stack or exception pool</span>
                    )}
                </div>
            )}

            {/* Settings Modal */}
            {showSettingsModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="glass-panel p-6 rounded-3xl border border-white/10 w-full max-w-lg mx-4 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold">Stack Settings</h2>
                            </div>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <CapacityRuleEditor
                            config={capacityConfig}
                            onChange={handleCapacityConfigChange}
                        />

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Exception Pool Section */}
            <ExceptionPool orders={exceptionPool} onClick={handleExceptionClick} onReasonClick={handleReasonClick} />

            {/* Route Stacks Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-400 uppercase tracking-widest">
                        Active Route Stacks
                    </h2>
                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-500" />
                        <button
                            onClick={() => setFilterMode('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${filterMode === 'all'
                                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            All ({stacks.length})
                        </button>
                        <button
                            onClick={() => setFilterMode('full')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${filterMode === 'full'
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Full ({fullStackCount})
                        </button>
                        <button
                            onClick={() => setFilterMode('notFull')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${filterMode === 'notFull'
                                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Partial ({notFullStackCount})
                        </button>
                    </div>
                </div>
                {filteredStacks.length === 0 ? (
                    <div className="glass-panel p-20 rounded-3xl border border-white/10 flex flex-col items-center text-slate-700 opacity-30">
                        <Layers className="w-20 h-20 mb-4" />
                        <p className="text-xl font-black uppercase tracking-widest">No Route Stacks</p>
                        <p className="text-sm uppercase tracking-wider mt-2">{stacks.length > 0 ? 'No stacks match filter' : 'Scan orders to populate stacks'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredStacks.map((stack, idx) => (
                            <RouteStackCard
                                key={stack.displayName}
                                stack={stack}
                                onClick={() => handleStackClick(stack)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {selectedStack && (
                <OrderDetailModal
                    isOpen={true}
                    onClose={handleCloseModal}
                    title={selectedStack.title}
                    orders={selectedStack.orders}
                />
            )}
        </div>
    );
};

export default RouteStackManager;
