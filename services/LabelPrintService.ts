/**
 * LabelPrintService - Async print queue for stack labels
 * 
 * Manages background printing of stack labels with queue support
 * to prevent blocking the scanning workflow.
 */

export interface PrintJobPerf {
    tEnqueue: number;
    tDequeue?: number;
    tGenStart?: number;
    tGenEnd?: number;
    tSendStart?: number;
    tSendEnd?: number;
    tDone?: number;
    path?: 'GDI' | 'CANVAS' | 'IFRAME';
}

export interface PrintJob {
    id: string;
    type: 'standard' | 'exception';
    baseRouteName?: string;
    stackNumber?: number;
    trackingNumber?: string;
    orderId?: string;
    status: 'pending' | 'printing' | 'done' | 'failed';
    timestamp: number;
    perf?: PrintJobPerf;
}

class LabelPrintService {
    private printQueue: PrintJob[] = [];
    private isPrinting: boolean = false;
    private enabled: boolean = false;
    private jobIdCounter: number = 0;
    private imageCache: Map<string, string> = new Map();
    private exceptionCache: Map<string, string> = new Map(); // Cache for exception labels
    private readonly maxCacheSize = 100; // LRU limit to prevent memory bloat

    /**
     * LRU-style cache setter - removes oldest entry if at capacity
     */
    private setCache(cache: Map<string, string>, key: string, value: string): void {
        if (cache.size >= this.maxCacheSize) {
            const oldestKey = cache.keys().next().value;
            if (oldestKey) cache.delete(oldestKey);
        }
        cache.set(key, value);
    }

    /**
     * Generate standard label image (10cm x 15cm at 300 DPI)
     * Extracted from RouteStackCard.tsx
     */
    generateLabelImage(baseRouteName: string, stackNumber: number): string {
        const cacheKey = `${baseRouteName}-${stackNumber}`;
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
        const fullCacheKey = `${cacheKey}-${dateStr}`;

        if (this.imageCache.has(fullCacheKey)) {
            return this.imageCache.get(fullCacheKey)!;
        }

        const canvas = document.createElement('canvas');
        const width = 1181;  // 10cm at 300 DPI
        const height = 1772; // 15cm at 300 DPI
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d')!;

        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Left section dimensions (55% width for text)
        const leftWidth = width * 0.55;
        const rightStart = leftWidth + 60;
        const rightWidth = width - rightStart - 40;

        // DATE - Centered above divider (where tracking number would be)
        ctx.fillStyle = '#000000';
        ctx.font = '56px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        // Position at 50% height - 30px (padding) - similar to GDI relative position
        ctx.fillText(dateStr, leftWidth / 2, height * 0.5 - 30);

        // Top half: Route name - centered and auto-sized
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Auto-size font to fit the left section width
        let fontSize = 200;
        ctx.font = `bold ${fontSize}px Arial`;
        let textWidth = ctx.measureText(baseRouteName).width;

        // Scale down font if text is too wide
        while (textWidth > leftWidth - 80 && fontSize > 50) {
            fontSize -= 5;
            ctx.font = `bold ${fontSize}px Arial`;
            textWidth = ctx.measureText(baseRouteName).width;
        }

        // Draw route name centered in top half
        ctx.fillText(baseRouteName, leftWidth / 2, height * 0.25);

        // Divider line - full width
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(20, height * 0.5);
        ctx.lineTo(width - 20, height * 0.5);
        ctx.stroke();

        // Bottom half: Stack number - centered in left section
        let stackFontSize = 300;
        ctx.font = `bold ${stackFontSize}px Arial`;
        let stackTextWidth = ctx.measureText(`${stackNumber}`).width;

        // Scale down if needed
        while (stackTextWidth > leftWidth - 80 && stackFontSize > 100) {
            stackFontSize -= 10;
            ctx.font = `bold ${stackFontSize}px Arial`;
            stackTextWidth = ctx.measureText(`${stackNumber}`).width;
        }

        ctx.fillText(`${stackNumber}`, leftWidth / 2, height * 0.75);

        // Right side: Dashed rectangle for manual writing (bottom half only)
        const notesBoxTop = height * 0.5 + 40; // Start below the divider line
        const notesBoxHeight = height * 0.5 - 120; // Bottom half minus margins

        ctx.setLineDash([20, 15]);
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#666666';
        ctx.strokeRect(rightStart, notesBoxTop, rightWidth, notesBoxHeight);

        // Add small hint text
        ctx.setLineDash([]);
        ctx.font = '36px Arial';
        ctx.fillStyle = '#999999';
        ctx.textAlign = 'center';
        ctx.fillText('NOTES', rightStart + rightWidth / 2, height - 50);

        // Return data URL instead of auto-downloading
        const dataUrl = canvas.toDataURL('image/png');
        this.setCache(this.imageCache, fullCacheKey, dataUrl);
        return dataUrl;
    }

    /**
     * Generate exception label image
     */
    generateExceptionLabelImage(orderId: string): string {
        // Cache exception labels by date + orderId
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
        const cacheKey = `exception-${orderId}-${dateStr}`;

        if (this.exceptionCache.has(cacheKey)) {
            return this.exceptionCache.get(cacheKey)!;
        }

        const canvas = document.createElement('canvas');
        const width = 1181;
        const height = 1772;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const leftWidth = width * 0.55;
        const rightStart = leftWidth + 60;
        const rightWidth = width - rightStart - 40;

        // DATE - reuse dateStr from cache key
        ctx.fillStyle = '#666666';
        ctx.font = '56px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText(dateStr, width - 60, 25);

        // "EXCEPTION" label
        ctx.fillStyle = '#cc0000';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('EXCEPTION', leftWidth / 2, height * 0.15);

        // Order ID
        ctx.fillStyle = '#000000';
        let fontSize = 100;
        ctx.font = `bold ${fontSize}px Arial`;
        let textWidth = ctx.measureText(orderId).width;
        while (textWidth > leftWidth - 80 && fontSize > 40) {
            fontSize -= 5;
            ctx.font = `bold ${fontSize}px Arial`;
            textWidth = ctx.measureText(orderId).width;
        }
        ctx.fillText(orderId, leftWidth / 2, height * 0.38);

        // Divider
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(20, height * 0.5);
        ctx.lineTo(width - 20, height * 0.5);
        ctx.stroke();

        // "NO ROUTE"
        ctx.fillStyle = '#999999';
        ctx.font = 'bold 120px Arial';
        ctx.fillText('NO ROUTE', leftWidth / 2, height * 0.75);

        // Notes
        const notesBoxTop = height * 0.5 + 40;
        const notesBoxHeight = height * 0.5 - 120;
        ctx.setLineDash([20, 15]);
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#666666';
        ctx.strokeRect(rightStart, notesBoxTop, rightWidth, notesBoxHeight);
        ctx.setLineDash([]);
        ctx.font = '36px Arial';
        ctx.fillStyle = '#999999';
        ctx.fillText('NOTES', rightStart + rightWidth / 2, height - 50);

        const dataUrl = canvas.toDataURL('image/png');
        this.setCache(this.exceptionCache, cacheKey, dataUrl);
        return dataUrl;
    }



    queuePrint(baseRouteName: string, stackNumber: number, trackingNumber?: string, force: boolean = false): string | null {
        if (!this.enabled && !force) return null;

        const now = performance.now();
        const jobId = `print-${++this.jobIdCounter}-${Date.now()}`;
        console.log(`[LabelPrintService] Queuing print job ${jobId} (force=${force})`);

        const job: PrintJob = {
            id: jobId,
            type: 'standard',
            baseRouteName,
            stackNumber,
            trackingNumber,
            status: 'pending',
            timestamp: Date.now(),
            perf: { tEnqueue: now },
        };

        this.printQueue.push(job);
        this.processQueue();

        return jobId;
    }

    queueExceptionPrint(orderId: string, force: boolean = false): string | null {
        if (!this.enabled && !force) return null;

        const now = performance.now();
        const jobId = `print-ex-${++this.jobIdCounter}-${Date.now()}`;
        console.log(`[LabelPrintService] Queuing exception print job ${jobId} (force=${force})`);

        const job: PrintJob = {
            id: jobId,
            type: 'exception',
            orderId,
            status: 'pending',
            timestamp: Date.now(),
            perf: { tEnqueue: now },
        };

        this.printQueue.push(job);
        this.processQueue();
        return jobId;
    }

    /**
     * Process print queue sequentially
     */
    private async processQueue(): Promise<void> {
        if (this.isPrinting) {
            return; // Already processing
        }

        this.isPrinting = true;

        while (this.printQueue.length > 0) {
            const job = this.printQueue.shift()!;
            job.status = 'printing';
            job.perf ??= { tEnqueue: performance.now() };
            job.perf.tDequeue = performance.now();

            const queueWaitMs = (job.perf.tDequeue - job.perf.tEnqueue).toFixed(0);
            console.log(`[PrintPerf] ${job.id} queueWait=${queueWaitMs}ms`);

            try {
                await this.executePrint(job);
                job.status = 'done';
            } catch (e) {
                job.status = 'failed';
                console.warn(`[PrintPerf] ${job.id} failed`, e);
            } finally {
                job.perf.tDone = performance.now();
                const totalMs = (job.perf.tDone - job.perf.tEnqueue).toFixed(0);
                console.log(`[PrintPerf] ${job.id} total=${totalMs}ms path=${job.perf.path || 'UNKNOWN'}`);
            }
        }

        this.isPrinting = false;
    }

    /**
     * Execute silent print using GDI via Electron API
     * Falls back to canvas-based printing if GDI is not available
     */
    private async executePrint(job: PrintJob): Promise<void> {
        const electronAPI = typeof window !== 'undefined' && (window as any).electronAPI;
        job.perf ??= { tEnqueue: performance.now() };

        // Try GDI printing first (preferred for Windows)
        if (electronAPI?.printGDI) {
            job.perf.path = 'GDI';
            const tStart = performance.now();
            try {
                if (job.type === 'exception' && job.orderId) {
                    await electronAPI.printGDI({
                        type: 'exception',
                        orderId: job.orderId
                    });
                } else if (job.type === 'standard' && job.baseRouteName && job.stackNumber) {
                    await electronAPI.printGDI({
                        type: 'standard',
                        routeName: job.baseRouteName,
                        stackNumber: job.stackNumber,
                        trackingNumber: job.trackingNumber || ''
                    });
                }
                console.log(`[PrintPerf] ${job.id} gdiCall=${(performance.now() - tStart).toFixed(0)}ms`);
                return;
            } catch (error) {
                console.warn('[Print] GDI print failed, falling back to canvas method:', error);
            }
        }

        // Fallback to canvas-based image printing
        job.perf.path = 'CANVAS';
        job.perf.tGenStart = performance.now();

        return new Promise((resolve, reject) => {
            try {
                let dataUrl: string;
                if (job.type === 'exception' && job.orderId) {
                    dataUrl = this.generateExceptionLabelImage(job.orderId);
                } else if (job.type === 'standard' && job.baseRouteName && job.stackNumber) {
                    dataUrl = this.generateLabelImage(job.baseRouteName, job.stackNumber);
                } else {
                    resolve(); return; // Invalid job, skip
                }

                job.perf!.tGenEnd = performance.now();
                console.log(`[PrintPerf] ${job.id} gen=${(job.perf!.tGenEnd - job.perf!.tGenStart!).toFixed(0)}ms dataUrlLen=${dataUrl.length}`);

                const electronImpl = electronAPI || (window as any).electron;

                if (electronImpl?.printImage || electronImpl?.printBase64) {
                    const printFn = electronImpl.printImage || electronImpl.printBase64;
                    job.perf!.tSendStart = performance.now();
                    printFn(dataUrl, { silent: true })
                        .then(() => {
                            job.perf!.tSendEnd = performance.now();
                            console.log(`[PrintPerf] ${job.id} send=${(job.perf!.tSendEnd - job.perf!.tSendStart!).toFixed(0)}ms`);
                            resolve();
                        })
                        .catch((error: Error) => reject(error));
                } else {
                    // Fallback to browser print dialog
                    job.perf!.path = 'IFRAME';
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);

                    const iframeDoc = iframe.contentWindow?.document;
                    if (!iframeDoc) {
                        throw new Error('Failed to access iframe document');
                    }

                    iframeDoc.open();
                    iframeDoc.write(`
            <html>
            <head>
              <title>Print Label</title>
              <style>
                @page { margin: 0; size: 10cm 15cm; }
                body { margin: 0; padding: 0; }
                img { width: 10cm; height: 15cm; display: block; }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" />
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.parent.document.body.removeChild(window.frameElement); }, 1000);
                }
              </script>
            </body>
            </html>
          `);
                    iframeDoc.close();

                    iframe.contentWindow?.focus();
                    setTimeout(() => {
                        iframe.contentWindow?.print();
                        setTimeout(() => {
                            document.body.removeChild(iframe);
                            resolve();
                        }, 1000);
                    }, 250);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Enable or disable auto-printing
     */
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!enabled) {
            // Clear pending jobs when disabled
            this.printQueue = this.printQueue.filter(j => j.status === 'printing');
        }
    }

    /**
     * Check if auto-print is enabled
     */
    isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Get current queue status
     */
    getQueueStatus(): { pending: number; printing: boolean } {
        return {
            pending: this.printQueue.length,
            printing: this.isPrinting,
        };
    }

    /**
     * Clear all pending print jobs
     */
    clearQueue(): void {
        this.printQueue = [];
    }
}

export const labelPrintService = new LabelPrintService();
