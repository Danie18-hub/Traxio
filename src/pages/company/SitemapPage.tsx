import React from 'react';
import { Link } from 'react-router-dom';
import { CompanyLayout } from './CompanyLayout';

export const SitemapPage: React.FC = () => {
  const sections = [
    {
      title: 'Tracking & Delivery',
      links: [
        { to: '/tracking', label: 'All Tracking Services' },
        { to: '/tracking/advanced', label: 'Advanced Tracking' },
        { to: '/manage-delivery', label: 'Manage Your Delivery' },
        { to: '/proof-of-delivery', label: 'Proof of Delivery (POD)' },
        { to: '/service-alerts', label: 'Current Service Alerts' }
      ]
    },
    {
      title: 'Shipping Services & Tools',
      links: [
        { to: '/shipping', label: 'All Shipping Services' },
        { to: '/shipping/create', label: 'Create a Shipment' },
        { to: '/rates', label: 'Rates & Delivery Times' },
        { to: '/shipping/pickups', label: 'Schedule Courier Pickups' },
        { to: '/shipping/packaging', label: 'Packaging & Supplies' },
        { to: '/shipping/international', label: 'International Shipping Guide' },
        { to: '/shipping/freight', label: 'Freight Services' },
        { to: '/shipping/returns', label: 'Manage a Return' },
        { to: '/one-rate', label: 'Traxio OneRate' }
      ]
    },
    {
      title: 'Locations & Drop Points',
      links: [
        { to: '/locations', label: 'Find a Location' },
        { to: '/locations/drop-off', label: 'Drop Off a Package' }
      ]
    },
    {
      title: 'Customer Support',
      links: [
        { to: '/support', label: 'Customer Support Hub' },
        { to: '/support/faqs', label: 'Frequently Asked Questions' },
        { to: '/support/contact', label: 'Contact Us' },
        { to: '/support/claims', label: 'File a Claim' },
        { to: '/support/service-guide', label: 'Service Guide' },
        { to: '/support/billing', label: 'Billing & Invoicing' },
        { to: '/support/account-tools', label: 'Account Management Tools' },
        { to: '/small-business', label: 'Small Business Center' }
      ]
    },
    {
      title: 'Account & Customer Portal',
      links: [
        { to: '/login', label: 'Sign In' },
        { to: '/signup', label: 'Open Account' },
        { to: '/forgot-password', label: 'Reset Password' },
        { to: '/open-account', label: 'Account Benefits Comparison' },
        { to: '/account', label: 'Account Dashboard' },
        { to: '/account/shipments', label: 'My Shipments' },
        { to: '/account/address-book', label: 'Address Book' },
        { to: '/account/profile', label: 'Profile' },
        { to: '/account/email-preferences', label: 'Email Preferences' },
        { to: '/account/billing', label: 'Account Billing' }
      ]
    },
    {
      title: 'Company & Operations',
      links: [
        { to: '/about', label: 'About Traxio' },
        { to: '/careers', label: 'Careers' },
        { to: '/newsroom', label: 'Newsroom' },
        { to: '/blog', label: 'Logistics Blog' },
        { to: '/investors', label: 'Investor Relations' },
        { to: '/corporate-responsibility', label: 'Corporate Responsibility' },
        { to: '/developer', label: 'Developer Portal' },
        { to: '/logistics', label: 'Contract Logistics' },
        { to: '/compatible-partners', label: 'Compatible Partners' },
        { to: '/rewards', label: 'Traxio Rewards' }
      ]
    },
    {
      title: 'Policy & Legal',
      links: [
        { to: '/terms', label: 'Terms of Use' },
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/ad-choices', label: 'Ad Choices' },
        { to: '/cookie-settings', label: 'Cookie Settings' }
      ]
    },
    {
      title: 'Staff Administration',
      links: [
        { to: '/admin', label: 'Admin Dashboard Overview' },
        { to: '/admin/shipments', label: 'Admin Shipments Manager' },
        { to: '/admin/shipments/new', label: 'Admin Create Shipment' },
        { to: '/admin/locations', label: 'Admin Locations Manager' },
        { to: '/admin/customers', label: 'Admin Customers Directory' },
        { to: '/admin/support', label: 'Admin Support Tickets Queue' },
        { to: '/admin/settings', label: 'Admin System Settings' }
      ]
    }
  ];

  return (
    <CompanyLayout
      title="Traxio Complete Site Map"
      subtitle="Structured directory of all public tools, customer services, legal policies, and management portals."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
        {sections.map((sec, i) => (
          <div key={i} className="space-y-2">
            <h3 className="font-bold text-sm text-[#0047AB] uppercase tracking-wider border-b border-slate-100 pb-1">
              {sec.title}
            </h3>
            <ul className="space-y-1.5">
              {sec.links.map((link, j) => (
                <li key={j}>
                  <Link to={link.to} className="text-slate-700 hover:text-[#0047AB] hover:underline font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </CompanyLayout>
  );
};
