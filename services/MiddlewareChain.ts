
import { OrderData, ResolvedRouteInfo, ProcessingMiddleware, IRouteDataSource, EventType, OrderEventStatus, ApiSettings, EventFinishedHandler } from '../types';

export class MiddlewareChain {
  private middlewares: ProcessingMiddleware[] = [];

  use(middleware: ProcessingMiddleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  async run(initialData: OrderData): Promise<ResolvedRouteInfo> {
    let context: ResolvedRouteInfo = {
      ...initialData,
      resolvedAt: new Date().toISOString()
    };

    for (const middleware of this.middlewares) {
      context = await middleware(context);
    }

    return context;
  }
}

/**
 * Middleware factory for Remote API Lookup (Wpglb)
 */
export const createRemoteLookupMiddleware = (settings: ApiSettings): ProcessingMiddleware => {
  return async (context) => {
    if (!settings.enabled || !settings.wpglbAuth || !settings.authorization) {
      return context;
    }

    try {
      const formData = new FormData();
      formData.append("pageNumber", "1");
      formData.append("limit", "20");
      formData.append("trackingNumber", context.orderId);
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

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const result = await response.json();
      if (result.success && result.rows && result.rows.length > 0) {
        const orderRow = result.rows[0];
        const deliveryAddress = orderRow.deliveryAddress || "";

        // Extract Zip Code - pick the LAST match to avoid picking up street numbers (e.g. 10319) at the start
        const allMatches = deliveryAddress.match(/\b\d{5}(-\d{4})?\b/g);
        const extractedZip = allMatches ? allMatches[allMatches.length - 1] : context.zipCode;

        return {
          ...context,
          address: deliveryAddress || context.address,
          zipCode: extractedZip,
          weight: parseFloat(orderRow.ordersWeight) || context.weight,
        };
      }
    } catch (error) {
      console.error("Remote lookup failed, falling back to local processing", error);
    }

    return context;
  };
};

/**
 * Middleware factory for data persistence side-effects
 */
export const createPersistenceMiddleware = (onProcessStart: (orderId: string) => void): ProcessingMiddleware => {
  return async (context) => {
    onProcessStart(context.orderId);
    return context;
  };
};

/**
 * Middleware factory to resolve zip code from an Order ID (Local Fallback)
 */
export const createOrderLookupMiddleware = (): ProcessingMiddleware => {
  return async (context) => {
    // If we already have a reasonably formatted zip code (5 to 10 chars), don't overwrite
    if (context.zipCode && context.zipCode.length >= 5 && context.zipCode.length <= 10) return context;

    // Match 5-digit or 9-digit (xxxxx-xxxx) zip code - pick the LAST match
    const allMatches = context.address.match(/\b\d{5}(-\d{4})?\b/g);
    const zip = allMatches ? allMatches[allMatches.length - 1] : undefined;

    return {
      ...context,
      zipCode: zip
    };
  };
};

/**
 * Middleware factory to resolve Route from Zip Code using a provider
 */
export const createRouteResolverMiddleware = (dataSource: IRouteDataSource): ProcessingMiddleware => {
  return async (context) => {
    if (!context.zipCode) return context;

    const route = await dataSource.getRouteByZip(context.zipCode);
    return {
      ...context,
      route: route || undefined
    };
  };
};

/**
 * Middleware factory to trigger selected warehouse events
 */
export const createEventTriggerMiddleware = (
  selectedEvents: EventType[],
  onEventInitiated: (orderId: string, events: OrderEventStatus[]) => void,
  onEventFinished: EventFinishedHandler
): ProcessingMiddleware => {
  return async (context) => {
    if (selectedEvents.length === 0) return context;

    const initialStatuses: OrderEventStatus[] = selectedEvents.map(type => ({
      type,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    }));

    onEventInitiated(context.orderId, initialStatuses);

    // Mock triggers REMOVED as requested.
    // Events will only be updated by real API middlewares or manual actions.

    return {
      ...context,
      activeEvents: initialStatuses
    };
  };
};

/**
 * Middleware factory for data enrichment
 */
export const createEnrichmentMiddleware = (): ProcessingMiddleware => {
  return async (context) => {
    // No default enrichment - return context as-is
    return context;
  };
};
/**
 * Middleware factory for Pickup Scan Request
 */
export const createPickupScanMiddleware = (
  settings: ApiSettings,
  onEventFinished: EventFinishedHandler
): ProcessingMiddleware => {
  return async (context) => {
    // Only run if pickup is enabled and we are performing a RECEIVE event
    const isReceiveRequested = context.activeEvents?.some(e => e.type === 'RECEIVE');
    if (!settings.pickupEnabled || !isReceiveRequested) {
      return context;
    }

    try {
      const response = await fetch("https://pda.wpglb.com/api/wpglb-dms-pda-service/mobile/pickupTask/pickupScan", {
        method: "POST",
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN",
          "authorization": settings.authorization,
          "content-type": "application/json",
          "wpglb-auth": settings.wpglbAuth,
          "wpglb-requested-with": "WpglbHttpRequest",
        },
        body: JSON.stringify({
          taskCode: settings.taskCode,
          ptId: settings.ptId,
          trackingNumber: context.orderId,
          pickupSite: settings.pickupSite
        })
      });

      const result = await response.json();

      // Update the event status based on API response including the message
      onEventFinished(context.orderId, 'RECEIVE', result.success, result.message);

      if (!result.success) {
        console.warn(`Pickup scan failed: ${result.message}`);
      }

    } catch (error) {
      console.error("Pickup scan request failed", error);
      onEventFinished(context.orderId, 'RECEIVE', false, (error as Error).message);
    }

    return context;
  };
};

/**
 * Middleware factory for Unload Scan Request
 * 
 * Three-step unload flow:
 * 1. getTruckLoadingListByTrackingNumberAndCode → get loadingListId
 * 2. getUnloadingData → get pending unload items (cache them)
 * 3. unloadPiece → actually unload the piece
 */

// Cache for unload data: loadingListId → pending tracking numbers
interface UnloadCacheEntry {
  loadingListId: string;
  loadingListCode: string;
  pendingItems: Map<string, { detailId: string; deliverySiteCode: string }>;
}

// Global cache for unload data
const unloadCache = new Map<string, UnloadCacheEntry>();

// Lookup cache: trackingNumber → loadingListId
const trackingToLoadingListCache = new Map<string, string>();

export const createUnloadScanMiddleware = (
  settings: ApiSettings,
  onEventFinished: EventFinishedHandler
): ProcessingMiddleware => {
  return async (context) => {
    // Only run if we are performing an UNLOAD event
    const isUnloadRequested = context.activeEvents?.some(e => e.type === 'UNLOAD');
    if (!isUnloadRequested) {
      return context;
    }

    const trackingNumber = context.orderId;

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

        if (!step1Result.success || !step1Result.data?.loadingListId) {
          onEventFinished(context.orderId, 'UNLOAD', false, step1Result.message || 'Failed to get loadingListId');
          return context;
        }

        loadingListId = String(step1Result.data.loadingListId);
        const loadingListCode = step1Result.data.loadingListCode || '';

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
          onEventFinished(context.orderId, 'UNLOAD', false, step2Result.message || 'Failed to get unload data');
          return context;
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
        onEventFinished(context.orderId, 'UNLOAD', false, 'Cache entry not found');
        return context;
      }

      const pendingItem = cacheEntry.pendingItems.get(trackingNumber);
      if (!pendingItem) {
        onEventFinished(context.orderId, 'UNLOAD', false, `Tracking ${trackingNumber} not found in pending unload list`);
        return context;
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

      onEventFinished(context.orderId, 'UNLOAD', isSuccess, message);

    } catch (error) {
      console.error("Unload scan request failed", error);
      onEventFinished(context.orderId, 'UNLOAD', false, (error as Error).message);
    }

    return context;
  };
};
