import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  MapPin,
  Users,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/shipments', label: 'All Shipments', icon: Package, end: true },
    { to: '/admin/shipments/new', label: 'Create Shipment', icon: PlusCircle },
    { to: '/admin/locations', label: 'Locations Facility', icon: MapPin },
    { to: '/admin/customers', label: 'Customer Accounts', icon: Users },
    { to: '/admin/support', label: 'Support Tickets', icon: MessageSquare },
    { to: '/admin/settings', label: 'Network Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-[#FF6700]/20 selection:text-[#FF6700]">
      {/* Top Admin Bar */}
      <header className="bg-slate-900 text-white h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6700] text-white flex items-center justify-center font-black text-sm">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-sm text-white flex items-center gap-1.5">
                TRAXIO OPS
                <span className="text-[10px] bg-[#0047AB] text-white px-1.5 py-0.2 rounded font-bold uppercase">
                  Staff
                </span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-0.5">Logistics & Dispatch Console</span>
            </div>
          </Link>
        </div>

        {/* Global Admin Search & Avatar menu */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <span>Back to Public Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Admin Avatar */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800 text-xs font-semibold"
            >
              <div className="w-7 h-7 rounded-full bg-[#0047AB] text-white flex items-center justify-center font-bold text-xs border border-blue-400">
                JD
              </div>
              <span className="hidden md:inline text-slate-200">John Dispatcher</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold">John Dispatcher</div>
                  <div className="text-[11px] text-slate-500">Super Admin • Chicago Hub</div>
                </div>
                <Link
                  to="/admin/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block px-3 py-2 hover:bg-slate-50"
                >
                  System Preferences
                </Link>
                <Link
                  to="/"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block px-3 py-2 hover:bg-slate-50 text-[#0047AB] font-semibold"
                >
                  Exit to Storefront
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Collapsible Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 pt-16 z-30 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 transform lg:transform-none lg:static transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 block">
              Dispatcher Menu
            </span>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#0047AB] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
