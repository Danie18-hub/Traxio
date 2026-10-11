import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { TrackForm } from '@/src/components/tracking/TrackForm';
import { CTABand } from '@/src/components/ui/CTABand';
import { FAQAccordion } from '@/src/components/ui/FAQAccordion';
import {
  Package,
  SlidersHorizontal,
  FileCheck2,
  Bell,
  Search,
  Globe2,
  ShieldCheck,
  Smartphone,
  ArrowRight
} from 'lucide-react';

export const TrackingLandingPage: React.FC = () => {
  const trackingFaqs = [
    {
      question: 'Where can I find my Traxio tracking number?',
      answer: 'Your tracking number is printed directly on your shipment receipt, prepaid airbill, or in your shipping confirmation email. Standard Traxio numbers begin with the prefix TRX followed by 10 digits (e.g. TRX1000000001).'
    },
    {
      question: 'How often does package tracking information update?',
      answer: 'Our courier barcode scans transmit real-time milestone events via cellular GPS directly into our cloud network. Events update whenever a package is collected, sorted at a distribution facility, boarded onto cargo aircraft, or loaded onto the local delivery truck.'
    },
    {
      question: 'Can I change the delivery address once my package is in transit?',
      answer: 'Yes! Using Traxio Delivery Manager, recipients can request an in-flight address redirect, schedule a delivery date hold, or instruct the courier to hold the package at a nearby Traxio Express Center.'
    },
    {
      question: 'What does "Delivery Exception" mean?',
      answer: 'A delivery exception indicates an unexpected delay or issue, such as severe weather along transport highways, an incomplete street address, or a business being closed during delivery hours. Our dispatch team automatically resolves exceptions and updates your estimated delivery window.'
    }
  ];

  return (
    <div className="flex-1">
      <PageHeaderBand
        title="All Tracking Services"
        subtitle="Precision visibility from origin warehouse to the recipient's front door."
        breadcrumbs={[{ label: 'Tracking' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Tracking Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg max-w-4xl mx-auto -mt-16 relative z-20">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
            Track Domestic & International Parcels
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            Enter tracking numbers, door tag numbers, or commercial transportation manifests.
          </p>
          <TrackForm variant="hero" />
        </div>

        {/* Feature Grid */}
        <div className="mt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#0047AB] uppercase tracking-widest">Tools & Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              Enhanced tracking capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Advanced Tracking
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Search by purchase order number, reference code, account invoice ID, or shipment date range.
                </p>
              </div>
              <Link to="/tracking/advanced" className="mt-6 text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1">
                <span>Go to advanced tracking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Delivery Manager
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Hold at a local Traxio location, authorize release without signature, or leave specific drop instructions.
                </p>
              </div>
              <Link to="/manage-delivery" className="mt-6 text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1">
                <span>Manage your delivery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-4">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Proof of Delivery
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Download official signed PDF delivery receipts with courier time-stamped photo documentation.
                </p>
              </div>
              <Link to="/proof-of-delivery" className="mt-6 text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1">
                <span>Lookup delivery photo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Tracking Questions & Answers
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Common questions about tracking statuses, scans, and delivery windows.
            </p>
          </div>
          <FAQAccordion items={trackingFaqs} />
        </div>
      </div>

      <CTABand />
    </div>
  );
};
