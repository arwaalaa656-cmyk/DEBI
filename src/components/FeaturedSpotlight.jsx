import React from 'react';
import { useApp } from '../context/AppContext';
import { PROPERTIES } from '../data/mockData';
import { Bed, Bath, Maximize2, MapPin, Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function FeaturedSpotlight() {
  const { navigateTo, openScheduleModal, formatPrice } = useApp();

  const property = PROPERTIES[0]; // Villa Palmeraie Royale

  if (!property) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8E1B2D] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Spotlight of the Month</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              The Grand Estate Highlight
            </h2>
          </div>
          <button
            onClick={() => navigateTo('properties')}
            className="text-xs font-semibold text-[#8E1B2D] hover:text-[#731524] flex items-center gap-1 group cursor-pointer"
          >
            <span>View All Exclusive Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Spotlight Card with Rounded Aesthetics matching Figma */}
        <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Image Gallery Preview with Curved Edge */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] overflow-hidden group">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex gap-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {property.status}
              </span>
              <span className="bg-stone-900/80 backdrop-blur-xs text-amber-200 text-xs font-medium px-3 py-1 rounded-full border border-amber-300/30">
                Palmeraie Heritage
              </span>
            </div>

            {/* Micro thumbnail strip */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.slice(1, 4).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateTo('property-detail', property.id)}
                    className="w-16 h-12 rounded-lg overflow-hidden border-2 border-white/80 shadow-md shrink-0 cursor-pointer hover:border-[#8E1B2D] transition"
                  >
                    <img src={img} alt="detail" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md ml-auto">
                +14 Verified Photos
              </span>
            </div>
          </div>

          {/* Right Column: Narrative & Specifications */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-[#8E1B2D]" />
                <span>{property.neighborhood}, {property.city}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                {property.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {property.description.slice(0, 240)}...
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-stone-200/80">
              <div className="text-center p-2 rounded-lg bg-stone-50">
                <Bed className="w-4 h-4 text-[#8E1B2D] mx-auto mb-1" />
                <span className="block font-bold text-stone-900 text-base">{property.beds}</span>
                <span className="text-[11px] text-stone-600">Bedrooms</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-stone-50">
                <Bath className="w-4 h-4 text-[#8E1B2D] mx-auto mb-1" />
                <span className="block font-bold text-stone-900 text-base">{property.baths}</span>
                <span className="text-[11px] text-stone-600">Bathrooms</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-stone-50">
                <Maximize2 className="w-4 h-4 text-[#8E1B2D] mx-auto mb-1" />
                <span className="block font-bold text-stone-900 text-base">{property.area} m²</span>
                <span className="text-[11px] text-stone-600">Living Space</span>
              </div>
            </div>

            {/* Amenities Highlights */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                Highlighted Amenities
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-stone-600">
                {property.features.slice(0, 4).map((feat, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-600 block">Offered At</span>
                <span className="text-2xl font-serif font-bold text-stone-900">
                  {formatPrice(property.price)}
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => openScheduleModal(property)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-semibold transition cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#8E1B2D]" />
                  <span>Book Visit</span>
                </button>
                <button
                  onClick={() => navigateTo('property-detail', property.id)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#8E1B2D] hover:bg-[#731524] text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  <span>Explore Estate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

