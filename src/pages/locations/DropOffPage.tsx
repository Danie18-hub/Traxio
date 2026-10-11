import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import { Package, QrCode, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const DropOffPage: React.FC = () => {
  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Drop Off a Package"
        subtitle="Fast, contactless parcel drop-offs at over 12,000 Traxio Express Centers, 24/7 Drop Boxes, and retail counters."
        breadcrumbs={[
          { label: 'Locations', href: '/locations' },
          { label: 'Drop Off Guide' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">1. No Printer? Use a QR Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When creating your shipping or return label online, select "Mobile QR Code". Simply show the barcode on your smartphone at any staffed counter and our agents print it instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">2. 24/7 Automated Drop Boxes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Need to drop off outside normal retail business hours? Deposit packages up to 20" × 12" × 6" with prepaid labels into any Traxio 24/7 standalone drop box.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">3. Instant Drop Off Receipt</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Request a physical printed drop receipt or digital SMS timestamp when depositing packages at any authorized counter as proof of carrier custody.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Find Your Closest Drop Point</h2>
          <p className="text-xs text-slate-600 mb-6">
            Enter your zip code or city to see drop-off cut-off times for same-day air dispatch.
          </p>
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md"
          >
            <span>Search Nearby Drop Locations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
