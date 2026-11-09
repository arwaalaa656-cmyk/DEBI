import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function Footer() {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed successfully!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-white text-stone-700 pt-16 pb-10 border-t border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column Footer Grid matching Figma Screen 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-200">
          {/* Column 1: Logo + About + Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#8E1B2D] flex items-center justify-center text-white shadow-xs">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-serif tracking-wider text-stone-900 font-bold block">
                  Grand Atlas
                </span>
                <span className="text-[10px] tracking-wider text-stone-500 uppercase -mt-0.5 block">
                  Real Estate Agency
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Specialized in luxury villas, residential estates, and exclusive properties across Morocco and the Atlas region.
            </p>

            {/* Social Icons matching Figma */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#8E1B2D] text-stone-600 hover:text-white flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#8E1B2D] text-stone-600 hover:text-white flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#8E1B2D] text-stone-600 hover:text-white flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#8E1B2D] text-stone-600 hover:text-white flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900">Quick Links</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#8E1B2D] transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#8E1B2D] transition cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('properties')} className="hover:text-[#8E1B2D] transition cursor-pointer">
                  Properties
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('destinations')} className="hover:text-[#8E1B2D] transition cursor-pointer">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#8E1B2D] transition cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900">Contact Info</h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8E1B2D] shrink-0 mt-0.5" />
                <span>Avenue Mohammed V, Guéliz, Marrakech, Morocco</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8E1B2D] shrink-0" />
                <span>+212 524 88 99 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8E1B2D] shrink-0" />
                <span>info@grandatlas.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900">Newsletter</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Subscribe to get latest property updates and market news.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-lg overflow-hidden border border-stone-300 focus-within:border-[#8E1B2D] bg-white">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs text-stone-900 bg-transparent focus:outline-none placeholder-stone-400"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#8E1B2D] hover:bg-[#731524] text-white px-3.5 py-2 flex items-center justify-center transition cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 text-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Grand Atlas Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
