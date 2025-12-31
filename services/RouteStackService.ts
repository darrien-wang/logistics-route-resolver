/**
 * RouteStackService - Tracks stack counts per route
 * 
 * Manages virtual stacks for each route, automatically creating new stacks
 * when capacity is reached.
 */

export interface RouteStackInfo {
    stackNumber: number;
    currentCount: number;
    capacity: number;
    isStackFull: boolean;
    isNewStack: boolean;
}

interface RouteState {
    currentStackNumber: number;
    currentStackCount: number;
    scannedOrderIds: Set<string>;  // Track unique order IDs
}

class RouteStackService {
    private routeStates: Map<string, RouteState> = new Map();
    private capacity: number = 40;  // Default capacity

    /**
     * Add an order to a route's stack and return updated stack info
     * Only increments count if this is a new unique order ID
     */
    addToStack(routeName: string, orderId: string): RouteStackInfo {
        if (!routeName) {
            throw new Error('Route name is required');
        }
        if (!orderId) {
            throw new Error('Order ID is required');
        }

        let state = this.routeStates.get(routeName);
        let isNewStack = false;
        let isNewOrder = false;

        if (!state) {
            // First order for this route
            state = {
                currentStackNumber: 1,
                currentStackCount: 1,
                scannedOrderIds: new Set([orderId]),
            };
            isNewStack = true;
            isNewOrder = true;
        } else {
            // Check if this order was already scanned
            if (state.scannedOrderIds.has(orderId)) {
                // Duplicate scan - don't increment count
                isNewOrder = false;
            } else {
                // New order - add to set and increment count
                state.scannedOrderIds.add(orderId);
                isNewOrder = true;

                // Check if current stack is full
                if (state.currentStackCount >= this.capacity) {
                    // Move to next stack
                    state.currentStackNumber++;
                    state.currentStackCount = 1;
                    isNewStack = true;
                } else {
                    // Add to current stack
                    state.currentStackCount++;
                }
            }
        }

        this.routeStates.set(routeName, state);

        return {
            stackNumber: state.currentStackNumber,
            currentCount: state.currentStackCount,
            capacity: this.capacity,
            isStackFull: state.currentStackCount >= this.capacity,
            isNewStack: isNewStack && isNewOrder,  // Only trigger new stack actions for new orders
        };
    }

    /**
     * Get current stack info for a route without modifying state
     */
    getStackInfo(routeName: string): RouteStackInfo {
        const state = this.routeStates.get(routeName);

        if (!state) {
            return {
                stackNumber: 1,
                currentCount: 0,
                capacity: this.capacity,
                isStackFull: false,
                isNewStack: false,
            };
        }

        return {
            stackNumber: state.currentStackNumber,
            currentCount: state.currentStackCount,
            capacity: this.capacity,
            isStackFull: state.currentStackCount >= this.capacity,
            isNewStack: false,
        };
    }

    /**
     * Set the capacity for all stacks
     */
    setCapacity(capacity: number): void {
        if (capacity < 1) {
            throw new Error('Capacity must be at least 1');
        }
        this.capacity = capacity;
    }

    /**
     * Get current capacity
     */
    getCapacity(): number {
        return this.capacity;
    }

    /**
     * Reset all route states (clear all stack data)
     */
    reset(): void {
        this.routeStates.clear();
    }

    /**
     * Get all route states (for debugging/monitoring)
     */
    getAllStates(): Map<string, RouteState> {
        return new Map(this.routeStates);
    }
}

// Export singleton instance
export const routeStackService = new RouteStackService();
