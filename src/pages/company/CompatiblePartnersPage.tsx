import React from 'react';
import { CompanyLayout } from './CompanyLayout';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CompatiblePartnersPage: React.FC = () => {
  const partners = [
    { name: 'Shopify', desc: 'Sync orders automatically, print Traxio shipping labels, and fulfill tracking links natively.' },
    { name: 'WooCommerce', desc: 'Official Traxio Shipping plugin with real-time checkout rate calculation.' },
    { name: 'Magento (Adobe Commerce)', desc: 'Enterprise-scale order import and automated multi-package label creation.' },
    { name: 'Amazon Multi-Channel', desc: 'Fulfill off-Amazon direct orders with Traxio Guaranteed 2-Day Air.' },
    { name: 'BigCommerce', desc: 'Native rate quotes and customs document generation for international merchant growth.' },
    { name: 'SAP NetSuite ERP', desc: 'Automated warehouse dispatch and EDI 210 freight billing synchronization.' }
  ];

  return (
    <CompanyLayout
      title="Compatible E-Commerce Platforms"
      subtitle="Connect Traxio with your existing online store or warehouse management software."
    >
      <div className="space-y-6">
        <p className="text-xs sm:text-sm text-slate-600">
          Traxio integrates with the world’s leading commerce platforms, allowing businesses to automatically import incoming purchases, generate shipping labels in bulk, and send branded tracking notifications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {partners.map((p, i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#0047AB] transition-colors">
              <h3 className="font-bold text-slate-900 text-sm mb-1">{p.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </CompanyLayout>
  );
};
