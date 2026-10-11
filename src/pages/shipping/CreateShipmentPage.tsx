import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { createShipment, calculateRates } from '@/src/lib/api';
import { Shipment, RateQuote, ServiceType } from '@/src/lib/types';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { formatCurrency } from '@/src/lib/utils';
import { useToast } from '@/src/components/ui/Toast';
import {
  Package,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Printer,
  ShieldCheck,
  CreditCard,
  User,
  AlertCircle,
  Truck,
  Sparkles,
  QrCode
} from 'lucide-react';

export const CreateShipmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Addresses
  const [senderName, setSenderName] = useState('Alexander Wright');
  const [senderCompany, setSenderCompany] = useState('Wright Studio LLC');
  const [senderAddress, setSenderAddress] = useState('350 Madison Avenue, 10th Floor');
  const [senderCity, setSenderCity] = useState('New York');
  const [senderState, setSenderState] = useState('NY');
  const [senderZip, setSenderZip] = useState(searchParams.get('from') || '10017');
  const [senderCountry, setSenderCountry] = useState('United States');
  const [senderPhone, setSenderPhone] = useState('+1 (212) 555-3490');

  const [recipientName, setRecipientName] = useState('Dr. Marcus Sterling');
  const [recipientCompany, setRecipientCompany] = useState('Sterling Health Systems');
  const [recipientAddress, setRecipientAddress] = useState('9440 Santa Monica Blvd, Suite 300');
  const [recipientCity, setRecipientCity] = useState('Beverly Hills');
  const [recipientState, setRecipientState] = useState('CA');
  const [recipientZip, setRecipientZip] = useState(searchParams.get('to') || '90210');
  const [recipientCountry, setRecipientCountry] = useState('United States');
  const [recipientPhone, setRecipientPhone] = useState('+1 (310) 555-0921');

  // Step 2: Package
  const [packageType, setPackageType] = useState('Your Packaging');
  const [weight, setWeight] = useState(searchParams.get('weight') || '2.5');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [length, setLength] = useState('30');
  const [width, setWidth] = useState('20');
  const [height, setHeight] = useState('15');
  const [declaredValue, setDeclaredValue] = useState('250');
  const [signatureRequired, setSignatureRequired] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState('Deliver to front desk reception.');

  // Step 3: Service Selection
  const [selectedService, setSelectedService] = useState<RateQuote | null>(null);
  const [availableQuotes, setAvailableQuotes] = useState<RateQuote[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  // Step 4: Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'account'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  // Confirmation state
  const [createdShipment, setCreatedShipment] = useState<Shipment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load quotes when moving to step 3
  const handleProceedToStep3 = async () => {
    setLoadingQuotes(true);
    setStep(3);
    try {
      const quotes = await calculateRates({
        originCountry: senderCountry,
        originZip: senderZip,
        destCountry: recipientCountry,
        destZip: recipientZip,
        packageType: packageType as any,
        weight: parseFloat(weight) || 1,
        weightUnit,
        declaredValue: parseFloat(declaredValue) || 100,
        shipDate: new Date().toISOString(),
        signature: signatureRequired
      });
      setAvailableQuotes(quotes);
      // Auto-select standard or first quote
      const initial = quotes.find((q) => q.tag === 'Best Value') || quotes[0];
      setSelectedService(initial);
    } catch {
      toastError('Could not calculate real-time rates.');
    } finally {
      setLoadingQuotes(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!selectedService) return;
    setIsSubmitting(true);
    try {
      const result = await createShipment({
        status: 'Label Created',
        service: selectedService.serviceName,
        origin: `${senderCity}, ${senderState}, US`,
        destination: `${recipientCity}, ${recipientState}, US`,
        sender: {
          name: senderName,
          company: senderCompany,
          address: senderAddress,
          city: senderCity,
          state: senderState,
          postalCode: senderZip,
          country: senderCountry,
          phone: senderPhone
        },
        recipient: {
          name: recipientName,
          company: recipientCompany,
          address: recipientAddress,
          city: recipientCity,
          state: recipientState,
          postalCode: recipientZip,
          country: recipientCountry,
          phone: recipientPhone
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
        estimatedDelivery: selectedService.deliveryDate,
        signatureRequired,
        specialInstructions,
        referenceNumber: `PO-${Math.floor(100000 + Math.random() * 900000)}`,
        declaredValue: parseFloat(declaredValue) || 0,
        initialEventText: 'Electronic shipping data received. Label generated; awaiting dispatch.'
      });

      setCreatedShipment(result);
      setStep(5); // Confirmation
      success(`Shipment created successfully! Tracking #: ${result.trackingNumber}`);
    } catch {
      toastError('Error creating shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 pb-20">
      <PageHeaderBand
        title="Create a Shipment"
        subtitle="Prepare domestic & international labels, schedule commercial pickups, and print official airbills."
        breadcrumbs={[
          { label: 'Shipping', href: '/shipping' },
          { label: 'Create Shipment' }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Step Indicator (Steps 1-4) */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[
                { s: 1, label: 'Addresses' },
                { s: 2, label: 'Package' },
                { s: 3, label: 'Service' },
                { s: 4, label: 'Payment' }
              ].map((item, idx) => (
                <div key={item.s} className="flex-1 flex flex-col items-center relative">
                  {idx > 0 && (
                    <div
                      className={`absolute top-4 -left-1/2 w-full h-0.5 -z-0 transition-colors ${
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
                  <span
                    className={`text-xs font-semibold mt-2 ${
                      step === item.s ? 'text-[#0047AB]' : 'text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Addresses */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sender Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0047AB] flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                    Sender Information (From)
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    value={senderCompany}
                    onChange={(e) => setSenderCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={senderCity}
                      onChange={(e) => setSenderCity(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State / Prov *</label>
                    <input
                      type="text"
                      value={senderState}
                      onChange={(e) => setSenderState(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      value={senderZip}
                      onChange={(e) => setSenderZip(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0c7048] flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                    Recipient Information (To)
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    value={recipientCompany}
                    onChange={(e) => setRecipientCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={recipientCity}
                      onChange={(e) => setRecipientCity(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State / Prov *</label>
                    <input
                      type="text"
                      value={recipientState}
                      onChange={(e) => setRecipientState(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      value={recipientZip}
                      onChange={(e) => setRecipientZip(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Addresses are automatically normalized and verified against postal databases.
              </span>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center gap-2 uppercase tracking-wider shadow-xs"
              >
                <span>Continue to Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Package Specs */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
              Package Details & Custom Declarations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Packaging Type
                </label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  <option value="Your Packaging">Your Custom Box</option>
                  <option value="Traxio Box Small">Traxio Box Small (up to 5 kg)</option>
                  <option value="Traxio Box Medium">Traxio Box Medium (up to 12 kg)</option>
                  <option value="Traxio Box Large">Traxio Box Large (up to 25 kg)</option>
                  <option value="Traxio Envelope">Traxio Express Document Envelope</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Weight ({weightUnit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Dimensions (L × W × H in cm)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="L"
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 text-xs text-center"
                  />
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="W"
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 text-xs text-center"
                  />
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="H"
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 text-xs text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Declared Value ($ USD)
                </label>
                <input
                  type="number"
                  value={declaredValue}
                  onChange={(e) => setDeclaredValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Special Delivery Instructions (e.g. gate code, suite number)
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer font-semibold">
                <input
                  type="checkbox"
                  checked={signatureRequired}
                  onChange={(e) => setSignatureRequired(e.target.checked)}
                  className="rounded text-[#0047AB]"
                />
                <span>Require direct physical recipient signature upon delivery</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Addresses</span>
              </button>
              <button
                type="button"
                onClick={handleProceedToStep3}
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center gap-2 uppercase tracking-wider shadow-xs"
              >
                <span>Select Service Level</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Service Selection */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
              Select Traxio Transit Speed & Service
            </h3>

            {loadingQuotes ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-4 border-[#0047AB] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-slate-600">Retrieving guaranteed rates...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {availableQuotes.map((q) => {
                  const isSelected = selectedService?.serviceId === q.serviceId;
                  return (
                    <div
                      key={q.serviceId}
                      onClick={() => setSelectedService(q)}
                      className={`p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#0047AB] bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#0047AB] bg-[#0047AB]' : 'border-slate-400'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm sm:text-base">
                              {q.serviceName}
                            </span>
                            {q.tag && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FF6700] text-white">
                                {q.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Delivers by {q.deliveryDate} ({q.deliveryTime}) • {q.estimatedDays}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xl font-black text-[#0047AB]">
                          {formatCurrency(q.total)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Package</span>
              </button>
              <button
                type="button"
                disabled={!selectedService}
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm rounded-lg flex items-center gap-2 uppercase tracking-wider shadow-xs disabled:opacity-50"
              >
                <span>Continue to Review & Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Payment */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
              Review Shipment & Payment Summary
            </h3>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Origin (Shipper)
                </span>
                <p className="font-bold text-slate-900">{senderName}</p>
                <p className="text-slate-600">{senderAddress}, {senderCity}, {senderState} {senderZip}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Destination (Recipient)
                </span>
                <p className="font-bold text-slate-900">{recipientName}</p>
                <p className="text-slate-600">{recipientAddress}, {recipientCity}, {recipientState} {recipientZip}</p>
              </div>
            </div>

            {/* Cost breakdown */}
            {selectedService && (
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Selected Service Level:</span>
                  <span className="font-bold text-[#0047AB]">{selectedService.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Transportation Base:</span>
                  <span className="font-mono">{formatCurrency(selectedService.baseRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Fuel Surcharge:</span>
                  <span className="font-mono">{formatCurrency(selectedService.fuelSurcharge)}</span>
                </div>
                {selectedService.signatureFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Direct Signature Fee:</span>
                    <span className="font-mono">{formatCurrency(selectedService.signatureFee)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-blue-200 text-sm font-extrabold text-slate-900">
                  <span>Total Amount Due:</span>
                  <span className="font-mono text-xl text-[#0047AB]">{formatCurrency(selectedService.total)}</span>
                </div>
              </div>
            )}

            {/* Mock Payment Fields */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Payment Method (Demo checkout)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'border-[#0047AB] bg-blue-50 text-[#0047AB]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('account')}
                  className={`p-3 rounded-lg border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                    paymentMethod === 'account'
                      ? 'border-[#0047AB] bg-blue-50 text-[#0047AB]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Traxio Account Billing</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Service</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="px-8 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-extrabold text-sm rounded-lg flex items-center gap-2 uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                <span>{isSubmitting ? 'Generating Label...' : 'Authorize & Print Label'}</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Printable Shipping Label & Confirmation Preview */}
        {step === 5 && createdShipment && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#3DDC97] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Shipment Booked Successfully!
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Your tracking number is ready for drop-off or driver pickup.
              </p>
              <div className="mt-4 inline-block bg-white px-5 py-2.5 rounded-xl border border-emerald-300 shadow-xs">
                <span className="text-xs text-slate-500 uppercase tracking-wider block">Assigned Tracking Number</span>
                <span className="text-2xl font-black font-mono text-[#0047AB]">
                  {createdShipment.trackingNumber}
                </span>
              </div>
            </div>

            {/* Printable Shipping Label Preview Component */}
            <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 sm:p-8 shadow-xl max-w-lg mx-auto print:border-black">
              {/* Airbill Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0047AB] text-white font-black text-lg flex items-center justify-center rounded">
                    T
                  </div>
                  <span className="text-xl font-black tracking-tight text-[#0047AB]">TRAXIO</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black uppercase tracking-wider">{createdShipment.service}</div>
                  <div className="text-[10px] text-slate-500 font-mono">PRIORITY AIRBILL #8849</div>
                </div>
              </div>

              {/* Addresses section on label */}
              <div className="py-4 border-b-2 border-black grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-[9px] font-bold uppercase text-slate-500">SHIP FROM:</div>
                  <div className="font-bold">{createdShipment.sender.name}</div>
                  <div>{createdShipment.sender.company}</div>
                  <div>{createdShipment.sender.address}</div>
                  <div>{createdShipment.sender.city}, {createdShipment.sender.state} {createdShipment.sender.postalCode}</div>
                </div>
                <div className="border-l pl-4 border-slate-300">
                  <div className="text-[9px] font-bold uppercase text-slate-500">SHIP TO:</div>
                  <div className="font-bold text-sm">{createdShipment.recipient.name}</div>
                  <div>{createdShipment.recipient.company}</div>
                  <div className="font-bold">{createdShipment.recipient.address}</div>
                  <div className="font-bold">{createdShipment.recipient.city}, {createdShipment.recipient.state} {createdShipment.recipient.postalCode}</div>
                </div>
              </div>

              {/* Weight & Service spec */}
              <div className="py-2.5 border-b-2 border-black flex items-center justify-between text-xs font-mono">
                <div>ACTUAL WT: {createdShipment.weight} KG</div>
                <div>PCS: 1 OF 1</div>
                <div>DIM: 30x20x15 CM</div>
              </div>

              {/* Big barcode representation visual */}
              <div className="py-6 text-center">
                <div className="h-16 flex items-center justify-center gap-0.5 bg-slate-900 p-2 rounded">
                  {/* Stylized barcode lines */}
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-full bg-white"
                      style={{
                        width: `${(i % 5 === 0 ? 3 : i % 2 === 0 ? 2 : 1)}px`,
                        marginRight: `${(i % 3 === 0 ? 3 : 1)}px`
                      }}
                    />
                  ))}
                </div>
                <div className="font-mono font-bold tracking-widest text-sm text-slate-900 mt-2">
                  *{createdShipment.trackingNumber}*
                </div>
              </div>

              {/* Footer of label */}
              <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>DEP: JFK-ORD-LAX</span>
                <span>SIGNATURE REQ: {createdShipment.signatureRequired ? 'YES' : 'NO'}</span>
                <span>OCT 2026</span>
              </div>
            </div>

            {/* Actions for this label */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-md uppercase tracking-wider"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Shipping Label</span>
              </button>

              <Link
                to={`/track/${createdShipment.trackingNumber}`}
                className="px-6 py-3 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-sm flex items-center gap-2 shadow-md uppercase tracking-wider"
              >
                <span>Track This Package Live</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shipping/pickups"
                className="px-5 py-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm"
              >
                Schedule Courier Pickup
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
