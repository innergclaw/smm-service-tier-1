"use client";

import { useState } from "react";

type LinkItem = {
  label: string;
  note: string;
  symbol: string;
  href: string;
  featured?: boolean;
};

const links: LinkItem[] = [
  { label: "Aries Club", note: "Join the community on Discord", symbol: "01", href: "https://discord.gg/RTzygdF5N", featured: true },
  { label: "Marie Stems Floral", note: "Flowers, arrangements, and beautiful moments", symbol: "02", href: "https://www.msfloral.com/" },
  { label: "RYZE Coffee", note: "Explore my wellness coffee recommendation", symbol: "03", href: "https://get.aspr.app/SH1wfR" },
  { label: "InnerG Intelligence", note: "Connect with the InnerG community on Discord", symbol: "04", href: "https://discord.gg/3ryNWTvsX" },
];

export default function Home() {
  const [toast, setToast] = useState("");

  function announce(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  async function sharePage() {
    const shareData = { title: "Butterfly Links", text: "Entrepreneur · Lifestyle Enthusiast", url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* User dismissed the share sheet. */ }
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    announce("Link copied to your clipboard.");
  }

  return (
    <main className="page-shell">
      <div className="aurora aurora-one" aria-hidden="true"></div>
      <div className="aurora aurora-two" aria-hidden="true"></div>
      <div className="star-field" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <span className="butterfly butterfly-one" aria-hidden="true">🦋</span>
      <span className="butterfly butterfly-two" aria-hidden="true">🦋</span>
      <span className="butterfly butterfly-three" aria-hidden="true">🦋</span>

      <section className="link-card" aria-labelledby="profile-name">
        <div className="card-glow" aria-hidden="true"></div>
        <header className="profile-head">
          <button className="share-button" type="button" onClick={sharePage} aria-label="Share this page">↗</button>
          <div className="portrait"><img src="./assets/butterfly-profile-photo.jpg" alt="Profile portrait" /><i>✦</i></div>
          <p className="overline">Welcome to my little corner of the internet</p>
          <h1 id="profile-name">YAKIRA LYNN</h1>
          <p className="role">Entrepreneur <span>✧</span> Lifestyle Enthusiast</p>
          <p className="bio">Building beautiful things, romanticizing the journey, and sharing everything I love along the way.</p>
        </header>

        <div className="link-stack" aria-label="Profile links">
          {links.map((item) => (
            <a key={item.label} className={item.featured ? "link-button featured" : "link-button"} href={item.href} target="_blank" rel="noopener noreferrer">
              <span className="link-number">{item.symbol}</span>
              <span className="link-copy"><strong>{item.label}</strong><small>{item.note}</small></span>
              <span className="link-arrow">↗</span>
            </a>
          ))}
        </div>

        <footer className="card-footer">
          <span>✦</span><p>Soft life. Bold dreams. Beautiful becoming.</p><span>✦</span>
        </footer>
        <p className="preview-note">Profile and links connected · Name ready to personalize</p>
      </section>

      <div className="fairy-dust fairy-left" aria-hidden="true">✧　⋆　˚　✦</div>
      <div className="fairy-dust fairy-right" aria-hidden="true">✦　˚　⋆　✧</div>
      {toast && <div className="toast" role="status"><span>🦋</span>{toast}</div>}
    </main>
  );
}
