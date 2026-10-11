export type ShipmentStatus = 'Label Created' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Delayed';

export type ServiceType = 
  | 'Traxio Overnight Air' 
  | 'Traxio Priority Express' 
  | 'Traxio Standard Express' 
  | 'Traxio Economy Ground' 
  | 'Traxio Freight Priority';

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  timestamp: string;
  location: string;
  description: string;
  status: ShipmentStatus;
  details?: string;
}

export interface AddressInfo {
  name: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  service: ServiceType;
  origin: string;
  destination: string;
  sender: AddressInfo;
  recipient: AddressInfo;
  weight: number; // in kg
  weightUnit: 'kg' | 'lbs';
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  packages: number;
  shipDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  deliveryWindow?: string;
  signatureRequired?: boolean;
  signedBy?: string;
  proofOfDeliveryImage?: string;
  events: TrackingEvent[];
  specialInstructions?: string;
  referenceNumber?: string;
  declaredValue?: number;
}

export interface LocationHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface CourierLocation {
  id: string;
  name: string;
  type: 'Traxio Express Center' | 'Drop Box 24/7' | 'Authorized Ship Center' | 'Freight Facility';
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  openNow: boolean;
  is24Hour: boolean;
  services: string[];
  hours: LocationHours[];
  lat: number;
  lng: number;
  hasParking: boolean;
  distanceMiles?: number;
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  accountType: 'Personal' | 'Small Business' | 'Enterprise';
  accountNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  totalShipments: number;
  status: 'Active' | 'Suspended' | 'Pending Verification';
  joinedDate: string;
}

export interface SupportTicketMessage {
  id: string;
  sender: 'customer' | 'agent';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  customerName: string;
  customerEmail: string;
  trackingNumber?: string;
  category: 'Tracking & Delivery' | 'Damaged or Lost' | 'Billing & Rates' | 'Pickup Request' | 'Technical Support' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  messages: SupportTicketMessage[];
}

export interface Pickup {
  id: string;
  pickupNumber: string;
  address: AddressInfo;
  date: string;
  timeWindow: string; // e.g. "09:00 - 13:00" or "13:00 - 17:00"
  packageCount: number;
  estimatedWeightKg: number;
  locationType: 'Front Door / Porch' | 'Office Reception' | 'Shipping Dock' | 'Mailroom';
  specialInstructions?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  type: 'Lost Package' | 'Damaged Package' | 'Missing Contents' | 'Delivery Delay (Guaranteed Service)';
  trackingNumber: string;
  amount: number;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Declined';
  evidenceDescription: string;
  submittedAt: string;
  resolvedAt?: string;
}

export interface RateRequest {
  originCountry: string;
  originZip: string;
  originCity?: string;
  destCountry: string;
  destZip: string;
  destCity?: string;
  packageType: 'Your Packaging' | 'Traxio Box Small' | 'Traxio Box Medium' | 'Traxio Box Large' | 'Traxio Envelope';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: 'cm' | 'in';
  declaredValue?: number;
  shipDate: string;
  residential?: boolean;
  signature?: boolean;
  insurance?: boolean;
}

export interface RateQuote {
  serviceId: string;
  serviceName: ServiceType;
  estimatedDays: string;
  deliveryDate: string;
  deliveryTime: string;
  baseRate: number;
  fuelSurcharge: number;
  residentialFee: number;
  signatureFee: number;
  insuranceFee: number;
  total: number;
  tag?: 'Fastest' | 'Best Value' | 'Economy';
  features: string[];
}

export interface AddressBookEntry {
  id: string;
  label: string;
  name: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email?: string;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  trackingNumbers: string[];
  pdfUrl?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Logistics Dispatcher' | 'Support Agent' | 'Station Manager';
  avatar?: string;
}
