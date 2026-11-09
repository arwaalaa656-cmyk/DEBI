import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getProperties, getPropertyById, getDestinations, createInquiry, getInquiries } from '../services/api';
import { PROPERTIES } from '../data/mockData';
import {
  X,
  Database,
  Send,
  CheckCircle,
  Clock,
  Code,
  Copy,
  Layers,
  Sparkles,
  Server,
} from 'lucide-react';

export default function ApiExplorerModal() {
  const { isApiModalOpen, setIsApiModalOpen, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('ep1'); // 'ep1' | 'ep2' | 'ep3' | 'ep4' | 'storage'
  const [responseOutput, setResponseOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  // Endpoint 1 params
  const [ep1City, setEp1City] = useState('');
  const [ep1Type, setEp1Type] = useState('');
  const [ep1Status, setEp1Status] = useState('');
  const [ep1Limit, setEp1Limit] = useState(6);

  // Endpoint 2 params
  const [ep2Id, setEp2Id] = useState('ga-101');

  // Endpoint 3 params
  const [ep3Featured, setEp3Featured] = useState(false);

  // Endpoint 4 payload
  const [ep4Name, setEp4Name] = useState('Sophia Lauren');
  const [ep4Email, setEp4Email] = useState('sophia.l@investment-group.com');
  const [ep4Phone, setEp4Phone] = useState('+1 (555) 342-9900');
  const [ep4Message, setEp4Message] = useState('Requesting private VIP viewing with English speaking advisor.');
  const [ep4PropId, setEp4PropId] = useState('ga-101');

  useEffect(() => {
    if (isApiModalOpen) {
      // Auto-run active tab endpoint on open
      handleExecute();
    }
  }, [activeTab, isApiModalOpen]);

  const handleExecute = async () => {
    setLoading(true);
    setResponseOutput(null);
    const start = performance.now();

    try {
      let res;
      if (activeTab === 'ep1') {
        res = await getProperties({
          city: ep1City || undefined,
          type: ep1Type || undefined,
          status: ep1Status || undefined,
          limit: ep1Limit,
        });
      } else if (activeTab === 'ep2') {
        res = await getPropertyById(ep2Id);
      } else if (activeTab === 'ep3') {
        res = await getDestinations({ featuredOnly: ep3Featured });
      } else if (activeTab === 'ep4') {
        const prop = PROPERTIES.find((p) => p.id === ep4PropId);
        res = await createInquiry({
          propertyId: ep4PropId,
          propertyTitle: prop ? prop.title : 'Direct Client Request',
          name: ep4Name,
          email: ep4Email,
          phone: ep4Phone,
          message: ep4Message,
          date: '2026-11-15',
          timeSlot: '14:00 - 16:00',
        });
      } else if (activeTab === 'storage') {
        res = await getInquiries();
      }

      const elapsed = Math.round(performance.now() - start);
      setResponseTime(elapsed);
      setResponseOutput(res);
    } catch (err) {
      setResponseOutput({ error: err.message, status: 500 });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!responseOutput) return;
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    showToast('API Response copied to clipboard', 'info');
  };

  if (!isApiModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-700 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex justify-between items-center bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8E1B2D] flex items-center justify-center text-white">
              <Server className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">Grand Atlas RESTful API Service</h3>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  v1.0 • 4 Endpoints
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Interactive API tester for the requested 4 endpoints
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsApiModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Endpoints navigation tabs */}
        <div className="flex border-b border-stone-800 bg-stone-900/90 overflow-x-auto px-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('ep1')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'ep1'
                ? 'border-[#8E1B2D] text-white bg-stone-800/50'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="text-emerald-400 font-bold">GET</span>
            <span>/api/properties</span>
          </button>

          <button
            onClick={() => setActiveTab('ep2')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'ep2'
                ? 'border-[#8E1B2D] text-white bg-stone-800/50'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="text-emerald-400 font-bold">GET</span>
            <span>/api/properties/:id</span>
          </button>

          <button
            onClick={() => setActiveTab('ep3')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'ep3'
                ? 'border-[#8E1B2D] text-white bg-stone-800/50'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="text-emerald-400 font-bold">GET</span>
            <span>/api/destinations</span>
          </button>

          <button
            onClick={() => setActiveTab('ep4')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'ep4'
                ? 'border-[#8E1B2D] text-white bg-stone-800/50'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="text-amber-400 font-bold">POST</span>
            <span>/api/inquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('storage')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer transition ml-auto ${
              activeTab === 'storage'
                ? 'border-amber-400 text-amber-300 bg-stone-800/50'
                : 'border-transparent text-stone-500 hover:text-stone-300'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database Records</span>
          </button>
        </div>

        {/* Body Grid: Left Controls, Right Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
          {/* Controls Column */}
          <div className="lg:col-span-5 p-5 space-y-4 overflow-y-auto max-h-[45vh] lg:max-h-[60vh] bg-stone-900/60 text-xs">
            {activeTab === 'ep1' && (
              <div className="space-y-3">
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <h4 className="text-white font-semibold mb-1 text-xs">Endpoint 1: Filter & Search Portfolio</h4>
                  <p className="text-stone-400 text-[11px]">
                    Returns paginated luxury properties with dynamic multi-criteria filtering and sorting.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block font-medium">City Filter</label>
                  <select
                    value={ep1City}
                    onChange={(e) => setEp1City(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200"
                  >
                    <option value="">All Destinations</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Tangier">Tangier</option>
                    <option value="High Atlas">High Atlas</option>
                    <option value="Agadir & Taghazout">Agadir</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-stone-400 block font-medium">Type</label>
                    <select
                      value={ep1Type}
                      onChange={(e) => setEp1Type(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200"
                    >
                      <option value="">All Types</option>
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Riad">Riad</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-stone-400 block font-medium">Status</label>
                    <select
                      value={ep1Status}
                      onChange={(e) => setEp1Status(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200"
                    >
                      <option value="">All</option>
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block font-medium">Page Size (Limit)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={ep1Limit}
                    onChange={(e) => setEp1Limit(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200"
                  />
                </div>
              </div>
            )}

            {activeTab === 'ep2' && (
              <div className="space-y-3">
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <h4 className="text-white font-semibold mb-1 text-xs">Endpoint 2: Property Detail & Amenities</h4>
                  <p className="text-stone-400 text-[11px]">
                    Fetches high-resolution gallery, floor specifications, broker bio, and related properties by ID.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block font-medium">Target Property ID</label>
                  <select
                    value={ep2Id}
                    onChange={(e) => setEp2Id(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200 font-mono"
                  >
                    {PROPERTIES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id} - {p.title} ({p.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'ep3' && (
              <div className="space-y-3">
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <h4 className="text-white font-semibold mb-1 text-xs">Endpoint 3: Destination Guides</h4>
                  <p className="text-stone-400 text-[11px]">
                    Returns overview of Moroccan prime markets (Marrakech, Casablanca, Tangier, High Atlas, Agadir).
                  </p>
                </div>

                <label className="flex items-center gap-2 text-stone-300 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ep3Featured}
                    onChange={(e) => setEp3Featured(e.target.checked)}
                    className="rounded bg-stone-950 border-stone-700 text-[#8E1B2D]"
                  />
                  <span>Featured Destinations Only</span>
                </label>
              </div>
            )}

            {activeTab === 'ep4' && (
              <div className="space-y-3">
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <h4 className="text-white font-semibold mb-1 text-xs">Endpoint 4: Submit Viewing / Inquiry</h4>
                  <p className="text-stone-400 text-[11px]">
                    Validates client inquiry, generates unique <code className="text-amber-300">GA-XXXXXX</code> reference ID, and stores record.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block font-medium">Select Property</label>
                  <select
                    value={ep4PropId}
                    onChange={(e) => setEp4PropId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-stone-200"
                  >
                    {PROPERTIES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block font-medium">Client Full Name</label>
                  <input
                    type="text"
                    value={ep4Name}
                    onChange={(e) => setEp4Name(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block font-medium">Email Address</label>
                  <input
                    type="email"
                    value={ep4Email}
                    onChange={(e) => setEp4Email(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block font-medium">Message Details</label>
                  <textarea
                    rows={2}
                    value={ep4Message}
                    onChange={(e) => setEp4Message(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-stone-200"
                  />
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3">
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <h4 className="text-white font-semibold mb-1 text-xs">Persistent Storage (Client Database)</h4>
                  <p className="text-stone-400 text-[11px]">
                    Inquiries submitted via Endpoint 4 are preserved in localStorage and accessible here.
                  </p>
                </div>
              </div>
            )}

            {/* Execute Request CTA */}
            <div className="pt-2">
              <button
                onClick={handleExecute}
                disabled={loading}
                className="w-full bg-[#8E1B2D] hover:bg-[#731524] disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    Executing Request...
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Response Column */}
          <div className="lg:col-span-7 flex flex-col bg-stone-950 max-h-[45vh] lg:max-h-[60vh] overflow-hidden">
            {/* Sub-header with Status Code and Latency */}
            <div className="px-4 py-2 bg-stone-900 border-b border-stone-800 flex justify-between items-center text-xs">
              <div className="flex items-center gap-3">
                <span className="text-stone-400 font-mono text-[11px]">Status:</span>
                {responseOutput ? (
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                      responseOutput.status < 300
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {responseOutput.status || 200} OK
                  </span>
                ) : (
                  <span className="text-stone-500 font-mono text-[11px]">—</span>
                )}

                {responseTime && (
                  <span className="flex items-center gap-1 text-stone-400 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {responseTime} ms
                  </span>
                )}
              </div>

              <button
                onClick={copyToClipboard}
                disabled={!responseOutput}
                className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-white px-2 py-1 rounded hover:bg-stone-800 transition cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy JSON</span>
              </button>
            </div>

            {/* JSON Output Viewer */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-stone-300 leading-relaxed bg-stone-950">
              {loading ? (
                <div className="h-40 flex items-center justify-center text-stone-500 gap-2">
                  <span className="w-4 h-4 border-2 border-stone-600 border-t-amber-400 rounded-full animate-spin"></span>
                  Processing API request...
                </div>
              ) : responseOutput ? (
                <pre className="text-amber-200/90 whitespace-pre-wrap break-all">
                  {JSON.stringify(responseOutput, null, 2)}
                </pre>
              ) : (
                <div className="h-40 flex items-center justify-center text-stone-600">
                  Select parameters and click "Send Request"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex justify-between items-center text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>REST Endpoints: 1 (List/Filter), 2 (Details), 3 (Destinations), 4 (Inquiries)</span>
          </div>
          <button
            onClick={() => setIsApiModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-medium transition cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}

