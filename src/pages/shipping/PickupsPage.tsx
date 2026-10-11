import React, { useState, useEffect } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { getPickups, schedulePickup, cancelPickup } from '@/src/lib/api';
import { Pickup } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import {
  Calendar,
  Clock,
  Package,
  MapPin,
  Check,
  X,
  AlertCircle,
  Truck,
  Plus
} from 'lucide-react';

export const PickupsPage: React.FC = () => {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form
  const [name, setName] = useState('Alexander Wright');
  const [company, setCompany] = useState('Wright & Sons');
  const [address, setAddress] = useState('350 Madison Avenue, 10th Floor');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [postalCode, setPostalCode] = useState('10017');
  const [date, setDate] = useState('2026-10-12');
  const [timeWindow, setTimeWindow] = useState('13:00 - 17:00');
  const [packageCount, setPackageCount] = useState(3);
  const [estimatedWeightKg, setEstimatedWeightKg] = useState(12);
  const [locationType, setLocationType] = useState<Pickup['locationType']>('Office Reception');
  const [specialInstructions, setSpecialInstructions] = useState('Ring security intercom on 10th floor.');

  const { success, error: toastError } = useToast();

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {
    setLoading(true);
    try {
      const data = await getPickups();
      setPickups(data);
    } catch {
      toastError('Could not load scheduled pickups.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schedulePickup({
        address: {
          name,
          company,
          address,
          city,
          state,
          postalCode,
          country: 'United States',
          phone: '+1 (212) 555-3490'
        },
        date,
        timeWindow,
        packageCount: Number(packageCount),
        estimatedWeightKg: Number(estimatedWeightKg),
        locationType,
        specialInstructions
      });
      setShowModal(false);
      success('Courier pickup scheduled successfully!');
      loadPickups();
    } catch {
      toastError('Error scheduling pickup.');
    }
  };

  const handleCancel = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this scheduled pickup?')) {
      await cancelPickup(id);
      success('Pickup has been cancelled.');
      loadPickups();
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Schedule & Manage Pickups"
        subtitle="Request one-time or recurring courier pickups directly from your dock, office reception, or front porch."
        breadcrumbs={[
          { label: 'Shipping', href: '/shipping' },
          { label: 'Pickups' }
        ]}
        action={
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Pickup</span>
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Info card banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4 text-xs sm:text-sm text-slate-700">
          <Truck className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
          <p>
            Pickups can be booked until <strong>3:00 PM local time</strong> for same-day afternoon dispatch. All courier vehicles arrive with digital scanners and prepaid label printer docks upon request.
          </p>
        </div>

        {/* Pickups Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 font-bold text-sm text-slate-800 flex items-center justify-between">
            <span>Upcoming & Scheduled Courier Pickups</span>
            <span className="text-xs text-slate-500 font-normal">Showing latest appointments</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Pickup Ref #</th>
                  <th className="py-3 px-4 font-semibold">Date & Window</th>
                  <th className="py-3 px-4 font-semibold">Address & Contact</th>
                  <th className="py-3 px-4 font-semibold">Pieces / Weight</th>
                  <th className="py-3 px-4 font-semibold">Location Point</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {pickups.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0047AB]">
                      {p.pickupNumber}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-bold text-slate-900">{p.date}</div>
                      <div className="text-slate-500">{p.timeWindow}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-semibold text-slate-900">{p.address.name}</div>
                      <div className="text-slate-500">{p.address.address}, {p.address.city}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-medium text-slate-900">{p.packageCount} packages</div>
                      <div className="text-slate-500">~{p.estimatedWeightKg} kg</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                      {p.locationType}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          p.status === 'Scheduled'
                            ? 'bg-blue-100 text-[#0047AB]'
                            : p.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500 line-through'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {p.status === 'Scheduled' && (
                        <button
                          type="button"
                          onClick={() => handleCancel(p.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-semibold underline"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Schedule Pickup Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Schedule Courier Pickup</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">ZIP</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time Window</label>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="09:00 - 13:00">Morning (09:00 - 13:00)</option>
                    <option value="13:00 - 17:00">Afternoon (13:00 - 17:00)</option>
                    <option value="17:00 - 20:00">Evening Priority (17:00 - 20:00)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Package Count</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={packageCount}
                    onChange={(e) => setPackageCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Est. Weight (kg)</label>
                  <input
                    type="number"
                    min="1"
                    value={estimatedWeightKg}
                    onChange={(e) => setEstimatedWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Location Type</label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="Front Door / Porch">Front Door / Porch</option>
                  <option value="Office Reception">Office Reception</option>
                  <option value="Shipping Dock">Commercial Shipping Dock</option>
                  <option value="Mailroom">Building Mailroom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Special Driver Notes</label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Gate code, suite number, or loading dock number"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                >
                  Confirm Pickup Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
