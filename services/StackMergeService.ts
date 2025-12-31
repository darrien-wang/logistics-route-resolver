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
            orders: [...primary.orders],
            overflowCount: primary.overflowCount
        };

        const secondaryComponent: MergedStackComponent = {
            stackId: secondary.id,
            route: secondary.route,
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
            isImported: primary.isImported || secondary.isImported,
            importedAt: primary.importedAt || secondary.importedAt,
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
