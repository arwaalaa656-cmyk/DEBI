import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROPERTIES } from '../data/mockData';
import { MapPin, Navigation, Eye, ArrowUpRight, Compass, Building, Sparkles } from 'lucide-react';

export default function MapSection() {
  const { navigateTo, formatPrice } = useApp();
  const [activePin, setActivePin] = useState(PROPERTIES[0]);

  // Cities with coordinates on our styled Morocco map canvas
  const mapRegions = [
    {
      id: 'marrakech',
      city: 'Marrakech',
      x: 48, // % from left
      y: 58, // % from top
      count: '14 Estates',
      property: PROPERTIES[0], // Villa Palmeraie Royale
    },
    {
      id: 'casablanca',
      city: 'Casablanca',
      x: 52,
      y: 38,
      count: '9 Penthouses',
      property: PROPERTIES[1], // Sky Penthouse
    },
    {
      id: 'tangier',
      city: 'Tangier',
      x: 62,
      y: 16,
      count: '8 Ocean Villas',
      property: PROPERTIES[2], // Dar El Marsa
    },
    {
      id: 'atlas',
      city: 'High Atlas',
      x: 55,
      y: 70,
      count: '6 Mountain Lodges',
      property: PROPERTIES[4], // Kasbah Lodge Toubkal
    },
    {
      id: 'agadir',
      city: 'Agadir & Taghazout',
      x: 36,
      y: 76,
      count: '7 Beach Residences',
      property: PROPERTIES[5], // Baycrest
    },
  ];

  return (
    <section className="py-16 bg-stone-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
              <Compass className="w-4 h-4" />
              <span>Interactive Geographic Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Prime Moroccan Destinations & Territories
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-xl">
              Select any regional pin to preview flagship architectural residences across the Kingdom of Morocco.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              All 44 Properties Geo-Verified
            </span>
          </div>
        </div>

        {/* Map Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Graphic Box */}
          <div className="lg:col-span-7 bg-stone-950/80 rounded-2xl border border-stone-800 p-6 relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Styled Map Background Vector / Terrain simulation */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 220 500 Q 320 480 380 430 Q 440 370 470 300 Q 490 230 520 180 Q 560 120 590 80 Q 510 90 450 140 Q 390 190 320 280 Q 250 370 200 440 Z"
                  fill="#8E1B2D"
                  opacity="0.3"
                />
                <circle cx="480" cy="300" r="180" stroke="#8E1B2D" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <circle cx="480" cy="300" r="280" stroke="#C29B38" strokeWidth="1" strokeDasharray="6 6" opacity="0.2" />
                {/* Coastal line */}
                <path
                  d="M 590 80 Q 530 160 480 240 T 400 360 T 320 460 T 220 540"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Geographical Markers */}
            <div className="absolute inset-0">
              {mapRegions.map((region) => {
                const isSelected = activePin?.city === region.city;
                return (
                  <button
                    key={region.id}
                    onClick={() => setActivePin(region.property)}
                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none transition z-20"
                  >
                    {/* Ripple animation when selected */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-[#8E1B2D]/40 animate-ping"></span>
                    )}

                    <div
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#8E1B2D] text-white scale-110 ring-2 ring-amber-300'
                          : 'bg-stone-800/90 text-stone-200 hover:bg-stone-700 border border-stone-600'
                      }`}
                    >
                      <MapPin
                        className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`}
                      />
                      <span>{region.city}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                        isSelected ? 'bg-black/30 text-amber-200' : 'bg-stone-700 text-stone-300'
                      }`}>
                        {region.count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 z-20 bg-stone-900/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-stone-800 text-[11px] text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8E1B2D]"></span>
                <span className="text-stone-200 font-medium">Selected Territory</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-600"></span>
                <span>Active Regional Hub</span>
              </div>
            </div>
          </div>

          {/* Right Preview Card for Selected Region */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-800/90 rounded-2xl border border-stone-700/80 overflow-hidden shadow-xl">
              <div className="relative aspect-16/9 overflow-hidden bg-stone-900">
                <img
                  src={activePin.images[0]}
                  alt={activePin.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[#8E1B2D] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                    Featured in {activePin.city}
                  </span>
                  <span className="bg-emerald-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    {activePin.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[11px] text-amber-300 block">{activePin.neighborhood}</span>
                  <h4 className="font-serif text-lg font-bold">{activePin.title}</h4>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                  {activePin.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-stone-900/60 rounded-lg text-xs text-stone-300 text-center">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Bedrooms</span>
                    <span className="font-bold text-white">{activePin.beds} Beds</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Living Area</span>
                    <span className="font-bold text-white">{activePin.area} m²</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Value</span>
                    <span className="font-bold text-amber-300">{formatPrice(activePin.price)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => navigateTo('property-detail', activePin.id)}
                    className="flex-1 bg-[#8E1B2D] hover:bg-[#731524] text-white py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <span>View Property Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigateTo('properties', null, { city: activePin.city })}
                    className="px-3.5 py-2.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-white text-xs font-medium transition cursor-pointer"
                    title={`View all properties in ${activePin.city}`}
                  >
                    All in {activePin.city}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

