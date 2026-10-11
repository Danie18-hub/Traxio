import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageHeaderBand } from '@/src/components/ui/PageHeaderBand';
import { getLocations, searchLocations } from '@/src/lib/api';
import { CourierLocation } from '@/src/lib/types';
import {
  MapPin,
  Clock,
  Phone,
  Search,
  Filter,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Store,
  Layers
} from 'lucide-react';

export const LocationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [locations, setLocations] = useState<CourierLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<CourierLocation | null>(null);

  // Filters
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [filter24Hour, setFilter24Hour] = useState(false);
  const [filterService, setFilterService] = useState('All');

  useEffect(() => {
    loadLocations();
  }, [filterOpenNow, filter24Hour, filterService]);

  const loadLocations = async (customQuery?: string) => {
    setLoading(true);
    const searchQuery = customQuery !== undefined ? customQuery : query;
    try {
      const data = await searchLocations(searchQuery, {
        openNow: filterOpenNow,
        is24Hour: filter24Hour,
        service: filterService
      });
      setLocations(data);
      if (data.length > 0 && !selectedLocation) {
        setSelectedLocation(data[0]);
      }
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadLocations(query);
  };

  return (
    <div className="flex-1 pb-16">
      <PageHeaderBand
        title="Find a Traxio Location"
        subtitle="Locate 24/7 automated drop boxes, express ship centers, and packaging facilities near you."
        breadcrumbs={[{ label: 'Locations' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter City, State, or Postal Code (e.g. New York, NY or 10018)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF6700] hover:bg-[#E55B00] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Filter Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>

            <button
              type="button"
              onClick={() => setFilterOpenNow(!filterOpenNow)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                filterOpenNow
                  ? 'bg-[#0047AB] text-white border-[#0047AB]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Open Now
            </button>

            <button
              type="button"
              onClick={() => setFilter24Hour(!filter24Hour)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                filter24Hour
                  ? 'bg-[#0047AB] text-white border-[#0047AB]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              24-Hour Access
            </button>

            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-700"
            >
              <option value="All">All Services</option>
              <option value="Drop Off">Drop Off</option>
              <option value="Hold">Hold at Location</option>
              <option value="Packaging">Packaging Supplies</option>
              <option value="Freight">Heavy Freight</option>
            </select>
          </div>
        </div>

        {/* Two-Column: Location List (Left) & Interactive Map Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Location Results List (5 cols) */}
          <div className="lg:col-span-5 space-y-4 max-h-[750px] overflow-y-auto pr-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Found {locations.length} Location{locations.length === 1 ? '' : 's'}
            </div>

            {locations.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-sm text-slate-500">
                No locations match your filter. Try broadening your search or clearing filters.
              </div>
            ) : (
              locations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all bg-white ${
                      isSelected
                        ? 'border-[#0047AB] shadow-md ring-1 ring-[#0047AB]/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {loc.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#0047AB] font-bold shrink-0">
                        {loc.distanceMiles ? `${loc.distanceMiles} mi` : ''}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mb-2 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{loc.address}, {loc.city}, {loc.state} {loc.postalCode}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs mb-3">
                      <span className={`inline-flex items-center gap-1 font-semibold ${
                        loc.openNow ? 'text-[#0c7048]' : 'text-slate-500'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${loc.openNow ? 'bg-[#3DDC97]' : 'bg-slate-400'}`} />
                        {loc.is24Hour ? 'Open 24/7' : loc.openNow ? 'Open Now' : 'Closed'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-mono">{loc.phone}</span>
                    </div>

                    {/* Services Chips */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {loc.services.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {s}
                        </span>
                      ))}
                      {loc.services.length > 3 && (
                        <span className="text-[10px] text-slate-400 px-1 py-0.5">
                          +{loc.services.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <Link
                        to={`/locations/${loc.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-[#0047AB] hover:underline"
                      >
                        View Hours & Details &rarr;
                      </Link>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(loc.address + ', ' + loc.city)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Map Placeholder / Selected Location Inspector (7 cols) */}
          <div className="lg:col-span-7 sticky top-24 space-y-4">
            {/* Interactive Map Visual Mock with markers */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-lg h-[460px] relative flex flex-col justify-between p-6 text-white">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
              
              {/* Top map controls */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-slate-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs font-mono flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#3DDC97]" />
                  <span>Interactive Regional Map View</span>
                </div>
                <div className="text-xs bg-[#FF6700] text-white px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  Live Terminal Pins
                </div>
              </div>

              {/* Central Map Pins Visual */}
              <div className="relative z-10 my-auto text-center space-y-3">
                <div className="inline-flex items-center gap-4 bg-slate-800/90 p-4 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
                  <div className="w-12 h-12 rounded-xl bg-[#0047AB] text-white flex items-center justify-center shadow-lg">
                    <MapPin className="w-7 h-7 text-[#FF6700]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Selected Location
                    </div>
                    <div className="text-base font-extrabold text-white">
                      {selectedLocation ? selectedLocation.name : 'Select a facility'}
                    </div>
                    <div className="text-xs text-slate-300">
                      {selectedLocation ? `${selectedLocation.address}, ${selectedLocation.city}` : ''}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom map metadata */}
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
                <span>Coordinates: {selectedLocation ? `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}` : 'US-WIDE'}</span>
                <span>Zoom Level: 14x Metro</span>
              </div>
            </div>

            {/* Selected Location Full Hours Box */}
            {selectedLocation && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm mb-3">
                  Operating Hours for {selectedLocation.name}
                </h4>
                <div className="space-y-1.5 text-xs">
                  {selectedLocation.hours.map((h, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                      <span className="font-semibold text-slate-700">{h.day}</span>
                      <span className={h.isClosed ? 'text-red-600 font-bold' : 'text-slate-900 font-mono'}>
                        {h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
