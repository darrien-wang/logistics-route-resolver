/**
 * RestApiContext - Global state for REST API connection
 * 
 * Persists connection status across view changes.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { apiClient } from '../services/ApiClient';
import type { SyncServerInfo } from '../types';

export type ConnectionMode = 'host' | 'client' | 'disconnected';

export interface ConnectionStatus {
    mode: ConnectionMode;
    connected: boolean;
    serverUrl: string | null;
    serverInfo?: SyncServerInfo;
    error?: string;
}

interface RestApiContextValue {
    status: ConnectionStatus;
    isLoading: boolean;
    startHost: (port?: number) => Promise<SyncServerInfo>;
    connectClient: (serverUrl: string, clientName?: string) => Promise<void>;
    disconnect: () => Promise<void>;
}

const defaultStatus: ConnectionStatus = {
    mode: 'disconnected',
    connected: false,
    serverUrl: null,
};

const RestApiContext = createContext<RestApiContextValue | null>(null);

export function RestApiProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<ConnectionStatus>(defaultStatus);
    const [isLoading, setIsLoading] = useState(false);

    // Check for existing server on mount
    useEffect(() => {
        const checkExistingServer = async () => {
            if (window.restApi) {
                try {
                    const serverStatus = await window.restApi.getServerStatus();
                    if (serverStatus.running && serverStatus.serverInfo) {
                        setStatus({
                            mode: 'host',
                            connected: true,
                            serverUrl: serverStatus.serverInfo.url,
                            serverInfo: serverStatus.serverInfo,
                        });
                        console.log('[RestApiContext] Found running server:', serverStatus.serverInfo);
                    }
                } catch (e) {
                    console.log('[RestApiContext] No existing server');
                }
            }

            // Check for saved client connection
            const savedServerUrl = localStorage.getItem('REST_API_SERVER_URL');
            const savedClientName = localStorage.getItem('REST_API_CLIENT_NAME');
            if (savedServerUrl && !status.connected) {
                // Auto-reconnect attempt
                try {
                    apiClient.configure(savedServerUrl, savedClientName || undefined);
                    const connectionStatus = await apiClient.checkConnection();
                    if (connectionStatus.connected) {
                        setStatus({
                            mode: 'client',
                            connected: true,
                            serverUrl: savedServerUrl,
                        });
                        console.log('[RestApiContext] Auto-reconnected to:', savedServerUrl);
                    }
                } catch (e) {
                    console.log('[RestApiContext] Auto-reconnect failed');
                }
            }
        };

        checkExistingServer();
    }, []);

    const startHost = useCallback(async (port: number = 14059): Promise<SyncServerInfo> => {
        setIsLoading(true);
        try {
            if (!window.restApi) {
                throw new Error('REST API not available - requires Electron');
            }

            const serverInfo = await window.restApi.startServer(port);

            setStatus({
                mode: 'host',
                connected: true,
                serverUrl: serverInfo.url,
                serverInfo: serverInfo,
            });

            // Clear any saved client connection
            localStorage.removeItem('REST_API_SERVER_URL');

            console.log('[RestApiContext] Host started:', serverInfo);
            return serverInfo;
        } catch (error: any) {
            setStatus(prev => ({ ...prev, error: error.message }));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const connectClient = useCallback(async (serverUrl: string, clientName?: string) => {
        setIsLoading(true);
        try {
            const name = clientName || `Client-${Date.now().toString(36).slice(-4)}`;

            apiClient.configure(serverUrl, name);
            const connectionStatus = await apiClient.checkConnection();

            if (connectionStatus.connected) {
                setStatus({
                    mode: 'client',
                    connected: true,
                    serverUrl: serverUrl,
                });

                // Save for auto-reconnect
                localStorage.setItem('REST_API_SERVER_URL', serverUrl);
                localStorage.setItem('REST_API_CLIENT_NAME', name);

                console.log('[RestApiContext] Connected to:', serverUrl);
            } else {
                throw new Error(connectionStatus.error || 'Connection failed');
            }
        } catch (error: any) {
            setStatus(prev => ({ ...prev, error: error.message }));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const disconnect = useCallback(async () => {
        setIsLoading(true);
        try {
            if (status.mode === 'host' && window.restApi) {
                await window.restApi.stopServer();
                console.log('[RestApiContext] Host stopped');
            }

            apiClient.disconnect();
            localStorage.removeItem('REST_API_SERVER_URL');

            setStatus(defaultStatus);
        } catch (error: any) {
            console.error('[RestApiContext] Disconnect error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [status.mode]);

    return (
        <RestApiContext.Provider value={{ status, isLoading, startHost, connectClient, disconnect }}>
            {children}
        </RestApiContext.Provider>
    );
}

export function useRestApiContext() {
    const context = useContext(RestApiContext);
    if (!context) {
        throw new Error('useRestApiContext must be used within a RestApiProvider');
    }
    return context;
}
