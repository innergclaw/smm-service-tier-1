import type { Metadata } from "next";
import "./globals.css";

const pageUrl = "https://ownyourweb.marketing/demos/soap-game-strong/";
const socialImage = "https://ownyourweb.marketing/demos/soap-game-strong/og.png";

export const metadata: Metadata = {
  metadataBase: new URL(pageUrl),
  title: "Soap Game Strong Order Flow | Operations Dashboard Demo",
  description: "A demo operations dashboard for organizing Soap Game Strong orders, customer follow-ups, deliveries, warehouse pickups, wholesale pallets, and locations.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Soap Game Strong Order Flow",
    description: "One clean command center for calls, texts, Instagram orders, deliveries, pickups, wholesale, and locations.",
    type: "website",
    url: pageUrl,
    images: [{ url: socialImage, width: 1536, height: 1024, alt: "Soap Game Strong order operations dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soap Game Strong Order Flow",
    description: "A better way to organize every order, route, pickup, and wholesale lead.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
