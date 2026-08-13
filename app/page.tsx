const links = [
  {
    number: "01",
    title: "HIRE / BOOK ME",
    description: "Start with the work, then book a conversation.",
    href: "about/",
  },
  {
    number: "02",
    title: "OWNYOURWEB SYSTEMS",
    description: "Websites and digital systems you can actually control.",
    href: "https://ownyourweb.marketing/",
  },
  {
    number: "03",
    title: "INNERG INTEL",
    description: "Education, systems, and the ideas behind the work.",
    href: "https://www.innergreads.study",
  },
  {
    number: "04",
    title: "CREATIVE DESIGN SERVICES",
    description: "Graphics, branding, and creative services built with purpose.",
    href: "https://shopnasgfx.com/",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/innergclaw", icon: "github" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=l51OeTcUJK4", icon: "youtube" },
  { label: "Substack", href: "https://innergintel.substack.com/", icon: "substack" },
  { label: "Twitter / X", href: "https://x.com/innergintel", icon: "x" },
];

export default function Home() {
  return (
    <main className="link-tree-page">
      <div className="link-tree-shell">
        <header className="profile-header">
          <div className="profile-mark" aria-hidden="true">NM</div>
          <p className="profile-kicker">Philadelphia / Building in public</p>
          <h1>Nasirr Mayo</h1>
          <p className="profile-role">FOUNDER - CREATIVE DIGITAL DESIGNER - DEVELOPER</p>
        </header>

        <section className="video-card" aria-labelledby="video-title">
          <div className="video-heading">
            <div>
              <h2 id="video-title">Building in public</h2>
              <p>A short look at the work, the lessons, and what comes next.</p>
            </div>
          </div>
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/l51OeTcUJK4"
              title="Nasirr Mayo — Building in public"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <p className="section-label" id="about-title">About me</p>
          <p>
            I started building in 2015 because I saw problems that needed solving. The early years were not about recognition. They were about learning how websites, visual identity, client experience, and digital systems actually work together.
          </p>
          <p>
            <strong>ShopNasGraphics</strong> taught me how trust is designed. <strong>OwnYourWeb</strong> turned that craft into systems businesses can control. <strong>InnerG Intel</strong> made education part of the infrastructure.
          </p>
          <p>
            This next chapter is about stepping forward without abandoning the builder’s discipline: sharing what I know, showing what I make, and helping experienced people stop hiding the value they have already earned.
          </p>
        </section>

        <nav className="link-list" aria-label="Nasirr's links">
          {links.map((link) => (
            <a className="link-card" href={link.href} key={link.number} target="_blank" rel="noreferrer">
              <span className="link-number">{link.number}</span>
              <span className="link-copy">
                <strong>{link.title}</strong>
                <small>{link.description}</small>
              </span>
            </a>
          ))}
        </nav>

        <footer className="link-tree-footer">
          <span>NM</span>
          <span>Making useful things, one system at a time.</span>
          <nav className="social-links" aria-label="Social links">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" key={social.label} aria-label={social.label}>
                {social.icon === "github" && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4a9.6 9.6 0 0 0-3.04 18.7c.48.09.66-.21.66-.46v-1.68c-2.69.58-3.26-1.14-3.26-1.14-.44-1.12-1.07-1.42-1.07-1.42-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .86 1.47 2.26 1.05 2.81.8.09-.63.34-1.05.61-1.3-2.15-.24-4.42-1.08-4.42-4.79 0-1.06.38-1.93 1-2.61-.1-.25-.43-1.24.1-2.58 0 0 .82-.26 2.64 1a9.1 9.1 0 0 1 4.8 0c1.82-1.24 2.64-1 2.64-1 .53 1.34.2 2.33.1 2.58.62.68 1 1.55 1 2.61 0 3.72-2.27 4.55-4.43 4.79.35.3.65.88.65 1.78v2.64c0 .25.18.55.66.46A9.6 9.6 0 0 0 12 2.4Z" /></svg>}
                {social.icon === "youtube" && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.1a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.4a2.7 2.7 0 0 0-1.9 1.9C2 8.8 2 12 2 12s0 3.2.4 4.9a2.7 2.7 0 0 0 1.9 1.9c1.7.4 7.7.4 7.7.4s6 0 7.7-.4a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.9.4-4.9s0-3.2-.4-4.9ZM10 15.8V8.2l6.2 3.8-6.2 3.8Z" /></svg>}
                {social.icon === "substack" && <span className="substack-icon" aria-hidden="true">S</span>}
                {social.icon === "x" && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2.5h3.7l-8.1 9.3L24 21.5h-7.4l-5.8-6.7-5.9 6.7H1.2l8.7-10L0 2.5h7.6l5.2 6.1 6.1-6.1Zm-1.3 17h2L6.5 4.4H4.4l13.2 15.1Z" /></svg>}
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  );
}
