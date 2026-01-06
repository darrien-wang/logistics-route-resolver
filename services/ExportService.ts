/**
 * Export Service - Refactored to use Modular Export System
 * 
 * This service now acts as a facade over the modular lib/export module.
 */

import { ResolvedRouteInfo, IExportService, OrderEventStatus, RouteStack } from '../types';
import { ExportEngine, exceptionColumns, orderWithStackColumns, activityLogColumns } from '../lib/export';

/**
 * Excel implementation of Export Service
 */
export class ExcelExportService implements IExportService {
  /**
   * Export processed route information
   */
  async export(data: ResolvedRouteInfo[]): Promise<void> {
    ExportEngine.exportToExcel(data, {
      columns: [
        { header: 'Order ID', field: 'orderId', formatter: 'string' },
        { header: 'Date', field: 'date', formatter: 'date' },
        { header: 'Address', field: 'address', formatter: 'addressOR' },
        { header: 'Zip Code', field: 'zipCode', formatter: 'string' },
        { header: 'Route', field: 'route.routeConfiguration', formatter: 'string' },
        { header: 'Metro Area', field: 'route.metroArea', formatter: 'string' },
        { header: 'Weight', field: 'weight', formatter: 'number' },
        { header: 'Volume', field: 'volume', formatter: 'number' },
        { header: 'Resolved At', field: 'resolvedAt', formatter: 'timestamp' },
      ],
      sheetName: 'Processed_Orders',
      filename: `Order_Export_${new Date().getTime()}`
    });
  }

  /**
   * Export the Activity Stream / Operation Log
   */
  async exportActivityLog(log: Record<string, OrderEventStatus[]>): Promise<void> {
    // Flatten log to array
    const rows: { orderId: string; type: string; status: string; timestamp: string }[] = [];
    Object.entries(log).forEach(([orderId, events]) => {
      events.forEach(event => {
        rows.push({
          orderId,
          type: event.type,
          status: event.status,
          timestamp: event.timestamp
        });
      });
    });

    ExportEngine.exportToExcel(rows, {
      columns: activityLogColumns,
      sheetName: 'Activity_Log',
      filename: `Activity_Log_${new Date().getTime()}`
    });
  }

  /**
   * Export Exception Pool
   */
  async exportExceptions(data: ResolvedRouteInfo[]): Promise<void> {
    ExportEngine.exportToExcel(data, {
      columns: exceptionColumns,
      sheetName: 'Exceptions',
      filename: `Exceptions_${new Date().getTime()}`
    });
  }

  /**
   * Export multiple stacks to Excel (Multi-sheet)
   */
  async exportStacks(stacks: RouteStack[]): Promise<void> {
    const sheets = stacks.map(stack => {
      // Build lookup for merged stacks
      const routeStackLookup = new Map<string, number>();
      if (stack.mergeInfo?.components) {
        stack.mergeInfo.components.forEach(comp => {
          routeStackLookup.set(comp.route, comp.stackNumber);
        });
      }

      // Enrich orders with source info
      const enrichedOrders = stack.orders.map(order => {
        let sourceRoute = '';
        let sourceStackNum: number | string = '';

        if (order.overflowSource) {
          sourceRoute = order.overflowSource.route;
          sourceStackNum = order.overflowSource.stackNumber;
        } else if (order.route?.routeConfiguration) {
          sourceRoute = order.route.routeConfiguration;
          if (stack.mergeInfo) {
            sourceStackNum = routeStackLookup.get(sourceRoute) || 1;
          } else {
            sourceStackNum = stack.stackNumber;
          }
        }

        return {
          ...order,
          sourceRoute,
          sourceStackNum
        };
      });

      // Generate sheet name
      let sheetName = `${stack.route}-${stack.stackNumber}`;
      if (stack.type === 'overflow') {
        sheetName = `OVFL-${stack.route}`;
      }

      return {
        name: sheetName,
        data: enrichedOrders,
        columns: orderWithStackColumns
      };
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    ExportEngine.exportMultiSheet({
      sheets,
      filename: `Batch_Stack_Export_${timestamp}`
    });
  }
}
