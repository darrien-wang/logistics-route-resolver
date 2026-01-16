/**
 * RestApiServer - Express REST API server running in Electron main process
 *
 * Provides REST API endpoints for client devices to:
 * - Submit scans (resolve routes, assign stacks)
 * - Query stack states
 * - Health check
 *
 * This replaces Socket.IO with simple request-response pattern.
 * Server is AUTHORITATIVE for all route/stack assignments.
 * Clients receive data from server and can print locally.
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
import { networkInterfaces } from 'os';

export interface RestApiServerConfig {
    port: number;
}

export interface ServerInfo {
    port: number;
    localIp: string;
    url: string;
}

// Types for API requests/responses
export interface ScanRequest {
    orderId: string;
    clientName?: string;
    dimensions?: {
        weight?: number;
        volume?: number;
    };
}

export interface ScanResult {
    success: boolean;
    orderId: string;
    route?: {
        routeName: string;
        metroArea: string;
        state: string;
        destinationZone: string;
    };
    stack?: {
        stackNumber: number;
        currentCount: number;
        capacity: number;
        isStackFull: boolean;
        isNewStack: boolean;
    };
    printData?: {
        routeName: string;
        stackNumber: number;
        trackingNumber: string;
        dateStr: string;
    };
    error?: string;
    isException?: boolean;
}

export interface StackInfo {
    route: string;
    stackNumber: number;
    orderCount: number;
    weight: number;
    volume: number;
    capacity: number;
    isFull: boolean;
}

/**
 * Get local IP address from network interfaces
 */
function getLocalIpAddress(): string {
    const nets = networkInterfaces();

    for (const name of Object.keys(nets)) {
        const netInfos = nets[name];
        if (!netInfos) continue;

        for (const net of netInfos) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }

    return 'localhost';
}

/**
 * Message handler type - receives scan requests from API and processes them
 * This will be connected to the renderer process via IPC
 */
export type ScanHandler = (request: ScanRequest) => Promise<ScanResult>;
export type GetStacksHandler = () => Promise<StackInfo[]>;
export type GetHistoryHandler = (limit?: number) => Promise<any[]>;

export class RestApiServer {
    private app: Express;
    private httpServer: HttpServer | null = null;
    private config: RestApiServerConfig;
    private serverInfo: ServerInfo | null = null;

    // Handlers set by main process
    private scanHandler: ScanHandler | null = null;
    private getStacksHandler: GetStacksHandler | null = null;
    private getHistoryHandler: GetHistoryHandler | null = null;

    constructor(config: RestApiServerConfig) {
        this.config = config;
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    /**
     * Setup Express middleware
     */
    private setupMiddleware(): void {
        // CORS - allow requests from any origin (local network)
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        // JSON body parsing
        this.app.use(express.json());

        // Request logging
        this.app.use((req: Request, _res: Response, next: NextFunction) => {
            console.log(`[RestAPI] ${req.method} ${req.path}`);
            next();
        });
    }

    /**
     * Setup API routes
     */
    private setupRoutes(): void {
        // Health check endpoint
        this.app.get('/api/health', (_req: Request, res: Response) => {
            res.json({
                status: 'ok',
                timestamp: Date.now(),
                serverTime: new Date().toISOString(),
            });
        });

        // Submit scan - main endpoint for clients
        this.app.post('/api/scan', async (req: Request, res: Response) => {
            try {
                const scanRequest: ScanRequest = req.body;

                if (!scanRequest.orderId) {
                    res.status(400).json({
                        success: false,
                        error: 'orderId is required',
                    });
                    return;
                }

                if (!this.scanHandler) {
                    res.status(503).json({
                        success: false,
                        error: 'Scan handler not configured',
                    });
                    return;
                }

                const result = await this.scanHandler(scanRequest);
                res.json(result);
            } catch (error: any) {
                console.error('[RestAPI] Scan error:', error);
                res.status(500).json({
                    success: false,
                    error: error.message || 'Internal server error',
                });
            }
        });

        // Get all stacks - for display/monitoring
        this.app.get('/api/stacks', async (_req: Request, res: Response) => {
            try {
                if (!this.getStacksHandler) {
                    res.status(503).json({
                        error: 'Stacks handler not configured',
                    });
                    return;
                }

                const stacks = await this.getStacksHandler();
                res.json({
                    stacks,
                    timestamp: Date.now(),
                });
            } catch (error: any) {
                console.error('[RestAPI] Get stacks error:', error);
                res.status(500).json({
                    error: error.message || 'Internal server error',
                });
            }
        });

        // Get history - for viewing recent scans
        this.app.get('/api/history', async (req: Request, res: Response) => {
            try {
                if (!this.getHistoryHandler) {
                    res.status(503).json({
                        error: 'History handler not configured',
                    });
                    return;
                }

                const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
                const history = await this.getHistoryHandler(limit);
                res.json({
                    history,
                    count: history.length,
                    timestamp: Date.now(),
                });
            } catch (error: any) {
                console.error('[RestAPI] Get history error:', error);
                res.status(500).json({
                    error: error.message || 'Internal server error',
                });
            }
        });

        // Server info - for clients to get connection details
        this.app.get('/api/info', (_req: Request, res: Response) => {
            res.json({
                serverInfo: this.serverInfo,
                timestamp: Date.now(),
            });
        });

        // 404 handler
        this.app.use((_req: Request, res: Response) => {
            res.status(404).json({
                error: 'Endpoint not found',
            });
        });
    }

    /**
     * Set the scan handler (called by main process)
     */
    onScan(handler: ScanHandler): void {
        this.scanHandler = handler;
    }

    /**
     * Set the get stacks handler
     */
    onGetStacks(handler: GetStacksHandler): void {
        this.getStacksHandler = handler;
    }

    /**
     * Set the get history handler
     */
    onGetHistory(handler: GetHistoryHandler): void {
        this.getHistoryHandler = handler;
    }

    /**
     * Start the REST API server
     */
    async start(): Promise<ServerInfo> {
        if (this.httpServer) {
            throw new Error('Server is already running');
        }

        this.httpServer = createServer(this.app);
        // Set timeout to 45 seconds (slightly longer than logic timeout) to prevent socket hangup
        this.httpServer.timeout = 45000;

        // Start listening on all network interfaces
        await new Promise<void>((resolve, reject) => {
            this.httpServer!.listen(this.config.port, '0.0.0.0', () => {
                console.log(`[RestAPI] Listening on 0.0.0.0:${this.config.port}`);
                resolve();
            }).on('error', (err: Error) => {
                console.error(`[RestAPI] Failed to start server:`, err);
                reject(err);
            });
        });

        // Get local IP address
        const localIp = getLocalIpAddress();
        const url = `http://${localIp}:${this.config.port}`;

        console.log(`[RestAPI] Server started at ${url}`);
        console.log(`[RestAPI] Endpoints available:`);
        console.log(`  GET  ${url}/api/health`);
        console.log(`  POST ${url}/api/scan`);
        console.log(`  GET  ${url}/api/stacks`);
        console.log(`  GET  ${url}/api/history`);

        this.serverInfo = {
            port: this.config.port,
            localIp,
            url,
        };

        return this.serverInfo;
    }

    /**
     * Stop the server
     */
    async stop(): Promise<void> {
        if (!this.httpServer) {
            return;
        }

        console.log('[RestAPI] Stopping server...');

        await new Promise<void>((resolve) => {
            this.httpServer!.close(() => {
                console.log('[RestAPI] Server stopped');
                resolve();
            });
        });

        this.httpServer = null;
        this.serverInfo = null;
    }

    /**
     * Check if server is running
     */
    isRunning(): boolean {
        return this.httpServer !== null;
    }

    /**
     * Get server info
     */
    getServerInfo(): ServerInfo | null {
        return this.serverInfo;
    }
}

export default RestApiServer;
