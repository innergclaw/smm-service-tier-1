import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ownyourweb.marketing/demos/reference-room/"),
  title: "Reference Room | Better direction for AI images",
  description: "A resource library of visual references and prompt direction for AI image models.",
  alternates: { canonical: "/" },
  openGraph: { title: "Reference Room", description: "Less generic. More you.", type: "website", url: "/", images: [{ url: "https://ownyourweb.marketing/demos/reference-room/og.png", width: 1200, height: 630, alt: "Reference Room — Less generic. More you." }] },
  twitter: { card: "summary_large_image", title: "Reference Room", description: "Better direction for AI images.", images: ["https://ownyourweb.marketing/demos/reference-room/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
