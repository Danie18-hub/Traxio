import React from 'react';
import { CompanyLayout } from './CompanyLayout';
import { ShieldCheck, Sun, Truck, Leaf, Recycle } from 'lucide-react';

export const CorporateResponsibilityPage: React.FC = () => {
  return (
    <CompanyLayout
      title="Corporate Responsibility & ESG"
      subtitle="Decarbonizing freight transportation, investing in local driver communities, and advancing ethical supply chain governance."
    >
      <div className="space-y-8 text-sm text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Our Roadmap to Net-Zero Carbon 2035</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            As a global freight carrier, our operational carbon footprint is our highest environmental priority. We are deploying capital directly into commercial electric vehicles, Sustainable Aviation Fuel (SAF), and rooftop solar hub generation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <Truck className="w-6 h-6 text-[#3DDC97]" />
            <h3 className="font-bold text-slate-900 text-sm">Electric Vehicle Fleet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              35% of all urban final-mile delivery vans are fully zero-emission electric vehicles, expanding to 75% by 2030.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <Leaf className="w-6 h-6 text-[#3DDC97]" />
            <h3 className="font-bold text-slate-900 text-sm">Sustainable Aviation Fuel (SAF)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traxio Air partners with fuel refiners to blend 15% SAF into cargo aircraft fueling across JFK, ORD, and LHR hubs.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <Recycle className="w-6 h-6 text-[#3DDC97]" />
            <h3 className="font-bold text-slate-900 text-sm">100% Recyclable Packaging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All official Traxio OneRate boxes and document envelopes are manufactured from 85% post-consumer recycled wood fiber.
            </p>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};
