import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
    on(...args: Parameters<typeof ipcRenderer.on>) {
        const [channel, listener] = args
        return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
    },
    off(...args: Parameters<typeof ipcRenderer.off>) {
        const [channel, ...omit] = args
        return ipcRenderer.off(channel, ...omit)
    },
    send(...args: Parameters<typeof ipcRenderer.send>) {
        const [channel, ...omit] = args
        return ipcRenderer.send(channel, ...omit)
    },
    invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
        const [channel, ...omit] = args
        return ipcRenderer.invoke(channel, ...omit)
    },

    // You can expose other apts you need here.
    // ...
})

// --------- Expose Update API ---------
contextBridge.exposeInMainWorld('electronAPI', {
    updater: {
        checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
        downloadUpdate: () => ipcRenderer.invoke('download-update'),
        installUpdate: () => ipcRenderer.invoke('install-update'),
        getAppVersion: () => ipcRenderer.invoke('get-app-version'),
        onUpdateStatus: (callback: (status: any) => void) => {
            const handler = (_event: any, data: any) => callback(data);
            ipcRenderer.on('update-status', handler);
            return () => ipcRenderer.removeListener('update-status', handler);
        }
    },
    printImage: (imageDataUrl: string, options?: any) => ipcRenderer.invoke('print-image', imageDataUrl, options),
    printGDI: (data: { type: 'standard' | 'exception'; routeName?: string; stackNumber?: number; trackingNumber?: string; orderId?: string }) =>
        ipcRenderer.invoke('print-gdi', data),
})

// --------- Expose LAN Sync API ---------
contextBridge.exposeInMainWorld('electron', {
    // Start sync server (Host mode)
    startSyncServer: (port?: number) => ipcRenderer.invoke('start-sync-server', port),

    // Stop sync server
    stopSyncServer: () => ipcRenderer.invoke('stop-sync-server'),

    // Broadcast state to all clients
    broadcastSyncState: (state: any) => ipcRenderer.invoke('broadcast-sync-state', state),

    // Sync state to specific client
    syncStateToClient: (clientId: string, state: any) => ipcRenderer.invoke('sync-state-to-client', clientId, state),

    // Get server status
    getSyncServerStatus: () => ipcRenderer.invoke('get-sync-server-status'),

    // Listen for messages from server (client actions)
    onSyncServerMessage: (callback: (data: any) => void) => {
        const handler = (_event: any, data: any) => callback(data);
        ipcRenderer.on('sync-server-message', handler);
        return () => ipcRenderer.removeListener('sync-server-message', handler);
    }
})
