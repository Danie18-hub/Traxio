import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { submitClaim } from '@/src/lib/api';
import { Claim } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { ShieldAlert, Check, ArrowRight, ArrowLeft, Upload, FileText } from 'lucide-react';

export const ClaimsPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [claimType, setClaimType] = useState<Claim['type']>('Damaged Package');
  const [trackingNumber, setTrackingNumber] = useState('TRX1000000004');
  const [amount, setAmount] = useState('240.00');
  const [claimantName, setClaimantName] = useState('Dr. Jennifer Martinez');
  const [claimantEmail, setClaimantEmail] = useState('dr.martinez@austinhealth.org');
  const [claimantPhone, setClaimantPhone] = useState('+1 (512) 555-0842');
  const [evidenceDescription, setEvidenceDescription] = useState('Outer cardboard box was crushed in transit causing damage to laboratory instrumentation.');
  const [evidenceFileName, setEvidenceFileName] = useState<string | null>('damage_photos_terminal.pdf');
  const [confirmedClaim, setConfirmedClaim] = useState<Claim | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { success, error: toastError } = useToast();

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await submitClaim({
        type: claimType,
        trackingNumber,
        amount: parseFloat(amount) || 0,
        claimantName,
        claimantEmail,
        claimantPhone,
        evidenceDescription
      });
      setConfirmedClaim(result);
      setStep(4);
      success(`Claim ${result.claimNumber} filed successfully!`);
    } catch {
      toastError('Error submitting claim.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="File a Claim"
        subtitle="Submit claims for package loss, outer transit damage, missing contents, or guaranteed transit delivery delays."
        breadcrumbs={[
          { label: 'Support', href: '/support' },
          { label: 'File a Claim' }
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Stepper Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between">
            {[
              { s: 1, label: 'Claim Type' },
              { s: 2, label: 'Shipment Specs' },
              { s: 3, label: 'Evidence & Review' }
            ].map((item, idx) => (
              <div key={item.s} className="flex-1 flex flex-col items-center relative">
                {idx > 0 && (
                  <div
                    className={`absolute top-4 -left-1/2 w-full h-0.5 -z-0 ${
                      step >= item.s ? 'bg-[#0047AB]' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs relative z-10 transition-colors ${
                    step === item.s
                      ? 'bg-[#FF6700] text-white shadow-md'
                      : step > item.s
                      ? 'bg-[#0047AB] text-white'
                      : 'bg-white border-2 border-slate-300 text-slate-500'
                  }`}
                >
                  {step > item.s ? <Check className="w-4 h-4 stroke-[3]" /> : item.s}
                </div>
                <span className="text-xs font-semibold mt-2 text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Claim Type */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
              Select Claim Nature
            </h3>

            <div className="space-y-3">
              {[
                { type: 'Damaged Package', desc: 'Contents damaged, punctured, or crushed during courier transport.' },
                { type: 'Lost Package', desc: 'No scan updates for 7+ calendar days beyond committed delivery date.' },
                { type: 'Missing Contents', desc: 'Carton arrived with partial merchandise missing from original packing.' },
                { type: 'Delivery Delay (Guaranteed Service)', desc: 'Applicable to Traxio Overnight Air with Money-Back Service Guarantee.' }
              ].map((c) => (
                <div
                  key={c.type}
                  onClick={() => setClaimType(c.type as any)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    claimType === c.type
                      ? 'border-[#0047AB] bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      claimType === c.type ? 'border-[#0047AB] bg-[#0047AB]' : 'border-slate-300'
                    }`}
                  >
                    {claimType === c.type && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{c.type}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
              >
                Continue to Shipment Details &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Shipment Specs */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
              Shipment Identification & Claimant
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tracking Number *</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Claimed Amount ($ USD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Claimant Full Name *</label>
                <input
                  type="text"
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email *</label>
                <input
                  type="email"
                  value={claimantEmail}
                  onChange={(e) => setClaimantEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
              >
                Proceed to Evidence &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Evidence & Review */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
              Damage Description & Evidence
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Damage Description *</label>
              <textarea
                rows={3}
                value={evidenceDescription}
                onChange={(e) => setEvidenceDescription(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <div className="p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>{evidenceFileName ? `Attached: ${evidenceFileName}` : 'Upload photo or invoice PDF'}</span>
              </div>
              <label className="font-bold text-[#0047AB] cursor-pointer hover:underline">
                Upload Files
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEvidenceFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>

            <div className="p-4 bg-blue-50/70 rounded-xl text-xs space-y-1 text-slate-700">
              <div><strong>Claim Type:</strong> {claimType}</div>
              <div><strong>Tracking Number:</strong> {trackingNumber}</div>
              <div><strong>Claimed Amount:</strong> ${amount} USD</div>
              <div><strong>Claimant:</strong> {claimantName} ({claimantEmail})</div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="px-8 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md active:scale-95"
              >
                {submitting ? 'Submitting Claim...' : 'Review & Submit Formal Claim'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Claim Confirmation */}
        {step === 4 && confirmedClaim && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-[#3DDC97] text-white flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Claim Received</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your official claim docket number is{' '}
              <strong className="font-mono text-[#0047AB]">{confirmedClaim.claimNumber}</strong>. Our claims adjudication team reviews and renders decisions within 3 to 5 business days.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider"
              >
                File Another Claim
              </button>
              <a
                href="/support"
                className="px-5 py-2.5 rounded-lg bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider"
              >
                Return to Support Hub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
