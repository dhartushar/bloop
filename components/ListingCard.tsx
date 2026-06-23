"use client";

import { useState } from "react";
import { MapPin, Phone, Star, MessageCircle } from "lucide-react";
import type { BoardingType, Listing } from "@/types/listing";

const BOARDING_LABELS: Record<BoardingType, string> = {
  Home: "Home Boarding",
  Farm: "Farm Stay",
  Resort: "Pet Resort",
};

/** Strip everything but digits so wa.me links work (e.g. "+91 98765..." -> "9198765..."). */
function waNumber(raw: string): string {
  return raw.replace(/\D/g, "");
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const [imgFailed, setImgFailed] = useState(false);

  const visibleFacilities = listing.facilities.slice(0, 4);
  const overflowCount = listing.facilities.length - visibleFacilities.length;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Cover image */}
      <div className="relative aspect-video w-full overflow-hidden bg-mint-100">
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-mint-100 text-leaf">
            <PawPrintFallback />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.coverImage}
            alt={listing.name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white">
          {BOARDING_LABELS[listing.boardingType]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-bold text-ink">{listing.name}</h2>

        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="size-4 shrink-0 text-leaf" />
          {listing.locality}, {listing.city}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-star text-star" />
          <span className="font-semibold text-ink">
            {listing.googleRating.toFixed(1)}
          </span>
          <span className="text-muted">({listing.reviewCount})</span>
        </div>

        {/* Price */}
        <p className="text-sm font-semibold text-paw">
          from ₹{listing.startingPrice.toLocaleString("en-IN")}/night
        </p>

        {/* Facility tags */}
        <ul className="flex flex-wrap gap-2 pt-1">
          {visibleFacilities.map((facility) => (
            <li
              key={facility}
              className="rounded-full bg-mint-200 px-2.5 py-1 text-xs font-medium text-leaf"
            >
              {facility}
            </li>
          ))}
          {overflowCount > 0 && (
            <li
              title={listing.facilities.join(", ")}
              className="rounded-full bg-mint-200 px-2.5 py-1 text-xs font-medium text-leaf"
            >
              +{overflowCount} more
            </li>
          )}
        </ul>

        {/* Contact actions — anchor tags so they work without JS on mobile */}
        <div className="mt-auto flex gap-3 pt-3">
          <a
            href={`tel:${listing.phone}`}
            aria-label={`Call ${listing.name}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-paw"
          >
            <Phone className="size-4" /> Call
          </a>
          <a
            href={`https://wa.me/${waNumber(listing.whatsapp)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${listing.name}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-wa px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-wa-hover"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

/** Decorative paw-print shown when a cover image fails to load. */
function PawPrintFallback() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-14 opacity-60"
    >
      <ellipse cx="6" cy="11" rx="2" ry="2.6" />
      <ellipse cx="10.2" cy="7.4" rx="2" ry="2.6" />
      <ellipse cx="13.8" cy="7.4" rx="2" ry="2.6" />
      <ellipse cx="18" cy="11" rx="2" ry="2.6" />
      <path d="M12 12.2c-2.7 0-5 2-5 4.3 0 1.7 1.3 2.7 3 2.7 1 0 1.4-.4 2-.4s1 .4 2 .4c1.7 0 3-1 3-2.7 0-2.3-2.3-4.3-5-4.3Z" />
    </svg>
  );
}
