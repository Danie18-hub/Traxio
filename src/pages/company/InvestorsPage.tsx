import React from 'react';
import { CompanyLayout } from './CompanyLayout';
import { FileText, TrendingUp, Download, ShieldCheck } from 'lucide-react';

export const InvestorsPage: React.FC = () => {
  return (
    <CompanyLayout
      title="Investor Relations & Corporate Governance"
      subtitle="Financial statements, earnings presentations, capital allocation, and SEC regulatory filings."
    >
      <div className="space-y-8 text-sm text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Financial Performance & Overview</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Traxio delivers sustained value to shareholders through network density, automated aircraft dispatch efficiency, and resilient commercial courier contracts across North America and Europe.
          </p>
        </div>

        {/* Quarterly Financial Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold text-slate-500 uppercase">Q3 2026 Operating Revenue</span>
            <div className="text-2xl font-black text-[#0047AB] mt-1">$4.82 Billion</div>
            <span className="text-[11px] text-emerald-600 font-semibold">+8.4% YoY</span>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold text-slate-500 uppercase">Operating Margin</span>
            <div className="text-2xl font-black text-slate-900 mt-1">14.2%</div>
            <span className="text-[11px] text-slate-400">Expanded 110 bps</span>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold text-slate-500 uppercase">Daily Package Volume</span>
            <div className="text-2xl font-black text-[#FF6700] mt-1">4.6M Parcels</div>
            <span className="text-[11px] text-slate-400">Global integrated network</span>
          </div>
        </div>

        {/* Quarterly Earnings Downloads */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3">Quarterly Filings & Investor Reports</h3>
          <div className="space-y-2 text-xs">
            {[
              { title: 'Q3 2026 Form 10-Q Quarterly Report', size: '2.4 MB PDF' },
              { title: 'Q3 2026 Earnings Presentation & Teleconference Slides', size: '5.1 MB PDF' },
              { title: 'Q2 2026 Form 10-Q Quarterly Report', size: '2.3 MB PDF' },
              { title: '2025 Annual Report & Form 10-K Filing', size: '8.8 MB PDF' }
            ].map((r, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between hover:border-[#0047AB] transition-colors">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <FileText className="w-4 h-4 text-[#0047AB]" />
                  <span>{r.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-[#0047AB] font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{r.size}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};
