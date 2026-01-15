/**
 * ApiClient - HTTP Client for REST API communication
 *
 * Used by both Host UI (connecting to localhost) and Client devices
 * (connecting to server IP) to communicate with the REST API server.
 *
 * This provides a simple request-response model replacing Socket.IO sync.
 */

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

export interface ServerStatus {
    connected: boolean;
    serverUrl: string | null;
    error?: string;
}

class ApiClient {
    private baseUrl: string = '';
    private isConnected: boolean = false;
    private clientName: string = '';

    /**
     * Configure the client to connect to a server
     */
    configure(serverUrl: string, clientName?: string): void {
        this.baseUrl = serverUrl.replace(/\/$/, ''); // Remove trailing slash
        this.clientName = clientName || `Client-${Date.now().toString(36).slice(-4)}`;
        console.log(`[ApiClient] Configured to connect to: ${this.baseUrl}`);
    }

    /**
     * Check connection to server (health check)
     */
    async checkConnection(): Promise<ServerStatus> {
        if (!this.baseUrl) {
            return {
                connected: false,
                serverUrl: null,
                error: 'Server URL not configured',
            };
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                this.isConnected = true;
                return {
                    connected: true,
                    serverUrl: this.baseUrl,
                };
            } else {
                this.isConnected = false;
                return {
                    connected: false,
                    serverUrl: this.baseUrl,
                    error: `Server returned ${response.status}`,
                };
            }
        } catch (error: any) {
            this.isConnected = false;
            return {
                connected: false,
                serverUrl: this.baseUrl,
                error: error.message || 'Connection failed',
            };
        }
    }

    /**
     * Submit a scan to the server
     * Server will resolve route, assign stack, and return print data
     */
    async submitScan(orderId: string, dimensions?: { weight?: number; volume?: number }): Promise<ScanResult> {
        if (!this.baseUrl) {
            return {
                success: false,
                orderId,
                error: 'Not connected to server',
            };
        }

        try {
            const scanRequest: ScanRequest = {
                orderId,
                clientName: this.clientName,
                dimensions,
            };

            const response = await fetch(`${this.baseUrl}/api/scan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scanRequest),
            });

            const result = await response.json();
            return result as ScanResult;
        } catch (error: any) {
            console.error('[ApiClient] Scan error:', error);
            return {
                success: false,
                orderId,
                error: error.message || 'Network error',
            };
        }
    }

    /**
     * Get all stacks from server
     */
    async getStacks(): Promise<StackInfo[]> {
        if (!this.baseUrl) {
            console.warn('[ApiClient] Cannot get stacks - not connected');
            return [];
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/stacks`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            return data.stacks || [];
        } catch (error: any) {
            console.error('[ApiClient] Get stacks error:', error);
            return [];
        }
    }

    /**
     * Get history from server
     */
    async getHistory(limit: number = 100): Promise<any[]> {
        if (!this.baseUrl) {
            console.warn('[ApiClient] Cannot get history - not connected');
            return [];
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/history?limit=${limit}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            return data.history || [];
        } catch (error: any) {
            console.error('[ApiClient] Get history error:', error);
            return [];
        }
    }

    /**
     * Check if connected
     */
    getIsConnected(): boolean {
        return this.isConnected;
    }

    /**
     * Get current server URL
     */
    getServerUrl(): string {
        return this.baseUrl;
    }

    /**
     * Get client name
     */
    getClientName(): string {
        return this.clientName;
    }

    /**
     * Disconnect from server
     */
    disconnect(): void {
        this.baseUrl = '';
        this.isConnected = false;
        console.log('[ApiClient] Disconnected');
    }
}

// Singleton instance
export const apiClient = new ApiClient();
export default apiClient;
