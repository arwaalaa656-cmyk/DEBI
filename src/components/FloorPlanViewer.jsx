import React, { useState } from 'react';
import { Layers, Maximize2, Compass, CheckCircle } from 'lucide-react';

export default function FloorPlanViewer({ propertyTitle = 'Villa Palmeraie Royale' }) {
  const [activeFloor, setActiveFloor] = useState('ground'); // 'ground' | 'first' | 'rooftop'

  const floorData = {
    ground: {
      name: 'Ground Level (Rez-de-chaussée)',
      area: '340 m²',
      rooms: [
        { name: 'Grand Moroccan Salon', size: '72 m²', desc: 'Double height with cedar wood ceiling and stone hearth' },
        { name: 'Modern Gourmet Kitchen & Pantry', size: '38 m²', desc: 'Bulthaup custom cabinetry & sub-zero units' },
        { name: 'Private Traditional Marble Hammam', size: '24 m²', desc: 'Heated tadelakt steam room & relaxation fountain' },
        { name: 'Guest Suite 1 & 2 (En-Suite)', size: '45 m²', desc: 'Direct terrace access to infinity pool' },
        { name: 'Covered Dining Loggia', size: '55 m²', desc: 'Al fresco dining overlooking High Atlas' },
      ],
    },
    first: {
      name: 'First Level (Premier Étage)',
      area: '230 m²',
      rooms: [
        { name: 'Master Presidential Wing', size: '85 m²', desc: 'Dual walk-in dressing rooms & panoramic soaking tub' },
        { name: 'Junior Suite 3 & 4', size: '42 m²', desc: 'Private balconies facing olive gardens' },
        { name: 'Executive Library / Private Study', size: '28 m²', desc: 'Acoustically insulated with fireplace' },
        { name: 'Family Lounge & Media Room', size: '36 m²', desc: 'Custom built-in sound system' },
      ],
    },
    rooftop: {
      name: 'Panoramic Rooftop & Solarium (Toit-Terrasse)',
      area: '180 m²',
      rooms: [
        { name: 'Atlas Sunset Deck', size: '80 m²', desc: '360-degree unobstructed views of snow-capped peaks' },
        { name: 'Outdoor Sky Bar & Lounge', size: '40 m²', desc: 'Integrated outdoor kitchen and fire pit' },
        { name: 'Private Sunbathing Solarium', size: '60 m²', desc: 'Pergola shaded daybeds' },
      ],
    },
  };

  const current = floorData[activeFloor];

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8E1B2D] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Architectural Floor Layouts & Blueprints
            </h3>
            <p className="text-xs text-stone-500">
              Scale layout plans for {propertyTitle}
            </p>
          </div>
        </div>

        {/* Floor Switcher */}
        <div className="flex p-1 bg-stone-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveFloor('ground')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeFloor === 'ground' ? 'bg-white text-[#8E1B2D] shadow-xs' : 'text-stone-600'
            }`}
          >
            Ground (340 m²)
          </button>
          <button
            onClick={() => setActiveFloor('first')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeFloor === 'first' ? 'bg-white text-[#8E1B2D] shadow-xs' : 'text-stone-600'
            }`}
          >
            Level 1 (230 m²)
          </button>
          <button
            onClick={() => setActiveFloor('rooftop')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeFloor === 'rooftop' ? 'bg-white text-[#8E1B2D] shadow-xs' : 'text-stone-600'
            }`}
          >
            Rooftop (180 m²)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Blueprint Graphic */}
        <div className="lg:col-span-7 bg-stone-950 rounded-2xl p-6 min-h-[300px] flex items-center justify-center relative overflow-hidden border border-stone-800 shadow-inner">
          {/* Blueprint Grid Lines */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 w-full max-w-md border-2 border-dashed border-[#8E1B2D]/70 bg-stone-900/80 p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs text-amber-200 border-b border-stone-800 pb-2">
              <span className="font-mono font-bold">{current.name}</span>
              <span className="bg-[#8E1B2D] text-white px-2 py-0.5 rounded text-[11px] font-bold">{current.area}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {current.rooms.map((r, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                  <div className="flex justify-between text-white font-semibold">
                    <span className="truncate">{r.name}</span>
                    <span className="text-amber-300 font-mono text-[10px] shrink-0 ml-1">{r.size}</span>
                  </div>
                  <p className="text-[10px] text-stone-400 line-clamp-1">{r.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1 font-mono">
              <span>Scale: 1:100 Metric</span>
              <span>Cadastral Ref: MA-40000-EST</span>
            </div>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="lg:col-span-5 space-y-3 text-xs">
          <h4 className="font-serif font-bold text-stone-900 text-sm">
            Room Inventory & Dimension Specs
          </h4>
          <div className="space-y-2">
            {current.rooms.map((room, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#8E1B2D] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-stone-900">{room.name}</span>
                    <span className="font-mono font-bold text-[#8E1B2D] text-[11px]">{room.size}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">{room.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
