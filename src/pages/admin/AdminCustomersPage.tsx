import React, { useState, useEffect } from 'react';
import { getCustomers } from '@/src/lib/api';
import { Customer } from '@/src/lib/types';
import { Users, Search, Mail, Phone, Building } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, [search]);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers(search);
      setCustomers(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Accounts Directory</h1>
        <p className="text-xs text-slate-500 mt-1">Manage verified shippers, enterprise account numbers, and volume tiers.</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, email, company, account #..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Account #</th>
                <th className="py-3 px-4 font-semibold">Customer / Contact</th>
                <th className="py-3 px-4 font-semibold">Company</th>
                <th className="py-3 px-4 font-semibold">Account Tier</th>
                <th className="py-3 px-4 font-semibold">City / Country</th>
                <th className="py-3 px-4 font-semibold">Total Parcels</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0047AB]">{c.accountNumber}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{c.company || 'Personal'}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                      c.accountType === 'Enterprise'
                        ? 'bg-purple-100 text-purple-800'
                        : c.accountType === 'Small Business'
                        ? 'bg-blue-100 text-[#0047AB]'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {c.accountType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{c.city}, {c.country}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">{c.totalShipments}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {c.status}
                    </span>
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
