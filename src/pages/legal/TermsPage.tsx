import React from 'react';
import { CompanyLayout } from '../company/CompanyLayout';

export const TermsPage: React.FC = () => {
  return (
    <CompanyLayout
      title="Terms of Use & Conditions of Carriage"
      subtitle="Governing conditions for domestic parcel delivery, international air transportation, and web portal access."
    >
      <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p><strong>Last Updated: October 1, 2026</strong></p>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">1. Acceptance of Terms</h3>
          <p>
            By booking a shipment, generating an airbill, or accessing Traxio’s online portal and tracking services, the shipper and recipient agree to be bound by these Conditions of Carriage and the current Traxio Service Guide.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">2. Limitations of Liability & Declared Value</h3>
          <p>
            Traxio’s liability for loss or physical damage to any standard shipment is strictly limited to the actual cash value of the goods, not to exceed $100.00 USD per package, unless a higher declared value is declared and paid for by the shipper prior to carrier collection.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">3. Money-Back Delivery Guarantee</h3>
          <p>
            The on-time money-back guarantee applies exclusively to designated express services (Traxio Overnight Air and Traxio Priority Express). Traxio does not guarantee delivery times when transit interruptions occur due to acts of God, severe weather disruptions declared by federal transportation agencies, or customs clearance examinations beyond the carrier’s control.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">4. Prohibited Articles</h3>
          <p>
            Shippers may not tender hazardous goods, explosives, firearms, live animals, or contraband for carriage without explicit written commercial authorization under Traxio Dangerous Goods protocols.
          </p>
        </section>
      </div>
    </CompanyLayout>
  );
};
