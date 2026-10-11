import React, { useState, useEffect } from 'react';
import { getLocations, createLocation, deleteLocation, updateLocation } from '@/src/lib/api';
import { CourierLocation } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { MapPin, Plus, Trash2, Edit2, Search, Check } from 'lucide-react';

export const AdminLocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<CourierLocation[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [type, setType] = useState<CourierLocation['type']>('Traxio Express Center');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('+1 (800) 555-8729');
  const [is24Hour, setIs24Hour] = useState(false);

  const { success, error: toastError } = useToast();

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch {
      // error
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setType('Traxio Express Center');
    setAddress('');
    setCity('');
    setState('');
    setPostalCode('');
    setPhone('+1 (800) 555-8729');
    setIs24Hour(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (loc: CourierLocation) => {
    setEditingId(loc.id);
    setName(loc.name);
    setType(loc.type);
    setAddress(loc.address);
    setCity(loc.city);
    setState(loc.state);
    setPostalCode(loc.postalCode);
    setPhone(loc.phone);
    setIs24Hour(loc.is24Hour);
    setModalOpen(true);
  };

  const handleDelete = async (id: string, locName: string) => {
    if (window.confirm(`Delete facility ${locName}?`)) {
      await deleteLocation(id);
      success('Facility removed from courier location index.');
      loadLocations();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateLocation(editingId, {
          name,
          type,
          address,
          city,
          state,
          postalCode,
          phone,
          is24Hour,
          openNow: true
        });
        success('Facility updated successfully!');
      } else {
        await createLocation({
          name,
          type,
          address,
          city,
          state,
          postalCode,
          country: 'United States',
          phone,
          openNow: true,
          is24Hour,
          services: ['Drop Off', 'Pick Up / Hold', 'Packaging Supplies'],
          hours: [
            { day: 'Monday - Friday', open: '08:00', close: '19:00' },
            { day: 'Saturday', open: '09:00', close: '17:00' },
            { day: 'Sunday', open: 'Closed', close: 'Closed', isClosed: true }
          ],
          lat: 40.7128,
          lng: -74.006,
          hasParking: true
        });
        success('New courier facility provisioned!');
      }
      setModalOpen(false);
      loadLocations();
    } catch {
      toastError('Could not save facility.');
    }
  };

  const filtered = locations.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.city.toLowerCase().includes(search.toLowerCase()) ||
    l.postalCode.includes(search)
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Facility & Locations Manager</h1>
          <p className="text-xs text-slate-500 mt-1">Manage physical customer counters, 24/7 drop boxes, and sorting facilities.</p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facility name, city, zip code..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs"
          />
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Facility Name</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Address</th>
                <th className="py-3 px-4 font-semibold">City / State / ZIP</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold">24-Hour Access</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{l.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0047AB] border border-blue-200">
                      {l.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{l.address}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">{l.city}, {l.state} {l.postalCode}</td>
                  <td className="py-3.5 px-4 font-mono">{l.phone}</td>
                  <td className="py-3.5 px-4">
                    {l.is24Hour ? (
                      <span className="text-emerald-700 font-bold">Yes (24/7)</span>
                    ) : (
                      <span className="text-slate-400">Standard Hours</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(l)}
                      className="p-1 text-slate-600 hover:text-[#0047AB] rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(l.id, l.name)}
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

      {/* Modal Dialog for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
              {editingId ? 'Edit Location Facility' : 'Add New Courier Facility'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facility Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Traxio Express Center - Downtown"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facility Type *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Traxio Express Center">Traxio Express Center</option>
                  <option value="Drop Box 24/7">Drop Box 24/7</option>
                  <option value="Authorized Ship Center">Authorized Ship Center</option>
                  <option value="Freight Facility">Freight Facility</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ZIP *</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={is24Hour}
                    onChange={(e) => setIs24Hour(e.target.checked)}
                    className="rounded text-[#0047AB]"
                  />
                  <span>24/7 Automated Access Available</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold rounded-lg uppercase tracking-wider"
                >
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
