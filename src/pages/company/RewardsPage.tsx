import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyLayout } from './CompanyLayout';
import { Award, Gift, Sparkles, Check, ArrowRight } from 'lucide-react';

export const RewardsPage: React.FC = () => {
  return (
    <CompanyLayout
      title="Traxio Rewards Program"
      subtitle="Earn shipping credits and business rewards on every domestic and international parcel."
    >
      <div className="space-y-8 text-sm text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Ship More. Earn More.</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every shipment booked on your active Traxio account earns reward points redeemable for future shipping credits, premium packaging supplies, or brand merchant gift cards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Silver Tier</span>
            <div className="text-xl font-black text-slate-900 mb-2">1 Point / $1 Spent</div>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> 0-50 shipments/mo</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> Free packaging orders</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> Online billing portal</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border-2 border-[#0047AB] bg-blue-50/30 shadow-sm relative">
            <span className="text-xs font-bold text-[#0047AB] uppercase tracking-wider block mb-1">Gold Tier</span>
            <div className="text-xl font-black text-[#0047AB] mb-2">1.5 Points / $1 Spent</div>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> 51-200 shipments/mo</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> 15% discount on air express</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> Dedicated phone queue</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border-2 border-[#FF6700] bg-orange-50/30 shadow-sm">
            <span className="text-xs font-bold text-[#FF6700] uppercase tracking-wider block mb-1">Platinum Tier</span>
            <div className="text-xl font-black text-[#FF6700] mb-2">2.0 Points / $1 Spent</div>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> 200+ shipments/mo</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> 25% discount on air express</li>
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#3DDC97]" /> Dedicated account executive</li>
            </ul>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md"
          >
            <span>Enroll in Traxio Rewards Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </CompanyLayout>
  );
};
