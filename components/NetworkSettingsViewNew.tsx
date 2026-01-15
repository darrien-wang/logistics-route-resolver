/**
 * NetworkSettingsView - REST API Version
 * 
 * Replaces Socket.IO LAN sync with REST API architecture.
 * - Host mode: Starts REST API server locally
 * - Client mode: Connects to remote server via HTTP
 */

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Server, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';
import type { SyncServerInfo } from '../types';
import { useI18n } from '../contexts/I18nContext';
import { apiClient } from '../services/ApiClient';

type ConnectionMode = 'host' | 'client' | 'disconnected';

interface ConnectionStatus {
    mode: ConnectionMode;
    connected: boolean;
    serverUrl: string | null;
}

const NetworkSettingsViewNew: React.FC = () => {
    const [hostPort, setHostPort] = useState('14059');
    const [hostIp, setHostIp] = useState('');
    const [clientName, setClientName] = useState('');
    const [serverInfo, setServerInfo] = useState<SyncServerInfo | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
        mode: 'disconnected',
        connected: false,
        serverUrl: null,
    });
    const [hostLoading, setHostLoading] = useState(false);
    const [clientLoading, setClientLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    // Check server status on mount (if already running)
    useEffect(() => {
        const checkExistingServer = async () => {
            if (window.restApi) {
                try {
                    const status = await window.restApi.getServerStatus();
                    if (status.running && status.serverInfo) {
                        setServerInfo(status.serverInfo);
                        setConnectionStatus({
                            mode: 'host',
                            connected: true,
                            serverUrl: status.serverInfo.url,
                        });
                    }
                } catch (e) {
                    console.log('[NetworkSettings] No existing server');
                }
            }
        };
        checkExistingServer();

        // Load saved connection info from localStorage
        const savedHostIp = localStorage.getItem('REST_API_HOST_IP');
        const savedClientName = localStorage.getItem('REST_API_CLIENT_NAME');
        const savedPort = localStorage.getItem('REST_API_PORT');
        if (savedHostIp) setHostIp(savedHostIp);
        if (savedClientName) setClientName(savedClientName);
        if (savedPort) setHostPort(savedPort);
    }, []);

    const handleStartHost = async () => {
        setHostLoading(true);
        setError(null);

        try {
            if (!window.restApi) {
                throw new Error('REST API not available - requires Electron');
            }

            const port = parseInt(hostPort) || 14059;
            localStorage.setItem('REST_API_PORT', port.toString());

            const info = await window.restApi.startServer(port);
            setServerInfo(info);
            setConnectionStatus({
                mode: 'host',
                connected: true,
                serverUrl: info.url,
            });

            console.log('[NetworkSettings] REST API server started:', info);
        } catch (err: any) {
            setError(err.message || 'Failed to start server');
            console.error('[NetworkSettings] Failed to start host:', err);
        } finally {
            setHostLoading(false);
        }
    };

    const handleConnectClient = async () => {
        if (!hostIp.trim()) {
            setError('Please enter server IP address');
            return;
        }

        setClientLoading(true);
        setError(null);

        try {
            const port = parseInt(hostPort) || 14059;
            const serverUrl = `http://${hostIp.trim()}:${port}`;
            const name = clientName.trim() || `Client-${Date.now().toString(36).slice(-4)}`;

            // Save to localStorage
            localStorage.setItem('REST_API_HOST_IP', hostIp.trim());
            localStorage.setItem('REST_API_CLIENT_NAME', name);
            localStorage.setItem('REST_API_PORT', port.toString());

            // Configure and test connection
            apiClient.configure(serverUrl, name);
            const status = await apiClient.checkConnection();

            if (status.connected) {
                setConnectionStatus({
                    mode: 'client',
                    connected: true,
                    serverUrl: serverUrl,
                });
                console.log('[NetworkSettings] Connected to server:', serverUrl);
            } else {
                throw new Error(status.error || 'Connection failed');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to connect to server');
            console.error('[NetworkSettings] Failed to connect:', err);
        } finally {
            setClientLoading(false);
        }
    };

    const handleDisconnect = async () => {
        setHostLoading(true);
        setClientLoading(true);
        setError(null);

        try {
            if (connectionStatus.mode === 'host' && window.restApi) {
                await window.restApi.stopServer();
                console.log('[NetworkSettings] Server stopped');
            }

            apiClient.disconnect();

            setServerInfo(null);
            setConnectionStatus({
                mode: 'disconnected',
                connected: false,
                serverUrl: null,
            });
        } catch (err: any) {
            setError(err.message || 'Failed to disconnect');
            console.error('[NetworkSettings] Disconnect error:', err);
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
                        <span className="font-medium">Hosting REST API Server</span>
                    </div>
                );
            } else {
                return (
                    <div className="flex items-center gap-2 text-green-400">
                        <Wifi className="w-5 h-5" />
                        <span className="font-medium">
                            Connected to {connectionStatus.serverUrl}
                        </span>
                    </div>
                );
            }
        } else {
            return (
                <div className="flex items-center gap-2 text-amber-500">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-bold">Not Connected - Please Select Mode Below</span>
                </div>
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">{t('network.title')}</h1>
                <p className="text-slate-400 mb-4">
                    REST API 架构 - 客户端通过 HTTP 请求获取路线和打印数据
                </p>

                {/* Architecture Info */}
                <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-emerald-400 font-semibold">✅ 单向数据流架构</p>
                        <p className="text-emerald-300/80 text-sm mt-1">
                            服务器是唯一权威：路线解析和 Stack 分配都在服务器完成。客户端获取数据后本地打印。
                        </p>
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
                            <span className="font-mono text-sky-400 text-lg">{serverInfo.url}</span>
                        </p>
                        <p className="text-slate-400 text-sm">
                            客户端使用此地址连接服务器
                        </p>
                    </div>
                )}
            </div>

            {/* Mode Selection */}
            {!connectionStatus.connected && (
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">{t('network.selectMode')}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Host Mode */}
                        <div className="border-2 border-sky-500/50 rounded-lg p-6 bg-sky-500/5">
                            <div className="flex items-start gap-4 mb-4">
                                <Server className="w-8 h-8 text-sky-400 mt-1" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-sky-400 mb-2">🖥️ Host (服务器)</h3>
                                    <p className="text-slate-300 text-sm mb-2">
                                        <strong className="text-white">启动 REST API 服务器</strong>
                                    </p>
                                    <p className="text-slate-400 text-sm mb-4">
                                        所有数据存储在此设备，其他设备通过 HTTP 请求连接
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                端口
                                            </label>
                                            <input
                                                type="number"
                                                value={hostPort}
                                                onChange={(e) => setHostPort(e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                                                placeholder="14059"
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
                                                    启动服务器
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Client Mode */}
                        <div className="border-2 border-green-500/50 rounded-lg p-6 bg-green-500/5">
                            <div className="flex items-start gap-4 mb-4">
                                <Wifi className="w-8 h-8 text-green-400 mt-1" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-green-400 mb-2">📱 Client (客户端)</h3>
                                    <p className="text-slate-300 text-sm mb-2">
                                        <strong className="text-white">连接到服务器</strong>
                                    </p>
                                    <p className="text-slate-400 text-sm mb-4">
                                        扫描订单时通过 HTTP 请求服务器，获取路线后本地打印
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                服务器 IP 地址
                                            </label>
                                            <input
                                                type="text"
                                                value={hostIp}
                                                onChange={(e) => setHostIp(e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                                                placeholder="192.168.1.100"
                                                disabled={clientLoading}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                端口
                                            </label>
                                            <input
                                                type="number"
                                                value={hostPort}
                                                onChange={(e) => setHostPort(e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                                                placeholder="14059"
                                                disabled={clientLoading}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                客户端名称 (可选)
                                            </label>
                                            <input
                                                type="text"
                                                value={clientName}
                                                onChange={(e) => setClientName(e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                                                placeholder="e.g. Scanner-1"
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
                                                    连接服务器
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

                    {/* Host Server Info */}
                    {connectionStatus.mode === 'host' && serverInfo && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 text-slate-300 mb-2">
                                <Server className="w-5 h-5 text-sky-400" />
                                <span className="font-medium">REST API Server</span>
                            </div>
                            <div className="bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-500/20 rounded-lg p-4">
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
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleDisconnect}
                        disabled={hostLoading || clientLoading}
                        className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg font-medium transition-colors"
                    >
                        断开连接
                    </button>
                </div>
            )}
        </div>
    );
};

export default NetworkSettingsViewNew;
