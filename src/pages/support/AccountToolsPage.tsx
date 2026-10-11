import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { Settings, Users, BookUser, FileText, Bell, Shield, ArrowRight } from 'lucide-react';

export const AccountToolsPage: React.FC = () => {
  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Account Management Tools"
        subtitle="Manage shipping preferences, staff permissions, saved address books, and notification automations."
        breadcrumbs={[
          { label: 'Support', href: '/support' },
          { label: 'Account Tools' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3">
                <BookUser className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Centralized Address Book</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Save up to 5,000 corporate destination addresses. Auto-complete recipient contact details during shipment creation.
              </p>
            </div>
            <Link to="/account/address-book" className="mt-4 text-xs font-bold text-[#0047AB] hover:underline flex items-center gap-1">
              <span>Manage address book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-3">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Notification Preferences</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configure automated SMS and email alerts for dispatch, delays, out-for-delivery, and proof-of-delivery milestones.
              </p>
            </div>
            <Link to="/account/email-preferences" className="mt-4 text-xs font-bold text-[#0047AB] hover:underline flex items-center gap-1">
              <span>Configure notifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Customs & Shipping Profiles</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-fill Harmonized Tariff Codes, default declared values, and signature preferences across your company team.
              </p>
            </div>
            <Link to="/account/profile" className="mt-4 text-xs font-bold text-[#0047AB] hover:underline flex items-center gap-1">
              <span>View company profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
