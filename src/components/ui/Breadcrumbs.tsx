import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  variant?: 'light' | 'dark';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, variant = 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link
            to="/"
            className={`inline-flex items-center gap-1 transition-colors ${
              isLight ? 'text-blue-200 hover:text-white' : 'text-slate-500 hover:text-[#0047AB]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-blue-300' : 'text-slate-400'}`}
                aria-hidden="true"
              />
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={`transition-colors font-medium ${
                    isLight ? 'text-blue-200 hover:text-white' : 'text-slate-600 hover:text-[#0047AB]'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-semibold ${
                    isLight ? 'text-white' : 'text-slate-900'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
