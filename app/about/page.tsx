import Link from "next/link";

const positioning = [
  ["01", "Real work is the new influence"],
  ["02", "Practitioner before personality"],
  ["03", "Building before broadcasting"],
  ["04", "Teaching from real experience"],
  ["05", "Owning digital infrastructure"],
  ["06", "Showing the process publicly"],
];

export default function AboutPage() {
  return (
    <main className="positioning-page">
      <div className="positioning-shell">
        <header className="positioning-header">
          <Link className="positioning-back" href="../">← Back to Nasirr</Link>
          <p className="positioning-kicker">NASIRR MAYO / THE POSITIONING</p>
          <h1>Real work is<br /><span>the new influence.</span></h1>
          <p className="positioning-lede">I build from lived experience, teach what the work reveals, and make the systems behind the work visible.</p>
        </header>

        <section className="positioning-grid" aria-label="Positioning principles">
          {positioning.map(([number, title]) => (
            <article className={`positioning-card positioning-card-${number}`} key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
            </article>
          ))}
        </section>

        <section className="positioning-body">
          <p className="positioning-kicker">PRACTITIONER / BUILDER / EDUCATOR</p>
          <p>Before the broadcast, there is the build. Before the personality, there is the practice. My work sits at the intersection of owned digital infrastructure, visual identity, client experience, and practical education.</p>
          <p>If you are ready to turn experience into a clearer system, a stronger presence, or a useful next step, let&apos;s talk about what you are building.</p>
          <a className="positioning-cta" href="mailto:nasirr@innergintel.org?subject=Build%20with%20Nasirr">Start a conversation <span>↗</span></a>
        </section>

        <footer className="positioning-footer"><span>NM</span><span>Build it. Show it. Teach from it.</span></footer>
      </div>
    </main>
  );
}
