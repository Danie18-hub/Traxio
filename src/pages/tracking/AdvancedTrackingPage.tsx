import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { getShipments } from '@/src/lib/api';
import { Shipment } from '@/src/lib/types';
import { Search, Filter, Calendar, ArrowRight, Package } from 'lucide-react';

export const AdvancedTrackingPage: React.FC = () => {
  const [searchType, setSearchType] = useState<'tracking' | 'reference' | 'date'>('tracking');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-15');
  const [results, setResults] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch();
  }, [statusFilter]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const data = await getShipments({
        search: query,
        status: statusFilter
      });
      setResults(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Advanced Tracking & Reference Search"
        subtitle="Search shipments across your account by customer reference number, invoice ID, or dispatch date."
        breadcrumbs={[
          { label: 'Tracking', href: '/tracking' },
          { label: 'Advanced Search' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Search Criteria Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex border-b border-slate-200 mb-6 gap-6 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setSearchType('tracking')}
              className={`pb-3 border-b-2 transition-colors ${
                searchType === 'tracking'
                  ? 'border-[#FF6700] text-[#0047AB]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              By Tracking / Door Tag #
            </button>
            <button
              type="button"
              onClick={() => setSearchType('reference')}
              className={`pb-3 border-b-2 transition-colors ${
                searchType === 'reference'
                  ? 'border-[#FF6700] text-[#0047AB]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              By Shipper Reference (PO / Invoice)
            </button>
            <button
              type="button"
              onClick={() => setSearchType('date')}
              className={`pb-3 border-b-2 transition-colors ${
                searchType === 'date'
                  ? 'border-[#FF6700] text-[#0047AB]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              By Shipment Date Range
            </button>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {searchType === 'tracking'
                    ? 'Tracking Numbers or Door Tag (e.g. TRX1000000001)'
                    : searchType === 'reference'
                    ? 'Customer Reference / PO # (e.g. PO-882914-MED, ORD-77103)'
                    : 'Search keyword'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter search keywords or reference code..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Delivered">Delivered</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Label Created">Label Created</option>
                </select>
              </div>
            </div>

            {searchType === 'date' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    From Ship Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    To Ship Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Found {results.length} matching shipment records.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center gap-2 shadow-xs transition-colors uppercase tracking-wider"
              >
                <Search className="w-4 h-4" />
                <span>Search Records</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 font-bold text-sm text-slate-800 flex items-center justify-between">
            <span>Search Results</span>
            <span className="text-xs font-normal text-slate-500">Click a tracking number to inspect detailed milestones</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/75 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Tracking #</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Service</th>
                  <th className="py-3 px-4 font-semibold">Origin &rarr; Destination</th>
                  <th className="py-3 px-4 font-semibold">Reference</th>
                  <th className="py-3 px-4 font-semibold">Delivery Date</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No shipments matching your filter criteria. Try adjusting the search keywords.
                    </td>
                  </tr>
                ) : (
                  results.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0047AB]">
                        <Link to={`/track/${s.trackingNumber}`} className="hover:underline">
                          {s.trackingNumber}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={s.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                        {s.service}
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <div className="font-semibold text-slate-900">{s.destination}</div>
                        <div className="text-slate-500 text-[11px]">from {s.origin}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        {s.referenceNumber || '—'}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium text-slate-900">
                        {new Date(s.actualDelivery || s.estimatedDelivery).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/track/${s.trackingNumber}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0047AB] hover:underline"
                        >
                          <span>Track</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
