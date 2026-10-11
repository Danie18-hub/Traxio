import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { getShipment, redirectShipment, holdShipmentAtLocation, rescheduleDelivery } from '@/src/lib/api';
import { Shipment } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import {
  SlidersHorizontal,
  MapPin,
  Calendar,
  Store,
  Palmtree,
  FileText,
  Check,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const ManageDeliveryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('trk') || 'TRX1000000003');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<'redirect' | 'hold' | 'reschedule' | 'instructions' | null>(null);

  // Redirect form state
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Reschedule date
  const [newDate, setNewDate] = useState('2026-10-12');

  // Delivery instructions
  const [notes, setNotes] = useState('Please leave behind brick planter by back porch door.');

  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getShipment(trackingNumber);
      if (data) {
        setShipment(data);
        setActiveAction('hold');
      } else {
        toastError('No shipment found with that tracking number.');
      }
    } catch {
      toastError('Error retrieving shipment.');
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteRedirect = async () => {
    if (!shipment) return;
    try {
      await redirectShipment(shipment.trackingNumber, {
        name: shipment.recipient.name,
        address: newStreet || '450 Lexington Ave',
        city: newCity || 'New York',
        state: newState || 'NY',
        postalCode: newZip || '10017',
        country: 'United States'
      });
      success('Shipment delivery address redirected successfully!');
      navigate(`/track/${shipment.trackingNumber}`);
    } catch {
      toastError('Could not execute address redirect.');
    }
  };

  const handleExecuteHold = async () => {
    if (!shipment) return;
    try {
      await holdShipmentAtLocation(shipment.trackingNumber, 'loc-01');
      success('Package successfully placed on Hold at Location (HAL) at Traxio Express Center!');
      navigate(`/track/${shipment.trackingNumber}`);
    } catch {
      toastError('Could not set hold at location.');
    }
  };

  const handleExecuteReschedule = async () => {
    if (!shipment) return;
    try {
      await rescheduleDelivery(shipment.trackingNumber, newDate);
      success(`Delivery date rescheduled to ${newDate}!`);
      navigate(`/track/${shipment.trackingNumber}`);
    } catch {
      toastError('Could not reschedule delivery appointment.');
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Manage Your Delivery"
        subtitle="Customize parcel delivery options: redirect address, hold at a secure counter, or reschedule arrival."
        breadcrumbs={[
          { label: 'Tracking', href: '/tracking' },
          { label: 'Manage Delivery' }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Lookup Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3">
            Enter Package Tracking Number
          </h2>
          <form onSubmit={handleLookup} className="flex gap-3">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g. TRX1000000003"
              required
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
            >
              {loading ? 'Validating...' : 'Manage Parcel'}
            </button>
          </form>

          {shipment && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-900 text-sm">
                    Shipment {shipment.trackingNumber} ({shipment.status})
                  </span>
                  <div className="text-slate-500 mt-0.5">
                    Destination: <strong>{shipment.destination}</strong> • Recipient: {shipment.recipient.name}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-700">Estimated Delivery:</span>
                  <div className="font-bold text-[#0047AB] text-sm">
                    {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Panels once shipment is found */}
        {shipment && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider">
              Available Delivery Adjustments
            </h3>

            {/* Action Choice Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setActiveAction('hold')}
                className={`p-4 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                  activeAction === 'hold'
                    ? 'border-[#0047AB] bg-blue-50 text-[#0047AB]'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Store className="w-5 h-5 mx-auto mb-1.5 text-[#0047AB]" />
                <span>Hold at Location</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('redirect')}
                className={`p-4 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                  activeAction === 'redirect'
                    ? 'border-[#0047AB] bg-blue-50 text-[#0047AB]'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <MapPin className="w-5 h-5 mx-auto mb-1.5 text-[#FF6700]" />
                <span>Redirect Address</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('reschedule')}
                className={`p-4 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                  activeAction === 'reschedule'
                    ? 'border-[#0047AB] bg-blue-50 text-[#0047AB]'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Calendar className="w-5 h-5 mx-auto mb-1.5 text-[#3DDC97]" />
                <span>Reschedule Date</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('instructions')}
                className={`p-4 rounded-xl border-2 text-center text-xs font-bold transition-all ${
                  activeAction === 'instructions'
                    ? 'border-[#0047AB] bg-blue-50 text-[#0047AB]'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <FileText className="w-5 h-5 mx-auto mb-1.5 text-purple-600" />
                <span>Leave Instructions</span>
              </button>
            </div>

            {/* Action Form Panels */}
            {activeAction === 'hold' && (
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Hold at Traxio Express Center (HAL)</h4>
                <p className="text-slate-600">
                  Select a convenient authorized pickup point. Package will be held for up to 14 calendar days. Pick up with valid photo ID.
                </p>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">Traxio Express Center - Downtown Hub</strong>
                    <div className="text-slate-500">452 5th Avenue, New York, NY 10018</div>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Free</span>
                </div>
                <button
                  type="button"
                  onClick={handleExecuteHold}
                  className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                >
                  Confirm Hold at Location
                </button>
              </div>
            )}

            {activeAction === 'redirect' && (
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Reroute Package to New Street Address</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">New Street Address</label>
                    <input
                      type="text"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="e.g. 450 Lexington Ave, Suite 120"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="New York"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleExecuteRedirect}
                  className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                >
                  Save Redirect Address
                </button>
              </div>
            )}

            {activeAction === 'reschedule' && (
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Select New Delivery Date</h4>
                <div>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleExecuteReschedule}
                  className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                >
                  Confirm Delivery Date
                </button>
              </div>
            )}

            {activeAction === 'instructions' && (
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Driver Drop Instructions</h4>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    success('Driver instructions updated!');
                    navigate(`/track/${shipment.trackingNumber}`);
                  }}
                  className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                >
                  Transmit Instructions to Courier
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
