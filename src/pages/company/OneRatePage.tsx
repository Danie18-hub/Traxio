import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyLayout } from './CompanyLayout';
import { Box, Check, ArrowRight } from 'lucide-react';

export const OneRatePage: React.FC = () => {
  const oneRates = [
    { package: 'Traxio Envelope', maxWeight: '0.5 kg (Docs)', dim: '12.5" × 9.5"', ground: '$9.80', priority: '$14.50', overnight: '$28.00' },
    { package: 'Traxio Box Small', maxWeight: '5 kg (11 lbs)', dim: '10.8" × 1.5" × 12.3"', ground: '$12.40', priority: '$19.20', overnight: '$36.50' },
    { package: 'Traxio Box Medium', maxWeight: '12 kg (26 lbs)', dim: '11.5" × 2.3" × 13.2"', ground: '$16.90', priority: '$24.80', overnight: '$48.20' },
    { package: 'Traxio Box Large', maxWeight: '25 kg (55 lbs)', dim: '17.8" × 12.3" × 3.0"', ground: '$22.50', priority: '$34.00', overnight: '$64.00' }
  ];

  return (
    <CompanyLayout
      title="Traxio OneRate Pricing"
      subtitle="Predictable flat-rate pricing for any shipment up to 25 kg across all 50 US States."
    >
      <div className="space-y-8 text-sm text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Weighing. No Surprises.</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            If it fits in a standardized Traxio OneRate box, you pay one predictable flat tariff anywhere in the continental United States. Zero residential surcharges and zero fuel index variance.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Standard Packaging</th>
                  <th className="py-3 px-4">Max Weight</th>
                  <th className="py-3 px-4">Dimensions</th>
                  <th className="py-3 px-4 text-[#0047AB]">Economy Ground</th>
                  <th className="py-3 px-4 text-[#0047AB]">Priority Express (2-Day)</th>
                  <th className="py-3 px-4 text-[#FF6700]">Overnight Air</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {oneRates.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{r.package}</td>
                    <td className="py-3.5 px-4 text-slate-600">{r.maxWeight}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">{r.dim}</td>
                    <td className="py-3.5 px-4 font-bold font-mono text-[#0047AB]">{r.ground}</td>
                    <td className="py-3.5 px-4 font-bold font-mono text-[#0047AB]">{r.priority}</td>
                    <td className="py-3.5 px-4 font-bold font-mono text-[#FF6700]">{r.overnight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-blue-50/60 rounded-xl border border-blue-200">
          <div>
            <div className="font-bold text-[#0047AB] text-sm">Need Free OneRate Boxes?</div>
            <p className="text-xs text-slate-600">Order packs of 10 or 25 free boxes delivered directly to your doorstep.</p>
          </div>
          <Link
            to="/shipping/packaging"
            className="px-5 py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
          >
            Request Free Boxes
          </Link>
        </div>
      </div>
    </CompanyLayout>
  );
};
