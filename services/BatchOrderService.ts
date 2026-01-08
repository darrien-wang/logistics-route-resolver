/**
 * Batch Order Search Service
 * Handles batch ordersSearch with caching and 200-item chunking
 */

import { ApiSettings } from '../types';

export interface OrderSearchResult {
    trackingNumber: string;
    deliveryAddress: string;
    zipCode: string;
    weight: number;       // ordersWeight (lb)
    length: number;       // ordersLength (in)
    width: number;        // ordersWidth (in)
    height: number;       // ordersHeight (in)
    volume: number;       // calculated volume (ft³)
    deliverySiteCode: string;
    raw: any;
}

// Cache for order data: trackingNumber → order result
const orderCache = new Map<string, OrderSearchResult>();

/**
 * Batch search orders - splits into 200-item chunks
 * Returns cached results if available
 */
export async function batchSearchOrders(
    trackingNumbers: string[],
    settings: ApiSettings
): Promise<Map<string, OrderSearchResult>> {
    const results = new Map<string, OrderSearchResult>();
    const uncachedNumbers: string[] = [];

    // Check cache first
    for (const tn of trackingNumbers) {
        const cached = orderCache.get(tn.toUpperCase());
        if (cached) {
            results.set(tn.toUpperCase(), cached);
        } else {
            uncachedNumbers.push(tn.toUpperCase());
        }
    }

    console.log(`[BatchOrderSearch] ${trackingNumbers.length} total, ${results.size} cached, ${uncachedNumbers.length} to fetch`);

    if (uncachedNumbers.length === 0) {
        return results;
    }

    // Split into chunks of 200
    const CHUNK_SIZE = 200;
    const chunks: string[][] = [];
    for (let i = 0; i < uncachedNumbers.length; i += CHUNK_SIZE) {
        chunks.push(uncachedNumbers.slice(i, i + CHUNK_SIZE));
    }

    console.log(`[BatchOrderSearch] Fetching ${uncachedNumbers.length} orders in ${chunks.length} chunks`);

    // Fetch each chunk
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        console.log(`[BatchOrderSearch] Fetching chunk ${i + 1}/${chunks.length} (${chunk.length} items)`);

        try {
            const chunkResults = await fetchOrdersChunk(chunk, settings);

            // Cache and add to results
            for (const [tn, data] of chunkResults) {
                orderCache.set(tn, data);
                results.set(tn, data);
            }
        } catch (error) {
            console.error(`[BatchOrderSearch] Chunk ${i + 1} failed:`, error);
        }
    }

    return results;
}

/**
 * Fetch a single chunk of orders (max 200)
 */
async function fetchOrdersChunk(
    trackingNumbers: string[],
    settings: ApiSettings
): Promise<Map<string, OrderSearchResult>> {
    const results = new Map<string, OrderSearchResult>();

    if (!settings.enabled || !settings.wpglbAuth || !settings.authorization) {
        return results;
    }

    const formData = new FormData();
    formData.append("pageNumber", "1");
    formData.append("limit", "200");
    formData.append("trackingNumber", trackingNumbers.join(","));
    formData.append("queryTimeType", "0");

    const response = await fetch("https://dms.wpglb.com/api/wpglb-dms-orders/order/orders/ordersSearch", {
        method: "POST",
        headers: {
            "wpglb-auth": settings.wpglbAuth,
            "authorization": settings.authorization,
            "wpglb-requested-with": "WpglbHttpRequest",
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    console.log(`[BatchOrderSearch] Response: ${result.rows?.length || 0} orders found`);

    if (result.success && result.rows) {
        for (const row of result.rows) {
            const deliveryAddress = row.deliveryAddress || "";

            // Extract zip code from address - pick the LAST match to avoid picking up street numbers
            const allMatches = deliveryAddress.match(/\b\d{5}(-\d{4})?\b/g);
            const zipCode = allMatches ? allMatches[allMatches.length - 1] : "";

            // Extract dimensions
            const length = parseFloat(row.ordersLength) || 0;
            const width = parseFloat(row.ordersWidth) || 0;
            const height = parseFloat(row.ordersHeight) || 0;
            // Calculate volume in cubic feet (1 ft³ = 1728 in³)
            const volumeInCubicInches = length * width * height;
            const volumeInCubicFeet = volumeInCubicInches / 1728;

            const orderResult: OrderSearchResult = {
                trackingNumber: row.trackingNumber,
                deliveryAddress,
                zipCode,
                weight: parseFloat(row.ordersWeight) || 0,
                length,
                width,
                height,
                volume: Math.round(volumeInCubicFeet * 100) / 100, // Round to 2 decimals
                deliverySiteCode: row.deliverySiteCode || "",
                raw: row
            };

            // STRICT MATCHING: Only add if this result was explicitly requested (case-insensitive)
            // The API might return partial matches, so we filter them out to be safe
            if (trackingNumbers.some(tn => tn.toUpperCase() === row.trackingNumber.toUpperCase())) {
                results.set(row.trackingNumber.toUpperCase(), orderResult);
            }
        }
    }

    return results;
}

/**
 * Get cached order data
 */
export function getCachedOrder(trackingNumber: string): OrderSearchResult | undefined {
    return orderCache.get(trackingNumber.toUpperCase());
}

/**
 * Clear the order cache
 */
export function clearOrderCache(): void {
    orderCache.clear();
    console.log('[BatchOrderSearch] Cache cleared');
}

/**
 * Get cache size
 */
export function getOrderCacheSize(): number {
    return orderCache.size;
}
