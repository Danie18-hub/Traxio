import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import {
  HelpCircle,
  Search,
  FileText,
  Phone,
  MessageSquare,
  ShieldAlert,
  CreditCard,
  Briefcase,
  ArrowRight,
  Truck
} from 'lucide-react';

export const SupportHubPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/support/faqs?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Customer Support & Help Center"
        subtitle="Find answers, file claims, manage invoices, or get in touch with our 24/7 priority support team."
        breadcrumbs={[{ label: 'Support' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Support Search Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 max-w-3xl mx-auto text-center -mt-14 relative z-20">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            How can we assist your shipment today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Search our knowledge base for customs rules, tracking questions, delivery exceptions, or billing terms.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type your question (e.g. reschedule delivery, fuel surcharge, claim)..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
            >
              Search
            </button>
          </form>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/support/faqs"
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0047AB] hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore answers on tracking statuses, delivery signatures, pickup windows, and packaging.
            </p>
          </Link>

          <Link
            to="/support/claims"
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0047AB] hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">File a Claim</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit claims for damaged packages, lost contents, or delays on guaranteed overnight air services.
            </p>
          </Link>

          <Link
            to="/support/service-guide"
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0047AB] hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-4 group-hover:bg-[#3DDC97] group-hover:text-slate-900 transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Service Guide & Limits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              View official transit commitments, weight and dimensional limits, and carrier liabilities.
            </p>
          </Link>

          <Link
            to="/support/billing"
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0047AB] hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Billing & Invoicing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review weekly fuel surcharges, credit application procedures, and pay invoices online.
            </p>
          </Link>

          <Link
            to="/small-business"
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0047AB] hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-4 group-hover:bg-[#FF6700] group-hover:text-white transition-colors">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Small Business Center</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shipping tools, e-commerce integrations, volume discount guides, and packaging tutorials.
            </p>
          </Link>

          <Link
            to="/support/contact"
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0047AB] hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:bg-purple-700 group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Contact Customer Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak with a dedicated logistics specialist via ticket, phone hotline, or direct email.
            </p>
          </Link>
        </div>

        {/* Direct Phone Assistance Banner */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Need Immediate Shipment Assistance?</h3>
            <p className="text-xs text-slate-400 mt-1">Our dispatch team is available 24 hours a day, 7 days a week.</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:18005558729"
              className="px-6 py-3 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm uppercase tracking-wider shadow-md"
            >
              Call 1-800-555-TRAX (8729)
            </a>
            <Link
              to="/support/contact"
              className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700"
            >
              Open Support Ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
