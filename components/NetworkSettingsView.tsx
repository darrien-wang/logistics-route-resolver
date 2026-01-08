import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Server, Users, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { lanSyncService, type SyncMode, type ConnectionStatus } from '../services/LanSyncService';
import type { SyncServerInfo, SyncServerStatus } from '../types';

const NetworkSettingsView: React.FC = () => {
    const [syncMode, setSyncMode] = useState<SyncMode>('standalone');
    const [hostIp, setHostIp] = useState('');
    const [hostPort, setHostPort] = useState('14059');
    const [serverInfo, setServerInfo] = useState<SyncServerInfo | null>(null);
    const [serverStatus, setServerStatus] = useState<SyncServerStatus | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
        connected: false,
        mode: 'standalone',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Subscribe to connection status updates
        const handleStatusChange = (status: ConnectionStatus) => {
            setConnectionStatus(status);
        };

        lanSyncService.on('status', handleStatusChange);

        // Get initial status
        const initialStatus = lanSyncService.getStatus();
        setConnectionStatus(initialStatus);
        setSyncMode(initialStatus.mode);

        // Poll server status if in host mode
        let statusInterval: NodeJS.Timeout | null = null;
        if (initialStatus.mode === 'host') {
            updateServerStatus();
            statusInterval = setInterval(updateServerStatus, 3000);
        }

        return () => {
            lanSyncService.off('status', handleStatusChange);
            if (statusInterval) clearInterval(statusInterval);
        };
    }, []);

    const updateServerStatus = async () => {
        if (window.electron?.getSyncServerStatus) {
            try {
                const status = await window.electron.getSyncServerStatus();
                setServerStatus(status);
            } catch (err) {
                console.error('Failed to get server status:', err);
            }
        }
    };

    const handleStartHost = async () => {
        setLoading(true);
        setError(null);

        try {
            const port = parseInt(hostPort) || 14059;
            const info = await window.electron!.startSyncServer(port);
            setServerInfo(info);

            await lanSyncService.initialize({ mode: 'host', hostPort: port });

            setServerStatus({
                running: true,
                clientCount: 0,
                clients: []
            });

            setSyncMode('host');
            // Directly update connectionStatus to trigger UI refresh
            setConnectionStatus({
                connected: true,
                mode: 'host',
                clientCount: 0,
            });
            setError(null);

            // Poll server status
            const statusInterval = setInterval(updateServerStatus, 3000);
            return () => clearInterval(statusInterval);
        } catch (err: any) {
            setError(err.message || 'Failed to start host server');
            console.error('Failed to start host:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConnectClient = async () => {
        if (!hostIp.trim()) {
            setError('Please enter host IP address');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const port = parseInt(hostPort) || 14059;
            await lanSyncService.initialize({
                mode: 'client',
                hostIp: hostIp.trim(),
                hostPort: port,
            });

            setSyncMode('client');
            // Directly update connectionStatus to trigger UI refresh
            setConnectionStatus({
                connected: true,
                mode: 'client',
                hostIp: hostIp.trim(),
            });
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to connect to host');
            console.error('Failed to connect:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        setLoading(true);
        setError(null);

        try {
            await lanSyncService.disconnect();
            setSyncMode('standalone');
            setServerInfo(null);
            setServerStatus(null);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to disconnect');
            console.error('Failed to disconnect:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderStatus = () => {
        if (connectionStatus.connected) {
            if (connectionStatus.mode === 'host') {
                return (
                    <div className="flex items-center gap-2 text-green-400">
                        <Server className="w-5 h-5" />
                        <span className="font-medium">Hosting ({serverStatus?.clientCount || 0} clients)</span>
                    </div>
                );
            } else {
                return (
                    <div className="flex items-center gap-2 text-green-400">
                        <Wifi className="w-5 h-5" />
                        <span className="font-medium">Connected to {connectionStatus.hostIp}</span>
                    </div>
                );
            }
        } else {
            return (
                <div className="flex items-center gap-2 text-slate-500">
                    <WifiOff className="w-5 h-5" />
                    <span className="font-medium">Not connected</span>
                </div>
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Network Sync</h1>
                <p className="text-slate-400">
                    Synchronize data across multiple devices on your local network
                </p>
            </div>

            {/* Connection Status */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Connection Status</h2>
                    {renderStatus()}
                </div>

                {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {connectionStatus.connected && connectionStatus.mode === 'host' && serverInfo && (
                    <div className="bg-slate-900/50 rounded-lg p-4 space-y-2 mb-4">
                        <p className="text-slate-300">
                            <span className="text-slate-500">Server URL:</span>{' '}
                            <span className="font-mono text-sky-400">{serverInfo.url}</span>
                        </p>
                        <p className="text-slate-400 text-sm">
                            Other devices can connect using this address
                        </p>
                    </div>
                )}
            </div>

            {/* Mode Selection */}
            {!connectionStatus.connected && (
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-white">Connection Mode</h2>

                    {/* Host Mode */}
                    <div className="border border-slate-700 rounded-lg p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <Server className="w-6 h-6 text-sky-400 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2">Host Mode</h3>
                                <p className="text-slate-400 text-sm mb-4">
                                    Run as the main server. This device will process all scans and broadcast updates to connected clients.
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Server Port
                                        </label>
                                        <input
                                            type="number"
                                            value={hostPort}
                                            onChange={(e) => setHostPort(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                                            placeholder="3000"
                                            disabled={loading}
                                        />
                                    </div>

                                    <button
                                        onClick={handleStartHost}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                Starting...
                                            </>
                                        ) : (
                                            <>
                                                <Server className="w-4 h-4" />
                                                Start Host Server
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Client Mode */}
                    <div className="border border-slate-700 rounded-lg p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <Wifi className="w-6 h-6 text-green-400 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2">Client Mode</h3>
                                <p className="text-slate-400 text-sm mb-4">
                                    Connect to an existing host server. Scans will be sent to the host for processing.
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Host IP Address
                                        </label>
                                        <input
                                            type="text"
                                            value={hostIp}
                                            onChange={(e) => setHostIp(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500 relative z-10"
                                            placeholder="192.168.1.100"
                                            disabled={loading}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Host Port
                                        </label>
                                        <input
                                            type="number"
                                            value={hostPort}
                                            onChange={(e) => setHostPort(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500 relative z-10"
                                            placeholder="3000"
                                            disabled={loading}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <button
                                        onClick={handleConnectClient}
                                        disabled={loading || !hostIp.trim()}
                                        className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                Connecting...
                                            </>
                                        ) : (
                                            <>
                                                <Wifi className="w-4 h-4" />
                                                Connect to Host
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Connected Controls */}
            {connectionStatus.connected && (
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Controls</h2>

                    {/* Host Server Info - Always show when in host mode */}
                    {connectionStatus.mode === 'host' && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 text-slate-300 mb-2">
                                <Server className="w-5 h-5 text-sky-400" />
                                <span className="font-medium">Host Server</span>
                            </div>
                            <div className="bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-500/20 rounded-lg p-4">
                                {serverInfo ? (
                                    <>
                                        <p className="text-slate-300 mb-2">
                                            <span className="text-slate-500">Server URL: </span>
                                            <span className="font-mono text-lg text-sky-400 font-bold">{serverInfo.url}</span>
                                        </p>
                                        <p className="text-slate-300">
                                            <span className="text-slate-500">Host IP: </span>
                                            <span className="font-mono text-emerald-400">{serverInfo.localIp}</span>
                                            <span className="text-slate-500 ml-2">Port: </span>
                                            <span className="font-mono text-emerald-400">{serverInfo.port}</span>
                                        </p>
                                        <p className="text-slate-500 text-xs mt-2">
                                            Clients can connect using this address
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-slate-500 text-sm">Loading server info...</p>
                                )}
                            </div>
                        </div>
                    )}

                    {connectionStatus.mode === 'host' && serverStatus && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 text-slate-300 mb-2">
                                <Users className="w-5 h-5" />
                                <span className="font-medium">Connected Clients</span>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                {serverStatus.clientCount === 0 ? (
                                    <p className="text-slate-500 text-sm">No clients connected</p>
                                ) : (
                                    <div className="space-y-2">
                                        {serverStatus.clients?.map((clientId, index) => (
                                            <div
                                                key={clientId}
                                                className="flex items-center gap-2 text-sm text-slate-400"
                                            >
                                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                                Client {index + 1}
                                                <span className="text-slate-600 font-mono text-xs">
                                                    ({clientId.slice(0, 8)})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleDisconnect}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg font-medium transition-colors"
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default NetworkSettingsView;
