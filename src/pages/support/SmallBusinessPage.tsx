import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import { Briefcase, TrendingUp, Tag, Truck, Globe2, ArrowRight } from 'lucide-react';

export const SmallBusinessPage: React.FC = () => {
  const articles = [
    {
      title: '5 Ways E-Commerce Brands Cut Packaging Costs Without Sacrificing Protection',
      cat: 'Packaging & Fulfillment',
      readTime: '4 min read',
      snippet: 'Learn how standardizing box dimensions to fit conveyor parcel thresholds avoids volumetric weight surcharges.'
    },
    {
      title: 'How to Navigate European Union Customs ICS2 Requirements Seamlessly',
      cat: 'International Growth',
      readTime: '6 min read',
      snippet: 'A step-by-step primer on submitting electronic commercial invoices and 6-digit HS codes before shipment departure.'
    },
    {
      title: 'Optimizing Ground Transit Zones: Reaching 85% of US Customers in 2 Days',
      cat: 'Logistics Optimization',
      readTime: '5 min read',
      snippet: 'Why regional warehousing hubs and zone-skipping ground transport reduce parcel expenses compared to air slots.'
    }
  ];

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Small Business Shipping Center"
        subtitle="Exclusive commercial discounts, automated e-commerce integrations, and logistical guides to grow your brand."
        breadcrumbs={[{ label: 'Small Business' }]}
        action={
          <Link
            to="/open-account"
            className="px-5 py-2.5 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider shadow-md"
          >
            Open Business Account
          </Link>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Business Benefits Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Tag className="w-8 h-8 text-[#FF6700] mb-3" />
            <h3 className="font-bold text-slate-900 text-base mb-1">Up to 25% Preferred Rates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              New business accounts receive an automatic 25% discount on eligible air express services for the first 10 shipments.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Truck className="w-8 h-8 text-[#0047AB] mb-3" />
            <h3 className="font-bold text-slate-900 text-base mb-1">Free Supply Box Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Order complimentary express envelopes, standardized OneRate cartons, and shipping tape delivered directly to your door.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <TrendingUp className="w-8 h-8 text-[#3DDC97] mb-3" />
            <h3 className="font-bold text-slate-900 text-base mb-1">Monthly Billing Statements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidate daily shipments into a single invoice with flexible 30-day corporate payment terms.
            </p>
          </div>
        </div>

        {/* Resource Articles Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Logistics & Scaling Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-[#0047AB]">{art.cat}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2">{art.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{art.snippet}</p>
                </div>
                <Link to="/blog" className="mt-4 text-xs font-bold text-[#0047AB] hover:underline flex items-center gap-1">
                  <span>Read article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CTABand />
      </div>
    </div>
  );
};
