import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Server, Users, AlertCircle, RefreshCw } from 'lucide-react';
import { lanSyncService, type SyncMode, type ConnectionStatus } from '../services/LanSyncService';
import { routeStackService } from '../services/RouteStackService';
import type { SyncServerInfo, SyncServerStatus } from '../types';
import { useI18n } from '../contexts/I18nContext';

const NetworkSettingsView: React.FC = () => {
    const [syncMode, setSyncMode] = useState<SyncMode>('standalone');
    const [hostIp, setHostIp] = useState('');
    const [hostPort, setHostPort] = useState('14059');
    const [clientName, setClientName] = useState('');
    const [serverInfo, setServerInfo] = useState<SyncServerInfo | null>(null);
    const [serverStatus, setServerStatus] = useState<SyncServerStatus | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
        connected: false,
        mode: 'standalone',
    });
    const [hostLoading, setHostLoading] = useState(false);
    const [clientLoading, setClientLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isHostCapable, setIsHostCapable] = useState(true); // Can this device become a host?
    const { t } = useI18n();

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

        // Load saved config to populate form fields
        const savedConfig = lanSyncService.getSavedConfig();
        if (savedConfig) {
            if (savedConfig.hostIp) setHostIp(savedConfig.hostIp);
            if (savedConfig.hostPort) setHostPort(savedConfig.hostPort.toString());
            if (savedConfig.clientName) setClientName(savedConfig.clientName);
        }

        // Check if this device can become a host
        setIsHostCapable(lanSyncService.isHostCapable());

        // Poll server status if in host mode
        let statusInterval: NodeJS.Timeout | null = null;
        if (initialStatus.mode === 'host') {
            updateServerStatus();
            statusInterval = setInterval(updateServerStatus, 3000);
        }

        // Auto-reconnect on visibility change (system wake from sleep)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log('[NetworkSettings] Page became visible, checking auto-reconnect...');
                lanSyncService.attemptAutoReconnect().then(attempted => {
                    if (attempted) {
                        // Update UI after successful reconnect
                        const newStatus = lanSyncService.getStatus();
                        setConnectionStatus(newStatus);
                        setSyncMode(newStatus.mode);
                        routeStackService.setSyncMode(newStatus.mode);
                        if (newStatus.mode === 'host') {
                            updateServerStatus();
                        }
                    }
                });
            }
        };

        // Auto-reconnect when network comes back online
        const handleOnline = () => {
            console.log('[NetworkSettings] Network online, checking auto-reconnect...');
            lanSyncService.attemptAutoReconnect().then(attempted => {
                if (attempted) {
                    const newStatus = lanSyncService.getStatus();
                    setConnectionStatus(newStatus);
                    setSyncMode(newStatus.mode);
                    routeStackService.setSyncMode(newStatus.mode);
                }
            });
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('online', handleOnline);

        // Try auto-reconnect on mount (in case app was restarted)
        lanSyncService.attemptAutoReconnect().then(attempted => {
            if (attempted) {
                const newStatus = lanSyncService.getStatus();
                setConnectionStatus(newStatus);
                setSyncMode(newStatus.mode);
                routeStackService.setSyncMode(newStatus.mode);
                if (newStatus.mode === 'host') {
                    updateServerStatus();
                }
            }
        });

        return () => {
            lanSyncService.off('status', handleStatusChange);
            if (statusInterval) clearInterval(statusInterval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    const updateServerStatus = async () => {
        if (window.electron?.getSyncServerStatus) {
            try {
                const status = await window.electron.getSyncServerStatus();
                setServerStatus(status);
                // Also update serverInfo if available (for when navigating back to this page)
                if (status.serverInfo && !serverInfo) {
                    setServerInfo(status.serverInfo);
                }
            } catch (err) {
                console.error('Failed to get server status:', err);
            }
        }
    };

    const handleStartHost = async () => {
        setHostLoading(true);
        setError(null);

        try {
            const port = parseInt(hostPort) || 14059;
            const info = await window.electron!.startSyncServer(port);
            setServerInfo(info);

            await lanSyncService.initialize({ mode: 'host', hostPort: port });
            routeStackService.setSyncMode('host');

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
            setHostLoading(false);
        }
    };

    const handleConnectClient = async () => {
        if (!hostIp.trim()) {
            setError('Please enter host IP address');
            return;
        }

        setClientLoading(true);
        setError(null);

        try {
            const port = parseInt(hostPort) || 14059;
            const name = clientName.trim() || `Client-${Date.now().toString(36).slice(-4)}`;
            await lanSyncService.initialize({
                mode: 'client',
                hostIp: hostIp.trim(),
                hostPort: port,
                clientName: name,
            });
            routeStackService.setSyncMode('client');

            setSyncMode('client');
            // Directly update connectionStatus to trigger UI refresh
            setConnectionStatus({
                connected: true,
                mode: 'client',
                hostIp: hostIp.trim(),
                clientName: name,
            });
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to connect to host');
            console.error('Failed to connect:', err);
        } finally {
            setClientLoading(false);
        }
    };

    const handleDisconnect = async () => {
        setHostLoading(true);
        setClientLoading(true);
        setError(null);

        try {
            await lanSyncService.disconnect();
            // After disconnect, user must choose Host or Client again
            // 'standalone' is only used internally to represent disconnected state
            routeStackService.setSyncMode('host'); // Default to host for next connection
            setSyncMode('host');
            setServerInfo(null);
            setServerStatus(null);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to disconnect');
            console.error('Failed to disconnect:', err);
        } finally {
            setHostLoading(false);
            setClientLoading(false);
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
                        <span className="font-medium">
                            Connected as "{connectionStatus.clientName}" to {connectionStatus.hostIp}
                        </span>
                    </div>
                );
            }
        } else {
            // Differentiate between intentional Standalone vs Client Offline (Broken)
            if (connectionStatus.mode === 'client') {
                return (
                    <div className="flex items-center gap-2 text-red-500 animate-pulse">
                        <WifiOff className="w-5 h-5" />
                        <span className="font-bold">OFFLINE (Client Mode) - Reconnecting...</span>
                    </div>
                );
            } else {
                // Disconnected - waiting for user to select Host or Client
                return (
                    <div className="flex items-center gap-2 text-amber-500">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-bold">Not Connected - Please Select Mode Below</span>
                    </div>
                );
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">{t('network.title')}</h1>
                <p className="text-slate-400 mb-4">
                    Configure Host or Client mode for multi-device synchronization.
                </p>

                {/* Important Warnings */}
                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-amber-400 font-semibold">⚠️ {t('network.hostWarning')}</p>
                            <p className="text-amber-300/80 text-sm mt-1">
                                {t('network.clientModeSubtitle')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-sky-500/10 border border-sky-500/30 rounded-lg">
                        <Wifi className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sky-400 font-semibold">📡 {t('network.networkWarning')}</p>
                            <p className="text-sky-300/80 text-sm mt-1">
                                Host / Client must be on same WiFi or network
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connection Status */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">{t('network.connected')}</h2>
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
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">{t('network.selectMode')}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Host Mode - Only visible if device is host-capable */}
                        {isHostCapable ? (
                            <div className="border-2 border-sky-500/50 rounded-lg p-6 bg-sky-500/5">
                                <div className="flex items-start gap-4 mb-4">
                                    <Server className="w-8 h-8 text-sky-400 mt-1" />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-sky-400 mb-2">🖥️ {t('network.hostModeTitle')}</h3>
                                        <p className="text-slate-300 text-sm mb-2">
                                            <strong className="text-white">{t('network.hostModeSubtitle')}</strong>
                                        </p>
                                        <p className="text-slate-400 text-sm mb-4">
                                            {t('network.hostModeDesc')}
                                        </p>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    {t('network.port')}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={hostPort}
                                                    onChange={(e) => setHostPort(e.target.value)}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                                                    placeholder="3000"
                                                    disabled={hostLoading}
                                                />
                                            </div>

                                            <button
                                                onClick={handleStartHost}
                                                disabled={hostLoading}
                                                className="w-full px-4 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                {hostLoading ? (
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
                        ) : (
                            <div className="border-2 border-slate-600/50 rounded-lg p-6 bg-slate-800/50">
                                <div className="flex items-start gap-4">
                                    <Server className="w-8 h-8 text-slate-500 mt-1" />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-500 mb-2">🔒 {t('network.hostModeTitle')}</h3>
                                        <p className="text-slate-500 text-sm mb-2">
                                            <strong>{t('network.deviceLocked')}</strong>
                                        </p>
                                        <p className="text-slate-600 text-sm">
                                            {t('network.deviceLockedDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Client Mode */}
                        <div className="border-2 border-green-500/50 rounded-lg p-6 bg-green-500/5">
                            <div className="flex items-start gap-4 mb-4">
                                <Wifi className="w-8 h-8 text-green-400 mt-1" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-green-400 mb-2">📱 {t('network.clientModeTitle')}</h3>
                                    <p className="text-slate-300 text-sm mb-2">
                                        <strong className="text-white">{t('network.clientModeSubtitle')}</strong>
                                    </p>
                                    <p className="text-slate-400 text-sm mb-4">
                                        {t('network.clientModeDesc')}
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
                                                disabled={clientLoading}
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
                                                disabled={clientLoading}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Client Name (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={clientName}
                                                onChange={(e) => setClientName(e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500 relative z-10"
                                                placeholder="e.g. Scanner-1, Table-A"
                                                disabled={clientLoading}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <button
                                            onClick={handleConnectClient}
                                            disabled={clientLoading || !hostIp.trim()}
                                            className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            {clientLoading ? (
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
                                        {serverStatus.clients?.map((client) => (
                                            <div
                                                key={client.id}
                                                className="flex items-center gap-2 text-sm text-slate-400"
                                            >
                                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                                <span className="font-medium text-slate-300">{client.name}</span>
                                                <span className="text-slate-600 font-mono text-xs">
                                                    ({client.id.slice(0, 8)})
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
                        disabled={hostLoading || clientLoading}
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
