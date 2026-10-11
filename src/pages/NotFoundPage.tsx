import React from 'react';
import { Link } from 'react-router-dom';
import { PackageX, Home, Search, ArrowRight } from 'lucide-react';
import { TrackForm } from '@/src/components/tracking/TrackForm';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center max-w-xl mx-auto">
      <div className="w-20 h-20 rounded-full bg-blue-50 text-[#0047AB] flex items-center justify-center mb-6 shadow-xs">
        <PackageX className="w-10 h-10 text-[#0047AB]" />
      </div>

      <h1 className="text-4xl font-black text-slate-900 tracking-tight">404 - Page Not Found</h1>
      <p className="mt-3 text-slate-600 text-sm leading-relaxed">
        The page you requested could not be located in the Traxio courier directory. It may have been moved, renamed, or you may be searching for an active parcel tracking number.
      </p>

      {/* Quick Track Input */}
      <div className="mt-8 w-full max-w-md bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Looking for a package?
        </h2>
        <TrackForm variant="compact" />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/support"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
        >
          <span>Customer Support Hub</span>
        </Link>
      </div>
    </div>
  );
};
