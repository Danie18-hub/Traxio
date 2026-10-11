import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createShipment } from '@/src/lib/api';
import { ServiceType, ShipmentStatus } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { ArrowLeft, Check, Package, Sparkles } from 'lucide-react';

export const AdminNewShipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [service, setService] = useState<ServiceType>('Traxio Priority Express');
  const [status, setStatus] = useState<ShipmentStatus>('In Transit');
  const [weight, setWeight] = useState('3.5');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [length, setLength] = useState('35');
  const [width, setWidth] = useState('25');
  const [height, setHeight] = useState('15');
  const [referenceNumber, setReferenceNumber] = useState(`PO-${Math.floor(100000 + Math.random() * 900000)}`);
  const [declaredValue, setDeclaredValue] = useState('300');
  const [signatureRequired, setSignatureRequired] = useState(true);
  const [initialEventText, setInitialEventText] = useState('Package received and scanned at automated sorting terminal.');

  // Sender
  const [senderName, setSenderName] = useState('Apex Technologies');
  const [senderAddress, setSenderAddress] = useState('1200 Industrial Parkway');
  const [senderCity, setSenderCity] = useState('Chicago');
  const [senderState, setSenderState] = useState('IL');
  const [senderZip, setSenderZip] = useState('60606');

  // Recipient
  const [recipientName, setRecipientName] = useState('Elena Rostova');
  const [recipientAddress, setRecipientAddress] = useState('500 Howard Street, Suite 400');
  const [recipientCity, setRecipientCity] = useState('San Francisco');
  const [recipientState, setRecipientState] = useState('CA');
  const [recipientZip, setRecipientZip] = useState('94105');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await createShipment({
        service,
        status,
        origin: `${senderCity}, ${senderState}, US`,
        destination: `${recipientCity}, ${recipientState}, US`,
        sender: {
          name: senderName,
          address: senderAddress,
          city: senderCity,
          state: senderState,
          postalCode: senderZip,
          country: 'United States',
          phone: '+1 (312) 555-0199'
        },
        recipient: {
          name: recipientName,
          address: recipientAddress,
          city: recipientCity,
          state: recipientState,
          postalCode: recipientZip,
          country: 'United States',
          phone: '+1 (415) 555-9011'
        },
        weight: parseFloat(weight) || 1,
        weightUnit,
        dimensions: {
          length: parseFloat(length) || 10,
          width: parseFloat(width) || 10,
          height: parseFloat(height) || 10,
          unit: 'cm'
        },
        packages: 1,
        shipDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 2 * 86400000).toISOString(),
        signatureRequired,
        referenceNumber,
        declaredValue: parseFloat(declaredValue) || 100,
        initialEventText
      });

      success(`Airbill created! Generated tracking number: ${created.trackingNumber}`);
      navigate(`/admin/shipments/${created.id}`);
    } catch {
      toastError('Error creating shipment in database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/shipments"
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shipments</span>
        </Link>
        <span className="text-xs text-slate-400 font-mono">Format: TRX + 10 digits auto-generated</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h1 className="text-xl font-black text-slate-900 pb-2 border-b border-slate-100">
          Manual Shipment & Airbill Creation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Classification & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Service Tier</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="Traxio Overnight Air">Traxio Overnight Air</option>
                <option value="Traxio Priority Express">Traxio Priority Express</option>
                <option value="Traxio Standard Express">Traxio Standard Express</option>
                <option value="Traxio Economy Ground">Traxio Economy Ground</option>
                <option value="Traxio Freight Priority">Traxio Freight Priority</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Initial Status</label>
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
              <label className="block font-bold text-slate-700 uppercase mb-1">Reference Code / PO #</label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
              />
            </div>
          </div>

          {/* Shipper & Recipient addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 text-xs">
            <div className="space-y-3">
              <span className="font-bold text-[#0047AB] uppercase tracking-wider block">Origin (Shipper)</span>
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">Sender Name / Entity</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">Street Address</label>
                <input
                  type="text"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={senderCity}
                  onChange={(e) => setSenderCity(e.target.value)}
                  placeholder="City"
                  required
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                />
                <input
                  type="text"
                  value={senderState}
                  onChange={(e) => setSenderState(e.target.value)}
                  placeholder="State"
                  required
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                />
                <input
                  type="text"
                  value={senderZip}
                  onChange={(e) => setSenderZip(e.target.value)}
                  placeholder="ZIP"
                  required
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-bold text-[#FF6700] uppercase tracking-wider block">Destination (Consignee)</span>
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">Recipient Name / Entity</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">Street Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={recipientCity}
                  onChange={(e) => setRecipientCity(e.target.value)}
                  placeholder="City"
                  required
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                />
                <input
                  type="text"
                  value={recipientState}
                  onChange={(e) => setRecipientState(e.target.value)}
                  placeholder="State"
                  required
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                />
                <input
                  type="text"
                  value={recipientZip}
                  onChange={(e) => setRecipientZip(e.target.value)}
                  placeholder="ZIP"
                  required
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Package Weight & First Milestone Event */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weight ({weightUnit})</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Declared Value ($)</label>
              <input
                type="number"
                value={declaredValue}
                onChange={(e) => setDeclaredValue(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Direct Signature</label>
              <select
                value={signatureRequired ? 'yes' : 'no'}
                onChange={(e) => setSignatureRequired(e.target.value === 'yes')}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="yes">Direct Signature Required</option>
                <option value="no">Contactless Porch Release Allowed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Initial Milestone Event Description
            </label>
            <input
              type="text"
              value={initialEventText}
              onChange={(e) => setInitialEventText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link to="/admin/shipments" className="px-4 py-2 text-xs font-semibold text-slate-600">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md"
            >
              {loading ? 'Generating Airbill...' : 'Create & Generate Tracking Number'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
