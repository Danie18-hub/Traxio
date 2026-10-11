import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

interface PageHeaderBandProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: React.ReactNode;
}

export const PageHeaderBand: React.FC<PageHeaderBandProps> = ({
  title,
  subtitle,
  badge,
  breadcrumbs,
  action
}) => {
  return (
    <div className="bg-[#0047AB] text-white pt-7 pb-10 px-4 sm:px-6 lg:px-8 border-b border-blue-900 shadow-inner">
      <div className="max-w-7xl mx-auto">
        {breadcrumbs && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} variant="light" />
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {badge && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FF6700] text-white mb-2 uppercase tracking-wider">
                {badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-blue-100 text-sm sm:text-base max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
};
