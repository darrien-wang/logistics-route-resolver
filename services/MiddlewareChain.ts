
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

      const response = await fetch("/api-remote/api/wpglb-dms-orders/order/orders/ordersSearch", {
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

        // Extract Zip Code using regex from address (e.g., ...CA，92037-2332)
        const zipMatch = deliveryAddress.match(/\b\d{5}(-\d{4})?\b/);
        const extractedZip = zipMatch ? zipMatch[0].split('-')[0] : context.zipCode;

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
    // If remote already found a zip, don't overwrite with local logic
    if (context.zipCode && context.zipCode.length === 5) return context;

    const zipMatch = context.address.match(/\b\d{5}\b/);
    const zip = zipMatch ? zipMatch[0] : "92101";

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
    return {
      ...context,
      latitude: 32.7157,
      longitude: -117.1611,
      locationName: context.route?.metroArea || "Unknown",
      duration: 15
    };
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
      const response = await fetch("/api-pda/api/wpglb-dms-pda-service/mobile/pickupTask/pickupScan", {
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
 */
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

    try {
      // GET request as specified in the user's fetch example
      const response = await fetch(`/api-pda/api/wpglb-dms-pda-service/truckLoading/getTruckLoadingListByTrackingNumberAndCode?truckLoadinCode=${context.orderId}`, {
        method: "GET",
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN",
          "authorization": settings.authorization,
          "wpglb-auth": settings.wpglbAuth,
          "wpglb-requested-with": "WpglbHttpRequest",
          "Referer": "https://pda.wpglb.com/unloadingScanNew"
        }
      });

      const result = await response.json();

      // Update the event status based on API response
      const isSuccess = response.ok && (result.success !== false);
      const message = result.message || (isSuccess ? "Unload Scan Success" : "Unload Scan Failed");

      onEventFinished(context.orderId, 'UNLOAD', isSuccess, message);

      if (!isSuccess) {
        console.warn(`Unload scan failed: ${message}`);
      }

    } catch (error) {
      console.error("Unload scan request failed", error);
      onEventFinished(context.orderId, 'UNLOAD', false, (error as Error).message);
    }

    return context;
  };
};
