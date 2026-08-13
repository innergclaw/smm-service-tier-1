import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.GITHUB_PAGES_ROOT === "true" ? "https://nasirr.innergintel.org/" : "https://ownyourweb.marketing/demos/reference-room/"),
  title: 'NASIRR "G" MAYO',
  description: 'NASIRR "G" MAYO — founder, creative digital designer, and developer based in Philadelphia.',
  alternates: { canonical: "/" },
  openGraph: { title: 'NASIRR "G" MAYO', description: "FOUNDER - CREATIVE DIGITAL DESIGNER - DEVELOPER", type: "website", url: "/" },
  twitter: { card: "summary", title: 'NASIRR "G" MAYO', description: "FOUNDER - CREATIVE DIGITAL DESIGNER - DEVELOPER" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
