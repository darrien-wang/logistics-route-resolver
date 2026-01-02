/**
 * Export Presets - Order Export Configuration
 * 
 * Pre-defined column configurations for common export scenarios.
 */

import { ExportConfig, ColumnConfig } from '../types';
import { ResolvedRouteInfo } from '../../../types';

/**
 * Standard order export columns (OR-compatible format)
 */
export const orderColumns: ColumnConfig<ResolvedRouteInfo>[] = [
    { header: 'Order ID', field: 'orderId', formatter: 'string' },
    { header: 'Source Route', field: 'route.routeConfiguration', formatter: 'string' },
    { header: 'Date', field: 'date', formatter: 'date' },
    { header: 'Address', field: 'address', formatter: 'addressOR' },
    { header: 'Location', field: 'address', formatter: 'addressOR' },
    { header: 'Location ID', field: 'locationId', formatter: 'string' },
    { header: 'Location Name', field: 'locationName', formatter: 'string' },
    { header: 'Latitude', field: 'latitude', formatter: 'number' },
    { header: 'Longitude', field: 'longitude', formatter: 'number' },
    { header: 'Duration', field: 'duration', formatter: 'number' },
    { header: 'TW from', field: 'twFrom', formatter: 'string' },
    { header: 'TW to', field: 'twTo', formatter: 'string' },
    { header: 'Weight', field: 'weight', formatter: 'number' },
    { header: 'Volume', field: 'volume', formatter: 'number' },
    { header: 'Vehicle Features', field: 'vehicleFeatures', formatter: 'string' },
    { header: 'Skills', field: 'skills', formatter: 'string' },
    { header: 'Assigned to Driver', field: 'assignedToDriver', formatter: 'string' },
    { header: 'Notes', field: 'notes', formatter: 'string' },
    { header: 'Email', field: 'email', formatter: 'string' },
    { header: 'Phone', field: 'phone', formatter: 'string' },
    { header: 'Notifications', field: 'notifications', formatter: 'string' },
];

/**
 * Order export with source stack info (for stack exports)
 */
export const orderWithStackColumns: ColumnConfig<ResolvedRouteInfo & { sourceRoute?: string; sourceStackNum?: number | string }>[] = [
    { header: 'Order ID', field: 'orderId', formatter: 'string' },
    { header: 'Source Route', field: 'sourceRoute', formatter: 'string' },
    { header: 'Source Stack #', field: 'sourceStackNum', formatter: 'number' },
    { header: 'Date', field: 'date', formatter: 'date' },
    { header: 'Address', field: 'address', formatter: 'addressOR' },
    { header: 'Location', field: 'address', formatter: 'addressOR' },
    { header: 'Location ID', field: 'locationId', formatter: 'string' },
    { header: 'Location Name', field: 'locationName', formatter: 'string' },
    { header: 'Latitude', field: 'latitude', formatter: 'number' },
    { header: 'Longitude', field: 'longitude', formatter: 'number' },
    { header: 'Duration', field: 'duration', formatter: 'number' },
    { header: 'TW from', field: 'twFrom', formatter: 'string' },
    { header: 'TW to', field: 'twTo', formatter: 'string' },
    { header: 'Weight', field: 'weight', formatter: 'number' },
    { header: 'Volume', field: 'volume', formatter: 'number' },
    { header: 'Vehicle Features', field: 'vehicleFeatures', formatter: 'string' },
    { header: 'Skills', field: 'skills', formatter: 'string' },
    { header: 'Assigned to Driver', field: 'assignedToDriver', formatter: 'string' },
    { header: 'Notes', field: 'notes', formatter: 'string' },
    { header: 'Email', field: 'email', formatter: 'string' },
    { header: 'Phone', field: 'phone', formatter: 'string' },
    { header: 'Notifications', field: 'notifications', formatter: 'string' },
    { header: 'Overflow Date', field: 'overflowSource.movedAt', formatter: 'timestamp' },
];

/**
 * Exception export columns
 */
export const exceptionColumns: ColumnConfig<ResolvedRouteInfo>[] = [
    { header: 'Order ID', field: 'orderId', formatter: 'string' },
    { header: 'Reason', field: 'exceptionReason', defaultValue: 'Unknown' },
    { header: 'Date', field: 'date', formatter: 'date' },
    { header: 'Address', field: 'address', formatter: 'addressOR' },
    { header: 'Location', field: 'address', formatter: 'addressOR' },
    { header: 'Zip Code', field: 'zipCode', formatter: 'string' },
    { header: 'Resolved At', field: 'resolvedAt', formatter: 'timestamp' },
];

/**
 * Activity log export columns
 */
export const activityLogColumns: ColumnConfig<{ orderId: string; type: string; status: string; timestamp: number }>[] = [
    { header: 'Order ID', field: 'orderId', formatter: 'string' },
    { header: 'Event Type', field: 'type', formatter: 'string' },
    { header: 'Status', field: 'status', formatter: 'string' },
    { header: 'Timestamp', field: 'timestamp', formatter: 'timestamp' },
];

/**
 * Pre-configured export configs
 */
export const OrderExportConfig: ExportConfig<ResolvedRouteInfo> = {
    columns: orderColumns,
    sheetName: 'Orders',
    filename: 'Order_Export'
};

export const ExceptionExportConfig: ExportConfig<ResolvedRouteInfo> = {
    columns: exceptionColumns,
    sheetName: 'Exceptions',
    filename: 'Exceptions'
};

// ============================================
// Export Templates (for template selector modal)
// ============================================

/**
 * OR Format - Optimized for OptimoRoute import
 * Uses addressOR formatter for State/Zip formatting
 */
export const orFormatColumns: ColumnConfig<ResolvedRouteInfo & { sourceRoute?: string; sourceStackNum?: number | string }>[] = [
    { header: 'Order ID', field: 'orderId', formatter: 'string' },
    { header: 'Date', field: 'date', formatter: 'date' },
    { header: 'Address', field: 'address', formatter: 'addressOR' },
    { header: 'Location', field: 'address', formatter: 'addressOR' },
    { header: 'Location ID', field: 'locationId', formatter: 'string' },
    { header: 'Location Name', field: 'locationName', formatter: 'string' },
    { header: 'Latitude', field: 'latitude', formatter: 'number' },
    { header: 'Longitude', field: 'longitude', formatter: 'number' },
    { header: 'Duration', field: 'duration', formatter: 'number' },
    { header: 'TW from', field: 'twFrom', formatter: 'string' },
    { header: 'TW to', field: 'twTo', formatter: 'string' },
    { header: 'Weight', field: 'weight', formatter: 'number' },
    { header: 'Volume', field: 'volume', formatter: 'number' },
    { header: 'Vehicle Features', field: 'vehicleFeatures', formatter: 'string' },
    { header: 'Skills', field: 'skills', formatter: 'string' },
    { header: 'Assigned to Driver', field: 'assignedToDriver', formatter: 'string' },
    { header: 'Notes', field: 'notes', formatter: 'string' },
    { header: 'Email', field: 'email', formatter: 'string' },
    { header: 'Phone', field: 'phone', formatter: 'string' },
    { header: 'Notifications', field: 'notifications', formatter: 'string' },
];

/**
 * LRR Format - Full Logistics Route Resolver format
 * Includes source stack info and overflow tracking
 */
export const lrrFormatColumns: ColumnConfig<ResolvedRouteInfo & { sourceRoute?: string; sourceStackNum?: number | string }>[] = [
    { header: 'Order ID', field: 'orderId', formatter: 'string' },
    { header: 'Source Route', field: 'sourceRoute', formatter: 'string' },
    { header: 'Source Stack #', field: 'sourceStackNum', formatter: 'number' },
    { header: 'Date', field: 'date', formatter: 'date' },
    { header: 'Address', field: 'address', formatter: 'string' },
    { header: 'Zip Code', field: 'zipCode', formatter: 'string' },
    { header: 'Route Config', field: 'route.routeConfiguration', formatter: 'string' },
    { header: 'Metro Area', field: 'route.metroArea', formatter: 'string' },
    { header: 'Weight', field: 'weight', formatter: 'number' },
    { header: 'Volume', field: 'volume', formatter: 'number' },
    { header: 'Resolved At', field: 'resolvedAt', formatter: 'timestamp' },
    { header: 'Overflow From', field: 'overflowSource.route', formatter: 'string' },
    { header: 'Overflow Date', field: 'overflowSource.movedAt', formatter: 'timestamp' },
    { header: 'Email', field: 'email', formatter: 'string' },
    { header: 'Phone', field: 'phone', formatter: 'string' },
];

/**
 * Export Template Definition
 */
export interface ExportTemplate {
    id: string;
    name: string;
    description: string;
    columns: ColumnConfig<any>[];
}

/**
 * Available export templates
 */
export const exportTemplates: ExportTemplate[] = [
    {
        id: 'or',
        name: 'OptimoRoute (OR)',
        description: 'Optimized for OptimoRoute import. Address formatted with State+Zip merged.',
        columns: orFormatColumns
    },
    {
        id: 'lrr',
        name: 'Logistics Route Resolver',
        description: 'Full format with stack info, overflow tracking, and route metadata.',
        columns: lrrFormatColumns
    },
    {
        id: 'full',
        name: 'Complete Export',
        description: 'All available fields including timestamps and stack details.',
        columns: orderWithStackColumns
    }
];

/**
 * Get template by ID
 */
export const getTemplateById = (id: string): ExportTemplate | undefined => {
    return exportTemplates.find(t => t.id === id);
};
