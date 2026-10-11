import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';

export const AlertStrip: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="bg-amber-500 text-slate-950 px-4 py-2 text-xs sm:text-sm font-medium border-b border-amber-600 relative z-30"
      role="region"
      aria-label="Service advisory notice"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <AlertTriangle className="w-4 h-4 shrink-0 text-slate-950" />
          <span className="truncate">
            <strong>Service Advisory:</strong> Severe weather along Central Plains transport corridors may affect ground delivery times in NE, IA & MN.
          </span>
          <Link
            to="/service-alerts"
            className="shrink-0 underline font-bold hover:text-white transition-colors flex items-center gap-0.5 ml-1"
          >
            <span>Read full alert</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-slate-900/80 hover:text-slate-950 p-1 rounded hover:bg-amber-600/30 transition-colors shrink-0"
          aria-label="Dismiss service advisory"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
