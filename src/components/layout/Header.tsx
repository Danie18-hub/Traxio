import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Search,
  Menu,
  X,
  Package,
  Truck,
  Box,
  MapPin,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  Clock,
  Sparkles
} from 'lucide-react';
import { TrackForm } from '../tracking/TrackForm';

export const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim();
    setSearchOpen(false);
    setSearchQuery('');
    // If looks like tracking number, track it
    if (/^TRX/i.test(q) || /^\d{8,}/.test(q)) {
      navigate(`/track/${encodeURIComponent(q)}`);
    } else {
      navigate(`/support/faqs?q=${encodeURIComponent(q)}`);
    }
  };

  const closeMenu = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group">
              {/* Traxio Wordmark & Icon */}
              <div className="w-10 h-10 rounded-lg bg-[#0047AB] flex items-center justify-center text-white shadow-sm group-hover:bg-[#003882] transition-colors">
                {/* Fast geometric icon */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L12 4L20 16H13V20H11V16H4Z" fill="#FF6700" opacity="0.9" />
                  <path d="M12 7L16 13H8L12 7Z" fill="white" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#0047AB] font-sans flex items-center">
                  TRAXIO
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FF6700] ml-0.5 mb-1" />
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-1">
                  Global Courier
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Mega-menus */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {/* 1. Shipping */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'shipping' ? null : 'shipping')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047AB] ${
                    activeMenu === 'shipping' ? 'text-[#0047AB] bg-blue-50/80' : 'text-slate-800 hover:text-[#0047AB] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeMenu === 'shipping'}
                >
                  <span>Shipping</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'shipping' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
                </button>

                {activeMenu === 'shipping' && (
                  <div className="absolute left-0 mt-2 w-[540px] bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-bold text-[#0047AB] uppercase tracking-wider mb-3">
                          Services & Tools
                        </div>
                        <ul className="space-y-2.5 text-sm">
                          <li>
                            <Link to="/shipping/create" onClick={closeMenu} className="font-semibold text-slate-900 hover:text-[#0047AB] flex items-center justify-between group">
                              <span>Create a Shipment</span>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6700]" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/rates" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Rates & Delivery Times
                            </Link>
                          </li>
                          <li>
                            <Link to="/shipping/pickups" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Schedule & Manage Pickups
                            </Link>
                          </li>
                          <li>
                            <Link to="/shipping/packaging" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Packaging & Supplies
                            </Link>
                          </li>
                          <li>
                            <Link to="/shipping" onClick={closeMenu} className="text-[#0047AB] font-semibold text-xs pt-2 block hover:underline">
                              All Shipping Services &rarr;
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="border-l border-slate-100 pl-6">
                        <div className="text-xs font-bold text-[#0047AB] uppercase tracking-wider mb-3">
                          Specialized Solutions
                        </div>
                        <ul className="space-y-2.5 text-sm">
                          <li>
                            <Link to="/shipping/international" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              International Shipping Guide
                            </Link>
                          </li>
                          <li>
                            <Link to="/shipping/freight" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Freight (LTL & Air Cargo)
                            </Link>
                          </li>
                          <li>
                            <Link to="/shipping/returns" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Manage a Return
                            </Link>
                          </li>
                          <li>
                            <Link to="/one-rate" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Traxio OneRate Flat Pricing
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Tracking */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'tracking' ? null : 'tracking')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047AB] ${
                    activeMenu === 'tracking' ? 'text-[#0047AB] bg-blue-50/80' : 'text-slate-800 hover:text-[#0047AB] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeMenu === 'tracking'}
                >
                  <span>Tracking</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'tracking' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
                </button>

                {activeMenu === 'tracking' && (
                  <div className="absolute left-0 mt-2 w-[460px] bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="mb-4">
                      <div className="text-xs font-bold text-[#0047AB] uppercase tracking-wider mb-2">
                        Quick Package Tracking
                      </div>
                      <TrackForm variant="header" onTrackSubmitted={closeMenu} />
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2 text-sm">
                      <Link to="/tracking/advanced" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] flex items-center justify-between py-1">
                        <span>Advanced Tracking & Reference Search</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </Link>
                      <Link to="/manage-delivery" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] flex items-center justify-between py-1">
                        <span>Manage Your Delivery (Hold, Redirect)</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </Link>
                      <Link to="/proof-of-delivery" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] flex items-center justify-between py-1">
                        <span>Proof of Delivery & Signature</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </Link>
                      <Link to="/tracking" onClick={closeMenu} className="text-[#0047AB] font-semibold text-xs pt-2 block hover:underline">
                        All Tracking Services &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Packaging & Supplies */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'packaging' ? null : 'packaging')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047AB] ${
                    activeMenu === 'packaging' ? 'text-[#0047AB] bg-blue-50/80' : 'text-slate-800 hover:text-[#0047AB] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeMenu === 'packaging'}
                >
                  <span>Packaging & Supplies</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'packaging' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
                </button>

                {activeMenu === 'packaging' && (
                  <div className="absolute left-0 mt-2 w-[340px] bg-white rounded-xl shadow-2xl border border-slate-200 p-5 z-50 animate-in fade-in slide-in-from-top-2">
                    <ul className="space-y-3 text-sm">
                      <li>
                        <Link to="/shipping/packaging" onClick={closeMenu} className="block font-semibold text-slate-900 hover:text-[#0047AB]">
                          Browse Packaging Supplies
                          <span className="block text-xs font-normal text-slate-500 mt-0.5">Order free express boxes, envelopes & tape</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/one-rate" onClick={closeMenu} className="block font-semibold text-slate-900 hover:text-[#0047AB]">
                          Traxio OneRate Packaging
                          <span className="block text-xs font-normal text-slate-500 mt-0.5">Simple predictable rates for any weight</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/small-business" onClick={closeMenu} className="block font-semibold text-slate-900 hover:text-[#0047AB]">
                          Business Supply Ordering
                          <span className="block text-xs font-normal text-slate-500 mt-0.5">Volume discounts for registered accounts</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 4. Locations */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'locations' ? null : 'locations')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047AB] ${
                    activeMenu === 'locations' ? 'text-[#0047AB] bg-blue-50/80' : 'text-slate-800 hover:text-[#0047AB] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeMenu === 'locations'}
                >
                  <span>Locations</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'locations' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
                </button>

                {activeMenu === 'locations' && (
                  <div className="absolute left-0 mt-2 w-[320px] bg-white rounded-xl shadow-2xl border border-slate-200 p-5 z-50 animate-in fade-in slide-in-from-top-2">
                    <ul className="space-y-3 text-sm">
                      <li>
                        <Link to="/locations" onClick={closeMenu} className="block font-semibold text-slate-900 hover:text-[#0047AB]">
                          Find a Location
                          <span className="block text-xs font-normal text-slate-500 mt-0.5">Interactive map and store hours</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/locations/drop-off" onClick={closeMenu} className="block font-semibold text-slate-900 hover:text-[#0047AB]">
                          Drop Off a Package
                          <span className="block text-xs font-normal text-slate-500 mt-0.5">Prepaid labels, QR codes & 24/7 drop boxes</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 5. Support */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === 'support' ? null : 'support')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0047AB] ${
                    activeMenu === 'support' ? 'text-[#0047AB] bg-blue-50/80' : 'text-slate-800 hover:text-[#0047AB] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeMenu === 'support'}
                >
                  <span>Support</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'support' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
                </button>

                {activeMenu === 'support' && (
                  <div className="absolute left-0 mt-2 w-[500px] bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-bold text-[#0047AB] uppercase tracking-wider mb-3">
                          Self-Service & Help
                        </div>
                        <ul className="space-y-2.5 text-sm">
                          <li>
                            <Link to="/support" onClick={closeMenu} className="font-semibold text-slate-900 hover:text-[#0047AB]">
                              Customer Support Hub
                            </Link>
                          </li>
                          <li>
                            <Link to="/support/faqs" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Frequently Asked Questions
                            </Link>
                          </li>
                          <li>
                            <Link to="/support/claims" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              File a Claim
                            </Link>
                          </li>
                          <li>
                            <Link to="/support/service-guide" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Service Guide & Limits
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="border-l border-slate-100 pl-6">
                        <div className="text-xs font-bold text-[#0047AB] uppercase tracking-wider mb-3">
                          Accounts & Resources
                        </div>
                        <ul className="space-y-2.5 text-sm">
                          <li>
                            <Link to="/small-business" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Small Business Center
                            </Link>
                          </li>
                          <li>
                            <Link to="/support/billing" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Billing & Invoicing
                            </Link>
                          </li>
                          <li>
                            <Link to="/support/account-tools" onClick={closeMenu} className="text-slate-700 hover:text-[#0047AB] block">
                              Account Management Tools
                            </Link>
                          </li>
                          <li>
                            <Link to="/support/contact" onClick={closeMenu} className="text-[#0047AB] font-semibold block hover:underline">
                              Contact Support Team &rarr;
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search site or enter tracking #..."
                    className="w-56 sm:w-72 bg-slate-100 text-xs sm:text-sm pl-3 pr-8 py-2 rounded-lg border border-[#0047AB] focus:outline-none focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 text-slate-400 hover:text-slate-600"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-slate-600 hover:text-[#0047AB] hover:bg-slate-50 rounded-lg transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick action button: Ship Now */}
            <Link
              to="/shipping/create"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white text-sm font-bold shadow-xs transition-transform active:scale-95 uppercase tracking-wider"
            >
              <span>Ship Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#0047AB] rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-8 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Quick Track Input in Mobile */}
          <div className="mb-4">
            <TrackForm variant="header" onTrackSubmitted={closeMenu} />
          </div>

          {/* Accordion Sections */}
          <div className="divide-y divide-slate-100">
            {/* Shipping Accordion */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'shipping' ? null : 'shipping')}
                className="w-full flex items-center justify-between py-2 text-left font-bold text-slate-900"
              >
                <span>Shipping</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'shipping' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
              </button>
              {mobileAccordion === 'shipping' && (
                <div className="pl-3 py-2 space-y-2 text-sm text-slate-600">
                  <Link to="/shipping/create" onClick={closeMenu} className="block py-1 font-semibold text-[#0047AB]">Create a Shipment</Link>
                  <Link to="/rates" onClick={closeMenu} className="block py-1">Rates & Delivery Times</Link>
                  <Link to="/shipping/pickups" onClick={closeMenu} className="block py-1">Schedule & Manage Pickups</Link>
                  <Link to="/shipping/packaging" onClick={closeMenu} className="block py-1">Packaging & Supplies</Link>
                  <Link to="/shipping/international" onClick={closeMenu} className="block py-1">International Shipping Guide</Link>
                  <Link to="/shipping/freight" onClick={closeMenu} className="block py-1">Freight</Link>
                  <Link to="/shipping/returns" onClick={closeMenu} className="block py-1">Manage a Return</Link>
                  <Link to="/shipping" onClick={closeMenu} className="block py-1 font-semibold text-[#0047AB]">All Shipping Services</Link>
                </div>
              )}
            </div>

            {/* Tracking Accordion */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'tracking' ? null : 'tracking')}
                className="w-full flex items-center justify-between py-2 text-left font-bold text-slate-900"
              >
                <span>Tracking</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'tracking' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
              </button>
              {mobileAccordion === 'tracking' && (
                <div className="pl-3 py-2 space-y-2 text-sm text-slate-600">
                  <Link to="/tracking/advanced" onClick={closeMenu} className="block py-1">Advanced Tracking</Link>
                  <Link to="/manage-delivery" onClick={closeMenu} className="block py-1">Manage Your Delivery</Link>
                  <Link to="/proof-of-delivery" onClick={closeMenu} className="block py-1">Proof of Delivery</Link>
                  <Link to="/tracking" onClick={closeMenu} className="block py-1 font-semibold text-[#0047AB]">All Tracking Services</Link>
                </div>
              )}
            </div>

            {/* Packaging Accordion */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'packaging' ? null : 'packaging')}
                className="w-full flex items-center justify-between py-2 text-left font-bold text-slate-900"
              >
                <span>Packaging & Supplies</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'packaging' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
              </button>
              {mobileAccordion === 'packaging' && (
                <div className="pl-3 py-2 space-y-2 text-sm text-slate-600">
                  <Link to="/shipping/packaging" onClick={closeMenu} className="block py-1">Browse Packaging</Link>
                  <Link to="/one-rate" onClick={closeMenu} className="block py-1">OneRate Flat Packaging</Link>
                  <Link to="/small-business" onClick={closeMenu} className="block py-1">Business Services</Link>
                </div>
              )}
            </div>

            {/* Locations Accordion */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'locations' ? null : 'locations')}
                className="w-full flex items-center justify-between py-2 text-left font-bold text-slate-900"
              >
                <span>Locations</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'locations' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
              </button>
              {mobileAccordion === 'locations' && (
                <div className="pl-3 py-2 space-y-2 text-sm text-slate-600">
                  <Link to="/locations" onClick={closeMenu} className="block py-1 font-semibold text-[#0047AB]">Find a Location</Link>
                  <Link to="/locations/drop-off" onClick={closeMenu} className="block py-1">Drop Off a Package</Link>
                </div>
              )}
            </div>

            {/* Support Accordion */}
            <div className="py-2">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'support' ? null : 'support')}
                className="w-full flex items-center justify-between py-2 text-left font-bold text-slate-900"
              >
                <span>Support</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'support' ? 'rotate-180 text-[#0047AB]' : 'text-slate-400'}`} />
              </button>
              {mobileAccordion === 'support' && (
                <div className="pl-3 py-2 space-y-2 text-sm text-slate-600">
                  <Link to="/support" onClick={closeMenu} className="block py-1">Customer Support</Link>
                  <Link to="/support/faqs" onClick={closeMenu} className="block py-1">FAQs</Link>
                  <Link to="/support/claims" onClick={closeMenu} className="block py-1">File a Claim</Link>
                  <Link to="/support/service-guide" onClick={closeMenu} className="block py-1">Service Guide</Link>
                  <Link to="/support/billing" onClick={closeMenu} className="block py-1">Billing & Invoicing</Link>
                  <Link to="/support/account-tools" onClick={closeMenu} className="block py-1">Account Management Tools</Link>
                  <Link to="/small-business" onClick={closeMenu} className="block py-1">Small Business Center</Link>
                  <Link to="/support/contact" onClick={closeMenu} className="block py-1 font-semibold text-[#0047AB]">Contact Us</Link>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Link
              to="/open-account"
              onClick={closeMenu}
              className="w-full py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white text-center font-bold rounded-lg block uppercase tracking-wider text-sm"
            >
              Open an Account
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-center font-semibold rounded-lg block text-sm"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
