import { app, BrowserWindow, session, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { exec } from 'node:child_process'
import { writeFileSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
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

// Handle print-image IPC for silent label printing
let printWindow: BrowserWindow | null = null;

// Handle print-image IPC for silent label printing
ipcMain.handle('print-image', async (_event, imageDataUrl: string, options: any = {}) => {
    if (!win) {
        throw new Error('No window available for printing');
    }

    try {
        // Create a hidden window for printing if it doesn't exist
        if (!printWindow || printWindow.isDestroyed()) {
            printWindow = new BrowserWindow({
                show: false,
                width: 378,
                height: 567,
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                },
            });
        }

        // Create simple HTML with just the image
        const html = `<!DOCTYPE html>
<html>
<head>
<style>
  @page { margin: 0; size: 10cm 15cm; }
  * { margin: 0; padding: 0; }
  body { width: 10cm; height: 15cm; }
  img { width: 100%; height: 100%; object-fit: contain; }
</style>
</head>
<body><img src="${imageDataUrl}" /></body>
</html>`;

        // Load the HTML content
        await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);

        // Small buffer to ensure rendering
        await new Promise(resolve => setTimeout(resolve, 50));

        // Print silently
        return new Promise((resolve, reject) => {
            if (!printWindow) return reject(new Error('Print window destroyed'));

            printWindow.webContents.print({
                silent: options.silent !== false,
                printBackground: true,
                margins: { marginType: 'none' },
                pageSize: { width: 100000, height: 150000 },
            }, (success, failureReason) => {
                if (success) {
                    resolve({ success: true });
                } else {
                    reject(new Error(failureReason || 'Print failed'));
                }
                // Don't close window, reuse it
            });
        });
    } catch (error) {
        throw error;
    }
});

// GDI Print Interface
interface GDIPrintData {
    type: 'standard' | 'exception';
    routeName?: string;
    stackNumber?: number;
    trackingNumber?: string;
    orderId?: string;
}

/**
 * Handle GDI print IPC for direct Windows printing via PowerShell
 * This bypasses browser-based printing for faster, more reliable output
 */
ipcMain.handle('print-gdi', async (_event, data: GDIPrintData) => {
    return new Promise((resolve, reject) => {
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        let psScript: string;

        if (data.type === 'exception') {
            // Exception label layout
            psScript = generateExceptionLabelScript(dateStr, data.orderId || 'UNKNOWN');
        } else {
            // Standard label layout
            psScript = generateStandardLabelScript(
                dateStr,
                data.routeName || 'N/A',
                data.stackNumber || 0,
                data.trackingNumber || ''
            );
        }

        const tempFile = path.join(tmpdir(), `gdi_print_${Date.now()}.ps1`);

        try {
            writeFileSync(tempFile, psScript, 'utf-8');

            exec(`powershell -ExecutionPolicy Bypass -File "${tempFile}"`, (error, stdout, stderr) => {
                // Clean up temp file immediately
                try { unlinkSync(tempFile); } catch { /* ignore */ }

                if (stdout.includes('PRINT_SUCCESS')) {
                    resolve({ success: true });
                } else {
                    reject(new Error(stderr || error?.message || 'GDI Print failed'));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
});

/**
 * Generate PowerShell script for standard label
 * Layout: Date (top-right), Route (top-center), TrackingNumber (above line), 
 *         Divider, Stack# (bottom-center), Notes box (bottom-right)
 */
function generateStandardLabelScript(dateStr: string, routeName: string, stackNumber: number, trackingNumber: string): string {
    // Split tracking number: first part normal, last 4 bold
    const trackingPrefix = trackingNumber.slice(0, -4);
    const trackingLast4 = trackingNumber.slice(-4);

    return `
Add-Type -AssemblyName System.Drawing

$doc = New-Object System.Drawing.Printing.PrintDocument

$doc.add_PrintPage({
    param($sender, $e)
    $g = $e.Graphics
    
    # Page dimensions (10cm x 15cm at ~100 DPI for screen coords)
    $pageWidth = 394
    $pageHeight = 591
    $leftSection = $pageWidth * 0.55
    $rightStart = $leftSection + 20
    $rightWidth = $pageWidth - $rightStart - 15
    
    # Fonts
    $fontDate = New-Object System.Drawing.Font("Arial", 14)
    $fontRouteSmall = New-Object System.Drawing.Font("Arial", 36, [System.Drawing.FontStyle]::Bold)
    $fontRouteLarge = New-Object System.Drawing.Font("Arial", 52, [System.Drawing.FontStyle]::Bold)
    $fontTrackingNormal = New-Object System.Drawing.Font("Arial", 14)
    $fontTrackingBold = New-Object System.Drawing.Font("Arial", 18, [System.Drawing.FontStyle]::Bold)
    $fontStack = New-Object System.Drawing.Font("Arial", 80, [System.Drawing.FontStyle]::Bold)
    $fontNotes = New-Object System.Drawing.Font("Arial", 10)
    
    $brushBlack = [System.Drawing.Brushes]::Black
    $brushGray = [System.Drawing.Brushes]::Gray
    
    # 1. Date (top-right)
    $dateSize = $g.MeasureString("${dateStr}", $fontDate)
    $g.DrawString("${dateStr}", $fontDate, $brushGray, ($pageWidth - $dateSize.Width - 15), 8)
    
    # 2. Route Name (centered in top half)
    $routeFont = $fontRouteLarge
    $routeSize = $g.MeasureString("${routeName}", $routeFont)
    if ($routeSize.Width -gt ($leftSection - 30)) {
        $routeFont = $fontRouteSmall
        $routeSize = $g.MeasureString("${routeName}", $routeFont)
    }
    $routeX = ($leftSection - $routeSize.Width) / 2
    $routeY = ($pageHeight * 0.25) - ($routeSize.Height / 2)
    $g.DrawString("${routeName}", $routeFont, $brushBlack, $routeX, $routeY)
    
    # 3. Tracking Number (above divider line)
    $trackingY = ($pageHeight * 0.5) - 35
    $prefixSize = $g.MeasureString("${trackingPrefix}", $fontTrackingNormal)
    $last4Size = $g.MeasureString("${trackingLast4}", $fontTrackingBold)
    $totalWidth = $prefixSize.Width + $last4Size.Width
    $trackingX = ($leftSection - $totalWidth) / 2
    
    # Draw prefix (normal)
    $g.DrawString("${trackingPrefix}", $fontTrackingNormal, $brushGray, $trackingX, $trackingY)
    # Draw last 4 (bold, larger)
    $g.DrawString("${trackingLast4}", $fontTrackingBold, $brushBlack, ($trackingX + $prefixSize.Width), ($trackingY - 2))
    
    # 4. Divider line (full width)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 2)
    $g.DrawLine($pen, 8, ($pageHeight * 0.5), ($pageWidth - 8), ($pageHeight * 0.5))
    
    # 5. Stack Number (centered in bottom half)
    $stackText = "${stackNumber}"
    $stackSize = $g.MeasureString($stackText, $fontStack)
    $stackX = ($leftSection - $stackSize.Width) / 2
    $stackY = ($pageHeight * 0.75) - ($stackSize.Height / 2)
    $g.DrawString($stackText, $fontStack, $brushBlack, $stackX, $stackY)
    
    # 6. Notes box (dashed rectangle, bottom-right section)
    $notesBoxTop = ($pageHeight * 0.5) + 15
    $notesBoxHeight = ($pageHeight * 0.5) - 50
    $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::Gray, 1)
    $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawRectangle($dashPen, $rightStart, $notesBoxTop, $rightWidth, $notesBoxHeight)
    
    # 7. "NOTES" label
    $notesLabelSize = $g.MeasureString("NOTES", $fontNotes)
    $g.DrawString("NOTES", $fontNotes, $brushGray, ($rightStart + ($rightWidth - $notesLabelSize.Width) / 2), ($pageHeight - 20))
    
    $e.HasMorePages = $false
})

$doc.Print()
Write-Host "PRINT_SUCCESS"
`;
}

/**
 * Generate PowerShell script for exception label
 * Layout: Date, "EXCEPTION" in red, OrderID, Divider, "NO ROUTE", Notes box
 */
function generateExceptionLabelScript(dateStr: string, orderId: string): string {
    return `
Add-Type -AssemblyName System.Drawing

$doc = New-Object System.Drawing.Printing.PrintDocument

$doc.add_PrintPage({
    param($sender, $e)
    $g = $e.Graphics
    
    $pageWidth = 394
    $pageHeight = 591
    $leftSection = $pageWidth * 0.55
    $rightStart = $leftSection + 20
    $rightWidth = $pageWidth - $rightStart - 15
    
    $fontDate = New-Object System.Drawing.Font("Arial", 14)
    $fontException = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)
    $fontOrderId = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
    $fontNoRoute = New-Object System.Drawing.Font("Arial", 32, [System.Drawing.FontStyle]::Bold)
    $fontNotes = New-Object System.Drawing.Font("Arial", 10)
    
    $brushBlack = [System.Drawing.Brushes]::Black
    $brushGray = [System.Drawing.Brushes]::Gray
    $brushRed = [System.Drawing.Brushes]::DarkRed
    
    # Date
    $dateSize = $g.MeasureString("${dateStr}", $fontDate)
    $g.DrawString("${dateStr}", $fontDate, $brushGray, ($pageWidth - $dateSize.Width - 15), 8)
    
    # "EXCEPTION" label
    $excSize = $g.MeasureString("EXCEPTION", $fontException)
    $g.DrawString("EXCEPTION", $fontException, $brushRed, (($leftSection - $excSize.Width) / 2), ($pageHeight * 0.12))
    
    # Order ID
    $orderSize = $g.MeasureString("${orderId}", $fontOrderId)
    $orderX = ($leftSection - $orderSize.Width) / 2
    if ($orderX -lt 5) { $orderX = 5 }
    $g.DrawString("${orderId}", $fontOrderId, $brushBlack, $orderX, ($pageHeight * 0.32))
    
    # Divider
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 2)
    $g.DrawLine($pen, 8, ($pageHeight * 0.5), ($pageWidth - 8), ($pageHeight * 0.5))
    
    # "NO ROUTE"
    $noRouteSize = $g.MeasureString("NO ROUTE", $fontNoRoute)
    $g.DrawString("NO ROUTE", $fontNoRoute, $brushGray, (($leftSection - $noRouteSize.Width) / 2), ($pageHeight * 0.68))
    
    # Notes box
    $notesBoxTop = ($pageHeight * 0.5) + 15
    $notesBoxHeight = ($pageHeight * 0.5) - 50
    $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::Gray, 1)
    $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawRectangle($dashPen, $rightStart, $notesBoxTop, $rightWidth, $notesBoxHeight)
    
    # "NOTES" label
    $notesLabelSize = $g.MeasureString("NOTES", $fontNotes)
    $g.DrawString("NOTES", $fontNotes, $brushGray, ($rightStart + ($rightWidth - $notesLabelSize.Width) / 2), ($pageHeight - 20))
    
    $e.HasMorePages = $false
})

$doc.Print()
Write-Host "PRINT_SUCCESS"
`;
}

app.whenReady().then(() => {
    createWindow()

    // Only enable auto-updater in packaged app
    if (app.isPackaged && win) {
        setupAutoUpdater(win)
    }
})
