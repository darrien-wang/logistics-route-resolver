
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

export type EventType = 'RECEIVE' | 'UNLOAD' | 'SORT' | 'DISPATCH' | 'SCAN';
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
    // Dynamic rule tracking
    activeValue?: number;     // The current value being tracked (count, weight, or volume)
    activeCapacity?: number;  // The capacity limit for the active rule
    activeUnit?: string;      // Display unit (e.g., 'pcs', 'lb', 'ft³')
    activeMeasure?: 'count' | 'weight' | 'volume'; // The measure type determines the rule logic
  };
  // Overflow source tracking - set when order is moved to overflow pool
  overflowSource?: {
    route: string;
    stackNumber: number;
    movedAt: string;
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
// --- Core Enums ---
export type StackStatus = 'open' | 'active' | 'locked';
export type StackType = 'normal' | 'merged' | 'overflow';

// --- Merged Stack Details ---
export interface MergedStackComponent {
  stackId: string;
  route: string;
  stackNumber: number;  // Stack number from source
  orders: ResolvedRouteInfo[];
  overflowCount: number;
}

// --- The Master RouteStack Interface ---
export interface RouteStack {
  id: string;               // Unique ID
  route: string;            // Display route name
  stackNumber: number;
  orders: ResolvedRouteInfo[];

  // Dynamic display fields (optional)
  activeValue?: number;
  activeCapacity?: number;
  activeUnit?: string;
  activeMeasure?: 'count' | 'weight' | 'volume';

  capacity: number;

  status: StackStatus;      // open/active/locked
  type: StackType;          // normal/merged/overflow

  // Merge Info
  mergeInfo?: {
    primaryStackId: string;
    components: MergedStackComponent[];
    mergedAt: string;
  };

  // Overflow / Legacy / Import Info
  // NOTE: isOverflow = TRUE triggers the GOLD BORDER UI
  isOverflow?: boolean;
  overflowFromStackId?: string;
  overflowCount: number;    // Derived/Allocated overflow count

  importedAt?: string;
  sourceNote?: string;

  // Persistence for UI state (optional, for convenience)
  displayName?: string;
  isFull?: boolean;
}

// --- Export Schema ---
export interface StackExportData {
  version: '1.0';
  exportedAt: string;
  stacks: RouteStack[];
}

export interface RouteStackState {
  stacks: Map<string, RouteStack>;
  exceptionPool: ResolvedRouteInfo[];
  defaultCapacity: number;
}
