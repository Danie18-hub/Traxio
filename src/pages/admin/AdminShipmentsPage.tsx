import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getShipments, deleteShipment, updateShipment } from '@/src/lib/api';
import { Shipment, ShipmentStatus } from '@/src/lib/types';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { useToast } from '@/src/components/ui/Toast';
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';

export const AdminShipmentsPage: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quickStatusModal, setQuickStatusModal] = useState<Shipment | null>(null);
  const [newStatusChoice, setNewStatusChoice] = useState<ShipmentStatus>('In Transit');

  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

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

  const handleDelete = async (id: string, trk: string) => {
    if (window.confirm(`Are you sure you want to permanently delete shipment record ${trk}? This cannot be undone.`)) {
      await deleteShipment(id);
      success(`Shipment ${trk} deleted from database.`);
      loadData();
    }
  };

  const handleUpdateStatus = async () => {
    if (!quickStatusModal) return;
    try {
      await updateShipment(quickStatusModal.id, {
        status: newStatusChoice
      });
      success(`Status for ${quickStatusModal.trackingNumber} updated to ${newStatusChoice}!`);
      setQuickStatusModal(null);
      loadData();
    } catch {
      toastError('Could not update status.');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(shipments.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Shipments Manager</h1>
          <p className="text-xs text-slate-500 mt-1">Full database of active, delivered, and delayed courier airbills.</p>
        </div>
        <Link
          to="/admin/shipments/new"
          className="px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Airbill</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full md:w-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tracking #, sender, recipient, reference..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0047AB] text-white font-bold text-xs rounded-lg uppercase tracking-wider"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['All', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Label Created'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full border font-semibold shrink-0 ${
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

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.length > 0 && selectedIds.length === shipments.length}
              onChange={handleSelectAll}
              className="rounded text-[#0047AB]"
            />
            <span className="font-semibold text-slate-700">
              {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Select All'}
            </span>
          </div>
          <span className="text-slate-500 font-mono">Total {shipments.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3 px-4 font-semibold">Tracking #</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Service Level</th>
                <th className="py-3 px-4 font-semibold">Recipient</th>
                <th className="py-3 px-4 font-semibold">Weight</th>
                <th className="py-3 px-4 font-semibold">Est. Delivery</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {shipments.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(s.id)}
                      onChange={() => handleToggleSelect(s.id)}
                      className="rounded text-[#0047AB]"
                    />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0047AB]">
                    <Link to={`/admin/shipments/${s.id}`} className="hover:underline">
                      {s.trackingNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{s.service}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{s.recipient.name}</div>
                    <div className="text-[11px] text-slate-400">{s.recipient.city}, {s.recipient.state}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{s.weight} {s.weightUnit}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {new Date(s.actualDelivery || s.estimatedDelivery).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setQuickStatusModal(s);
                        setNewStatusChoice(s.status);
                      }}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-[11px]"
                      title="Update Status"
                    >
                      Status
                    </button>
                    <Link
                      to={`/admin/shipments/${s.id}`}
                      className="px-2.5 py-1 bg-[#0047AB] hover:bg-[#003882] text-white rounded font-bold text-[11px]"
                    >
                      Events & Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id, s.trackingNumber)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Status Modal */}
      {quickStatusModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 mb-3">
              Update Status: {quickStatusModal.trackingNumber}
            </h3>

            <div className="space-y-2 mb-4">
              <label className="block font-semibold text-slate-700">Select New Status</label>
              <select
                value={newStatusChoice}
                onChange={(e) => setNewStatusChoice(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Label Created">Label Created</option>
                <option value="Picked Up">Picked Up</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setQuickStatusModal(null)}
                className="px-3 py-1.5 font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold rounded-lg uppercase tracking-wider"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
