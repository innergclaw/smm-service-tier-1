const links = [
  {
    number: "01",
    title: "nasirr.innergintel.org",
    description: "Education, systems, and the ideas behind the work.",
    href: "https://nasirr.innergintel.org/",
  },
  {
    number: "02",
    title: "OwnYourWeb",
    description: "Websites and digital systems you can actually control.",
    href: "https://ownyourweb.marketing/",
  },
  {
    number: "03",
    title: "INNERGREADS.STUDY",
    description: "A study space for ideas, reading, and deeper learning.",
    href: "https://innergreads.study/",
  },
];

export default function Home() {
  return (
    <main className="link-tree-page">
      <div className="link-tree-shell">
        <header className="profile-header">
          <div className="profile-mark" aria-hidden="true">NM</div>
          <p className="profile-kicker">Philadelphia / Building in public</p>
          <h1>Nasirr Mayo</h1>
          <p className="profile-role">Founder of InnerG Intel, OwnYourWeb &amp; ShopNasGraphics</p>
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
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <footer className="link-tree-footer">
          <span>NM</span>
          <span>Making useful things, one system at a time.</span>
        </footer>
      </div>
    </main>
  );
}
