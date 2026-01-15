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
    printGDI: (data: { type: 'standard' | 'exception'; routeName?: string; stackNumber?: number; trackingNumber?: string; orderId?: string; dateStr?: string }) =>
        ipcRenderer.invoke('print-gdi', data),
    // Check if this is the only instance running
    isSingleInstance: () => ipcRenderer.invoke('is-single-instance'),
})


// --------- Expose REST API Server Control ---------
contextBridge.exposeInMainWorld('restApi', {
    // Start REST API server (Host mode)
    startServer: (port?: number) => ipcRenderer.invoke('start-rest-api-server', port),

    // Stop REST API server
    stopServer: () => ipcRenderer.invoke('stop-rest-api-server'),

    // Get server status
    getServerStatus: () => ipcRenderer.invoke('get-rest-api-server-status'),

    // Handle scan requests from REST API (called by main process)
    onScanRequest: (callback: (data: { requestId: string; request: any }) => void) => {
        const handler = (_event: any, data: any) => callback(data);
        ipcRenderer.on('rest-api-scan-request', handler);
        return () => ipcRenderer.removeListener('rest-api-scan-request', handler);
    },

    // Send scan response back to main process
    sendScanResponse: (requestId: string, result: any) => {
        ipcRenderer.send('rest-api-scan-response', { requestId, result });
    },

    // Handle stacks requests
    onStacksRequest: (callback: (data: { requestId: string }) => void) => {
        const handler = (_event: any, data: any) => callback(data);
        ipcRenderer.on('rest-api-stacks-request', handler);
        return () => ipcRenderer.removeListener('rest-api-stacks-request', handler);
    },

    // Send stacks response
    sendStacksResponse: (requestId: string, stacks: any[]) => {
        ipcRenderer.send('rest-api-stacks-response', { requestId, stacks });
    },

    // Handle history requests
    onHistoryRequest: (callback: (data: { requestId: string; limit?: number }) => void) => {
        const handler = (_event: any, data: any) => callback(data);
        ipcRenderer.on('rest-api-history-request', handler);
        return () => ipcRenderer.removeListener('rest-api-history-request', handler);
    },

    // Send history response
    sendHistoryResponse: (requestId: string, history: any[]) => {
        ipcRenderer.send('rest-api-history-response', { requestId, history });
    },
})
