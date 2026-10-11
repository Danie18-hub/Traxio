import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Reset Password"
        subtitle="We will send a secure password reset link to your registered account email."
        breadcrumbs={[
          { label: 'Sign In', href: '/login' },
          { label: 'Reset Password' }
        ]}
      />

      <div className="max-w-md mx-auto px-4 mt-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#3DDC97] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Check Your Inbox</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account exists for <strong className="text-slate-900">{email}</strong>, we have sent instructions to reset your password.
              </p>
              <div className="pt-4">
                <Link to="/login" className="text-xs font-bold text-[#0047AB] hover:underline">
                  &larr; Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all active:scale-95"
              >
                Send Password Reset Link
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs text-slate-600 hover:text-[#0047AB] inline-flex items-center gap-1 font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
