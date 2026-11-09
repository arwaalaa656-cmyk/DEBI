import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createInquiry } from '../services/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building2,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Acquisition / Buying an Estate');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await createInquiry({
        propertyTitle: `General Advisory (${interest})`,
        name,
        email,
        phone,
        message: `[Interest: ${interest}] ${message}`,
        inquiryType: 'general-advisory',
      });

      if (res.status === 201) {
        setSubmittedResponse(res.data);
        showToast('Your message has been dispatched to our Advisory Desk', 'success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        showToast(res.error || 'Failed to submit inquiry', 'error');
      }
    } catch (e) {
      showToast('Network error, please retry', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner matching Figma Screen 8 */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
              alt="Office"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Client Desk & Notary Advisory</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold">
              Contact Grand Atlas Advisory
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Whether you are acquiring a royal palmeraie residence, seeking off-market Atlantic penthouses, or scheduling confidential consultations.
            </p>
          </div>
        </div>

        {/* Content Grid matching Figma Screen 8 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Flagship Offices
              </h3>

              {/* Marrakech Office */}
              <div className="space-y-2 pb-5 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#8E1B2D] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">Marrakech Headquarters</h4>
                    <span className="text-[11px] text-amber-700 font-medium">Palmeraie & Guéliz Desk</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 pl-10 leading-relaxed">
                  Résidence Les Jardins de Guéliz, Avenue Mohammed V, Marrakech 40000, Morocco
                </p>
                <div className="pl-10 text-xs text-stone-500 space-y-1">
                  <div>Phone: +212 524 88 99 00</div>
                  <div>Email: marrakech@grandatlas.com</div>
                </div>
              </div>

              {/* Casablanca Office */}
              <div className="space-y-2 pb-5 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#8E1B2D] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">Casablanca Corporate Tower</h4>
                    <span className="text-[11px] text-amber-700 font-medium">Marina Atlantic Suite</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 pl-10 leading-relaxed">
                  Twin Towers Marina, 14th Floor, Boulevard de la Corniche, Casablanca 20050, Morocco
                </p>
                <div className="pl-10 text-xs text-stone-500 space-y-1">
                  <div>Phone: +212 522 34 56 78</div>
                  <div>Email: casablanca@grandatlas.com</div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl">
                <Clock className="w-4 h-4 text-[#8E1B2D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Advisory & Showing Hours</span>
                  <span>Monday – Friday: 9:00 AM – 7:00 PM (GMT+1)</span>
                  <div className="text-[11px] text-stone-500">Saturday: Private viewings by confirmed appointment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form matching Figma Screen 8 */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#8E1B2D] uppercase tracking-wider block mb-1">
                Direct Inquiry Form
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Send a Confidential Inquiry
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Our managing director and legal team review all correspondence with strict non-disclosure.
              </p>
            </div>

            {submittedResponse && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block">Inquiry Logged (Reference: {submittedResponse.referenceCode})</span>
                  <span>Thank you for reaching out. We have registered your request and will follow up promptly.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#8E1B2D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#8E1B2D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+212 600 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#8E1B2D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Area of Interest</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#8E1B2D]"
                  >
                    <option value="Acquisition / Buying an Estate">Acquisition / Buying an Estate</option>
                    <option value="Selling a Luxury Residence">Selling a Luxury Residence</option>
                    <option value="Long-Term Seasonal Rental">Long-Term Seasonal Rental</option>
                    <option value="Notary & Title Regularization">Notary & Title Regularization</option>
                    <option value="Off-Market Private Portfolio Access">Off-Market Private Portfolio Access</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your requirements, preferred locations, and expected acquisition timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#8E1B2D]"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your information is encrypted and handled exclusively by licensed Grand Atlas brokers.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8E1B2D] hover:bg-[#731524] disabled:opacity-50 text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Confidential Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

