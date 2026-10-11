import React from 'react';
import { CompanyLayout } from '../company/CompanyLayout';

export const PrivacyPage: React.FC = () => {
  return (
    <CompanyLayout
      title="Privacy & Data Protection Notice"
      subtitle="How Traxio collects, secures, and handles courier shipment data, recipient addresses, and telemetry."
    >
      <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p><strong>Effective Date: October 2026</strong></p>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">1. Information We Collect</h3>
          <p>
            We collect personal information necessary to deliver packages reliably: sender and recipient names, physical delivery addresses, phone numbers, email addresses for tracking notifications, signature images, and door-drop verification photographs.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">2. Use of Telemetry & Geolocation Data</h3>
          <p>
            When couriers scan barcodes or take photographic proof of delivery, our mobile terminals capture precise GPS coordinates and network timestamps. This information is utilized solely to verify drop placement and provide real-time tracking transparency.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">3. Customs & Regulatory Disclosures</h3>
          <p>
            For international shipments, customs regulations require disclosing full commercial invoice item descriptions, consignee identification, and commodity valuations to border control authorities in origin and destination nations.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">4. Data Subject Rights & Opt-Outs</h3>
          <p>
            You have the right to request access to, correction of, or deletion of your saved customer profile information at any time via the Traxio Customer Portal or by submitting a privacy inquiry to privacy@traxio-courier.com.
          </p>
        </section>
      </div>
    </CompanyLayout>
  );
};
