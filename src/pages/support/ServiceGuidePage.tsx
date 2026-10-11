import React from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import { Check, X, ShieldCheck } from 'lucide-react';

export const ServiceGuidePage: React.FC = () => {
  const serviceMatrix = [
    {
      name: 'Traxio Overnight Air',
      speed: 'Next business day by 10:30 AM',
      maxWeight: '70 kg (154 lbs)',
      tracking: 'Real-time GPS flight & van scanning',
      signature: 'Included upon request',
      guarantee: '100% Money-Back Guarantee',
      scope: 'Domestic US, Canada, Major European Metros'
    },
    {
      name: 'Traxio Priority Express',
      speed: '1 - 2 business days',
      maxWeight: '70 kg (154 lbs)',
      tracking: 'Full milestone barcode scans',
      signature: 'Available (optional add-on)',
      guarantee: 'Day-Definite Commitment',
      scope: 'Domestic Nationwide & Cross-Border'
    },
    {
      name: 'Traxio Standard Express',
      speed: '2 - 3 business days',
      maxWeight: '70 kg (154 lbs)',
      tracking: 'Full milestone barcode scans',
      signature: 'Available (optional add-on)',
      guarantee: 'Standard Transit Commitment',
      scope: 'Domestic US Coast-to-Coast'
    },
    {
      name: 'Traxio Economy Ground',
      speed: '4 - 6 business days',
      maxWeight: '70 kg (154 lbs)',
      tracking: 'Full milestone barcode scans',
      signature: 'Available (optional add-on)',
      guarantee: 'Estimated Schedule',
      scope: 'All 50 US States & Puerto Rico'
    },
    {
      name: 'Traxio Freight Priority',
      speed: '1 - 4 business days',
      maxWeight: '10,000 kg (Palletized)',
      tracking: 'Cellular trailer telematics',
      signature: 'Bill of Lading (BOL) signed',
      guarantee: 'Scheduled Dock Window',
      scope: 'North America LTL & FTL'
    }
  ];

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Official Service Guide 2026"
        subtitle="Comprehensive service matrix, delivery commitments, liability parameters, and dimension limits."
        breadcrumbs={[
          { label: 'Support', href: '/support' },
          { label: 'Service Guide' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Service Comparison Matrix Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 font-bold text-sm text-slate-800 flex items-center justify-between">
            <span>Service Matrix & Liability Comparison</span>
            <span className="text-xs font-normal text-slate-500">Effective October 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Service Tier</th>
                  <th className="py-3 px-4 font-bold">Committed Transit Speed</th>
                  <th className="py-3 px-4 font-bold">Max Package Weight</th>
                  <th className="py-3 px-4 font-bold">Tracking Scans</th>
                  <th className="py-3 px-4 font-bold">Direct Signature</th>
                  <th className="py-3 px-4 font-bold">Service Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {serviceMatrix.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#0047AB]">
                      {s.name}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-900">
                      {s.speed}
                    </td>
                    <td className="py-4 px-4 text-xs font-medium">
                      {s.maxWeight}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600">
                      {s.tracking}
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-800">
                      {s.signature}
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {s.guarantee}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Carrier Liability & Standard Packaging Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs leading-relaxed text-slate-600">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Carrier Liability & Declared Value
            </h3>
            <p>
              Traxio’s standard liability for loss or damage to any package is capped at $100 USD unless a higher declared value is submitted and paid for at the time of label creation.
            </p>
            <p>
              Maximum allowable declared value for jewelry, fine art, and precious metals is $1,000 USD. For standard commercial merchandise, declared value may be stated up to $50,000 USD per package.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs leading-relaxed text-slate-600">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Packaging & Cushioning Standards
            </h3>
            <p>
              Packages must be capable of withstanding a 48-inch drop onto solid concrete without internal breach. Liquid containers must contain redundant absorbent cushioning capable of retaining the entire volume.
            </p>
            <p>
              Single-wall corrugation is permissible up to 15 kg. Any package between 15 kg and 70 kg requires dual-wall corrugated outer boxing and reinforced filament tape.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CTABand />
      </div>
    </div>
  );
};
