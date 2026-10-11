import { RateRequest, RateQuote } from './types';

export async function calculateRates(input: RateRequest): Promise<RateQuote[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 450));

  const weightInKg = input.weightUnit === 'lbs' ? input.weight * 0.453592 : input.weight;

  // Max weight check 70 kg
  if (weightInKg > 70) {
    throw new Error('Maximum weight limit for standard courier services is 70 kg (154 lbs). Please use Traxio Freight for heavier shipments.');
  }

  // Base pricing factor
  const baseWeightFactor = Math.max(1, weightInKg);
  const isInternational = input.originCountry !== input.destCountry;
  const intlMultiplier = isInternational ? 2.4 : 1.0;

  // Ancillary fees
  const residentialFee = input.residential ? 4.85 : 0;
  const signatureFee = input.signature ? 5.95 : 0;
  const declaredVal = input.declaredValue || 0;
  const insuranceFee = input.insurance && declaredVal > 100 ? (declaredVal - 100) * 0.012 : 0;

  // Pricing calculations
  // 1. Overnight Air
  const overnightBase = Math.round((48.50 + baseWeightFactor * 8.20) * intlMultiplier * 100) / 100;
  const overnightFuel = Math.round(overnightBase * 0.145 * 100) / 100;
  const overnightTotal = Math.round((overnightBase + overnightFuel + residentialFee + signatureFee + insuranceFee) * 100) / 100;

  // 2. Priority Express
  const priorityBase = Math.round((32.00 + baseWeightFactor * 5.80) * intlMultiplier * 100) / 100;
  const priorityFuel = Math.round(priorityBase * 0.145 * 100) / 100;
  const priorityTotal = Math.round((priorityBase + priorityFuel + residentialFee + signatureFee + insuranceFee) * 100) / 100;

  // 3. Standard Express
  const standardBase = Math.round((21.50 + baseWeightFactor * 3.90) * intlMultiplier * 100) / 100;
  const standardFuel = Math.round(standardBase * 0.145 * 100) / 100;
  const standardTotal = Math.round((standardBase + standardFuel + residentialFee + signatureFee + insuranceFee) * 100) / 100;

  // 4. Economy Ground
  const economyBase = Math.round((14.20 + baseWeightFactor * 2.10) * intlMultiplier * 100) / 100;
  const economyFuel = Math.round(economyBase * 0.145 * 100) / 100;
  const economyTotal = Math.round((economyBase + economyFuel + residentialFee + signatureFee + insuranceFee) * 100) / 100;

  const baseDate = input.shipDate ? new Date(input.shipDate) : new Date();

  const addBusinessDays = (d: Date, days: number): Date => {
    const result = new Date(d);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        added++;
      }
    }
    return result;
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const d1 = addBusinessDays(baseDate, 1);
  const d2 = addBusinessDays(baseDate, 2);
  const d3 = addBusinessDays(baseDate, 3);
  const d5 = addBusinessDays(baseDate, 5);

  const quotes: RateQuote[] = [
    {
      serviceId: 'srv-overnight',
      serviceName: 'Traxio Overnight Air',
      estimatedDays: 'Next Business Day',
      deliveryDate: formatDate(d1),
      deliveryTime: 'By 10:30 AM',
      baseRate: overnightBase,
      fuelSurcharge: overnightFuel,
      residentialFee,
      signatureFee,
      insuranceFee,
      total: overnightTotal,
      tag: 'Fastest',
      features: [
        'Guaranteed next business day morning delivery',
        'Money-Back Guarantee on on-time delivery',
        'Real-time GPS aircraft & delivery scanning',
        'Direct signature option included upon request'
      ]
    },
    {
      serviceId: 'srv-priority',
      serviceName: 'Traxio Priority Express',
      estimatedDays: '1 - 2 Business Days',
      deliveryDate: formatDate(d2),
      deliveryTime: 'By 3:00 PM',
      baseRate: priorityBase,
      fuelSurcharge: priorityFuel,
      residentialFee,
      signatureFee,
      insuranceFee,
      total: priorityTotal,
      features: [
        'Prompt 1 to 2 business day delivery',
        'Full step-by-step milestone tracking',
        'Free automated SMS & email notifications',
        'Drop off at any Traxio center or scheduled pickup'
      ]
    },
    {
      serviceId: 'srv-standard',
      serviceName: 'Traxio Standard Express',
      estimatedDays: '2 - 3 Business Days',
      deliveryDate: formatDate(d3),
      deliveryTime: 'By End of Day',
      baseRate: standardBase,
      fuelSurcharge: standardFuel,
      residentialFee,
      signatureFee,
      insuranceFee,
      total: standardTotal,
      tag: 'Best Value',
      features: [
        'Optimal balance of speed and economy',
        'Nationwide and cross-border commercial reach',
        'Includes standard $100 declared value coverage',
        'Proof of delivery photo on drop-off'
      ]
    },
    {
      serviceId: 'srv-economy',
      serviceName: 'Traxio Economy Ground',
      estimatedDays: '4 - 6 Business Days',
      deliveryDate: formatDate(d5),
      deliveryTime: 'By End of Day',
      baseRate: economyBase,
      fuelSurcharge: economyFuel,
      residentialFee,
      signatureFee,
      insuranceFee,
      total: economyTotal,
      tag: 'Economy',
      features: [
        'Most cost-effective choice for standard packages',
        'Day-definite scheduled ground delivery',
        'Reliable coast-to-coast ground fleet network',
        'Flexible drop-off at over 12,000 Traxio locations'
      ]
    }
  ];

  // Return quotes sorted by price ascending or standard
  return quotes;
}
