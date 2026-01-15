/**
 * useHostScanHandler - Handles REST API scan requests when in Host mode
 * 
 * Listens for scan requests from the REST API server (via IPC) and
 * processes them using the local route resolution logic.
 * 
 * NOTE: This hook does NOT use RestApiContext to avoid circular dependency.
 * It monitors window.restApi directly.
 */

import { useEffect, useRef } from 'react';
import { routeStackService } from '../services/RouteStackService';
import { FlexibleDataSource } from '../services/RouteService';

interface ScanRequest {
    orderId: string;
    clientName?: string;
    dimensions?: {
        weight?: number;
        volume?: number;
    };
}

interface ScanResult {
    success: boolean;
    orderId: string;
    route?: {
        routeName: string;
        metroArea: string;
        state: string;
        destinationZone: string;
    };
    stack?: {
        stackNumber: number;
        currentCount: number;
        capacity: number;
        isStackFull: boolean;
        isNewStack: boolean;
    };
    printData?: {
        routeName: string;
        stackNumber: number;
        trackingNumber: string;
        dateStr: string;
    };
    error?: string;
    isException?: boolean;
}

export function useHostScanHandler(dataSource: FlexibleDataSource) {
    const cleanupRef = useRef<(() => void) | null>(null);
    const isSetupRef = useRef(false);

    useEffect(() => {
        // Prevent double setup
        if (isSetupRef.current || !window.restApi) {
            return;
        }

        console.log('[HostScanHandler] Setting up scan request handler');
        isSetupRef.current = true;

        // Listen for scan requests from REST API server
        const cleanup = window.restApi.onScanRequest(async (data) => {
            console.log('[HostScanHandler] Received scan request:', data.request);

            const request: ScanRequest = data.request;
            const orderId = request.orderId.toUpperCase();

            try {
                // Resolve route using local dataSource
                const routeInfo = await dataSource.getRouteByZip(orderId);

                if (routeInfo && routeInfo.routeConfiguration) {
                    // Add to stack
                    const stackInfo = routeStackService.addToStack(
                        routeInfo.routeConfiguration,
                        orderId,
                        {
                            weight: request.dimensions?.weight || 0,
                            volume: request.dimensions?.volume || 0
                        }
                    );

                    const result: ScanResult = {
                        success: true,
                        orderId: orderId,
                        route: {
                            routeName: routeInfo.routeConfiguration,
                            metroArea: routeInfo.metroArea || '',
                            state: routeInfo.state || '',
                            destinationZone: routeInfo.destinationZone || '',
                        },
                        stack: {
                            stackNumber: stackInfo.stackNumber,
                            currentCount: stackInfo.currentCount,
                            capacity: stackInfo.capacity,
                            isStackFull: stackInfo.isStackFull,
                            isNewStack: stackInfo.isNewStack,
                        },
                        printData: {
                            routeName: routeInfo.routeConfiguration,
                            stackNumber: stackInfo.stackNumber,
                            trackingNumber: orderId,
                            dateStr: new Date().toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric'
                            }),
                        },
                    };

                    console.log('[HostScanHandler] Scan result:', result);
                    window.restApi!.sendScanResponse(data.requestId, result);
                } else {
                    // No route found - exception
                    const result: ScanResult = {
                        success: true, // Still successful, just no route
                        orderId: orderId,
                        isException: true,
                        error: 'No route found for order ID',
                    };

                    console.log('[HostScanHandler] Exception result:', result);
                    window.restApi!.sendScanResponse(data.requestId, result);
                }
            } catch (error: any) {
                console.error('[HostScanHandler] Error processing scan:', error);
                window.restApi!.sendScanResponse(data.requestId, {
                    success: false,
                    orderId: orderId,
                    error: error.message || 'Scan processing failed',
                });
            }
        });

        cleanupRef.current = cleanup;

        return () => {
            if (cleanupRef.current) {
                console.log('[HostScanHandler] Cleaning up scan handler');
                cleanupRef.current();
                cleanupRef.current = null;
                isSetupRef.current = false;
            }
        };
    }, [dataSource]);
}

export default useHostScanHandler;
