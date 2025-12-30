import { autoUpdater, UpdateInfo } from 'electron-updater';
import { BrowserWindow, ipcMain } from 'electron';

// Configure auto updater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

export function setupAutoUpdater(mainWindow: BrowserWindow) {
    // Send status to renderer
    const sendStatus = (status: string, data?: any) => {
        mainWindow.webContents.send('update-status', { status, ...data });
    };

    // Update events
    autoUpdater.on('checking-for-update', () => {
        console.log('[Updater] Checking for updates...');
        sendStatus('checking');
    });

    autoUpdater.on('update-available', (info: UpdateInfo) => {
        console.log('[Updater] Update available:', info.version);
        sendStatus('available', {
            version: info.version,
            releaseDate: info.releaseDate,
            releaseNotes: info.releaseNotes
        });
    });

    autoUpdater.on('update-not-available', () => {
        console.log('[Updater] No updates available');
        sendStatus('not-available');
    });

    autoUpdater.on('download-progress', (progress) => {
        console.log(`[Updater] Download progress: ${Math.round(progress.percent)}%`);
        sendStatus('downloading', {
            percent: Math.round(progress.percent),
            transferred: progress.transferred,
            total: progress.total
        });
    });

    autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
        console.log('[Updater] Update downloaded:', info.version);
        sendStatus('downloaded', { version: info.version });
    });

    autoUpdater.on('error', (err) => {
        console.error('[Updater] Error:', err.message);
        sendStatus('error', { message: err.message });
    });

    // IPC handlers
    ipcMain.handle('check-for-updates', async () => {
        try {
            return await autoUpdater.checkForUpdates();
        } catch (err: any) {
            console.error('[Updater] Check error:', err.message);
            return null;
        }
    });

    ipcMain.handle('download-update', async () => {
        try {
            await autoUpdater.downloadUpdate();
            return true;
        } catch (err: any) {
            console.error('[Updater] Download error:', err.message);
            return false;
        }
    });

    ipcMain.handle('install-update', () => {
        autoUpdater.quitAndInstall(false, true);
    });

    ipcMain.handle('get-app-version', () => {
        return autoUpdater.currentVersion.version;
    });

    // Check for updates after startup (delay 5 seconds)
    setTimeout(() => {
        console.log('[Updater] Initial update check...');
        autoUpdater.checkForUpdates().catch(err => {
            console.error('[Updater] Initial check failed:', err.message);
        });
    }, 5000);
}
