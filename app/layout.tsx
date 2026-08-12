import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ownyourweb.marketing/demos/reference-room/"),
  title: "Nasirr Mayo | Building in public",
  description: "Nasirr Mayo — founder, builder, and educator based in Philadelphia.",
  alternates: { canonical: "/" },
  openGraph: { title: "Nasirr Mayo | Building in public", description: "Founder of InnerG Intel, OwnYourWeb & ShopNasGraphics.", type: "website", url: "/" },
  twitter: { card: "summary", title: "Nasirr Mayo | Building in public", description: "Founder of InnerG Intel, OwnYourWeb & ShopNasGraphics." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
