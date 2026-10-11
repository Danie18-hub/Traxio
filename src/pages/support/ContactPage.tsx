import React, { useState } from 'react';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { createTicket } from '@/src/lib/api';
import { useToast } from '@/src/components/ui/Toast';
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Paperclip,
  MapPin,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'Tracking & Delivery' | 'Damaged or Lost' | 'Billing & Rates' | 'Pickup Request' | 'Technical Support' | 'General'>('Tracking & Delivery');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [ticketCreatedId, setTicketCreatedId] = useState<string | null>(null);

  const { success, error: toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const ticket = await createTicket({
        customerName: name,
        customerEmail: email,
        category,
        priority: 'Medium',
        trackingNumber: trackingNumber || undefined,
        subject: subject || `${category} Inquiry from ${name}`,
        initialMessage: message
      });

      setTicketCreatedId(ticket.ticketNumber);
      success(`Support ticket ${ticket.ticketNumber} created! A representative will reply to ${email}.`);
      setSubmitting(false);
    } catch {
      toastError('Could not submit support request.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Contact Customer Support"
        subtitle="Our global logistics desks are available around the clock to support your shipments."
        breadcrumbs={[
          { label: 'Support', href: '/support' },
          { label: 'Contact Us' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0047AB] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Customer Care Hotline</div>
                    <a href="tel:18005558729" className="text-[#0047AB] font-bold font-mono text-xs hover:underline">
                      1-800-555-TRAX (8729)
                    </a>
                    <div className="text-[11px] text-slate-500 mt-0.5">Toll-free across North America</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6700] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Email Support</div>
                    <a href="mailto:support@traxio-courier.com" className="text-slate-800 font-mono text-xs hover:underline">
                      support@traxio-courier.com
                    </a>
                    <div className="text-[11px] text-slate-500 mt-0.5">Average response under 45 minutes</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c7048] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Operational Hours</div>
                    <div className="font-medium text-slate-800">24 Hours / 7 Days / 365 Days</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Continuous dispatch coverage</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Global Headquarters</div>
                    <div className="text-slate-800">452 5th Avenue, Floors 18-22</div>
                    <div className="text-[11px] text-slate-500">New York, NY 10018, USA</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-2">
              <span className="font-bold text-[#0047AB] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Dedicated Account Executives
              </span>
              <p>
                Enterprise contract shippers enjoy dedicated phone extensions to their assigned account manager and priority routing.
              </p>
            </div>
          </div>

          {/* Contact Support Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {ticketCreatedId ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-[#3DDC97] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Support Ticket Created</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your ticket confirmation code is <strong className="font-mono text-[#0047AB]">{ticketCreatedId}</strong>. A logistics resolution specialist has been assigned to your inquiry.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTicketCreatedId(null);
                    setSubject('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base uppercase tracking-wider pb-2 border-b border-slate-100">
                  Open a Support Case
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="Tracking & Delivery">Tracking & Delivery Status</option>
                      <option value="Damaged or Lost">Damaged or Lost Parcel</option>
                      <option value="Billing & Rates">Billing & Surcharges</option>
                      <option value="Pickup Request">Courier Pickup Assistance</option>
                      <option value="Technical Support">API & Website Technical</option>
                      <option value="General">General Inquiries</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tracking Number (Optional)</label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g. TRX1000000001"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the issue"
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please include full shipment background, package contents, and specific questions..."
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                {/* File Attachment */}
                <div className="border border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-slate-500" />
                    <span>{fileName ? `Attached: ${fileName}` : 'Attach photo or airbill PDF (Optional, max 10MB)'}</span>
                  </div>
                  <label className="cursor-pointer font-bold text-[#0047AB] hover:underline">
                    Browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-[#FF6700] hover:bg-[#E55B00] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-all"
                  >
                    {submitting ? 'Submitting Case...' : 'Submit Support Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
