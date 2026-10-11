import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { SERVICE_ALERTS_DATA } from '@/src/lib/mock-data';
import { AlertTriangle, Info, Clock, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ServiceAlertsPage: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState('All');

  const filtered = filterSeverity === 'All'
    ? SERVICE_ALERTS_DATA
    : SERVICE_ALERTS_DATA.filter((a) => a.severity === filterSeverity);

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Service Alerts & Operations Status"
        subtitle="Current transportation network weather advisories, international customs bulletins, and facility status."
        breadcrumbs={[
          { label: 'Tracking', href: '/tracking' },
          { label: 'Service Alerts' }
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Network Status Ribbon */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#3DDC97] animate-pulse" />
            <span className="text-sm font-bold text-slate-900">
              Traxio Global Air & Ground Network: <strong>Operational with Minor Weather Lag</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Filter:</span>
            {['All', 'Delay', 'Advisory', 'Information'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterSeverity(s)}
                className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                  filterSeverity === s
                    ? 'bg-[#0047AB] text-white border-[#0047AB]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filtered.map((alert) => {
            let badgeColor = 'bg-blue-100 text-[#0047AB] border-blue-200';
            if (alert.severity === 'Delay') {
              badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
            } else if (alert.severity === 'Advisory') {
              badgeColor = 'bg-orange-100 text-[#cc5200] border-orange-300';
            }

            return (
              <div
                key={alert.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
                      {alert.severity}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{alert.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono shrink-0">{alert.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {alert.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs">
                  <span className="text-slate-500 font-semibold">Affected Regions:</span>
                  {alert.regions.map((r, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
