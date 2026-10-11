import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { AccountNav } from './AccountNav';
import { useToast } from '@/src/components/ui/Toast';
import { User, Shield, Lock, Check } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [name, setName] = useState('Alexander Wright');
  const [company, setCompany] = useState('Wright & Sons Architecture');
  const [email, setEmail] = useState('awright@wrightarch.com');
  const [phone, setPhone] = useState('+1 (212) 555-3490');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { success } = useToast();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    success('Profile and account security settings updated!');
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Profile & Security Settings"
        subtitle="Manage authorized staff contacts, security credentials, and corporate profile details."
        breadcrumbs={[
          { label: 'Account', href: '/account' },
          { label: 'Profile' }
        ]}
      />
      <AccountNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                Primary Account Holder Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Contact Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Entity</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Direct Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                Security & Authentication
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New secure password"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
