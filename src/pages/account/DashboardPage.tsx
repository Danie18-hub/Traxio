import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { AccountNav } from './AccountNav';
import { getShipments } from '@/src/lib/api';
import { Shipment } from '@/src/lib/types';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { TrackForm } from '@/src/components/tracking/TrackForm';
import {
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  BookUser,
  CreditCard,
  Truck
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getShipments();
        setRecentShipments(data.slice(0, 5));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Customer Account Dashboard"
        subtitle="Manage dispatch operations, monitor live delivery milestones, and access corporate shipping tools."
        badge="Active Business Account • #TRX-BUS-449102"
        action={
          <Link
            to="/shipping/create"
            className="px-5 py-2.5 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create Shipment</span>
          </Link>
        }
      />
      <AccountNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Shipments</span>
            <div className="text-2xl font-black text-[#0047AB] mt-1">4</div>
            <span className="text-[11px] text-slate-400">In transit across network</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Delivered This Month</span>
            <div className="text-2xl font-black text-[#0c7048] mt-1">28</div>
            <span className="text-[11px] text-emerald-600 font-semibold">99.4% On-time SLA</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preferred Rate Discount</span>
            <div className="text-2xl font-black text-[#FF6700] mt-1">20% Off</div>
            <span className="text-[11px] text-slate-400">Business Tier Tier-2</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Open Invoices</span>
            <div className="text-2xl font-black text-slate-900 mt-1">$685.20</div>
            <span className="text-[11px] text-slate-400">Due October 28, 2026</span>
          </div>
        </div>

        {/* Quick Track & Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Quick Package Tracking
            </h3>
            <TrackForm variant="compact" />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">
              Frequently Used Tools
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/shipping/pickups"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold"
              >
                <span>Schedule Courier Pickup</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/account/address-book"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold"
              >
                <span>Saved Address Book (3)</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/shipping/packaging"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold"
              >
                <span>Request Free Box Supplies</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Shipments Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Recent Account Shipments
            </h3>
            <Link to="/account/shipments" className="text-xs font-bold text-[#0047AB] hover:underline">
              View All Shipments &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Tracking #</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Service</th>
                  <th className="py-3 px-4 font-semibold">Recipient</th>
                  <th className="py-3 px-4 font-semibold">Est. Delivery</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {recentShipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0047AB]">
                      <Link to={`/track/${s.trackingNumber}`} className="hover:underline">
                        {s.trackingNumber}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={s.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{s.service}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">{s.recipient.name} ({s.recipient.city})</td>
                    <td className="py-3.5 px-4 text-slate-900">{new Date(s.actualDelivery || s.estimatedDelivery).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/track/${s.trackingNumber}`}
                        className="text-[#0047AB] font-bold hover:underline"
                      >
                        Track &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
