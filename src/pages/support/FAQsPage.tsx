import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { FAQAccordion } from '@/src/components/ui/FAQAccordion';
import { Search, HelpCircle } from 'lucide-react';

export const FAQsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState('All');

  const allFaqs = [
    {
      category: 'Tracking',
      question: 'What should I do if my tracking number shows no updates for 24 hours?',
      answer: 'Standard ground shipments between regional cross-dock terminals may travel by long-haul highway linehaul for 24-48 hours without intermediate scan events. A new scan will appear automatically as soon as the linehaul trailer arrives at the destination sorting facility.'
    },
    {
      category: 'Tracking',
      question: 'How do I track multiple packages simultaneously?',
      answer: 'You can paste up to 30 tracking numbers separated by commas or new lines into our tracking form on the homepage or Tracking Results page. Each parcel milestone status will appear in an individualized results card.'
    },
    {
      category: 'Delivery',
      question: 'Can I request delivery without a signature?',
      answer: 'If the sender has not mandated a Direct Physical Signature, you can authorize a Contactless Porch Release through Traxio Delivery Manager. Our driver will document door placement with a high-resolution time-stamped photograph.'
    },
    {
      category: 'Delivery',
      question: 'How long will Traxio hold my package at a local Express Center?',
      answer: 'Packages held under our Hold at Location (HAL) service are kept in our secure facility for up to 14 business days. Packages not collected after 14 days are systematically returned to the shipper.'
    },
    {
      category: 'Shipping & Rates',
      question: 'What is the maximum weight and dimension for standard parcel shipping?',
      answer: 'Standard Traxio courier packages may weigh up to 70 kg (154 lbs) and measure up to 108 inches in length, or 165 inches in length plus girth. Any shipments exceeding these thresholds must be routed via Traxio Freight.'
    },
    {
      category: 'Shipping & Rates',
      question: 'Are there discounts available for regular or small business shippers?',
      answer: 'Yes! Opening a free Traxio Business account unlocks immediate discounts of up to 25% on express air and ground tariffs, complimentary supply pack deliveries, and automated consolidated monthly invoicing.'
    },
    {
      category: 'Claims & Billing',
      question: 'What is the time window to file a damage or delay claim?',
      answer: 'Claims for damaged contents or missing pieces must be submitted within 21 calendar days of the recorded delivery date. Money-Back Guarantee delay claims on overnight guaranteed services must be filed within 15 calendar days.'
    },
    {
      category: 'Claims & Billing',
      question: 'How can I view and pay my monthly courier invoices?',
      answer: 'Account administrators can log into the Traxio Customer Portal under Account > Billing to inspect PDF invoices, itemize fuel surcharges, and settle balances instantly via corporate credit card or ACH transfer.'
    }
  ];

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Frequently Asked Questions"
        subtitle="Detailed answers regarding tracking scans, shipping rules, customs declarations, and billing."
        breadcrumbs={[
          { label: 'Support', href: '/support' },
          { label: 'FAQs' }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Search Bar & Category Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQ keywords (e.g. signature, hold, weight, refund)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {['All', 'Tracking', 'Delivery', 'Shipping & Rates', 'Claims & Billing'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full border font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#0047AB] text-white border-[#0047AB]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Results */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">
            Showing {filteredFaqs.length} Question{filteredFaqs.length === 1 ? '' : 's'}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-sm text-slate-500">
              No matching questions found for "{searchTerm}". Try a different keyword or contact our support team.
            </div>
          ) : (
            <FAQAccordion items={filteredFaqs} allowMultiple={false} />
          )}
        </div>
      </div>
    </div>
  );
};
