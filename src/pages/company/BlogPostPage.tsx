import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CompanyLayout } from './CompanyLayout';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <CompanyLayout
      title="Optimizing Cross-Dock Logistics for Q4 Peak Shipping Volumes"
      subtitle="Industry analysis published by the Traxio Transportation Engineering Group."
    >
      <div className="space-y-6 text-slate-700 text-sm leading-relaxed max-w-3xl">
        <Link to="/blog" className="text-xs font-bold text-[#0047AB] hover:underline flex items-center gap-1 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all blog posts</span>
        </Link>

        <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
          <span>Published October 5, 2026</span>
          <span>•</span>
          <span>By David Vance, VP Network Operations</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        <p className="font-semibold text-slate-900 text-base leading-relaxed">
          As seasonal e-commerce volumes surge in the fourth quarter, traditional warehousing models frequently buckle under parcel staging congestion. Cross-docking offers a high-velocity alternative.
        </p>

        <h3 className="text-lg font-bold text-slate-900 mt-6">The Elimination of Intermediate Storage</h3>
        <p>
          In a classic courier hub, parcels are unloaded, scanned into regional staging bays, and stored until evening linehaul departure. Under Traxio's synchronized cross-dock protocol, inbound feeder trailers are matched in real time with outbound long-haul aircraft and linehaul vans. Conveyor optical sorters redirect parcels across the facility in less than 4 minutes from trailer door to cargo belly.
        </p>

        <h3 className="text-lg font-bold text-slate-900 mt-6">Automated Barcode Verification & Pre-Sorted Manifests</h3>
        <p>
          By encouraging business shippers to adopt standardized Traxio OneRate packaging and electronic trade pre-manifests, scanning exceptions drop by 78%. Drivers spend less time resolving ambiguous addresses at the curb, directly improving on-time delivery rates during winter weather contingencies.
        </p>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
          <strong className="text-[#0047AB]">Key Takeaway for Commercial Shippers:</strong>
          <p>
            Standardize box footprints, affix 2D QR codes with high-contrast thermal tape, and manifest pickups before 2:00 PM to take advantage of priority cross-dock allocations.
          </p>
        </div>
      </div>
    </CompanyLayout>
  );
};
