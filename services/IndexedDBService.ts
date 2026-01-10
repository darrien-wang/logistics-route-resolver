/**
 * IndexedDB Persistence Service
 * 
 * Provides robust storage for large datasets (20,000+ items) that exceed localStorage limits.
 * Uses IndexedDB for:
 * - history: Scan history (ResolvedRouteInfo[])
 * - routeStackState: RouteStackService state
 * - stackDefs: Stack definitions
 */

import { ResolvedRouteInfo, OrderEventStatus } from '../types';
import { SerializedStackServiceState } from './RouteStackService';

const DB_NAME = 'LogisticsRouteResolver';
const DB_VERSION = 1;

// Store names
const STORES = {
    HISTORY: 'history',
    ROUTE_STACK_STATE: 'routeStackState',
    STACK_DEFS: 'stackDefs',
    OPERATION_LOG: 'operationLog',
    SETTINGS: 'settings'  // For small key-value pairs
} as const;

class IndexedDBService {
    private db: IDBDatabase | null = null;
    private initPromise: Promise<void> | null = null;

    /**
     * Initialize the database
     */
    async init(): Promise<void> {
        if (this.db) return;
        if (this.initPromise) return this.initPromise;

        this.initPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('[IndexedDB] Failed to open database:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('[IndexedDB] Database opened successfully');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                console.log('[IndexedDB] Upgrading database...');

                // Create object stores
                if (!db.objectStoreNames.contains(STORES.HISTORY)) {
                    // History store - ordered by timestamp, indexed by orderId
                    const historyStore = db.createObjectStore(STORES.HISTORY, { keyPath: 'orderId' });
                    historyStore.createIndex('resolvedAt', 'resolvedAt', { unique: false });
                }

                if (!db.objectStoreNames.contains(STORES.ROUTE_STACK_STATE)) {
                    db.createObjectStore(STORES.ROUTE_STACK_STATE, { keyPath: 'id' });
                }

                if (!db.objectStoreNames.contains(STORES.STACK_DEFS)) {
                    db.createObjectStore(STORES.STACK_DEFS, { keyPath: 'id' });
                }

                if (!db.objectStoreNames.contains(STORES.OPERATION_LOG)) {
                    db.createObjectStore(STORES.OPERATION_LOG, { keyPath: 'orderId' });
                }

                if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
                    db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
                }

                console.log('[IndexedDB] Database upgrade complete');
            };
        });

        return this.initPromise;
    }

    /**
     * Ensure database is ready
     */
    private async ensureDB(): Promise<IDBDatabase> {
        await this.init();
        if (!this.db) throw new Error('Database not initialized');
        return this.db;
    }

    // ============ History Operations ============

    /**
     * Save all history items (replaces existing)
     */
    async saveHistory(history: ResolvedRouteInfo[]): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.HISTORY, 'readwrite');
            const store = transaction.objectStore(STORES.HISTORY);

            // Clear existing and add all new
            store.clear();

            for (const item of history) {
                store.put(item);
            }

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     * Load all history items
     */
    async loadHistory(): Promise<ResolvedRouteInfo[]> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.HISTORY, 'readonly');
            const store = transaction.objectStore(STORES.HISTORY);
            const request = store.getAll();

            request.onsuccess = () => {
                // Sort by resolvedAt descending (newest first)
                const result = request.result || [];
                result.sort((a, b) =>
                    new Date(b.resolvedAt).getTime() - new Date(a.resolvedAt).getTime()
                );
                resolve(result);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Add or update a single history item
     */
    async upsertHistoryItem(item: ResolvedRouteInfo): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.HISTORY, 'readwrite');
            const store = transaction.objectStore(STORES.HISTORY);
            store.put(item);

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     * Clear all history
     */
    async clearHistory(): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.HISTORY, 'readwrite');
            const store = transaction.objectStore(STORES.HISTORY);
            store.clear();

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // ============ RouteStackState Operations ============

    /**
     * Save RouteStackService state
     */
    async saveRouteStackState(state: SerializedStackServiceState): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.ROUTE_STACK_STATE, 'readwrite');
            const store = transaction.objectStore(STORES.ROUTE_STACK_STATE);
            store.put({ id: 'main', ...state });

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     * Load RouteStackService state
     */
    async loadRouteStackState(): Promise<SerializedStackServiceState | null> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.ROUTE_STACK_STATE, 'readonly');
            const store = transaction.objectStore(STORES.ROUTE_STACK_STATE);
            const request = store.get('main');

            request.onsuccess = () => {
                if (request.result) {
                    const { id, ...state } = request.result;
                    resolve(state as SerializedStackServiceState);
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear RouteStackService state
     */
    async clearRouteStackState(): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.ROUTE_STACK_STATE, 'readwrite');
            const store = transaction.objectStore(STORES.ROUTE_STACK_STATE);
            store.clear();

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // ============ StackDefs Operations ============

    /**
     * Save all stack definitions
     */
    async saveStackDefs(stackDefs: any[]): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.STACK_DEFS, 'readwrite');
            const store = transaction.objectStore(STORES.STACK_DEFS);
            store.clear();

            for (const def of stackDefs) {
                store.put(def);
            }

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     * Load all stack definitions
     */
    async loadStackDefs(): Promise<any[]> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.STACK_DEFS, 'readonly');
            const store = transaction.objectStore(STORES.STACK_DEFS);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear all stack definitions
     */
    async clearStackDefs(): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.STACK_DEFS, 'readwrite');
            const store = transaction.objectStore(STORES.STACK_DEFS);
            store.clear();

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // ============ Operation Log Operations ============

    /**
     * Save operation log
     */
    async saveOperationLog(log: Record<string, OrderEventStatus[]>): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.OPERATION_LOG, 'readwrite');
            const store = transaction.objectStore(STORES.OPERATION_LOG);
            store.clear();

            for (const [orderId, events] of Object.entries(log)) {
                store.put({ orderId, events });
            }

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     * Load operation log
     */
    async loadOperationLog(): Promise<Record<string, OrderEventStatus[]>> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.OPERATION_LOG, 'readonly');
            const store = transaction.objectStore(STORES.OPERATION_LOG);
            const request = store.getAll();

            request.onsuccess = () => {
                const result: Record<string, OrderEventStatus[]> = {};
                for (const item of request.result || []) {
                    result[item.orderId] = item.events;
                }
                resolve(result);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear operation log
     */
    async clearOperationLog(): Promise<void> {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORES.OPERATION_LOG, 'readwrite');
            const store = transaction.objectStore(STORES.OPERATION_LOG);
            store.clear();

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // ============ Utility Methods ============

    /**
     * Clear all data from all stores
     */
    async clearAll(): Promise<void> {
        await Promise.all([
            this.clearHistory(),
            this.clearRouteStackState(),
            this.clearStackDefs(),
            this.clearOperationLog()
        ]);
        console.log('[IndexedDB] All data cleared');
    }

    /**
     * Get approximate storage usage
     */
    async getStorageInfo(): Promise<{ history: number; stackDefs: number; total: number }> {
        const db = await this.ensureDB();

        const getCount = (storeName: string): Promise<number> => {
            return new Promise((resolve) => {
                const transaction = db.transaction(storeName, 'readonly');
                const store = transaction.objectStore(storeName);
                const request = store.count();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve(0);
            });
        };

        const [history, stackDefs] = await Promise.all([
            getCount(STORES.HISTORY),
            getCount(STORES.STACK_DEFS)
        ]);

        return { history, stackDefs, total: history + stackDefs };
    }
}

// Singleton instance
export const indexedDBService = new IndexedDBService();
export default indexedDBService;
