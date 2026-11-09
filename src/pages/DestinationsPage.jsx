import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getDestinations } from '../services/api';
import { Compass, MapPin, ArrowRight, Building, Sparkles, Sun, ShieldCheck } from 'lucide-react';

export default function DestinationsPage() {
  const { navigateTo } = useApp();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getDestinations();
        setDestinations(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner matching Figma Screen 4 with magnifying glass theme */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80"
              alt="Morocco Map & Destinations"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Kingdom Regional Directory</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold">
              Moroccan Prime Destinations
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Explore the unique architectural cultures, sunny climates, and premier investment corridors across the Kingdom of Morocco.
            </p>
          </div>
        </div>

        {/* Destinations Detailed List & Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-white rounded-2xl animate-pulse border border-stone-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Image */}
                <div className="relative sm:w-2/5 aspect-4/3 sm:aspect-auto overflow-hidden bg-stone-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                  <div className="absolute top-3 left-3 bg-[#8E1B2D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {dest.propertyCount} Properties
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-[#8E1B2D] uppercase tracking-wider block">
                      {dest.region}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#8E1B2D] transition">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase">Average Portfolio Price</span>
                      <span className="font-serif font-bold text-stone-900 text-base">{dest.avgPrice}</span>
                    </div>

                    <button
                      onClick={() => navigateTo('properties', null, { city: dest.name })}
                      className="bg-[#8E1B2D] hover:bg-[#731524] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <span>Explore {dest.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

