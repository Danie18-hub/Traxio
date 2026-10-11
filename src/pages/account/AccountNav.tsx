import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  BookUser,
  CreditCard,
  Settings,
  User,
  LogOut
} from 'lucide-react';

export const AccountNav: React.FC = () => {
  const links = [
    { to: '/account', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/account/shipments', label: 'My Shipments', icon: Package },
    { to: '/account/address-book', label: 'Address Book', icon: BookUser },
    { to: '/account/billing', label: 'Billing & Invoices', icon: CreditCard },
    { to: '/account/email-preferences', label: 'Notifications', icon: Settings },
    { to: '/account/profile', label: 'Profile & Security', icon: User }
  ];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto py-2">
          <nav className="flex space-x-1 sm:space-x-2 text-xs sm:text-sm font-semibold shrink-0">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#0047AB] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
