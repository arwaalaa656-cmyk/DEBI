// Standalone Node.js REST API Server for Grand Atlas
// Zero-dependency pure Node.js HTTP server implementing the 4 endpoints
import http from 'http';
import url from 'url';

const PORT = process.env.PORT || 5000;

// Database records
const DESTINATIONS = [
  {
    id: 'marrakech',
    name: 'Marrakech',
    region: 'Palmeraie & Hivernage',
    propertyCount: 14,
    avgPrice: '$1,850,000',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'casablanca',
    name: 'Casablanca',
    region: 'Anfa & Corniche Marina',
    propertyCount: 9,
    avgPrice: '$2,400,000',
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'tangier',
    name: 'Tangier',
    region: 'Cap Spartel & Marshan',
    propertyCount: 8,
    avgPrice: '$1,650,000',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'atlas',
    name: 'High Atlas',
    region: 'Ourika & Ouirgane Valleys',
    propertyCount: 6,
    avgPrice: '$1,200,000',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'agadir',
    name: 'Agadir & Taghazout',
    region: 'Taghazout Bay & Founty',
    propertyCount: 7,
    avgPrice: '$1,450,000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    featured: false,
  },
];

const PROPERTIES = [
  {
    id: 'ga-101',
    title: 'Villa Palmeraie Royale',
    city: 'Marrakech',
    neighborhood: 'Circuit de la Palmeraie',
    address: 'Avenue de la Palmeraie, Marrakech 40000',
    price: 2450000,
    status: 'For Sale',
    type: 'Villa',
    featured: true,
    beds: 6,
    baths: 7,
    area: 650,
    lotSize: 5200,
    garages: 3,
    yearBuilt: 2024,
    images: [
      '/hero-figma.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    ],
    agent: {
      name: 'Yasmine Benjelloun',
      phone: '+212 524 88 99 00',
      email: 'yasmine.b@grandatlas.com',
    },
  },
  {
    id: 'ga-102',
    title: 'The Sky Penthouse at Anfa Marina',
    city: 'Casablanca',
    neighborhood: 'Anfa Supérieur / Marina',
    address: 'Boulevard de la Corniche, Casablanca 20050',
    price: 3200000,
    status: 'For Sale',
    type: 'Penthouse',
    featured: true,
    beds: 4,
    baths: 5,
    area: 520,
    lotSize: 520,
    garages: 4,
    yearBuilt: 2025,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85',
    ],
    agent: {
      name: 'Mehdi Alami',
      phone: '+212 522 34 56 78',
      email: 'mehdi.a@grandatlas.com',
    },
  },
  {
    id: 'ga-103',
    title: 'Dar El Marsa Cliff Villa',
    city: 'Tangier',
    neighborhood: 'Cap Spartel',
    address: 'Route du Cap Spartel, Tanger 90000',
    price: 1890000,
    status: 'For Sale',
    type: 'Villa',
    featured: true,
    beds: 5,
    baths: 5,
    area: 450,
    lotSize: 2800,
    garages: 2,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85',
    ],
    agent: {
      name: 'Nadia Tazi',
      phone: '+212 539 93 45 67',
      email: 'nadia.t@grandatlas.com',
    },
  },
  {
    id: 'ga-104',
    title: 'Riad Jasmine & Atlas Courtyard',
    city: 'Marrakech',
    neighborhood: 'Medina / Kasbah',
    address: 'Derb Chtouka, Kasbah, Marrakech 40000',
    price: 1150000,
    status: 'For Sale',
    type: 'Riad',
    featured: false,
    beds: 5,
    baths: 6,
    area: 400,
    lotSize: 320,
    garages: 0,
    yearBuilt: 2022,
    images: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1400&q=85',
    ],
    agent: {
      name: 'Yasmine Benjelloun',
      phone: '+212 524 88 99 00',
      email: 'yasmine.b@grandatlas.com',
    },
  },
];

const inquiriesDb = [];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  // ENDPOINT 1: GET /api/properties
  if (method === 'GET' && pathname === '/api/properties') {
    const { search, city, type, status, minPrice, maxPrice, bedrooms, limit = 6, page = 1 } = parsedUrl.query;
    let results = [...PROPERTIES];

    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter((p) => p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
    }
    if (city && city !== 'All') {
      results = results.filter((p) => p.city.toLowerCase() === String(city).toLowerCase());
    }
    if (type && type !== 'All') {
      results = results.filter((p) => p.type.toLowerCase() === String(type).toLowerCase());
    }
    if (status && status !== 'All') {
      results = results.filter((p) => p.status.toLowerCase() === String(status).toLowerCase());
    }
    if (minPrice) {
      results = results.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= Number(maxPrice));
    }
    if (bedrooms) {
      results = results.filter((p) => p.beds >= Number(bedrooms));
    }

    const total = results.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const paginated = results.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return sendJson(res, 200, {
      endpoint: 'GET /api/properties',
      status: 200,
      timestamp: new Date().toISOString(),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
      data: paginated,
    });
  }

  // ENDPOINT 2: GET /api/properties/:id
  if (method === 'GET' && pathname.startsWith('/api/properties/')) {
    const id = pathname.replace('/api/properties/', '');
    const prop = PROPERTIES.find((p) => p.id === id);

    if (!prop) {
      return sendJson(res, 404, {
        endpoint: `GET /api/properties/${id}`,
        status: 404,
        error: `Property "${id}" not found`,
        data: null,
      });
    }

    return sendJson(res, 200, {
      endpoint: `GET /api/properties/${id}`,
      status: 200,
      timestamp: new Date().toISOString(),
      data: prop,
    });
  }

  // ENDPOINT 3: GET /api/destinations
  if (method === 'GET' && pathname === '/api/destinations') {
    const { featuredOnly } = parsedUrl.query;
    let list = [...DESTINATIONS];
    if (featuredOnly === 'true') {
      list = list.filter((d) => d.featured);
    }

    return sendJson(res, 200, {
      endpoint: 'GET /api/destinations',
      status: 200,
      total: list.length,
      data: list,
    });
  }

  // ENDPOINT 4: POST /api/inquiries
  if (method === 'POST' && pathname === '/api/inquiries') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { name, email, message, propertyId } = payload;

        if (!name || !email) {
          return sendJson(res, 422, {
            endpoint: 'POST /api/inquiries',
            status: 422,
            error: 'Name and email are required',
          });
        }

        const referenceCode = `GA-${Math.floor(100000 + Math.random() * 900000)}`;
        const record = {
          id: `inq_${Date.now()}`,
          referenceCode,
          propertyId: propertyId || null,
          name,
          email,
          message: message || '',
          status: 'Confirmed',
          createdAt: new Date().toISOString(),
        };

        inquiriesDb.unshift(record);

        return sendJson(res, 201, {
          endpoint: 'POST /api/inquiries',
          status: 201,
          success: true,
          message: `Inquiry registered with reference: ${referenceCode}`,
          data: record,
        });
      } catch (err) {
        return sendJson(res, 400, {
          endpoint: 'POST /api/inquiries',
          status: 400,
          error: 'Invalid JSON payload',
        });
      }
    });
    return;
  }

  // 404 Not Found
  return sendJson(res, 404, {
    error: 'Endpoint not found. Valid endpoints: GET /api/properties, GET /api/properties/:id, GET /api/destinations, POST /api/inquiries',
    availableEndpoints: [
      'GET /api/properties',
      'GET /api/properties/:id',
      'GET /api/destinations',
      'POST /api/inquiries',
    ],
  });
});

server.listen(PORT, () => {
  console.log(`[Grand Atlas Server] Running on http://localhost:${PORT}`);
  console.log(`4 Endpoints Active:`);
  console.log(`1. GET  http://localhost:${PORT}/api/properties`);
  console.log(`2. GET  http://localhost:${PORT}/api/properties/:id`);
  console.log(`3. GET  http://localhost:${PORT}/api/destinations`);
  console.log(`4. POST http://localhost:${PORT}/api/inquiries`);
});
