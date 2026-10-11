import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  MapPin,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Clock,
  Globe2,
  Tag,
  Smartphone,
  SlidersHorizontal,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Store,
  AlertTriangle,
  RotateCcw,
  Truck
} from 'lucide-react';
import { TrackForm } from '../components/tracking/TrackForm';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'track' | 'rates' | 'locations'>('track');
  const navigate = useNavigate();

  // Rate & Ship quick tab state
  const [rateFrom, setRateFrom] = useState('10001');
  const [rateTo, setRateTo] = useState('90210');
  const [rateWeight, setRateWeight] = useState('2.5');

  // Locations quick tab state
  const [locationQuery, setLocationQuery] = useState('');

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/rates?from=${encodeURIComponent(rateFrom)}&to=${encodeURIComponent(rateTo)}&weight=${encodeURIComponent(rateWeight)}`);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/locations?q=${encodeURIComponent(locationQuery)}`);
  };

  return (
    <div className="flex-1">
      {/* 1. Hero Section with 3 Tabs */}
      <section className="relative bg-gradient-to-b from-[#0047AB] via-[#003882] to-[#002B66] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-5xl mx-auto">
          {/* Main Hero Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#FF6700] text-white mb-3 shadow-xs">
              Reliable Global Courier & Parcel Logistics
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
              Ship, manage, track, deliver.
            </h1>
            <p className="mt-3.5 text-base sm:text-xl text-blue-100 max-w-2xl mx-auto font-normal">
              Coast-to-coast express ground, worldwide air cargo, and precision real-time tracking for businesses and individuals.
            </p>
          </div>

          {/* White Card with 3 Tabs */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-900 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 bg-slate-50/80" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'rates'}
                onClick={() => setActiveTab('rates')}
                className={`flex-1 py-4 px-4 text-center text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
                  activeTab === 'rates'
                    ? 'border-[#FF6700] text-[#0047AB] bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calculator className="w-4 h-4 text-[#FF6700]" />
                <span>Rate & Ship</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'track'}
                onClick={() => setActiveTab('track')}
                className={`flex-1 py-4 px-4 text-center text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
                  activeTab === 'track'
                    ? 'border-[#FF6700] text-[#0047AB] bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Package className="w-4 h-4 text-[#FF6700]" />
                <span>Track</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'locations'}
                onClick={() => setActiveTab('locations')}
                className={`flex-1 py-4 px-4 text-center text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
                  activeTab === 'locations'
                    ? 'border-[#FF6700] text-[#0047AB] bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#FF6700]" />
                <span>Locations</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8">
              {/* TAB 1: Rate & Ship */}
              {activeTab === 'rates' && (
                <form onSubmit={handleRateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Origin ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        value={rateFrom}
                        onChange={(e) => setRateFrom(e.target.value)}
                        placeholder="e.g. 10001"
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Destination ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        value={rateTo}
                        onChange={(e) => setRateTo(e.target.value)}
                        placeholder="e.g. 90210"
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Est. Weight (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="70"
                        value={rateWeight}
                        onChange={(e) => setRateWeight(e.target.value)}
                        placeholder="e.g. 2.5"
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-slate-500">
                      Standard envelopes to 70 kg parcels. For commercial freight over 70 kg, visit our{' '}
                      <Link to="/shipping/freight" className="text-[#0047AB] font-semibold underline">
                        Freight Portal
                      </Link>.
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors uppercase tracking-wider"
                    >
                      <span>Get rates</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: Track (Default) */}
              {activeTab === 'track' && <TrackForm variant="hero" />}

              {/* TAB 3: Locations */}
              {activeTab === 'locations' && (
                <form onSubmit={handleLocationSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Find Traxio Drop Boxes, Express Centers & Authorized Counters
                      </label>
                      <input
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        placeholder="Enter City, State, or ZIP code (e.g. New York, NY or 90017)"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                      />
                    </div>
                    <div className="sm:self-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Find Location</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>Popular searches:</span>
                    <button type="button" onClick={() => navigate('/locations?q=New York')} className="text-[#0047AB] hover:underline font-medium">New York</button>
                    <button type="button" onClick={() => navigate('/locations?q=Chicago')} className="text-[#0047AB] hover:underline font-medium">Chicago</button>
                    <button type="button" onClick={() => navigate('/locations?q=Los Angeles')} className="text-[#0047AB] hover:underline font-medium">Los Angeles</button>
                    <button type="button" onClick={() => navigate('/locations?q=Dallas')} className="text-[#0047AB] hover:underline font-medium">Dallas</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Five Quick-Action Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {/* Tile 1: Drop off */}
          <Link
            to="/locations/drop-off"
            className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0047AB] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">
              Drop off a package
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">Find nearby drop points & QR printing</p>
          </Link>

          {/* Tile 2: Redirect */}
          <Link
            to="/manage-delivery"
            className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0047AB] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">
              Redirect a package
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">Hold at location or update address</p>
          </Link>

          {/* Tile 3: Store hours */}
          <Link
            to="/locations"
            className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0047AB] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">
              Store hours & services
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">Packaging, passport & freight desks</p>
          </Link>

          {/* Tile 4: Service alerts */}
          <Link
            to="/service-alerts"
            className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0047AB] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">
              Service alerts
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">Severe weather & network updates</p>
          </Link>

          {/* Tile 5: Return a package */}
          <Link
            to="/shipping/returns"
            className="col-span-2 md:col-span-1 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0047AB] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">
              Return a package
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">Instant prepaid return labels</p>
          </Link>
        </div>
      </section>

      {/* 3. Why Ship with Traxio? */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-[#0047AB] uppercase tracking-widest">
            Enterprise Speed. Personal Care.
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why ship with Traxio?
          </p>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Backed by a multi-modal fleet of dedicated cargo freighters, electric delivery vans, and certified regional hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Prop 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[#0047AB]/10 text-[#0047AB] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Reliable & Fast Delivery
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Guaranteed next-morning air by 10:30 AM and precision day-definite ground delivery backed by our full money-back guarantee.
            </p>
          </div>

          {/* Prop 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[#FF6700]/10 text-[#FF6700] flex items-center justify-center mb-4">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Competitive Professional Rates
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tiered commercial savings of up to 25% for regular shippers, transparent fuel surcharges, and no surprise residential add-ons.
            </p>
          </div>

          {/* Prop 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-[#3DDC97]/20 text-[#0c7048] flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Wide Global Coverage
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seamless delivery across 220+ countries and territories, with pre-cleared electronic customs documentation and localized clearance.
            </p>
          </div>

          {/* Prop 4 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Flat-Rate OneRate Boxes*
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Predictable flat pricing for any package up to 25 kg in Traxio standardized packaging. If it fits, it ships at one simple rate.
            </p>
          </div>
        </div>

        {/* Start Shipping CTA Banner */}
        <div className="mt-12 bg-slate-900 rounded-2xl overflow-hidden shadow-xl text-white flex flex-col lg:flex-row items-center">
          <div className="p-8 sm:p-12 lg:w-3/5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6700]">Get Started in Under 3 Minutes</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">
              Ship single packages or scale your enterprise fulfillment
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you are sending a critical medical instrument, an urgent legal contract, or thousands of e-commerce orders daily, Traxio delivers certainty.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/shipping/create"
                className="px-6 py-3.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center gap-2 shadow-md uppercase tracking-wider"
              >
                <span>Start shipping now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/rates"
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700"
              >
                Compare all rates
              </Link>
            </div>
          </div>
          <div className="lg:w-2/5 p-8 flex items-center justify-center bg-slate-800/60 border-t lg:border-t-0 lg:border-l border-slate-800">
            <div className="text-center space-y-3">
              <Truck className="w-16 h-16 text-[#3DDC97] mx-auto opacity-90" />
              <div className="text-2xl font-black">99.8%</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">Network On-Time Standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Manage Deliveries Your Way (3 Cards) */}
      <section className="bg-slate-100 py-20 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-[#0047AB] uppercase tracking-widest">Customer Control</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Manage deliveries your way
            </p>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              You decide when, where, and how packages arrive at your home or business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Mobile App */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
              <div className="h-48 bg-gradient-to-tr from-blue-900 to-[#0047AB] p-6 flex flex-col justify-end text-white relative">
                <Smartphone className="w-10 h-10 text-[#3DDC97] mb-2" />
                <h3 className="text-xl font-bold">Traxio Mobile App</h3>
                <span className="text-xs text-blue-200">Live GPS courier truck tracking</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Track in transit parcels, scan shipping labels with your phone camera, receive delivery push notifications, and authorize signatures digitally.
                </p>
                <Link
                  to="/support/account-tools"
                  className="text-sm font-bold text-[#0047AB] hover:text-[#003882] flex items-center gap-1 group"
                >
                  <span>Learn about mobile tools</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Delivery Manager */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
              <div className="h-48 bg-gradient-to-tr from-slate-900 to-blue-950 p-6 flex flex-col justify-end text-white relative">
                <SlidersHorizontal className="w-10 h-10 text-[#FF6700] mb-2" />
                <h3 className="text-xl font-bold">Traxio Delivery Manager</h3>
                <span className="text-xs text-slate-300">Reschedule & redirect on demand</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Going on vacation or not home? Request hold at any Traxio Express Center or authorized drop point for up to 14 days free of charge.
                </p>
                <Link
                  to="/manage-delivery"
                  className="text-sm font-bold text-[#0047AB] hover:text-[#003882] flex items-center gap-1 group"
                >
                  <span>Customize your delivery</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 3: Proof of Delivery */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
              <div className="h-48 bg-gradient-to-tr from-blue-950 to-[#0047AB] p-6 flex flex-col justify-end text-white relative">
                <FileCheck2 className="w-10 h-10 text-[#3DDC97] mb-2" />
                <h3 className="text-xl font-bold">Visual Proof of Delivery</h3>
                <span className="text-xs text-blue-200">High-resolution photographic proof</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Every residential delivery includes an instant photographic confirmation and digital timestamp verifying exact placement at the door.
                </p>
                <Link
                  to="/proof-of-delivery"
                  className="text-sm font-bold text-[#0047AB] hover:text-[#003882] flex items-center gap-1 group"
                >
                  <span>View sample proof of delivery</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Go Global With Confidence Banner */}
      <section className="bg-gradient-to-r from-[#003685] to-[#0047AB] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#3DDC97] border border-[#3DDC97]/40">
              International Trade & Customs Compliance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Go global with confidence and zero customs guesswork
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Traxio Electronic Trade Documents (ETD) automatically transmit commercial invoices, Harmonized System (HS) codes, and export compliance declarations directly to destination border authorities before flight departure.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/shipping/international"
                className="px-6 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg shadow-md transition-colors uppercase tracking-wider"
              >
                Explore international guide
              </Link>
              <Link
                to="/support/service-guide"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/20 transition-colors"
              >
                Watch customs webinar
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-xs max-w-md">
            <div className="space-y-3 text-xs text-blue-100">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Globe2 className="w-5 h-5 text-[#3DDC97]" />
                <span>Customs Clearance Checklist</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
                <span>Commercial Invoice generator with automated currency conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
                <span>6-digit Harmonized Tariff Classification database lookup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
                <span>Estimated duty and VAT/tax calculator at checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
                <span>Delivery Duty Paid (DDP) / Delivery Duty Unpaid (DDU) routing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Smarter Shipping for Growing Businesses */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-[#0047AB] uppercase tracking-widest">Scalable Logistics</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Smarter shipping for growing businesses
          </p>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            From single-founder e-commerce shops to high-volume multi-facility manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Expand beyond borders
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect your online storefront with Shopify, WooCommerce, and ERP platforms to generate shipping labels, manifest pickups, and send branded tracking links automatically.
              </p>
            </div>
            <Link to="/compatible-partners" className="mt-6 text-sm font-bold text-[#0047AB] hover:underline">
              View compatible platforms &rarr;
            </Link>
          </div>

          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Cover more ground
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reach 85% of continental US addresses in 2 days or less via ground transit with Traxio regional distribution hubs, reducing parcel shipping costs by up to 40%.
              </p>
            </div>
            <Link to="/rates" className="mt-6 text-sm font-bold text-[#0047AB] hover:underline">
              Explore ground transit maps &rarr;
            </Link>
          </div>

          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-4">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Every shipment earns rewards
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enroll in Traxio Rewards to earn points on every dollar spent. Redeem points for shipping credits, gift cards, or corporate office supplies.
              </p>
            </div>
            <Link to="/rewards" className="mt-6 text-sm font-bold text-[#0047AB] hover:underline">
              Join Traxio Rewards &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Fine Print & Legal Disclaimers */}
      <section className="bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>
            <strong>* OneRate Flat-Rate Packaging:</strong> Flat-rate pricing applies only to authentic Traxio brand packaging weighing 25 kg (55 lbs) or less. Hazardous materials, perishable foodstuffs, and live cargo are excluded. Additional surcharges apply for Saturday delivery and designated remote island territories.
          </p>
          <p>
            <strong>Money-Back Delivery Guarantee:</strong> Applies to published transit times for Traxio Overnight Air and Traxio Priority Express services within eligible zip codes. Service guarantees are suspended during national severe weather declarations, force majeure events, or unexpected customs delays beyond the carrier’s reasonable control.
          </p>
          <p>
            <strong>Fuel Surcharge & Rate Index:</strong> Published rates reflect baseline standard tariffs and do not include weekly indexed fuel surcharges (presently 14.5% for domestic ground and 18.0% for international air transport). Rates are subject to change without prior notice in accordance with the Traxio Official Service Guide 2026.
          </p>
        </div>
      </section>
    </div>
  );
};
