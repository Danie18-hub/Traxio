import React, { useState, useEffect } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { AccountNav } from './AccountNav';
import { getInvoices, payInvoice } from '@/src/lib/api';
import { Invoice } from '@/src/lib/types';
import { formatCurrency } from '@/src/lib/utils';
import { useToast } from '@/src/components/ui/Toast';
import { CreditCard, FileText, CheckCircle2, DollarSign, Download } from 'lucide-react';

export const CustomerBillingPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoiceToPay, setSelectedInvoiceToPay] = useState<Invoice | null>(null);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const data = await getInvoices();
      setInvoices(data);
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async (id: string) => {
    try {
      await payInvoice(id);
      success('Payment processed successfully via credit card on file!');
      setSelectedInvoiceToPay(null);
      loadInvoices();
    } catch {
      toastError('Payment could not be processed.');
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Billing & Invoices"
        subtitle="Review account statements, itemized shipping charges, and settle open balances."
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          { label: 'Billing' }
        ]}
      />
      <AccountNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Billing Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Account Balance</span>
            <div className="text-2xl font-black text-slate-900 mt-1">$685.20</div>
            <span className="text-[11px] text-slate-400">Next payment cycle: Oct 28, 2026</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Default Payment Method</span>
            <div className="text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#0047AB]" />
              <span>Visa ending in 4242</span>
            </div>
            <span className="text-[11px] text-slate-400">Auto-pay active</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Billing Terms</span>
            <div className="text-base font-bold text-slate-900 mt-1">Commercial Net-30</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Credit limit $15,000</span>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 font-bold text-sm text-slate-800 flex items-center justify-between">
            <span>Corporate Billing Statements</span>
            <span className="text-xs text-slate-500 font-normal">All amounts in USD</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Invoice #</th>
                  <th className="py-3 px-4 font-semibold">Issue Date</th>
                  <th className="py-3 px-4 font-semibold">Due Date</th>
                  <th className="py-3 px-4 font-semibold">Shipments Included</th>
                  <th className="py-3 px-4 font-semibold">Total Amount</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0047AB]">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{inv.date}</td>
                    <td className="py-3.5 px-4 text-slate-600">{inv.dueDate}</td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {inv.trackingNumbers.length} packages ({inv.trackingNumbers.join(', ')})
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {formatCurrency(inv.amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-100 text-[#0c7048]'
                            : inv.status === 'Overdue'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="p-1 text-slate-500 hover:text-slate-800 inline-flex items-center"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      {inv.status !== 'Paid' && (
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceToPay(inv)}
                          className="px-3 py-1 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold rounded uppercase tracking-wider text-[11px]"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {selectedInvoiceToPay && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
              Pay Invoice {selectedInvoiceToPay.invoiceNumber}
            </h3>
            <p className="text-slate-600 mb-4">
              You are authorizing payment of{' '}
              <strong className="text-slate-900 text-sm font-mono">{formatCurrency(selectedInvoiceToPay.amount)}</strong> using
              your saved payment method: <strong>Visa ending in 4242</strong>.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedInvoiceToPay(null)}
                className="px-4 py-2 font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handlePayNow(selectedInvoiceToPay.id)}
                className="px-5 py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold rounded-lg uppercase tracking-wider shadow-xs"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
