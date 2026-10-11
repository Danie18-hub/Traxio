import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShipments, getTickets } from '@/src/lib/api';
import { Shipment, SupportTicket } from '@/src/lib/types';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, t] = await Promise.all([getShipments(), getTickets()]);
        setShipments(s);
        setTickets(t);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalCount = shipments.length;
  const inTransitCount = shipments.filter((s) => s.status === 'In Transit' || s.status === 'Out for Delivery').length;
  const deliveredCount = shipments.filter((s) => s.status === 'Delivered').length;
  const delayedCount = shipments.filter((s) => s.status === 'Delayed').length;
  const openTicketsCount = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;

  // Mock shipments per day bar data for last 7 days
  const dailyVolume = [
    { day: 'Mon', count: 1840 },
    { day: 'Tue', count: 2190 },
    { day: 'Wed', count: 2450 },
    { day: 'Thu', count: 2680 },
    { day: 'Fri', count: 2320 },
    { day: 'Sat', count: 1140 },
    { day: 'Sun', count: 890 }
  ];

  const maxVolume = Math.max(...dailyVolume.map((d) => d.count));

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Operations Control Center</h1>
          <p className="text-xs text-slate-500 mt-1">Live national flight arrivals, cross-dock volumes, and customer inquiries.</p>
        </div>
        <Link
          to="/admin/shipments/new"
          className="px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Create New Shipment</span>
        </Link>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Active</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
          <span className="text-[10px] text-slate-400">Database packages</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">In Transit</span>
          <div className="text-2xl font-black text-[#0047AB] mt-1">{inTransitCount}</div>
          <span className="text-[10px] text-blue-600 font-semibold">Active couriers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Delivered</span>
          <div className="text-2xl font-black text-[#0c7048] mt-1">{deliveredCount}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Verified with POD</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Delayed Holds</span>
          <div className="text-2xl font-black text-[#FF6700] mt-1">{delayedCount}</div>
          <span className="text-[10px] text-amber-600 font-semibold">Weather advisory</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Open Tickets</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{openTicketsCount}</div>
          <span className="text-[10px] text-purple-600 font-semibold">Pending resolution</span>
        </div>
      </div>

      {/* Daily Volume Bar Chart & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Daily Volume Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Weekly Inbound Sort Volume</h3>
              <p className="text-xs text-slate-500">Parcels processed through automated regional sorters</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#0047AB] bg-blue-50 px-2.5 py-1 rounded">
              Avg 1,900 / day
            </span>
          </div>

          <div className="h-48 pt-6 flex items-end justify-between gap-3 px-2">
            {dailyVolume.map((d) => {
              const heightPercent = Math.round((d.count / maxVolume) * 100);
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </span>
                  <div
                    className="w-full max-w-[40px] bg-gradient-to-t from-[#0047AB] to-blue-400 rounded-t-md transition-all group-hover:from-[#FF6700] group-hover:to-orange-400"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs font-semibold text-slate-600">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Terminal Activity Feed (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Real-Time Terminal Feed
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#3DDC97] shrink-0 mt-1.5" />
              <div>
                <strong className="text-slate-900">DFW Flight TRX-408 Departed</strong>
                <p className="text-slate-500 mt-0.5">Boeing 767 cargo freighter airborne with 3,400 priority express airbills.</p>
                <span className="text-[10px] text-slate-400 font-mono">12 minutes ago</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6700] shrink-0 mt-1.5" />
              <div>
                <strong className="text-slate-900">Weather Hold Enacted in Omaha</strong>
                <p className="text-slate-500 mt-0.5">Highway linehaul staged at interchange safe zone until road clearing.</p>
                <span className="text-[10px] text-slate-400 font-mono">34 minutes ago</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0047AB] shrink-0 mt-1.5" />
              <div>
                <strong className="text-slate-900">Customs Clearance Batch Verified</strong>
                <p className="text-slate-500 mt-0.5">London Heathrow gateway completed ICS2 release for 840 EU packets.</p>
                <span className="text-[10px] text-slate-400 font-mono">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Shipments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Latest Database Shipments
          </h3>
          <Link to="/admin/shipments" className="text-xs font-bold text-[#0047AB] hover:underline">
            View All in Shipments Manager &rarr;
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
                <th className="py-3 px-4 font-semibold">Origin &rarr; Dest</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {shipments.slice(0, 6).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0047AB]">
                    <Link to={`/admin/shipments/${s.id}`} className="hover:underline">
                      {s.trackingNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{s.service}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">{s.recipient.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{s.origin} &rarr; {s.destination}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/admin/shipments/${s.id}`}
                      className="px-3 py-1 bg-slate-100 hover:bg-[#0047AB] hover:text-white rounded text-xs font-bold transition-colors inline-block"
                    >
                      Manage Events
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
