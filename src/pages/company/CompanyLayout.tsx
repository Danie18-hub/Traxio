import React from 'react';
import { NavLink } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';

interface CompanyLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const CompanyLayout: React.FC<CompanyLayoutProps> = ({ title, subtitle, children }) => {
  const navItems = [
    { to: '/about', label: 'About Traxio' },
    { to: '/careers', label: 'Careers & Culture' },
    { to: '/newsroom', label: 'Newsroom & Press' },
    { to: '/blog', label: 'Logistics Blog' },
    { to: '/investors', label: 'Investor Relations' },
    { to: '/corporate-responsibility', label: 'Corporate Responsibility' },
    { to: '/developer', label: 'Developer API Portal' },
    { to: '/logistics', label: 'Contract Logistics' },
    { to: '/compatible-partners', label: 'Compatible Partners' },
    { to: '/rewards', label: 'Traxio Rewards' },
    { to: '/one-rate', label: 'Traxio OneRate' },
    { to: '/terms', label: 'Terms of Use' },
    { to: '/privacy', label: 'Privacy & Security' },
    { to: '/ad-choices', label: 'Ad Choices' },
    { to: '/cookie-settings', label: 'Cookie Settings' },
    { to: '/sitemap', label: 'Site Map' }
  ];

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand title={title} subtitle={subtitle} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-xs sticky top-24">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-3 py-1">
              Company & Legal
            </span>
            <nav className="mt-2 space-y-0.5 text-xs">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0047AB] text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Main Content Pane */}
          <main className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
