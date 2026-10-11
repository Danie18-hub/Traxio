import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { AccountNav } from './AccountNav';
import { getShipments } from '@/src/lib/api';
import { Shipment } from '@/src/lib/types';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { Search, Filter, ArrowRight, Plus } from 'lucide-react';

export const CustomerShipmentsPage: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getShipments({
        status: statusFilter,
        search
      });
      setShipments(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="My Account Shipments"
        subtitle="Full log of domestic and international parcels dispatched from your corporate account."
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          { label: 'Shipments' }
        ]}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1 w-full md:w-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tracking #, recipient, reference..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0047AB] text-white font-bold text-xs rounded-lg uppercase tracking-wider"
            >
              Filter
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['All', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Label Created'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full border shrink-0 font-medium ${
                  statusFilter === s
                    ? 'bg-[#0047AB] text-white border-[#0047AB]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Shipments Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Tracking #</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Service Level</th>
                  <th className="py-3 px-4 font-semibold">Origin &rarr; Destination</th>
                  <th className="py-3 px-4 font-semibold">Recipient</th>
                  <th className="py-3 px-4 font-semibold">Weight</th>
                  <th className="py-3 px-4 font-semibold">Delivery Date</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {shipments.map((s) => (
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
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{s.destination}</div>
                      <div className="text-[11px] text-slate-400">from {s.origin}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {s.recipient.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono">{s.weight} {s.weightUnit}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {new Date(s.actualDelivery || s.estimatedDelivery).toLocaleDateString()}
                    </td>
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
