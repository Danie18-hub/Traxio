import React from 'react';
import { CompanyLayout } from './CompanyLayout';
import { Plane, Truck, Globe2, ShieldCheck, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <CompanyLayout
      title="About Traxio Global Courier"
      subtitle="Connecting global commerce through precision multi-modal logistics, reliable time commitments, and transparent courier tracking."
    >
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            Our Mission: Uncompromising Delivery Certainty
          </h2>
          <p>
            Founded with the conviction that international trade and domestic commerce thrive when deliveries are reliable and transparent, Traxio operates an integrated global courier network spanning 220 countries and territories.
          </p>
          <p className="mt-3">
            Headquartered in New York with automated super-hubs in Chicago, Dallas, London, and Frankfurt, Traxio handles over 4.5 million parcels and commercial freight units every business day.
          </p>
        </div>

        {/* Global Network Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-b border-slate-100 py-6 text-center">
          <div>
            <div className="text-3xl font-black text-[#0047AB]">220+</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Countries & Territories</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#FF6700]">12,000+</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Retail Drop Points</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#3DDC97]">140+</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">Dedicated Cargo Planes</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#0047AB]">99.8%</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">On-Time Performance</div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Our Core Commitments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Precision Milestone Visibility</strong>
              Real-time cellular and aircraft satellite tracking ensures shippers and recipients know exact placement at every second of the parcel journey.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Zero Hidden Gate Surcharges</strong>
              We publish indexed fuel surcharges openly and eliminate arbitrary terminal processing surcharges common across traditional freight forwarders.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Sustainable Fleet Transition</strong>
              Over 35% of Traxio's urban final-mile courier delivery fleet consists of zero-emission electric step vans charged by on-site terminal solar arrays.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Customs Clearance Pre-Filing</strong>
              Electronic Trade Documents (ETD) eliminate paper airway bills and ensure international parcels are pre-cleared before cargo aircraft touch down.
            </div>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};
