import React from 'react';
import { CompanyLayout } from './CompanyLayout';
import { Truck, Warehouse, RefreshCw, BarChart3 } from 'lucide-react';

export const LogisticsPage: React.FC = () => {
  return (
    <CompanyLayout
      title="Contract Logistics & Supply Chain Solutions"
      subtitle="End-to-end warehousing, reverse logistics, and cross-border customs distribution."
    >
      <div className="space-y-8 text-sm text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Integrated Third-Party Logistics (3PL)</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Traxio Logistics provides specialized multi-client fulfillment hubs, cross-docking distribution, and cold-chain clinical supply chains engineered to scale with multinational enterprise demands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Omnichannel Fulfillment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated pick, pack, and ship operations integrated with major ERP systems, shipping within 2 hours of order authorization.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Reverse Logistics & Refurbishment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated product return processing, quality assurance screening, and rapid restock staging to maximize inventory value.
            </p>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};
