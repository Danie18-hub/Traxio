import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Check } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('traxio_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('traxio_cookie_consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('traxio_cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-700 shadow-2xl p-4 sm:p-5"
      role="dialog"
      aria-labelledby="cookie-heading"
      aria-describedby="cookie-desc"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-[#FF6700] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300">
            <p id="cookie-heading" className="font-bold text-white mb-0.5">
              We respect your privacy
            </p>
            <p id="cookie-desc" className="leading-relaxed">
              Traxio uses essential cookies to ensure our tracking platform functions reliably, and optional analytics to improve freight routing insights. Review our{' '}
              <Link to="/privacy" className="underline text-blue-300 hover:text-white">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/cookie-settings" className="underline text-blue-300 hover:text-white">
                Cookie Preferences
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
          >
            Essential Only
          </button>
          <Link
            to="/cookie-settings"
            onClick={() => setShow(false)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
          >
            Customize
          </Link>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 text-xs font-bold text-white bg-[#FF6700] hover:bg-[#E55B00] rounded-lg transition-colors shadow-xs"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
