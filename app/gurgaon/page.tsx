import type { Metadata } from "next";
import ListingGrid from "@/components/ListingGrid";
import listings from "@/data/listings.json";
import type { Listing } from "@/types/listing";

const allListings = listings as Listing[];

export const metadata: Metadata = {
  title: "Pet Boarding in Gurgaon — Bloop",
  description: `Browse ${allListings.length} trusted pet boarding facilities in Gurgaon. Compare ratings, facilities, and prices, then call or WhatsApp directly.`,
};

export default function GurgaonPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-extrabold text-ink lg:text-4xl">
          Pet boarding in Gurgaon
        </h1>
        <p className="mt-2 text-base text-muted">
          {allListings.length} trusted facilities to choose from. Find the right
          fit, then reach out directly.
        </p>
      </header>

      <ListingGrid listings={allListings} />
    </div>
  );
}
