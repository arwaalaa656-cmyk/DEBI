# DEBI

# Grand Atlas - Luxury Real Estate Platform (Figma to React)

A full-fidelity, responsive luxury real estate web application inspired by the **Grand Atlas** design system on Figma. Built with modern **React 19**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons**, integrated with 4 robust asynchronous RESTful API endpoints.

---

## 🎨 Pages & Views Implemented (Figma Alignment)

1. **Home / Landing Page (`/` / `home`) - [Figma Screen 1]**:
   - Sticky luxury header with VIP Advisory desk, currency selector (`USD`, `EUR`, `MAD`), favorites counter, and quick navigation.
   - Cinematic Hero Section with High Atlas imagery, headline, and multi-criteria floating search bar (Destination, Property Type, Budget Range).
   - Key Volume & Prestige Metrics (`$240M+ Volume`, `44 Exclusive Estates`, `100% Notarized`, `14 Yrs Advisory`).
   - **Featured Estate Spotlight** with rounded architectural layout, key specs, and instant tour booking.
   - **Curated Private Portfolio Grid** with status badges (`For Sale` / `For Rent`), pricing, and quick actions.
   - **Interactive Moroccan Territory Map** featuring interactive regional pins (Marrakech, Casablanca, Tangier, High Atlas, Agadir) with real-time property preview cards.
   - Regional destination highlights & bespoke agency advisory services.

2. **Properties Catalog & Filter Page (`properties`) - [Figma Screens 2, 5, 7]**:
   - Advanced search with real-time text query, status tabs (`All`, `For Sale`, `For Rent`), and regional dropdowns.
   - Multi-criteria filters: Property Type (Villa, Penthouse, Riad, Apartment), Price Range, Minimum Bedrooms, and Sorting (Featured, Price Asc/Desc, Newest).
   - Dynamic view modes: Responsive 3-Column Grid vs. Compact List View.
   - Saved favorites quick toggle filter.

3. **Property Detail View (`property-detail`) - [Figma Screens 3, 6]**:
   - Interactive high-res photo gallery with main showcase, thumbnail strip, and full-screen lightbox modal.
   - Comprehensive technical specifications (Bedrooms, Bathrooms, Living Area, Plot Size, Garages, Construction Year, Title Status).
   - Architectural narrative & feature checklist (Infinity Pool, Spa, Smart Home, Security).
   - Dedicated Luxury Advisor Profile with direct phone, email, and WhatsApp links.
   - Integrated **Private Viewing Schedule Form** wired directly to Endpoint 4.
   - Similar properties recommendation slider.

4. **Destinations Explorer (`destinations`) - [Figma Screen 4]**:
   - In-depth market guides for Marrakech Palmeraie, Casablanca Marina, Tangier Cap Spartel, High Atlas Valleys, and Taghazout Bay.
   - Regional average prices, property counters, and one-click filtered catalog navigation.

5. **Contact & Advisory Desk (`contact`) - [Figma Screen 8]**:
   - Flagship office bureaus in Marrakech and Casablanca with operating hours and VIP concierge line.
   - Confidential Client Inquiry form wired to Endpoint 4 (`POST /api/inquiries`) with validation, reference code generation (`GA-XXXXXX`), and persistent client storage.

6. **About The Firm (`about`)**:
   - Founding philosophy, Moroccan land title certification (*Conservation Foncière*), and senior partner profiles.

---

## ⚡ The 4 RESTful API Endpoints (`src/services/api.js`)

The application includes an in-browser **Live API Explorer** (click the floating **"API Endpoints (4)"** button):

### 1. `GET /api/properties`
- **Purpose**: Search, filter, and paginate the property portfolio.
- **Parameters**: `search`, `city`, `type`, `status`, `minPrice`, `maxPrice`, `bedrooms`, `sort`, `page`, `limit`
- **Response**:
```json
{
  "endpoint": "GET /api/properties",
  "status": 200,
  "pagination": { "page": 1, "limit": 6, "total": 8, "totalPages": 2 },
  "data": [ /* Array of Property Objects */ ]
}
```

### 2. `GET /api/properties/:id`
- **Purpose**: Retrieve complete property details, full gallery photos, and similar properties.
- **Parameters**: `id` (e.g., `ga-101`, `ga-102`)
- **Response**:
```json
{
  "endpoint": "GET /api/properties/ga-101",
  "status": 200,
  "data": {
    "id": "ga-101",
    "title": "Villa Palmeraie Royale",
    "city": "Marrakech",
    "price": 2450000,
    "images": [ ... ],
    "features": [ ... ],
    "agent": { ... },
    "similarProperties": [ ... ]
  }
}
```

### 3. `GET /api/destinations`
- **Purpose**: Fetch Moroccan territories, descriptions, property counts, and average pricing.
- **Parameters**: `featuredOnly` (boolean)
- **Response**:
```json
{
  "endpoint": "GET /api/destinations",
  "status": 200,
  "total": 5,
  "data": [ /* Array of Destination Objects */ ]
}
```

### 4. `POST /api/inquiries`
- **Purpose**: Submit client viewing appointments and general acquisition inquiries.
- **Payload**:
```json
{
  "propertyId": "ga-101",
  "propertyTitle": "Villa Palmeraie Royale",
  "name": "Sophia Lauren",
  "email": "sophia@domain.com",
  "phone": "+212 600 000000",
  "message": "Requesting confidential showing.",
  "date": "2026-11-15",
  "timeSlot": "14:00 - 16:00",
  "inquiryType": "Private In-Person Tour"
}
```
- **Response**:
```json
{
  "endpoint": "POST /api/inquiries",
  "status": 201,
  "success": true,
  "message": "Inquiry successfully submitted! Reference ID: GA-829140",
  "data": {
    "referenceCode": "GA-829140",
    "status": "Confirmed",
    "createdAt": "2026-11-08T..."
  }
}
```

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Production build
npm run build
```
