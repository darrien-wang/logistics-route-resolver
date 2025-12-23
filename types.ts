
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
}

export interface ResolvedRouteInfo extends OrderData {
  route?: ZipRouteRecord;
  resolvedAt: string;
  activeEvents?: OrderEventStatus[];
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
