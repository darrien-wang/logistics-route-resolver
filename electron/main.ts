import { app, BrowserWindow, session, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setupAutoUpdater } from './updater'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'app_logo_fixed.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            webSecurity: false, // Disable CORS for API requests
        },
    })

    // Modify Referer header for API requests to pda.wpglb.com
    session.defaultSession.webRequest.onBeforeSendHeaders(
        { urls: ['https://pda.wpglb.com/*'] },
        (details, callback) => {
            details.requestHeaders['Referer'] = 'https://pda.wpglb.com/unloadingScanNew';
            details.requestHeaders['Origin'] = 'https://pda.wpglb.com';
            callback({ requestHeaders: details.requestHeaders });
        }
    );

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'))
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Handle print-html IPC for silent label printing
ipcMain.handle('print-html', async (_event, html: string, options: any = {}) => {
    if (!win) {
        throw new Error('No window available for printing');
    }

    try {
        // Create a hidden window for printing
        const printWindow = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
            },
        });

        // Load the HTML content
        await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);

        // Wait for content to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Print silently
        await printWindow.webContents.print({
            silent: options.silent !== false,  // Default to silent
            printBackground: options.printBackground !== false,
            margins: { marginType: 'none' },
            pageSize: options.pageSize || { width: 100000, height: 150000 }, // 10cm x 15cm in microns
        });

        // Close the print window
        printWindow.close();

        return { success: true };
    } catch (error) {
        console.error('[Electron] Print failed:', error);
        throw error;
    }
});

app.whenReady().then(() => {
    createWindow()

    // Only enable auto-updater in packaged app
    if (app.isPackaged && win) {
        setupAutoUpdater(win)
    }
})

