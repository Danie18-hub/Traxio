import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { useToast } from '@/src/components/ui/Toast';
import { Box, Package, Shield, Check, Send, Sparkles } from 'lucide-react';

interface SupplyItem {
  id: string;
  name: string;
  category: 'Boxes' | 'Envelopes' | 'Tapes & Cushioning' | 'Hazardous & Clinical';
  dimensions: string;
  maxWeight: string;
  description: string;
  cost: string;
}

export const PackagingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [requestItemName, setRequestItemName] = useState<string | null>(null);
  const [requestQty, setRequestQty] = useState('25');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestAddress, setRequestAddress] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const { success } = useToast();

  const supplies: SupplyItem[] = [
    {
      id: 'sup-1',
      name: 'Traxio Express Envelope',
      category: 'Envelopes',
      dimensions: '12.5" × 9.5"',
      maxWeight: 'Up to 0.5 kg (docs)',
      description: 'Heavy tear-resistant cardstock envelope with self-seal strip for contracts and urgent papers.',
      cost: 'Free for express account holders'
    },
    {
      id: 'sup-2',
      name: 'Traxio Box Small (OneRate)',
      category: 'Boxes',
      dimensions: '10.8" × 1.5" × 12.3"',
      maxWeight: 'Up to 5 kg',
      description: 'Corrugated pre-folded box ideal for small electronics, books, jewelry and spare components.',
      cost: 'Free for express account holders'
    },
    {
      id: 'sup-3',
      name: 'Traxio Box Medium (OneRate)',
      category: 'Boxes',
      dimensions: '11.5" × 2.3" × 13.2"',
      maxWeight: 'Up to 12 kg',
      description: 'Sturdy self-locking mailer box engineered to withstand high-speed sorting conveyor belts.',
      cost: 'Free for express account holders'
    },
    {
      id: 'sup-4',
      name: 'Traxio Box Large (OneRate)',
      category: 'Boxes',
      dimensions: '17.8" × 12.3" × 3.0"',
      maxWeight: 'Up to 25 kg',
      description: 'Reinforced dual-wall outer carton suitable for apparel sets, catalog distributions and hardware.',
      cost: 'Free for express account holders'
    },
    {
      id: 'sup-5',
      name: 'Heavy Duty Thermal Reinforced Tape',
      category: 'Tapes & Cushioning',
      dimensions: '2" × 55 yards',
      maxWeight: 'N/A',
      description: 'Water-resistant fiberglass filament adhesive tape meeting airline air cargo specifications.',
      cost: '$4.20 / roll'
    },
    {
      id: 'sup-6',
      name: 'Bio-Clinical Secondary Packaging Kit',
      category: 'Hazardous & Clinical',
      dimensions: '10" × 8" × 6"',
      maxWeight: 'Up to 3 kg',
      description: 'IATA compliant Category B biological substance packaging with 95 kPa leak-proof biohazard pouch.',
      cost: '$12.50 / kit'
    }
  ];

  const filtered = selectedCategory === 'All'
    ? supplies
    : supplies.filter((s) => s.category === selectedCategory);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      success(`Supply request for ${requestItemName} (${requestQty} units) dispatched!`);
      setRequestItemName(null);
      setRequestSubmitted(false);
      setRequestEmail('');
      setRequestAddress('');
    }, 1000);
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Packaging & Shipping Supplies"
        subtitle="Order free official Traxio OneRate boxes, secure document envelopes, and industrial packaging supplies."
        breadcrumbs={[
          { label: 'Shipping', href: '/shipping' },
          { label: 'Packaging & Supplies' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {['All', 'Boxes', 'Envelopes', 'Tapes & Cushioning', 'Hazardous & Clinical'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0047AB] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between hover:border-[#0047AB] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-[#0047AB]">{item.category}</span>
                  <span>{item.cost}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>
                <div className="text-xs bg-slate-50 p-2.5 rounded-lg space-y-1 text-slate-600 border border-slate-100">
                  <div><strong>Dimensions:</strong> {item.dimensions}</div>
                  <div><strong>Capacity:</strong> {item.maxWeight}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRequestItemName(item.name)}
                  className="w-full py-2 px-4 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  Request supplies
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart-less Request Supplies Modal */}
      {requestItemName && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Request Official Supplies</h3>
              <button
                type="button"
                onClick={() => setRequestItemName(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Selected item: <strong className="text-slate-900">{requestItemName}</strong>. Supplies are delivered to your shipping address within 2 business days.
            </p>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity Requested (Packs)</label>
                <select
                  value={requestQty}
                  onChange={(e) => setRequestQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="10">10 units</option>
                  <option value="25">25 units (Standard pack)</option>
                  <option value="50">50 units (Commercial bundle)</option>
                  <option value="100">100 units (Bulk warehouse pack)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Contact Email</label>
                <input
                  type="email"
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  placeholder="shipper@company.com"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address</label>
                <input
                  type="text"
                  value={requestAddress}
                  onChange={(e) => setRequestAddress(e.target.value)}
                  placeholder="Full office or warehouse street address"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRequestItemName(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requestSubmitted}
                  className="px-5 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                >
                  {requestSubmitted ? 'Submitting...' : 'Submit Supply Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
