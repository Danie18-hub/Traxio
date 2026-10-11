import React, { useState } from 'react';
import { CompanyLayout } from './CompanyLayout';
import { Code, Terminal, Webhook, Copy, Check, ArrowRight } from 'lucide-react';
import { useToast } from '@/src/components/ui/Toast';

export const DeveloperPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const sampleJson = `{
  "tracking_number": "TRX1000000001",
  "status": "Delivered",
  "service": "Traxio Priority Express",
  "origin": "Seattle, WA, US",
  "destination": "Austin, TX, US",
  "delivery": {
    "actual_timestamp": "2026-10-09T13:42:00Z",
    "signed_by": "J. MARTINEZ",
    "proof_of_delivery_url": "https://api.traxio.com/v2/pod/TRX1000000001.pdf"
  },
  "events": [
    {
      "timestamp": "2026-10-09T13:42:00Z",
      "location": "Austin, TX, US",
      "description": "Delivered - Signed for by J. MARTINEZ at front reception",
      "status": "Delivered"
    }
  ]
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleJson);
    setCopied(true);
    success('Sample JSON response copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CompanyLayout
      title="Traxio Developer API Portal"
      subtitle="RESTful APIs, real-time tracking webhooks, automated label generation, and rate quote integrations."
    >
      <div className="space-y-8 text-sm text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Build Seamless Logistics Experiences</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Embed Traxio's global delivery engine directly into your checkout flow, enterprise ERP, or customer mobile application with our REST APIs and high-frequency webhook callbacks.
          </p>
        </div>

        {/* API Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <Terminal className="w-5 h-5 text-[#0047AB]" />
            <h4 className="font-bold text-slate-900 text-xs">Tracking REST API</h4>
            <p className="text-[11px] text-slate-600">Query individual or batch tracking numbers with milestone timelines.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <Webhook className="w-5 h-5 text-[#FF6700]" />
            <h4 className="font-bold text-slate-900 text-xs">Webhook Subscriptions</h4>
            <p className="text-[11px] text-slate-600">Receive instant HMAC-signed webhooks on out-for-delivery and delivery exceptions.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <Code className="w-5 h-5 text-[#3DDC97]" />
            <h4 className="font-bold text-slate-900 text-xs">Label Generation Engine</h4>
            <p className="text-[11px] text-slate-600">Generate PDF and thermal 4×6 ZPL label streams in milliseconds.</p>
          </div>
        </div>

        {/* Code Snippet Preview */}
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="font-mono text-xs font-bold text-slate-600">
              GET /v2/shipments/TRX1000000001
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0047AB] hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <code>{sampleJson}</code>
          </pre>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-[#0047AB]">Need Sandbox Credentials?</span>
            <p className="text-slate-600">Generate instant test API tokens with mock courier barcode telemetry.</p>
          </div>
          <a
            href="/support/contact"
            className="px-4 py-2 bg-[#0047AB] text-white font-bold rounded-lg uppercase tracking-wider text-[11px] shrink-0"
          >
            Request API Key
          </a>
        </div>
      </div>
    </CompanyLayout>
  );
};
