import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Settings, Layers, Upload, Download, Archive, RotateCcw, RotateCw } from 'lucide-react';
import { RouteStack, ResolvedRouteInfo, StackCapacityConfig, DEFAULT_CAPACITY_CONFIG, ApiSettings, StackStatus, StackType } from '../types';
import RouteStackCard from './RouteStackCard';
import MergedStackCard from './MergedStackCard';
import ExceptionPool from './ExceptionPool';
import OrderDetailModal from './OrderDetailModal';
import CapacityRuleEditor from './CapacityRuleEditor';
import SpilloverModal from './SpilloverModal';
import { stackMergeService, historyService } from '../services/StackMergeService';
import { stackExportService } from '../services/StackExportService';

interface RouteStackManagerProps {
    history: ResolvedRouteInfo[];
    apiSettings: ApiSettings;
    onSettingsChange: (settings: ApiSettings) => void;
    onAddTestData?: (testOrders: ResolvedRouteInfo[]) => void;
}

type FilterMode = 'all' | 'full' | 'notFull' | 'overflow' | 'merged';

interface StackDefinition {
    id: string;
    type: StackType;
    status: StackStatus;
    routes: string[];
    mergeInfo?: RouteStack['mergeInfo'];
    isOverflow?: boolean;
    overflowCount?: number;
    importedAt?: string;
    sourceNote?: string;
    manualOrders?: ResolvedRouteInfo[];
}

const RouteStackManager: React.FC<RouteStackManagerProps> = ({
    history,
    apiSettings,
    onSettingsChange,
    onAddTestData
}) => {
    // --- State ---
    const [stackDefs, setStackDefs] = useState<StackDefinition[]>([]);
    const [selectedStackIds, setSelectedStackIds] = useState<Set<string>>(new Set());
    const [selectedDetailStack, setSelectedDetailStack] = useState<{ title: string; orders: ResolvedRouteInfo[]; mergeInfo?: { components: any[] } } | null>(null);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [spilloverStack, setSpilloverStack] = useState<RouteStack | null>(null);
    const [filterMode, setFilterMode] = useState<FilterMode>('all');

    // Ref for file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initializer used to setup history
    useEffect(() => {
        historyService.initialize([]);
    }, []);

    // Capacity Config
    const capacityConfig = apiSettings.stackCapacityConfig || DEFAULT_CAPACITY_CONFIG;
    const countRule = capacityConfig.rules.find(r => r.type === 'count');
    const capacity = countRule?.value || 40;

    // --- Synchronization Logic (History -> Stacks) ---
    const { renderableStacks, exceptionPool } = useMemo(() => {
        const resultStacks: RouteStack[] = [];
        const routeOrdersMap = new Map<string, ResolvedRouteInfo[]>();
        const exceptions: ResolvedRouteInfo[] = [];
        const processedOrderIds = new Set<string>();

        history.forEach(order => {
            if (processedOrderIds.has(order.orderId)) return;
            processedOrderIds.add(order.orderId);

            const route = order.route?.routeConfiguration;
            if (route) {
                if (!routeOrdersMap.has(route)) routeOrdersMap.set(route, []);
                routeOrdersMap.get(route)!.push(order);
            } else {
                let reason = 'Unknown';
                if (!order.zipCode) reason = 'No zip code';
                else if (!order.address) reason = 'No address';
                else reason = `No route for zip: ${order.zipCode}`;
                exceptions.push({ ...order, exceptionReason: reason });
            }
        });

        const handledRoutes = new Set<string>();

        const tempStacks: RouteStack[] = stackDefs.map(def => {
            let stackOrders: ResolvedRouteInfo[] = [];

            if (def.manualOrders) {
                stackOrders = [...def.manualOrders];
            }

            def.routes.forEach(route => {
                handledRoutes.add(route);
                const liveOrders = routeOrdersMap.get(route) || [];
                const existingIds = new Set(stackOrders.map(o => o.orderId));
                liveOrders.forEach(o => {
                    if (!existingIds.has(o.orderId)) {
                        stackOrders.push(o);
                    }
                });
            });

            // For merged stacks, mark component routes as handled so originals don't show
            if (def.type === 'merged' && def.mergeInfo?.components) {
                def.mergeInfo.components.forEach(comp => {
                    handledRoutes.add(comp.route);
                });
            }

            // Derive route display name - for merged stacks use mergeInfo
            let routeDisplayName = def.routes.join(' & ');
            if (def.type === 'merged' && def.mergeInfo?.components) {
                routeDisplayName = def.mergeInfo.components.map(c => c.route).join(' & ');
            }

            return {
                id: def.id,
                route: routeDisplayName || 'Merged Pool',
                stackNumber: 1,
                capacity: capacity,
                orders: stackOrders,
                status: def.status,
                type: def.type,
                mergeInfo: def.mergeInfo,
                isOverflow: def.isOverflow,
                overflowCount: def.overflowCount || Math.max(0, stackOrders.length - capacity),
                overflowFromStackId: undefined,
                importedAt: def.importedAt,
                sourceNote: def.sourceNote,
                isFull: stackOrders.length >= capacity
            };
        });

        const newImplicitStacks: RouteStack[] = [];
        routeOrdersMap.forEach((orders, route) => {
            if (!handledRoutes.has(route)) {
                const stackCount = Math.ceil(orders.length / capacity);
                for (let i = 0; i < stackCount; i++) {
                    const stackSlice = orders.slice(i * capacity, (i + 1) * capacity);
                    const implicitId = `IMPLICIT-${route}-${i + 1}`;
                    newImplicitStacks.push({
                        id: implicitId,
                        route: route,
                        stackNumber: i + 1,
                        capacity: capacity,
                        orders: stackSlice,
                        status: 'open',
                        type: 'normal',
                        isOverflow: false,
                        overflowCount: 0,
                        isFull: stackSlice.length >= capacity
                    });
                }
            }
        });

        resultStacks.push(...tempStacks, ...newImplicitStacks);

        return {
            renderableStacks: resultStacks.sort((a, b) => a.route.localeCompare(b.route)),
            exceptionPool: exceptions
        };

    }, [history, stackDefs, capacity]);

    // --- Interaction Handlers ---

    const handleStackClick = (stack: RouteStack) => {
        if (stack.type === 'merged' || stack.isOverflow) {
            setSelectedDetailStack({ title: stack.route, orders: stack.orders, mergeInfo: stack.mergeInfo });
            return;
        }

        const newSet = new Set(selectedStackIds);
        if (newSet.has(stack.id)) {
            newSet.delete(stack.id);
        } else {
            if (newSet.size < 2) {
                newSet.add(stack.id);
            }
        }
        setSelectedStackIds(newSet);
    };

    const handleMergeSelected = () => {
        if (selectedStackIds.size < 2) return;
        const ids = Array.from(selectedStackIds);
        const s1 = renderableStacks.find(s => s.id === ids[0]);
        const s2 = renderableStacks.find(s => s.id === ids[1]);
        if (!s1 || !s2) return;

        historyService.pushState(stackDefs);

        // Snapshot orders at merge time
        const mergedOrders = [...s1.orders, ...s2.orders];

        const newDef: StackDefinition = {
            id: `MERGED-${Date.now()}`,
            type: 'merged',
            status: 'active',
            routes: [],
            manualOrders: mergedOrders,
            mergeInfo: {
                primaryStackId: s1.id,
                components: [
                    { stackId: s1.id, route: s1.route, stackNumber: s1.stackNumber, orders: s1.orders, overflowCount: s1.overflowCount },
                    { stackId: s2.id, route: s2.route, stackNumber: s2.stackNumber, orders: s2.orders, overflowCount: s2.overflowCount }
                ],
                mergedAt: new Date().toISOString()
            }
        };

        setStackDefs(prev => [...prev.filter(d => d.id !== s1.id && d.id !== s2.id), newDef]);
        setSelectedStackIds(new Set());
    };

    const handleSplitStack = (stack: RouteStack) => {
        historyService.pushState(stackDefs);
        setStackDefs(prev => prev.filter(d => d.id !== stack.id));
    };

    const handleResolveOverflow = (stack: RouteStack) => {
        setSpilloverStack(stack);
    };

    const handleDeleteStack = (stack: RouteStack) => {
        historyService.pushState(stackDefs);
        setStackDefs(prev => prev.filter(d => d.id !== stack.id));
        setSelectedStackIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(stack.id);
            return newSet;
        });
    };

    const handleConfirmSpillover = (sourceStackId: string, orderIds: string[]) => {
        const sourceStack = renderableStacks.find(s => s.id === sourceStackId);
        if (!sourceStack) return;

        historyService.pushState(stackDefs);

        const movedAt = new Date().toISOString();

        // Build a route-to-stackNumber lookup from mergeInfo for merged stacks
        const routeStackLookup = new Map<string, number>();
        if (sourceStack.type === 'merged' && sourceStack.mergeInfo?.components) {
            sourceStack.mergeInfo.components.forEach(comp => {
                routeStackLookup.set(comp.route, comp.stackNumber);
            });
        }

        // Stamp each order with its ORIGINAL route and stack number
        const overflowOrders = sourceStack.orders
            .filter(o => orderIds.includes(o.orderId))
            .map(o => {
                const orderRoute = o.route?.routeConfiguration || sourceStack.route;
                // Look up stack number from mergeInfo, fallback to sourceStack.stackNumber
                const stackNum = routeStackLookup.get(orderRoute) || sourceStack.stackNumber;

                return {
                    ...o,
                    overflowSource: {
                        route: orderRoute,
                        stackNumber: stackNum,
                        movedAt
                    }
                };
            });

        const newOverflowDef: StackDefinition = {
            id: `OVERFLOW-${Date.now()}`,
            type: 'overflow',
            status: 'open',
            routes: [],
            manualOrders: overflowOrders,
            isOverflow: true,
            importedAt: movedAt,
            sourceNote: `Overflow from ${sourceStack.route}`
        };

        // Update source stack to REMOVE the moved orders, and add new overflow stack
        setStackDefs(prev => {
            const movedOrderIds = new Set(orderIds);

            return prev.map(def => {
                // Find the source stack and remove the moved orders from it
                if (def.id === sourceStackId && def.manualOrders) {
                    return {
                        ...def,
                        manualOrders: def.manualOrders.filter(o => !movedOrderIds.has(o.orderId))
                    };
                }
                return def;
            }).concat(newOverflowDef);
        });
        setSpilloverStack(null);
    };

    const handleImport = async (file: File) => {
        const text = await file.text();
        try {
            historyService.pushState(stackDefs);

            const importedStacks = stackExportService.importStacks(text);
            const newDefs: StackDefinition[] = importedStacks.map(s => ({
                id: s.id,
                type: s.type,
                status: s.status,
                routes: [s.route],
                manualOrders: s.orders,
                isOverflow: s.isOverflow,
                overflowCount: s.overflowCount,
                importedAt: s.importedAt,
                sourceNote: s.sourceNote
            }));

            setStackDefs(prev => [...prev, ...newDefs]);
        } catch (e) {
            console.error(e);
            alert('Import failed');
        }
    };

    const onUndo = () => {
        const prev = historyService.undo();
        if (prev) setStackDefs(prev);
    };

    const onRedo = () => {
        const next = historyService.redo();
        if (next) setStackDefs(next);
    };

    const handleExportAll = () => {
        const json = stackExportService.exportStacks(renderableStacks, { mode: 'all' });
        downloadJson(json, 'stacks_all.json');
    };

    const handleExportOverflow = () => {
        const json = stackExportService.exportStacks(renderableStacks, { mode: 'overflow' });
        downloadJson(json, 'stacks_overflow.json');
    };

    const downloadJson = (json: string, filename: string) => {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const displayedStacks = useMemo(() => {
        let result = renderableStacks;
        if (filterMode === 'full') result = result.filter(s => s.isFull);
        if (filterMode === 'notFull') result = result.filter(s => !s.isFull);
        if (filterMode === 'overflow') result = result.filter(s => s.isOverflow);
        return result;
    }, [renderableStacks, filterMode]);


    return (
        <div className="h-full flex flex-col space-y-6 p-6 animate-in fade-in duration-500">
            {/* Consolidated Header with Import/Export and Settings */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                {/* Left: Title and Stats */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <Layers className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Route Stacks</h2>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                            {renderableStacks.length} Active Stacks
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            {exceptionPool.length} Exceptions
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 flex-wrap justify-end">
                    {/* Merge Button (when 2 selected) */}
                    {selectedStackIds.size >= 2 && (
                        <button
                            onClick={handleMergeSelected}
                            className="animate-in slide-in-from-bottom-4 fade-in px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/30 flex items-center gap-2"
                        >
                            <Layers className="w-4 h-4" />
                            MERGE ({selectedStackIds.size})
                        </button>
                    )}

                    {/* Import */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImport(file);
                            if (e.target) e.target.value = '';
                        }}
                        className="hidden"
                        accept=".json"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors text-sm"
                    >
                        <Upload className="w-4 h-4" />
                        Import
                    </button>

                    {/* Export All */}
                    <button
                        onClick={handleExportAll}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-colors border border-white/5 text-sm"
                    >
                        <Download className="w-4 h-4" />
                        Export All
                    </button>

                    {/* Export Overflow */}
                    <button
                        onClick={handleExportOverflow}
                        className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl font-bold transition-colors border border-amber-500/20 text-sm"
                    >
                        <Archive className="w-4 h-4" />
                        Export Overflow
                    </button>

                    {/* Undo/Redo */}
                    <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/5">
                        <button
                            onClick={onUndo}
                            disabled={!historyService.canUndo()}
                            className={`p-2 rounded-lg transition-colors ${historyService.canUndo() ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-700 cursor-not-allowed'}`}
                            title="Undo"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onRedo}
                            disabled={!historyService.canRedo()}
                            className={`p-2 rounded-lg transition-colors ${historyService.canRedo() ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-700 cursor-not-allowed'}`}
                            title="Redo"
                        >
                            <RotateCw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Settings (Capacity Rules) */}
                    <button
                        onClick={() => setShowSettingsModal(true)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors border border-white/5"
                        title="Stack Capacity Rules"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {exceptionPool.length > 0 && (
                    <div className="md:col-span-2 xl:col-span-1">
                        <ExceptionPool
                            exceptions={exceptionPool}
                            onResolve={() => { }}
                            initialExpanded={true}
                        />
                    </div>
                )}

                {displayedStacks.map(stack => (
                    stack.type === 'merged' ? (
                        <MergedStackCard
                            key={stack.id}
                            stack={stack}
                            onClick={() => setSelectedDetailStack({ title: stack.route, orders: stack.orders, mergeInfo: stack.mergeInfo })}
                            onSplit={() => handleSplitStack(stack)}
                            onResolveOverflow={() => handleResolveOverflow(stack)}
                            onDelete={() => handleDeleteStack(stack)}
                            selected={selectedStackIds.has(stack.id)}
                        />
                    ) : (
                        <RouteStackCard
                            key={stack.id}
                            stack={stack}
                            onClick={() => handleStackClick(stack)}
                            onDelete={() => handleDeleteStack(stack)}
                            selected={selectedStackIds.has(stack.id)}
                        />
                    )
                ))}
            </div>

            {/* Modals */}
            {selectedDetailStack && (
                <OrderDetailModal
                    isOpen={!!selectedDetailStack}
                    onClose={() => setSelectedDetailStack(null)}
                    title={selectedDetailStack.title}
                    orders={selectedDetailStack.orders}
                    mergeInfo={selectedDetailStack.mergeInfo}
                />
            )}

            <CapacityRuleEditor
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
                config={capacityConfig}
                onSave={(cfg) => {
                    onSettingsChange({ ...apiSettings, stackCapacityConfig: cfg });
                    setShowSettingsModal(false);
                }}
            />

            <SpilloverModal
                isOpen={!!spilloverStack}
                onClose={() => setSpilloverStack(null)}
                stack={spilloverStack}
                onConfirmSpillover={handleConfirmSpillover}
            />
        </div>
    );
};

export default RouteStackManager;
