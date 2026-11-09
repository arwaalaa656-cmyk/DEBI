// Grand Atlas API Client - 4 Robust RESTful Endpoints
import { PROPERTIES, DESTINATIONS } from '../data/mockData';

const INQUIRIES_STORAGE_KEY = 'grandatlas_inquiries_db';

// Helper to simulate realistic network latency
const sleep = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * ENDPOINT 1: GET /api/properties
 * Query parameters:
 * - search: string (matches title, city, neighborhood, description)
 * - city: string
 * - type: string ('Villa', 'Penthouse', 'Riad', 'Apartment')
 * - status: string ('For Sale', 'For Rent')
 * - minPrice: number
 * - maxPrice: number
 * - bedrooms: number
 * - sort: 'price-asc' | 'price-desc' | 'featured' | 'newest'
 * - page: number (default 1)
 * - limit: number (default 6)
 */
export async function getProperties(params = {}) {
  await sleep(180);

  const {
    search = '',
    city = '',
    type = '',
    status = '',
    minPrice,
    maxPrice,
    bedrooms,
    sort = 'featured',
    page = 1,
    limit = 6,
  } = params;

  let filtered = [...PROPERTIES];

  // Search filter
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // City filter
  if (city && city !== 'All') {
    filtered = filtered.filter((p) => p.city.toLowerCase() === city.toLowerCase() || p.destinationId === city.toLowerCase());
  }

  // Type filter
  if (type && type !== 'All') {
    filtered = filtered.filter((p) => p.type.toLowerCase() === type.toLowerCase());
  }

  // Status filter
  if (status && status !== 'All') {
    filtered = filtered.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  }

  // Min / Max Price
  if (minPrice != null && !isNaN(minPrice) && minPrice > 0) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice != null && !isNaN(maxPrice) && maxPrice > 0) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }

  // Bedrooms filter
  if (bedrooms != null && !isNaN(bedrooms) && bedrooms > 0) {
    filtered = filtered.filter((p) => p.beds >= Number(bedrooms));
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return b.yearBuilt - a.yearBuilt;
      case 'featured':
      default:
        if (a.featured === b.featured) return b.rating - a.rating;
        return a.featured ? -1 : 1;
    }
  });

  // Pagination
  const total = filtered.length;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const totalPages = Math.ceil(total / limitNum) || 1;
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedData = filtered.slice(startIndex, startIndex + limitNum);

  return {
    endpoint: 'GET /api/properties',
    status: 200,
    timestamp: new Date().toISOString(),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
    data: paginatedData,
  };
}

/**
 * ENDPOINT 2: GET /api/properties/:id
 * Returns full property details, agent details, and similar properties
 */
export async function getPropertyById(id) {
  await sleep(150);

  if (!id) {
    return {
      endpoint: `GET /api/properties/${id}`,
      status: 400,
      error: 'Property ID is required',
      data: null,
    };
  }

  const property = PROPERTIES.find((p) => p.id === id || p.slug === id);

  if (!property) {
    return {
      endpoint: `GET /api/properties/${id}`,
      status: 404,
      error: `Property with ID "${id}" was not found`,
      data: null,
    };
  }

  // Find related / similar properties
  const similar = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.city === property.city || p.type === property.type)
  ).slice(0, 3);

  return {
    endpoint: `GET /api/properties/${id}`,
    status: 200,
    timestamp: new Date().toISOString(),
    data: {
      ...property,
      similarProperties: similar,
    },
  };
}

/**
 * ENDPOINT 3: GET /api/destinations
 * Returns Moroccan luxury destination guides and metrics
 */
export async function getDestinations(params = {}) {
  await sleep(150);

  const { featuredOnly = false } = params;
  let list = [...DESTINATIONS];

  if (featuredOnly) {
    list = list.filter((d) => d.featured);
  }

  return {
    endpoint: 'GET /api/destinations',
    status: 200,
    timestamp: new Date().toISOString(),
    total: list.length,
    data: list,
  };
}

/**
 * ENDPOINT 4: POST /api/inquiries
 * Submits an inquiry or schedules a private viewing.
 * Persists in localStorage and generates a unique tracking reference.
 */
export async function createInquiry(payload) {
  await sleep(250);

  const { propertyId, propertyTitle, name, email, phone, message, date, timeSlot, inquiryType = 'viewing' } = payload || {};

  // Validation
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Full name is required (min 2 chars)';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Valid email address is required';
  if (!message || message.trim().length < 5) errors.message = 'Please provide a message or inquiry details';

  if (Object.keys(errors).length > 0) {
    return {
      endpoint: 'POST /api/inquiries',
      status: 422,
      error: 'Validation failed',
      errors,
      data: null,
    };
  }

  const referenceCode = `GA-${Math.floor(100000 + Math.random() * 900000)}`;

  const newInquiry = {
    id: `inq_${Date.now()}`,
    referenceCode,
    propertyId: propertyId || null,
    propertyTitle: propertyTitle || 'General Concierge Inquiry',
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : null,
    message: message.trim(),
    preferredDate: date || null,
    preferredTimeSlot: timeSlot || null,
    inquiryType,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  // Persist
  try {
    const existing = JSON.parse(localStorage.getItem(INQUIRIES_STORAGE_KEY) || '[]');
    existing.unshift(newInquiry);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }

  return {
    endpoint: 'POST /api/inquiries',
    status: 201,
    success: true,
    message: `Inquiry successfully submitted! Reference ID: ${referenceCode}`,
    timestamp: new Date().toISOString(),
    data: newInquiry,
  };
}

/**
 * Helper to fetch stored inquiries for client management
 */
export async function getInquiries() {
  await sleep(100);
  try {
    const data = JSON.parse(localStorage.getItem(INQUIRIES_STORAGE_KEY) || '[]');
    return {
      endpoint: 'GET /api/inquiries (Local Persistence)',
      status: 200,
      total: data.length,
      data,
    };
  } catch {
    return { endpoint: 'GET /api/inquiries', status: 200, total: 0, data: [] };
  }
}

