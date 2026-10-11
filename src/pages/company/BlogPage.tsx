import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyLayout } from './CompanyLayout';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      slug: 'optimizing-holiday-cross-dock-logistics',
      title: 'Optimizing Cross-Dock Logistics for Q4 Peak Shipping Volumes',
      date: 'October 5, 2026',
      author: 'David Vance, VP Network Operations',
      category: 'Operations',
      excerpt: 'How multi-tier pre-sorting and automated pallet staging mitigate warehouse bottlenecks during seasonal surges.'
    },
    {
      slug: 'demystifying-harmonized-system-tariff-codes',
      title: 'Demystifying Harmonized System (HS) Tariff Codes for Global E-Commerce',
      date: 'September 28, 2026',
      author: 'Claire Dupont, Customs Compliance Lead',
      category: 'International',
      excerpt: 'A practical breakdown of 6-digit classification rules and how proper documentation prevents costly customs hold flags.'
    },
    {
      slug: 'the-science-of-cold-chain-pharmaceutical-transport',
      title: 'The Science of Cold-Chain Pharmaceutical Parcel Transportation',
      date: 'September 12, 2026',
      author: 'Dr. Michael Chen, Healthcare Logistics',
      category: 'Specialized Cargo',
      excerpt: 'Active dry-ice replenishment and continuous thermal telemetry in certified medical air shipments.'
    }
  ];

  return (
    <CompanyLayout
      title="Traxio Logistics & Shipping Blog"
      subtitle="Industry insights, supply chain engineering analyses, and practical guides for shippers."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#0047AB] transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#0047AB] uppercase tracking-wider block mb-1">
                  {post.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2">
                  <Link to={`/blog/${post.slug}`} className="hover:text-[#0047AB]">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{post.date}</span>
                <Link to={`/blog/${post.slug}`} className="font-bold text-[#0047AB] hover:underline flex items-center gap-0.5">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CompanyLayout>
  );
};
