"use client";

import { useState } from "react";

type LinkItem = {
  label: string;
  note: string;
  symbol: string;
  featured?: boolean;
};

const links: LinkItem[] = [
  { label: "Explore My Business", note: "Business website or storefront", symbol: "01", featured: true },
  { label: "Shop My Favorites", note: "Curated beauty, style, and lifestyle picks", symbol: "02" },
  { label: "Work With Me", note: "Partnerships, collaborations, and inquiries", symbol: "03" },
  { label: "My Lifestyle Diary", note: "Latest stories, inspiration, and updates", symbol: "04" },
  { label: "Follow on Instagram", note: "Connect the final Instagram profile", symbol: "IG" },
  { label: "Follow on TikTok", note: "Connect the final TikTok profile", symbol: "TT" },
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
          <div className="portrait" aria-label="Profile photo placeholder"><span>HER</span><i>✦</i></div>
          <p className="overline">Welcome to my little corner of the internet</p>
          <h1 id="profile-name">YOUR NAME</h1>
          <p className="role">Entrepreneur <span>✧</span> Lifestyle Enthusiast</p>
          <p className="bio">Building beautiful things, romanticizing the journey, and sharing everything I love along the way.</p>
        </header>

        <div className="link-stack" aria-label="Profile links">
          {links.map((item) => (
            <button key={item.label} className={item.featured ? "link-button featured" : "link-button"} type="button" onClick={() => announce(`${item.label} is ready for the final URL.`)}>
              <span className="link-number">{item.symbol}</span>
              <span className="link-copy"><strong>{item.label}</strong><small>{item.note}</small></span>
              <span className="link-arrow">↗</span>
            </button>
          ))}
        </div>

        <footer className="card-footer">
          <span>✦</span><p>Soft life. Bold dreams. Beautiful becoming.</p><span>✦</span>
        </footer>
        <p className="preview-note">Preview link hub · Final name, photo, and destinations ready to connect</p>
      </section>

      <div className="fairy-dust fairy-left" aria-hidden="true">✧　⋆　˚　✦</div>
      <div className="fairy-dust fairy-right" aria-hidden="true">✦　˚　⋆　✧</div>
      {toast && <div className="toast" role="status"><span>🦋</span>{toast}</div>}
    </main>
  );
}
