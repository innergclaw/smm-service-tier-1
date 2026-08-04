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
      <span className="butterfly-shape butterfly-one" aria-hidden="true"><b></b></span>
      <span className="butterfly-shape butterfly-two" aria-hidden="true"><b></b></span>
      <span className="butterfly-shape butterfly-three" aria-hidden="true"><b></b></span>

      <section className="link-card" aria-labelledby="profile-name">
        <div className="card-glow" aria-hidden="true"></div>
        <header className="profile-head">
          <button className="share-button" type="button" onClick={sharePage} aria-label="Share this page">↗</button>
          <div className="portrait"><img src="./assets/butterfly-profile-photo.jpg" alt="Profile portrait" /><i aria-hidden="true"></i></div>
          <p className="overline">Welcome to my little corner of the internet</p>
          <h1 id="profile-name">YAKIRA LYNN</h1>
          <p className="role">Entrepreneur <span aria-hidden="true"></span> Lifestyle Enthusiast</p>
          <p className="bio">Building beautiful things, romanticizing the journey, and sharing everything I love along the way.</p>
        </header>

        <div className="link-stack" aria-label="Profile links">
          {links.map((item) => (
            <details key={item.label} name="yakira-links" className={item.featured ? "link-disclosure featured" : "link-disclosure"}>
              <summary>
                <span className="link-number">{item.symbol}</span>
                <span className="link-copy"><strong>{item.label}</strong><small>Tap to reveal</small></span>
                <span className="link-caret" aria-hidden="true"></span>
              </summary>
              <div className="link-panel">
                <div className="dust" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <p>{item.note}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">Open {item.label}<span aria-hidden="true">↗</span></a>
              </div>
            </details>
          ))}
        </div>

        <footer className="card-footer"><p>Soft life. Bold dreams. Beautiful becoming.</p></footer>
        <p className="preview-note">Profile and links connected · Name ready to personalize</p>
      </section>

      {toast && <div className="toast" role="status"><span className="toast-dot" aria-hidden="true"></span>{toast}</div>}
    </main>
  );
}
