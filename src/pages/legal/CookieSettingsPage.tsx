import React, { useState, useEffect } from 'react';
import { CompanyLayout } from '../company/CompanyLayout';
import { useToast } from '@/src/components/ui/Toast';
import { ShieldCheck, Check } from 'lucide-react';

export const CookieSettingsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const { success } = useToast();

  const handleSave = () => {
    localStorage.setItem('traxio_cookie_consent', 'customized');
    success('Cookie privacy choices saved to your browser session.');
  };

  return (
    <CompanyLayout
      title="Cookie Settings & Consent Preferences"
      subtitle="Manage your granular tracking and data privacy preferences on Traxio websites and portals."
    >
      <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
        <p>
          Configure how cookies and local storage tokens are utilized on this device. Essential cookies are required to authenticate your account and ensure tracking requests function properly.
        </p>

        <div className="space-y-4">
          {/* Essential Category */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900 text-sm">Essential Functional Cookies</div>
              <p className="text-xs text-slate-500 mt-1">
                Required for customer sign-in sessions, load balancing, security firewalls, and real-time shipment search state.
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-200 px-2.5 py-1 rounded">
              Always Active
            </span>
          </div>

          {/* Analytics Category */}
          <label className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-4 cursor-pointer">
            <div>
              <div className="font-bold text-slate-900 text-sm">Analytics & Network Performance</div>
              <p className="text-xs text-slate-500 mt-1">
                Collects aggregated, anonymous route telemetry to identify slow API requests and improve map load times.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.value as any)}
              className="mt-1 rounded text-[#0047AB] w-4 h-4"
            />
          </label>

          {/* Marketing Category */}
          <label className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-4 cursor-pointer">
            <div>
              <div className="font-bold text-slate-900 text-sm">Personalized Commercial Advertising</div>
              <p className="text-xs text-slate-500 mt-1">
                Enables tailored volume discount banners and partner integration offers across external business networks.
              </p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.value as any)}
              className="mt-1 rounded text-[#0047AB] w-4 h-4"
            />
          </label>
        </div>

        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
          >
            Save Privacy Choices
          </button>
        </div>
      </div>
    </CompanyLayout>
  );
};
