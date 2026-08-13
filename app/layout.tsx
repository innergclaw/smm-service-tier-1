import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.GITHUB_PAGES_ROOT === "true" ? "https://nasirr.innergintel.org/" : "https://ownyourweb.marketing/demos/reference-room/"),
  title: "Nasirr Mayo | Building in public",
  description: "Nasirr Mayo — founder, builder, and educator based in Philadelphia.",
  alternates: { canonical: "/" },
  openGraph: { title: "Nasirr Mayo | Building in public", description: "DESIGNER - CREATOR - DEVELOPER", type: "website", url: "/" },
  twitter: { card: "summary", title: "Nasirr Mayo | Building in public", description: "DESIGNER - CREATOR - DEVELOPER" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
