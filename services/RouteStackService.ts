/**
 * RouteStackService - Tracks stack counts per route with multi-dimensional capacity
 *
 * Manages virtual stacks for each route, automatically creating new stacks
 * when capacity rules are satisfied.
 *
 * Supports LAN synchronization in Host/Client mode:
 * - Host mode: Processes all logic and broadcasts state updates
 * - Client mode: Read-only, sends actions to host and receives state updates
 * - Standalone mode: Works independently without sync
 */

import { StackCapacityConfig, StackCapacityRule, DEFAULT_CAPACITY_CONFIG } from '../types';
import type { SyncMode } from './LanSyncService';

export interface RouteStackInfo {
    stackNumber: number;
    currentCount: number;
    currentWeight: number;   // Cumulative weight (lb)
    currentVolume: number;   // Cumulative volume (ft³)
    capacity: number;        // Legacy: item count capacity
    isStackFull: boolean;
    isNewStack: boolean;
}

export interface OrderDimensions {
    weight: number;  // lb
    volume: number;  // ft³
}

interface RouteState {
    currentStackNumber: number;
    currentStackCount: number;
    currentStackWeight: number;   // Cumulative weight (lb)
    currentStackVolume: number;   // Cumulative volume (ft³)
    scannedOrderIds: Set<string>;
}

export interface SerializedRouteState {
    currentStackNumber: number;
    currentStackCount: number;
    currentStackWeight: number;
    currentStackVolume: number;
    scannedOrderIds: string[];
}

export interface SerializedStackServiceState {
    routeStates: Record<string, SerializedRouteState>;
    capacityConfig: StackCapacityConfig;
    timestamp: number;
}

type StateChangeCallback = (state: SerializedStackServiceState) => void;

class RouteStackService {
    private routeStates: Map<string, RouteState> = new Map();
    private capacityConfig: StackCapacityConfig = DEFAULT_CAPACITY_CONFIG;
    private syncMode: SyncMode = 'standalone';
    private stateChangeCallbacks: Set<StateChangeCallback> = new Set();

    /**
     * Add an order to a route's stack and return updated stack info
     * Only increments counts if this is a new unique order ID
     */
    addToStack(routeName: string, orderId: string, dimensions?: OrderDimensions): RouteStackInfo {
        if (!routeName) {
            throw new Error('Route name is required');
        }
        if (!orderId) {
            throw new Error('Order ID is required');
        }

        const orderWeight = dimensions?.weight || 0;
        const orderVolume = dimensions?.volume || 0;

        let state = this.routeStates.get(routeName);
        let isNewStack = false;
        let isNewOrder = false;

        if (!state) {
            // First order for this route
            state = {
                currentStackNumber: 1,
                currentStackCount: 1,
                currentStackWeight: orderWeight,
                currentStackVolume: orderVolume,
                scannedOrderIds: new Set([orderId]),
            };
            isNewStack = true;
            isNewOrder = true;
        } else {
            // Check if this order was already scanned
            if (state.scannedOrderIds.has(orderId)) {
                // Duplicate scan - don't increment counts
                isNewOrder = false;
            } else {
                // New order - add to set and increment counts
                state.scannedOrderIds.add(orderId);
                isNewOrder = true;

                // Check if current stack is full BEFORE adding
                if (this.isStackFull(state)) {
                    // Move to next stack
                    state.currentStackNumber++;
                    state.currentStackCount = 1;
                    state.currentStackWeight = orderWeight;
                    state.currentStackVolume = orderVolume;
                    isNewStack = true;
                } else {
                    // Add to current stack
                    state.currentStackCount++;
                    state.currentStackWeight += orderWeight;
                    state.currentStackVolume += orderVolume;
                }
            }
        }

        this.routeStates.set(routeName, state);

        // Notify state change if in host mode
        if (isNewOrder) {
            this.notifyStateChange();
        }

        // Get the legacy capacity value for backward compatibility
        const countRule = this.capacityConfig.rules.find(r => r.type === 'count');
        const legacyCapacity = countRule?.value || 40;

        return {
            stackNumber: state.currentStackNumber,
            currentCount: state.currentStackCount,
            currentWeight: Math.round(state.currentStackWeight * 100) / 100,
            currentVolume: Math.round(state.currentStackVolume * 100) / 100,
            capacity: legacyCapacity,
            isStackFull: this.isStackFull(state),
            isNewStack: isNewStack && isNewOrder,
            ...this.getDynamicStackInfo(state)
        };
    }

    /**
     * Evaluate if a stack is full based on the capacity config
     */
    private isStackFull(state: RouteState): boolean {
        const config = this.capacityConfig;

        if (!config.rules || config.rules.length === 0) {
            // No rules = never full (default behavior)
            return false;
        }

        const results = config.rules.map(rule => this.evaluateRule(rule, state));

        if (config.logic === 'AND') {
            return results.every(r => r);
        } else {
            return results.some(r => r);
        }
    }

    /**
     * Evaluate a single capacity rule
     */
    private evaluateRule(rule: StackCapacityRule, state: RouteState): boolean {
        let currentValue: number;

        switch (rule.type) {
            case 'count':
                currentValue = state.currentStackCount;
                break;
            case 'weight':
                currentValue = state.currentStackWeight;
                break;
            case 'volume':
                currentValue = state.currentStackVolume;
                break;
            default:
                return false;
        }

        switch (rule.operator) {
            case '>=':
                return currentValue >= rule.value;
            case '>':
                return currentValue > rule.value;
            case '<=':
                return currentValue <= rule.value;
            case '<':
                return currentValue < rule.value;
            default:
                return false;
        }
    }

    /**
     * Get current stack info for a route without modifying state
     */
    getStackInfo(routeName: string): RouteStackInfo {
        const state = this.routeStates.get(routeName);
        const countRule = this.capacityConfig.rules.find(r => r.type === 'count');
        const legacyCapacity = countRule?.value || 40;

        if (!state) {
            return {
                stackNumber: 1,
                currentCount: 0,
                currentWeight: 0,
                currentVolume: 0,
                capacity: legacyCapacity,
                isStackFull: false,
                isNewStack: false,
            };
        }

        return {
            stackNumber: state.currentStackNumber,
            currentCount: state.currentStackCount,
            currentWeight: Math.round(state.currentStackWeight * 100) / 100,
            currentVolume: Math.round(state.currentStackVolume * 100) / 100,
            capacity: legacyCapacity,
            isStackFull: this.isStackFull(state),
            isNewStack: false,
            ...this.getDynamicStackInfo(state)
        };
    }

    /**
     * Helper to get dynamic fields based on active rules
     */
    private getDynamicStackInfo(state: RouteState): { activeValue: number, activeCapacity: number, activeUnit: string, activeMeasure: 'count' | 'weight' | 'volume' } {
        const config = this.capacityConfig;
        // Default to count if no rules
        if (!config.rules || config.rules.length === 0) {
            return {
                activeValue: state.currentStackCount,
                activeCapacity: 40,
                activeUnit: 'pcs',
                activeMeasure: 'count'
            };
        }

        // Prioritize the first rule for display, or find the "most constrained" rule
        // For simplicity, we'll use the first rule in the list as the "primary" display rule
        // unless the user wants to see the one closest to full. 
        // Let's assume the first rule is the primary constraint.
        // Prioritize weight or volume rules for display if they exist
        // Otherwise fall back to the first rule (usually count)
        const primaryRule = config.rules.find(r => r.type !== 'count') || config.rules[0];

        let activeValue = 0;
        let activeUnit = 'pcs';
        let activeMeasure: 'count' | 'weight' | 'volume' = 'count';

        switch (primaryRule.type) {
            case 'weight':
                activeValue = Math.round(state.currentStackWeight * 100) / 100;
                activeUnit = 'lb';
                activeMeasure = 'weight';
                break;
            case 'volume':
                activeValue = Math.round(state.currentStackVolume * 100) / 100;
                activeUnit = 'ft³';
                activeMeasure = 'volume';
                break;
            case 'count':
            default:
                activeValue = state.currentStackCount;
                activeUnit = 'pcs';
                activeMeasure = 'count';
                break;
        }

        return {
            activeValue,
            activeCapacity: primaryRule.value,
            activeUnit,
            activeMeasure
        };
    }

    /**
     * Set the capacity configuration
     */
    setCapacityConfig(config: StackCapacityConfig): void {
        this.capacityConfig = config;
    }

    /**
     * Get current capacity config
     */
    getCapacityConfig(): StackCapacityConfig {
        return this.capacityConfig;
    }

    /**
     * Legacy method - set capacity by count only
     * Creates a simple count >= value rule
     */
    setCapacity(capacity: number): void {
        if (capacity < 1) {
            throw new Error('Capacity must be at least 1');
        }
        this.capacityConfig = {
            rules: [{ type: 'count', operator: '>=', value: capacity }],
            logic: 'AND'
        };
    }

    /**
     * Get current capacity (legacy - returns count rule value)
     */
    getCapacity(): number {
        const countRule = this.capacityConfig.rules.find(r => r.type === 'count');
        return countRule?.value || 40;
    }

    /**
     * Reset all route states (clear all stack data)
     */
    reset(): void {
        this.routeStates.clear();
        this.notifyStateChange();  // Trigger save to localStorage
    }

    /**
     * Restore state from persistence (used on app startup)
     * Unlike applyRemoteState, this doesn't check sync mode
     */
    restoreState(serialized: SerializedStackServiceState): void {
        // Clear current state
        this.routeStates.clear();

        // Apply saved state
        Object.entries(serialized.routeStates).forEach(([routeName, serializedState]) => {
            this.routeStates.set(routeName, {
                currentStackNumber: serializedState.currentStackNumber,
                currentStackCount: serializedState.currentStackCount,
                currentStackWeight: serializedState.currentStackWeight,
                currentStackVolume: serializedState.currentStackVolume,
                scannedOrderIds: new Set(serializedState.scannedOrderIds),
            });
        });

        // Apply capacity config if present
        if (serialized.capacityConfig) {
            this.capacityConfig = serialized.capacityConfig;
        }

        console.log(`[RouteStackService] Restored state with ${this.routeStates.size} routes`);
    }

    /**
     * Get all route states (for debugging/monitoring)
     */
    getAllStates(): Map<string, RouteState> {
        return new Map(this.routeStates);
    }

    // ===== LAN Sync Methods =====

    /**
     * Set synchronization mode
     */
    setSyncMode(mode: SyncMode): void {
        this.syncMode = mode;
        console.log(`[RouteStackService] Sync mode set to: ${mode}`);
    }

    /**
     * Get current synchronization mode
     */
    getSyncMode(): SyncMode {
        return this.syncMode;
    }

    /**
     * Register callback for state changes (used by Host to broadcast updates)
     */
    onStateChange(callback: StateChangeCallback): void {
        this.stateChangeCallbacks.add(callback);
    }

    /**
     * Unregister state change callback
     */
    offStateChange(callback: StateChangeCallback): void {
        this.stateChangeCallbacks.delete(callback);
    }

    /**
     * Notify all registered callbacks of state change
     */
    private notifyStateChange(): void {
        // Notifications needed for:
        // 1. Host mode -> Broadcasting to clients
        // 2. Standalone mode -> Persistence (useAppPersistence)
        if (this.syncMode === 'host' || this.syncMode === 'standalone') {
            const state = this.serializeState();
            this.stateChangeCallbacks.forEach(callback => callback(state));
        }
    }

    /**
     * Serialize current state for transmission
     */
    serializeState(): SerializedStackServiceState {
        const routeStates: Record<string, SerializedRouteState> = {};

        this.routeStates.forEach((state, routeName) => {
            routeStates[routeName] = {
                currentStackNumber: state.currentStackNumber,
                currentStackCount: state.currentStackCount,
                currentStackWeight: state.currentStackWeight,
                currentStackVolume: state.currentStackVolume,
                scannedOrderIds: Array.from(state.scannedOrderIds),
            };
        });

        return {
            routeStates,
            capacityConfig: this.capacityConfig,
            timestamp: Date.now(),
        };
    }

    /**
     * Deserialize and apply state from remote (Client mode)
     */
    applyRemoteState(serialized: SerializedStackServiceState): void {
        if (this.syncMode !== 'client') {
            console.warn('[RouteStackService] Cannot apply remote state - not in client mode');
            return;
        }

        // Clear current state
        this.routeStates.clear();

        // Apply remote state
        Object.entries(serialized.routeStates).forEach(([routeName, serializedState]) => {
            this.routeStates.set(routeName, {
                currentStackNumber: serializedState.currentStackNumber,
                currentStackCount: serializedState.currentStackCount,
                currentStackWeight: serializedState.currentStackWeight,
                currentStackVolume: serializedState.currentStackVolume,
                scannedOrderIds: new Set(serializedState.scannedOrderIds),
            });
        });

        // Apply capacity config
        this.capacityConfig = serialized.capacityConfig;

        console.log('[RouteStackService] Applied remote state update');
    }

    /**
     * Check if can execute locally (Host or Standalone mode)
     */
    canExecuteLocally(): boolean {
        return this.syncMode === 'host' || this.syncMode === 'standalone';
    }

    /**
     * Check if in client mode (read-only)
     */
    isClientMode(): boolean {
        return this.syncMode === 'client';
    }
}

// Export singleton instance
export const routeStackService = new RouteStackService();
