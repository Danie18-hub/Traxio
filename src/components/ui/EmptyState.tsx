import React from 'react';
import { LucideIcon, PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageX,
  title,
  description,
  actionText,
  actionHref,
  onActionClick
}) => {
  return (
    <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 bg-white shadow-xs">
      <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
        <Icon className="w-7 h-7 text-slate-500" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 max-w-md mx-auto">{description}</p>
      {(actionText && (actionHref || onActionClick)) && (
        <div className="mt-5">
          {actionHref ? (
            <Link
              to={actionHref}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0047AB] hover:bg-[#003882] text-white font-semibold text-sm transition-colors shadow-xs"
            >
              {actionText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0047AB] hover:bg-[#003882] text-white font-semibold text-sm transition-colors shadow-xs"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
