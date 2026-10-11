import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { getLocationById } from '@/src/lib/api';
import { CourierLocation } from '@/src/lib/types';
import { LoadingSkeleton } from '@/src/components/ui/LoadingSkeleton';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Check,
  Car,
  Package,
  Printer,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const LocationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<CourierLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getLocationById(id);
        setLocation(data);
      } catch {
        // error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <LoadingSkeleton rows={5} />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex-1 max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">Location not found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested courier location facility could not be found.</p>
        <Link to="/locations" className="mt-4 inline-block text-xs font-bold text-[#0047AB] underline">
          &larr; Return to all locations
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title={location.name}
        subtitle={`${location.address}, ${location.city}, ${location.state} ${location.postalCode}`}
        breadcrumbs={[
          { label: 'Locations', href: '/locations' },
          { label: location.name }
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#0047AB] uppercase tracking-wider">{location.type}</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">{location.name}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                location.openNow ? 'bg-[#3DDC97]/20 text-[#0c7048]' : 'bg-slate-100 text-slate-600'
              }`}>
                {location.is24Hour ? 'Open 24/7' : location.openNow ? 'Open Now' : 'Closed'}
              </span>
            </div>

            {/* Address and Contact Details */}
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
                <span>{location.address}, {location.city}, {location.state} {location.postalCode}, {location.country}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0047AB] shrink-0" />
                <span className="font-mono">{location.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-500">
                <Car className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{location.hasParking ? 'Dedicated on-site customer parking available' : 'Street parking only'}</span>
              </div>
            </div>

            {/* Weekly Operating Hours Table */}
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-3 uppercase tracking-wider">
                Full Weekly Operating Hours
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {location.hours.map((h, i) => (
                  <div key={i} className="p-3 flex justify-between bg-slate-50/50">
                    <span className="font-semibold text-slate-800">{h.day}</span>
                    <span className={h.isClosed ? 'text-red-600 font-bold' : 'text-slate-900 font-mono font-medium'}>
                      {h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Offered Services */}
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-3 uppercase tracking-wider">
                Services Available at this Location
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {location.services.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 font-medium text-slate-800">
                    <Check className="w-4 h-4 text-[#3DDC97] shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Directions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-center">
              <h3 className="font-bold text-slate-900 text-base">Visit this Facility</h3>
              <p className="text-xs text-slate-500">
                Get turn-by-turn driving and transit navigation directly to the customer counter entrance.
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(location.address + ', ' + location.city)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-[#0047AB] hover:bg-[#003882] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <Link
                to={`/shipping/create?from=${encodeURIComponent(location.postalCode)}`}
                className="w-full py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Drop off Package Here</span>
              </Link>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-[#0047AB]">Hold at Location (HAL) Service</div>
              <p>
                Have your incoming parcels securely routed here instead of leaving them unattended on your porch. Pick up at your convenience with government-issued photo ID.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
