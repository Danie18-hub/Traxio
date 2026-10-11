import React from 'react';
import { CompanyLayout } from './CompanyLayout';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

export const NewsroomPage: React.FC = () => {
  const news = [
    {
      date: 'October 2, 2026',
      tag: 'Fleet Modernization',
      title: 'Traxio Commissions 450 New Heavy-Duty Commercial Electric Delivery Vans',
      snippet: 'Expansion accelerates corporate sustainability roadmap toward 100% net-zero carbon last-mile logistics by 2035 across 30 primary metropolitan areas.'
    },
    {
      date: 'September 18, 2026',
      tag: 'Network Expansion',
      title: 'Traxio Opens Next-Generation Automated Sorting Hub at Dallas/Fort Worth',
      snippet: 'Facility features optical computer vision package sortation capable of routing 120,000 parcels per hour to domestic and international aircraft bays.'
    },
    {
      date: 'August 14, 2026',
      tag: 'Global Trade',
      title: 'Traxio Launches Pre-Cleared Electronic Customs Gateway for Transatlantic Trade',
      snippet: 'Integration with EU and UK customs declarations reduces cross-border port dwell times by an average of 4.2 hours per flight manifest.'
    }
  ];

  return (
    <CompanyLayout
      title="Traxio Newsroom & Press"
      subtitle="Official corporate announcements, network expansion milestones, and executive briefings."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {news.map((item, i) => (
            <article key={i} className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-[#0047AB] transition-colors space-y-2">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-mono">{item.date}</span>
                <span>•</span>
                <span className="font-bold text-[#0047AB] uppercase tracking-wider">{item.tag}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.snippet}</p>
            </article>
          ))}
        </div>
      </div>
    </CompanyLayout>
  );
};
