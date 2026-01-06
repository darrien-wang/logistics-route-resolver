import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Settings, Layers, Upload, Download, RotateCcw, RotateCw } from 'lucide-react';
import { RouteStack, ResolvedRouteInfo, StackCapacityConfig, DEFAULT_CAPACITY_CONFIG, ApiSettings, StackStatus, StackType } from '../types';
import RouteStackCard from './RouteStackCard';
import MergedStackCard from './MergedStackCard';
import ExceptionPool from './ExceptionPool';
import OrderDetailModal from './OrderDetailModal';
import CapacityRuleEditor from './CapacityRuleEditor';
import SpilloverModal from './SpilloverModal';
import { stackMergeService, historyService } from '../services/StackMergeService';
import { stackExportService } from '../services/StackExportService';
import { ExcelExportService } from '../services/ExportService';
import ExportConfigModal from './ExportConfigModal';

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
    const [showExportModal, setShowExportModal] = useState(false);
    const [spilloverStack, setSpilloverStack] = useState<RouteStack | null>(null);
    const [filterMode, setFilterMode] = useState<FilterMode>('all');

    // Ref for file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initializer used to setup history
    useEffect(() => {
        historyService.initialize([]);
    }, []);

    // Sync stackDefs changes to historyService currentState (for redo to work)
    useEffect(() => {
        // Update currentState whenever stackDefs changes (but don't push to history)
        // This ensures redo works correctly after operations like spillover
        if (stackDefs.length > 0 || historyService['currentState'] !== null) {
            historyService['currentState'] = JSON.parse(JSON.stringify(stackDefs));
        }
    }, [stackDefs]);

    // Capacity Config
    const capacityConfig = apiSettings.stackCapacityConfig || DEFAULT_CAPACITY_CONFIG;
    const countRule = capacityConfig.rules.find(r => r.type === 'count');
    const capacity = countRule?.value || 40;

    // --- Synchronization Logic (History -> Stacks) ---
    const { renderableStacks, exceptionPool } = useMemo(() => {
        const resultStacks: RouteStack[] = [];
        const routeOrdersMap = new Map<string, ResolvedRouteInfo[]>();
        const allOrdersMap = new Map<string, ResolvedRouteInfo>(); // ID lookup for rehydration
        const exceptions: ResolvedRouteInfo[] = [];
        const processedOrderIds = new Set<string>();

        history.forEach(order => {
            if (processedOrderIds.has(order.orderId)) return;
            processedOrderIds.add(order.orderId);
            allOrdersMap.set(order.orderId, order);

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

        // Set of Order IDs that are already assigned to an Explicit (Manual/Merged/Overflow) stack
        const claimedOrderIds = new Set<string>();

        // 1. Process Explicit Stacks (Defined in stackDefs)
        const tempStacks: RouteStack[] = stackDefs.map(def => {
            let stackOrders: ResolvedRouteInfo[] = [];

            if (def.manualOrders) {
                // Rehydrate orders from history to ensure we have the latest data
                stackOrders = def.manualOrders.map(mo => {
                    return allOrdersMap.get(mo.orderId) || mo; // Use live data if available, else keep manual record
                });
            }

            // Mark these orders as claimed so they don't form Implicit stacks
            stackOrders.forEach(o => claimedOrderIds.add(o.orderId));

            // Derive route display name - for merged stacks use mergeInfo
            let routeDisplayName = def.routes.join(' & ');
            if (def.type === 'merged' && def.mergeInfo?.components) {
                routeDisplayName = def.mergeInfo.components.map(c => c.route).join(' & ');
            }

            // Dynamic fields calculation
            let activeValue = stackOrders.length;
            let activeCapacity = capacity;
            let activeUnit = 'pcs';
            let activeMeasure: 'count' | 'weight' | 'volume' = 'count';

            // Find primary rule to display
            if (capacityConfig.rules && capacityConfig.rules.length > 0) {
                const primaryRule = capacityConfig.rules[0];
                const configRules = capacityConfig.rules;
                const displayRule = configRules.find(r => r.type !== 'count') || primaryRule;

                switch (displayRule.type) {
                    case 'weight':
                        activeValue = Math.round(stackOrders.reduce((sum, o) => sum + (o.weight || 0), 0) * 100) / 100;
                        activeCapacity = displayRule.value;
                        activeUnit = 'lb';
                        activeMeasure = 'weight';
                        break;
                    case 'volume':
                        activeValue = Math.round(stackOrders.reduce((sum, o) => sum + (o.volume || 0), 0) * 100) / 100;
                        activeCapacity = displayRule.value;
                        activeUnit = 'ft³';
                        activeMeasure = 'volume';
                        break;
                    case 'count':
                    default:
                        activeValue = stackOrders.length;
                        activeCapacity = displayRule.value;
                        activeUnit = 'pcs';
                        activeMeasure = 'count';
                        break;
                }
            }

            const isDynamicOverflow = activeValue > activeCapacity;
            const effectiveIsOverflow = def.isOverflow || isDynamicOverflow;
            const effectiveOverflowCount = def.overflowCount || (isDynamicOverflow ? Math.round((activeValue - activeCapacity) * 100) / 100 : Math.max(0, stackOrders.length - capacity));

            return {
                id: def.id,
                route: routeDisplayName || 'Merged Pool',
                stackNumber: 1, // Explicit stacks default to 1 as they are unique containers
                capacity: capacity,
                orders: stackOrders,
                status: def.status,
                type: def.type,
                mergeInfo: def.mergeInfo,
                isOverflow: effectiveIsOverflow,
                overflowCount: effectiveOverflowCount,
                overflowFromStackId: undefined,
                importedAt: def.importedAt,
                sourceNote: def.sourceNote,
                isFull: activeValue >= activeCapacity,
                activeValue,
                activeCapacity,
                activeUnit,
                activeMeasure
            };
        });

        // 2. Create IMPLICIT stacks for any orders NOT CLAIMED by explicit stacks
        const configRules = capacityConfig.rules || [];
        const splitRule = configRules.find(r => r.enabled !== false && r.type !== 'count') || configRules[0] || { type: 'count', value: capacity };
        const newImplicitStacks: RouteStack[] = [];

        const createImplicitStack = (route: string, stackNum: number, orders: ResolvedRouteInfo[]) => {
            const implicitId = `IMPLICIT-${route}-${stackNum}`;

            // Re-calculate display metrics
            let activeValue = orders.length;
            let activeCapacity = capacity;
            let activeUnit = 'pcs';
            let activeMeasure: 'count' | 'weight' | 'volume' = 'count';

            const displayRule = configRules.find(r => r.type !== 'count') || configRules[0] || { type: 'count', value: capacity };

            switch (displayRule.type) {
                case 'weight':
                    activeValue = Math.round(orders.reduce((sum, o) => sum + (o.weight || 0), 0) * 100) / 100;
                    activeCapacity = displayRule.value;
                    activeUnit = 'lb';
                    activeMeasure = 'weight';
                    break;
                case 'volume':
                    activeValue = Math.round(orders.reduce((sum, o) => sum + (o.volume || 0), 0) * 100) / 100;
                    activeCapacity = displayRule.value;
                    activeUnit = 'ft³';
                    activeMeasure = 'volume';
                    break;
                case 'count':
                default:
                    activeValue = orders.length;
                    activeCapacity = displayRule.value;
                    activeUnit = 'pcs';
                    activeMeasure = 'count';
                    break;
            }

            newImplicitStacks.push({
                id: implicitId,
                route: route,
                stackNumber: stackNum,
                capacity: capacity,
                orders: orders,
                status: 'open',
                type: 'normal',
                isOverflow: false,
                overflowCount: 0,
                isFull: activeValue >= activeCapacity,
                activeValue,
                activeCapacity,
                activeUnit,
                activeMeasure
            });
        };

        routeOrdersMap.forEach((orders, route) => {
            // Filter out orders that are already in explicit stacks
            const unclaimedOrders = orders.filter(o => !claimedOrderIds.has(o.orderId));

            if (unclaimedOrders.length > 0) {
                let currentStackOrders: ResolvedRouteInfo[] = [];
                let currentStackNum = 1;
                let currentStackValue = 0;

                unclaimedOrders.forEach(order => {
                    let orderValue = 1;
                    if (splitRule.type === 'weight') orderValue = order.weight || 0;
                    else if (splitRule.type === 'volume') orderValue = order.volume || 0;

                    // Check if adding this order would exceed capacity
                    if (currentStackOrders.length > 0 && (currentStackValue + orderValue > splitRule.value)) {
                        createImplicitStack(route, currentStackNum, currentStackOrders);
                        currentStackNum++;
                        currentStackOrders = [];
                        currentStackValue = 0;
                    }

                    currentStackOrders.push(order);
                    currentStackValue += orderValue;
                });

                if (currentStackOrders.length > 0) {
                    createImplicitStack(route, currentStackNum, currentStackOrders);
                }
            }
        });

        resultStacks.push(...tempStacks, ...newImplicitStacks);

        return {
            renderableStacks: resultStacks.sort((a, b) => a.route.localeCompare(b.route)),
            exceptionPool: exceptions
        };

    }, [history, stackDefs, capacity, capacityConfig]);

    // --- Interaction Handlers ---

    const handleStackClick = (stack: RouteStack) => {
        // Left click: toggle selection for all stack types
        const newSet = new Set(selectedStackIds);
        if (newSet.has(stack.id)) {
            newSet.delete(stack.id);
        } else {
            newSet.add(stack.id);
        }
        setSelectedStackIds(newSet);
    };

    const handleStackRightClick = (stack: RouteStack, e: React.MouseEvent) => {
        // Right click: show details modal
        e.preventDefault();
        setSelectedDetailStack({ title: stack.route, orders: stack.orders, mergeInfo: stack.mergeInfo });
    };

    const handleMergeSelected = () => {
        if (selectedStackIds.size < 2) return;

        const stacksToMerge = renderableStacks.filter(s => selectedStackIds.has(s.id));
        // Sort by stack number purely for deterministic component order
        stacksToMerge.sort((a, b) => a.stackNumber - b.stackNumber);

        if (stacksToMerge.length < 2) return;

        historyService.pushState(stackDefs);

        try {
            const mergedStack = stackMergeService.mergeMultipleStacks(stacksToMerge);
            const sourceIds = new Set(stacksToMerge.map(s => s.id));

            const newDef: StackDefinition = {
                id: mergedStack.id,
                type: mergedStack.type,
                status: mergedStack.status,
                routes: stacksToMerge.map(s => s.route),
                manualOrders: mergedStack.orders,
                mergeInfo: mergedStack.mergeInfo,
                isOverflow: mergedStack.isOverflow,
                overflowCount: mergedStack.overflowCount,
                importedAt: mergedStack.importedAt,
                sourceNote: mergedStack.sourceNote
            };

            setStackDefs(prev => [...prev.filter(d => !sourceIds.has(d.id)), newDef]);
            setSelectedStackIds(new Set());
        } catch (e) {
            console.error(e);
            alert('Merge failed: ' + (e as Error).message);
        }
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

        // Check if an overflow stack already exists FOR THIS SPECIFIC SOURCE STACK
        // We match by the source stack ID (stored in the overflow stack's ID pattern)
        const existingOverflowStackIndex = stackDefs.findIndex(
            s => s.type === 'overflow' && s.id.startsWith(`OVERFLOW-${sourceStackId}-`)
        );

        // Generate a short ID for display (last 4 chars of timestamp or random part)
        const shortId = sourceStackId.includes('-') ? sourceStackId.split('-').pop()?.slice(-4) : sourceStackId.slice(-4);

        if (existingOverflowStackIndex >= 0) {
            // MERGE into existing overflow stack for this source
            setStackDefs(prev => {
                const movedOrderIds = new Set(orderIds);

                // 1. Remove from source
                const nextDefs = prev.map(def => {
                    if (def.id === sourceStackId && def.manualOrders) {
                        const remainingOrders = def.manualOrders.filter(o => !movedOrderIds.has(o.orderId));
                        const newOverflowCount = Math.max(0, remainingOrders.length - capacity);
                        return {
                            ...def,
                            manualOrders: remainingOrders,
                            overflowCount: newOverflowCount
                        };
                    }
                    return def;
                });

                // 2. Add to existing overflow stack for this source
                return nextDefs.map((def, idx) => {
                    if (idx === existingOverflowStackIndex && def.manualOrders) {
                        return {
                            ...def,
                            manualOrders: [...def.manualOrders, ...overflowOrders],
                        };
                    }
                    return def;
                });
            });

        } else {
            // CREATE NEW overflow stack for this specific source
            // Build a meaningful sourceNote with route + original stack numbers
            let sourceLabel = sourceStack.route;
            if (sourceStack.type === 'merged' && sourceStack.mergeInfo?.components) {
                // Show each component with its original stack number: "SD-002 #1 & SD-003 #2"
                sourceLabel = sourceStack.mergeInfo.components
                    .map(c => `${c.route} #${c.stackNumber}`)
                    .join(' & ');
            }

            const newOverflowDef: StackDefinition = {
                id: `OVERFLOW-${sourceStackId}-${Date.now()}`,
                type: 'overflow',
                status: 'open',
                routes: [],
                manualOrders: overflowOrders,
                isOverflow: true,
                importedAt: movedAt,
                sourceNote: sourceLabel  // e.g., "SD-002 #1 & SD-003 #2"
            };

            // Update source stack to REMOVE the moved orders, and append new overflow stack
            setStackDefs(prev => {
                const movedOrderIds = new Set(orderIds);

                return prev.map(def => {
                    if (def.id === sourceStackId && def.manualOrders) {
                        const remainingOrders = def.manualOrders.filter(o => !movedOrderIds.has(o.orderId));
                        const newOverflowCount = Math.max(0, remainingOrders.length - capacity);

                        return {
                            ...def,
                            manualOrders: remainingOrders,
                            overflowCount: newOverflowCount
                        };
                    }
                    return def;
                }).concat(newOverflowDef);
            });
        }
        setSpilloverStack(null);
    };


    const handleImport = async (file: File) => {
        try {
            historyService.pushState(stackDefs);

            let importedStacks: RouteStack[];

            // Detect file type and use appropriate import method
            if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                // Excel import
                importedStacks = await stackExportService.importStacksFromExcel(file);
            } else {
                // JSON import (legacy)
                const text = await file.text();
                importedStacks = stackExportService.importStacks(text);
            }

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
            alert(`Import failed: ${(e as Error).message}`);
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



    const handleBatchExport = () => {
        // Show export config modal (handles both selected and all stacks)
        setShowExportModal(true);
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

                    {/* Export Button (always visible) */}
                    <button
                        onClick={handleBatchExport}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/30 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        {selectedStackIds.size > 0 ? `EXPORT (${selectedStackIds.size})` : 'EXPORT ALL'}
                    </button>

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
                        accept=".json,.xlsx,.xls"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors text-sm"
                    >
                        <Upload className="w-4 h-4" />
                        IMPORT
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
                            onClick={() => handleStackClick(stack)}
                            onContextMenu={(e) => handleStackRightClick(stack, e)}
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
                            onContextMenu={(e) => handleStackRightClick(stack, e)}
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

            <ExportConfigModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                selectedStacks={renderableStacks.filter(s => selectedStackIds.has(s.id))}
                allStacks={renderableStacks}
            />
        </div>
    );
};

export default RouteStackManager;
