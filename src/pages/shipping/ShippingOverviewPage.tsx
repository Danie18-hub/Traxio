import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import {
  Package,
  Clock,
  Globe2,
  Truck,
  RotateCcw,
  Box,
  ArrowRight,
  ShieldCheck,
  Plane
} from 'lucide-react';

export const ShippingOverviewPage: React.FC = () => {
  return (
    <div className="flex-1">
      <PageHeaderBand
        title="All Shipping Services"
        subtitle="Domestic ground, worldwide express air, high-capacity freight, and streamlined returns."
        breadcrumbs={[{ label: 'Shipping' }]}
        action={
          <Link
            to="/shipping/create"
            className="px-5 py-2.5 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
          >
            <span>Create Shipment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Services Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Traxio Overnight Air
              </h3>
              <p className="text-xs font-semibold text-[#FF6700] mb-3">
                Next Business Day Delivery by 10:30 AM
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Critical time-definite air transportation across the United States, Canada, and Western Europe. Includes money-back service guarantee.
              </p>
            </div>
            <Link
              to="/shipping/create?service=Traxio Overnight Air"
              className="text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1"
            >
              <span>Ship Overnight Air</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Traxio Priority Express
              </h3>
              <p className="text-xs font-semibold text-[#0047AB] mb-3">
                1 - 2 Business Days Delivery
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Fast, reliable express routing for business shipments requiring guaranteed 2-day delivery without the cost of early-morning air slots.
              </p>
            </div>
            <Link
              to="/shipping/create?service=Traxio Priority Express"
              className="text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1"
            >
              <span>Ship Priority Express</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Traxio Economy Ground
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-3">
                4 - 6 Business Days Coast-to-Coast
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The most economical choice for routine commercial distribution and e-commerce parcels weighing up to 70 kg. Day-definite scheduling.
              </p>
            </div>
            <Link
              to="/shipping/create?service=Traxio Economy Ground"
              className="text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1"
            >
              <span>Ship Economy Ground</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                International Express
              </h3>
              <p className="text-xs font-semibold text-[#0047AB] mb-3">
                Worldwide Door-to-Door Delivery
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Pre-cleared electronic trade documentation across 220 countries. In-house customs brokers expedite clearance at major border gateways.
              </p>
            </div>
            <Link
              to="/shipping/international"
              className="text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1"
            >
              <span>International Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service 5 */}
          <div className="bg-white rounded-xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Traxio Freight (LTL & FTL)
              </h3>
              <p className="text-xs font-semibold text-purple-700 mb-3">
                Palletized Cargo & Heavy Freight Over 70 kg
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Dedicated dry van trailers, liftgate delivery, temperature-controlled cargo, and customized air freight chartering for industrial machinery.
              </p>
            </div>
            <Link
              to="/shipping/freight"
              className="text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1"
            >
              <span>Explore Freight Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service 6 */}
          <div className="bg-white rounded-xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Traxio Returns Manager
              </h3>
              <p className="text-xs font-semibold text-amber-700 mb-3">
                Prepaid Labels & Hassle-Free Returns
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Provide QR codes for label-less customer drop-offs at any of our 12,000 retail network locations.
              </p>
            </div>
            <Link
              to="/shipping/returns"
              className="text-sm font-bold text-[#0047AB] hover:underline flex items-center gap-1"
            >
              <span>Manage Returns</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <CTABand />
    </div>
  );
};
