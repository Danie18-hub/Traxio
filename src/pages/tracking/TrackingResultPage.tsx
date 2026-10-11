import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShipment } from '@/src/lib/api';
import { Shipment, TrackingEvent } from '@/src/lib/types';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { TrackForm } from '@/src/components/tracking/TrackForm';
import { LoadingSkeleton } from '@/src/components/ui/LoadingSkeleton';
import { useToast } from '@/src/components/ui/Toast';
import {
  Copy,
  Check,
  Bell,
  SlidersHorizontal,
  AlertCircle,
  HelpCircle,
  Package,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  UserCheck,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Printer
} from 'lucide-react';

export const TrackingResultPage: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [shipments, setShipments] = useState<(Shipment | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  
  // Email modal state
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [targetTrackingForEmail, setTargetTrackingForEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const { success, error: toastError } = useToast();

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!trackingNumber) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const rawNumbers = decodeURIComponent(trackingNumber)
        .split(/[\n,]+/)
        .map((n) => n.trim())
        .filter(Boolean);

      try {
        const results = await Promise.all(
          rawNumbers.map((num) => getShipment(num))
        );
        if (isMounted) {
          setShipments(results);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setLoading(false);
          toastError('Error retrieving package data. Please try again.');
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [trackingNumber]);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    success(`Tracking number ${num} copied to clipboard`);
    setTimeout(() => {
      setCopiedNumber(null);
    }, 2500);
  };

  const handleSubscribeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setEmailSubmitted(true);
    setTimeout(() => {
      setEmailModalOpen(false);
      setEmailSubmitted(false);
      setEmailInput('');
      success(`Email notifications activated for shipment ${targetTrackingForEmail}`);
    }, 1200);
  };

  const getProgressStageIndex = (status: string): number => {
    switch (status) {
      case 'Label Created':
        return 0;
      case 'Picked Up':
        return 1;
      case 'In Transit':
      case 'Delayed':
        return 2;
      case 'Out for Delivery':
        return 2; // In final transit / delivery leg
      case 'Delivered':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="flex-1 pb-20">
      <PageHeaderBand
        title="Tracking Details"
        subtitle="Real-time multi-modal courier milestones, signature records, and delivery schedule."
        breadcrumbs={[
          { label: 'Tracking', href: '/tracking' },
          { label: 'Results' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="space-y-6">
            <LoadingSkeleton rows={4} />
            <LoadingSkeleton rows={6} />
          </div>
        ) : shipments.length === 0 || shipments.every((s) => s === null) ? (
          /* Not Found State */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              No shipment records found
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              We couldn't locate any packages matching tracking number(s):{' '}
              <strong className="text-slate-900 font-mono">{trackingNumber}</strong>.
            </p>
            <div className="mt-6 p-4 bg-slate-50 rounded-xl text-left text-xs text-slate-600 space-y-2 border border-slate-200">
              <p className="font-semibold text-slate-900">Tips for tracking:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Verify your 12-13 character tracking format (e.g. TRX1000000001).</li>
                <li>Recently printed labels can take up to 30 minutes to appear in the national network.</li>
                <li>Make sure there are no unintended spaces or typos in the number.</li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Try another tracking number:</h3>
              <TrackForm variant="compact" />
            </div>
          </div>
        ) : (
          /* Multi-Shipment Summary & Result Cards */
          <div className="space-y-8">
            {/* Top Multi-Tracking Summary Row if > 1 shipments */}
            {shipments.length > 1 && (
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Shipment Summary ({shipments.length} packages queried)
                  </h2>
                  <p className="text-xs text-slate-500">
                    {shipments.filter((s) => s?.status === 'Delivered').length} Delivered,{' '}
                    {shipments.filter((s) => s?.status === 'In Transit' || s?.status === 'Out for Delivery').length} In Transit,{' '}
                    {shipments.filter((s) => s?.status === 'Delayed').length} Delayed
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print All Summaries</span>
                  </button>
                </div>
              </div>
            )}

            {/* Render Each Shipment Result Card */}
            {shipments.map((shipment, index) => {
              if (!shipment) {
                return (
                  <div key={index} className="p-6 rounded-xl bg-white border border-red-200 text-sm text-red-700 shadow-xs">
                    <strong>Package not found:</strong> One of the requested tracking numbers could not be validated in the Traxio courier database.
                  </div>
                );
              }

              const stageIdx = getProgressStageIndex(shipment.status);
              const stages = ['Label Created', 'Picked Up', 'In Transit', 'Delivered'];

              return (
                <div
                  key={shipment.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Card Header Band */}
                  <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Tracking Number & Copy */}
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Tracking Number
                          </span>
                          <StatusBadge status={shipment.status} size="md" />
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-[#0047AB] border border-blue-200">
                            {shipment.service}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-slate-900">
                            {shipment.trackingNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(shipment.trackingNumber)}
                            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                            title="Copy tracking number"
                            aria-label={`Copy tracking number ${shipment.trackingNumber}`}
                          >
                            {copiedNumber === shipment.trackingNumber ? (
                              <Check className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {shipment.referenceNumber && (
                          <p className="text-xs text-slate-500 mt-1">
                            Shipper Ref: <span className="font-mono font-medium text-slate-700">{shipment.referenceNumber}</span>
                          </p>
                        )}
                      </div>

                      {/* Delivery Date / Status Callout */}
                      <div className="lg:text-right bg-white lg:bg-transparent p-4 lg:p-0 rounded-xl border lg:border-0 border-slate-200">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          {shipment.status === 'Delivered' ? 'Actual Delivery' : 'Estimated Delivery'}
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                          {shipment.status === 'Delivered'
                            ? new Date(shipment.actualDelivery || shipment.estimatedDelivery).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            : new Date(shipment.estimatedDelivery).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                        </div>
                        <div className="text-xs font-medium text-slate-600 flex items-center lg:justify-end gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {shipment.deliveryWindow
                              ? shipment.deliveryWindow
                              : shipment.status === 'Delivered'
                              ? `Completed at ${new Date(shipment.actualDelivery || shipment.estimatedDelivery).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                              : 'By end of day'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 4-Stage Progress Bar */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <div className="relative">
                        {/* Desktop Horizontal Line */}
                        <div className="hidden sm:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1.5 bg-slate-200 rounded-full z-0" />
                        <div
                          className="hidden sm:block absolute top-1/2 left-0 -translate-y-1/2 h-1.5 bg-[#0047AB] rounded-full z-0 transition-all duration-500"
                          style={{
                            width: `${(stageIdx / (stages.length - 1)) * 100}%`
                          }}
                        />

                        {/* Stages Nodes */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                          {stages.map((stg, sIndex) => {
                            const isCompleted = sIndex <= stageIdx;
                            const isCurrent = sIndex === stageIdx;
                            const isDelivered = stg === 'Delivered' && shipment.status === 'Delivered';

                            let nodeColor = 'bg-white border-slate-300 text-slate-400';
                            if (isDelivered) {
                              nodeColor = 'bg-[#3DDC97] border-[#3DDC97] text-white shadow-md';
                            } else if (isCurrent) {
                              nodeColor = 'bg-[#FF6700] border-[#FF6700] text-white shadow-md';
                            } else if (isCompleted) {
                              nodeColor = 'bg-[#0047AB] border-[#0047AB] text-white';
                            }

                            return (
                              <div
                                key={stg}
                                className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2"
                              >
                                <div
                                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${nodeColor}`}
                                >
                                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : sIndex + 1}
                                </div>
                                <div>
                                  <div
                                    className={`text-xs font-bold ${
                                      isCurrent
                                        ? 'text-[#FF6700]'
                                        : isCompleted
                                        ? 'text-slate-900'
                                        : 'text-slate-400'
                                    }`}
                                  >
                                    {stg}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    {sIndex === 0 && 'Info received'}
                                    {sIndex === 1 && 'Carrier possession'}
                                    {sIndex === 2 && (shipment.status === 'Delayed' ? 'Transit hold' : 'En route to hub')}
                                    {sIndex === 3 && (shipment.signedBy ? `Signed: ${shipment.signedBy}` : 'Final destination')}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipment Content Grid: Details & Milestone Events */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Origin, Destination & Package Specs */}
                    <div className="space-y-6 lg:border-r lg:border-slate-200 lg:pr-8">
                      {/* Origin and Destination Card */}
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-[#0047AB] flex items-center justify-center shrink-0 mt-0.5">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                              Shipped From (Origin)
                            </span>
                            <div className="text-sm font-bold text-slate-900 mt-0.5">
                              {shipment.origin}
                            </div>
                            <div className="text-xs text-slate-500">
                              {shipment.sender.company || shipment.sender.name}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-200 pt-3 flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#0c7048] flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                              Delivery To (Destination)
                            </span>
                            <div className="text-sm font-bold text-slate-900 mt-0.5">
                              {shipment.destination}
                            </div>
                            <div className="text-xs text-slate-500">
                              {shipment.recipient.company || shipment.recipient.name}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Package Specs Table */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                          Shipment Specifications
                        </h4>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                          <div>
                            <dt className="text-slate-500">Total Weight</dt>
                            <dd className="font-semibold text-slate-900 mt-0.5">
                              {shipment.weight} {shipment.weightUnit}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Total Pieces</dt>
                            <dd className="font-semibold text-slate-900 mt-0.5">
                              {shipment.packages} package
                            </dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Dimensions</dt>
                            <dd className="font-semibold text-slate-900 mt-0.5">
                              {shipment.dimensions.length} × {shipment.dimensions.width} × {shipment.dimensions.height} {shipment.dimensions.unit}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Service Level</dt>
                            <dd className="font-semibold text-[#0047AB] mt-0.5">
                              {shipment.service}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Shipment Date</dt>
                            <dd className="font-semibold text-slate-900 mt-0.5">
                              {new Date(shipment.shipDate).toLocaleDateString()}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Direct Signature</dt>
                            <dd className="font-semibold text-slate-900 mt-0.5">
                              {shipment.signatureRequired ? 'Required' : 'Not required'}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Proof of Delivery / Signature note if delivered */}
                      {shipment.signedBy && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                          <div className="flex items-center gap-2 font-bold text-[#0c7048] mb-1">
                            <UserCheck className="w-4 h-4" />
                            <span>Verified Signature on File</span>
                          </div>
                          <p className="text-slate-700">
                            Signed for by: <strong className="font-mono text-slate-900">{shipment.signedBy}</strong>
                          </p>
                          <Link
                            to="/proof-of-delivery"
                            className="mt-2 inline-flex items-center gap-1 font-bold text-[#0047AB] hover:underline"
                          >
                            <span>Inspect official signature manifest</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}

                      {/* Action buttons row */}
                      <div className="space-y-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setTargetTrackingForEmail(shipment.trackingNumber);
                            setEmailModalOpen(true);
                          }}
                          className="w-full py-2.5 px-4 rounded-lg border border-slate-300 hover:border-[#0047AB] hover:text-[#0047AB] bg-white text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                        >
                          <Bell className="w-4 h-4 text-[#FF6700]" />
                          <span>Get updates by email</span>
                        </button>

                        <Link
                          to={`/manage-delivery?trk=${shipment.trackingNumber}`}
                          className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          <SlidersHorizontal className="w-4 h-4 text-[#0047AB]" />
                          <span>Manage delivery (Hold or Redirect)</span>
                        </Link>

                        <Link
                          to="/support/contact"
                          className="w-full py-2 px-4 text-center text-xs text-slate-500 hover:text-slate-800 block underline transition-colors"
                        >
                          Report a problem with this shipment
                        </Link>
                      </div>
                    </div>

                    {/* Right 2 Cols: Milestone Events Timeline */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <span>Shipment Travel History</span>
                          <span className="text-xs font-normal normal-case text-slate-500">
                            (Newest events first)
                          </span>
                        </h4>
                        <span className="text-xs text-slate-500">All times local</span>
                      </div>

                      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                        {shipment.events.map((evt, eIdx) => {
                          const isLatest = eIdx === 0;

                          let circleColor = 'bg-slate-300';
                          if (isLatest) {
                            circleColor = shipment.status === 'Delivered' ? 'bg-[#3DDC97] ring-4 ring-emerald-100' : 'bg-[#FF6700] ring-4 ring-orange-100';
                          }

                          const evtDate = new Date(evt.timestamp);

                          return (
                            <div key={evt.id} className="relative group">
                              {/* Dot */}
                              <div
                                className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ${circleColor} transition-all`}
                              />

                              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                                  <div className="font-extrabold text-slate-900 text-sm">
                                    {evt.description}
                                  </div>
                                  <div className="text-slate-500 font-mono text-[11px] shrink-0">
                                    {evtDate.toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}{' '}
                                    at{' '}
                                    {evtDate.toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </div>
                                </div>

                                <div className="mt-1 flex items-center gap-3 text-xs text-slate-600">
                                  <span className="flex items-center gap-1 font-medium">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                    {evt.location}
                                  </span>
                                  <span className="text-slate-300">•</span>
                                  <span className="font-semibold text-slate-700">
                                    Status: {evt.status}
                                  </span>
                                </div>

                                {evt.details && (
                                  <p className="mt-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-medium leading-relaxed">
                                    {evt.details}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Email Updates Subscription */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0047AB]/10 text-[#0047AB] flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Get Shipment Notifications</h3>
              </div>
              <button
                type="button"
                onClick={() => setEmailModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              We will send instant alert messages whenever the status of shipment{' '}
              <strong className="font-mono text-slate-900">{targetTrackingForEmail}</strong> changes,
              including out-for-delivery alerts and signature notices.
            </p>

            <form onSubmit={handleSubscribeEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                />
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-[#0047AB]" />
                  <span>Delivery Exception alerts (delays, rerouting)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-[#0047AB]" />
                  <span>Final delivery confirmation with POD photo</span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={emailSubmitted}
                  className="px-5 py-2.5 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs shadow-xs transition-colors uppercase tracking-wider"
                >
                  {emailSubmitted ? 'Subscribing...' : 'Confirm Notifications'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
