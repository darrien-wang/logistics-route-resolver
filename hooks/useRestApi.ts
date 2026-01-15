/**
 * useRestApi - React Hook for REST API integration
 *
 * This hook manages:
 * - HOST mode: Starts REST API server, handles incoming requests from renderer IPC
 * - CLIENT mode: Uses ApiClient to communicate with remote server
 * 
 * Replaces useLanSync.ts Socket.IO implementation with REST API pattern.
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { apiClient, ScanResult, StackInfo } from '../services/ApiClient';
import { ResolvedRouteInfo } from '../types';

export type ConnectionMode = 'host' | 'client' | 'disconnected';

export interface RestApiStatus {
    mode: ConnectionMode;
    connected: boolean;
    serverUrl: string | null;
    error?: string;
}

export interface UseRestApiProps {
    // For HOST mode: handler to process incoming scan requests
    onScanRequest?: (orderId: string, clientName?: string) => Promise<ScanResult>;
    // For HOST mode: get current stacks
    getStacks?: () => StackInfo[];
    // For HOST mode: get history
    getHistory?: (limit?: number) => ResolvedRouteInfo[];
}

export function useRestApi(props?: UseRestApiProps) {
    const { onScanRequest, getStacks, getHistory } = props || {};

    const [status, setStatus] = useState<RestApiStatus>({
        mode: 'disconnected',
        connected: false,
        serverUrl: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const cleanupFunctionsRef = useRef<(() => void)[]>([]);

    /**
     * Start as HOST - runs REST API server locally
     */
    const startHost = useCallback(async (port: number = 14059) => {
        setIsLoading(true);
        try {
            if (!window.restApi) {
                throw new Error('REST API not available - requires Electron');
            }

            // Start the REST API server
            const serverInfo = await window.restApi.startServer(port);
            console.log('[useRestApi] Server started:', serverInfo);

            // Setup IPC handlers for incoming requests
            if (onScanRequest) {
                const cleanupScan = window.restApi.onScanRequest(async (data) => {
                    console.log('[useRestApi] Received scan request:', data);
                    try {
                        const result = await onScanRequest(
                            data.request.orderId,
                            data.request.clientName
                        );
                        window.restApi!.sendScanResponse(data.requestId, result);
                    } catch (error: any) {
                        window.restApi!.sendScanResponse(data.requestId, {
                            success: false,
                            orderId: data.request.orderId,
                            error: error.message || 'Scan processing failed',
                        });
                    }
                });
                cleanupFunctionsRef.current.push(cleanupScan);
            }

            if (getStacks) {
                const cleanupStacks = window.restApi.onStacksRequest((data) => {
                    console.log('[useRestApi] Received stacks request');
                    const stacks = getStacks();
                    window.restApi!.sendStacksResponse(data.requestId, stacks);
                });
                cleanupFunctionsRef.current.push(cleanupStacks);
            }

            if (getHistory) {
                const cleanupHistory = window.restApi.onHistoryRequest((data) => {
                    console.log('[useRestApi] Received history request');
                    const history = getHistory(data.limit);
                    window.restApi!.sendHistoryResponse(data.requestId, history);
                });
                cleanupFunctionsRef.current.push(cleanupHistory);
            }

            setStatus({
                mode: 'host',
                connected: true,
                serverUrl: serverInfo.url,
            });

            // Also configure ApiClient to connect to self (for unified API access)
            apiClient.configure(`http://localhost:${port}`, 'Host');

            return serverInfo;
        } catch (error: any) {
            console.error('[useRestApi] Failed to start host:', error);
            setStatus({
                mode: 'disconnected',
                connected: false,
                serverUrl: null,
                error: error.message,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [onScanRequest, getStacks, getHistory]);

    /**
     * Connect as CLIENT to a remote server
     */
    const connectClient = useCallback(async (serverUrl: string, clientName?: string) => {
        setIsLoading(true);
        try {
            // Configure the API client
            apiClient.configure(serverUrl, clientName);

            // Check connection
            const connectionStatus = await apiClient.checkConnection();

            if (connectionStatus.connected) {
                setStatus({
                    mode: 'client',
                    connected: true,
                    serverUrl: serverUrl,
                });
                console.log('[useRestApi] Connected to server:', serverUrl);
            } else {
                throw new Error(connectionStatus.error || 'Connection failed');
            }
        } catch (error: any) {
            console.error('[useRestApi] Failed to connect:', error);
            setStatus({
                mode: 'disconnected',
                connected: false,
                serverUrl: null,
                error: error.message,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Disconnect from server or stop hosting
     */
    const disconnect = useCallback(async () => {
        setIsLoading(true);
        try {
            // Cleanup IPC handlers
            cleanupFunctionsRef.current.forEach((cleanup) => cleanup());
            cleanupFunctionsRef.current = [];

            // Stop server if we're hosting
            if (status.mode === 'host' && window.restApi) {
                await window.restApi.stopServer();
                console.log('[useRestApi] Server stopped');
            }

            // Disconnect API client
            apiClient.disconnect();

            setStatus({
                mode: 'disconnected',
                connected: false,
                serverUrl: null,
            });
        } catch (error: any) {
            console.error('[useRestApi] Disconnect error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [status.mode]);

    /**
     * Submit a scan (for CLIENT mode or HOST self-access)
     */
    const submitScan = useCallback(async (
        orderId: string,
        dimensions?: { weight?: number; volume?: number }
    ): Promise<ScanResult> => {
        if (status.mode === 'host' && onScanRequest) {
            // Host processes locally
            return onScanRequest(orderId, 'Host');
        } else if (status.mode === 'client') {
            // Client sends to server
            return apiClient.submitScan(orderId, dimensions);
        } else {
            return {
                success: false,
                orderId,
                error: 'Not connected to server',
            };
        }
    }, [status.mode, onScanRequest]);

    /**
     * Get stacks from server
     */
    const fetchStacks = useCallback(async (): Promise<StackInfo[]> => {
        if (status.mode === 'host' && getStacks) {
            return getStacks();
        } else if (status.mode === 'client') {
            return apiClient.getStacks();
        }
        return [];
    }, [status.mode, getStacks]);

    /**
     * Get history from server
     */
    const fetchHistory = useCallback(async (limit?: number): Promise<any[]> => {
        if (status.mode === 'host' && getHistory) {
            return getHistory(limit);
        } else if (status.mode === 'client') {
            return apiClient.getHistory(limit);
        }
        return [];
    }, [status.mode, getHistory]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanupFunctionsRef.current.forEach((cleanup) => cleanup());
        };
    }, []);

    return {
        status,
        isLoading,
        startHost,
        connectClient,
        disconnect,
        submitScan,
        fetchStacks,
        fetchHistory,
        isHost: status.mode === 'host',
        isClient: status.mode === 'client',
        isConnected: status.connected,
    };
}

export default useRestApi;
