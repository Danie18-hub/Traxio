import {
  Shipment,
  TrackingEvent,
  CourierLocation,
  Customer,
  SupportTicket,
  Pickup,
  Claim,
  RateRequest,
  RateQuote,
  Invoice,
  AddressBookEntry,
  AddressInfo
} from './types';
import {
  INITIAL_SHIPMENTS,
  INITIAL_LOCATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_TICKETS,
  INITIAL_PICKUPS,
  INITIAL_INVOICES,
  INITIAL_ADDRESS_BOOK
} from './mock-data';
import { calculateRates as calculateRatesEngine } from './rates';

// In-memory persistent state (synced with localStorage when available)
const STORAGE_PREFIX = 'traxio_db_';

function getStoredOrInitial<T>(key: string, initial: T): T {
  if (typeof window === 'undefined') return initial;
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : initial;
  } catch {
    return initial;
  }
}

function saveToStorage<T>(key: string, data: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

let shipments: Shipment[] = getStoredOrInitial('shipments', INITIAL_SHIPMENTS);
let locations: CourierLocation[] = getStoredOrInitial('locations', INITIAL_LOCATIONS);
let customers: Customer[] = getStoredOrInitial('customers', INITIAL_CUSTOMERS);
let tickets: SupportTicket[] = getStoredOrInitial('tickets', INITIAL_TICKETS);
let pickups: Pickup[] = getStoredOrInitial('pickups', INITIAL_PICKUPS);
let invoices: Invoice[] = getStoredOrInitial('invoices', INITIAL_INVOICES);
let addressBook: AddressBookEntry[] = getStoredOrInitial('address_book', INITIAL_ADDRESS_BOOK);
let claims: Claim[] = getStoredOrInitial('claims', [
  {
    id: 'clm-01',
    claimNumber: 'CLM-2026-9041',
    type: 'Delivery Delay (Guaranteed Service)',
    trackingNumber: 'TRX1000000004',
    amount: 148.50,
    claimantName: 'Dr. Jennifer Martinez',
    claimantEmail: 'dr.martinez@austinhealth.org',
    claimantPhone: '+1 (512) 555-0842',
    status: 'Under Review',
    evidenceDescription: 'Shipment was scheduled for guaranteed overnight transit but stalled at regional transit corridor.',
    submittedAt: '2026-10-09T06:45:00Z'
  }
]);

// Helper for simulated latency
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== SHIPMENTS ====================

export async function getShipment(trackingNumber: string): Promise<Shipment | null> {
  await delay(150);
  const cleanNumber = trackingNumber.trim().toUpperCase();
  const found = shipments.find((s) => s.trackingNumber.toUpperCase() === cleanNumber);
  return found ? JSON.parse(JSON.stringify(found)) : null;
}

export async function getShipments(filters?: {
  status?: string;
  search?: string;
  service?: string;
}): Promise<Shipment[]> {
  await delay(160);
  let result = [...shipments];

  if (filters?.status && filters.status !== 'All') {
    result = result.filter((s) => s.status.toLowerCase() === filters.status!.toLowerCase());
  }

  if (filters?.service && filters.service !== 'All') {
    result = result.filter((s) => s.service.toLowerCase().includes(filters.service!.toLowerCase()));
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.trackingNumber.toLowerCase().includes(q) ||
        s.origin.toLowerCase().includes(q) ||
        s.destination.toLowerCase().includes(q) ||
        s.recipient.name.toLowerCase().includes(q) ||
        s.sender.name.toLowerCase().includes(q) ||
        (s.referenceNumber && s.referenceNumber.toLowerCase().includes(q))
    );
  }

  return JSON.parse(JSON.stringify(result));
}

export async function createShipment(
  data: Omit<Shipment, 'id' | 'trackingNumber' | 'events'> & { initialEventText?: string }
): Promise<Shipment> {
  await delay(300);
  
  // Generate tracking number TRX followed by 10 digits
  const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
  const trackingNumber = `TRX${randomDigits}`;
  const id = `shp-${Date.now()}`;

  const initialEvent: TrackingEvent = {
    id: `evt-${Date.now()}-1`,
    shipmentId: id,
    timestamp: new Date().toISOString(),
    location: `${data.sender.city}, ${data.sender.state}, ${data.sender.country}`,
    description: data.initialEventText || 'Electronic shipping data received. Awaiting package drop-off or pickup.',
    status: data.status || 'Label Created'
  };

  const newShipment: Shipment = {
    ...data,
    id,
    trackingNumber,
    events: [initialEvent]
  };

  shipments = [newShipment, ...shipments];
  saveToStorage('shipments', shipments);
  return JSON.parse(JSON.stringify(newShipment));
}

export async function updateShipment(id: string, updates: Partial<Shipment>): Promise<Shipment> {
  await delay(200);
  const index = shipments.findIndex((s) => s.id === id);
  if (index === -1) {
    throw new Error('Shipment not found');
  }

  shipments[index] = {
    ...shipments[index],
    ...updates
  };
  saveToStorage('shipments', shipments);
  return JSON.parse(JSON.stringify(shipments[index]));
}

export async function deleteShipment(id: string): Promise<boolean> {
  await delay(200);
  const initialLength = shipments.length;
  shipments = shipments.filter((s) => s.id !== id);
  saveToStorage('shipments', shipments);
  return shipments.length < initialLength;
}

export async function addTrackingEvent(
  shipmentId: string,
  eventData: Omit<TrackingEvent, 'id' | 'shipmentId'>
): Promise<TrackingEvent> {
  await delay(200);
  const shipment = shipments.find((s) => s.id === shipmentId || s.trackingNumber === shipmentId);
  if (!shipment) {
    throw new Error('Shipment not found');
  }

  const newEvent: TrackingEvent = {
    ...eventData,
    id: `evt-${Date.now()}`,
    shipmentId: shipment.id
  };

  shipment.events = [newEvent, ...shipment.events];
  // Auto-sync overall shipment status
  shipment.status = eventData.status;
  if (eventData.status === 'Delivered') {
    shipment.actualDelivery = eventData.timestamp;
  }

  saveToStorage('shipments', shipments);
  return JSON.parse(JSON.stringify(newEvent));
}

export async function updateTrackingEvent(
  shipmentId: string,
  eventId: string,
  updates: Partial<TrackingEvent>
): Promise<TrackingEvent> {
  await delay(180);
  const shipment = shipments.find((s) => s.id === shipmentId || s.trackingNumber === shipmentId);
  if (!shipment) throw new Error('Shipment not found');

  const evtIndex = shipment.events.findIndex((e) => e.id === eventId);
  if (evtIndex === -1) throw new Error('Tracking event not found');

  shipment.events[evtIndex] = {
    ...shipment.events[evtIndex],
    ...updates
  };

  saveToStorage('shipments', shipments);
  return JSON.parse(JSON.stringify(shipment.events[evtIndex]));
}

export async function deleteTrackingEvent(shipmentId: string, eventId: string): Promise<boolean> {
  await delay(180);
  const shipment = shipments.find((s) => s.id === shipmentId || s.trackingNumber === shipmentId);
  if (!shipment) throw new Error('Shipment not found');

  const before = shipment.events.length;
  shipment.events = shipment.events.filter((e) => e.id !== eventId);
  saveToStorage('shipments', shipments);
  return shipment.events.length < before;
}

// Redirect shipment or instructions
export async function redirectShipment(trackingNumber: string, newAddress: AddressInfo): Promise<Shipment> {
  await delay(250);
  const shipment = shipments.find((s) => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase());
  if (!shipment) throw new Error('Shipment not found');

  shipment.destination = `${newAddress.city}, ${newAddress.state}, ${newAddress.country}`;
  shipment.recipient = { ...shipment.recipient, ...newAddress };

  const redirectEvent: TrackingEvent = {
    id: `evt-${Date.now()}`,
    shipmentId: shipment.id,
    timestamp: new Date().toISOString(),
    location: `${newAddress.city}, ${newAddress.state}`,
    description: `Delivery address redirected by customer to: ${newAddress.address}, ${newAddress.city}`,
    status: shipment.status
  };

  shipment.events = [redirectEvent, ...shipment.events];
  saveToStorage('shipments', shipments);
  return JSON.parse(JSON.stringify(shipment));
}

export async function holdShipmentAtLocation(trackingNumber: string, locationId: string): Promise<Shipment> {
  await delay(250);
  const shipment = shipments.find((s) => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase());
  if (!shipment) throw new Error('Shipment not found');

  const loc = locations.find((l) => l.id === locationId);
  const locName = loc ? loc.name : 'Traxio Express Facility';

  const holdEvent: TrackingEvent = {
    id: `evt-${Date.now()}`,
    shipmentId: shipment.id,
    timestamp: new Date().toISOString(),
    location: loc?.city || 'Local Terminal',
    description: `Customer requested Hold at Location at ${locName}. Parcel will be ready for secure pickup.`,
    status: shipment.status
  };

  shipment.events = [holdEvent, ...shipment.events];
  saveToStorage('shipments', shipments);
  return JSON.parse(JSON.stringify(shipment));
}

export async function rescheduleDelivery(trackingNumber: string, newDate: string): Promise<Shipment> {
  await delay(200);
  const shipment = shipments.find((s) => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase());
  if (!shipment) throw new Error('Shipment not found');

  shipment.estimatedDelivery = newDate;
  const rescheduleEvent: TrackingEvent = {
    id: `evt-${Date.now()}`,
    shipmentId: shipment.id,
    timestamp: new Date().toISOString(),
    location: shipment.destination,
    description: `Delivery appointment rescheduled upon customer request to ${new Date(newDate).toLocaleDateString()}`,
    status: shipment.status
  };

  shipment.events = [rescheduleEvent, ...shipment.events];
  saveToStorage('shipments', shipments);
  return JSON.parse(JSON.stringify(shipment));
}

// ==================== LOCATIONS ====================

export async function getLocations(filters?: {
  type?: string;
  openNow?: boolean;
  is24Hour?: boolean;
}): Promise<CourierLocation[]> {
  await delay(120);
  let res = [...locations];

  if (filters?.type && filters.type !== 'All') {
    res = res.filter((l) => l.type === filters.type);
  }
  if (filters?.openNow) {
    res = res.filter((l) => l.openNow);
  }
  if (filters?.is24Hour) {
    res = res.filter((l) => l.is24Hour);
  }

  return JSON.parse(JSON.stringify(res));
}

export async function getLocationById(id: string): Promise<CourierLocation | null> {
  await delay(100);
  const found = locations.find((l) => l.id === id);
  return found ? JSON.parse(JSON.stringify(found)) : null;
}

export async function searchLocations(
  query: string,
  filters?: {
    openNow?: boolean;
    is24Hour?: boolean;
    service?: string;
  }
): Promise<CourierLocation[]> {
  await delay(200);
  const q = query.trim().toLowerCase();
  let res = [...locations];

  if (q) {
    res = res.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.state.toLowerCase().includes(q) ||
        l.postalCode.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q)
    );
  }

  if (filters?.openNow) {
    res = res.filter((l) => l.openNow);
  }
  if (filters?.is24Hour) {
    res = res.filter((l) => l.is24Hour);
  }
  if (filters?.service && filters.service !== 'All') {
    res = res.filter((l) => l.services.some((s) => s.toLowerCase().includes(filters.service!.toLowerCase())));
  }

  return JSON.parse(JSON.stringify(res));
}

export async function createLocation(locationData: Omit<CourierLocation, 'id'>): Promise<CourierLocation> {
  await delay(200);
  const newLoc: CourierLocation = {
    ...locationData,
    id: `loc-${Date.now()}`
  };
  locations = [newLoc, ...locations];
  saveToStorage('locations', locations);
  return JSON.parse(JSON.stringify(newLoc));
}

export async function updateLocation(id: string, updates: Partial<CourierLocation>): Promise<CourierLocation> {
  await delay(200);
  const index = locations.findIndex((l) => l.id === id);
  if (index === -1) throw new Error('Location not found');
  locations[index] = { ...locations[index], ...updates };
  saveToStorage('locations', locations);
  return JSON.parse(JSON.stringify(locations[index]));
}

export async function deleteLocation(id: string): Promise<boolean> {
  await delay(180);
  const init = locations.length;
  locations = locations.filter((l) => l.id !== id);
  saveToStorage('locations', locations);
  return locations.length < init;
}

// ==================== CUSTOMERS ====================

export async function getCustomers(query?: string): Promise<Customer[]> {
  await delay(150);
  let res = [...customers];
  if (query) {
    const q = query.toLowerCase();
    res = res.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.accountNumber.toLowerCase().includes(q) ||
        (c.company && c.company.toLowerCase().includes(q))
    );
  }
  return JSON.parse(JSON.stringify(res));
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  await delay(100);
  const found = customers.find((c) => c.id === id);
  return found ? JSON.parse(JSON.stringify(found)) : null;
}

// ==================== TICKETS ====================

export async function getTickets(status?: string): Promise<SupportTicket[]> {
  await delay(150);
  let res = [...tickets];
  if (status && status !== 'All') {
    res = res.filter((t) => t.status === status);
  }
  return JSON.parse(JSON.stringify(res));
}

export async function getTicketById(id: string): Promise<SupportTicket | null> {
  await delay(100);
  const found = tickets.find((t) => t.id === id || t.ticketNumber === id);
  return found ? JSON.parse(JSON.stringify(found)) : null;
}

export async function createTicket(
  data: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'messages' | 'status'> & {
    initialMessage: string;
    status?: SupportTicket['status'];
  }
): Promise<SupportTicket> {
  await delay(250);
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const ticketNumber = `CAS-${randomNum}-${data.category.charAt(0)}`;
  const now = new Date().toISOString();

  const newTicket: SupportTicket = {
    id: `tkt-${Date.now()}`,
    ticketNumber,
    subject: data.subject,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    trackingNumber: data.trackingNumber,
    category: data.category,
    priority: data.priority,
    status: data.status || 'Open',
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        id: `msg-${Date.now()}`,
        sender: 'customer',
        senderName: data.customerName,
        text: data.initialMessage,
        timestamp: now
      }
    ]
  };

  tickets = [newTicket, ...tickets];
  saveToStorage('tickets', tickets);
  return JSON.parse(JSON.stringify(newTicket));
}

export async function updateTicketStatus(
  id: string,
  status: SupportTicket['status']
): Promise<SupportTicket> {
  await delay(150);
  const t = tickets.find((x) => x.id === id || x.ticketNumber === id);
  if (!t) throw new Error('Ticket not found');
  t.status = status;
  t.updatedAt = new Date().toISOString();
  saveToStorage('tickets', tickets);
  return JSON.parse(JSON.stringify(t));
}

export async function addTicketMessage(
  ticketId: string,
  sender: 'customer' | 'agent',
  senderName: string,
  text: string
): Promise<SupportTicket> {
  await delay(180);
  const t = tickets.find((x) => x.id === ticketId || x.ticketNumber === ticketId);
  if (!t) throw new Error('Ticket not found');

  const newMsg = {
    id: `msg-${Date.now()}`,
    sender,
    senderName,
    text,
    timestamp: new Date().toISOString()
  };

  t.messages.push(newMsg);
  t.updatedAt = new Date().toISOString();
  saveToStorage('tickets', tickets);
  return JSON.parse(JSON.stringify(t));
}

// ==================== RATES ====================

export async function calculateRates(input: RateRequest): Promise<RateQuote[]> {
  return calculateRatesEngine(input);
}

// ==================== PICKUPS ====================

export async function schedulePickup(
  data: Omit<Pickup, 'id' | 'pickupNumber' | 'status' | 'createdAt'>
): Promise<Pickup> {
  await delay(250);
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const newPickup: Pickup = {
    ...data,
    id: `pk-${Date.now()}`,
    pickupNumber: `PK-${randomNum}`,
    status: 'Scheduled',
    createdAt: new Date().toISOString()
  };
  pickups = [newPickup, ...pickups];
  saveToStorage('pickups', pickups);
  return JSON.parse(JSON.stringify(newPickup));
}

export async function getPickups(): Promise<Pickup[]> {
  await delay(120);
  return JSON.parse(JSON.stringify(pickups));
}

export async function cancelPickup(id: string): Promise<boolean> {
  await delay(150);
  const p = pickups.find((x) => x.id === id || x.pickupNumber === id);
  if (!p) return false;
  p.status = 'Cancelled';
  saveToStorage('pickups', pickups);
  return true;
}

// ==================== CLAIMS ====================

export async function submitClaim(
  data: Omit<Claim, 'id' | 'claimNumber' | 'status' | 'submittedAt'>
): Promise<Claim> {
  await delay(300);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newClaim: Claim = {
    ...data,
    id: `clm-${Date.now()}`,
    claimNumber: `CLM-2026-${randomNum}`,
    status: 'Submitted',
    submittedAt: new Date().toISOString()
  };
  claims = [newClaim, ...claims];
  saveToStorage('claims', claims);
  return JSON.parse(JSON.stringify(newClaim));
}

export async function getClaims(): Promise<Claim[]> {
  await delay(120);
  return JSON.parse(JSON.stringify(claims));
}

// ==================== INVOICES & BILLING ====================

export async function getInvoices(): Promise<Invoice[]> {
  await delay(140);
  return JSON.parse(JSON.stringify(invoices));
}

export async function payInvoice(id: string): Promise<Invoice> {
  await delay(300);
  const inv = invoices.find((i) => i.id === id || i.invoiceNumber === id);
  if (!inv) throw new Error('Invoice not found');
  inv.status = 'Paid';
  saveToStorage('invoices', invoices);
  return JSON.parse(JSON.stringify(inv));
}

// ==================== ADDRESS BOOK ====================

export async function getAddressBook(): Promise<AddressBookEntry[]> {
  await delay(120);
  return JSON.parse(JSON.stringify(addressBook));
}

export async function addAddressBookEntry(
  entry: Omit<AddressBookEntry, 'id'>
): Promise<AddressBookEntry> {
  await delay(180);
  if (entry.isDefault) {
    addressBook.forEach((a) => (a.isDefault = false));
  }
  const newEntry: AddressBookEntry = {
    ...entry,
    id: `addr-${Date.now()}`
  };
  addressBook = [newEntry, ...addressBook];
  saveToStorage('address_book', addressBook);
  return JSON.parse(JSON.stringify(newEntry));
}

export async function updateAddressBookEntry(
  id: string,
  updates: Partial<AddressBookEntry>
): Promise<AddressBookEntry> {
  await delay(180);
  const index = addressBook.findIndex((a) => a.id === id);
  if (index === -1) throw new Error('Address not found');

  if (updates.isDefault) {
    addressBook.forEach((a) => (a.isDefault = false));
  }

  addressBook[index] = { ...addressBook[index], ...updates };
  saveToStorage('address_book', addressBook);
  return JSON.parse(JSON.stringify(addressBook[index]));
}

export async function deleteAddressBookEntry(id: string): Promise<boolean> {
  await delay(150);
  const initial = addressBook.length;
  addressBook = addressBook.filter((a) => a.id !== id);
  saveToStorage('address_book', addressBook);
  return addressBook.length < initial;
}
