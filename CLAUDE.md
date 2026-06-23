# Bloop — Pet Boarding Discovery for Gurgaon

## Project Overview

A static frontend directory that helps pet parents in Gurgaon find and contact trusted pet boarding facilities. No backend, no auth, no bookings — just a clean, fast, browsable listing site.

**Stack:** Next.js 14 (App Router) + Tailwind CSS + Static JSON data  
**Deploy target:** Vercel (free tier)

---

## Project Structure

```
bloop/
├── app/
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Home page (/)
│   └── gurgaon/
│       └── page.tsx         # Listings page (/gurgaon)
├── components/
│   ├── Navbar.tsx           # Site header with logo + nav link
│   ├── ListingCard.tsx      # Individual boarding facility card
│   ├── ListingGrid.tsx      # Grid wrapper with search/sort controls
│   └── Footer.tsx           # Minimal footer
├── data/
│   └── listings.json        # All boarding facility data (source of truth)
├── public/
│   └── images/              # Facility cover images (e.g. facility-slug.jpg)
├── types/
│   └── listing.ts           # TypeScript type for a Listing
└── CLAUDE.md
```

---

## Data Schema

**`data/listings.json`** — array of listing objects.

```ts
// types/listing.ts
export type BoardingType = "Home" | "Farm" | "Resort";

export type Facility =
  | "CCTV"
  | "Medication Support"
  | "Pickup & Drop"
  | "Outdoor Play Area"
  | "AC Rooms"
  | "Vet on Call"
  | "Live Updates"
  | "Grooming";

export interface Listing {
  id: string;                  // slug, e.g. "pawsome-stays-dlf2"
  name: string;                // "Pawsome Stays"
  locality: string;            // "DLF Phase 2"
  city: string;                // "Gurgaon"
  coverImage: string;          // path relative to /public, e.g. "/images/pawsome-stays.jpg"
  startingPrice: number;       // per night in INR, e.g. 800
  googleRating: number;        // e.g. 4.5
  reviewCount: number;         // e.g. 38
  boardingType: BoardingType;
  facilities: Facility[];
  phone: string;               // e.g. "+919876543210"
  whatsapp: string;            // same or different number, used for wa.me link
}
```

Add sample entries (3–5) with realistic Gurgaon localities (Sohna Road, Sector 56, Golf Course Ext, etc.) so the UI is never empty during development.

---

## Pages

### 1. Home (`/`)

**Purpose:** Quickly explain the product and funnel users to the listings.

**Sections (top to bottom):**

1. **Hero** — Short punchy headline (e.g. *"Your dog deserves more than a kennel."*), 1-line subtext about Gurgaon pet boarding, single CTA button → `/gurgaon`.
2. **Problem block** — 2–3 short pain points: hard to find trustworthy options, no way to compare, don't know what questions to ask.
3. **How it works** — 3-step strip: Browse → Check facilities → Call directly. Keep it visual and short.
4. **CTA repeat** — "Explore Gurgaon Boardings" button.

No images required for launch. Lean on typography and whitespace.

---

### 2. Gurgaon Listings (`/gurgaon`)

**Purpose:** Show all listings. Let users find what they need and contact directly.

**Layout:**
- Page heading + subtext (e.g. *"12 pet boarding facilities in Gurgaon"*)
- Search bar — filter by name or locality (client-side, no API)
- Sort dropdown — "Highest Rated" | "Lowest Price" | "Highest Price"
- Responsive grid of `ListingCard` components (2 cols on tablet, 3 on desktop, 1 on mobile)

Data is loaded at build time from `listings.json` — no fetching at runtime.

---

## Components

### `ListingCard`

Displays a single boarding facility. Contains:

- Cover image (fixed aspect ratio, object-cover)
- Boarding type badge (e.g. "Home Boarding", "Farm Stay")
- Name (h2)
- Locality
- Google rating — show stars + number + review count
- Starting price — "from ₹800/night"
- Facility tags — show up to 4, overflow as "+2 more"
- **Call button** — `href="tel:{phone}"`, full width
- **WhatsApp button** — `href="https://wa.me/{whatsapp}"`, full width, green

Both contact buttons must be proper anchor tags (not JS onClick) so they work on mobile without JavaScript.

---

### `ListingGrid`

Client component (`"use client"`). Receives the full listings array as props. Manages:
- `searchQuery` state
- `sortOrder` state
- Filtered + sorted listings derived from those two states
- Renders search input, sort dropdown, and the grid of cards

Filtering logic:
- Search matches on `name` or `locality` (case-insensitive)
- Sort: rating DESC, price ASC, price DESC

---

## Design Tokens

Use Tailwind config to define these — do not hardcode hex values in components.

```js
// tailwind.config.js — extend theme with:
colors: {
  brand: {
    primary: "#F97316",   // warm orange — energy, warmth
    light:   "#FFF7ED",   // tinted off-white background
    dark:    "#1C1917",   // near-black for text
  },
  surface: {
    card:    "#FFFFFF",
    muted:   "#F5F5F4",
  }
}
```

**Typography:**
- Display/headings: `font-serif` (Playfair Display via next/font)
- Body/UI: `font-sans` (Inter via next/font)

**Vibe:** Warm, trustworthy, local. Not clinical or corporate. Think neighborhood recommendation, not SaaS product.

---

## Key Constraints

- **No backend.** All data comes from `listings.json` at build time.
- **No auth, no bookings, no payments, no admin.**
- **No external API calls at runtime.** Everything is static.
- **Contact actions (Call / WhatsApp) are anchor tags** — not buttons with JS handlers — so they work on mobile natively.
- Images that don't load should fall back gracefully (use `onError` or a placeholder).
- The site must be fully usable with JavaScript disabled (except the search/sort controls on `/gurgaon`, which can degrade gracefully).

---

## Commands

```bash
# Install
npm install

# Dev server
npm run dev

# Build (runs before deploy)
npm run build

# Deploy (Vercel picks this up automatically on push)
git push origin main
```

---

## What's Explicitly Out of Scope (for now)

- Individual listing detail pages
- Map view
- Pet type filtering (dogs/cats/birds)
- User reviews or ratings
- Booking / availability calendar
- Admin panel or CMS
- Authentication of any kind
- Backend or database

When any of these are added later, they slot in as new pages/routes without changing the existing static structure.