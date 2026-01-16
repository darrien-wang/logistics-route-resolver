/**
 * useHostScanHandler - Handles REST API scan requests when in Host mode
 * 
 * Listens for scan requests from the REST API server (via IPC) and
 * processes them using the provided scan handler, which should use
 * the same route resolution logic as local scans.
 */

import { useEffect, useRef, useCallback } from 'react';
import { routeStackService } from '../services/RouteStackService';
import { ResolvedRouteInfo } from '../types';

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

export interface HostScanHandlerProps {
    // Function to process a scan and return result - should use same logic as local scan
    onScan: (orderId: string, clientName?: string) => Promise<ResolvedRouteInfo>;
}

export function useHostScanHandler({ onScan }: HostScanHandlerProps) {
    const onScanRef = useRef(onScan);
    const cleanupRef = useRef<(() => void) | null>(null);
    const isSetupRef = useRef(false);

    // Keep ref updated with latest handler
    useEffect(() => {
        onScanRef.current = onScan;
    }, [onScan]);

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
                // Use the latest onScan handler via ref
                const resolvedInfo = await onScanRef.current(orderId, request.clientName);

                if (resolvedInfo.route && resolvedInfo.route.routeConfiguration) {
                    // Success - route found
                    const stackInfo = resolvedInfo.stackInfo;

                    const result: ScanResult = {
                        success: true,
                        orderId: orderId,
                        route: {
                            routeName: resolvedInfo.route.routeConfiguration,
                            metroArea: resolvedInfo.route.metroArea || '',
                            state: resolvedInfo.route.state || '',
                            destinationZone: resolvedInfo.route.destinationZone || '',
                        },
                        stack: stackInfo ? {
                            stackNumber: stackInfo.stackNumber,
                            currentCount: stackInfo.currentCount,
                            capacity: stackInfo.capacity,
                            isStackFull: stackInfo.isStackFull,
                            isNewStack: stackInfo.isNewStack,
                        } : undefined,
                        printData: {
                            routeName: resolvedInfo.route.routeConfiguration,
                            stackNumber: stackInfo?.stackNumber || 1,
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
                        success: true,
                        orderId: orderId,
                        isException: true,
                        error: resolvedInfo.exceptionReason || 'No route found for order ID',
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
    }, []); // Empty dependency array - strict single setup
}

export default useHostScanHandler;
