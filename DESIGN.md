# Bloop — Design System

Inspired by CozyPaws' warm mint + orange palette and organic pet-forward energy, adapted for a local Gurgaon directory rather than an e-commerce shop. The signature is the same: fresh green surfaces, bold rounded display type, warm orange as the single action color.

---

## 1. Color Tokens

Define these in `tailwind.config.js` under `theme.extend.colors`. Never hardcode hex values in components — always use the token name.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand greens — primary surface identity
        forest:  { DEFAULT: "#1A3C2B", 800: "#1A3C2B", 700: "#234D38" },
        mint:    { DEFAULT: "#E8F5EC", 100: "#E8F5EC", 200: "#D4EDDA" },
        leaf:    { DEFAULT: "#2D6A4F" },   // mid-tone for tags, icons

        // Action — used ONLY for CTAs and interactive highlights
        paw:     { DEFAULT: "#F97316", hover: "#EA6C0A" },   // orange

        // Neutrals
        ink:     { DEFAULT: "#111827" },   // headings
        muted:   { DEFAULT: "#6B7280" },   // subtext, metadata
        line:    { DEFAULT: "#E5E7EB" },   // dividers, borders
        surface: { DEFAULT: "#FFFFFF" },   // cards

        // Star / rating
        star:    { DEFAULT: "#F59E0B" },

        // WhatsApp green
        wa:      { DEFAULT: "#25D366", hover: "#1EBE5A" },
      }
    }
  }
}
```

### Color Usage Rules

| Token | Use for | Never use for |
|---|---|---|
| `forest` | Navbar bg, section headers, footer | Body text on light bg |
| `mint-100` | Page backgrounds, hero bg | Dark text backgrounds |
| `leaf` | Facility tags, boarding type badges, icons | Primary actions |
| `paw` | CTA buttons, active states, price highlights | Background fills |
| `ink` | All headings (h1–h4), card names | Body copy (too heavy) |
| `muted` | Locality, metadata, label text | Headings |
| `wa` | WhatsApp button only | Any other use |
| `star` | Rating stars only | |

---

## 2. Typography

Install via `next/font/google` in `app/layout.tsx`.

```ts
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});
```

> **Why these two:** Fraunces is a soft-serif optical-size display face — organic, warm, slightly playful without being childish. It's what makes the CozyPaws headline feel alive. Plus Jakarta Sans is clean, legible, and pairs without competing.

```js
// tailwind.config.js — fontFamily
fontFamily: {
  sans:    ["var(--font-sans)", "sans-serif"],
  display: ["var(--font-display)", "serif"],
}
```

### Type Scale

| Role | Tailwind class | Font | Weight | Usage |
|---|---|---|---|---|
| Hero Display | `text-6xl lg:text-8xl` | `font-display` | 900 | Home hero headline |
| Section Heading | `text-3xl lg:text-4xl` | `font-display` | 800 | Section titles |
| Card Title | `text-lg` | `font-sans` | 700 | Listing card names |
| Body | `text-base` | `font-sans` | 400 | Paragraphs, descriptions |
| Label/Meta | `text-sm` | `font-sans` | 500 | Locality, price, tags |
| Micro | `text-xs` | `font-sans` | 400 | Review count, captions |

### Typography Rules
- Hero headline uses `font-display italic` for warmth — the italic is the signature typographic choice.
- Never use `font-display` below `text-xl`.
- Line height for display text: `leading-none` or `leading-tight`. Body: `leading-relaxed`.
- Letter spacing for all-caps labels: `tracking-widest`.

---

## 3. Spacing System

Use Tailwind's default 4px base grid exclusively. No arbitrary values.

| Token | Value | Use |
|---|---|---|
| `p-4` | 16px | Card internal padding |
| `p-6` | 24px | Section padding (mobile) |
| `p-8` | 32px | Card padding (desktop) |
| `px-6 lg:px-12` | 24–48px | Page horizontal gutters |
| `py-16 lg:py-24` | 64–96px | Section vertical rhythm |
| `gap-4` | 16px | Card grid gap (mobile) |
| `gap-6` | 24px | Card grid gap (desktop) |
| `rounded-2xl` | 16px | Cards, image containers |
| `rounded-full` | 9999px | Tags, badges, pill buttons |

---

## 4. Component Specifications

### 4.1 Navbar

```
bg-forest | text-white | sticky top-0 z-50 | h-16
```
- Logo: paw icon (SVG) + "Bloop" in `font-display` weight-800, color `text-paw`
- Nav link: "Gurgaon" → `/gurgaon`, `text-sm font-medium text-mint-100 hover:text-paw transition`
- Mobile: logo left, hamburger right (collapse to full-width menu)

---

### 4.2 CTA Button (Primary)

Used for all primary actions ("Explore Gurgaon Boardings", "Call").

```
bg-paw hover:bg-paw-hover
text-white font-sans font-semibold
px-6 py-3 rounded-full
inline-flex items-center gap-2
transition-colors duration-150
```

Never use `bg-paw` for anything that isn't an interactive action.

---

### 4.3 WhatsApp Button

```
bg-wa hover:bg-wa-hover
text-white font-sans font-semibold
px-6 py-3 rounded-full w-full
inline-flex items-center justify-center gap-2
```

Always a full `<a href="https://wa.me/{number}">` anchor, not a button. Target `_blank` with `rel="noopener noreferrer"`.

---

### 4.4 Listing Card

```
bg-surface rounded-2xl overflow-hidden shadow-sm
border border-line hover:shadow-md transition-shadow
```

**Internal layout (top to bottom):**

```
┌─────────────────────────────┐
│  Cover image (16:9)         │  aspect-video, object-cover
│  [BoardingType badge]       │  absolute top-3 left-3
├─────────────────────────────┤
│  p-4                        │
│  Name                (ink)  │  text-lg font-bold
│  📍 Locality        (muted) │  text-sm
│  ⭐ 4.5 (38)        (star)  │  text-sm, star color
│  from ₹800/night   (paw)   │  text-sm font-semibold
│                             │
│  [Tag][Tag][Tag][+2 more]   │  facility pills
│                             │
│  [📞 Call]   [💬 WhatsApp]  │  side by side, full width
└─────────────────────────────┘
```

**Boarding Type Badge:**
```
bg-forest text-white text-xs font-semibold
px-3 py-1 rounded-full
```

**Facility Tag:**
```
bg-mint-200 text-leaf text-xs font-medium
px-2.5 py-1 rounded-full
```

**Call Button (within card):**
```
bg-ink text-white text-sm font-semibold
px-4 py-2.5 rounded-full flex-1
inline-flex items-center justify-center gap-1.5
```

---

### 4.5 Search Input

```
w-full px-4 py-3 rounded-full
border border-line bg-surface
text-base font-sans text-ink
placeholder:text-muted
focus:outline-none focus:ring-2 focus:ring-paw/30 focus:border-paw
```

---

### 4.6 Sort Dropdown

```
px-4 py-3 rounded-full
border border-line bg-surface
text-sm font-medium text-ink
focus:outline-none focus:ring-2 focus:ring-paw/30
```

---

### 4.7 Star Rating Display

```tsx
// Renders: ★★★★½  4.5 (38)
<div className="flex items-center gap-1 text-sm">
  <span className="text-star">★</span>
  <span className="font-semibold text-ink">{rating}</span>
  <span className="text-muted">({reviewCount})</span>
</div>
```

---

## 5. Layout Grid

### Page Container
```
max-w-7xl mx-auto px-6 lg:px-12
```

### Listings Grid
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
```

### Home Hero (reference CozyPaws layout)
```
min-h-[85vh] bg-mint-100
flex flex-col items-center justify-center
text-center px-6 py-24
```

---

## 6. Iconography

Use **Lucide React** (`lucide-react` — already available in the artifact env). Never mix icon libraries.

| Icon | Component | Use |
|---|---|---|
| Map pin | `<MapPin />` | Locality |
| Phone | `<Phone />` | Call button |
| Star | `<Star />` | Rating (or use ★ character) |
| Search | `<Search />` | Search input prefix |
| ChevronDown | `<ChevronDown />` | Sort dropdown |
| MessageCircle | `<MessageCircle />` | WhatsApp button |
| Paw print | Custom SVG | Logo |

Icon sizing: `size-4` (16px) inside buttons/tags, `size-5` (20px) standalone.

---

## 7. Shadows & Elevation

```
shadow-sm   → cards at rest
shadow-md   → cards on hover
shadow-lg   → modals, dropdowns (future)
```

No `shadow-xl` or above — the design stays light and airy.

---

## 8. Motion & Transitions

Keep it minimal. The reference design is energetic through color and layout, not animation.

```css
/* Global transition defaults */
transition-colors duration-150   /* buttons, links */
transition-shadow duration-200   /* cards */
```

No page-transition animations, no skeleton loaders (static data loads instantly), no parallax.

Respect `prefers-reduced-motion` — all transitions should be wrapped:
```css
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

---

## 9. Responsive Breakpoints

Follow Tailwind defaults:

| Breakpoint | Width | Layout change |
|---|---|---|
| (default) | 0px+ | 1-col grid, stacked nav |
| `sm` | 640px+ | 2-col listings grid |
| `lg` | 1024px+ | 3-col listings grid, full navbar |
| `xl` | 1280px+ | Max container width kicks in |

---

## 10. Accessibility Baseline

- All interactive elements must have visible `:focus` state using `focus:ring-2 focus:ring-paw/30`
- Color contrast: `ink` on `mint-100` = passes AA. `white` on `paw` = passes AA. Always verify `muted` on `surface` at small sizes.
- Images: always include `alt` text. Listing cover images → `alt={listing.name}`.
- Call/WhatsApp links: include `aria-label="Call {name}"` / `aria-label="WhatsApp {name}"`.
- Facility "+N more" overflow: include `title` with full list for tooltip.

---

## 11. `tailwind.config.js` — Complete Extended Config

```js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest:  { DEFAULT: "#1A3C2B" },
        mint:    { DEFAULT: "#E8F5EC", 100: "#E8F5EC", 200: "#D4EDDA" },
        leaf:    { DEFAULT: "#2D6A4F" },
        paw:     { DEFAULT: "#F97316", hover: "#EA6C0A" },
        ink:     { DEFAULT: "#111827" },
        muted:   { DEFAULT: "#6B7280" },
        line:    { DEFAULT: "#E5E7EB" },
        surface: { DEFAULT: "#FFFFFF" },
        star:    { DEFAULT: "#F59E0B" },
        wa:      { DEFAULT: "#25D366", hover: "#1EBE5A" },
      },
      fontFamily: {
        sans:    ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
```