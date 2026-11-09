import React, { useState } from 'react';
import { useApp, CURRENCIES } from '../context/AppContext';
import {
  Heart,
  Menu,
  X,
  Building2,
} from 'lucide-react';

export default function Navbar() {
  const {
    currentPage,
    navigateTo,
    favorites,
    currency,
    setCurrency,
    language,
    setLanguage,
    openScheduleModal,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'properties', label: 'Properties' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching Figma (Red Crest + Text) */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-[#8E1B2D] flex items-center justify-center text-white shadow-sm">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-serif tracking-wider text-stone-900 font-bold group-hover:text-[#8E1B2D] transition">
              Grand Atlas
            </div>
            <div className="text-[10px] tracking-wider text-stone-500 uppercase -mt-0.5">
              Real Estate Agency
            </div>
          </div>
        </button>

        {/* Desktop Links (Centered in Figma) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`text-sm font-medium transition relative py-1 cursor-pointer ${
                currentPage === link.id
                  ? 'text-[#8E1B2D] font-bold'
                  : 'text-stone-700 hover:text-[#8E1B2D]'
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8E1B2D] rounded-full"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Right CTA Button matching Figma Screen 1 */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => openScheduleModal()}
            className="bg-[#8E1B2D] hover:bg-[#731524] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => openScheduleModal()}
            className="px-3 py-1.5 bg-[#8E1B2D] text-white rounded-lg text-xs font-semibold"
          >
            Contact
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 rounded-lg hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateTo(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentPage === link.id
                  ? 'bg-rose-50 text-[#8E1B2D] font-bold'
                  : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                navigateTo('properties', null, { onlyFavorites: true });
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-stone-700 font-semibold"
            >
              <Heart className="w-4 h-4 text-[#8E1B2D]" />
              <span>Saved ({favorites.length})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
