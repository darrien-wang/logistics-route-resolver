"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other apts you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("electronAPI", {
  updater: {
    checkForUpdates: () => electron.ipcRenderer.invoke("check-for-updates"),
    downloadUpdate: () => electron.ipcRenderer.invoke("download-update"),
    installUpdate: () => electron.ipcRenderer.invoke("install-update"),
    getAppVersion: () => electron.ipcRenderer.invoke("get-app-version"),
    onUpdateStatus: (callback) => {
      const handler = (_event, data) => callback(data);
      electron.ipcRenderer.on("update-status", handler);
      return () => electron.ipcRenderer.removeListener("update-status", handler);
    }
  },
  printImage: (imageDataUrl, options) => electron.ipcRenderer.invoke("print-image", imageDataUrl, options),
  printGDI: (data) => electron.ipcRenderer.invoke("print-gdi", data)
});
electron.contextBridge.exposeInMainWorld("electron", {
  // Start sync server (Host mode)
  startSyncServer: (port) => electron.ipcRenderer.invoke("start-sync-server", port),
  // Stop sync server
  stopSyncServer: () => electron.ipcRenderer.invoke("stop-sync-server"),
  // Broadcast state to all clients
  broadcastSyncState: (state) => electron.ipcRenderer.invoke("broadcast-sync-state", state),
  // Sync state to specific client
  syncStateToClient: (clientId, state) => electron.ipcRenderer.invoke("sync-state-to-client", clientId, state),
  // Get server status
  getSyncServerStatus: () => electron.ipcRenderer.invoke("get-sync-server-status"),
  // Listen for messages from server (client actions)
  onSyncServerMessage: (callback) => {
    const handler = (_event, data) => callback(data);
    electron.ipcRenderer.on("sync-server-message", handler);
    return () => electron.ipcRenderer.removeListener("sync-server-message", handler);
  }
});
