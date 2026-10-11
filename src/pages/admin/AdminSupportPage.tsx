import React, { useState, useEffect } from 'react';
import { getTickets, updateTicketStatus, addTicketMessage } from '@/src/lib/api';
import { SupportTicket } from '@/src/lib/types';
import { useToast } from '@/src/components/ui/Toast';
import { MessageSquare, Clock, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';

export const AdminSupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  const { success, error: toastError } = useToast();

  useEffect(() => {
    loadTickets();
  }, [statusFilter]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await getTickets(statusFilter);
      setTickets(data);
      if (selectedTicket) {
        const refreshed = data.find((t) => t.id === selectedTicket.id);
        if (refreshed) setSelectedTicket(refreshed);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyText.trim()) return;
    try {
      await addTicketMessage(
        selectedTicket.id,
        'agent',
        'Keith B. (Traxio Dispatch Desk)',
        replyText.trim()
      );
      success('Staff reply sent to customer thread!');
      setReplyText('');
      loadTickets();
    } catch {
      toastError('Could not send reply.');
    }
  };

  const handleUpdateStatus = async (status: SupportTicket['status']) => {
    if (!selectedTicket) return;
    try {
      await updateTicketStatus(selectedTicket.id, status);
      success(`Ticket status updated to ${status}!`);
      loadTickets();
    } catch {
      toastError('Could not update status.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Support Queue</h1>
        <p className="text-xs text-slate-500 mt-1">Review customer tickets, inquiries, delivery exception escalations, and reply in real time.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs">
        {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full border font-semibold ${
              statusFilter === s
                ? 'bg-[#0047AB] text-white border-[#0047AB]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Ticket List & Detail Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Ticket List (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          {tickets.map((t) => {
            const isSelected = selectedTicket?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all bg-white ${
                  isSelected
                    ? 'border-[#0047AB] shadow-md ring-1 ring-[#0047AB]/20'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-[#0047AB]">{t.ticketNumber}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    t.status === 'Open'
                      ? 'bg-amber-100 text-amber-900'
                      : t.status === 'In Progress'
                      ? 'bg-blue-100 text-[#0047AB]'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">{t.subject}</h4>
                <div className="text-xs text-slate-500 mt-1">
                  From: {t.customerName} ({t.category})
                </div>

                {t.trackingNumber && (
                  <div className="mt-2 text-[11px] font-mono text-[#0047AB] bg-blue-50 px-2 py-0.5 rounded inline-block">
                    Tracking: {t.trackingNumber}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail Drawer (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-4">
          {selectedTicket ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="font-mono font-bold text-[#0047AB] text-sm">{selectedTicket.ticketNumber}</span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug mt-0.5">{selectedTicket.subject}</h3>
                  <div className="text-slate-500 mt-0.5">
                    {selectedTicket.customerName} • {selectedTicket.customerEmail}
                  </div>
                </div>

                <div className="flex gap-1">
                  {selectedTicket.status !== 'Resolved' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus('Resolved')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px] uppercase"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>

              {/* Message Thread */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {selectedTicket.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      m.sender === 'agent'
                        ? 'bg-blue-50 border-blue-200 ml-4 text-slate-800'
                        : 'bg-slate-50 border-slate-200 mr-4 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between font-bold text-[11px] text-slate-900 mb-1">
                      <span>{m.senderName}</span>
                      <span className="font-normal text-slate-400 font-mono text-[10px]">
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-2 border-t border-slate-100 space-y-2">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official dispatch response to customer..."
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5 ml-auto"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Staff Response</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400">
              Select a support ticket from the list to view message history and send customer replies.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
