import Link from "next/link";

const previewSets = [
  { category: "Characters", title: "Playful character cutouts", count: "12 PNGs", image: "/downloads/reference-room-sample.png", free: true },
  { category: "Objects", title: "Everyday objects, isolated", count: "18 PNGs", image: "/assets/chef-dnia-plates.png" },
  { category: "Texture", title: "Paper, light, and soft grain", count: "24 PNGs", image: "/assets/food-fusion-215-flyer.png" },
];

const benefits = [
  ["01", "Direct the visual direction", "Give your brand, campaign, or client work a stronger starting point than the same stock references everyone else is using."],
  ["02", "Keep your library moving", "New focused packs arrive every week so your ideas do not keep circling the same generic look."],
  ["03", "Make AI more useful", "Bring better visual inputs into ChatGPT and image models so the output has more range, intention, and personality."],
];

const resourceTypes = [
  ["01", "PNG packs", "Transparent, high-resolution visual references for brand, campaign, and design work.", "AVAILABLE NOW"],
  ["02", "Master prompts", "Reusable prompt systems for turning a rough idea into a stronger visual direction.", "COMING NEXT"],
  ["03", "GPT image references", "Prompt formulas, composition guides, and reference pairings for more intentional image generation.", "COMING NEXT"],
  ["04", "Codex skills", "Practical skills and workflows for building, reviewing, and shipping with AI-assisted tools.", "COMING NEXT"],
];

export default function ResourcesPage() {
  return (
    <main className="resources-page">
      <div className="resources-shell">
        <header className="resources-header">
          <Link className="resources-back" href="../">BACK TO NASIRR</Link>
          <div className="resources-nav"><span>REFERENCE ROOM</span><a href="#membership">MEMBERSHIP</a></div>
          <p className="resources-kicker">CREATIVE ASSET RESOURCE / WEEKLY DROPS</p>
          <h1>Your work should not look like everyone else&apos;s.</h1>
          <p className="resources-lede">Too many chat designs start from the same generic images. Reference Room gives business owners, designers, and creative teams high-resolution PNG packs to explore stronger ideas and direct better AI work.</p>
          <div className="resources-actions"><a className="resources-button resources-button-dark" href="#membership">VIEW MEMBERSHIP</a><a className="resources-text-link" href="#free">START WITH FREE ASSETS <span>↘</span></a></div>
        </header>

        <section className="resources-types" aria-labelledby="resource-types-title">
          <div className="resources-section-heading"><div><p className="resources-kicker">THE RESOURCE ROOM</p><h2 id="resource-types-title">More than images.</h2></div><span className="resources-index">00 / 04</span></div>
          <div className="resource-type-grid">{resourceTypes.map(([number, title, body, status]) => <article key={title}><span className="resource-type-number">{number}</span><h3>{title}</h3><p>{body}</p><small>{status}</small></article>)}</div>
        </section>

        <section className="resources-feature" id="free" aria-labelledby="weekly-title">
          <div className="resources-section-heading"><div><p className="resources-kicker">THE LIBRARY / UPDATED WEEKLY</p><h2 id="weekly-title">Build from a better starting point.</h2></div><span className="resources-index">01 / 03</span></div>
          <div className="resource-grid">
            {previewSets.map((item) => (
              <article className={`resource-card${item.free ? " resource-card-free" : ""}`} key={item.title}>
                <div className="resource-card-image"><img src={item.image} alt="" loading="lazy" />{!item.free ? <span className="resource-lock">MEMBERS</span> : <span className="resource-free">FREE</span>}</div>
                <div className="resource-card-meta"><p>{item.category}</p><h3>{item.title}</h3><span>{item.count}</span></div>
              </article>
            ))}
          </div>
          <p className="resources-note">Free downloads show you the quality. Membership gives you a working library of references you can return to whenever the next project needs a stronger point of view.</p>
        </section>

        <section className="resources-paywall" id="membership" aria-labelledby="membership-title">
          <div className="paywall-copy"><p className="resources-kicker">MEMBERSHIP / DIRECT DOWNLOADS</p><h2 id="membership-title">Generic references cost you creative range.</h2><p>If your brand, campaign, or client work matters, the input matters. Get two days free, then choose $11 monthly or $111 yearly for the full library and every new drop.</p><ul><li>Every weekly PNG drop</li><li>Full pack downloads</li><li>More options for personal projects and AI references</li></ul></div>
          <div className="plan-stack">
            <a className="plan-card plan-card-featured" href="#checkout"><span className="plan-radio" aria-hidden="true">✓</span><span><strong>Monthly</strong><small>$11 / month</small></span><em>POPULAR</em></a>
            <a className="plan-card" href="#checkout"><span className="plan-radio" aria-hidden="true"></span><span><strong>Yearly</strong><small>$111 / year</small></span><em>SAVE $21</em></a>
            <div className="paywall-trial"><strong>2-day free trial</strong><span>Credit card required. Your plan renews after the trial unless cancelled.</span></div>
            <a className="resources-button resources-button-dark resources-button-wide" href="#checkout">START MY FREE TRIAL</a>
          </div>
        </section>

        <section className="resources-benefits" aria-labelledby="benefits-title"><div className="resources-section-heading"><div><p className="resources-kicker">WHY YOUR WORK NEEDS IT</p><h2 id="benefits-title">Less sameness.<br />More direction.</h2></div><span className="resources-index">02 / 03</span></div><div className="benefit-grid">{benefits.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>

        <section className="resources-chat" id="checkout" aria-labelledby="chat-title"><div><p className="resources-kicker">THE QUICKER USE</p><h2 id="chat-title">Give the model something better to work with.</h2><p>Download a transparent PNG, attach it to a new ChatGPT conversation or your preferred image model, and explore a direction that does not begin with the same basic AI look. The reliable flow is still download → attach → prompt.</p></div><a className="resources-button resources-button-light" href="https://chatgpt.com/" target="_blank" rel="noreferrer">OPEN CHATGPT <span>↗</span></a></section>

        <footer className="resources-footer"><span>NM / REFERENCE ROOM</span><span>New assets every week.</span></footer>
      </div>
    </main>
  );
}
