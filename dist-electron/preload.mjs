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
  }
});
