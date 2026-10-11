import { Shipment, CourierLocation, Customer, SupportTicket, Pickup, Invoice, AddressBookEntry } from './types';

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'shp-1001',
    trackingNumber: 'TRX1000000001',
    status: 'Delivered',
    service: 'Traxio Priority Express',
    origin: 'Seattle, WA, US',
    destination: 'Austin, TX, US',
    sender: {
      name: 'Vanguard Instruments',
      company: 'Vanguard Medical Inc.',
      address: '420 Pike Street, Suite 800',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States',
      phone: '+1 (206) 555-0199'
    },
    recipient: {
      name: 'Dr. Jennifer Martinez',
      company: 'Austin Health Systems',
      address: '1400 Congress Ave, Floor 4',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'United States',
      phone: '+1 (512) 555-0842'
    },
    weight: 4.8,
    weightUnit: 'kg',
    dimensions: { length: 35, width: 25, height: 18, unit: 'cm' },
    packages: 1,
    shipDate: '2026-10-07T09:30:00Z',
    estimatedDelivery: '2026-10-09T14:30:00Z',
    actualDelivery: '2026-10-09T13:42:00Z',
    deliveryWindow: '12:00 PM - 3:00 PM',
    signatureRequired: true,
    signedBy: 'J. MARTINEZ',
    proofOfDeliveryImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    specialInstructions: 'Direct signature required. Deliver to medical reception.',
    referenceNumber: 'PO-882914-MED',
    declaredValue: 2400,
    events: [
      {
        id: 'evt-1001-4',
        shipmentId: 'shp-1001',
        timestamp: '2026-10-09T13:42:00Z',
        location: 'Austin, TX, US',
        description: 'Delivered - Signed for by J. MARTINEZ at front reception desk',
        status: 'Delivered',
        details: 'Package delivered in good condition'
      },
      {
        id: 'evt-1001-3',
        shipmentId: 'shp-1001',
        timestamp: '2026-10-09T08:15:00Z',
        location: 'Austin Hub (AUS-02), TX',
        description: 'On Traxio vehicle for final delivery',
        status: 'Out for Delivery'
      },
      {
        id: 'evt-1001-2',
        shipmentId: 'shp-1001',
        timestamp: '2026-10-08T19:40:00Z',
        location: 'Dallas National Sorting Hub (DFW-01), TX',
        description: 'Departed sorting facility in transit to destination hub',
        status: 'In Transit'
      },
      {
        id: 'evt-1001-1',
        shipmentId: 'shp-1001',
        timestamp: '2026-10-07T16:10:00Z',
        location: 'Seattle Regional Hub (SEA-01), WA',
        description: 'Package received and processed at origin sorting center',
        status: 'In Transit'
      },
      {
        id: 'evt-1001-0',
        shipmentId: 'shp-1001',
        timestamp: '2026-10-07T09:30:00Z',
        location: 'Seattle, WA, US',
        description: 'Shipment information sent to Traxio; package collected by driver',
        status: 'Picked Up'
      }
    ]
  },
  {
    id: 'shp-1002',
    trackingNumber: 'TRX1000000002',
    status: 'In Transit',
    service: 'Traxio Overnight Air',
    origin: 'New York, NY, US',
    destination: 'Los Angeles, CA, US',
    sender: {
      name: 'Apex Studio Apparel',
      company: 'Apex Brands LLC',
      address: '560 Broadway, Suite 5B',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States',
      phone: '+1 (212) 555-0144'
    },
    recipient: {
      name: 'Marcus Sterling',
      company: 'Sterling Talent Agency',
      address: '9440 Santa Monica Blvd, Suite 300',
      city: 'Beverly Hills',
      state: 'CA',
      postalCode: '90210',
      country: 'United States',
      phone: '+1 (310) 555-0921'
    },
    weight: 2.3,
    weightUnit: 'kg',
    dimensions: { length: 30, width: 22, height: 10, unit: 'cm' },
    packages: 1,
    shipDate: '2026-10-08T17:00:00Z',
    estimatedDelivery: '2026-10-10T10:30:00Z',
    deliveryWindow: '9:00 AM - 12:00 PM',
    signatureRequired: true,
    referenceNumber: 'ST-2026-NYLA',
    declaredValue: 850,
    events: [
      {
        id: 'evt-1002-3',
        shipmentId: 'shp-1002',
        timestamp: '2026-10-09T06:10:00Z',
        location: 'Chicago Gateway Hub (ORD-01), IL',
        description: 'Arrived at major hub facility for automated air transshipment',
        status: 'In Transit'
      },
      {
        id: 'evt-1002-2',
        shipmentId: 'shp-1002',
        timestamp: '2026-10-08T23:45:00Z',
        location: 'Newark Air Freight Facility (EWR-03), NJ',
        description: 'Departed airport sorting station via Traxio Cargo Flight TRX-408',
        status: 'In Transit'
      },
      {
        id: 'evt-1002-1',
        shipmentId: 'shp-1002',
        timestamp: '2026-10-08T18:20:00Z',
        location: 'New York Hub (JFK-02), NY',
        description: 'Package scanned and cleared for overnight air transport',
        status: 'In Transit'
      },
      {
        id: 'evt-1002-0',
        shipmentId: 'shp-1002',
        timestamp: '2026-10-08T17:00:00Z',
        location: 'New York, NY, US',
        description: 'Picked up from shipper storefront',
        status: 'Picked Up'
      }
    ]
  },
  {
    id: 'shp-1003',
    trackingNumber: 'TRX1000000003',
    status: 'Out for Delivery',
    service: 'Traxio Standard Express',
    origin: 'Atlanta, GA, US',
    destination: 'Charlotte, NC, US',
    sender: {
      name: 'OmniTech Components',
      address: '220 Tech Parkway NW',
      city: 'Atlanta',
      state: 'GA',
      postalCode: '30313',
      country: 'United States',
      phone: '+1 (404) 555-0371'
    },
    recipient: {
      name: 'Sarah Jenkins',
      address: '742 Queens Road, Apt 3A',
      city: 'Charlotte',
      state: 'NC',
      postalCode: '28207',
      country: 'United States',
      phone: '+1 (704) 555-0165'
    },
    weight: 1.6,
    weightUnit: 'kg',
    dimensions: { length: 24, width: 18, height: 12, unit: 'cm' },
    packages: 1,
    shipDate: '2026-10-08T11:00:00Z',
    estimatedDelivery: '2026-10-09T16:00:00Z',
    deliveryWindow: '1:00 PM - 5:00 PM',
    signatureRequired: false,
    specialInstructions: 'Leave by side door if no answer.',
    referenceNumber: 'ORD-77103',
    events: [
      {
        id: 'evt-1003-3',
        shipmentId: 'shp-1003',
        timestamp: '2026-10-09T07:45:00Z',
        location: 'Charlotte Metro Facility (CLT-01), NC',
        description: 'Loaded onto Traxio Delivery Vehicle. Courier en route.',
        status: 'Out for Delivery'
      },
      {
        id: 'evt-1003-2',
        shipmentId: 'shp-1003',
        timestamp: '2026-10-09T03:20:00Z',
        location: 'Charlotte Metro Facility (CLT-01), NC',
        description: 'Arrived at destination delivery facility',
        status: 'In Transit'
      },
      {
        id: 'evt-1003-1',
        shipmentId: 'shp-1003',
        timestamp: '2026-10-08T19:50:00Z',
        location: 'Atlanta Hub (ATL-01), GA',
        description: 'Processed through Traxio Southeast Hub',
        status: 'In Transit'
      },
      {
        id: 'evt-1003-0',
        shipmentId: 'shp-1003',
        timestamp: '2026-10-08T11:00:00Z',
        location: 'Atlanta, GA, US',
        description: 'Package dropped off at Traxio Express Center',
        status: 'Picked Up'
      }
    ]
  },
  {
    id: 'shp-1004',
    trackingNumber: 'TRX1000000004',
    status: 'Delayed',
    service: 'Traxio Economy Ground',
    origin: 'Denver, CO, US',
    destination: 'Minneapolis, MN, US',
    sender: {
      name: 'Highland Outdoors Co.',
      address: '1600 17th Street',
      city: 'Denver',
      state: 'CO',
      postalCode: '80202',
      country: 'United States'
    },
    recipient: {
      name: 'Brian Henderson',
      address: '250 Nicollet Mall, Suite 1200',
      city: 'Minneapolis',
      state: 'MN',
      postalCode: '55401',
      country: 'United States'
    },
    weight: 12.4,
    weightUnit: 'kg',
    dimensions: { length: 55, width: 40, height: 30, unit: 'cm' },
    packages: 2,
    shipDate: '2026-10-06T14:00:00Z',
    estimatedDelivery: '2026-10-11T17:00:00Z',
    deliveryWindow: 'Expected delayed delivery: Oct 11',
    referenceNumber: 'HOC-9921',
    events: [
      {
        id: 'evt-1004-3',
        shipmentId: 'shp-1004',
        timestamp: '2026-10-09T05:30:00Z',
        location: 'Omaha Interchange Hub (OMA-02), NE',
        description: 'Shipment delayed due to severe weather conditions along transport corridor. Rescheduling in progress.',
        status: 'Delayed',
        details: 'Interstate safety hold enacted by highway patrol; trucks staged at regional safe terminal.'
      },
      {
        id: 'evt-1004-2',
        shipmentId: 'shp-1004',
        timestamp: '2026-10-08T14:10:00Z',
        location: 'Omaha Interchange Hub (OMA-02), NE',
        description: 'Inbound trailer processed at regional facility',
        status: 'In Transit'
      },
      {
        id: 'evt-1004-1',
        shipmentId: 'shp-1004',
        timestamp: '2026-10-07T08:00:00Z',
        location: 'Denver Distribution Center (DEN-01), CO',
        description: 'Departed origin facility',
        status: 'In Transit'
      },
      {
        id: 'evt-1004-0',
        shipmentId: 'shp-1004',
        timestamp: '2026-10-06T14:00:00Z',
        location: 'Denver, CO, US',
        description: 'Package accepted by Traxio Ground Logistics',
        status: 'Picked Up'
      }
    ]
  },
  {
    id: 'shp-1005',
    trackingNumber: 'TRX1000000005',
    status: 'Label Created',
    service: 'Traxio Standard Express',
    origin: 'San Francisco, CA, US',
    destination: 'Boston, MA, US',
    sender: {
      name: 'NextWave Robotics',
      company: 'NextWave Inc.',
      address: '350 Mission Street, Floor 14',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States',
      phone: '+1 (415) 555-0812'
    },
    recipient: {
      name: 'Dr. Arthur Pendelton',
      company: 'MIT Media Lab',
      address: '75 Amherst St',
      city: 'Cambridge',
      state: 'MA',
      postalCode: '02139',
      country: 'United States'
    },
    weight: 3.1,
    weightUnit: 'kg',
    dimensions: { length: 32, width: 20, height: 15, unit: 'cm' },
    packages: 1,
    shipDate: '2026-10-09T07:00:00Z',
    estimatedDelivery: '2026-10-12T15:00:00Z',
    referenceNumber: 'NW-ROBO-104',
    events: [
      {
        id: 'evt-1005-0',
        shipmentId: 'shp-1005',
        timestamp: '2026-10-09T07:12:00Z',
        location: 'San Francisco, CA, US',
        description: 'Electronic shipping info received. Awaiting package handover to Traxio carrier.',
        status: 'Label Created'
      }
    ]
  },
  {
    id: 'shp-1006',
    trackingNumber: 'TRX1000000006',
    status: 'In Transit',
    service: 'Traxio Priority Express',
    origin: 'Miami, FL, US',
    destination: 'Phoenix, AZ, US',
    sender: {
      name: 'SunState Marine Supply',
      address: '1800 Biscayne Blvd',
      city: 'Miami',
      state: 'FL',
      postalCode: '33132',
      country: 'United States'
    },
    recipient: {
      name: 'Elena Rostova',
      address: '3200 E Camelback Rd, Suite 180',
      city: 'Phoenix',
      state: 'AZ',
      postalCode: '85018',
      country: 'United States'
    },
    weight: 5.2,
    weightUnit: 'kg',
    dimensions: { length: 42, width: 30, height: 20, unit: 'cm' },
    packages: 1,
    shipDate: '2026-10-08T10:15:00Z',
    estimatedDelivery: '2026-10-10T14:00:00Z',
    deliveryWindow: '11:00 AM - 3:00 PM',
    signatureRequired: false,
    referenceNumber: 'MAR-8190',
    events: [
      {
        id: 'evt-1006-2',
        shipmentId: 'shp-1006',
        timestamp: '2026-10-09T04:22:00Z',
        location: 'Houston Intercontinental Hub (IAH-01), TX',
        description: 'In transit between Traxio transfer centers',
        status: 'In Transit'
      },
      {
        id: 'evt-1006-1',
        shipmentId: 'shp-1006',
        timestamp: '2026-10-08T18:40:00Z',
        location: 'Miami Air & Ground Sorting (MIA-02), FL',
        description: 'Departed origin gateway',
        status: 'In Transit'
      },
      {
        id: 'evt-1006-0',
        shipmentId: 'shp-1006',
        timestamp: '2026-10-08T10:15:00Z',
        location: 'Miami, FL, US',
        description: 'Picked up by Traxio driver',
        status: 'Picked Up'
      }
    ]
  },
  {
    id: 'shp-1007',
    trackingNumber: 'TRX1000000007',
    status: 'Delivered',
    service: 'Traxio Economy Ground',
    origin: 'Philadelphia, PA, US',
    destination: 'Raleigh, NC, US',
    sender: {
      name: 'Keystone Publishing House',
      address: '1500 Market Street',
      city: 'Philadelphia',
      state: 'PA',
      postalCode: '19102',
      country: 'United States'
    },
    recipient: {
      name: 'David K. Miller',
      address: '120 Fayetteville St, Suite 400',
      city: 'Raleigh',
      state: 'NC',
      postalCode: '27601',
      country: 'United States'
    },
    weight: 8.0,
    weightUnit: 'kg',
    dimensions: { length: 40, width: 30, height: 25, unit: 'cm' },
    packages: 1,
    shipDate: '2026-10-05T09:00:00Z',
    estimatedDelivery: '2026-10-08T16:00:00Z',
    actualDelivery: '2026-10-08T14:15:00Z',
    signedBy: 'D. MILLER',
    proofOfDeliveryImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    events: [
      {
        id: 'evt-1007-3',
        shipmentId: 'shp-1007',
        timestamp: '2026-10-08T14:15:00Z',
        location: 'Raleigh, NC, US',
        description: 'Delivered - Left with resident at primary door',
        status: 'Delivered'
      },
      {
        id: 'evt-1007-2',
        shipmentId: 'shp-1007',
        timestamp: '2026-10-08T08:20:00Z',
        location: 'Raleigh Delivery Hub (RDU-01), NC',
        description: 'Out for delivery on Traxio courier vehicle',
        status: 'Out for Delivery'
      },
      {
        id: 'evt-1007-1',
        shipmentId: 'shp-1007',
        timestamp: '2026-10-06T20:30:00Z',
        location: 'Richmond Intermediate Center, VA',
        description: 'Processed through sorting facility',
        status: 'In Transit'
      },
      {
        id: 'evt-1007-0',
        shipmentId: 'shp-1007',
        timestamp: '2026-10-05T09:00:00Z',
        location: 'Philadelphia, PA, US',
        description: 'Picked up from publisher warehouse',
        status: 'Picked Up'
      }
    ]
  },
  {
    id: 'shp-1008',
    trackingNumber: 'TRX1000000008',
    status: 'Picked Up',
    service: 'Traxio Overnight Air',
    origin: 'Dallas, TX, US',
    destination: 'Portland, OR, US',
    sender: {
      name: 'CyberGrid Technologies',
      address: '2000 Stemmons Freeway',
      city: 'Dallas',
      state: 'TX',
      postalCode: '75207',
      country: 'United States'
    },
    recipient: {
      name: 'Maya Patel',
      address: '1120 NW Couch St',
      city: 'Portland',
      state: 'OR',
      postalCode: '97209',
      country: 'United States'
    },
    weight: 1.2,
    weightUnit: 'kg',
    dimensions: { length: 22, width: 15, height: 8, unit: 'cm' },
    packages: 1,
    shipDate: '2026-10-09T06:45:00Z',
    estimatedDelivery: '2026-10-10T09:30:00Z',
    deliveryWindow: '8:30 AM - 11:30 AM',
    signatureRequired: true,
    referenceNumber: 'CG-SECURE-99',
    events: [
      {
        id: 'evt-1008-0',
        shipmentId: 'shp-1008',
        timestamp: '2026-10-09T06:45:00Z',
        location: 'Dallas Central Terminal (DFW-04), TX',
        description: 'Collected by courier on priority morning route. En route to airport sorting.',
        status: 'Picked Up'
      }
    ]
  }
];

export const INITIAL_LOCATIONS: CourierLocation[] = [
  {
    id: 'loc-01',
    name: 'Traxio Express Center - Downtown New York',
    type: 'Traxio Express Center',
    address: '452 5th Avenue (Corner of 40th St)',
    city: 'New York',
    state: 'NY',
    postalCode: '10018',
    country: 'United States',
    phone: '+1 (212) 555-7800',
    openNow: true,
    is24Hour: false,
    services: ['Drop Off', 'Pick Up / Hold', 'Packaging Supplies', 'Direct International Shipping', 'Passport Photo', 'Printing & Labeling'],
    hasParking: false,
    distanceMiles: 0.8,
    lat: 40.7516,
    lng: -73.9832,
    hours: [
      { day: 'Monday - Friday', open: '07:30', close: '20:00' },
      { day: 'Saturday', open: '09:00', close: '18:00' },
      { day: 'Sunday', open: '10:00', close: '16:00' }
    ]
  },
  {
    id: 'loc-02',
    name: 'Traxio 24/7 Drop Box - Wall Street Plaza',
    type: 'Drop Box 24/7',
    address: '88 Pine Street (Main Lobby Entrance)',
    city: 'New York',
    state: 'NY',
    postalCode: '10005',
    country: 'United States',
    phone: '+1 (800) 555-8729',
    openNow: true,
    is24Hour: true,
    services: ['Drop Off', 'Self-Service Label Scanner', 'Prepaid Returns'],
    hasParking: false,
    distanceMiles: 1.4,
    lat: 40.7062,
    lng: -74.0069,
    hours: [
      { day: 'Monday - Sunday', open: '00:00', close: '24:00' }
    ]
  },
  {
    id: 'loc-03',
    name: 'Traxio Shipping & Logistics Hub - Queens',
    type: 'Freight Facility',
    address: '47-25 34th Street',
    city: 'Long Island City',
    state: 'NY',
    postalCode: '11101',
    country: 'United States',
    phone: '+1 (718) 555-3210',
    openNow: true,
    is24Hour: false,
    services: ['Heavy Freight (LTL/FTL)', 'Pallet Drop Off', 'Commercial Pickups', 'Packaging Supplies', 'Dangerous Goods Processing'],
    hasParking: true,
    distanceMiles: 3.2,
    lat: 40.7423,
    lng: -73.9312,
    hours: [
      { day: 'Monday - Friday', open: '06:00', close: '21:00' },
      { day: 'Saturday', open: '08:00', close: '16:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  },
  {
    id: 'loc-04',
    name: 'Traxio Authorized Center - Brooklyn Heights',
    type: 'Authorized Ship Center',
    address: '142 Montague Street',
    city: 'Brooklyn',
    state: 'NY',
    postalCode: '11201',
    country: 'United States',
    phone: '+1 (718) 555-9014',
    openNow: true,
    is24Hour: false,
    services: ['Drop Off', 'Pick Up / Hold', 'Packing Assistance', 'Returns'],
    hasParking: true,
    distanceMiles: 2.1,
    lat: 40.6948,
    lng: -73.9942,
    hours: [
      { day: 'Monday - Friday', open: '08:00', close: '19:00' },
      { day: 'Saturday', open: '09:00', close: '17:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  },
  {
    id: 'loc-05',
    name: 'Traxio Express Center - Chicago Loop',
    type: 'Traxio Express Center',
    address: '200 W Adams St',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60606',
    country: 'United States',
    phone: '+1 (312) 555-4300',
    openNow: true,
    is24Hour: false,
    services: ['Drop Off', 'Pick Up / Hold', 'Packaging Supplies', 'Overnight Dispatch', 'Print & Scan'],
    hasParking: false,
    distanceMiles: 1.1,
    lat: 41.8795,
    lng: -87.6337,
    hours: [
      { day: 'Monday - Friday', open: '07:30', close: '19:30' },
      { day: 'Saturday', open: '09:00', close: '16:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  },
  {
    id: 'loc-06',
    name: 'Traxio Express Center - Downtown Los Angeles',
    type: 'Traxio Express Center',
    address: '700 S Flower St, Suite 105',
    city: 'Los Angeles',
    state: 'CA',
    postalCode: '90017',
    country: 'United States',
    phone: '+1 (213) 555-6620',
    openNow: true,
    is24Hour: false,
    services: ['Drop Off', 'Pick Up / Hold', 'Express Air Cargo', 'Box Assembly', 'Custom Crating'],
    hasParking: true,
    distanceMiles: 0.5,
    lat: 34.0489,
    lng: -118.2589,
    hours: [
      { day: 'Monday - Friday', open: '07:30', close: '20:00' },
      { day: 'Saturday', open: '09:00', close: '18:00' },
      { day: 'Sunday', open: '10:00', close: '15:00' }
    ]
  },
  {
    id: 'loc-07',
    name: 'Traxio 24/7 Drop Box - San Francisco SOMA',
    type: 'Drop Box 24/7',
    address: '500 Howard Street',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'United States',
    phone: '+1 (800) 555-8729',
    openNow: true,
    is24Hour: true,
    services: ['Drop Off', 'Automated Label Dispenser', 'Return Scanning'],
    hasParking: false,
    distanceMiles: 0.3,
    lat: 37.7885,
    lng: -122.3980,
    hours: [
      { day: 'Monday - Sunday', open: '00:00', close: '24:00' }
    ]
  },
  {
    id: 'loc-08',
    name: 'Traxio Express Center - Dallas Uptown',
    type: 'Traxio Express Center',
    address: '2501 N Harwood St, Suite 110',
    city: 'Dallas',
    state: 'TX',
    postalCode: '75201',
    country: 'United States',
    phone: '+1 (214) 555-9988',
    openNow: true,
    is24Hour: false,
    services: ['Drop Off', 'Pick Up / Hold', 'Packaging Supplies', 'OneRate Flat Box Supply', 'Freight Counter'],
    hasParking: true,
    distanceMiles: 1.2,
    lat: 32.7932,
    lng: -96.8041,
    hours: [
      { day: 'Monday - Friday', open: '08:00', close: '19:30' },
      { day: 'Saturday', open: '09:00', close: '17:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  },
  {
    id: 'loc-09',
    name: 'Traxio Express Center - Atlanta Midtown',
    type: 'Traxio Express Center',
    address: '1075 Peachtree St NE',
    city: 'Atlanta',
    state: 'GA',
    postalCode: '30309',
    country: 'United States',
    phone: '+1 (404) 555-4200',
    openNow: true,
    is24Hour: false,
    services: ['Drop Off', 'Pick Up / Hold', 'Packaging Supplies', 'Domestic & Global Express'],
    hasParking: true,
    distanceMiles: 2.0,
    lat: 33.7844,
    lng: -84.3842,
    hours: [
      { day: 'Monday - Friday', open: '08:00', close: '19:00' },
      { day: 'Saturday', open: '09:00', close: '16:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  },
  {
    id: 'loc-10',
    name: 'Traxio Freight Center - Seattle Gateway',
    type: 'Freight Facility',
    address: '1741 4th Ave S',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98134',
    country: 'United States',
    phone: '+1 (206) 555-8910',
    openNow: true,
    is24Hour: false,
    services: ['Heavy Freight (LTL/FTL)', 'Pallet Processing', 'Cross-docking', 'Export Staging'],
    hasParking: true,
    distanceMiles: 4.5,
    lat: 47.5872,
    lng: -122.3289,
    hours: [
      { day: 'Monday - Friday', open: '06:30', close: '20:00' },
      { day: 'Saturday', open: '08:00', close: '15:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  },
  {
    id: 'loc-11',
    name: 'Traxio Express Center - Central London (UK)',
    type: 'Traxio Express Center',
    address: '120 Bishopsgate',
    city: 'London',
    state: 'Greater London',
    postalCode: 'EC2N 4AS',
    country: 'United Kingdom',
    phone: '+44 20 7946 0912',
    openNow: true,
    is24Hour: false,
    services: ['International Air Express', 'Customs Clearance Desk', 'Drop Off', 'Pick Up / Hold'],
    hasParking: false,
    distanceMiles: 1.0,
    lat: 51.5160,
    lng: -0.0818,
    hours: [
      { day: 'Monday - Friday', open: '08:00', close: '18:30' },
      { day: 'Saturday', open: '09:00', close: '14:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  },
  {
    id: 'loc-12',
    name: 'Traxio Express Center - Toronto Financial District',
    type: 'Traxio Express Center',
    address: '100 King Street West, Concourse Level',
    city: 'Toronto',
    state: 'ON',
    postalCode: 'M5X 1A9',
    country: 'Canada',
    phone: '+1 (416) 555-0188',
    openNow: true,
    is24Hour: false,
    services: ['Cross-Border US/Canada Shipping', 'Drop Off', 'Pick Up / Hold', 'Express Document Pouch'],
    hasParking: true,
    distanceMiles: 1.5,
    lat: 43.6487,
    lng: -79.3817,
    hours: [
      { day: 'Monday - Friday', open: '08:00', close: '18:00' },
      { day: 'Saturday', open: '10:00', close: '15:00' },
      { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
    ]
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-01',
    name: 'Alexander Wright',
    company: 'Wright & Sons Architecture',
    email: 'awright@wrightarch.com',
    phone: '+1 (212) 555-3490',
    accountType: 'Small Business',
    accountNumber: 'TRX-BUS-449102',
    address: '350 Madison Avenue, 10th Floor',
    city: 'New York',
    state: 'NY',
    postalCode: '10017',
    country: 'United States',
    totalShipments: 142,
    status: 'Active',
    joinedDate: '2024-03-15'
  },
  {
    id: 'cust-02',
    name: 'Elena Rostova',
    company: 'Lumina Tech Goods',
    email: 'elena@luminatech.io',
    phone: '+1 (415) 555-8912',
    accountType: 'Enterprise',
    accountNumber: 'TRX-ENT-889104',
    address: '500 Howard Street, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'United States',
    totalShipments: 1840,
    status: 'Active',
    joinedDate: '2023-11-01'
  },
  {
    id: 'cust-03',
    name: 'David K. Miller',
    company: 'Miller Artisan Books',
    email: 'david@millerbooks.org',
    phone: '+1 (215) 555-2244',
    accountType: 'Personal',
    accountNumber: 'TRX-PER-104928',
    address: '1500 Market Street',
    city: 'Philadelphia',
    state: 'PA',
    postalCode: '19102',
    country: 'United States',
    totalShipments: 28,
    status: 'Active',
    joinedDate: '2025-01-20'
  },
  {
    id: 'cust-04',
    name: 'Sarah Jenkins',
    company: 'Jenkins Design Labs',
    email: 'sjenkins@designlabs.co',
    phone: '+1 (704) 555-8833',
    accountType: 'Small Business',
    accountNumber: 'TRX-BUS-902411',
    address: '742 Queens Road',
    city: 'Charlotte',
    state: 'NC',
    postalCode: '28207',
    country: 'United States',
    totalShipments: 76,
    status: 'Active',
    joinedDate: '2024-08-11'
  },
  {
    id: 'cust-05',
    name: 'Marcus Sterling',
    company: 'Sterling Talent Partners',
    email: 'm.sterling@sterlingtalent.com',
    phone: '+1 (310) 555-4011',
    accountType: 'Small Business',
    accountNumber: 'TRX-BUS-771923',
    address: '9440 Santa Monica Blvd',
    city: 'Beverly Hills',
    state: 'CA',
    postalCode: '90210',
    country: 'United States',
    totalShipments: 64,
    status: 'Active',
    joinedDate: '2024-05-09'
  },
  {
    id: 'cust-06',
    name: 'Dr. Jennifer Martinez',
    company: 'Austin Medical Supply',
    email: 'dr.martinez@austinhealth.org',
    phone: '+1 (512) 555-3301',
    accountType: 'Enterprise',
    accountNumber: 'TRX-ENT-661049',
    address: '1400 Congress Ave',
    city: 'Austin',
    state: 'TX',
    postalCode: '78701',
    country: 'United States',
    totalShipments: 620,
    status: 'Active',
    joinedDate: '2023-09-14'
  },
  {
    id: 'cust-07',
    name: 'Carlos Mendez',
    company: 'Mendez Auto Parts Distribution',
    email: 'cmendez@mendezauto.net',
    phone: '+1 (305) 555-9182',
    accountType: 'Enterprise',
    accountNumber: 'TRX-ENT-552819',
    address: '1200 NW 78th Ave',
    city: 'Miami',
    state: 'FL',
    postalCode: '33126',
    country: 'United States',
    totalShipments: 1290,
    status: 'Active',
    joinedDate: '2022-12-04'
  },
  {
    id: 'cust-08',
    name: 'Hannah Abbott',
    email: 'hannah.abbott@gmail.com',
    phone: '+1 (206) 555-8712',
    accountType: 'Personal',
    accountNumber: 'TRX-PER-339182',
    address: '884 Bellevue Way NE',
    city: 'Bellevue',
    state: 'WA',
    postalCode: '98004',
    country: 'United States',
    totalShipments: 9,
    status: 'Active',
    joinedDate: '2025-06-18'
  },
  {
    id: 'cust-09',
    name: 'Jonathan Vance',
    company: 'Vance Precision Optics',
    email: 'jvance@vanceoptics.com',
    phone: '+1 (617) 555-4491',
    accountType: 'Small Business',
    accountNumber: 'TRX-BUS-110293',
    address: '400 Technology Square',
    city: 'Cambridge',
    state: 'MA',
    postalCode: '02139',
    country: 'United States',
    totalShipments: 215,
    status: 'Active',
    joinedDate: '2024-01-30'
  },
  {
    id: 'cust-10',
    name: 'Claire Dupont',
    company: 'Hexagon Bio-Tech Corp',
    email: 'c.dupont@hexagonbio.fr',
    phone: '+33 1 42 68 55 00',
    accountType: 'Enterprise',
    accountNumber: 'TRX-ENT-994821',
    address: '28 Rue de la Paix',
    city: 'Paris',
    state: 'Île-de-France',
    postalCode: '75002',
    country: 'France',
    totalShipments: 3400,
    status: 'Active',
    joinedDate: '2023-04-12'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-01',
    ticketNumber: 'CAS-88192-M',
    subject: 'Interstate delay clarification for medical package',
    customerName: 'Dr. Jennifer Martinez',
    customerEmail: 'dr.martinez@austinhealth.org',
    trackingNumber: 'TRX1000000004',
    category: 'Tracking & Delivery',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-09T06:30:00Z',
    updatedAt: '2026-10-09T07:15:00Z',
    messages: [
      {
        id: 'msg-01-1',
        sender: 'customer',
        senderName: 'Dr. Jennifer Martinez',
        text: 'Hello, our shipment TRX1000000004 shows delayed due to weather near Omaha. Can you confirm if temperature control is maintained?',
        timestamp: '2026-10-09T06:30:00Z'
      },
      {
        id: 'msg-01-2',
        sender: 'agent',
        senderName: 'Traxio Priority Support (Keith B.)',
        text: 'Good morning Dr. Martinez. We have flagged your parcel at the Omaha Interchange terminal. The trailer is plugged into auxiliary thermal climate units. We expect road clearance by noon today.',
        timestamp: '2026-10-09T07:15:00Z'
      }
    ]
  },
  {
    id: 'tkt-02',
    ticketNumber: 'CAS-88145-P',
    subject: 'Request pickup window adjustment for commercial dock',
    customerName: 'Alexander Wright',
    customerEmail: 'awright@wrightarch.com',
    category: 'Pickup Request',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-10-09T05:50:00Z',
    updatedAt: '2026-10-09T05:50:00Z',
    messages: [
      {
        id: 'msg-02-1',
        sender: 'customer',
        senderName: 'Alexander Wright',
        text: 'We have 4 architectural drawing tubes ready for pickup today at 350 Madison Ave. Can the driver arrive after 2:00 PM?',
        timestamp: '2026-10-09T05:50:00Z'
      }
    ]
  },
  {
    id: 'tkt-03',
    ticketNumber: 'CAS-88099-B',
    subject: 'Fuel surcharge discrepancy on invoice INV-2026-1002',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@luminatech.io',
    category: 'Billing & Rates',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-10-08T14:10:00Z',
    updatedAt: '2026-10-08T16:45:00Z',
    messages: [
      {
        id: 'msg-03-1',
        sender: 'customer',
        senderName: 'Elena Rostova',
        text: 'Our enterprise agreement sets fuel surcharge at capped 12.5%, but invoice shows 14.5%.',
        timestamp: '2026-10-08T14:10:00Z'
      },
      {
        id: 'msg-03-2',
        sender: 'agent',
        senderName: 'Billing Desk (Sarah W.)',
        text: 'Apologies Elena. A credit note for $84.20 has been credited to your Traxio Enterprise balance.',
        timestamp: '2026-10-08T16:45:00Z'
      }
    ]
  },
  {
    id: 'tkt-04',
    ticketNumber: 'CAS-88022-D',
    subject: 'Damaged outer box reported by recipient',
    customerName: 'Carlos Mendez',
    customerEmail: 'cmendez@mendezauto.net',
    trackingNumber: 'TRX1000000007',
    category: 'Damaged or Lost',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-10-08T18:00:00Z',
    updatedAt: '2026-10-09T06:10:00Z',
    messages: [
      {
        id: 'msg-04-1',
        sender: 'customer',
        senderName: 'Carlos Mendez',
        text: 'Recipient sent photos showing puncture on parcel side. Please inspect claim eligibility.',
        timestamp: '2026-10-08T18:00:00Z'
      }
    ]
  },
  {
    id: 'tkt-05',
    ticketNumber: 'CAS-87940-T',
    subject: 'API Webhook signature validation error in sandbox',
    customerName: 'Jonathan Vance',
    customerEmail: 'jvance@vanceoptics.com',
    category: 'Technical Support',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-10-07T11:20:00Z',
    updatedAt: '2026-10-07T15:30:00Z',
    messages: [
      {
        id: 'msg-05-1',
        sender: 'customer',
        senderName: 'Jonathan Vance',
        text: 'Where do we find the HMAC secret for Traxio Tracking webhook in developer portal?',
        timestamp: '2026-10-07T11:20:00Z'
      },
      {
        id: 'msg-05-2',
        sender: 'agent',
        senderName: 'Traxio Dev Rel (Alex N.)',
        text: 'The webhook secret is located under Developer Portal > API Credentials > Webhook Endpoints > Signing Secret.',
        timestamp: '2026-10-07T15:30:00Z'
      }
    ]
  },
  {
    id: 'tkt-06',
    ticketNumber: 'CAS-87890-G',
    subject: 'Request for dry-ice shipping certification guide',
    customerName: 'Claire Dupont',
    customerEmail: 'c.dupont@hexagonbio.fr',
    category: 'General',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-10-06T09:15:00Z',
    updatedAt: '2026-10-06T13:40:00Z',
    messages: [
      {
        id: 'msg-06-1',
        sender: 'customer',
        senderName: 'Claire Dupont',
        text: 'We are sending biological samples requiring dry ice from Paris to Boston. Please provide current IATA compliant packing guide.',
        timestamp: '2026-10-06T09:15:00Z'
      }
    ]
  },
  {
    id: 'tkt-07',
    ticketNumber: 'CAS-87720-M',
    subject: 'Address redirect request before final delivery',
    customerName: 'David K. Miller',
    customerEmail: 'david@millerbooks.org',
    trackingNumber: 'TRX1000000003',
    category: 'Tracking & Delivery',
    priority: 'Urgent',
    status: 'Resolved',
    createdAt: '2026-10-09T04:10:00Z',
    updatedAt: '2026-10-09T05:30:00Z',
    messages: [
      {
        id: 'msg-07-1',
        sender: 'customer',
        senderName: 'David K. Miller',
        text: 'Can we redirect package to our downtown branch instead of the warehouse?',
        timestamp: '2026-10-09T04:10:00Z'
      }
    ]
  },
  {
    id: 'tkt-08',
    ticketNumber: 'CAS-87610-P',
    subject: 'Recurring daily courier pickup agreement for Q4',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@sterlingtalent.com',
    category: 'Pickup Request',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-10-05T14:00:00Z',
    updatedAt: '2026-10-06T10:00:00Z',
    messages: [
      {
        id: 'msg-08-1',
        sender: 'customer',
        senderName: 'Marcus Sterling',
        text: 'We would like to set up scheduled daily pickups Monday through Friday at 4:30 PM for our Beverly Hills office.',
        timestamp: '2026-10-05T14:00:00Z'
      }
    ]
  }
];

export const INITIAL_PICKUPS: Pickup[] = [
  {
    id: 'pk-01',
    pickupNumber: 'PK-991204',
    address: {
      name: 'Vanguard Medical Logistics',
      company: 'Vanguard Medical Inc.',
      address: '420 Pike Street, Suite 800',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States',
      phone: '+1 (206) 555-0199'
    },
    date: '2026-10-10',
    timeWindow: '13:00 - 17:00',
    packageCount: 6,
    estimatedWeightKg: 24,
    locationType: 'Office Reception',
    specialInstructions: 'Ring bell on 8th floor. Pallet jack not needed.',
    status: 'Scheduled',
    createdAt: '2026-10-09T07:10:00Z'
  },
  {
    id: 'pk-02',
    pickupNumber: 'PK-990881',
    address: {
      name: 'Alexander Wright',
      company: 'Wright & Sons Architecture',
      address: '350 Madison Avenue',
      city: 'New York',
      state: 'NY',
      postalCode: '10017',
      country: 'United States',
      phone: '+1 (212) 555-3490'
    },
    date: '2026-10-11',
    timeWindow: '09:00 - 13:00',
    packageCount: 3,
    estimatedWeightKg: 8.5,
    locationType: 'Front Door / Porch',
    specialInstructions: 'Building security will escort driver to freight elevator.',
    status: 'Scheduled',
    createdAt: '2026-10-08T16:20:00Z'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-1001',
    date: '2026-10-01',
    dueDate: '2026-10-31',
    amount: 1420.50,
    status: 'Paid',
    trackingNumbers: ['TRX1000000001', 'TRX1000000002', 'TRX1000000007'],
    pdfUrl: '#'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-1002',
    date: '2026-10-08',
    dueDate: '2026-10-28',
    amount: 685.20,
    status: 'Unpaid',
    trackingNumbers: ['TRX1000000003', 'TRX1000000006'],
    pdfUrl: '#'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-0924',
    date: '2026-09-24',
    dueDate: '2026-10-08',
    amount: 320.00,
    status: 'Overdue',
    trackingNumbers: ['TRX1000000008'],
    pdfUrl: '#'
  }
];

export const INITIAL_ADDRESS_BOOK: AddressBookEntry[] = [
  {
    id: 'addr-01',
    label: 'Headquarters & Studio',
    name: 'Alexander Wright',
    company: 'Wright & Sons Architecture',
    address: '350 Madison Avenue, 10th Floor',
    city: 'New York',
    state: 'NY',
    postalCode: '10017',
    country: 'United States',
    phone: '+1 (212) 555-3490',
    email: 'awright@wrightarch.com',
    isDefault: true
  },
  {
    id: 'addr-02',
    label: 'West Coast Fabrication Lab',
    name: 'Sarah Lin',
    company: 'Wright Design Labs SF',
    address: '450 Townsend St',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    phone: '+1 (415) 555-9081',
    email: 'slin@wrightarch.com',
    isDefault: false
  },
  {
    id: 'addr-03',
    label: 'Austin Clinic Client',
    name: 'Dr. Jennifer Martinez',
    company: 'Austin Health Systems',
    address: '1400 Congress Ave, Floor 4',
    city: 'Austin',
    state: 'TX',
    postalCode: '78701',
    country: 'United States',
    phone: '+1 (512) 555-0842',
    isDefault: false
  }
];

export const SERVICE_ALERTS_DATA = [
  {
    id: 'alt-01',
    title: 'Severe Weather Alert: Central Plains & Midwest Transportation Corridors',
    severity: 'Delay',
    date: 'October 9, 2026',
    regions: ['Nebraska', 'Iowa', 'Minnesota', 'South Dakota'],
    description: 'Blizzard conditions and interstate commercial vehicle travel restrictions in eastern Nebraska and western Iowa are causing unavoidable delays for ground and air feeder traffic connecting via Omaha and Des Moines. Contingency routing is actively engaged.'
  },
  {
    id: 'alt-02',
    title: 'Gulf Coast Tropical Advisory: Operations Resuming with Minor Lags',
    severity: 'Advisory',
    date: 'October 8, 2026',
    regions: ['Louisiana', 'Southern Mississippi', 'Alabama Coast'],
    description: 'Following high winds and localized flooding, delivery terminals in New Orleans, Baton Rouge, and Mobile have restored normal sorting operations. Customers may experience up to 24-hour delivery variance on non-guaranteed ground packages.'
  },
  {
    id: 'alt-03',
    title: 'European Gateway Customs Digital Declaration Modernization',
    severity: 'Information',
    date: 'October 6, 2026',
    regions: ['European Union', 'United Kingdom'],
    description: 'Mandatory ICS2 Release 3 customs entry formalities are active for all commercial goods entering the European Union. Ensure full 6-digit HS commodity codes are submitted on electronic commercial invoices to prevent customs processing holds.'
  }
];
