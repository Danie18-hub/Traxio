import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { CTABand } from '@/src/components/ui/CTABand';
import { Globe2, FileText, AlertTriangle, ShieldCheck, Search, HelpCircle, CheckCircle2 } from 'lucide-react';

export const InternationalGuidePage: React.FC = () => {
  const [searchCountry, setSearchCountry] = useState('');

  const countries = [
    { name: 'Canada', code: 'CA', doc: 'USMCA / CUSMA Certificate of Origin, Commercial Invoice', restricted: 'Firearms, unpasteurized dairy, cannabis products', dutyThreshold: 'CAD $20 CAD for taxes, CAD $150 for duty' },
    { name: 'United Kingdom', code: 'GB', doc: 'Commercial Invoice, UK EORI Number, HS Codes', restricted: 'Controlled drugs, counterfeit currency, offensive weapons', dutyThreshold: '£135 threshold for import VAT' },
    { name: 'European Union (France/Germany)', code: 'EU', doc: 'ICS2 Release 3 pre-filing, Commercial Invoice with 6-digit HS codes', restricted: 'Endangered animal species (CITES), meat and milk products', dutyThreshold: 'All commercial imports subject to VAT under IOSS' },
    { name: 'Japan', code: 'JP', doc: 'Commercial Invoice, Detailed itemization in English/Japanese', restricted: 'Meat products, counterfeit trademark goods, stimulants', dutyThreshold: 'JPY 10,000 duty exemption for small parcels' },
    { name: 'Australia', code: 'AU', doc: 'Commercial Invoice, Biosecurity declaration', restricted: 'Living plant matter, untreated timber, seeds, soil', dutyThreshold: 'AUD $1,000 threshold for customs duty & GST' }
  ];

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
    c.code.toLowerCase().includes(searchCountry.toLowerCase())
  );

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="International Shipping Guide"
        subtitle="Global border clearance guidelines, customs documents checklist, Harmonized System (HS) codes, and export compliance."
        breadcrumbs={[
          { label: 'Shipping', href: '/shipping' },
          { label: 'International Guide' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Country Quick Search Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="max-w-xl mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Country-Specific Customs Profiles</h2>
            <p className="text-xs text-slate-600">
              Lookup import document requirements, de minimis duty exemptions, and banned materials by destination nation.
            </p>
            <div className="mt-3 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
                placeholder="Search country name (e.g. Canada, United Kingdom, Japan)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCountries.map((c) => (
              <div key={c.code} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-sm text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-[#0047AB]" />
                    {c.name} ({c.code})
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-100 text-[#0047AB]">
                    Direct Traxio Air Service
                  </span>
                </div>
                <div>
                  <strong className="text-slate-700">Required Documents:</strong> {c.doc}
                </div>
                <div>
                  <strong className="text-slate-700">De Minimis Threshold:</strong> {c.dutyThreshold}
                </div>
                <div className="text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                  <strong>Restricted / Prohibited:</strong> {c.restricted}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customs Documents Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">1. Commercial Invoice (CI)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mandatory for all non-document shipments. Must include accurate line-item descriptions, country of origin, unit values, and terms of sale (Incoterms 2020).
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">2. HS Tariff Code Classification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customs duties are determined by 6-digit Harmonized System codes. Incorrect codes risk clearance delays and regulatory penalty audits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">3. Electronic Trade Documents (ETD)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your invoices digitally directly into the Traxio system. Eliminates physical paper pouches and clears freight before flight touchdown.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CTABand
          title="Need custom brokerage assistance?"
          subtitle="Our licensed customs brokers assist with carnets, temporary imports, and free trade agreement certifications."
          buttonText="Contact International Desk"
          buttonHref="/support/contact"
        />
      </div>
    </div>
  );
};
