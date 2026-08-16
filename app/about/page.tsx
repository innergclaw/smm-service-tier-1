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

const sensoryExperience = [
  {
    number: "01",
    eyebrow: "The experience",
    title: "Events feel more organized, energetic, and intentional.",
    body: "Children stay engaged through movement, play, discovery, and memorable moments that feel more alive than a static page or scattered announcement.",
  },
  {
    number: "02",
    eyebrow: "The update",
    title: "Clearer information replaced the old friction.",
    body: "Before, updates were harder to track and the event story felt less connected. Now the details are easier to read, easier to update, and easier to trust.",
    compare: [
      "Original process: scattered details and more manual coordination.",
      "What changed: clearer event information, stronger visual communication, and smoother updates.",
    ],
  },
  {
    number: "03",
    eyebrow: "Operational relief",
    title: "The system works quietly in the background.",
    body: "Staff can update the important details without constantly managing technical systems. That keeps attention on children, families, energy, and the event itself.",
  },
  {
    number: "04",
    eyebrow: "Scaling potential",
    title: "The structure can grow without rebuilding everything.",
    body: "New events can use the same foundation for programs, locations, schedules, galleries, registration, and announcements. Later, it can support analytics, parent communication, automated reminders, and recurring event systems.",
  },
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

        <section className="experience-case-study" aria-labelledby="sensory-experience-title">
          <div className="experience-case-study__intro">
            <p className="positioning-kicker">PORTFOLIO EXPERIENCE / SENSORY</p>
            <h2 id="sensory-experience-title">Designing the system behind better childhood experiences.</h2>
            <p>Sensory gives children a richer experience while giving the team fewer technical things to worry about.</p>
          </div>

          <div className="experience-case-study__grid">
            {sensoryExperience.map(({ number, eyebrow, title, body, compare }) => (
              <article className="experience-card" key={number}>
                <span>{number}</span>
                <p className="experience-card__eyebrow">{eyebrow}</p>
                <h3>{title}</h3>
                <p>{body}</p>
                {compare ? (
                  <ul>
                    {compare.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <div className="experience-case-study__footer">
            <p>See how Sensory turns technical infrastructure into more room for play, connection, and meaningful experiences.</p>
            <a className="positioning-cta" href="#hire-intake">START A PROJECT</a>
          </div>
        </section>

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
