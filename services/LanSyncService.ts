/**
 * LanSyncService - Manages LAN synchronization between multiple devices
 *
 * Implements a Host-Client model for real-time data synchronization:
 * - Host: Runs Socket.IO server, maintains source of truth
 * - Client: Connects to Host, sends actions and receives state updates
 */

import { io, Socket } from 'socket.io-client';
import { RouteStackInfo } from './RouteStackService';

export type SyncMode = 'host' | 'client' | 'standalone';

export interface SyncConfig {
    mode: SyncMode;
    hostIp?: string;
    hostPort?: number;
}

export interface ScanAction {
    orderId: string;
    routeName: string;
    dimensions?: {
        weight: number;
        volume: number;
    };
    timestamp: number;
}

export interface StateSnapshot {
    routeStacks: Map<string, RouteStackInfo>;
    operationLog: any[];
    timestamp: number;
}

export interface ConnectionStatus {
    connected: boolean;
    mode: SyncMode;
    clientCount?: number; // For host mode
    hostIp?: string; // For client mode
}

// Event names
export const SYNC_EVENTS = {
    SYNC_STATE: 'sync:state',
    ACTION_SCAN: 'action:scan',
    STATE_UPDATE: 'state:update',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    CLIENT_CONNECTED: 'client:connected',
    CLIENT_DISCONNECTED: 'client:disconnected',
} as const;

type EventCallback = (...args: any[]) => void;

class LanSyncService {
    private mode: SyncMode = 'standalone';
    private socket: Socket | null = null;
    private config: SyncConfig = { mode: 'standalone' };
    private eventHandlers: Map<string, Set<EventCallback>> = new Map();
    private connectionStatus: ConnectionStatus = {
        connected: false,
        mode: 'standalone',
    };

    // Track pending prints for CLIENT mode - orders that need to be printed when result comes back
    private pendingPrints: Set<string> = new Set();

    /**
     * Initialize the sync service with configuration
     */
    async initialize(config: SyncConfig): Promise<void> {
        this.config = config;
        this.mode = config.mode;

        if (this.mode === 'host') {
            await this.startHostMode();
        } else if (this.mode === 'client') {
            await this.startClientMode();
        } else {
            this.updateConnectionStatus({
                connected: false,
                mode: 'standalone',
            });
        }
    }

    /**
     * Start as Host - Server runs in Electron main process
     * This method just sets up the renderer-side handlers
     */
    private async startHostMode(): Promise<void> {
        console.log('[LanSync] Starting in Host mode...');

        // Use Electron IPC to start server in main process
        if (window.electron?.startSyncServer) {
            try {
                const serverInfo = await window.electron.startSyncServer();
                this.updateConnectionStatus({
                    connected: true,
                    mode: 'host',
                    clientCount: 0,
                });
                console.log('[LanSync] Host server started:', serverInfo);
            } catch (error) {
                console.error('[LanSync] Failed to start host server:', error);
                throw error;
            }
        } else {
            throw new Error('Electron IPC not available for Host mode');
        }
    }

    /**
     * Start as Client - Connect to Host
     */
    private async startClientMode(): Promise<void> {
        const hostIp = this.config.hostIp || 'localhost';
        const hostPort = this.config.hostPort || 14059;
        const url = `http://${hostIp}:${hostPort}`;

        console.log(`[LanSync] Connecting to Host at ${url}...`);

        this.socket = io(url, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            timeout: 10000, // 10 second connection timeout
        });

        // Wait for connection to succeed or fail
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(new Error('Failed to create socket'));
                return;
            }

            const timeoutId = setTimeout(() => {
                reject(new Error('Connection timeout - could not reach host'));
            }, 10000);

            this.socket.once('connect', () => {
                clearTimeout(timeoutId);
                console.log('[LanSync] Successfully connected to Host');
                resolve();
            });

            this.socket.once('connect_error', (error) => {
                clearTimeout(timeoutId);
                console.error('[LanSync] Connection error:', error);
                reject(new Error(`Failed to connect: ${error.message}`));
            });

            // Setup all event handlers
            this.setupClientEventHandlers();
        });
    }

    /**
     * Setup event handlers for Client mode
     */
    private setupClientEventHandlers(): void {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('[LanSync] Connected to Host');
            this.updateConnectionStatus({
                connected: true,
                mode: 'client',
                hostIp: this.config.hostIp,
            });
            this.emit('connect', null);
        });

        this.socket.on('disconnect', () => {
            console.log('[LanSync] Disconnected from Host');
            this.updateConnectionStatus({
                connected: false,
                mode: 'client',
                hostIp: this.config.hostIp,
            });
            this.emit('disconnect', null);
        });

        // Receive full state sync from Host
        this.socket.on(SYNC_EVENTS.SYNC_STATE, (state: StateSnapshot) => {
            console.log('[LanSync] Received state sync from Host');
            this.emit(SYNC_EVENTS.SYNC_STATE, state);
        });

        // Receive state updates from Host
        this.socket.on(SYNC_EVENTS.STATE_UPDATE, (state: StateSnapshot) => {
            console.log('[LanSync] Received state update from Host');
            this.emit(SYNC_EVENTS.STATE_UPDATE, state);
        });
    }

    /**
     * Send scan action to Host (Client mode only)
     */
    sendScanAction(action: ScanAction): void {
        if (this.mode !== 'client' || !this.socket?.connected) {
            console.warn('[LanSync] Cannot send scan action - not in client mode or not connected');
            return;
        }

        console.log('[LanSync] Sending scan action to Host:', action);
        this.socket.emit(SYNC_EVENTS.ACTION_SCAN, action);
    }

    /**
     * Broadcast state update to all clients (Host mode only)
     * This is called via Electron IPC
     */
    broadcastStateUpdate(state: StateSnapshot): void {
        if (this.mode !== 'host') {
            console.warn('[LanSync] Cannot broadcast - not in host mode');
            return;
        }

        // Use Electron IPC to broadcast through main process
        if (window.electron?.broadcastSyncState) {
            window.electron.broadcastSyncState(state);
        }
    }

    /**
     * Register event handler
     */
    on(event: string, callback: EventCallback): void {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, new Set());
        }
        this.eventHandlers.get(event)!.add(callback);
    }

    /**
     * Unregister event handler
     */
    off(event: string, callback: EventCallback): void {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.delete(callback);
        }
    }

    /**
     * Emit event to registered handlers
     */
    private emit(event: string, data: any): void {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.forEach(callback => callback(data));
        }
    }

    /**
     * Update connection status and notify listeners
     */
    private updateConnectionStatus(status: ConnectionStatus): void {
        this.connectionStatus = status;
        this.emit('status', status);
    }

    /**
     * Get current connection status
     */
    getStatus(): ConnectionStatus {
        return { ...this.connectionStatus };
    }

    /**
     * Get current mode
     */
    getMode(): SyncMode {
        return this.mode;
    }

    /**
     * Disconnect and cleanup
     */
    async disconnect(): Promise<void> {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

        if (this.mode === 'host' && window.electron?.stopSyncServer) {
            await window.electron.stopSyncServer();
        }

        this.updateConnectionStatus({
            connected: false,
            mode: 'standalone',
        });

        this.eventHandlers.clear();
        this.mode = 'standalone';
    }

    /**
     * Check if currently connected
     */
    isConnected(): boolean {
        return this.connectionStatus.connected;
    }

    /**
     * Check if in host mode
     */
    isHost(): boolean {
        return this.mode === 'host';
    }

    /**
     * Check if in client mode
     */
    isClient(): boolean {
        return this.mode === 'client';
    }

    /**
     * Register an order as needing to print when result comes back (CLIENT mode)
     */
    registerPendingPrint(orderId: string): void {
        if (this.mode === 'client') {
            console.log(`[LanSync] Registering pending print for: ${orderId}`);
            this.pendingPrints.add(orderId.toUpperCase());
        }
    }

    /**
     * Check if an order is pending print and remove it if so (returns true if it was pending)
     */
    consumePendingPrint(orderId: string): boolean {
        const upperOrderId = orderId.toUpperCase();
        if (this.pendingPrints.has(upperOrderId)) {
            this.pendingPrints.delete(upperOrderId);
            return true;
        }
        return false;
    }

    /**
     * Get all pending print order IDs
     */
    getPendingPrints(): string[] {
        return Array.from(this.pendingPrints);
    }

    /**
     * Clear pending print for an order
     */
    clearPendingPrint(orderId: string): void {
        this.pendingPrints.delete(orderId.toUpperCase());
    }
}

// Singleton instance
export const lanSyncService = new LanSyncService();
export default lanSyncService;
