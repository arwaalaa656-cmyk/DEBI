import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createInquiry } from '../services/api';
import { PROPERTIES } from '../data/mockData';
import { X, Calendar, Clock, CheckCircle, ShieldCheck, User, Mail, Phone, MessageSquare, Building2 } from 'lucide-react';

export default function ScheduleModal() {
  const { isScheduleModalOpen, setIsScheduleModalOpen, scheduleTargetProperty, showToast } = useApp();

  const [selectedPropertyId, setSelectedPropertyId] = useState(
    scheduleTargetProperty?.id || PROPERTIES[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 - 13:00');
  const [inquiryType, setInquiryType] = useState('Private In-Person Tour');
  const [message, setMessage] = useState('I am interested in scheduling a confidential viewing of this property.');
  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  if (!isScheduleModalOpen) return null;

  const currentProperty =
    PROPERTIES.find((p) => p.id === selectedPropertyId) || scheduleTargetProperty || PROPERTIES[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      showToast('Please provide your name and email', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await createInquiry({
        propertyId: currentProperty.id,
        propertyTitle: currentProperty.title,
        name: fullName,
        email,
        phone,
        message,
        date,
        timeSlot,
        inquiryType,
      });

      if (res.status === 201) {
        setSubmittedResult(res.data);
        showToast('Viewing request submitted successfully!', 'success');
      } else {
        showToast(res.error || 'Submission failed', 'error');
      }
    } catch (err) {
      showToast('Network error, please retry', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmittedResult(null);
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8E1B2D] flex items-center justify-center text-white">
              <Calendar className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Schedule a Private Viewing</h3>
              <p className="text-xs text-stone-400">Grand Atlas VIP Concierge & Advisory</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-stone-400 hover:text-white p-1 rounded-md hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedResult ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif text-2xl font-bold text-stone-900">Viewing Request Confirmed</h4>
              <p className="text-sm text-stone-600 mt-2">
                Thank you, <strong className="text-stone-900">{submittedResult.name}</strong>. Our senior real estate partner has received your request and will contact you via WhatsApp / email within 2 hours.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Booking Reference:</span>
                <span className="font-mono font-bold text-[#8E1B2D] text-sm">{submittedResult.referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estate:</span>
                <span className="font-semibold text-stone-800">{submittedResult.propertyTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Requested Date & Window:</span>
                <span className="font-semibold text-stone-800">{submittedResult.preferredDate} ({submittedResult.preferredTimeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Client Email:</span>
                <span className="font-semibold text-stone-800">{submittedResult.email}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-[#8E1B2D] hover:bg-[#731524] text-white py-3 rounded-lg text-sm font-semibold transition cursor-pointer"
            >
              Done & Return to Portfolio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Target Property Preview */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-3">
              <img
                src={currentProperty.images[0]}
                alt={currentProperty.title}
                className="w-16 h-14 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#8E1B2D] tracking-wider block">
                  {currentProperty.city} • {currentProperty.type}
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                  {currentProperty.title}
                </h4>
                <span className="text-xs text-stone-500">{currentProperty.neighborhood}</span>
              </div>
            </div>

            {/* Select Estate dropdown (if not opened from specific property) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">Select Estate</label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#8E1B2D]"
              >
                {PROPERTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} - {p.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8E1B2D]" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#8E1B2D]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8E1B2D]" />
                  Time Window
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#8E1B2D]"
                >
                  <option value="09:00 - 11:00">Morning (09:00 - 11:00)</option>
                  <option value="11:00 - 13:00">Mid-day (11:00 - 13:00)</option>
                  <option value="14:00 - 16:00">Afternoon (14:00 - 16:00)</option>
                  <option value="16:00 - 18:00">Sunset Hour (16:00 - 18:00)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lord Alexander Bennett"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#8E1B2D]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="alexander@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#8E1B2D]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                Phone Number / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="+212 600 000000 or international"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#8E1B2D]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                Special Requirements or Questions
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#8E1B2D]"
              />
            </div>

            {/* Privacy note */}
            <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strictly non-disclosure confidentiality. Direct booking with Grand Atlas Partners.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8E1B2D] hover:bg-[#731524] disabled:opacity-50 text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            >
              {loading ? 'Submitting to API...' : 'Confirm Private Viewing Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

