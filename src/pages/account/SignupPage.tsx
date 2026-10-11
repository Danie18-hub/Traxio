import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { User, Briefcase, Lock, Mail, Phone, Building, Check, ArrowRight } from 'lucide-react';
import { useToast } from '@/src/components/ui/Toast';

export const SignupPage: React.FC = () => {
  const [accountType, setAccountType] = useState<'Personal' | 'Business'>('Business');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { success } = useToast();

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the Terms of Use and Privacy Notice to continue.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success(`Welcome to Traxio, ${name}! Your ${accountType} account is active.`);
      navigate('/account');
    }, 800);
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Open a Traxio Account"
        subtitle="Save up to 25% on express shipments, unlock time-saving address tools, and manage consolidated billing."
        breadcrumbs={[{ label: 'Sign Up' }]}
      />

      <div className="max-w-xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Account Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType('Business')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  accountType === 'Business'
                    ? 'border-[#0047AB] bg-blue-50 text-[#0047AB] font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <Briefcase className="w-5 h-5 mx-auto mb-1 text-[#FF6700]" />
                <span className="text-sm block">Business Account</span>
                <span className="text-[10px] font-normal text-slate-500">Commercial rates & invoicing</span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('Personal')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  accountType === 'Personal'
                    ? 'border-[#0047AB] bg-blue-50 text-[#0047AB] font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <User className="w-5 h-5 mx-auto mb-1 text-[#0047AB]" />
                <span className="text-sm block">Personal Account</span>
                <span className="text-[10px] font-normal text-slate-500">Individual package tracking</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alexander Wright"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              {accountType === 'Business' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Wright & Sons Architecture"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters, uppercase, number & symbol"
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />

              {/* Password strength meter */}
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${strength >= 1 ? 'bg-red-500 w-1/4' : 'w-0'}`} />
                  <div className={`h-full ${strength >= 2 ? 'bg-amber-500 w-1/4' : 'w-0'}`} />
                  <div className={`h-full ${strength >= 3 ? 'bg-blue-500 w-1/4' : 'w-0'}`} />
                  <div className={`h-full ${strength >= 4 ? 'bg-[#3DDC97] w-1/4' : 'w-0'}`} />
                </div>
                <div className="text-[10px] text-slate-400 text-right">
                  Strength:{' '}
                  {strength === 0
                    ? 'None'
                    : strength === 1
                    ? 'Weak'
                    : strength === 2
                    ? 'Fair'
                    : strength === 3
                    ? 'Good'
                    : 'Strong'}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#0047AB]"
                />
                <span>
                  I agree to the Traxio{' '}
                  <Link to="/terms" className="text-[#0047AB] underline font-semibold">Terms of Use</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#0047AB] underline font-semibold">Privacy Notice</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all active:scale-95"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0047AB] font-bold hover:underline">
              Sign In &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
