/**
 * Export Module - Type Definitions
 * 
 * Configuration-driven export system supporting AI-generated configs in the future.
 */

/**
 * Formatter definition with metadata for future AI integration
 */
export interface FormatterDef {
    name: string;
    description: string;
    fn: (value: any, row: any) => any;
    examples?: { input: any; output: any }[];
}

/**
 * Column configuration for export
 */
export interface ColumnConfig<T = any> {
    /** Column header in Excel */
    header: string;
    /** Source field path (supports dot notation like 'route.configuration') */
    field: keyof T | string;
    /** Formatter name from registry, or inline function */
    formatter?: string | ((value: any, row: T) => any);
    /** Fallback value if field is empty */
    defaultValue?: any;
}

/**
 * Export configuration
 */
export interface ExportConfig<T = any> {
    columns: ColumnConfig<T>[];
    sheetName?: string;
    filename?: string;
}

/**
 * Multi-sheet export configuration
 */
export interface MultiSheetExportConfig<T = any> {
    sheets: {
        name: string;
        data: T[];
        columns: ColumnConfig<T>[];
    }[];
    filename?: string;
}

/**
 * Validation result for config validation
 */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
