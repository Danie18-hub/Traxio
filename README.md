# Traxio - Global Courier & Parcel Tracking Platform

Traxio is a production-quality website and operations management system for a global courier, parcel tracking, and freight company. Modeled on the structure and UX patterns of leading worldwide couriers, it features a tracking-first homepage, mega-menu navigation, rich multi-package tracking results, rates calculator, pickups scheduling, interactive location finder, customer accounts, and an operations dispatcher portal.

---

## 🎨 Design System & Tokens

- **Primary Brand Color**: Cobalt Blue `#0047AB` (Navbars, headings, core UI elements, footer)
- **Accent Brand Color**: Safety Orange `#FF6700` (Main CTAs, TRACK buttons, active underline tabs)
- **Success State Color**: Mint Green `#3DDC97` (Delivered status, verified POD signatures, positive badges)
- **Neutrals**: White, Slate-50 background, Slate-900 typography, Slate-200 borders
- **Typography**: Inter with strict typographic hierarchy, rounded-lg corners, and subtle shadows.

---

## 🗺️ Route Index

### 1. Homepage & Core Tracking
- `/` – Homepage with hero tabs (Rate & Ship, Track, Locations), quick-action tiles, why ship with Traxio, and global customs highlights.
- `/track/:trackingNumber` – Multi-shipment tracking results with progress bar, milestone timeline, copy buttons, email notifications dialog, and POD photo inspection.
- `/tracking` – All Tracking Services landing page with FAQ accordion.
- `/tracking/advanced` – Advanced tracking by reference, purchase order (PO), invoice ID, or date range.

### 2. Rates & Shipping
- `/rates` – Real-time rates & delivery times calculator (two-column layout, kg/lb, cm/in toggles, 4 service tiers, collapsible fee breakdown).
- `/shipping` – All Shipping Services catalog (Overnight Air, Priority Express, Economy Ground, International, Freight).
- `/shipping/create` – Multi-step shipment wizard (addresses, package dimensions, service selection, and printable label preview).
- `/shipping/pickups` – Schedule & manage courier dock and office pickups.
- `/shipping/packaging` – Packaging & supply boxes catalog with request form.
- `/shipping/international` – International customs guide (country lookup, HS codes, commercial invoice checklist).
- `/shipping/freight` – LTL, FTL, and air freight quote request portal.
- `/shipping/returns` – Returns manager with mobile QR code drop generator.
- `/one-rate` – Traxio OneRate flat-rate packaging pricing matrix.

### 3. Locations & Delivery Management
- `/locations` – Interactive location finder (search by city/ZIP, filter chips for 24/7 access, services, weekly hours table, and map inspector).
- `/locations/drop-off` – Drop off a package guide & QR drop point instructions.
- `/locations/:id` – Individual location facility details and weekly hours schedule.
- `/manage-delivery` – In-flight shipment manager (Hold at location, address redirect, reschedule date, delivery notes).
- `/service-alerts` – Network operations status, weather delays, and customs advisories.
- `/proof-of-delivery` – Visual Proof of Delivery (POD) photo lookup and digital signature certificate.

### 4. Support & Small Business
- `/support` – Customer support hub with quick search and category cards.
- `/support/faqs` – Searchable grouped FAQ accordion.
- `/support/contact` – Contact form with category selection, file upload, and direct hotline details.
- `/support/claims` – Step-by-step claims filing wizard (damaged, lost, delayed packages).
- `/support/service-guide` – Official service matrix and carrier liability parameters.
- `/support/billing` – Billing & invoicing explainer with online invoice lookup.
- `/support/account-tools` – Overview of account management utilities.
- `/small-business` – Small Business Shipping Center with discounts, fulfillment guides, and integration tips.

### 5. Customer Account & Authentication
- `/login` – Customer sign-in with show/hide password and remember-me state.
- `/signup` – Personal vs. Business account registration with password strength meter.
- `/forgot-password` – Password reset form with success feedback.
- `/open-account` – Account tier comparison table (Personal, Small Business, Enterprise).
- `/account` – Customer portal dashboard with active metrics and quick track.
- `/account/shipments` – Customer shipment history data table with filters.
- `/account/address-book` – Destination address book CRUD with add/edit modals.
- `/account/profile` – Profile entity information and credentials management.
- `/account/email-preferences` – Granular email and SMS delivery milestone toggles.
- `/account/billing` – Corporate billing statements with "Pay Now" checkout modal.

### 6. Company & Legal
- `/about` – Company history, global network statistics, and fleet milestones.
- `/careers` – Open positions directory with department filter and application dialog.
- `/newsroom` – Corporate press releases and facility announcements.
- `/blog` – Supply chain engineering articles.
- `/blog/:slug` – Full sample logistics blog article.
- `/investors` – Quarterly financial highlights and SEC filing downloads.
- `/corporate-responsibility` – Net-zero 2035 roadmap, electric vans, and SAF aviation fuels.
- `/developer` – Developer API portal with REST and webhook documentation, JSON code snippets.
- `/logistics` – Contract logistics and 3PL warehousing overview.
- `/compatible-partners` – Compatible platforms (Shopify, WooCommerce, Magento, BigCommerce, NetSuite).
- `/rewards` – Traxio Rewards tiers and benefits.
- `/sitemap` – Complete link index for public discovery and accessibility.
- `/terms` – Conditions of carriage and terms of use.
- `/privacy` – Privacy policy and telemetry data protection.
- `/ad-choices` – Digital advertising transparency.
- `/cookie-settings` – Interactive cookie preference category toggles.

### 7. Staff Operations & Admin Portal
- `/admin` – Dispatcher overview with live metric cards, weekly inbound sorting bar chart, and airport terminal feed.
- `/admin/shipments` – Data table with multi-select checkboxes, search, status filters, and instant status updates.
- `/admin/shipments/new` – Form that provisions tracking numbers in standard `TRX...` format.
- `/admin/shipments/:id` – Shipment editor and **Live Tracking Events Manager** (push milestone events, edit/delete events, live customer timeline synchronization).
- `/admin/locations` – Courier location facility manager with Add/Edit dialog.
- `/admin/customers` – Customer accounts directory with volume metrics.
- `/admin/support` – Customer support ticket queue with real-time response drawer.
- `/admin/settings` – Network surcharge index settings and staff RBAC roles.

---

## 🗄️ Replacing `/src/lib/api.ts` with a Real Database

All components and pages interact **exclusively** with the async functions in `/src/lib/api.ts`. No UI component imports raw seed data directly.

To connect a PostgreSQL, Cloud SQL, Supabase, or Firestore database:

1. **Replace the in-memory array operations** inside `/src/lib/api.ts`:
   - `getShipment(trackingNumber)` -> `SELECT * FROM shipments WHERE tracking_number = $1`
   - `getShipments(filters)` -> `SELECT * FROM shipments WHERE ... ORDER BY ship_date DESC`
   - `createShipment(data)` -> `INSERT INTO shipments (...) VALUES (...) RETURNING *`
   - `addTrackingEvent(shipmentId, event)` -> `INSERT INTO tracking_events (...) VALUES (...)`
   - `getLocations(filters)` -> `SELECT * FROM locations WHERE ...`
   - `getCustomers(query)` -> `SELECT * FROM customers WHERE ...`
   - `getTickets(status)` -> `SELECT * FROM support_tickets WHERE ...`

2. **Maintain the Return Types**:
   The TypeScript interfaces in `/src/lib/types.ts` (`Shipment`, `TrackingEvent`, `CourierLocation`, `Customer`, `SupportTicket`, etc.) are already designed to mirror relational database schemas with foreign keys (`shipmentId`, `customerId`).

3. **Zero UI Refactoring**:
   Because all public and administrative pages call the async methods (`await getShipment(...)`), migrating the backend will not require changing a single line of React UI code.
