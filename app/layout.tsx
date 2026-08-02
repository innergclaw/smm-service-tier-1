import type { Metadata } from "next";
import "./globals.css";

const pageUrl = "https://ownyourweb.marketing/demos/food-fusion-215/";
const socialImage = "https://ownyourweb.marketing/demos/food-fusion-215/og.png";

export const metadata: Metadata = {
  metadataBase: new URL(pageUrl),
  title: "Food Fusion 215 | Philadelphia Pickup Ordering Demo",
  description: "Build your Food Fusion 215 bowl or platter, select a pickup time, and keep every order detail organized in one place.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Food Fusion 215 — Big Flavor. Zero DM Chaos.",
    description: "A mobile pickup-ordering demo for Food Fusion 215 in Philadelphia.",
    type: "website",
    url: pageUrl,
    images: [{ url: socialImage, width: 1536, height: 1024, alt: "Food Fusion 215 pickup ordering website" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Fusion 215 — Pickup Ordering",
    description: "Choose your meal, pickup time, and payment preference in one organized flow.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
