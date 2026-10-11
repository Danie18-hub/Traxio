import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowUpRight, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('United States (English)');

  return (
    <footer className="bg-[#002B66] text-white border-t-4 border-[#FF6700]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Our Company */}
          <div>
            <h3 className="text-xs font-bold text-blue-200 tracking-wider uppercase mb-4">
              Our Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-200 hover:text-white transition-colors">
                  About Traxio
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-200 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="text-[10px] bg-[#FF6700] text-white px-1.5 py-0.2 rounded font-bold">Hiring</span>
                </Link>
              </li>
              <li>
                <Link to="/newsroom" className="text-slate-200 hover:text-white transition-colors">
                  Newsroom & Press
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-slate-200 hover:text-white transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-200 hover:text-white transition-colors">
                  Logistics & Shipping Blog
                </Link>
              </li>
              <li>
                <Link to="/corporate-responsibility" className="text-slate-200 hover:text-white transition-colors">
                  Corporate Responsibility & ESG
                </Link>
              </li>
              <li>
                <Link to="/support/contact" className="text-slate-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: More From Traxio */}
          <div>
            <h3 className="text-xs font-bold text-blue-200 tracking-wider uppercase mb-4">
              More From Traxio
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/developer" className="text-slate-200 hover:text-white transition-colors flex items-center gap-1">
                  <span>Developer Portal & APIs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-300" />
                </Link>
              </li>
              <li>
                <Link to="/logistics" className="text-slate-200 hover:text-white transition-colors">
                  Supply Chain & Contract Logistics
                </Link>
              </li>
              <li>
                <Link to="/compatible-partners" className="text-slate-200 hover:text-white transition-colors">
                  Compatible E-commerce Partners
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-slate-200 hover:text-white transition-colors">
                  Traxio Business Rewards Program
                </Link>
              </li>
              <li>
                <Link to="/one-rate" className="text-slate-200 hover:text-white transition-colors">
                  Traxio OneRate Packaging
                </Link>
              </li>
              <li>
                <Link to="/service-alerts" className="text-slate-200 hover:text-white transition-colors">
                  Current Service Alerts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy Center */}
          <div>
            <h3 className="text-xs font-bold text-blue-200 tracking-wider uppercase mb-4">
              Policy Center
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/terms" className="text-slate-200 hover:text-white transition-colors">
                  Terms of Use & Service Guide
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-200 hover:text-white transition-colors">
                  Privacy & Security Policy
                </Link>
              </li>
              <li>
                <Link to="/ad-choices" className="text-slate-200 hover:text-white transition-colors">
                  Ad Choices
                </Link>
              </li>
              <li>
                <Link to="/cookie-settings" className="text-slate-200 hover:text-white transition-colors">
                  Your Privacy Choices & Cookie Settings
                </Link>
              </li>
              <li>
                <Link to="/support/service-guide" className="text-slate-200 hover:text-white transition-colors">
                  Service Level Agreement (SLA)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Country / Language & Quick Connect */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-blue-200 tracking-wider uppercase mb-2">
                Region & Language
              </h3>
              <div className="relative mt-2">
                <Globe className="w-4 h-4 absolute left-3 top-3 text-blue-300 pointer-events-none" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-[#001D47] border border-blue-800 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF6700] appearance-none cursor-pointer"
                  aria-label="Select Region and Language"
                >
                  <option value="United States (English)">United States (English)</option>
                  <option value="Canada (English)">Canada (English)</option>
                  <option value="Canada (Français)">Canada (Français)</option>
                  <option value="United Kingdom (English)">United Kingdom (English)</option>
                  <option value="France (Français)">France (Français)</option>
                  <option value="Germany (Deutsch)">Germany (Deutsch)</option>
                  <option value="Australia (English)">Australia (English)</option>
                </select>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-xs font-bold text-blue-200 tracking-wider uppercase mb-3">
                Connect With Traxio
              </h3>
              <div className="flex items-center space-x-3 text-blue-200">
                {/* Facebook */}
                <a href="#facebook" aria-label="Facebook" className="p-2 bg-blue-900/60 hover:bg-[#FF6700] hover:text-white rounded-md transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.8C10.5 0 9 1.5 9 4.889V8z"/></svg>
                </a>
                {/* X / Twitter */}
                <a href="#x" aria-label="X" className="p-2 bg-blue-900/60 hover:bg-[#FF6700] hover:text-white rounded-md transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="#linkedin" aria-label="LinkedIn" className="p-2 bg-blue-900/60 hover:bg-[#FF6700] hover:text-white rounded-md transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                {/* YouTube */}
                <a href="#youtube" aria-label="YouTube" className="p-2 bg-blue-900/60 hover:bg-[#FF6700] hover:text-white rounded-md transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
                {/* Email newsletter */}
                <Link to="/support/contact" aria-label="Email Updates" className="p-2 bg-blue-900/60 hover:bg-[#FF6700] hover:text-white rounded-md transition-colors">
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200 gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; Traxio 2026. All rights reserved.</span>
            <span className="text-blue-500">•</span>
            <span>Operating under ICC Carrier Authority #TRX-99410</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Site Map
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Notice
            </Link>
            <Link to="/cookie-settings" className="hover:text-white transition-colors text-[#3DDC97] font-semibold">
              Cookie Consent
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
