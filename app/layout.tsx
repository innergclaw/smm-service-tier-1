import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ownyourweb.marketing/demos/reference-room/"),
  title: "Reference Room | High-resolution PNG downloads",
  description: "A download library of high-resolution PNG images, curated PNG packs, and free web resources.",
  alternates: { canonical: "/" },
  openGraph: { title: "Reference Room", description: "High-resolution PNG downloads for creative work.", type: "website", url: "/", images: [{ url: "https://ownyourweb.marketing/demos/reference-room/og.png", width: 1200, height: 630, alt: "Reference Room — High-resolution PNG downloads" }] },
  twitter: { card: "summary_large_image", title: "Reference Room", description: "High-resolution PNG downloads for creative work.", images: ["https://ownyourweb.marketing/demos/reference-room/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
