/**
 * Export Module - Export Engine
 * 
 * Generic export engine that processes any data with any config.
 * Supports single-sheet and multi-sheet Excel exports.
 */

import * as XLSX from 'xlsx';
import { ExportConfig, ColumnConfig, MultiSheetExportConfig, ValidationResult } from './types';
import { FormatterRegistry } from './FormatterRegistry';

export class ExportEngine {
    /**
     * Export single dataset to Excel
     */
    static exportToExcel<T>(data: T[], config: ExportConfig<T>): void {
        const worksheet = this.createWorksheet(data, config.columns);
        const workbook = XLSX.utils.book_new();

        const sheetName = (config.sheetName || 'Sheet1').substring(0, 31);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        const filename = config.filename || `Export_${Date.now()}`;
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    }

    /**
     * Export multiple datasets to a single Excel file with multiple sheets
     */
    static exportMultiSheet<T>(config: MultiSheetExportConfig<T>): void {
        const workbook = XLSX.utils.book_new();

        config.sheets.forEach((sheet, index) => {
            const worksheet = this.createWorksheet(sheet.data, sheet.columns);

            // Sanitize sheet name (Excel limits: 31 chars, no special chars)
            let sheetName = (sheet.name || `Sheet${index + 1}`)
                .replace(/[:\\/?*[\]]/g, '_')
                .substring(0, 31);

            // Ensure unique sheet names
            let uniqueName = sheetName;
            let counter = 1;
            while (workbook.SheetNames.includes(uniqueName)) {
                uniqueName = `${sheetName.substring(0, 28)}_${counter}`;
                counter++;
            }

            XLSX.utils.book_append_sheet(workbook, worksheet, uniqueName);
        });

        const filename = config.filename || `Export_${Date.now()}`;
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    }

    /**
     * Create worksheet from data and column config
     */
    private static createWorksheet<T>(data: T[], columns: ColumnConfig<T>[]): XLSX.WorkSheet {
        const rows = data.map(row => this.processRow(row, columns));
        return XLSX.utils.json_to_sheet(rows);
    }

    /**
     * Process a single row according to column config
     */
    private static processRow<T>(row: T, columns: ColumnConfig<T>[]): Record<string, any> {
        const result: Record<string, any> = {};

        columns.forEach(col => {
            // Get raw value from field path
            const rawValue = this.getFieldValue(row, col.field as string);

            // Apply formatter if specified
            let formattedValue: any;
            if (typeof col.formatter === 'function') {
                // Inline function formatter
                formattedValue = col.formatter(rawValue, row);
            } else if (typeof col.formatter === 'string') {
                // Named formatter from registry
                const formatterFn = FormatterRegistry.getFunction(col.formatter);
                formattedValue = formatterFn ? formatterFn(rawValue, row) : rawValue;
            } else {
                formattedValue = rawValue;
            }

            // Apply default if empty
            if (formattedValue === undefined || formattedValue === null || formattedValue === '') {
                formattedValue = col.defaultValue ?? '';
            }

            result[col.header] = formattedValue;
        });

        return result;
    }

    /**
     * Get value from object using dot notation path
     */
    private static getFieldValue(obj: any, path: string): any {
        if (!path) return undefined;

        const parts = path.split('.');
        let value = obj;

        for (const part of parts) {
            if (value === null || value === undefined) return undefined;
            value = value[part];
        }

        return value;
    }

    /**
     * Validate export config
     */
    static validateConfig<T>(config: ExportConfig<T>): ValidationResult {
        const errors: string[] = [];

        if (!config.columns || !Array.isArray(config.columns)) {
            errors.push('Config must have a columns array');
        } else {
            config.columns.forEach((col, i) => {
                if (!col.header) errors.push(`Column ${i}: missing header`);
                if (!col.field) errors.push(`Column ${i}: missing field`);
                if (typeof col.formatter === 'string' && !FormatterRegistry.get(col.formatter)) {
                    errors.push(`Column ${i}: unknown formatter "${col.formatter}"`);
                }
            });
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}
