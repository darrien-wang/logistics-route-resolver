import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Settings, Layers, Upload, Download, RotateCcw, RotateCw, Search, X, Filter, ChevronDown } from 'lucide-react';
import { RouteStack, ResolvedRouteInfo, StackCapacityConfig, DEFAULT_CAPACITY_CONFIG, ApiSettings, StackStatus, StackType, StackDefinition } from '../types';
import RouteStackCard from './RouteStackCard';
import MergedStackCard from './MergedStackCard';
import ExceptionPool from './ExceptionPool';
import OrderDetailModal from './OrderDetailModal';
import CapacityRuleEditor from './CapacityRuleEditor';
import SpilloverModal from './SpilloverModal';
import { stackMergeService, historyService } from '../services/StackMergeService';
import { stackExportService } from '../services/StackExportService';
import { routeStackService } from '../services/RouteStackService';
import { ExcelExportService } from '../services/ExportService';
import ExportConfigModal from './ExportConfigModal';
import StackSelectorModal from './StackSelectorModal';
import { useI18n } from '../contexts/I18nContext';

interface RouteStackManagerProps {
    history: ResolvedRouteInfo[];
    apiSettings: ApiSettings;
    onSettingsChange: (settings: ApiSettings) => void;
    onAddTestData?: (testOrders: ResolvedRouteInfo[]) => void;
    onImportOrders?: (orders: ResolvedRouteInfo[]) => void;
    stackDefs: StackDefinition[];
    setStackDefs: React.Dispatch<React.SetStateAction<StackDefinition[]>>;
}

type FilterMode = 'all' | 'full' | 'notFull' | 'overflow' | 'merged';

const RouteStackManager: React.FC<RouteStackManagerProps> = ({
    history,
    apiSettings,
    onSettingsChange,
    onAddTestData,
    onImportOrders,
    stackDefs,
    setStackDefs
}) => {
    // --- State ---
    // stackDefs is now managed by parent (App.tsx / Persistence Hook)
    // const [stackDefs, setStackDefs] = useState<StackDefinition[]>([]);

    const [selectedStackIds, setSelectedStackIds] = useState<Set<string>>(new Set());
    const [selectedDetailStack, setSelectedDetailStack] = useState<{ title: string; orders: ResolvedRouteInfo[]; mergeInfo?: { components: any[] } } | null>(null);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [spilloverStack, setSpilloverStack] = useState<RouteStack | null>(null);
    const [filterMode, setFilterMode] = useState<FilterMode>('all');

    // Batch Order Search
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ orderId: string; stackName: string; stackType: string; found: boolean }[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // Custom Stack / Move Logic
    const [moveTargetModal, setMoveTargetModal] = useState<{ isOpen: boolean; sourceIds: string[] }>({ isOpen: false, sourceIds: [] });

    // Drag and drop state
    const [isDragging, setIsDragging] = useState(false);

    // Filter states
    const [routeFilter, setRouteFilter] = useState<string>('all');
    const [regionFilter, setRegionFilter] = useState<string>('all');
    const [fullFilter, setFullFilter] = useState<'all' | 'full' | 'notFull'>('all');



    // Ref for file input
    const fileInputRef = useRef<HTMLInputElement>(null);
    const placeholderInputRef = useRef<HTMLInputElement>(null);
    const { t } = useI18n();

    // Initializer used to setup history
    useEffect(() => {
        historyService.initialize([]);
    }, []);

    // Sync stackDefs changes to historyService currentState (for redo to work)
    useEffect(() => {
        // Update currentState whenever stackDefs changes (but don't push to history)
        // This ensures redo works correctly after operations like spillover
        if ((stackDefs && stackDefs.length > 0) || historyService['currentState'] !== null) {
            historyService['currentState'] = JSON.parse(JSON.stringify(stackDefs || []));
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
        const tempStacks: RouteStack[] = (stackDefs || []).map(def => {
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
                // VISUAL ACCUMULATION LOGIC:
                // Check if there is an existing ACTIVE explicit stack we can append to
                const explicitStacks = tempStacks
                    .filter(s => s.route === route)
                    .sort((a, b) => a.stackNumber - b.stackNumber);

                let currentStackNum = 1;

                if (explicitStacks.length > 0) {
                    const lastExplicitStack = explicitStacks[explicitStacks.length - 1];
                    currentStackNum = lastExplicitStack.stackNumber + 1; // Default next stack number

                    console.log(`[StackMerge] Unclaimed orders for ${route}: ${unclaimedOrders.length}`, {
                        explicitStackId: lastExplicitStack.id,
                        status: lastExplicitStack.status,
                        isFull: lastExplicitStack.isFull,
                        activeValue: lastExplicitStack.activeValue,
                        orders: lastExplicitStack.orders.length
                    });

                    // Try to merge into the last explicit stack if it's open/active
                    // Relaxed check: Allow 'active' OR 'open' as long as not locked/full
                    if ((lastExplicitStack.status === 'active' || lastExplicitStack.status === 'open') && !lastExplicitStack.isFull) {
                        const remainingCapacity = splitRule.value;
                        let currentVal = 0;

                        // Calculate current value of explicit stack
                        if (splitRule.type === 'weight') {
                            currentVal = lastExplicitStack.orders.reduce((sum, o) => sum + (o.weight || 0), 0);
                        } else if (splitRule.type === 'volume') {
                            currentVal = lastExplicitStack.orders.reduce((sum, o) => sum + (o.volume || 0), 0);
                        } else {
                            currentVal = lastExplicitStack.orders.length;
                        }

                        // Try to fit unclaimed orders
                        const ordersToMerge: ResolvedRouteInfo[] = [];
                        const remainingOrders: ResolvedRouteInfo[] = [];

                        unclaimedOrders.forEach(order => {
                            let orderValue = 1;
                            if (splitRule.type === 'weight') orderValue = order.weight || 0;
                            else if (splitRule.type === 'volume') orderValue = order.volume || 0;

                            if (currentVal + orderValue <= remainingCapacity) {
                                currentVal += orderValue;
                                ordersToMerge.push(order);
                            } else {
                                remainingOrders.push(order);
                            }
                        });

                        // Apply merge
                        if (ordersToMerge.length > 0) {
                            lastExplicitStack.orders.push(...ordersToMerge);

                            // Re-calculate active metrics for the stack
                            if (lastExplicitStack.activeMeasure === 'weight') {
                                lastExplicitStack.activeValue = Math.round(lastExplicitStack.orders.reduce((sum, o) => sum + (o.weight || 0), 0) * 100) / 100;
                            } else if (lastExplicitStack.activeMeasure === 'volume') {
                                lastExplicitStack.activeValue = Math.round(lastExplicitStack.orders.reduce((sum, o) => sum + (o.volume || 0), 0) * 100) / 100;
                            } else {
                                lastExplicitStack.activeValue = lastExplicitStack.orders.length;
                            }

                            // Check if it became full
                            if ((lastExplicitStack.activeValue || 0) >= (lastExplicitStack.activeCapacity || remainingCapacity)) {
                                lastExplicitStack.isFull = true;
                            }
                        }

                        // Continue with remaining orders
                        unclaimedOrders.length = 0; // Clear original array
                        unclaimedOrders.push(...remainingOrders); // Replace with remaining
                    }
                }

                // Create implicit stacks for any remaining orders
                if (unclaimedOrders.length > 0) {
                    let currentStackOrders: ResolvedRouteInfo[] = [];
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
            }
        });

        resultStacks.push(...tempStacks, ...newImplicitStacks);

        return {
            renderableStacks: resultStacks.sort((a, b) => a.route.localeCompare(b.route)),
            exceptionPool: exceptions
        };

    }, [history, stackDefs, capacity, capacityConfig]);

    // Extract unique routes and regions for filter dropdowns
    const { uniqueRoutes, uniqueRegions } = useMemo(() => {
        const routes = new Set<string>();
        const regions = new Set<string>();
        renderableStacks.forEach(stack => {
            if (stack.route) routes.add(stack.route);
            // Extract region from first order's route info if available
            stack.orders.forEach(order => {
                if (order.route?.metroArea) regions.add(order.route.metroArea);
                if (order.route?.state) regions.add(order.route.state);
            });
        });
        return {
            uniqueRoutes: Array.from(routes).sort(),
            uniqueRegions: Array.from(regions).sort()
        };
    }, [renderableStacks]);

    // Apply filters to stacks
    const filteredStacks = useMemo(() => {
        return renderableStacks.filter(stack => {
            // Route filter
            if (routeFilter !== 'all' && stack.route !== routeFilter) return false;

            // Region filter - check if any order has matching metro area or state
            if (regionFilter !== 'all') {
                const hasMatchingRegion = stack.orders.some(order =>
                    order.route?.metroArea === regionFilter || order.route?.state === regionFilter
                );
                if (!hasMatchingRegion) return false;
            }

            // Full status filter
            if (fullFilter === 'full' && !stack.isFull) return false;
            if (fullFilter === 'notFull' && stack.isFull) return false;

            return true;
        });
    }, [renderableStacks, routeFilter, regionFilter, fullFilter]);

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

        // If this is a merged stack, restore the original component stacks
        if (stack.type === 'merged' && stack.mergeInfo?.components) {
            // Recreate stackDefs from the merge components
            const restoredDefs: StackDefinition[] = stack.mergeInfo.components.map(comp => ({
                id: comp.stackId,
                type: 'normal' as StackType,
                status: 'open' as StackStatus,
                routes: [comp.route],
                manualOrders: comp.orders,
                isOverflow: false,
                overflowCount: comp.overflowCount || 0,
            }));

            setStackDefs(prev => [
                ...prev.filter(d => d.id !== stack.id), // Remove the merged stack
                ...restoredDefs // Add back the original component stacks
            ]);

            console.log(`[Split] Restored ${restoredDefs.length} stacks from merged stack ${stack.id}`);
        } else {
            // For non-merged stacks, just remove from stackDefs
            // The orders will remain in history and form implicit stacks
            setStackDefs(prev => prev.filter(d => d.id !== stack.id));
        }
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

            // Build a set of existing order IDs across all current stackDefs to prevent duplicates
            const existingOrderIds = new Set<string>();
            stackDefs.forEach(def => {
                def.manualOrders?.forEach(o => existingOrderIds.add(o.orderId));
            });

            // Build a set of existing stack IDs to prevent duplicate stacks
            const existingStackIds = new Set(stackDefs.map(d => d.id));

            // Filter out stacks that already exist and dedupe orders within new stacks
            const filteredStacks = importedStacks
                .filter(stack => !existingStackIds.has(stack.id))
                .map(stack => ({
                    ...stack,
                    orders: stack.orders.filter(o => !existingOrderIds.has(o.orderId))
                }))
                .filter(stack => stack.orders.length > 0); // Skip empty stacks after deduplication

            // Hydrate RouteStackService with imported orders to ensure accumulation works
            filteredStacks.forEach(stack => {
                stack.orders.forEach(order => {
                    routeStackService.addToStack(
                        stack.route,
                        order.orderId,
                        { weight: order.weight, volume: order.volume }
                    );
                });
            });

            const newDefs: StackDefinition[] = filteredStacks.map(s => ({
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

            if (newDefs.length === 0) {
                alert('No new stacks to import (all stacks/orders already exist)');
                return;
            }

            setStackDefs(prev => [...prev, ...newDefs]);
            console.log(`[Import] Imported ${newDefs.length} stacks with ${newDefs.reduce((sum, d) => sum + (d.manualOrders?.length || 0), 0)} orders`);
        } catch (e) {
            console.error(e);
            alert(`Import failed: ${(e as Error).message}`);
        }
    };

    const handleImportPlaceholders = async (file: File) => {
        try {
            historyService.pushState(stackDefs);

            let importedStacks: RouteStack[];

            if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                importedStacks = await stackExportService.importStacksFromExcel(file);
            } else {
                const text = await file.text();
                importedStacks = stackExportService.importStacks(text);
            }

            // Build a set of existing order IDs across all current stackDefs to prevent duplicates
            const existingOrderIds = new Set<string>();
            stackDefs.forEach(def => {
                def.manualOrders?.forEach(o => existingOrderIds.add(o.orderId));
            });

            // Build a set of existing stack IDs to prevent duplicate stacks
            const existingStackIds = new Set(stackDefs.map(d => d.id));

            // Filter out stacks that already exist and dedupe orders within new stacks
            const filteredStacks = importedStacks
                .filter(stack => !existingStackIds.has(stack.id))
                .map(stack => ({
                    ...stack,
                    orders: stack.orders.filter(o => !existingOrderIds.has(o.orderId))
                }))
                .filter(stack => stack.orders.length > 0);

            // Hydrate RouteStackService with imported orders to ensure accumulation works
            filteredStacks.forEach(stack => {
                stack.orders.forEach(order => {
                    routeStackService.addToStack(
                        stack.route,
                        order.orderId,
                        { weight: order.weight, volume: order.volume }
                    );
                });
            });

            // Extract all orders and mark them as placeholders
            const allPlaceholderOrders: ResolvedRouteInfo[] = [];

            const newDefs: StackDefinition[] = filteredStacks.map(s => {
                const placeholderOrders = s.orders.map(o => ({ ...o, isPlaceholder: true }));
                allPlaceholderOrders.push(...placeholderOrders);

                return {
                    id: s.id,
                    type: s.type,
                    status: s.status,
                    routes: [s.route],
                    manualOrders: placeholderOrders, // Keep structure but with placeholder flag
                    isOverflow: s.isOverflow,
                    overflowCount: s.overflowCount,
                    importedAt: s.importedAt,
                    sourceNote: s.sourceNote
                };
            });

            if (newDefs.length === 0) {
                alert('No new placeholders to import (all stacks/orders already exist)');
                return;
            }

            // 1. Update stack definitions (to preserve Merged/Overflow structure)
            setStackDefs(prev => [...prev, ...newDefs]);

            // 2. Inject into history so they appear in Implicit stacks too AND act as placeholders
            if (onImportOrders) {
                onImportOrders(allPlaceholderOrders);
            }

            console.log(`[Import] Imported ${allPlaceholderOrders.length} placeholders`);

        } catch (e) {
            console.error(e);
            alert(`Placeholder Import failed: ${(e as Error).message}`);
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
        // Export uses filteredStacks so filter results are exported
        const json = stackExportService.exportStacks(filteredStacks, { mode: 'all' });
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

    // --- Stack Manipulation ---

    const handleMoveOrders = (orderIds: string[]) => {
        setMoveTargetModal({ isOpen: true, sourceIds: orderIds });
    };

    const handleConfirmMove = (targetStackId: string | 'NEW_CUSTOM', customName?: string) => {
        const { sourceIds } = moveTargetModal;
        if (sourceIds.length === 0) return;

        historyService.pushState(stackDefs);

        const newStackDefs = [...stackDefs];

        // 1. Remove source orders from any existing Explicit Stacks
        newStackDefs.forEach(def => {
            if (def.manualOrders) {
                def.manualOrders = def.manualOrders.filter(o => !sourceIds.includes(o.orderId));
            }
        });

        // 2. Identify orders to move (from history or existing stacks)
        const ordersToMove = sourceIds.map(id => {
            const inHistory = history.find(h => h.orderId === id);
            if (inHistory) return inHistory;
            // Fallback for demo/test data not in history?
            // Try finding in current stacks
            for (const stack of renderableStacks) {
                const found = stack.orders.find(o => o.orderId === id);
                if (found) return found;
            }
            // Absolute fallback
            return {
                orderId: id,
                resolvedAt: new Date().toISOString(),
                date: new Date().toLocaleDateString(),
                address: 'Unknown',
            } as ResolvedRouteInfo;
        });

        // 3. Add to Target Stack
        if (targetStackId === 'NEW_CUSTOM') {
            const newId = `CUSTOM-${crypto.randomUUID()}`;
            newStackDefs.push({
                id: newId,
                type: 'custom',
                status: 'open',
                routes: [customName || 'Custom Pool'],
                manualOrders: ordersToMove,
                isOverflow: false,
                overflowCount: 0,
                importedAt: new Date().toISOString(),
                sourceNote: customName
            });
        } else {
            const targetDef = newStackDefs.find(s => s.id === targetStackId);
            if (targetDef) {
                if (!targetDef.manualOrders) targetDef.manualOrders = [];
                targetDef.manualOrders.push(...ordersToMove);
            }
        }

        setStackDefs(newStackDefs);
        setMoveTargetModal({ isOpen: false, sourceIds: [] });
        setSelectedDetailStack(null);
    };

    // Batch Order Search Handler
    const handleBatchSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        // Parse input: split by comma, space, or newline
        const orderIds = searchQuery
            .split(/[\s,]+/)
            .map(id => id.trim().toUpperCase())
            .filter(id => id.length > 0);

        const results = orderIds.map(searchId => {
            // Search through all stacks
            for (const stack of renderableStacks) {
                const found = stack.orders.find(o => o.orderId.toUpperCase() === searchId);
                if (found) {
                    return {
                        orderId: searchId,
                        stackName: `${stack.route} #${stack.stackNumber}`,
                        stackType: stack.type === 'merged' ? 'Merged' : stack.type === 'overflow' ? 'Overflow' : 'Normal',
                        found: true
                    };
                }
            }
            // Check exception pool
            const inExceptions = exceptionPool.find(o => o.orderId.toUpperCase() === searchId);
            if (inExceptions) {
                return {
                    orderId: searchId,
                    stackName: 'Exception Pool',
                    stackType: 'Exception',
                    found: true
                };
            }
            return {
                orderId: searchId,
                stackName: '-',
                stackType: '-',
                found: false
            };
        });

        setSearchResults(results);
        setShowSearchResults(true);
    };

    // Export search results
    const handleExportSearchResults = () => {
        if (searchResults.length === 0) return;

        const exportService = new ExcelExportService();
        const rows = searchResults.map(r => ({
            orderId: r.orderId,
            stackName: r.stackName,
            stackType: r.stackType,
            status: r.found ? 'Found' : 'Not Found'
        }));

        // Use ExportEngine directly for custom export
        import('../lib/export').then(({ ExportEngine }) => {
            ExportEngine.exportToExcel(rows, {
                columns: [
                    { header: 'Order ID', field: 'orderId', formatter: 'string' },
                    { header: 'Stack', field: 'stackName', formatter: 'string' },
                    { header: 'Type', field: 'stackType', formatter: 'string' },
                    { header: 'Status', field: 'status', formatter: 'string' }
                ],
                sheetName: 'Search_Results',
                filename: `Order_Search_${new Date().getTime()}`
            });
        });
    };

    const displayedStacks = useMemo(() => {
        // Start with filteredStacks (already filtered by route/region/full)
        let result = filteredStacks;
        // Apply additional filterMode (overflow, merged, etc.)
        if (filterMode === 'overflow') result = result.filter(s => s.isOverflow);
        return result;
    }, [filteredStacks, filterMode]);

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Only set isDragging to false if we're leaving the container (not entering a child)
        if (e.currentTarget === e.target) {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const validExtensions = ['.json', '.xlsx', '.xls'];
            const isValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

            if (isValid) {
                handleImport(file);
            } else {
                alert('Please drop a JSON or Excel file (.json, .xlsx, .xls)');
            }
        }
    };


    return (
        <div
            className={`h-full flex flex-col space-y-6 p-6 animate-in fade-in duration-500 relative transition-all ${isDragging ? 'ring-4 ring-sky-500/50 ring-inset' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Drag overlay */}
            {isDragging && (
                <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center pointer-events-none animate-in fade-in duration-200">
                    <div className="flex flex-col items-center gap-4 p-8 bg-slate-900/90 rounded-3xl border-2 border-dashed border-sky-500 shadow-2xl shadow-sky-500/20">
                        <Upload className="w-16 h-16 text-sky-400 animate-bounce" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">{t('stacks.importOrders')}</p>
                            <p className="text-slate-400 text-sm mt-1">JSON or Excel files (.json, .xlsx, .xls)</p>
                        </div>
                    </div>
                </div>
            )}
            {/* Consolidated Header with Import/Export and Settings */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                {/* Left: Title and Stats */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <Layers className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">{t('stacks.title')}</h2>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                            {renderableStacks.length} Stacks
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span className="text-emerald-400">{renderableStacks.reduce((sum, s) => sum + s.orders.length, 0)} {t('stacks.pieces')}</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            {exceptionPool.length} Exceptions
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-slate-500" />

                    {/* Route Filter */}
                    <div className="relative">
                        <select
                            value={routeFilter}
                            onChange={(e) => setRouteFilter(e.target.value)}
                            className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                        >
                            <option value="all">{t('rules.route')}: All</option>
                            {uniqueRoutes.map(route => (
                                <option key={route} value={route}>{route}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Region Filter */}
                    <div className="relative">
                        <select
                            value={regionFilter}
                            onChange={(e) => setRegionFilter(e.target.value)}
                            className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                        >
                            <option value="all">{t('rules.metroArea')}: All</option>
                            {uniqueRegions.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Full Status Filter */}
                    <div className="relative">
                        <select
                            value={fullFilter}
                            onChange={(e) => setFullFilter(e.target.value as 'all' | 'full' | 'notFull')}
                            className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 pr-8 text-sm text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                        >
                            <option value="all">{t('stacks.full')}: All</option>
                            <option value="full">{t('stacks.full')}</option>
                            <option value="notFull">Not Full</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Clear Filters */}
                    {(routeFilter !== 'all' || regionFilter !== 'all' || fullFilter !== 'all') && (
                        <button
                            onClick={() => { setRouteFilter('all'); setRegionFilter('all'); setFullFilter('all'); }}
                            className="px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
                        >
                            {t('common.clear')}
                        </button>
                    )}

                    {/* Show filtered count */}
                    {(routeFilter !== 'all' || regionFilter !== 'all' || fullFilter !== 'all') && (
                        <span className="text-xs text-sky-400 font-medium">
                            {filteredStacks.length} / {renderableStacks.length}
                        </span>
                    )}
                </div>

                {/* Center: Batch Order Search */}
                <div className="flex-1 max-w-xl relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleBatchSearch()}
                            placeholder="Search orders (comma or space separated)..."
                            className="w-full pl-10 pr-20 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); setSearchResults([]); setShowSearchResults(false); }}
                                className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            onClick={handleBatchSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors"
                        >
                            {t('common.search').toUpperCase()}
                        </button>
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
                            {t('stacks.merge').toUpperCase()} ({selectedStackIds.size})
                        </button>
                    )}

                    {/* Export Button (always visible) */}
                    <button
                        onClick={handleBatchExport}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/30 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        {selectedStackIds.size > 0 ? `${t('common.export').toUpperCase()} (${selectedStackIds.size})` : t('stacks.exportStacks').toUpperCase()}
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
                        {t('common.import').toUpperCase()}
                    </button>

                    {/* Import Placeholders */}
                    <input
                        type="file"
                        ref={placeholderInputRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImportPlaceholders(file);
                            if (e.target) e.target.value = '';
                        }}
                        className="hidden"
                        accept=".json,.xlsx,.xls"
                    />
                    <button
                        onClick={() => placeholderInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-xl font-bold transition-colors text-sm border border-slate-600"
                        title="Import as Placeholders (Grayed out)"
                    >
                        <Upload className="w-4 h-4 text-slate-400" />
                        IMPORT PLAN
                    </button>


                    {/* Undo/Redo */}
                    <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/5">
                        <button
                            onClick={onUndo}
                            disabled={!historyService.canUndo()}
                            className={`p-2 rounded-lg transition-colors ${historyService.canUndo() ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-700 cursor-not-allowed'}`}
                            title={t('stacks.undo')}
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onRedo}
                            disabled={!historyService.canRedo()}
                            className={`p-2 rounded-lg transition-colors ${historyService.canRedo() ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-700 cursor-not-allowed'}`}
                            title={t('stacks.redo')}
                        >
                            <RotateCw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Settings (Capacity Rules) */}
                    <button
                        onClick={() => setShowSettingsModal(true)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors border border-white/5"
                        title={t('stacks.capacitySettings')}
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Search Results Panel */}
            {showSearchResults && searchResults.length > 0 && (
                <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Search className="w-5 h-5 text-sky-400" />
                            <h3 className="text-lg font-bold text-white">Search Results</h3>
                            <span className="px-2 py-1 bg-sky-500/20 text-sky-400 text-xs font-bold rounded-full">
                                {searchResults.filter(r => r.found).length} / {searchResults.length} Found
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleExportSearchResults}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                            >
                                <Download className="w-3 h-3" />
                                EXPORT
                            </button>
                            <button
                                onClick={() => setShowSearchResults(false)}
                                className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-slate-900">
                                <tr className="text-left text-slate-500 uppercase text-xs tracking-wider">
                                    <th className="pb-2 pr-4">Order ID</th>
                                    <th className="pb-2 pr-4">Stack</th>
                                    <th className="pb-2 pr-4">Type</th>
                                    <th className="pb-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((result, idx) => (
                                    <tr key={idx} className={`border-t border-slate-800 ${result.found ? 'text-white' : 'text-red-400'}`}>
                                        <td className="py-2 pr-4 font-mono">{result.orderId}</td>
                                        <td className="py-2 pr-4 font-medium">{result.stackName}</td>
                                        <td className="py-2 pr-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${result.stackType === 'Merged' ? 'bg-indigo-500/20 text-indigo-400' :
                                                result.stackType === 'Overflow' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    result.stackType === 'Exception' ? 'bg-red-500/20 text-red-400' :
                                                        result.stackType === 'Normal' ? 'bg-emerald-500/20 text-emerald-400' :
                                                            'bg-slate-700 text-slate-400'
                                                }`}>
                                                {result.stackType}
                                            </span>
                                        </td>
                                        <td className="py-2">
                                            {result.found ? (
                                                <span className="text-emerald-400 font-bold">✓ Found</span>
                                            ) : (
                                                <span className="text-red-400 font-bold">✗ Not Found</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

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
                            hasOverflow={stackDefs.some(s => s.type === 'overflow' && s.id.startsWith(`OVERFLOW-${stack.id}-`))}
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
                    onMoveOrders={handleMoveOrders}
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
                selectedStacks={filteredStacks.filter(s => selectedStackIds.has(s.id))}
                allStacks={filteredStacks}
            />

            <StackSelectorModal
                isOpen={moveTargetModal.isOpen}
                onClose={() => setMoveTargetModal({ isOpen: false, sourceIds: [] })}
                stacks={renderableStacks.filter(s => s.type === 'custom' || s.type === 'merged' || s.type === 'overflow')} // Only show explicit stacks as targets? Or allow all? Implicit stacks technically can't accept manual orders unless we convert them.
                // For simplicity, let's only allow moving to Explicit Stacks (Custom, Merged, Overflow).
                // If user wants to move to an Implicit Stack, they should probably just "unassign" it?
                // But "Custom Route Pools" is the feature. So showing Custom + New is primary.
                // Let's also show Merged.
                onSelect={handleConfirmMove}
            />
        </div>
    );
};

export default RouteStackManager;
