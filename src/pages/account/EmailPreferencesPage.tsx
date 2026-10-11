import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { AccountNav } from './AccountNav';
import { useToast } from '@/src/components/ui/Toast';
import { Bell, Mail, Smartphone, ShieldCheck } from 'lucide-react';

export const EmailPreferencesPage: React.FC = () => {
  const [outForDelivery, setOutForDelivery] = useState(true);
  const [deliveredConfirmation, setDeliveredConfirmation] = useState(true);
  const [delayAlerts, setDelayAlerts] = useState(true);
  const [invoiceReady, setInvoiceReady] = useState(true);
  const [marketingDeals, setMarketingDeals] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const { success } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Notification delivery preferences updated!');
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Notification & Email Preferences"
        subtitle="Control which shipping event triggers automated email notices and SMS mobile push messages."
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          { label: 'Preferences' }
        ]}
      />
      <AccountNav />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
              Shipment Tracking Notifications
            </h3>

            <div className="space-y-4">
              <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-slate-900">Out for Delivery Alerts</div>
                  <div className="text-[11px] text-slate-500">Notice when package is loaded onto the local delivery van.</div>
                </div>
                <input
                  type="checkbox"
                  checked={outForDelivery}
                  onChange={(e) => setOutForDelivery(e.target.checked)}
                  className="rounded text-[#0047AB] w-4 h-4 mt-0.5"
                />
              </label>

              <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-slate-900">Delivery Confirmation & POD Photo</div>
                  <div className="text-[11px] text-slate-500">Notice as soon as delivery is completed with digital receipt attachment.</div>
                </div>
                <input
                  type="checkbox"
                  checked={deliveredConfirmation}
                  onChange={(e) => setDeliveredConfirmation(e.target.checked)}
                  className="rounded text-[#0047AB] w-4 h-4 mt-0.5"
                />
              </label>

              <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-slate-900">Weather & Transit Delay Exceptions</div>
                  <div className="text-[11px] text-slate-500">Early notification of mechanical holds or blizzard road reroutes.</div>
                </div>
                <input
                  type="checkbox"
                  checked={delayAlerts}
                  onChange={(e) => setDelayAlerts(e.target.checked)}
                  className="rounded text-[#0047AB] w-4 h-4 mt-0.5"
                />
              </label>

              <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-slate-900">Monthly Billing & Statement Notices</div>
                  <div className="text-[11px] text-slate-500">PDF invoice publication and payment acknowledgment notices.</div>
                </div>
                <input
                  type="checkbox"
                  checked={invoiceReady}
                  onChange={(e) => setInvoiceReady(e.target.checked)}
                  className="rounded text-[#0047AB] w-4 h-4 mt-0.5"
                />
              </label>

              <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-slate-900">SMS Mobile Alerts (+1 212-555-3490)</div>
                  <div className="text-[11px] text-slate-500">Critical real-time dispatch alerts to mobile cellular number.</div>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="rounded text-[#0047AB] w-4 h-4 mt-0.5"
                />
              </label>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
