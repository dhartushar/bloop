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
  id: string; // slug, e.g. "pawsome-stays-dlf2"
  name: string; // "Pawsome Stays"
  locality: string; // "DLF Phase 2"
  city: string; // "Gurgaon"
  coverImage: string; // path relative to /public, e.g. "/images/pawsome-stays.jpg"
  startingPrice: number; // per night in INR, e.g. 800
  googleRating: number; // e.g. 4.5
  reviewCount: number; // e.g. 38
  boardingType: BoardingType;
  facilities: Facility[];
  phone: string; // e.g. "+919876543210"
  whatsapp: string; // same or different number, used for wa.me link
}
