/**
 * Independent Unload Service
 * Handles the three-step unload workflow without going through the middleware chain
 */

import { ApiSettings, EventFinishedHandler } from '../types';

// Cache for unload data
interface UnloadCacheEntry {
    loadingListId: string;
    loadingListCode: string;
    pendingItems: Map<string, { detailId: string; deliverySiteCode: string }>;
}

// Global cache
const unloadCache = new Map<string, UnloadCacheEntry>();
const trackingToLoadingListCache = new Map<string, string>();

export interface UnloadResult {
    success: boolean;
    message: string;
    step?: number;
}

export async function executeUnload(
    trackingNumber: string,
    settings: ApiSettings,
    onEventFinished?: EventFinishedHandler
): Promise<UnloadResult> {
    try {
        // Check if we already have this tracking number cached
        let loadingListId = trackingToLoadingListCache.get(trackingNumber);
        let cacheEntry = loadingListId ? unloadCache.get(loadingListId) : undefined;

        // Step 1: If not cached, get loadingListId from tracking number
        if (!loadingListId) {
            console.log(`[Unload] Step 1: Getting loadingListId for ${trackingNumber}`);

            const step1Response = await fetch(
                `https://pda.wpglb.com/api/wpglb-dms-pda-service/truckLoading/getTruckLoadingListByTrackingNumberAndCode?truckLoadinCode=${trackingNumber}`,
                {
                    method: "GET",
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "zh-CN",
                        "authorization": settings.authorization,
                        "wpglb-auth": settings.wpglbAuth,
                        "wpglb-requested-with": "WpglbHttpRequest",
                        "Referer": "https://pda.wpglb.com/unloadingScanNew"
                    }
                }
            );

            const step1Result = await step1Response.json();
            console.log(`[Unload] Step 1 Response:`, step1Result);

            // data is an array, get the first item
            const loadingListData = step1Result.data?.[0];
            if (!step1Result.success || !loadingListData?.loadingListId) {
                const message = step1Result.message || 'Failed to get loadingListId';
                onEventFinished?.(trackingNumber, 'UNLOAD', false, message);
                return { success: false, message, step: 1 };
            }

            loadingListId = String(loadingListData.loadingListId);
            const loadingListCode = loadingListData.loadingListCode || '';

            // Cache the mapping
            trackingToLoadingListCache.set(trackingNumber, loadingListId);

            // Step 2: Get pending unload items for this loadingListId
            console.log(`[Unload] Step 2: Getting unload data for loadingListId ${loadingListId}`);

            const step2Response = await fetch(
                `https://pda.wpglb.com/api/wpglb-dms-pda-service/truckLoading/getUnloadingData?loadingListId=${loadingListId}`,
                {
                    method: "GET",
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "zh-CN",
                        "authorization": settings.authorization,
                        "wpglb-auth": settings.wpglbAuth,
                        "wpglb-requested-with": "WpglbHttpRequest",
                        "Referer": "https://pda.wpglb.com/unloadingScanNew"
                    }
                }
            );

            const step2Result = await step2Response.json();
            console.log(`[Unload] Step 2 Response:`, step2Result);

            if (!step2Result.success) {
                const message = step2Result.message || 'Failed to get unload data';
                onEventFinished?.(trackingNumber, 'UNLOAD', false, message);
                return { success: false, message, step: 2 };
            }

            // Cache pending items
            const pendingItems = new Map<string, { detailId: string; deliverySiteCode: string }>();
            const unloadedList = step2Result.data?.unUnloadeddetailVOList || [];

            for (const item of unloadedList) {
                pendingItems.set(item.trackingNumber, {
                    detailId: item.detailId,
                    deliverySiteCode: item.deliverySiteCode || ''
                });
                // Also cache tracking number → loadingListId for all items
                trackingToLoadingListCache.set(item.trackingNumber, loadingListId);
            }

            cacheEntry = {
                loadingListId,
                loadingListCode,
                pendingItems
            };
            unloadCache.set(loadingListId, cacheEntry);

            console.log(`[Unload] Cached ${pendingItems.size} pending items for loadingListId ${loadingListId}`);
        }

        // Step 3: Check if this tracking number is in pending items and unload it
        if (!cacheEntry) {
            const message = 'Cache entry not found';
            onEventFinished?.(trackingNumber, 'UNLOAD', false, message);
            return { success: false, message, step: 3 };
        }

        const pendingItem = cacheEntry.pendingItems.get(trackingNumber);
        if (!pendingItem) {
            const message = `Tracking ${trackingNumber} not found in pending unload list`;
            onEventFinished?.(trackingNumber, 'UNLOAD', false, message);
            return { success: false, message, step: 3 };
        }

        console.log(`[Unload] Step 3: Unloading piece ${trackingNumber}`);

        const step3Response = await fetch(
            `https://pda.wpglb.com/api/wpglb-dms-pda-service/truckLoading/unloadPiece`,
            {
                method: "POST",
                headers: {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "zh-CN",
                    "authorization": settings.authorization,
                    "content-type": "application/json",
                    "wpglb-auth": settings.wpglbAuth,
                    "wpglb-requested-with": "WpglbHttpRequest",
                    "Referer": "https://pda.wpglb.com/unloadingScanNew"
                },
                body: JSON.stringify({
                    truckNo: trackingNumber,
                    loadingListId: cacheEntry.loadingListId,
                    trackingNumber: trackingNumber,
                    type: 2
                })
            }
        );

        const step3Result = await step3Response.json();
        console.log(`[Unload] Step 3 Response:`, step3Result);

        const isSuccess = step3Result.success === true;
        const message = step3Result.message || (isSuccess ? 'Unload Success' : 'Unload Failed');

        // Remove from pending items on success
        if (isSuccess) {
            cacheEntry.pendingItems.delete(trackingNumber);
        }

        onEventFinished?.(trackingNumber, 'UNLOAD', isSuccess, message);
        return { success: isSuccess, message, step: 3 };

    } catch (error) {
        const message = (error as Error).message;
        console.error("Unload request failed", error);
        onEventFinished?.(trackingNumber, 'UNLOAD', false, message);
        return { success: false, message };
    }
}

// Clear the unload cache
export function clearUnloadCache(): void {
    unloadCache.clear();
    trackingToLoadingListCache.clear();
    console.log('[Unload] Cache cleared');
}
