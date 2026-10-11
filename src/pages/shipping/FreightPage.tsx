import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { useToast } from '@/src/components/ui/Toast';
import { Truck, Package, Shield, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

export const FreightPage: React.FC = () => {
  const [freightType, setFreightType] = useState('LTL (Less Than Truckload)');
  const [originZip, setOriginZip] = useState('');
  const [destZip, setDestZip] = useState('');
  const [palletCount, setPalletCount] = useState('2');
  const [totalWeight, setTotalWeight] = useState('850');
  const [liftgateRequired, setLiftgateRequired] = useState(true);
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      success('Freight quote request submitted! A commercial logistics dispatcher will reply within 30 minutes.');
      setSubmitted(false);
      setOriginZip('');
      setDestZip('');
      setContactEmail('');
    }, 1200);
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Freight & Heavy Cargo Logistics"
        subtitle="Less-Than-Truckload (LTL), Full Truckload (FTL), Air Cargo Charter, and Intermodal Container Transport."
        breadcrumbs={[
          { label: 'Shipping', href: '/shipping' },
          { label: 'Freight' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Freight Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Traxio Priority LTL</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Palletized shipments from 70 kg up to 10,000 kg. Scheduled cross-dock network with guaranteed delivery windows and liftgate service.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Dedicated Full Truckload (FTL)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exclusive-use 53ft dry vans, refrigerated reefers, and flatbeds for high-volume manufacturing distribution.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Air Cargo Express</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Next-flight-out palletized air cargo on main deck freighters for urgent industrial machinery, aerospace, and medical inventory.
            </p>
          </div>
        </div>

        {/* Quote Request Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Request a Custom Freight Quote</h2>
          <p className="text-xs text-slate-600 mb-6">
            Complete the load parameters below for a fast rate estimate and dedicated logistics dispatcher allocation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Freight Service Mode</label>
                <select
                  value={freightType}
                  onChange={(e) => setFreightType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="LTL (Less Than Truckload)">LTL (Less Than Truckload)</option>
                  <option value="FTL (Full Truckload)">FTL (Full Truckload)</option>
                  <option value="Air Freight Priority">Air Freight Cargo</option>
                  <option value="Refrigerated Reefer">Temperature Controlled Reefer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Standard Pallets</label>
                <input
                  type="number"
                  min="1"
                  value={palletCount}
                  onChange={(e) => setPalletCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Origin Postal Code</label>
                <input
                  type="text"
                  value={originZip}
                  onChange={(e) => setOriginZip(e.target.value)}
                  placeholder="e.g. 60606"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Postal Code</label>
                <input
                  type="text"
                  value={destZip}
                  onChange={(e) => setDestZip(e.target.value)}
                  placeholder="e.g. 75201"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Weight (kg)</label>
                <input
                  type="number"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="logistics@company.com"
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={liftgateRequired}
                  onChange={(e) => setLiftgateRequired(e.target.checked)}
                  className="rounded text-[#0047AB]"
                />
                <span>Requires hydraulic liftgate loading at pickup and delivery sites</span>
              </label>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                disabled={submitted}
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
              >
                {submitted ? 'Submitting...' : 'Request Instant Freight Quote'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
