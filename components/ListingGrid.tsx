"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { Listing } from "@/types/listing";
import ListingCard from "./ListingCard";
import PawLogo from "./PawLogo";

type SortOrder = "rating" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "rating", label: "Highest Rated" },
  { value: "price-asc", label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" },
];

export default function ListingGrid({ listings }: { listings: Listing[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("rating");

  const visibleListings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = query
      ? listings.filter(
          (l) =>
            l.name.toLowerCase().includes(query) ||
            l.locality.toLowerCase().includes(query),
        )
      : listings;

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.startingPrice - b.startingPrice;
        case "price-desc":
          return b.startingPrice - a.startingPrice;
        case "rating":
        default:
          return b.googleRating - a.googleRating;
      }
    });

    return sorted;
  }, [listings, searchQuery, sortOrder]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or locality…"
            aria-label="Search boarding facilities"
            className="w-full rounded-full border border-line bg-surface py-3 pl-12 pr-4 text-base text-ink placeholder:text-muted focus:border-paw focus:outline-none focus:ring-2 focus:ring-paw/30"
          />
        </div>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            aria-label="Sort listings"
            className="appearance-none rounded-full border border-line bg-surface py-3 pl-4 pr-10 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-paw/30"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
        </div>
      </div>

      {/* Grid */}
      {visibleListings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface py-16 text-center">
          <PawLogo className="mx-auto size-10 text-leaf" />
          <p className="mt-3 text-lg font-bold text-ink">No boardings found</p>
          <p className="mt-1 text-sm text-muted">
            Try a different name or locality.
          </p>
        </div>
      )}
    </div>
  );
}
