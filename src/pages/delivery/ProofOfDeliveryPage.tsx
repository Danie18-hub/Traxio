import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { getShipment } from '@/src/lib/api';
import { Shipment } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { FileCheck2, UserCheck, Printer, Camera, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProofOfDeliveryPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('TRX1000000001');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast, error: toastError } = useToast();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getShipment(trackingNumber);
      if (data) {
        setShipment(data);
      } else {
        toastError('No shipment found matching tracking number.');
      }
    } catch {
      toastError('Error retrieving POD record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Visual Proof of Delivery (POD)"
        subtitle="Retrieve photographic door placement confirmation and digital signature manifests for completed deliveries."
        breadcrumbs={[
          { label: 'Tracking', href: '/tracking' },
          { label: 'Proof of Delivery' }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Lookup form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleLookup} className="flex gap-3">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number (e.g. TRX1000000001 or TRX1000000007)..."
              required
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
            >
              {loading ? 'Retrieving...' : 'Lookup POD'}
            </button>
          </form>
        </div>

        {/* Results Card */}
        {shipment && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-xs font-bold text-[#0c7048] flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> Delivered & Verified
                </span>
                <h3 className="text-xl font-black font-mono text-slate-900 mt-1">
                  {shipment.trackingNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official POD Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Delivery info & Signature record */}
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div>
                    <span className="text-slate-500">Delivery Date & Timestamp:</span>
                    <div className="font-bold text-slate-900 text-sm">
                      {new Date(shipment.actualDelivery || shipment.estimatedDelivery).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })} at {new Date(shipment.actualDelivery || shipment.estimatedDelivery).toLocaleTimeString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Delivered Location:</span>
                    <div className="font-semibold text-slate-900">{shipment.destination}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Recipient Name:</span>
                    <div className="font-semibold text-slate-900">{shipment.recipient.name}</div>
                  </div>
                </div>

                {shipment.signedBy ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#0c7048]">
                      <UserCheck className="w-4 h-4" />
                      <span>Digital Signature On Record</span>
                    </div>
                    <div className="h-16 bg-white rounded border border-emerald-300 p-2 flex items-center justify-center font-serif text-2xl italic text-slate-800 select-none">
                      {shipment.signedBy}
                    </div>
                    <p className="text-[11px] text-slate-500 text-center">
                      Digitally signed on mobile courier terminal #TRX-MD-8810
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="font-semibold text-[#0047AB]">Contactless Front Door Drop</div>
                    <p className="text-slate-600 mt-1">
                      No physical signature was required per shipper instructions. Photo verified by driver.
                    </p>
                  </div>
                )}
              </div>

              {/* Delivery Photo */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Camera className="w-4 h-4 text-[#FF6700]" />
                  <span>Courier Timestamped Drop Photo</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100">
                  <img
                    src={shipment.proofOfDeliveryImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'}
                    alt="Proof of delivery parcel photograph"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between px-1">
                  <span>GPS Lat: 40.7516, Lng: -73.9832</span>
                  <span>Photo ID: POD-IMG-{shipment.trackingNumber.slice(3)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
