import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import { Check, X, Tag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const OpenAccountPage: React.FC = () => {
  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Open a Traxio Account"
        subtitle="Compare account tiers and unlock exclusive shipping discounts, batch label generation, and dedicated account managers."
        breadcrumbs={[{ label: 'Open Account' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Account Tiers & Features</h2>
            <span className="text-xs text-slate-500 font-medium">Free enrollment on all plans</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6 font-bold w-1/4">Features</th>
                  <th className="py-4 px-6 font-bold w-1/4">Personal Account</th>
                  <th className="py-4 px-6 font-bold w-1/4 text-[#0047AB]">Small Business</th>
                  <th className="py-4 px-6 font-bold w-1/4 text-[#FF6700]">Enterprise Logistics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">Air Express Discount</td>
                  <td className="py-3.5 px-6">Standard rates</td>
                  <td className="py-3.5 px-6 font-bold text-emerald-700">Up to 25% Off</td>
                  <td className="py-3.5 px-6 font-bold text-emerald-700">Custom Negotiated Tariffs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">Ground Discount</td>
                  <td className="py-3.5 px-6">Standard rates</td>
                  <td className="py-3.5 px-6 font-bold text-emerald-700">Up to 15% Off</td>
                  <td className="py-3.5 px-6 font-bold text-emerald-700">Volume Indexed (30%+)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">Free Packaging Supplies</td>
                  <td className="py-3.5 px-6">Available at stores</td>
                  <td className="py-3.5 px-6">Free Doorstep Delivery</td>
                  <td className="py-3.5 px-6">Free Doorstep & Custom Branded</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">Payment Terms</td>
                  <td className="py-3.5 px-6">Pay as you go (Card)</td>
                  <td className="py-3.5 px-6">Consolidated Monthly (Net 15)</td>
                  <td className="py-3.5 px-6">Consolidated Monthly (Net 30/60)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">Saved Address Capacity</td>
                  <td className="py-3.5 px-6">25 addresses</td>
                  <td className="py-3.5 px-6">500 addresses</td>
                  <td className="py-3.5 px-6">Unlimited corporate book</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">Multi-User Staff Seats</td>
                  <td className="py-3.5 px-6">1 user</td>
                  <td className="py-3.5 px-6">Up to 5 team members</td>
                  <td className="py-3.5 px-6">Unlimited with SSO & RBAC</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">E-Commerce & API Webhooks</td>
                  <td className="py-3.5 px-6 text-slate-400">—</td>
                  <td className="py-3.5 px-6">Shopify, WooCommerce</td>
                  <td className="py-3.5 px-6">Full REST API, Webhooks, EDI 210</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-900">Dedicated Account Exec</td>
                  <td className="py-3.5 px-6 text-slate-400">—</td>
                  <td className="py-3.5 px-6 text-slate-400">—</td>
                  <td className="py-3.5 px-6 font-bold text-[#0047AB]">Dedicated Regional Rep</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-5 px-6"></td>
                  <td className="py-5 px-6">
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg block text-center uppercase tracking-wider text-[11px]"
                    >
                      Enroll Personal
                    </Link>
                  </td>
                  <td className="py-5 px-6">
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold rounded-lg block text-center uppercase tracking-wider text-[11px] shadow-sm"
                    >
                      Enroll Business
                    </Link>
                  </td>
                  <td className="py-5 px-6">
                    <Link
                      to="/support/contact"
                      className="px-4 py-2 bg-[#0047AB] hover:bg-[#003882] text-white font-bold rounded-lg block text-center uppercase tracking-wider text-[11px]"
                    >
                      Contact Sales
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CTABand />
      </div>
    </div>
  );
};
