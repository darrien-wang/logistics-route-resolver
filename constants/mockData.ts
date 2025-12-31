import { OrderData } from '../types';

/**
 * Mock order data for testing/fallback when remote API is unavailable
 */
export const MOCK_ORDERS: Record<string, OrderData> = {
    "ORD001": { orderId: "ORD001", date: "12/13/2024", address: "Canal St, New York, NY 10013, USA", email: "john@example.com", weight: 5, volume: 10 },
    "ORD002": { orderId: "ORD002", date: "12/13/2024", address: "Smith St, San Diego, CA 92101, USA", phone: "+16505553010", weight: 2, volume: 30 },
};
