import type { Metadata } from "next";
import "./globals.css";

const pageUrl = "https://ownyourweb.marketing/demos/butterfly-links/";

export const metadata: Metadata = {
  metadataBase: new URL(pageUrl),
  title: "Butterfly Links | Entrepreneur & Lifestyle Enthusiast",
  description: "A feminine butterfly-themed personal link hub for an entrepreneur and lifestyle enthusiast.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Butterfly Links",
    description: "Entrepreneur · Lifestyle Enthusiast",
    type: "website",
    url: pageUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Butterfly Links",
    description: "Entrepreneur · Lifestyle Enthusiast",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
