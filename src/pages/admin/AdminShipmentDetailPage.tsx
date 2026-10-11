import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getShipment,
  updateShipment,
  addTrackingEvent,
  updateTrackingEvent,
  deleteTrackingEvent
} from '@/src/lib/api';
import { Shipment, TrackingEvent, ShipmentStatus } from '@/src/lib/types';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { useToast } from '@/src/components/ui/Toast';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Clock,
  MapPin,
  ExternalLink,
  Save,
  CheckCircle2,
  Eye
} from 'lucide-react';

export const AdminShipmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [status, setStatus] = useState<ShipmentStatus>('In Transit');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [signedBy, setSignedBy] = useState('');

  // Add Event Form
  const [eventStatus, setEventStatus] = useState<ShipmentStatus>('In Transit');
  const [eventLocation, setEventLocation] = useState('Chicago Sort Facility (ORD-01), IL');
  const [eventDescription, setEventDescription] = useState('Processed through automated cross-dock sortation');
  const [eventDetails, setEventDetails] = useState('');

  const { success, error: toastError } = useToast();

  useEffect(() => {
    loadShipment();
  }, [id]);

  const loadShipment = async () => {
    if (!id) return;
    setLoading(true);
    try {
      // id can be shipment id or tracking number
      const s = await getShipment(id);
      if (s) {
        setShipment(s);
        setStatus(s.status);
        setEstimatedDelivery(s.estimatedDelivery);
        setSignedBy(s.signedBy || '');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDetails = async () => {
    if (!shipment) return;
    try {
      const updated = await updateShipment(shipment.id, {
        status,
        estimatedDelivery,
        signedBy: signedBy || undefined
      });
      setShipment(updated);
      success('Shipment details updated successfully!');
    } catch {
      toastError('Could not update shipment details.');
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipment) return;
    try {
      const newEvt = await addTrackingEvent(shipment.id, {
        status: eventStatus,
        location: eventLocation,
        description: eventDescription,
        timestamp: new Date().toISOString(),
        details: eventDetails || undefined
      });
      success(`Milestone event added: "${eventDescription}"! Status updated to ${eventStatus}.`);
      setEventDescription('');
      setEventDetails('');
      loadShipment();
    } catch {
      toastError('Could not add tracking event.');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!shipment) return;
    if (window.confirm('Delete this milestone event?')) {
      await deleteTrackingEvent(shipment.id, eventId);
      success('Tracking event removed.');
      loadShipment();
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading shipment record...</div>;
  }

  if (!shipment) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-xl font-bold">Shipment Not Found</h2>
        <Link to="/admin/shipments" className="text-[#0047AB] font-bold underline">
          &larr; Back to Shipments Manager
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/admin/shipments"
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Shipments</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/track/${shipment.trackingNumber}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>Customer Track View</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>
        </div>
      </div>

      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black font-mono text-[#0047AB]">
              {shipment.trackingNumber}
            </span>
            <StatusBadge status={shipment.status} size="md" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Service: <strong>{shipment.service}</strong> • Shipped: {new Date(shipment.shipDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <div className="text-slate-500">Origin &rarr; Destination</div>
            <div className="font-bold text-slate-900">{shipment.origin} &rarr; {shipment.destination}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editable Properties (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
            Shipment Core Parameters
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Current Overall Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
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

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Estimated / Actual Delivery</label>
              <input
                type="text"
                value={estimatedDelivery}
                onChange={(e) => setEstimatedDelivery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Signed By (If Delivered)</label>
              <input
                type="text"
                value={signedBy}
                onChange={(e) => setSignedBy(e.target.value)}
                placeholder="e.g. J. MARTINEZ"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-slate-600">
              <div><strong>Sender:</strong> {shipment.sender.name} ({shipment.sender.address}, {shipment.sender.city})</div>
              <div><strong>Recipient:</strong> {shipment.recipient.name} ({shipment.recipient.address}, {shipment.recipient.city})</div>
              <div><strong>Weight:</strong> {shipment.weight} {shipment.weightUnit}</div>
              <div><strong>Reference:</strong> {shipment.referenceNumber || 'N/A'}</div>
            </div>

            <button
              type="button"
              onClick={handleSaveDetails}
              className="w-full py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Shipment Changes</span>
            </button>
          </div>
        </div>

        {/* Right Column: Tracking Events Manager (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Add New Event Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Append Tracking Milestone Event</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Live Broadcast
              </span>
            </h3>

            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">New Milestone Status</label>
                  <select
                    value={eventStatus}
                    onChange={(e) => setEventStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Terminal / Scan Location</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    required
                    placeholder="e.g. Dallas Hub (DFW-01), TX"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Description</label>
                <input
                  type="text"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                  placeholder="e.g. Loaded onto delivery vehicle or departed sorting facility"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exception / Weather Details (Optional)</label>
                <input
                  type="text"
                  value={eventDetails}
                  onChange={(e) => setEventDetails(e.target.value)}
                  placeholder="e.g. Interstate highway safety advisory hold"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 ml-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Push Milestone Event</span>
                </button>
              </div>
            </form>
          </div>

          {/* Current Milestone Events List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Customer Milestone History ({shipment.events.length} events)</span>
              <span className="text-[11px] text-slate-400 font-normal">Newest to oldest</span>
            </h3>

            <div className="space-y-3">
              {shipment.events.map((evt, idx) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{evt.description}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-[#0047AB] font-bold text-[10px]">
                        {evt.status}
                      </span>
                    </div>
                    <div className="text-slate-500 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.location}</span>
                      <span>•</span>
                      <span className="font-mono">{new Date(evt.timestamp).toLocaleString()}</span>
                    </div>
                    {evt.details && (
                      <div className="text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 font-medium">
                        {evt.details}
                      </div>
                    )}
                  </div>

                  {/* Delete event button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
