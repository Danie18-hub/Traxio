import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Globe } from 'lucide-react';

interface CTABandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export const CTABand: React.FC<CTABandProps> = ({
  title = 'Ready to streamline your global logistics?',
  subtitle = 'Open a business account in minutes. Get up to 25% off your first 10 shipments with Traxio Preferred Rates.',
  buttonText = 'Open a free account',
  buttonHref = '/open-account',
  secondaryText = 'Calculate instant rates',
  secondaryHref = '/rates'
}) => {
  return (
    <section className="bg-gradient-to-r from-[#003882] via-[#0047AB] to-[#002D6B] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-b border-blue-900 shadow-md">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mt-3.5 text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={buttonHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-base shadow-lg transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2"
          >
            {buttonText}
            <ArrowRight className="w-5 h-5" />
          </Link>
          {secondaryText && (
            <Link
              to={secondaryHref}
              className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-colors"
            >
              {secondaryText}
            </Link>
          )}
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-blue-400/20 text-xs sm:text-sm text-blue-100">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3DDC97]" />
            <span>Money-Back Delivery Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#3DDC97]" />
            <span>99.8% On-Time Network Record</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Globe className="w-4 h-4 text-[#3DDC97]" />
            <span>220+ Countries & Territories</span>
          </div>
        </div>
      </div>
    </section>
  );
};
