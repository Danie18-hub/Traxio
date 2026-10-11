import React, { useState, useEffect } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { AccountNav } from './AccountNav';
import { getAddressBook, addAddressBookEntry, deleteAddressBookEntry, updateAddressBookEntry } from '@/src/lib/api';
import { AddressBookEntry } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { BookUser, Plus, Trash2, Edit2, Star, MapPin } from 'lucide-react';

export const AddressBookPage: React.FC = () => {
  const [entries, setEntries] = useState<AddressBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [label, setLabel] = useState('New Client Office');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const { success, error: toastError } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAddressBook();
      setEntries(data);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setLabel('Client Office');
    setName('');
    setCompany('');
    setAddress('');
    setCity('');
    setState('');
    setPostalCode('');
    setPhone('');
    setEmail('');
    setIsDefault(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (entry: AddressBookEntry) => {
    setEditingId(entry.id);
    setLabel(entry.label);
    setName(entry.name);
    setCompany(entry.company || '');
    setAddress(entry.address);
    setCity(entry.city);
    setState(entry.state);
    setPostalCode(entry.postalCode);
    setPhone(entry.phone);
    setEmail(entry.email || '');
    setIsDefault(entry.isDefault);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this saved address?')) {
      await deleteAddressBookEntry(id);
      success('Address removed from address book.');
      loadData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAddressBookEntry(editingId, {
          label,
          name,
          company,
          address,
          city,
          state,
          postalCode,
          phone,
          email,
          isDefault
        });
        success('Address updated successfully!');
      } else {
        await addAddressBookEntry({
          label,
          name,
          company,
          address,
          city,
          state,
          postalCode,
          country: 'United States',
          phone,
          email,
          isDefault
        });
        success('New destination address saved to address book!');
      }
      setModalOpen(false);
      loadData();
    } catch {
      toastError('Could not save address.');
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Saved Address Book"
        subtitle="Store verified corporate contacts and frequent dispatch destinations."
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          { label: 'Address Book' }
        ]}
        action={
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        }
      />
      <AccountNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`p-6 rounded-2xl border-2 transition-all bg-white relative flex flex-col justify-between ${
                entry.isDefault ? 'border-[#0047AB] shadow-sm' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0047AB] uppercase tracking-wider">
                    {entry.label}
                  </span>
                  {entry.isDefault && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-blue-100 text-[#0047AB] px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-current" /> Default
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900">{entry.name}</h3>
                {entry.company && <p className="text-xs text-slate-500">{entry.company}</p>}

                <div className="mt-3 text-xs text-slate-600 space-y-1">
                  <p>{entry.address}</p>
                  <p>{entry.city}, {entry.state} {entry.postalCode}, {entry.country}</p>
                  <p className="font-mono text-slate-500 pt-1">{entry.phone}</p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(entry)}
                  className="p-1.5 text-slate-600 hover:text-[#0047AB] rounded hover:bg-slate-50"
                  title="Edit address"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-50"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
              {editingId ? 'Edit Address' : 'Add New Saved Address'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Address Label / Nickname</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Headquarters, Austin Clinic, SF Lab"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
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
                  <label className="block font-semibold text-slate-700 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="rounded text-[#0047AB]"
                  />
                  <span>Set as primary default origin address</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
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
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
