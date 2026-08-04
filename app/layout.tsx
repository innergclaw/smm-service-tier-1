import type { Metadata } from "next";
import "./globals.css";

const pageUrl = "https://ownyourweb.marketing/demos/butterfly-links/";

export const metadata: Metadata = {
  metadataBase: new URL(pageUrl),
  title: "Yakira Lynn | Entrepreneur & Lifestyle Enthusiast",
  description: "The personal link hub for Yakira Lynn—entrepreneur and lifestyle enthusiast.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Yakira Lynn",
    description: "Entrepreneur · Lifestyle Enthusiast",
    type: "website",
    url: pageUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yakira Lynn",
    description: "Entrepreneur · Lifestyle Enthusiast",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
