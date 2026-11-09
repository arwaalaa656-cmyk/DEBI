import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getProperties } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  RotateCcw,
  Sparkles,
  Home,
  MapPin,
  DollarSign,
  Bed,
} from 'lucide-react';

export default function PropertiesPage() {
  const { searchFilterParams, setSearchFilterParams, favorites } = useApp();

  const [properties, setProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState(searchFilterParams.search || '');
  const [city, setCity] = useState(searchFilterParams.city || '');
  const [type, setType] = useState(searchFilterParams.type || '');
  const [status, setStatus] = useState(searchFilterParams.status || '');
  const [minPrice, setMinPrice] = useState(searchFilterParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(searchFilterParams.maxPrice || '');
  const [bedrooms, setBedrooms] = useState(searchFilterParams.bedrooms || '');
  const [sort, setSort] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [onlyFavorites, setOnlyFavorites] = useState(Boolean(searchFilterParams.onlyFavorites));

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const res = await getProperties({
          search,
          city,
          type,
          status,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          bedrooms: bedrooms ? Number(bedrooms) : undefined,
          sort,
          limit: 20,
        });

        let data = res.data || [];
        if (onlyFavorites) {
          data = data.filter((p) => favorites.includes(p.id));
        }

        setProperties(data);
        setTotalCount(onlyFavorites ? data.length : res.pagination.total);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [search, city, type, status, minPrice, maxPrice, bedrooms, sort, onlyFavorites, favorites]);

  const resetFilters = () => {
    setSearch('');
    setCity('');
    setType('');
    setStatus('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setSort('featured');
    setOnlyFavorites(false);
    setSearchFilterParams({});
  };

  const hasActiveFilters = Boolean(
    search || city || type || status || minPrice || maxPrice || bedrooms || onlyFavorites
  );

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner matching Figma Screen 2 */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="bg"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Moroccan Property Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              {onlyFavorites ? 'Your Saved Properties' : 'Luxury Properties & Estates'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Explore our curated portfolio of palmeraie villas, private mountain retreats, sea-facing penthouses, and historic Medina palaces.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar matching Figma Screen 2 & Screen 5 */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs space-y-4">
          {/* Top Row: Search input + Status Tabs + View mode */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by villa name, neighborhood, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E1B2D] transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setStatus('')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  status === ''
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatus('For Sale')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  status === 'For Sale'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setStatus('For Rent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  status === 'For Rent'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                For Rent
              </button>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#8E1B2D] shadow-xs' : 'text-stone-500'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-[#8E1B2D] shadow-xs' : 'text-stone-500'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Filter Controls Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-3 border-t border-stone-100 text-xs">
            {/* City */}
            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">City / Region</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 font-medium focus:outline-none focus:border-[#8E1B2D]"
              >
                <option value="">All Regions</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Tangier">Tangier</option>
                <option value="High Atlas">High Atlas</option>
                <option value="Agadir & Taghazout">Agadir</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 font-medium focus:outline-none focus:border-[#8E1B2D]"
              >
                <option value="">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Riad">Riad</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">Min Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 font-medium focus:outline-none focus:border-[#8E1B2D]"
              >
                <option value="">Any Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms</option>
              </select>
            </div>

            {/* Sort by */}
            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">Sort Results</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 font-medium focus:outline-none focus:border-[#8E1B2D]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Constructed</option>
              </select>
            </div>

            {/* Favorites Toggle / Reset */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end gap-2">
              <button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  onlyFavorites
                    ? 'bg-rose-50 border-[#8E1B2D] text-[#8E1B2D]'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Saved ({favorites.length})</span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-900">{properties.length}</strong> of{' '}
            <strong className="text-stone-900">{totalCount}</strong> exclusive properties
            {city && <span> in <strong>{city}</strong></span>}
            {type && <span> • <strong>{type}</strong></span>}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[#8E1B2D] hover:underline font-medium cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Properties Grid / List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse border border-stone-200" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4">
            <Home className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-stone-900">
              No matching properties found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We could not find any properties matching your current filter criteria. Try clearing some filters or searching a different destination.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8E1B2D] text-white text-xs font-semibold rounded-lg hover:bg-[#731524] transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

