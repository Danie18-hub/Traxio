import React, { useState } from 'react';
import { useToast } from '@/src/components/ui/Toast';
import { Settings, Shield, Bell, Users, Save } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [carrierName, setCarrierName] = useState('Traxio Global Logistics Inc.');
  const [supportPhone, setSupportPhone] = useState('1-800-555-8729');
  const [fuelGroundRate, setFuelGroundRate] = useState('14.5%');
  const [fuelAirRate, setFuelAirRate] = useState('18.0%');
  const [autoSmsDispatch, setAutoSmsDispatch] = useState(true);
  const [autoPodEmail, setAutoPodEmail] = useState(true);

  const { success } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Network parameters and surcharge indices updated!');
  };

  const staffUsers = [
    { name: 'John Dispatcher', role: 'Super Admin', email: 'j.dispatcher@traxio-courier.com', station: 'Chicago Gateway (ORD-01)' },
    { name: 'Keith Reynolds', role: 'Station Dispatcher', email: 'k.reynolds@traxio-courier.com', station: 'Omaha Interchange (OMA-02)' },
    { name: 'Sarah Wu', role: 'Customer Desk Lead', email: 's.wu@traxio-courier.com', station: 'New York Central (JFK-02)' },
    { name: 'Alex Novak', role: 'Developer Relations', email: 'a.novak@traxio-courier.com', station: 'San Francisco SOMA' }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System & Network Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Configure global carrier authorities, indexed surcharge tables, and staff role permissions.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Network & Surcharge Parameters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
            Carrier Authority & Weekly Surcharge Indices
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Carrier Registered Entity</label>
              <input
                type="text"
                value={carrierName}
                onChange={(e) => setCarrierName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Global Customer Support Phone</label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weekly Ground Fuel Surcharge</label>
              <input
                type="text"
                value={fuelGroundRate}
                onChange={(e) => setFuelGroundRate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weekly Air Cargo Fuel Surcharge</label>
              <input
                type="text"
                value={fuelAirRate}
                onChange={(e) => setFuelAirRate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Automated Customer Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
            Automated Customer Webhook & Messaging Triggers
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <strong className="text-slate-900">Broadcast Out-for-Delivery SMS</strong>
                <p className="text-slate-500 text-[11px]">Send cellular SMS notice when driver scans loading manifest at 7:30 AM.</p>
              </div>
              <input
                type="checkbox"
                checked={autoSmsDispatch}
                onChange={(e) => setAutoSmsDispatch(e.target.checked)}
                className="rounded text-[#0047AB] w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <strong className="text-slate-900">Immediate Visual POD Email Dispatch</strong>
                <p className="text-slate-500 text-[11px]">Attach photo proof-of-delivery image to recipient email upon doorstep drop scan.</p>
              </div>
              <input
                type="checkbox"
                checked={autoPodEmail}
                onChange={(e) => setAutoPodEmail(e.target.checked)}
                className="rounded text-[#0047AB] w-4 h-4"
              />
            </label>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 ml-auto"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </div>
      </form>

      {/* Staff Roles & Permissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Authorized Logistics Personnel & Dispatch Staff
          </h3>
          <span className="text-xs text-slate-500 font-mono">Role-Based Access Control (RBAC)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Staff Member</th>
                <th className="py-3 px-4 font-semibold">Assigned Station Hub</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Role Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {staffUsers.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{u.station}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-[#0047AB]">
                      {u.role}
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
