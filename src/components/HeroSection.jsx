import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Home, DollarSign, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' | 'rent' | 'sell'
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    let minPrice = undefined;
    let maxPrice = undefined;

    if (priceRange === 'under-1m') maxPrice = 1000000;
    else if (priceRange === '1m-2m') { minPrice = 1000000; maxPrice = 2000000; }
    else if (priceRange === '2m-3m') { minPrice = 2000000; maxPrice = 3000000; }
    else if (priceRange === '3m-plus') minPrice = 3000000;

    navigateTo('properties', null, {
      city: city || undefined,
      type: type || undefined,
      status: activeTab === 'rent' ? 'For Rent' : activeTab === 'buy' ? 'For Sale' : undefined,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="relative">
      {/* Hero Banner matching Figma Screen 1 */}
      <div className="relative bg-stone-900 text-white min-h-[500px] sm:min-h-[560px] lg:min-h-[580px] flex items-center justify-center overflow-hidden">
        {/* Exact Hero Image from Figma */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-figma.jpg"
            alt="Grand Atlas Luxury Villa"
            className="w-full h-full object-cover object-center brightness-75 scale-102"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Left Slider Dots/Indicators matching Figma Screen 1 */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20 text-xs font-mono text-white/70">
          {['01', '02', '03'].map((num, i) => (
            <button
              key={num}
              onClick={() => setActiveSlide(i)}
              className={`flex items-center gap-2.5 transition cursor-pointer text-left ${
                activeSlide === i ? 'text-white font-bold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSlide === i ? 'bg-[#8E1B2D] scale-125' : 'bg-white/40'
                }`}
              />
              <span className="tracking-widest">{num}</span>
            </button>
          ))}
        </div>

        {/* Hero Central Text matching Figma */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-200 font-semibold block">
            Discover Your Dream Property
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            FIND YOUR BEST REAL ESTATE
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto font-light leading-relaxed">
            We help you find the finest luxury villas, modern apartments, and private estates across Morocco.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('properties')}
              className="inline-flex items-center gap-2 bg-[#8E1B2D] hover:bg-[#731524] text-white px-8 py-3 rounded-md text-sm font-semibold shadow-lg transition duration-200 cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Multi-field Search Card matching Figma Screen 1 */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 sm:-mt-12 relative z-30">
        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200/80 p-3 sm:p-5">
          {/* Top Tabs: Buy / Rent / Sell matching Figma */}
          <div className="flex items-center justify-center gap-4 mb-4 border-b border-stone-100 pb-3">
            {[
              { id: 'buy', label: 'Buy' },
              { id: 'rent', label: 'Rent' },
              { id: 'sell', label: 'Sell' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#8E1B2D] text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Fields: Unified clean columns matching Figma */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:divide-x lg:divide-stone-200 items-center text-stone-800"
          >
            {/* Location */}
            <div className="px-3 py-2 text-left">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#8E1B2D]" />
                Location
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="">Select Location</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Tangier">Tangier</option>
                <option value="High Atlas">High Atlas</option>
                <option value="Agadir & Taghazout">Agadir</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="px-3 py-2 text-left">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                <Home className="w-3.5 h-3.5 text-[#8E1B2D]" />
                Property Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Riad">Riad</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="px-3 py-2 text-left">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#8E1B2D]" />
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="">Select Budget</option>
                <option value="under-1m">Under $1,000,000</option>
                <option value="1m-2m">$1M - $2,000,000</option>
                <option value="2m-3m">$2M - $3,000,000</option>
                <option value="3m-plus">$3,000,000 +</option>
              </select>
            </div>

            {/* Solid Red Search Button matching Figma */}
            <div className="px-3 py-1">
              <button
                type="submit"
                className="w-full h-11 bg-[#8E1B2D] hover:bg-[#731524] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
