import { RouteStack, MergedStackComponent } from '../types';

export class StateHistoryService<T> {
    private history: T[] = [];
    private future: T[] = [];
    private maxHistory = 10;
    private currentState: T | null = null;

    initialize(initialState: T) {
        this.currentState = initialState;
        this.history = [];
        this.future = [];
    }

    pushState(newState: T) {
        if (this.currentState) {
            // Store a deep copy to prevent reference issues
            this.history.push(JSON.parse(JSON.stringify(this.currentState)));
            if (this.history.length > this.maxHistory) {
                this.history.shift();
            }
        }
        this.currentState = JSON.parse(JSON.stringify(newState));
        this.future = []; // Clear redo
    }

    undo(): T | null {
        if (this.history.length === 0) return null;

        const previousState = this.history.pop()!;
        if (this.currentState) {
            this.future.push(this.currentState);
        }
        this.currentState = previousState;
        return previousState;
    }

    redo(): T | null {
        if (this.future.length === 0) return null;

        const nextState = this.future.pop()!;
        if (this.currentState) {
            this.history.push(this.currentState);
        }
        this.currentState = nextState;
        return nextState;
    }

    canUndo(): boolean {
        return this.history.length > 0;
    }

    canRedo(): boolean {
        return this.future.length > 0;
    }
}

class StackMergeService {

    /**
     * Merge two stacks into a new Merged RouteStack
     */
    mergeStacks(primary: RouteStack, secondary: RouteStack): RouteStack {
        // Validation
        if (primary.status === 'locked' || secondary.status === 'locked') {
            throw new Error('Cannot merge locked stacks');
        }

        // Create component records
        const primaryComponent: MergedStackComponent = {
            stackId: primary.id,
            route: primary.route,
            stackNumber: primary.stackNumber,
            orders: [...primary.orders],
            overflowCount: primary.overflowCount
        };

        const secondaryComponent: MergedStackComponent = {
            stackId: secondary.id,
            route: secondary.route,
            stackNumber: secondary.stackNumber,
            orders: [...secondary.orders],
            overflowCount: secondary.overflowCount
        };

        const components = primary.mergeInfo
            ? [...primary.mergeInfo.components, secondaryComponent]
            : [primaryComponent, secondaryComponent];

        const newId = `MERGED-${Date.now()}`;

        return {
            id: newId,
            route: `${primary.route} & ${secondary.route}`,
            stackNumber: primary.stackNumber,
            orders: [...primary.orders, ...secondary.orders],
            capacity: primary.capacity, // Using single capacity per request
            status: 'active',
            type: 'merged',
            isOverflow: (primary.orders.length + secondary.orders.length) > primary.capacity,
            overflowCount: Math.max(0, (primary.orders.length + secondary.orders.length) - primary.capacity),
            mergeInfo: {
                primaryStackId: primary.id,
                components: components,
                mergedAt: new Date().toISOString()
            },
            importedAt: primary.importedAt || secondary.importedAt,
            overflowFromStackId: undefined
        };
    }

    /**
     * Merge multiple stacks into one
     */
    mergeMultipleStacks(stacks: RouteStack[]): RouteStack {
        if (stacks.length < 2) {
            throw new Error('Need at least 2 stacks to merge');
        }

        // Sort stacks by stack number to ensure deterministic order
        const sortedStacks = [...stacks].sort((a, b) => a.stackNumber - b.stackNumber);
        const primary = sortedStacks[0];

        // Flatten components
        // If a stack is already merged, take its components. Otherwise create one.
        const allComponents: MergedStackComponent[] = [];
        let allOrders: any[] = []; // Type issue? inferred
        let combinedRouteNames: string[] = [];

        sortedStacks.forEach(stack => {
            if (stack.status === 'locked') {
                throw new Error(`Stack ${stack.route} is locked`);
            }

            combinedRouteNames.push(stack.route);

            if (stack.mergeInfo) {
                // Already merged - flatten components
                allComponents.push(...stack.mergeInfo.components);
            } else {
                // Normal or Overflow stack
                allComponents.push({
                    stackId: stack.id,
                    route: stack.route,
                    orders: [...stack.orders],
                    overflowCount: stack.overflowCount,
                    stackNumber: stack.stackNumber // Preserve original stack number
                });
            }
        });

        // Re-aggregate orders from components to ensure sync? 
        // Or just concat stack.orders? 
        // Concat stack.orders is safer because components might be stale if we edit orders?
        // But components are snapshot.
        // Let's use components to build the master list to guarantee consistency with components list.
        allOrders = allComponents.flatMap(c => c.orders);

        const newId = `MERGED-${Date.now()}`;
        const totalCapacity = primary.capacity; // Use primary capacity

        return {
            id: newId,
            route: combinedRouteNames.join(' & '),
            stackNumber: primary.stackNumber,
            orders: allOrders,
            capacity: totalCapacity,
            status: 'active',
            type: 'merged',
            isOverflow: allOrders.length > totalCapacity,
            overflowCount: Math.max(0, allOrders.length - totalCapacity),
            mergeInfo: {
                primaryStackId: primary.id,
                components: allComponents,
                mergedAt: new Date().toISOString()
            },
            importedAt: sortedStacks.find(s => s.importedAt)?.importedAt,
            overflowFromStackId: undefined
        };
    }

    splitStack(mergedStack: RouteStack): RouteStack[] {
        if (!mergedStack.mergeInfo) return [mergedStack];

        return mergedStack.mergeInfo.components.map(comp => ({
            id: comp.stackId,
            route: comp.route,
            stackNumber: 1,
            orders: comp.orders,
            capacity: 40,
            status: 'open',
            type: 'normal',
            overflowCount: comp.overflowCount,
            isOverflow: comp.overflowCount > 0,
            importedAt: undefined
        } as RouteStack));
    }
}

export const stackMergeService = new StackMergeService();
export const historyService = new StateHistoryService<any>();
