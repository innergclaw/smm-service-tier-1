import Link from "next/link";

const previewSets = [
  { category: "Characters", title: "Playful character cutouts", count: "12 PNGs", image: "/downloads/reference-room-sample.png", free: true },
  { category: "Objects", title: "Everyday objects, isolated", count: "18 PNGs", image: "/assets/chef-dnia-plates.png" },
  { category: "Texture", title: "Paper, light, and soft grain", count: "24 PNGs", image: "/assets/food-fusion-215-flyer.png" },
];

const benefits = [
  ["01", "High-resolution files", "Clean transparent PNGs sized for design work, presentations, websites, and image-model references."],
  ["02", "New drops every week", "A growing library of focused packs instead of another endless folder of generic assets."],
  ["03", "Made for the next prompt", "Download an image, then bring it into ChatGPT or your image model as a visual reference."],
];

export default function ResourcesPage() {
  return (
    <main className="resources-page">
      <div className="resources-shell">
        <header className="resources-header">
          <Link className="resources-back" href="../">BACK TO NASIRR</Link>
          <div className="resources-nav"><span>REFERENCE ROOM</span><a href="#membership">MEMBERSHIP</a></div>
          <p className="resources-kicker">PNG ASSET LIBRARY / WEEKLY DROPS</p>
          <h1>Better references<br /><span>start here.</span></h1>
          <p className="resources-lede">High-resolution transparent PNGs and focused packs for designers, creators, and people making better images with AI.</p>
          <div className="resources-actions"><a className="resources-button resources-button-dark" href="#membership">VIEW MEMBERSHIP</a><a className="resources-text-link" href="#free">START WITH FREE ASSETS <span>↘</span></a></div>
        </header>

        <section className="resources-feature" id="free" aria-labelledby="weekly-title">
          <div className="resources-section-heading"><div><p className="resources-kicker">THE LIBRARY / UPDATED WEEKLY</p><h2 id="weekly-title">Browse the latest drops.</h2></div><span className="resources-index">01 / 03</span></div>
          <div className="resource-grid">
            {previewSets.map((item) => (
              <article className={`resource-card${item.free ? " resource-card-free" : ""}`} key={item.title}>
                <div className="resource-card-image"><img src={item.image} alt="" loading="lazy" />{!item.free ? <span className="resource-lock">MEMBERS</span> : <span className="resource-free">FREE</span>}</div>
                <div className="resource-card-meta"><p>{item.category}</p><h3>{item.title}</h3><span>{item.count}</span></div>
              </article>
            ))}
          </div>
          <p className="resources-note">Free downloads are a small sample of the library. Member packs unlock direct downloads and the full archive.</p>
        </section>

        <section className="resources-paywall" id="membership" aria-labelledby="membership-title">
          <div className="paywall-copy"><p className="resources-kicker">MEMBERSHIP / DIRECT DOWNLOADS</p><h2 id="membership-title">A small library with a serious point of view.</h2><p>Two days free. Then choose the rhythm that fits your work: $11 monthly or $111 yearly. Cancel before renewal whenever you need.</p><ul><li>Every weekly PNG drop</li><li>Full pack downloads</li><li>Personal-project and AI reference use</li></ul></div>
          <div className="plan-stack">
            <a className="plan-card plan-card-featured" href="#checkout"><span className="plan-radio" aria-hidden="true">✓</span><span><strong>Monthly</strong><small>$11 / month</small></span><em>POPULAR</em></a>
            <a className="plan-card" href="#checkout"><span className="plan-radio" aria-hidden="true"></span><span><strong>Yearly</strong><small>$111 / year</small></span><em>SAVE $21</em></a>
            <div className="paywall-trial"><strong>2-day free trial</strong><span>Credit card required. Your plan renews after the trial unless cancelled.</span></div>
            <a className="resources-button resources-button-dark resources-button-wide" href="#checkout">START MY FREE TRIAL</a>
          </div>
        </section>

        <section className="resources-benefits" aria-labelledby="benefits-title"><div className="resources-section-heading"><div><p className="resources-kicker">WHY IT EXISTS</p><h2 id="benefits-title">Less searching.<br />More making.</h2></div><span className="resources-index">02 / 03</span></div><div className="benefit-grid">{benefits.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>

        <section className="resources-chat" id="checkout" aria-labelledby="chat-title"><div><p className="resources-kicker">THE QUICKER USE</p><h2 id="chat-title">Download, then prompt with more precision.</h2><p>Use the PNG as a visual reference in a new ChatGPT conversation or your preferred image model. Direct attachment from a public website depends on the model and browser, so the reliable flow is still download → attach → prompt.</p></div><a className="resources-button resources-button-light" href="https://chatgpt.com/" target="_blank" rel="noreferrer">OPEN CHATGPT <span>↗</span></a></section>

        <footer className="resources-footer"><span>NM / REFERENCE ROOM</span><span>New assets every week.</span></footer>
      </div>
    </main>
  );
}
