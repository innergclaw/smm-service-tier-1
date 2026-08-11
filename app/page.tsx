"use client";

import { FormEvent, useEffect, useState } from "react";

const categories = [
  { name: "Character + Cartoon", note: "Character PNG packs", mark: "✦", color: "lavender" },
  { name: "Kawaii + Cute", note: "Cute PNG packs", mark: "♡", color: "peach" },
  { name: "Street + Lifestyle", note: "Lifestyle PNG packs", mark: "◒", color: "sky" },
  { name: "Web + Resources", note: "Website-ready PNG packs", mark: "⌘", color: "mint" },
  { name: "Objects + Decor", note: "Object PNG packs", mark: "✳", color: "butter" },
  { name: "Seasonal + Events", note: "Seasonal PNG packs", mark: "☼", color: "pink" },
];

export default function Home() {
  const [hasAccess, setHasAccess] = useState(false); const [email, setEmail] = useState(""); const [status, setStatus] = useState("");
  useEffect(() => { const savedEmail = window.localStorage.getItem("reference-room-email"); if (savedEmail) { setEmail(savedEmail); setHasAccess(true); } }, []);
  function unlock(event: FormEvent<HTMLFormElement>) { event.preventDefault(); window.localStorage.setItem("reference-room-email", email.trim().toLowerCase()); setHasAccess(true); }
  function showCategory(name: string) { setStatus(`${name} is ready for your first PNG pack.`); }
  if (!hasAccess) return <main className="access"><header className="access-top"><span>REFERENCE ROOM</span><span>PNG PACK LIBRARY</span></header><section className="access-body"><div><p className="eyebrow">A simple place to collect PNG packs</p><h1>Browse by<br /><em>category.</em></h1></div><div className="access-side"><p>Enter once, then come back anytime to find new PNG packs by style.</p><form onSubmit={unlock}><label htmlFor="email">Your email unlocks the library</label><div className="access-input"><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" autoComplete="email" required /><button type="submit">Enter</button></div><small>Access is remembered on this device.</small></form></div></section></main>;
  return <main className="catalog"><header className="header"><a className="brand" href="#top"><span>RR</span> Reference Room</a><p>PNG packs for creative projects</p></header><section id="top" className="categories"><p className="eyebrow">The library</p><h1>Browse by <span>category.</span></h1><p className="intro">Each category holds its own collection of downloadable PNG packs. Choose a folder to see what is coming next.</p><div className="category-grid">{categories.map((category) => <button className={`category-card ${category.color}`} key={category.name} onClick={() => showCategory(category.name)}><span className="folder-tab" aria-hidden="true"></span><span className="card-mark" aria-hidden="true">{category.mark}</span><strong>{category.name}</strong><small>{category.note}</small></button>)}</div></section>{status && <div className="toast" role="status">{status}<button onClick={() => setStatus("")} aria-label="Dismiss">×</button></div>}<footer><a className="brand" href="#top"><span>RR</span> Reference Room</a><p>New packs will be added by category.</p></footer></main>;
}
