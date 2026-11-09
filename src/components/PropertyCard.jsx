import React from 'react';
import { useApp } from '../context/AppContext';
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowUpRight } from 'lucide-react';

export default function PropertyCard({ property }) {
  const { navigateTo, favorites, toggleFavorite, formatPrice, openScheduleModal } = useApp();

  const isFav = favorites.includes(property.id);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image Container with Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Green Status Badge matching Figma */}
            <span
              className={`px-2.5 py-1 rounded text-xs font-semibold tracking-wide shadow-xs ${
                property.status === 'For Sale'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {property.status}
            </span>

            {/* Sub-badge */}
            {property.badge && (
              <span className="bg-stone-900/80 backdrop-blur-xs text-amber-200 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-300/30">
                {property.badge}
              </span>
            )}
          </div>

          {/* Favorite heart toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-[#8E1B2D] hover:bg-white shadow-sm transition cursor-pointer"
            title={isFav ? 'Remove from favorites' : 'Save property'}
          >
            <Heart
              className={`w-4 h-4 transition ${
                isFav ? 'fill-[#8E1B2D] text-[#8E1B2D]' : 'text-stone-700'
              }`}
            />
          </button>
        </div>

        {/* Bottom overlay: Location badge */}
        <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-1.5 text-xs font-medium drop-shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate">{property.neighborhood}, {property.city}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start gap-2">
            <span className="text-[11px] font-semibold text-[#8E1B2D] uppercase tracking-wider">
              {property.type}
            </span>
            <span className="text-xs text-stone-600 flex items-center gap-1">
              ★ {property.rating}
            </span>
          </div>

          <h3
            onClick={() => navigateTo('property-detail', property.id)}
            className="font-serif text-lg text-stone-900 font-semibold group-hover:text-[#8E1B2D] transition line-clamp-1 mt-1 cursor-pointer"
          >
            {property.title}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
            {property.subtitle || property.description}
          </p>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-stone-50/80 rounded-lg border border-stone-100 text-stone-600 text-xs">
          <div className="flex items-center gap-1.5 justify-center">
            <Bed className="w-4 h-4 text-stone-400" />
            <span className="font-semibold text-stone-800">{property.beds}</span>
            <span className="text-stone-500 text-[11px]">Beds</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center border-x border-stone-200/80">
            <Bath className="w-4 h-4 text-stone-400" />
            <span className="font-semibold text-stone-800">{property.baths}</span>
            <span className="text-stone-500 text-[11px]">Baths</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-semibold text-stone-800">{property.area}</span>
            <span className="text-stone-500 text-[11px]">m²</span>
          </div>
        </div>

        {/* Price & Action button matching Figma */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-600 font-medium block">
              {property.status === 'For Rent' ? 'Monthly Rental' : 'Offering Price'}
            </span>
            <span className="text-lg font-bold text-stone-900 font-serif">
              {formatPrice(property.status === 'For Rent' && property.rentalPrice ? property.rentalPrice : property.price)}
              {property.status === 'For Rent' && <span className="text-xs font-normal text-stone-500"> /mo</span>}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigateTo('property-detail', property.id)}
              className="bg-[#8E1B2D] hover:bg-[#731524] text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition cursor-pointer"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

