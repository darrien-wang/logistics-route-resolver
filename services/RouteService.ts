
import { ZIP_ROUTE_DATA } from '../constants';
import { IRouteDataSource, ZipRouteRecord } from '../types';

/**
 * Flexible implementation of the Data Source that can be updated at runtime.
 * This satisfies the requirement of not hardcoding the source.
 */
export class FlexibleDataSource implements IRouteDataSource {
  private records: ZipRouteRecord[] = [...ZIP_ROUTE_DATA];
  private sourceName: string = "Default Table";

  async getRouteByZip(zip: string): Promise<ZipRouteRecord | null> {
    // Standard matching logic - try exact match first
    let record = this.records.find(r => r.zip.toString() === zip.toString());

    // If no exact match and zip has 9 digits (xxxxx-xxxx), try 5-digit prefix
    if (!record && zip.includes('-')) {
      const fiveDigitZip = zip.split('-')[0];
      record = this.records.find(r => r.zip.toString() === fiveDigitZip);
      if (record) {
        console.log(`[RouteService] Fallback: ${zip} matched to 5-digit ${fiveDigitZip}`);
      }
    }

    return record || null;
  }

  updateData(newRecords: ZipRouteRecord[], name: string) {
    this.records = newRecords;
    this.sourceName = name;
  }

  getCurrentSourceName(): string {
    return this.sourceName;
  }

  getAllRecords(): ZipRouteRecord[] {
    return this.records;
  }

  deleteRecord(zip: string) {
    this.records = this.records.filter(r => r.zip.toString() !== zip.toString());
  }

  updateRecord(zip: string, updatedFields: Partial<ZipRouteRecord>) {
    this.records = this.records.map(r =>
      r.zip.toString() === zip.toString() ? { ...r, ...updatedFields } : r
    );
  }

  addRecord(record: ZipRouteRecord) {
    // Prevent duplicate zips
    this.records = [record, ...this.records.filter(r => r.zip.toString() !== record.zip.toString())];
  }
}

/**
 * Example of a future API-based middleware data source
 */
export class RemoteApiDataSource implements IRouteDataSource {
  async getRouteByZip(zip: string): Promise<ZipRouteRecord | null> {
    // Future implementation: fetch from /api/route-config?zip=...
    return null;
  }
}
