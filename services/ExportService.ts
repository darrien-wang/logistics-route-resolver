
import { ResolvedRouteInfo, IExportService, OrderEventStatus } from '../types';
import * as XLSX from 'xlsx';

/**
 * Excel implementation of Export Service
 */
export class ExcelExportService implements IExportService {
  /**
   * Export processed route information
   */
  async export(data: ResolvedRouteInfo[]): Promise<void> {
    const headers = [
      "Order ID", "Date", "Address", "Zip Code", "Route", "Metro Area",
      "Weight", "Volume", "Resolved At"
    ];

    const rows = data.map(item => [
      item.orderId,
      item.date,
      item.address,
      item.zipCode || "",
      item.route?.routeConfiguration || "",
      item.route?.metroArea || "",
      item.weight || 0,
      item.volume || 0,
      new Date(item.resolvedAt).toLocaleString()
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Processed_Orders");
    
    XLSX.writeFile(workbook, `Order_Export_${new Date().getTime()}.xlsx`);
  }

  /**
   * Export the Activity Stream / Operation Log
   */
  async exportActivityLog(log: Record<string, OrderEventStatus[]>): Promise<void> {
    const headers = ["Order ID", "Event Type", "Status", "Timestamp"];
    const rows: any[] = [];

    Object.entries(log).forEach(([orderId, events]) => {
      events.forEach(event => {
        rows.push([
          orderId,
          event.type,
          event.status,
          new Date(event.timestamp).toLocaleString()
        ]);
      });
    });

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Activity_Log");
    
    XLSX.writeFile(workbook, `Activity_Log_${new Date().getTime()}.xlsx`);
  }
}
