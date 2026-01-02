/**
 * Export Module - Formatter Registry
 * 
 * Central registry for field formatters with metadata.
 * Designed for future AI integration - formatters expose descriptions and examples.
 */

import { FormatterDef } from './types';

class FormatterRegistryClass {
    private formatters = new Map<string, FormatterDef>();

    /**
     * Register a formatter
     */
    register(def: FormatterDef): void {
        this.formatters.set(def.name, def);
    }

    /**
     * Get a formatter by name
     */
    get(name: string): FormatterDef | undefined {
        return this.formatters.get(name);
    }

    /**
     * Get formatter function by name
     */
    getFunction(name: string): ((value: any, row: any) => any) | undefined {
        return this.formatters.get(name)?.fn;
    }

    /**
     * List all available formatters (for AI context generation)
     */
    list(): FormatterDef[] {
        return Array.from(this.formatters.values());
    }

    /**
     * Generate AI-friendly context describing available formatters
     */
    getAIContext(): string {
        return this.list().map(f =>
            `- ${f.name}: ${f.description}${f.examples ? ` (e.g., "${f.examples[0]?.input}" → "${f.examples[0]?.output}")` : ''}`
        ).join('\n');
    }
}

// Singleton instance
export const FormatterRegistry = new FormatterRegistryClass();

// ============================================
// Built-in Formatters
// ============================================

// Address formatter for OR system compatibility
FormatterRegistry.register({
    name: 'addressOR',
    description: 'Format address for OR system: removes comma between State abbreviation and Zip code',
    fn: (addr: string) => (addr || '').replace(/([A-Z]{2})\s*[,，]\s*(\d)/g, '$1 $2'),
    examples: [
        { input: 'VISTA, CA, 92084, USA', output: 'VISTA, CA 92084, USA' },
        { input: '123 Main St, NY, 10001', output: '123 Main St, NY 10001' }
    ]
});

// Simple passthrough with empty fallback
FormatterRegistry.register({
    name: 'string',
    description: 'Convert to string, returns empty string if null/undefined',
    fn: (val: any) => val?.toString() || '',
    examples: [
        { input: null, output: '' },
        { input: 'hello', output: 'hello' }
    ]
});

// Date formatter
FormatterRegistry.register({
    name: 'date',
    description: 'Format date string, returns empty if null',
    fn: (val: string) => val || '',
    examples: [
        { input: '2024-01-15', output: '2024-01-15' },
        { input: null, output: '' }
    ]
});

// Timestamp to locale string
FormatterRegistry.register({
    name: 'timestamp',
    description: 'Convert timestamp or ISO string to locale date/time string',
    fn: (ts: number | string) => ts ? new Date(ts).toLocaleString() : '',
    examples: [
        { input: 1704067200000, output: '1/1/2024, 12:00:00 AM' }
    ]
});

// Number formatter with fallback
FormatterRegistry.register({
    name: 'number',
    description: 'Format number, returns empty string if null/undefined',
    fn: (val: any) => val ?? '',
    examples: [
        { input: 42, output: 42 },
        { input: null, output: '' }
    ]
});

// Boolean to Yes/No
FormatterRegistry.register({
    name: 'yesNo',
    description: 'Convert boolean to Yes/No string',
    fn: (val: boolean) => val ? 'Yes' : 'No',
    examples: [
        { input: true, output: 'Yes' },
        { input: false, output: 'No' }
    ]
});
