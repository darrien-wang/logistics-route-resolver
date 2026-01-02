import { RouteStack, StackExportData, ResolvedRouteInfo } from '../types';
import * as XLSX from 'xlsx';

export interface ExportOptions {
    mode: 'all' | 'overflow';
}

class StackExportService {

    /**
     * Generate export JSON for provided stacks
     */
    exportStacks(stacks: RouteStack[], options: ExportOptions): string {
        let stacksToExport = stacks;

        if (options.mode === 'overflow') {
            // Only export the overflow portion of stacks? 
            // OR only stacks that are overflow type?
            // "Export ALL overflow orders from ALL stacks"
            // If I have a normal stack (45/40), it has 5 overflow. Should I export a new stack of 5?
            // Or export the whole stack marked as overflow?

            // "System collects overflow orders from ALL stacks... Generates single JSON"
            // "Imports... 导出后，导入时... 依然显示为 Gold Border Stack"

            // Interpretation:
            // For 'overflow' mode, we find orders that exceed capacity in standard stacks,
            // AND all orders in existing 'overflow' stacks.
            // We package them into new RouteStack objects with type='overflow'.

            stacksToExport = this.generateOverflowStacks(stacks);
        }

        const exportData: StackExportData = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            stacks: stacksToExport
        };

        return JSON.stringify(exportData, null, 2);
    }

    /**
     * Parse and validate imported JSON
     */
    importStacks(jsonString: string): RouteStack[] {
        try {
            const data: StackExportData = JSON.parse(jsonString);

            if (data.version !== '1.0') {
                console.warn('Unknown export version:', data.version);
            }

            if (!Array.isArray(data.stacks)) {
                throw new Error('Invalid export format: missing stacks array');
            }

            // Process imported stacks
            return data.stacks.map(s => {
                // Ensure converted dates are valid, etc.
                // Force marked as imported
                return {
                    ...s,
                    // If it was already overflow/imported, keep it. 
                    // If it was normal, keep it normal (per user request).
                    // BUT, we want to flag that it WAS imported now.
                    // Maybe add a sourceNote?
                    importedAt: new Date().toISOString(),
                    sourceNote: s.sourceNote || `Imported from export dated ${data.exportedAt}`
                };
            });

        } catch (e) {
            console.error('Import failed', e);
            throw new Error('Failed to parse stack import file');
        }
    }

    /**
     * Import stacks from Excel file
     * Supports multi-sheet Excel files where each sheet is a stack
     */
    async importStacksFromExcel(file: File): Promise<RouteStack[]> {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            const stacks: RouteStack[] = [];
            const timestamp = new Date().toISOString();

            // Process each sheet as a separate stack
            workbook.SheetNames.forEach((sheetName, index) => {
                const worksheet = workbook.Sheets[sheetName];
                const data: any[] = XLSX.utils.sheet_to_json(worksheet);

                if (data.length === 0) return; // Skip empty sheets

                // Parse sheet name to extract route and stack number
                // Expected format: "ROUTE-1" or "OVFL-ROUTE" or custom names
                const isOverflow = sheetName.startsWith('OVFL');
                let route = sheetName;
                let stackNumber = index + 1;

                // Try to parse route-number format
                const match = sheetName.match(/^(.+?)-(\d+)$/);
                if (match) {
                    route = match[1];
                    stackNumber = parseInt(match[2], 10);
                }

                // Convert Excel rows to ResolvedRouteInfo objects
                const orders: ResolvedRouteInfo[] = data.map((row, orderIndex) => ({
                    orderId: row['Order ID'] || `IMPORTED-${timestamp}-${index}-${orderIndex}`,
                    date: row['Date'] || '',
                    address: row['Address'] || row['Location'] || '',
                    zipCode: row['Zip Code'] || '',
                    locationId: row['Location ID'] || '',
                    locationName: row['Location Name'] || '',
                    latitude: row['Latitude'] || undefined,
                    longitude: row['Longitude'] || undefined,
                    duration: row['Duration'] || undefined,
                    twFrom: row['TW from'] || '',
                    twTo: row['TW to'] || '',
                    weight: row['Weight'] || undefined,
                    volume: row['Volume'] || undefined,
                    vehicleFeatures: row['Vehicle Features'] || '',
                    skills: row['Skills'] || '',
                    assignedToDriver: row['Assigned to Driver'] || '',
                    notes: row['Notes'] || '',
                    email: row['Email'] || '',
                    phone: row['Phone'] || '',
                    notifications: row['Notifications'] || '',
                    resolvedAt: timestamp,
                    route: (row['Source Route'] || row['Route Config']) ? {
                        zip: row['Zip Code'] || '',
                        metroArea: row['Metro Area'] || '',
                        state: '',
                        destinationZone: '',
                        routeConfiguration: row['Source Route'] || row['Route Config'] || route,
                        route2Configuration: '',
                        zipCodes: []
                    } as any : undefined
                }));

                // Create RouteStack object
                const stack: RouteStack = {
                    id: `IMPORTED-${timestamp}-${index}`,
                    route: route,
                    stackNumber: stackNumber,
                    orders: orders,
                    capacity: 40, // Default capacity
                    status: 'active',
                    type: isOverflow ? 'overflow' : 'normal',
                    isOverflow: isOverflow,
                    overflowCount: isOverflow ? Math.max(0, orders.length - 40) : 0,
                    importedAt: timestamp,
                    sourceNote: `Imported from Excel: ${file.name}`
                };

                stacks.push(stack);
            });

            return stacks;

        } catch (e) {
            console.error('Excel import failed', e);
            throw new Error('Failed to import Excel file. Please ensure it matches the export format.');
        }
    }

    /**
     * Helper: Extract overflow items into new Overflow Stacks
     */
    private generateOverflowStacks(currentStacks: RouteStack[]): RouteStack[] {
        const overflowStacks: RouteStack[] = [];

        currentStacks.forEach(stack => {
            // 1. If stack ITSELF is overflow type, export it entirely
            if (stack.type === 'overflow') {
                overflowStacks.push({ ...stack });
                return;
            }

            // 2. If stack is Normal/Merged but has overflow count > 0
            if (stack.overflowCount > 0) {
                // We need to identify WHICH orders are overflow.
                // Strategy: Take the LAST N orders.
                const overflowCount = stack.overflowCount;
                const orders = stack.orders;
                const overflowOrders = orders.slice(orders.length - overflowCount);

                if (overflowOrders.length > 0) {
                    overflowStacks.push({
                        id: `OVERFLOW-${stack.route}-${Date.now()}`,
                        route: stack.route,
                        stackNumber: stack.stackNumber + 1, // Next logical number?
                        orders: overflowOrders,
                        capacity: 40, // Default for new stack
                        status: 'open',
                        type: 'overflow', // FORCE type overflow for these extracted items
                        isOverflow: true, // Legacy flag for Gold Border
                        overflowCount: 0, // It's a fresh stack, so itself isn't technically overflowing its OWN capacity yet?
                        // OR we mark it as isOverflow container.
                        importedAt: new Date().toISOString()
                    });
                }
            }
        });

        return overflowStacks;
    }
}

export const stackExportService = new StackExportService();
