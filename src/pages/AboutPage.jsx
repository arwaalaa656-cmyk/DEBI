import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Award, Shield, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { navigateTo, openScheduleModal } = useApp();

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=80"
              alt="Architecture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Established 2012 in Marrakech</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold">
              The Grand Atlas Legacy
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Preserving and curating Morocco's finest architectural landmarks, royal palmeraie estates, and modern ocean residences.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-stone-700 text-sm leading-relaxed">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8E1B2D] block">
              Our Heritage & Philosophy
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 leading-snug">
              Where Moroccan Architectural Heritage Meets International Prestige
            </h2>
            <p>
              Founded over a decade ago in the imperial city of Marrakech, Grand Atlas was born from a singular mission: to provide discerning international collectors, architectural enthusiasts, and royal families with an uncompromising standard of advisory in the Moroccan luxury property sector.
            </p>
            <p>
              Every property represented within our portfolio undergoes rigorous legal title verification with the Kingdom’s <em>Conservation Foncière</em>, architectural structural audits, and historical provenance vetting.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-stone-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bespoke Private Representation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Conservation Foncière Titling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Notary & Tax Structuring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Architectural Restorations</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Atlas Villa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8E1B2D]">
              Advisory Leadership
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Senior Partners & Brokers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Yasmine"
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#8E1B2D]"
              />
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">Yasmine Benjelloun</h4>
                <p className="text-xs text-[#8E1B2D] font-medium">Managing Partner, Marrakech</p>
                <p className="text-xs text-stone-500 mt-2">
                  Specialist in historic medina riads and Palmeraie golf estates with 16 years of luxury brokerage experience.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt="Mehdi"
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#8E1B2D]"
              />
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">Mehdi Alami</h4>
                <p className="text-xs text-[#8E1B2D] font-medium">Managing Director, Casablanca & Coast</p>
                <p className="text-xs text-stone-500 mt-2">
                  Oversees commercial transactions, luxury oceanfront towers in Casablanca, and private estates in Taghazout.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
                alt="Nadia"
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#8E1B2D]"
              />
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">Nadia Tazi</h4>
                <p className="text-xs text-[#8E1B2D] font-medium">Director, Tangier & Mediterranean</p>
                <p className="text-xs text-stone-500 mt-2">
                  Authority on Cap Spartel cliffside properties and historical heritage estates across Northern Morocco.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-3xl text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Schedule a Confidential Consultation
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-light">
            Discuss your acquisition criteria or property valuation with our managing partners.
          </p>
          <button
            onClick={() => openScheduleModal()}
            className="bg-[#8E1B2D] hover:bg-[#731524] text-white px-6 py-3 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Request Private Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

