import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Soap Game Strong Order Flow | Operations Dashboard Demo",
    description: "A demo operations dashboard for organizing Soap Game Strong orders, customer follow-ups, deliveries, warehouse pickups, wholesale pallets, and locations.",
    openGraph: {
      title: "Soap Game Strong Order Flow",
      description: "One clean command center for calls, texts, Instagram orders, deliveries, pickups, wholesale, and locations.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Soap Game Strong order operations dashboard" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Soap Game Strong Order Flow",
      description: "A better way to organize every order, route, pickup, and wholesale lead.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
