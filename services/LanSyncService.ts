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
    clientName?: string;
}

export interface ScanAction {
    orderId: string;
    routeName: string;
    dimensions?: {
        weight: number;
        volume: number;
    };
    timestamp: number;
    clientName?: string;
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
    clientName?: string; // For client mode - display name
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

const LAN_CONFIG_KEY = 'LOGISTICS_LAN_CONFIG';

interface PersistedLanConfig {
    mode: SyncMode;
    hostIp?: string;
    hostPort?: number;
    clientName?: string;
    isManualDisconnect: boolean;
}

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
    private clientName: string = '';

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
            this.saveConnectionConfig();  // Save config after successful connection
        } else if (this.mode === 'client') {
            await this.startClientMode();
            this.saveConnectionConfig();  // Save config after successful connection
        } else {
            this.updateConnectionStatus({
                connected: false,
                mode: 'standalone',
            });
        }
    }

    /**
     * Save current connection config to localStorage
     */
    private saveConnectionConfig(): void {
        const persistedConfig: PersistedLanConfig = {
            mode: this.mode,
            hostIp: this.config.hostIp,
            hostPort: this.config.hostPort,
            clientName: this.config.clientName,
            isManualDisconnect: false
        };
        localStorage.setItem(LAN_CONFIG_KEY, JSON.stringify(persistedConfig));
        console.log('[LanSync] Connection config saved');
    }

    /**
     * Clear saved connection config (called on manual disconnect)
     */
    private clearConnectionConfig(): void {
        const persistedConfig: PersistedLanConfig = {
            mode: 'standalone',
            isManualDisconnect: true
        };
        localStorage.setItem(LAN_CONFIG_KEY, JSON.stringify(persistedConfig));
        console.log('[LanSync] Connection config cleared (manual disconnect)');
    }

    /**
     * Get saved connection config from localStorage
     */
    getSavedConfig(): PersistedLanConfig | null {
        try {
            const saved = localStorage.getItem(LAN_CONFIG_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('[LanSync] Failed to load saved config:', e);
        }
        return null;
    }

    /**
     * Attempt auto-reconnection based on saved config
     * Returns true if reconnection was attempted, false otherwise
     */
    async attemptAutoReconnect(): Promise<boolean> {
        const saved = this.getSavedConfig();

        if (!saved || saved.isManualDisconnect || saved.mode === 'standalone') {
            console.log('[LanSync] No auto-reconnect needed (manual disconnect or standalone)');
            return false;
        }

        // Don't reconnect if already connected
        if (this.isConnected()) {
            console.log('[LanSync] Already connected, skipping auto-reconnect');
            return false;
        }

        console.log(`[LanSync] Attempting auto-reconnect as ${saved.mode}...`);

        try {
            await this.initialize({
                mode: saved.mode,
                hostIp: saved.hostIp,
                hostPort: saved.hostPort,
                clientName: saved.clientName
            });
            console.log('[LanSync] Auto-reconnect successful');
            return true;
        } catch (error) {
            console.error('[LanSync] Auto-reconnect failed:', error);
            return false;
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

        // Store client name for display
        this.clientName = this.config.clientName || `Client-${Date.now().toString(36).slice(-4)}`;

        console.log(`[LanSync] Connecting to Host at ${url} as "${this.clientName}"...`);

        this.socket = io(url, {
            reconnection: true,
            reconnectionDelay: 1000,           // Start with 1 second
            reconnectionDelayMax: 10000,       // Max 10 seconds between attempts
            reconnectionAttempts: Infinity,    // Never stop trying
            timeout: 10000,                    // 10 second connection timeout
            randomizationFactor: 0.5,          // Add randomness to prevent thundering herd
            auth: {
                clientName: this.clientName,   // Send client name to Host
            },
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
            console.log(`[LanSync] Connected to Host as "${this.clientName}"`);
            this.updateConnectionStatus({
                connected: true,
                mode: 'client',
                hostIp: this.config.hostIp,
                clientName: this.clientName,
            });
            this.emit(SYNC_EVENTS.CONNECTION, null);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('[LanSync] Disconnected from Host, reason:', reason);
            this.updateConnectionStatus({
                connected: false,
                mode: 'client',
                hostIp: this.config.hostIp,
                clientName: this.clientName,
            });
            this.emit(SYNC_EVENTS.DISCONNECT, { reason });
        });

        // Reconnection events for better UX
        this.socket.io.on('reconnect_attempt', (attempt) => {
            console.log(`[LanSync] Reconnection attempt #${attempt}...`);
            this.emit('reconnecting', { attempt });
        });

        this.socket.io.on('reconnect', (attempt) => {
            console.log(`[LanSync] Reconnected after ${attempt} attempts`);
            // Request full state sync after reconnection
            this.socket?.emit('request:fullSync');
            this.emit('reconnected', { attempt });
        });

        this.socket.io.on('reconnect_error', (error) => {
            console.log('[LanSync] Reconnection error:', error.message);
            this.emit('reconnect_error', { error: error.message });
        });

        this.socket.io.on('reconnect_failed', () => {
            console.log('[LanSync] Reconnection failed after all attempts');
            this.emit('reconnect_failed', null);
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

        const actionWithIdentity = { ...action, clientName: this.clientName };
        console.log('[LanSync] Sending scan action to Host:', actionWithIdentity);
        this.socket.emit(SYNC_EVENTS.ACTION_SCAN, actionWithIdentity);
    }

    /**
     * Request sync from Host with configurable amount (Client mode only)
     * @param amount - 'full' for all history, or a number (200, 500, etc.)
     */
    requestSync(amount: 'full' | number = 'full'): void {
        if (this.mode !== 'client' || !this.socket?.connected) {
            console.warn('[LanSync] Cannot request sync - not in client mode or not connected');
            return;
        }

        console.log(`[LanSync] Requesting sync from Host: ${amount}`);
        this.socket.emit('client:requestSync', { amount });
    }

    /**
     * Push local history data to Host
     * Used for merging offline scans or manual sync
     */
    pushDataToHost(history: any[]): void {
        if (this.mode !== 'client' || !this.socket?.connected) {
            console.warn('[LanSync] Cannot push data - not in client mode or not connected');
            return;
        }

        console.log(`[LanSync] Pushing ${history.length} items to Host`);
        this.socket.emit('client:pushData', {
            history,
            clientName: this.clientName
        });
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
     * @param isManual - If true, this is a manual disconnect and we should not auto-reconnect
     */
    async disconnect(isManual: boolean = true): Promise<void> {
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

        if (isManual) {
            this.clearConnectionConfig();  // Mark as manual disconnect
        }

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
