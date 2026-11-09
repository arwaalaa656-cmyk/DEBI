import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROPERTIES } from '../data/mockData';
import HeroSection from '../components/HeroSection';
import {
  MapPin,
  ArrowRight,
  Bed,
  Bath,
  Maximize2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

// Egypt Luxury Destinations with Google Maps Embeds & Property Highlights
const EGYPT_MAP_DESTINATIONS = [
  {
    id: 'all-egypt',
    name: 'مصر بالكامل',
    enName: 'All Egypt',
    city: 'Egypt (جمهورية مصر العربية)',
    neighborhood: 'Prime Luxury Destinations',
    title: 'Grand Atlas Luxury Portfolio Egypt',
    price: 3200000,
    beds: 6,
    baths: 7,
    area: 720,
    image: '/hero-figma.jpg',
    // Official Google Maps Embed for Egypt
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7237279.799786445!2d25.556277274026856!3d26.83495495574526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45bbd6def532f3!2sEgypt!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg',
    externalUrl: 'https://www.google.com/maps/place/Egypt',
    propertyId: 'ga-101',
  },
  {
    id: 'new-cairo',
    name: 'القاهرة الجديدة',
    enName: 'New Cairo',
    city: 'New Cairo (القاهرة الجديدة)',
    neighborhood: 'Golden Square, Fifth Settlement',
    title: 'The Grand Palace at Golden Square',
    price: 3200000,
    beds: 6,
    baths: 7,
    area: 720,
    image: '/hero-figma.jpg',
    // Google Maps Embed focused on New Cairo
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110540.35417859846!2d31.398642397265624!3d30.010729799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822c9535e5d31%3A0xa196f7c8ec833446!2sNew%20Cairo%20City%2C%20Cairo%20Governorate!5e0!3m2!1sar!2seg!4v1700000000001!5m2!1sar!2seg',
    externalUrl: 'https://www.google.com/maps/place/New+Cairo+City',
    propertyId: 'ga-101',
  },
  {
    id: 'sheikh-zayed',
    name: 'الشيخ زايد',
    enName: 'Sheikh Zayed',
    city: 'Sheikh Zayed (الشيخ زايد)',
    neighborhood: 'Allegria Golf & Beverly Hills',
    title: 'Signature Golf Villa West Cairo',
    price: 2450000,
    beds: 5,
    baths: 6,
    area: 580,
    image: '/assets/about-villa.jpg',
    // Google Maps Embed focused on Sheikh Zayed City
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55269.46736295551!2d30.932454649999997!3d30.04854585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585675f92262d9%3A0x1bbba469449bc984!2sSheikh%20Zayed%20City%2C%20Giza%20Governorate!5e0!3m2!1sar!2seg!4v1700000000002!5m2!1sar!2seg',
    externalUrl: 'https://www.google.com/maps/place/Sheikh+Zayed+City',
    propertyId: 'ga-102',
  },
  {
    id: 'north-coast',
    name: 'الساحل الشمالي',
    enName: 'North Coast / Alamein',
    city: 'North Coast (الساحل الشمالي)',
    neighborhood: 'New Alamein & Marassi Bay',
    title: 'Waterfront Lagoon & Sea Estate',
    price: 2850000,
    beds: 5,
    baths: 6,
    area: 520,
    image: '/assets/prop-pool.jpg',
    // Google Maps Embed focused on New Alamein / Sahel
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110023.77884845946!2d28.850414999999998!3d30.8358245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5848bb228c2e1%3A0x2db3158c35bb5484!2sNew%20Alamein%20City%2C%20Matrouh%20Governorate!5e0!3m2!1sar!2seg!4v1700000000003!5m2!1sar!2seg',
    externalUrl: 'https://www.google.com/maps/place/New+Alamein+City',
    propertyId: 'ga-103',
  },
  {
    id: 'alexandria',
    name: 'الإسكندرية',
    enName: 'Alexandria',
    city: 'Alexandria (الإسكندرية)',
    neighborhood: 'San Stefano & Gleem Corniche',
    title: 'Corniche Mediterranean Luxury Duplex',
    price: 1650000,
    beds: 4,
    baths: 4,
    area: 390,
    image: '/assets/prop-interior.jpg',
    // Google Maps Embed focused on Alexandria
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109156.40149021464!2d29.89725835!3d31.22432925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c4912689d0ff%3A0x47a469733c7f827!2sAlexandria%2C%20Alexandria%20Governorate!5e0!3m2!1sar!2seg!4v1700000000005!5m2!1sar!2seg',
    externalUrl: 'https://www.google.com/maps/place/Alexandria',
    propertyId: 'ga-104',
  },
  {
    id: 'el-gouna',
    name: 'الجونة',
    enName: 'El Gouna',
    city: 'El Gouna (الجونة)',
    neighborhood: 'Fanadir Lagoons & Marina',
    title: 'Private Island Water Villa',
    price: 2150000,
    beds: 5,
    baths: 5,
    area: 480,
    image: '/assets/prop-sunset.jpg',
    // Google Maps Embed focused on El Gouna
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56345.163351913165!2d33.642131999999996!3d27.39489245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145260f8525b399d%3A0x8d5c4115456fef38!2sEl%20Gouna%2C%20Hurghada%2C%20Red%20Sea%20Governorate!5e0!3m2!1sar!2seg!4v1700000000004!5m2!1sar!2seg',
    externalUrl: 'https://www.google.com/maps/place/El+Gouna',
    propertyId: 'ga-105',
  },
  {
    id: 'sharm',
    name: 'شرم الشيخ',
    enName: 'Sharm El Sheikh',
    city: 'Sharm El Sheikh (شرم الشيخ)',
    neighborhood: 'Ras Um Sid & Naama Bay',
    title: 'Red Sea Cliffside Panoramic Villa',
    price: 1890000,
    beds: 5,
    baths: 5,
    area: 450,
    image: '/assets/prop-estate.jpg',
    // Google Maps Embed focused on Sharm El Sheikh
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113405.35246738914!2d34.256241399999996!3d27.91581785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14533036e5223035%3A0x6b4fb4eb33a92025!2sSharm%20El-Sheikh%2C%20South%20Sinai%20Governorate!5e0!3m2!1sar!2seg!4v1700000000006!5m2!1sar!2seg',
    externalUrl: 'https://www.google.com/maps/place/Sharm+El-Sheikh',
    propertyId: 'ga-106',
  },
];

export default function HomePage() {
  const { navigateTo, formatPrice } = useApp();
  const [properties] = useState(PROPERTIES);
  const [activeDestination, setActiveDestination] = useState(EGYPT_MAP_DESTINATIONS[0]);

  // First 3 properties for "Featured Properties"
  const featuredThree = properties.slice(0, 3);
  // Next 3 properties for "Latest Properties"
  const latestThree = properties.slice(3, 6);

  return (
    <div className="space-y-20 pb-20 bg-white">
      {/* 1. Hero Section + Floating Search matching Figma */}
      <HeroSection />

      {/* 2. ABOUT US SECTION matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Centered Category Badge */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#8E1B2D] pb-1 border-b-2 border-[#8E1B2D]">
            About Us
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: House Image with Rounded Top-Left corner matching Figma */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-tl-[70px] rounded-br-[24px] rounded-tr-[24px] rounded-bl-[24px] overflow-hidden shadow-xl border border-stone-200">
              <img
                src="/assets/about-villa.jpg"
                alt="Grand Atlas Luxury Villa"
                className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-105 transition duration-700"
              />
            </div>
            {/* Subtle red accent back-drop matching Figma */}
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-[#8E1B2D]/10 rounded-full -z-10" />
          </div>

          {/* Right Column: Narrative + Red Button matching Figma */}
          <div className="lg:col-span-6 space-y-5 text-stone-700">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              We Help You Find Your Dream Property
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Grand Atlas is a premier real estate agency with over a decade of excellence in luxury residential properties. We connect buyers and investors with exceptional villas, penthouses, and private estates across prime locations.
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our professional team provides complete legal due diligence, title registration, and personalized guidance every step of the way.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="bg-[#8E1B2D] hover:bg-[#731524] text-white px-7 py-3 rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES ROW (3 Cards) matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Category Badge */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#8E1B2D] pb-1 border-b-2 border-[#8E1B2D]">
            Featured Properties
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Explore Handpicked Homes
          </h2>
        </div>

        {/* Row of 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {featuredThree.map((prop) => (
            <div
              key={prop.id}
              onClick={() => navigateTo('property-detail', prop.id)}
              className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#8E1B2D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  {prop.status}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8E1B2D] tracking-wide">
                    {formatPrice(prop.price)}
                  </span>
                  <h3 className="font-serif font-bold text-stone-900 text-sm mt-0.5 group-hover:text-[#8E1B2D] transition truncate">
                    {prop.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8E1B2D]" />
                    <span className="truncate">{prop.neighborhood}, {prop.city}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-[11px] text-stone-600">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-stone-400" /> {prop.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-stone-400" /> {prop.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-stone-400" /> {prop.area} m²
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered View All Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigateTo('properties')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#8E1B2D] hover:underline cursor-pointer"
          >
            <span>View All Properties</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. MAP SECTION: EXPLORE PROPERTIES ON MAP (GOOGLE MAPS EGYPT - خرائط جوجل مصر) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#8E1B2D] pb-1 border-b-2 border-[#8E1B2D]">
            Our Location • خرائط Google ماب مصر
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Explore Properties on Map
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            استكشف مواقع العقارات الفاخرة مباشرة عبر خرائط Google الرسمية في جمهورية مصر العربية
          </p>
        </div>

        {/* Quick Egyptian Cities Selector Tabs on Top of Google Map */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
          {EGYPT_MAP_DESTINATIONS.map((dest) => {
            const isSelected = activeDestination.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => setActiveDestination(dest)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#8E1B2D] text-white shadow-md scale-105'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#8E1B2D]'}`} />
                <span>{dest.name}</span>
                <span className="text-[10px] opacity-75">({dest.enName})</span>
              </button>
            );
          })}
        </div>

        {/* Google Maps Container */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-2xl bg-stone-100 min-h-[460px] sm:min-h-[500px]">
          {/* Live Official Google Map */}
          <iframe
            key={activeDestination.id}
            title={`Google Map - ${activeDestination.name}`}
            src={activeDestination.embedUrl}
            className="w-full h-[480px] sm:h-[520px] border-0"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Selected Egyptian Property Info Card matching Figma design */}
          <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-2xl max-w-sm hidden sm:flex items-center gap-3.5 transition-all">
            <img
              src={activeDestination.image}
              alt={activeDestination.title}
              className="w-16 h-16 object-cover rounded-lg shrink-0 border border-stone-200 shadow-xs"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#8E1B2D] block">
                {formatPrice(activeDestination.price)}
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-xs truncate">
                {activeDestination.title}
              </h4>
              <span className="text-[11px] text-stone-600 block truncate">
                {activeDestination.neighborhood}
              </span>
              <span className="text-[10px] font-semibold text-stone-500 block truncate">
                {activeDestination.city}
              </span>

              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100">
                <button
                  onClick={() => navigateTo('property-detail', activeDestination.propertyId)}
                  className="text-[11px] text-[#8E1B2D] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>عرض التفاصيل</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <a
                  href={activeDestination.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 font-medium"
                >
                  <span>فتح في Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST PROPERTIES (3 Cards) matching Figma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Category Badge */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#8E1B2D] pb-1 border-b-2 border-[#8E1B2D]">
            Latest Properties
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Recently Added to Portfolio
          </h2>
        </div>

        {/* Row of 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {latestThree.map((prop) => (
            <div
              key={prop.id}
              onClick={() => navigateTo('property-detail', prop.id)}
              className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#8E1B2D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  {prop.status}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8E1B2D] tracking-wide">
                    {formatPrice(prop.price)}
                  </span>
                  <h3 className="font-serif font-bold text-stone-900 text-sm mt-0.5 group-hover:text-[#8E1B2D] transition truncate">
                    {prop.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8E1B2D]" />
                    <span className="truncate">{prop.neighborhood}, {prop.city}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-[11px] text-stone-600">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-stone-400" /> {prop.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-stone-400" /> {prop.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-stone-400" /> {prop.area} m²
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Load More / View More Button matching Figma */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('properties')}
            className="bg-[#8E1B2D] hover:bg-[#731524] text-white px-8 py-3 rounded-lg text-xs font-semibold shadow-md transition duration-200 cursor-pointer"
          >
            View More Properties
          </button>
        </div>
      </section>
    </div>
  );
}
