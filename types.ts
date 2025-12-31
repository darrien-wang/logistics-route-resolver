
export interface ZipRouteRecord {
  zip: string;
  metroArea: string;
  state: string;
  destinationZone: string;
  routeConfiguration: string;
  route2Configuration: string;
}

export interface OrderData {
  orderId: string;
  date: string;
  address: string;
  zipCode?: string;
  locationId?: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  duration?: number;
  twFrom?: string;
  twTo?: string;
  weight?: number;
  volume?: number;
  vehicleFeatures?: string;
  skills?: string;
  assignedToDriver?: string;
  notes?: string;
  email?: string;
  phone?: string;
  notifications?: string;
}

export type EventType = 'RECEIVE' | 'UNLOAD' | 'SORT' | 'DISPATCH';
export type EventStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface OrderEventStatus {
  type: EventType;
  status: EventStatus;
  timestamp: string;
  errorMessage?: string;
  message?: string;
}

export type EventFinishedHandler = (id: string, eventType: EventType, success: boolean, message?: string) => void;

export interface ApiSettings {
  wpglbAuth: string;
  authorization: string;
  enabled: boolean;
  pickupEnabled: boolean;
  taskCode: string;
  ptId: number;
  pickupSite: number;
  voiceEnabled: boolean;
  autoPrintLabelEnabled: boolean;
  stackCapacity: number;  // Legacy - kept for backward compatibility
  stackCapacityConfig?: StackCapacityConfig;
}

// Multi-dimensional stack capacity types
export type CapacityRuleType = 'count' | 'weight' | 'volume';
export type CapacityOperator = '>=' | '>' | '<=' | '<';

export interface StackCapacityRule {
  type: CapacityRuleType;
  operator: CapacityOperator;
  value: number;
}

export interface StackCapacityConfig {
  rules: StackCapacityRule[];
  logic: 'AND' | 'OR';
}

// Default capacity config (count >= 40)
export const DEFAULT_CAPACITY_CONFIG: StackCapacityConfig = {
  rules: [{ type: 'count', operator: '>=', value: 40 }],
  logic: 'AND'
};

export interface ResolvedRouteInfo extends OrderData {
  route?: ZipRouteRecord;
  resolvedAt: string;
  activeEvents?: OrderEventStatus[];
  exceptionReason?: string; // Reason for being in exception pool
  stackInfo?: {
    stackNumber: number;
    currentCount: number;
    capacity: number;
    isStackFull: boolean;
    isNewStack: boolean;
  };
}

// Middleware interface for data processing
export type ProcessingMiddleware = (context: ResolvedRouteInfo) => Promise<ResolvedRouteInfo>;

// Data Source Provider Interface
export interface IRouteDataSource {
  getRouteByZip(zip: string): Promise<ZipRouteRecord | null>;
}

// Export Provider Interface
export interface IExportService {
  export(data: ResolvedRouteInfo[]): Promise<void>;
}

// Route Stack Management
export interface RouteStack {
  routeName: string;
  baseRouteName: string;  // Original route name (e.g., "SD-007")
  stackNumber: number;    // Stack index (1, 2, 3...)
  displayName: string;    // Full display name (e.g., "SD-007-001")
  capacity: number;
  orders: ResolvedRouteInfo[];
  isFull: boolean;
}

export interface RouteStackState {
  stacks: Map<string, RouteStack>;
  exceptionPool: ResolvedRouteInfo[];
  defaultCapacity: number;
}
