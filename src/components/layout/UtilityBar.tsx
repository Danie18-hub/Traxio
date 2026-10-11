import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, User, Globe, FileText, Settings, BookUser, CreditCard, LogIn, ExternalLink } from 'lucide-react';

export const UtilityBar: React.FC = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#003685] text-white text-xs border-b border-blue-900/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left Announcement & Link */}
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="hidden md:inline text-blue-200">
            Open an account to save on shipping costs and unlock time-saving tools.
          </span>
          <Link
            to="/open-account"
            className="text-white font-semibold underline decoration-[#FF6700] underline-offset-2 hover:text-[#FF6700] transition-colors"
          >
            Open an account
          </Link>
        </div>

        {/* Right Tools: Language & User Dropdown */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Admin shortcut link for convenience */}
          <Link
            to="/admin"
            className="hidden sm:inline-flex items-center gap-1 text-blue-200 hover:text-white transition-colors"
            title="Logistics Staff Portal"
          >
            <span>Staff Portal</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-blue-100 hover:text-white py-1 px-1.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-white"
              aria-expanded={langOpen}
              aria-haspopup="true"
            >
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-blue-300" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white text-slate-800 rounded-md shadow-lg border border-slate-200 py-1 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang('English');
                    setLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs flex items-center justify-between ${
                    currentLang === 'English' ? 'font-bold text-[#0047AB]' : ''
                  }`}
                >
                  English (US)
                  {currentLang === 'English' && <span className="w-1.5 h-1.5 rounded-full bg-[#0047AB]" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang('Français');
                    setLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs flex items-center justify-between ${
                    currentLang === 'Français' ? 'font-bold text-[#0047AB]' : ''
                  }`}
                >
                  Français (FR)
                  {currentLang === 'Français' && <span className="w-1.5 h-1.5 rounded-full bg-[#0047AB]" />}
                </button>
              </div>
            )}
          </div>

          {/* Sign up / Log in Dropdown */}
          <div className="relative" ref={userRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 text-white font-medium bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-white"
              aria-expanded={userDropdownOpen}
              aria-haspopup="true"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign up / Log in</span>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-1.5 z-50 divide-y divide-slate-100">
                <div className="p-2 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-center bg-[#0047AB] hover:bg-[#003882] text-white py-1.5 px-3 rounded font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/signup');
                    }}
                    className="w-full text-center text-slate-700 hover:text-[#0047AB] py-1 text-xs font-medium"
                  >
                    New user? Sign up here
                  </button>
                </div>

                <div className="py-1">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    My Account Services
                  </div>
                  <Link
                    to="/account/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0047AB] transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My profile</span>
                  </Link>
                  <Link
                    to="/account/email-preferences"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0047AB] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email preferences</span>
                  </Link>
                  <Link
                    to="/account/address-book"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0047AB] transition-colors"
                  >
                    <BookUser className="w-3.5 h-3.5 text-slate-400" />
                    <span>Address book</span>
                  </Link>
                  <Link
                    to="/account/billing"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0047AB] transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <span>View & pay bill</span>
                  </Link>
                  <Link
                    to="/account/shipments"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0047AB] transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Reporting & Shipments</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
