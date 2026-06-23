import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloop — Trusted Pet Boarding in Gurgaon",
  description:
    "Find and contact trusted pet boarding facilities in Gurgaon. Compare facilities, ratings, and prices — then call or WhatsApp directly. No bookings, no fuss.",
  openGraph: {
    title: "Bloop — Trusted Pet Boarding in Gurgaon",
    description:
      "Find and contact trusted pet boarding facilities in Gurgaon. Compare facilities, ratings, and prices — then call or WhatsApp directly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
