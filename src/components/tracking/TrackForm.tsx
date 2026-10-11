import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, AlertCircle, Copy } from 'lucide-react';

interface TrackFormProps {
  initialValue?: string;
  variant?: 'hero' | 'compact' | 'header';
  onTrackSubmitted?: () => void;
}

export const TrackForm: React.FC<TrackFormProps> = ({
  initialValue = '',
  variant = 'hero',
  onTrackSubmitted
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = value
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (cleaned.length === 0) {
      setError('Please enter at least one tracking number.');
      return;
    }

    if (cleaned.length > 30) {
      setError('You can track up to 30 packages at once. Please remove excess numbers.');
      return;
    }

    setError(null);
    const joinedParam = encodeURIComponent(cleaned.join(','));
    if (onTrackSubmitted) onTrackSubmitted();
    navigate(`/track/${joinedParam}`);
  };

  const handleQuickFill = (trk: string) => {
    setValue(trk);
    setError(null);
  };

  if (variant === 'header') {
    return (
      <form onSubmit={handleTrack} className="w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Tracking number(s)..."
            aria-label="Tracking numbers"
            className="w-full bg-slate-100 text-slate-900 placeholder:text-slate-500 text-xs sm:text-sm pl-3 pr-20 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3 bg-[#FF6700] hover:bg-[#E55B00] text-white text-xs font-bold rounded-md flex items-center gap-1 transition-colors uppercase tracking-wider"
          >
            Track
          </button>
        </div>
        {error && <p className="text-[11px] text-red-600 mt-1 font-medium">{error}</p>}
      </form>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleTrack} className="w-full max-w-xl">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter tracking number (e.g. TRX1000000001)"
              aria-label="Tracking number"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB] shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <span>TRACK</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-600 mt-2 font-medium" role="alert">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </p>
        )}
      </form>
    );
  }

  // Hero variant (Default)
  return (
    <form onSubmit={handleTrack} className="w-full">
      <div className="space-y-3">
        <label htmlFor="hero-tracking-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Enter up to 30 tracking numbers (separated by commas or new lines)
        </label>
        <div className="relative">
          <textarea
            id="hero-tracking-input"
            rows={3}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. TRX1000000001, TRX1000000002"
            aria-describedby={error ? 'hero-tracking-error' : undefined}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB] shadow-xs resize-none placeholder:text-slate-400 font-mono"
          />
        </div>

        {error && (
          <div id="hero-tracking-error" className="flex items-center gap-1.5 text-xs text-red-600 font-medium" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-500">Sample numbers:</span>
            <button
              type="button"
              onClick={() => handleQuickFill('TRX1000000001')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors border border-slate-200"
              title="Delivered package"
            >
              TRX1000000001
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('TRX1000000002')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors border border-slate-200"
              title="In Transit package"
            >
              TRX1000000002
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('TRX1000000003')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors border border-slate-200"
              title="Out for Delivery"
            >
              TRX1000000003
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('TRX1000000004')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors border border-slate-200"
              title="Delayed package"
            >
              TRX1000000004
            </button>
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-extrabold text-base rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 uppercase tracking-wider shrink-0"
          >
            <span>TRACK</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
          <span>Need phone support? <a href="tel:18005558729" className="text-[#0047AB] font-semibold hover:underline">1-800-555-TRAX (8729)</a></span>
          <a href="/tracking/advanced" className="text-[#0047AB] hover:underline font-medium">Advanced Tracking Options &rarr;</a>
        </div>
      </div>
    </form>
  );
};
