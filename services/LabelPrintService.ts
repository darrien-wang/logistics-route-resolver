/**
 * LabelPrintService - Async print queue for stack labels
 * 
 * Manages background printing of stack labels with queue support
 * to prevent blocking the scanning workflow.
 */

export interface PrintJob {
    id: string;
    baseRouteName: string;
    stackNumber: number;
    status: 'pending' | 'printing' | 'done' | 'failed';
    timestamp: number;
}

class LabelPrintService {
    private printQueue: PrintJob[] = [];
    private isPrinting: boolean = false;
    private enabled: boolean = false;
    private jobIdCounter: number = 0;
    private imageCache: Map<string, string> = new Map();

    /**
     * Generate label image (10cm x 15cm at 300 DPI)
     * Extracted from RouteStackCard.tsx
     */
    generateLabelImage(baseRouteName: string, stackNumber: number): string {
        const tStart = performance.now();
        const cacheKey = `${baseRouteName}-${stackNumber}`;
        if (this.imageCache.has(cacheKey)) {
            const dataUrl = this.imageCache.get(cacheKey)!;
            console.log(`[Perf] Image cache hit (${(performance.now() - tStart).toFixed(2)}ms)`);
            return dataUrl;
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

        // Top half: Route name - centered and auto-sized
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Auto-size font to fit the left section width
        let fontSize = 200;
        ctx.font = `bold ${fontSize}px Arial`;
        let textWidth = ctx.measureText(baseRouteName).width;

        while (textWidth > leftWidth - 80 && fontSize > 50) {
            fontSize -= 5;
            ctx.font = `bold ${fontSize}px Arial`;
            textWidth = ctx.measureText(baseRouteName).width;
        }

        ctx.fillText(baseRouteName, leftWidth / 2, height * 0.25);

        // Divider line
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(20, height * 0.5);
        ctx.lineTo(width - 20, height * 0.5);
        ctx.stroke();

        // Bottom half: Stack number
        let stackFontSize = 300;
        ctx.font = `bold ${stackFontSize}px Arial`;
        let stackTextWidth = ctx.measureText(`${stackNumber}`).width;

        while (stackTextWidth > leftWidth - 80 && stackFontSize > 100) {
            stackFontSize -= 10;
            ctx.font = `bold ${stackFontSize}px Arial`;
            stackTextWidth = ctx.measureText(`${stackNumber}`).width;
        }

        ctx.fillText(`${stackNumber}`, leftWidth / 2, height * 0.75);

        // Right side: Dashed rectangle for notes
        const notesBoxTop = height * 0.5 + 40;
        const notesBoxHeight = height * 0.5 - 120;

        ctx.setLineDash([20, 15]);
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#666666';
        ctx.strokeRect(rightStart, notesBoxTop, rightWidth, notesBoxHeight);

        // Notes hint text
        ctx.setLineDash([]);
        ctx.font = '36px Arial';
        ctx.fillStyle = '#999999';
        ctx.textAlign = 'center';
        ctx.fillText('NOTES', rightStart + rightWidth / 2, height - 50);

        const dataUrl = canvas.toDataURL('image/png');
        this.imageCache.set(cacheKey, dataUrl);
        console.log(`[Perf] Image generation (${(performance.now() - tStart).toFixed(2)}ms)`);
        return dataUrl;
    }

    /**
     * Queue a print job (non-blocking)
     */
    queuePrint(baseRouteName: string, stackNumber: number): string {
        const jobId = `print-${++this.jobIdCounter}-${Date.now()}`;
        const job: PrintJob = {
            id: jobId,
            baseRouteName,
            stackNumber,
            status: 'pending',
            timestamp: Date.now(),
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
            const queueWait = Date.now() - job.timestamp;
            console.log(`[Perf] Queue wait time: ${queueWait}ms`);

            try {
                await this.executePrint(job);
                job.status = 'done';
            } catch {
                job.status = 'failed';
            }
        }

        this.isPrinting = false;
    }

    /**
   * Execute silent print using Electron API
   */
    private async executePrint(job: PrintJob): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const dataUrl = this.generateLabelImage(job.baseRouteName, job.stackNumber);
                const electronAPI = typeof window !== 'undefined' && (window as any).electronAPI;

                if (electronAPI?.printImage) {
                    const tStart = performance.now();
                    electronAPI.printImage(dataUrl, { silent: true })
                        .then(() => {
                            console.log(`[Perf] Electron IPC + Print time (${(performance.now() - tStart).toFixed(0)}ms)`);
                            resolve();
                        })
                        .catch((error: Error) => reject(error));
                } else {
                    // Fallback to browser print dialog (not truly silent)
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
            </body>
            </html>
          `);
                    iframeDoc.close();

                    // Wait for image to load, then print
                    iframe.contentWindow?.focus();
                    setTimeout(() => {
                        iframe.contentWindow?.print();

                        // Clean up iframe after print dialog
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

// Export singleton instance
export const labelPrintService = new LabelPrintService();
