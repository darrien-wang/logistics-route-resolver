/**
 * HostServer - Socket.IO server running in Electron main process
 *
 * Manages WebSocket connections from clients and relays messages
 * between the main window (Host UI) and connected clients.
 */

import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { internalIpV4 } from 'internal-ip';

export interface HostServerConfig {
    port: number;
}

export interface ServerInfo {
    port: number;
    localIp: string;
    url: string;
}

const SYNC_EVENTS = {
    SYNC_STATE: 'sync:state',
    ACTION_SCAN: 'action:scan',
    STATE_UPDATE: 'state:update',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
} as const;

export class HostServer {
    private io: Server | null = null;
    private httpServer: any = null;
    private connectedClients: Map<string, Socket> = new Map();
    private config: HostServerConfig;
    private messageHandler: ((event: string, data: any, clientId: string) => void) | null = null;

    constructor(config: HostServerConfig) {
        this.config = config;
    }

    /**
     * Start the Socket.IO server
     */
    async start(): Promise<ServerInfo> {
        if (this.io) {
            throw new Error('Server is already running');
        }

        // Create HTTP server
        this.httpServer = createServer();

        // Create Socket.IO server with CORS enabled for local network
        this.io = new Server(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        // Setup connection handler
        this.setupConnectionHandler();

        // Start listening
        await new Promise<void>((resolve, reject) => {
            this.httpServer!.listen(this.config.port, () => {
                console.log(`[HostServer] Listening on port ${this.config.port}`);
                resolve();
            }).on('error', (err: Error) => {
                reject(err);
            });
        });

        // Get local IP address
        const localIp = await internalIpV4() || 'localhost';
        const url = `http://${localIp}:${this.config.port}`;

        console.log(`[HostServer] Server started at ${url}`);
        console.log(`[HostServer] Clients can connect using this address`);

        return {
            port: this.config.port,
            localIp,
            url,
        };
    }

    /**
     * Setup Socket.IO connection handler
     */
    private setupConnectionHandler(): void {
        if (!this.io) return;

        this.io.on('connection', (socket: Socket) => {
            const clientId = socket.id;
            console.log(`[HostServer] Client connected: ${clientId}`);

            // Store client connection
            this.connectedClients.set(clientId, socket);

            // Notify main window about new client
            if (this.messageHandler) {
                this.messageHandler('client:connected', { clientId }, clientId);
            }

            // Handle scan actions from client
            socket.on(SYNC_EVENTS.ACTION_SCAN, (data) => {
                console.log(`[HostServer] Received scan action from ${clientId}:`, data);

                // Forward to main window (Host UI) for processing
                if (this.messageHandler) {
                    this.messageHandler(SYNC_EVENTS.ACTION_SCAN, data, clientId);
                }
            });

            // Handle client disconnect
            socket.on('disconnect', () => {
                console.log(`[HostServer] Client disconnected: ${clientId}`);
                this.connectedClients.delete(clientId);

                // Notify main window about client disconnect
                if (this.messageHandler) {
                    this.messageHandler('client:disconnected', { clientId }, clientId);
                }
            });
        });
    }

    /**
     * Broadcast state update to all connected clients
     */
    broadcastStateUpdate(state: any): void {
        if (!this.io) {
            console.warn('[HostServer] Cannot broadcast - server not running');
            return;
        }

        console.log(`[HostServer] Broadcasting state update to ${this.connectedClients.size} clients`);
        this.io.emit(SYNC_EVENTS.STATE_UPDATE, state);
    }

    /**
     * Send full state sync to a specific client (usually on connect)
     */
    syncStateToClient(clientId: string, state: any): void {
        const client = this.connectedClients.get(clientId);
        if (!client) {
            console.warn(`[HostServer] Cannot sync - client ${clientId} not found`);
            return;
        }

        console.log(`[HostServer] Syncing full state to client ${clientId}`);
        client.emit(SYNC_EVENTS.SYNC_STATE, state);
    }

    /**
     * Register handler for messages from clients
     */
    onMessage(handler: (event: string, data: any, clientId: string) => void): void {
        this.messageHandler = handler;
    }

    /**
     * Get number of connected clients
     */
    getClientCount(): number {
        return this.connectedClients.size;
    }

    /**
     * Get list of connected client IDs
     */
    getConnectedClients(): string[] {
        return Array.from(this.connectedClients.keys());
    }

    /**
     * Stop the server
     */
    async stop(): Promise<void> {
        if (!this.io) {
            return;
        }

        console.log('[HostServer] Stopping server...');

        // Disconnect all clients
        this.connectedClients.forEach((socket) => {
            socket.disconnect(true);
        });
        this.connectedClients.clear();

        // Close Socket.IO
        await new Promise<void>((resolve) => {
            this.io!.close(() => {
                console.log('[HostServer] Socket.IO closed');
                resolve();
            });
        });

        // Close HTTP server
        if (this.httpServer) {
            await new Promise<void>((resolve) => {
                this.httpServer.close(() => {
                    console.log('[HostServer] HTTP server closed');
                    resolve();
                });
            });
        }

        this.io = null;
        this.httpServer = null;
        this.messageHandler = null;

        console.log('[HostServer] Server stopped');
    }

    /**
     * Check if server is running
     */
    isRunning(): boolean {
        return this.io !== null;
    }
}

export default HostServer;
