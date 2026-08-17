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
    eyebrow: "The family experience",
    title: "A calmer first step for families.",
    body: "The site helps parents quickly understand the space, the type of play available, and what to expect before they arrive. That clarity makes the first visit feel more welcoming.",
  },
  {
    number: "02",
    eyebrow: "The update",
    title: "A digital welcome desk for the daycare team.",
    body: "The new structure brings the important information into one clear path: programs, rooms, open play, parties, hours, and contact details. Families can find answers without digging.",
    compare: [
      "Before: scattered details and more manual coordination.",
      "After: clearer family communication and simpler updates for staff.",
    ],
  },
  {
    number: "03",
    eyebrow: "Operational relief",
    title: "Less screen time. More time with children.",
    body: "Staff can update the details that matter without constantly managing technical systems, keeping their attention on safety, care, energy, and the experience children are having in the room.",
  },
  {
    number: "04",
    eyebrow: "Scaling potential",
    title: "Ready for the next room, program, or location.",
    body: "The same foundation can grow with new programs, schedules, galleries, registration, announcements, parent communication, reminders, and recurring care experiences—without rebuilding from scratch.",
  },
];

const sensoryGallery = [
  { src: "/assets/sensory/sr-gym-main.jpeg", alt: "Wide view of the SR Sensory Gym play space", label: "The welcome" },
  { src: "/assets/sensory/sr-active-sensory-room.jpeg", alt: "Active sensory room with climbing and swing equipment", label: "The active room" },
  { src: "/assets/sensory/sr-calming-room.jpeg", alt: "Calming room with soft seating and sensory lighting", label: "The calming room" },
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
            <p className="positioning-kicker">PORTFOLIO EXPERIENCE / SR CHILDREN&apos;S LOUNGE</p>
            <h2 id="sensory-experience-title">Designing the system behind better childhood experiences.</h2>
            <p>For SR Children&apos;s Lounge, the website acts like a digital welcome desk: it gives families a clear picture of the sensory gym while giving the care team fewer technical things to carry.</p>
            <div className="experience-stat-row" aria-label="Sensory project highlights">
              <span>Family clarity</span>
              <span>Care-team ease</span>
              <span>Built to scale</span>
            </div>
          </div>

          <div className="experience-gallery" aria-label="SR Children&apos;s Lounge site photography">
            {sensoryGallery.map(({ src, alt, label }) => (
              <figure className="experience-gallery__item" key={src}>
                <img src={src} alt={alt} loading="lazy" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
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
            <p>See how SR Children&apos;s Lounge turns technical infrastructure into more room for play, connection, care, and meaningful experiences.</p>
            <a className="positioning-cta" href="#hire-intake">EXPLORE THE CASE STUDY</a>
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
