import React from 'react';
import { CompanyLayout } from '../company/CompanyLayout';

export const AdChoicesPage: React.FC = () => {
  return (
    <CompanyLayout
      title="Ad Choices & Digital Advertising Transparency"
      subtitle="Understanding interest-based advertising choices and our commitment to consumer transparency."
    >
      <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">Interest-Based Advertising Notice</h3>
          <p>
            Traxio adheres to the Digital Advertising Alliance (DAA) Self-Regulatory Principles for Online Behavioral Advertising. We and our marketing partners may use non-sensitive browsing signals to display relevant commercial logistics solutions to business visitors.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">How to Manage Your Choices</h3>
          <p>
            You can opt out of interest-based advertising from participating companies by visiting the DAA WebChoices tool at www.aboutads.info/choices or by adjusting your preferences in our Cookie Settings panel.
          </p>
        </section>
      </div>
    </CompanyLayout>
  );
};
