'use client';

import { useState } from "react";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/innergclaw", icon: "github" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=l51OeTcUJK4", icon: "youtube" },
  { label: "Substack", href: "https://open.substack.com/pub/innergintelligence", icon: "substack" },
  { label: "Twitter / X", href: "https://x.com/InnerGNas", icon: "x" },
];

function Icon({ name }: { name: string }) {
  if (name === "substack") return <span className="substack-icon" aria-hidden="true">S</span>;
  if (name === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4a9.6 9.6 0 0 0-3.04 18.7c.48.09.66-.21.66-.46v-1.68c-2.69.58-3.26-1.14-3.26-1.14-.44-1.12-1.07-1.42-1.07-1.42-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .86 1.47 2.26 1.05 2.81.8.09-.63.34-1.05.61-1.3-2.15-.24-4.42-1.08-4.42-4.79 0-1.06.38-1.93 1-2.61-.1-.25-.43-1.24.1-2.58 0 0 .82-.26 2.64 1a9.1 9.1 0 0 1 4.8 0c1.82-1.24 2.64-1 2.64-1 .53 1.34.2 2.33.1 2.58.62.68 1 1.55 1 2.61 0 3.72-2.27 4.55-4.43 4.79.35.3.65.88.65 1.78v2.64c0 .25.18.55.66.46A9.6 9.6 0 0 0 12 2.4Z" /></svg>;
  if (name === "youtube") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.1a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.4a2.7 2.7 0 0 0-1.9 1.9C2 8.8 2 12 2 12s0 3.2.4 4.9a2.7 2.7 0 0 0 1.9 1.9c1.7.4 7.7.4 7.7.4s6 0 7.7-.4a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.9.4-4.9s0-3.2-.4-4.9ZM10 15.8V8.2l6.2 3.8-6.2 3.8Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2.5h3.7l-8.1 9.3L24 21.5h-7.4l-5.8-6.7-5.9 6.7H1.2l8.7-10L0 2.5h7.6l5.2 6.1 6.1-6.1Zm-1.3 17h2L6.5 4.4H4.4l13.2 15.1Z" /></svg>;
}

export default function SocialLinksMenu({ className = "", label = "Social links" }: { className?: string; label?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`social-menu${isOpen ? " is-open" : ""} ${className}`.trim()}>
      <nav className="social-menu__items" aria-label={label}>
        {socialLinks.map((social, index) => (
          <a className="social-menu__item" style={{ "--social-index": index } as React.CSSProperties} href={social.href} target="_blank" rel="noreferrer" key={social.label} aria-label={social.label} title={social.label}><Icon name={social.icon} /></a>
        ))}
      </nav>
      <button className="social-menu__trigger" type="button" aria-expanded={isOpen} aria-label={isOpen ? "Close social links" : "Open social links"} onClick={() => setIsOpen((open) => !open)}><span aria-hidden="true">{isOpen ? "×" : "•••"}</span></button>
    </div>
  );
}
