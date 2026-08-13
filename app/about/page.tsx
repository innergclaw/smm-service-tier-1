import Link from "next/link";
import HireIntakeForm from "./HireIntakeForm";

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
          <Link className="positioning-back" href="../">BACK TO NASIRR</Link>
          <p className="positioning-kicker">NASIRR &quot;G&quot; MAYO / THE POSITIONING</p>
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
          <div className="contact-actions" aria-label={'Contact NASIRR "G" MAYO'}>
            <a className="positioning-cta" href="tel:+12674730397">CALL 267-473-0397</a>
            <a className="positioning-cta positioning-cta-secondary" href="sms:+12674730397">TEXT 267-473-0397</a>
          </div>
        </section>

        <section className="hire-intake" aria-labelledby="hire-intake-title">
          <p className="positioning-kicker">START A CONVERSATION</p>
          <h2 id="hire-intake-title">Tell me what you are building.</h2>
          <p className="hire-intake-lede">Share the basics so I can understand the project, the timeline, and the best next step before we connect.</p>
          <HireIntakeForm />
        </section>

        <footer className="positioning-footer"><span>NM</span><span>Build it. Show it. Teach from it.</span></footer>
      </div>
    </main>
  );
}
