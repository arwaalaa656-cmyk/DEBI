import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getPropertyById } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import MortgageCalculator from '../components/MortgageCalculator';
import FloorPlanViewer from '../components/FloorPlanViewer';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Clock,
  Car,
  Home,
  MessageCircle,
  Calculator,
  Layers,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const {
    selectedPropertyId,
    navigateTo,
    favorites,
    toggleFavorite,
    formatPrice,
    openScheduleModal,
    showToast,
    t,
  } = useApp();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'floorplans' | 'calculator'

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      try {
        const res = await getPropertyById(selectedPropertyId);
        if (res.status === 200 && res.data) {
          setProperty(res.data);
          setActiveImageIndex(0);
        }
      } catch (e) {
        console.error('Failed to load property details:', e);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [selectedPropertyId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-6 w-48 bg-stone-200 rounded" />
        <div className="h-96 bg-stone-200 rounded-3xl" />
        <div className="h-40 bg-stone-200 rounded-2xl" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Property not found</h2>
        <button
          onClick={() => navigateTo('properties')}
          className="px-4 py-2 bg-[#8E1B2D] text-white rounded-lg text-xs"
        >
          Return to Properties
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(property.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property URL copied to clipboard', 'info');
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('properties')}
              className="flex items-center gap-1 hover:text-[#8E1B2D] transition font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Properties</span>
            </button>
            <span>/</span>
            <span>{property.city}</span>
            <span>/</span>
            <span className="text-stone-900 font-semibold truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#8E1B2D] transition cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#8E1B2D] text-[#8E1B2D]' : ''}`} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-stone-900 transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Header Block matching Figma Screen 3 */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white">
                {property.status}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-50 text-[#8E1B2D] border border-rose-200">
                {property.type}
              </span>
              {property.badge && (
                <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                  {property.badge}
                </span>
              )}
              <span className="text-xs text-stone-400 font-mono">Ref: {property.id.toUpperCase()}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600">
              <MapPin className="w-4 h-4 text-[#8E1B2D] shrink-0" />
              <span>{property.address}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs text-left lg:text-right w-full lg:w-auto">
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider block">
              {property.status === 'For Rent' ? 'Monthly Rental' : 'Offering Price'}
            </span>
            <div className="font-serif text-3xl font-bold text-stone-900">
              {formatPrice(property.status === 'For Rent' && property.rentalPrice ? property.rentalPrice : property.price)}
              {property.status === 'For Rent' && <span className="text-sm font-normal text-stone-500"> /mo</span>}
            </div>
            <span className="text-[11px] text-stone-600 block mt-0.5">
              ~{formatPrice(Math.round(property.price / property.area))} / m² • Taxes & Notary advisory available
            </span>
          </div>
        </div>

        {/* Gallery Preview matching Figma Screen 3 / 6 */}
        <div className="space-y-3">
          {/* Main big display */}
          <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden bg-stone-900 shadow-xl group">
            <img
              src={property.images[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-500"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full">
              Photo {activeImageIndex + 1} of {property.images.length}
            </div>
          </div>

          {/* Thumbnail Bar beneath main image */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-28 h-18 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#8E1B2D] scale-102 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex border-b border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-5 border-b-2 transition cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#8E1B2D] text-[#8E1B2D] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Property Overview & Amenities
          </button>
          <button
            onClick={() => setActiveTab('floorplans')}
            className={`py-3 px-5 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'floorplans'
                ? 'border-[#8E1B2D] text-[#8E1B2D] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Floor Plans & Scale</span>
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-5 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'border-[#8E1B2D] text-[#8E1B2D] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Mortgage & Yield Calculator</span>
          </button>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === 'floorplans' ? (
          <FloorPlanViewer propertyTitle={property.title} />
        ) : activeTab === 'calculator' ? (
          <MortgageCalculator defaultPrice={property.price} />
        ) : (
          /* Content Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Specifications & Description matching Figma */}
            <div className="lg:col-span-8 space-y-8">
              {/* Quick Metrics Bar */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-2 border-r border-stone-100">
                  <Bed className="w-5 h-5 text-[#8E1B2D] mx-auto mb-1" />
                  <span className="font-bold text-stone-900 text-lg block">{property.beds}</span>
                  <span className="text-xs text-stone-600">Bedrooms</span>
                </div>
                <div className="p-2 border-r border-stone-100">
                  <Bath className="w-5 h-5 text-[#8E1B2D] mx-auto mb-1" />
                  <span className="font-bold text-stone-900 text-lg block">{property.baths}</span>
                  <span className="text-xs text-stone-600">Bathrooms</span>
                </div>
                <div className="p-2 border-r border-stone-100">
                  <Maximize2 className="w-5 h-5 text-[#8E1B2D] mx-auto mb-1" />
                  <span className="font-bold text-stone-900 text-lg block">{property.area} m²</span>
                  <span className="text-xs text-stone-600">Living Space</span>
                </div>
                <div className="p-2">
                  <Home className="w-5 h-5 text-[#8E1B2D] mx-auto mb-1" />
                  <span className="font-bold text-stone-900 text-lg block">{property.lotSize} m²</span>
                  <span className="text-xs text-stone-600">Plot / Lot Area</span>
                </div>
              </div>

              {/* Description Narrative matching Figma Screen 3 */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Architectural Story & Residence Overview
                </h3>
                <div className="text-stone-700 text-sm leading-relaxed whitespace-pre-line space-y-3">
                  {property.description}
                </div>
              </div>

              {/* Comprehensive Amenities & Features Checklist */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Features & Private Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Property Registry & Technical Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-600 block text-[11px]">Construction Year</span>
                    <span className="font-bold text-stone-900 text-sm">{property.yearBuilt}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-600 block text-[11px]">Garages / Parking</span>
                    <span className="font-bold text-stone-900 text-sm">{property.garages} Dedicated Bays</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-600 block text-[11px]">Land Title Status</span>
                    <span className="font-bold text-emerald-700 text-sm">Conservation Foncière (Titled)</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-600 block text-[11px]">Heating & Climate</span>
                    <span className="font-bold text-stone-900 text-sm">Underfloor & Reversible HVAC</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-600 block text-[11px]">Energy Performance</span>
                    <span className="font-bold text-emerald-700 text-sm">A+ High Efficiency / Solar</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-600 block text-[11px]">Furnishing Option</span>
                    <span className="font-bold text-stone-900 text-sm">Bespoke Designer Furnished</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquire & Dedicated Broker Card */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              {/* Booking & Viewing Action Card */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[#8E1B2D] tracking-wider block">
                    Private Showing
                  </span>
                  <h4 className="font-serif text-xl font-bold text-stone-900">
                    Arrange an Exclusive Visit
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Confidential private walkthrough accompanied by our senior partner.
                  </p>
                </div>

                <button
                  onClick={() => openScheduleModal(property)}
                  className="w-full bg-[#8E1B2D] hover:bg-[#731524] text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Schedule Private Appointment</span>
                </button>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-stone-500">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Discreet & Bilingual VIP Service</span>
                </div>
              </div>

              {/* Dedicated Senior Broker Profile */}
              {property.agent && (
                <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#8E1B2D]"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                        Dedicated Advisor
                      </span>
                      <h5 className="font-serif font-bold text-stone-900 text-base">
                        {property.agent.name}
                      </h5>
                      <p className="text-xs text-stone-600">{property.agent.title}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center gap-2 text-stone-700 hover:text-[#8E1B2D] p-2 rounded-lg bg-stone-50 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#8E1B2D]" />
                      <span>{property.agent.phone}</span>
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center gap-2 text-stone-700 hover:text-[#8E1B2D] p-2 rounded-lg bg-stone-50 transition"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#8E1B2D]" />
                      <span>{property.agent.email}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Similar / Related Properties Row */}
        {property.similarProperties && property.similarProperties.length > 0 && (
          <div className="pt-12 border-t border-stone-200 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Similar Prestige Estates in {property.city}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {property.similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white text-sm bg-stone-800 p-2 rounded-full hover:bg-stone-700"
          >
            ✕ Close
          </button>
          <img
            src={property.images[activeImageIndex]}
            alt="fullscreen"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
