import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "24K Catering by Chef Dnia | Fresh Plate Specials",
    description: "Order Chef Dnia's $30 plate special. Choose steak tips and gravy or garlic herb chicken, select your sides, and choose pickup or delivery.",
    openGraph: {
      title: "24K Catering by Chef Dnia",
      description: "Golden flavor. No shortcuts. Choose your $30 plate and order online.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1736, height: 905, alt: "24K Catering by Chef Dnia $30 plate special" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "24K Catering by Chef Dnia",
      description: "Choose your $30 plate and order online.",
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
