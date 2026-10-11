import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { getShipment } from '@/src/lib/api';
import { Shipment } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { RotateCcw, Package, Check, Printer, QrCode, ArrowRight, AlertCircle } from 'lucide-react';

export const ReturnsPage: React.FC = () => {
  const [query, setQuery] = useState('TRX1000000001');
  const [reason, setReason] = useState('Wrong item received or exchange');
  const [returnShipment, setReturnShipment] = useState<Shipment | null>(null);
  const [returnLabelGenerated, setReturnLabelGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getShipment(query);
      if (data) {
        setReturnShipment(data);
      } else {
        toastError('No shipment or order found matching that reference.');
      }
    } catch {
      toastError('Error validating return shipment.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLabel = () => {
    setReturnLabelGenerated(true);
    success('Prepaid return shipping label and QR drop code generated!');
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Manage a Return"
        subtitle="Generate prepaid return shipping labels, mobile QR drop codes, or schedule home courier package pickups."
        breadcrumbs={[
          { label: 'Shipping', href: '/shipping' },
          { label: 'Returns' }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Step-by-step explainer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0047AB] font-bold text-xs flex items-center justify-center mx-auto mb-2">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900">Locate Shipment</h3>
            <p className="text-xs text-slate-500 mt-1">Enter your original tracking or order reference ID.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0047AB] font-bold text-xs flex items-center justify-center mx-auto mb-2">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900">Choose Reason</h3>
            <p className="text-xs text-slate-500 mt-1">Select return reason and packaging type.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0047AB] font-bold text-xs flex items-center justify-center mx-auto mb-2">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900">Drop Off or Pickup</h3>
            <p className="text-xs text-slate-500 mt-1">Show QR code at any drop location with no printer needed.</p>
          </div>
        </div>

        {/* Lookup form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4">
            Look up Original Package for Return
          </h2>

          <form onSubmit={handleLookup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Original Tracking Number (e.g. TRX1000000001)
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason for Return
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  <option value="Wrong item received or exchange">Wrong item received or exchange</option>
                  <option value="Damaged in transit">Damaged in transit</option>
                  <option value="Defective or not as described">Defective or not as described</option>
                  <option value="No longer needed / buyer remorse">No longer needed / buyer remorse</option>
                </select>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
              >
                {loading ? 'Searching...' : 'Find Package'}
              </button>
            </div>
          </form>

          {/* Shipment found result */}
          {returnShipment && (
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900 text-sm">
                    {returnShipment.sender.company || returnShipment.sender.name}
                  </span>
                  <div className="text-slate-500 mt-0.5">
                    Original Tracking: <strong className="font-mono text-slate-900">{returnShipment.trackingNumber}</strong>
                  </div>
                  <div className="text-slate-500">
                    Return destination: {returnShipment.origin}
                  </div>
                </div>

                {!returnLabelGenerated ? (
                  <button
                    type="button"
                    onClick={handleGenerateLabel}
                    className="px-5 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs shrink-0"
                  >
                    Generate Return Label
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0">
                    <Check className="w-4 h-4" />
                    <span>Return Authorized</span>
                  </span>
                )}
              </div>

              {/* Generated Return Label / QR Code Preview */}
              {returnLabelGenerated && (
                <div className="p-6 bg-white border-2 border-dashed border-slate-300 rounded-xl text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto text-slate-800">
                    <QrCode className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Mobile Drop QR Code: TRX-RET-{returnShipment.trackingNumber.slice(3)}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-md mx-auto">
                      Simply bring this QR code on your mobile phone to any of our 12,000 Traxio drop points. The station agent will print and affix the prepaid label for free.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Label at Home</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
