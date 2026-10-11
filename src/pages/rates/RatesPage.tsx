import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { calculateRates } from '@/src/lib/api';
import { RateRequest, RateQuote } from '@/src/lib/types';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import { FAQAccordion } from '@/src/components/ui/FAQAccordion';
import { LoadingSkeleton } from '@/src/components/ui/LoadingSkeleton';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { formatCurrency } from '@/src/lib/utils';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  Check,
  Scale,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const RatesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Form inputs
  const [originCountry, setOriginCountry] = useState('United States');
  const [originZip, setOriginZip] = useState(searchParams.get('from') || '10001');
  const [destCountry, setDestCountry] = useState('United States');
  const [destZip, setDestZip] = useState(searchParams.get('to') || '90210');
  const [packageType, setPackageType] = useState<RateRequest['packageType']>('Your Packaging');
  
  // Weight & Units
  const [weight, setWeight] = useState(searchParams.get('weight') || '2.5');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  // Dimensions & Units
  const [length, setLength] = useState('30');
  const [width, setWidth] = useState('20');
  const [height, setHeight] = useState('15');
  const [dimensionUnit, setDimensionUnit] = useState<'cm' | 'in'>('cm');

  // Add-ons
  const [declaredValue, setDeclaredValue] = useState('150');
  const [shipDate, setShipDate] = useState('2026-10-10');
  const [residential, setResidential] = useState(false);
  const [signature, setSignature] = useState(false);
  const [insurance, setInsurance] = useState(false);

  // States
  const [quotes, setQuotes] = useState<RateQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openBreakdowns, setOpenBreakdowns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // If query params are provided, auto-calculate
    if (searchParams.get('from') && searchParams.get('to')) {
      handleCalculate();
    }
  }, []);

  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const numWeight = parseFloat(weight);
    if (isNaN(numWeight) || numWeight <= 0) {
      setError('Please specify a valid package weight greater than zero.');
      return;
    }

    const weightInKg = weightUnit === 'lbs' ? numWeight * 0.453592 : numWeight;
    if (weightInKg > 70) {
      setError('Standard courier service limit is 70 kg (154 lbs). For heavier cargo, please request a Freight quote.');
      return;
    }

    setLoading(true);

    try {
      const results = await calculateRates({
        originCountry,
        originZip,
        destCountry,
        destZip,
        packageType,
        weight: numWeight,
        weightUnit,
        length: parseFloat(length),
        width: parseFloat(width),
        height: parseFloat(height),
        dimensionUnit,
        declaredValue: parseFloat(declaredValue) || 0,
        shipDate,
        residential,
        signature,
        insurance
      });
      setQuotes(results);
    } catch (err: any) {
      setError(err?.message || 'Could not calculate delivery rates for this route.');
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleBreakdown = (serviceId: string) => {
    setOpenBreakdowns((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handleSelectAndShip = (quote: RateQuote) => {
    navigate(
      `/shipping/create?service=${encodeURIComponent(quote.serviceName)}&from=${encodeURIComponent(originZip)}&to=${encodeURIComponent(destZip)}&weight=${weight}`
    );
  };

  const rateFaqs = [
    {
      question: 'What is dimensional (volumetric) weight?',
      answer: 'Dimensional weight reflects package density and the space it occupies inside an aircraft or courier van. It is calculated as (Length × Width × Height) / 5000 in metric centimeters. Traxio bills based on whichever is greater: actual scale weight or dimensional weight.'
    },
    {
      question: 'Why does fuel surcharge change over time?',
      answer: 'Fuel surcharges adjust weekly in direct correlation with the US Department of Energy Gulf Coast kerosene jet fuel index and national highway diesel prices. Our fuel surcharge table is publicly updated every Monday.'
    },
    {
      question: 'Are published delivery dates guaranteed?',
      answer: 'Yes! Traxio Overnight Air and Traxio Priority Express carry our 100% On-Time Money-Back Guarantee. If the package arrives after the committed window, we refund the transportation charges.'
    },
    {
      question: 'How do residential vs commercial delivery rates differ?',
      answer: 'Residential deliveries involve dedicated neighborhood drop routes and home verification, incurring a modest $4.85 surcharge per shipment unless shipped via Traxio OneRate.'
    },
    {
      question: 'What is declared value coverage?',
      answer: 'Every standard shipment includes up to $100 in complimentary declared value coverage against loss or transit damage. Additional coverage can be added for $1.20 per $100 of value.'
    }
  ];

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Rates & Delivery Times"
        subtitle="Compare transit speeds and transparent pricing for domestic express, ground, and international air shipping."
        breadcrumbs={[{ label: 'Rates' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <Calculator className="w-5 h-5 text-[#0047AB]" />
              <h2 className="text-lg font-bold text-slate-900">Shipment Specifications</h2>
            </div>

            <form onSubmit={handleCalculate} className="space-y-5">
              {/* Origin and Destination ZIP */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Origin ZIP / City
                  </label>
                  <input
                    type="text"
                    value={originZip}
                    onChange={(e) => setOriginZip(e.target.value)}
                    placeholder="e.g. 10001 or New York, NY"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Destination ZIP / City
                  </label>
                  <input
                    type="text"
                    value={destZip}
                    onChange={(e) => setDestZip(e.target.value)}
                    placeholder="e.g. 90210 or Beverly Hills, CA"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>
              </div>

              {/* Package Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Packaging Type
                </label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                >
                  <option value="Your Packaging">Your Custom Packaging</option>
                  <option value="Traxio Box Small">Traxio Box Small (up to 5 kg)</option>
                  <option value="Traxio Box Medium">Traxio Box Medium (up to 12 kg)</option>
                  <option value="Traxio Box Large">Traxio Box Large (up to 25 kg)</option>
                  <option value="Traxio Envelope">Traxio Express Envelope (docs)</option>
                </select>
              </div>

              {/* Weight & kg/lb Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Total Weight (Max 70 kg)
                  </label>
                  <div className="inline-flex rounded-md p-0.5 bg-slate-100 border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setWeightUnit('kg')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        weightUnit === 'kg' ? 'bg-[#0047AB] text-white' : 'text-slate-600'
                      }`}
                    >
                      kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeightUnit('lbs')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        weightUnit === 'lbs' ? 'bg-[#0047AB] text-white' : 'text-slate-600'
                      }`}
                    >
                      lbs
                    </button>
                  </div>
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="154"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0.0"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                />
              </div>

              {/* Dimensions with cm/in Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Dimensions (L × W × H)
                  </label>
                  <div className="inline-flex rounded-md p-0.5 bg-slate-100 border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setDimensionUnit('cm')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        dimensionUnit === 'cm' ? 'bg-[#0047AB] text-white' : 'text-slate-600'
                      }`}
                    >
                      cm
                    </button>
                    <button
                      type="button"
                      onClick={() => setDimensionUnit('in')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        dimensionUnit === 'in' ? 'bg-[#0047AB] text-white' : 'text-slate-600'
                      }`}
                    >
                      in
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Length"
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs text-center focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Width"
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs text-center focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height"
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs text-center focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>
              </div>

              {/* Ship Date & Declared Value */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ship Date
                  </label>
                  <input
                    type="date"
                    value={shipDate}
                    onChange={(e) => setShipDate(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Declared Value ($)
                  </label>
                  <input
                    type="number"
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(e.target.value)}
                    placeholder="100"
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              {/* Service Checkboxes */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={residential}
                    onChange={(e) => setResidential(e.target.checked)}
                    className="rounded text-[#0047AB] focus:ring-[#0047AB]"
                  />
                  <span>Residential delivery address (+$4.85)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signature}
                    onChange={(e) => setSignature(e.target.checked)}
                    className="rounded text-[#0047AB] focus:ring-[#0047AB]"
                  />
                  <span>Direct physical signature required (+$5.95)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={insurance}
                    onChange={(e) => setInsurance(e.target.checked)}
                    className="rounded text-[#0047AB] focus:ring-[#0047AB]"
                  />
                  <span>Additional transit insurance protection</span>
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-start gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-extrabold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wider active:scale-98"
              >
                <span>{loading ? 'Calculating Rates...' : 'Calculate Delivery Rates'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Quotes & Results Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {loading ? (
              <div className="space-y-4">
                <LoadingSkeleton rows={4} />
                <LoadingSkeleton rows={4} />
              </div>
            ) : quotes.length === 0 ? (
              <EmptyState
                icon={Scale}
                title="Instant Rate Calculator"
                description="Enter your origin, destination zip codes, and package weight on the left to see live guaranteed rates and delivery schedules."
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {quotes.length} Available Services for {originZip} &rarr; {destZip}
                  </span>
                  <span className="text-xs text-slate-500">Sorted by delivery speed</span>
                </div>

                {quotes.map((quote) => {
                  const isBreakdownOpen = !!openBreakdowns[quote.serviceId];

                  return (
                    <div
                      key={quote.serviceId}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-[#0047AB] transition-all"
                    >
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Service Title & Badges */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {quote.tag && (
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${
                                    quote.tag === 'Fastest'
                                      ? 'bg-[#FF6700]'
                                      : quote.tag === 'Best Value'
                                      ? 'bg-[#0047AB]'
                                      : 'bg-emerald-600'
                                  }`}
                                >
                                  {quote.tag}
                                </span>
                              )}
                              <span className="text-xs font-semibold text-slate-500">
                                {quote.estimatedDays}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {quote.serviceName}
                            </h3>
                            <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>Delivers by: <strong>{quote.deliveryDate}</strong> ({quote.deliveryTime})</span>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="sm:text-right shrink-0">
                            <div className="text-2xl sm:text-3xl font-black text-[#0047AB]">
                              {formatCurrency(quote.total)}
                            </div>
                            <div className="text-[11px] text-slate-500">USD, all fees included</div>
                            <button
                              type="button"
                              onClick={() => handleSelectAndShip(quote)}
                              className="mt-3 w-full sm:w-auto px-4 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs rounded-lg transition-colors shadow-xs uppercase tracking-wider"
                            >
                              Select and ship
                            </button>
                          </div>
                        </div>

                        {/* Feature bullets */}
                        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                          {quote.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#3DDC97] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Collapsible Fee Breakdown Toggle */}
                        <div className="mt-4 pt-2">
                          <button
                            type="button"
                            onClick={() => toggleBreakdown(quote.serviceId)}
                            className="text-xs font-semibold text-[#0047AB] hover:underline flex items-center gap-1"
                          >
                            <span>Price Breakdown & Surcharges</span>
                            {isBreakdownOpen ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {isBreakdownOpen && (
                            <div className="mt-3 p-3.5 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-200">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Base Transportation Rate:</span>
                                <span className="font-mono font-medium">{formatCurrency(quote.baseRate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Indexed Fuel Surcharge (14.5%):</span>
                                <span className="font-mono font-medium">{formatCurrency(quote.fuelSurcharge)}</span>
                              </div>
                              {quote.residentialFee > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Residential Delivery Fee:</span>
                                  <span className="font-mono font-medium">{formatCurrency(quote.residentialFee)}</span>
                                </div>
                              )}
                              {quote.signatureFee > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Direct Signature Service:</span>
                                  <span className="font-mono font-medium">{formatCurrency(quote.signatureFee)}</span>
                                </div>
                              )}
                              {quote.insuranceFee > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Declared Value Transit Coverage:</span>
                                  <span className="font-mono font-medium">{formatCurrency(quote.insuranceFee)}</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900 text-sm">
                                <span>Estimated Total:</span>
                                <span className="font-mono text-[#0047AB]">{formatCurrency(quote.total)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="text-[11px] text-slate-500 bg-slate-100 p-3 rounded-lg leading-relaxed">
                  <strong>Estimate Disclaimer:</strong> Quoted rates are based on the specifications entered. Actual charges may vary based on terminal scale weight, declared value audits, customs fees for international shipments, or address correction surcharges.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Info Cards: How Rates are Calculated */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold text-[#0047AB] uppercase tracking-widest">Pricing Transparency</h2>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              How Traxio rates are calculated
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Scale vs Dimensional Weight</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We calculate both actual scale weight and dimensional displacement. The greater value determines the billing tier.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Transparent Surcharges</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Indexed fuel and residential fees are itemized openly with zero concealed terminal gate handling fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Commercial Volume Discounts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered account holders automatically earn 15% to 25% preferred contract discounts on published rates.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Rates Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={rateFaqs} />
        </div>
      </div>

      <CTABand />
    </div>
  );
};
