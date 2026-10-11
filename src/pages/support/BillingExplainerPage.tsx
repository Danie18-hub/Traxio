import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { getInvoices, payInvoice } from '@/src/lib/api';
import { Invoice } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { formatCurrency } from '@/src/lib/utils';
import { CreditCard, FileText, CheckCircle2, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const BillingExplainerPage: React.FC = () => {
  const [invoiceLookupNum, setInvoiceLookupNum] = useState('INV-2026-1002');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const { success, error: toastError } = useToast();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const all = await getInvoices();
      const found = all.filter((i) => i.invoiceNumber.toLowerCase().includes(invoiceLookupNum.toLowerCase()));
      setInvoices(found);
      if (found.length === 0) {
        toastError('No invoice matching that reference.');
      }
    } catch {
      toastError('Error searching invoice records.');
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (id: string) => {
    try {
      await payInvoice(id);
      success('Invoice balance settled via card on file!');
      const updated = await getInvoices();
      setInvoices(updated.filter((i) => i.invoiceNumber.toLowerCase().includes(invoiceLookupNum.toLowerCase())));
    } catch {
      toastError('Payment processing error.');
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Billing & Invoicing"
        subtitle="Manage billing terms, download PDF statements, and understand weekly fuel surcharge calculations."
        breadcrumbs={[
          { label: 'Support', href: '/support' },
          { label: 'Billing' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Invoice Lookup Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2">
            Quick Invoice Lookup & Payment
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Enter your invoice number (e.g. INV-2026-1002) to inspect charges or settle balances.
          </p>

          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="text"
              value={invoiceLookupNum}
              onChange={(e) => setInvoiceLookupNum(e.target.value)}
              placeholder="e.g. INV-2026-1002"
              required
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 font-mono text-xs sm:text-sm"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
            >
              Search Invoice
            </button>
          </form>

          {invoices.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-slate-900 text-sm">{inv.invoiceNumber}</span>
                    <div className="text-slate-500 mt-0.5">
                      Date: {inv.date} • Due: {inv.dueDate}
                    </div>
                    <div className="text-slate-500">
                      Tracking references: {inv.trackingNumbers.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-base font-black font-mono text-slate-900">{formatCurrency(inv.amount)}</div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {inv.status}
                      </span>
                    </div>

                    {inv.status !== 'Paid' && (
                      <button
                        type="button"
                        onClick={() => handlePay(inv.id)}
                        className="px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Explainer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Automated Monthly Consolidation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidate hundreds of individual shipments into a single itemized billing statement generated on the 1st of every month with net-30 terms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Weekly Indexed Fuel Surcharge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fuel adjustments fluctuate based on official weekly Energy Information Administration diesel and jet fuel averages to ensure index parity.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Electronic Data Interchange (EDI)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transmit invoices directly into SAP, Oracle NetSuite, and QuickBooks using EDI 210 Motor Carrier Freight Invoice format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
