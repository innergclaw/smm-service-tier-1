"use client";

import { FormEvent, useMemo, useState } from "react";

type Plate = "steak" | "chicken";
type Fulfillment = "pickup" | "delivery";

const steakSides = [
  "Baked Mac & Cheese",
  "Green Beans",
  "Broccolini",
  "Corn Salsa",
  "Candied Yams",
];

const chickenGreens = ["Green Beans", "Broccolini"];

export default function Home() {
  const [plate, setPlate] = useState<Plate | null>(null);
  const [sides, setSides] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const plateName = plate === "steak" ? "Steak Tips & Gravy" : plate === "chicken" ? "Garlic Herb Chicken" : "Choose your plate";
  const orderReady = plate === "steak" ? sides.length === 2 : plate === "chicken" ? sides.length === 1 : false;
  const total = quantity * 30;

  const orderSides = useMemo(() => {
    if (plate === "chicken" && sides[0]) return ["Candied Yams", sides[0]];
    return sides;
  }, [plate, sides]);

  function choosePlate(next: Plate) {
    setPlate(next);
    setSides([]);
    document.getElementById("build-order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleSteakSide(side: string) {
    setSides((current) => {
      if (current.includes(side)) return current.filter((item) => item !== side);
      return current.length < 2 ? [...current, side] : current;
    });
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutOpen(false);
    setConfirmed(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="24K Catering home">
          <span className="brand-mark">24K</span>
          <span className="brand-copy">Catering<br /><small>by Chef Dnia</small></span>
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#details" onClick={() => setMenuOpen(false)}>Details</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a className="nav-order" href="#build-order" onClick={() => setMenuOpen(false)}>Order now <span>↗</span></a>
        </nav>
        <button className="menu-button" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span></span><span></span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span></span> This week&apos;s plate special</p>
          <h1>Home-cooked<br /><em>with the Midas touch.</em></h1>
          <p className="hero-description">Two comfort-food favorites, cooked fresh and packed with flavor. Choose your plate, pick your sides, and leave the rest to Chef Dnia.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#menu">Choose your plate <span>↓</span></a>
            <div className="price-lockup"><strong>$30</strong><span>per plate<br />roll included</span></div>
          </div>
          <p className="scarcity"><i></i> Pre-orders encouraged · Limited plates available</p>
        </div>
        <div className="hero-visual" aria-label="Steak tips and garlic herb chicken dinner platters">
          <img src="/assets/chef-dnia-plates.png" alt="Steak tips and garlic herb chicken dinner platters with homemade sides" />
          <div className="hero-stamp"><span>Freshly</span><strong>MADE</strong><small>for you</small></div>
          <div className="hero-note"><span>✦</span><p>Honey garlic<br />Hawaiian rolls</p></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Service highlights">
        <div><span>01</span><p><strong>Made fresh</strong>Prepared in small batches</p></div>
        <div><span>02</span><p><strong>Easy ordering</strong>Choose your plate in minutes</p></div>
        <div><span>03</span><p><strong>Your way</strong>Pickup or local delivery</p></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <p className="eyebrow"><span></span> Choose your favorite</p>
          <h2>What are you<br /><em>in the mood for?</em></h2>
          <p>Every plate is served over rice with a honey garlic Hawaiian roll and your choice of sides.</p>
        </div>

        <div className="plate-grid">
          <article className="plate-card">
            <button className="plate-image steak-image" type="button" onClick={() => choosePlate("steak")} aria-label="Choose steak tips and gravy plate">
              <img src="/assets/chef-dnia-plates.png" alt="Steak tips smothered in savory gravy over rice" />
              <span className="plate-badge">Most popular</span>
            </button>
            <div className="plate-content">
              <div><p className="plate-kicker">Rich & savory</p><h3>Steak Tips<br />& Gravy</h3></div>
              <strong className="plate-price">$30</strong>
              <p>Tender steak tips smothered in savory gravy, served over a bed of fluffy rice.</p>
              <div className="included"><span>✓</span> Choose any two sides</div>
              <button className="select-plate" type="button" onClick={() => choosePlate("steak")}>Select this plate <span>→</span></button>
            </div>
          </article>

          <article className="plate-card featured-card">
            <button className="plate-image chicken-image" type="button" onClick={() => choosePlate("chicken")} aria-label="Choose garlic herb chicken plate">
              <img src="/assets/chef-dnia-plates.png" alt="Garlic herb chicken over rice with candied yams and broccolini" />
              <span className="plate-badge dark-badge">Chef&apos;s pick</span>
            </button>
            <div className="plate-content">
              <div><p className="plate-kicker">Golden & aromatic</p><h3>Garlic Herb<br />Chicken</h3></div>
              <strong className="plate-price">$30</strong>
              <p>Seasoned garlic herb chicken over rice, paired with sweet candied yams.</p>
              <div className="included"><span>✓</span> Choose green beans or broccolini</div>
              <button className="select-plate" type="button" onClick={() => choosePlate("chicken")}>Select this plate <span>→</span></button>
            </div>
          </article>
        </div>
      </section>

      <section className="builder-section" id="build-order">
        <div className="builder-intro">
          <p className="eyebrow light"><span></span> Build your order</p>
          <h2>Make it yours.</h2>
          <p>Pick a plate, select your sides, and tell us how you&apos;d like to receive it.</p>
          <div className="mini-quote"><span>“</span><p>Good food should feel like somebody made it just for you.<small>— Chef Dnia</small></p></div>
        </div>

        <div className="order-builder">
          <div className="builder-step">
            <div className="step-label"><span>1</span><div><strong>Choose your plate</strong><small>One entrée per order</small></div></div>
            <div className="choice-grid">
              <button className={plate === "steak" ? "choice-card selected" : "choice-card"} type="button" onClick={() => { setPlate("steak"); setSides([]); }}>
                <span className="choice-dot"></span><span><strong>Steak Tips & Gravy</strong><small>Over rice · choose 2 sides</small></span><b>$30</b>
              </button>
              <button className={plate === "chicken" ? "choice-card selected" : "choice-card"} type="button" onClick={() => { setPlate("chicken"); setSides([]); }}>
                <span className="choice-dot"></span><span><strong>Garlic Herb Chicken</strong><small>Over rice · yams + 1 green</small></span><b>$30</b>
              </button>
            </div>
          </div>

          <div className={plate ? "builder-step" : "builder-step muted-step"}>
            <div className="step-label"><span>2</span><div><strong>{plate === "chicken" ? "Choose your green" : "Choose your sides"}</strong><small>{plate === "steak" ? `${sides.length} of 2 selected` : plate === "chicken" ? `${sides.length} of 1 selected · yams included` : "Select a plate first"}</small></div></div>
            <div className="side-grid">
              {(plate === "chicken" ? chickenGreens : steakSides).map((side) => (
                <button key={side} type="button" disabled={!plate} className={sides.includes(side) ? "side-choice selected" : "side-choice"} onClick={() => plate === "chicken" ? setSides([side]) : toggleSteakSide(side)}>
                  <span>{sides.includes(side) ? "✓" : "+"}</span>{side}
                </button>
              ))}
            </div>
          </div>

          <div className="builder-step final-step">
            <div className="step-label"><span>3</span><div><strong>How are you getting it?</strong><small>Delivery fee may apply</small></div></div>
            <div className="fulfillment-toggle">
              <button type="button" className={fulfillment === "pickup" ? "selected" : ""} onClick={() => setFulfillment("pickup")}><span>⌖</span><strong>Pickup</strong><small>We&apos;ll send the location</small></button>
              <button type="button" className={fulfillment === "delivery" ? "selected" : ""} onClick={() => setFulfillment("delivery")}><span>↗</span><strong>Delivery</strong><small>Fee based on address</small></button>
            </div>
          </div>
        </div>

        <aside className="order-summary" aria-live="polite">
          <p className="summary-label">Your order</p>
          <div className="summary-title"><h3>{plateName}</h3><strong>${total}</strong></div>
          {plate ? (
            <div className="summary-details"><p>Over rice + Hawaiian roll</p>{orderSides.map((side) => <span key={side}>+ {side}</span>)}</div>
          ) : (
            <p className="empty-summary">Your delicious plate will appear here.</p>
          )}
          <div className="quantity-row"><span>Quantity</span><div><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button><strong>{quantity}</strong><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(10, value + 1))}>+</button></div></div>
          <div className="summary-total"><span>Total <small>{fulfillment === "delivery" ? "Delivery quoted separately" : "Pickup selected"}</small></span><strong>${total}</strong></div>
          <button className="checkout-button" type="button" disabled={!orderReady} onClick={() => setCheckoutOpen(true)}>{orderReady ? "Continue to order" : plate ? "Finish choosing sides" : "Choose a plate"}<span>→</span></button>
          <p className="secure-note">✓ No payment taken until order is confirmed</p>
        </aside>
      </section>

      <section className="details-section" id="details">
        <div className="details-image"><img src="/assets/chef-dnia-plates.png" alt="Freshly prepared 24K Catering dinner plates" /><span>24K</span></div>
        <div className="details-copy">
          <p className="eyebrow"><span></span> The 24K standard</p>
          <h2>Comfort food,<br /><em>done with care.</em></h2>
          <p>These aren&apos;t assembly-line meals. Each plate is prepared in small batches, seasoned with intention, and packed to arrive ready to enjoy.</p>
          <ul>
            <li><span>✦</span><div><strong>Made in small batches</strong><p>Limited quantities help keep every plate fresh.</p></div></li>
            <li><span>✦</span><div><strong>Generous portions</strong><p>A full entrée, rice, sides, and a honey garlic roll.</p></div></li>
            <li><span>✦</span><div><strong>Pickup or delivery</strong><p>Choose the option that works best for your day.</p></div></li>
          </ul>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div><p className="eyebrow"><span></span> Good to know</p><h2>Before you order.</h2></div>
        <div className="faq-list">
          <details open><summary>When should I place my order?<span>+</span></summary><p>Pre-orders are strongly encouraged. Plates are prepared in limited quantities and may sell out.</p></details>
          <details><summary>How does delivery work?<span>+</span></summary><p>Local delivery is available for an additional fee based on your address. Your final total is confirmed before payment.</p></details>
          <details><summary>Can I make substitutions?<span>+</span></summary><p>You can choose from the listed side options. Add any allergy notes or special requests during checkout and Chef Dnia will confirm what is possible.</p></details>
        </div>
      </section>

      <section className="final-cta">
        <p>Ready when you are.</p>
        <h2>Claim your plate<br /><em>before they&apos;re gone.</em></h2>
        <a className="primary-button gold-button" href="#build-order">Start my order <span>↑</span></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">24K</span><span className="brand-copy">Catering<br /><small>by Chef Dnia</small></span></a>
        <p>Fresh plates. Golden flavor. Made with care.</p>
        <div><a href="#menu">Menu</a><a href="#details">Details</a><a href="#faq">FAQ</a></div>
        <small>Website experience by <strong>OWNYOURWEB</strong></small>
      </footer>

      {checkoutOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setCheckoutOpen(false)}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close order form" onClick={() => setCheckoutOpen(false)}>×</button>
            <p className="eyebrow"><span></span> Almost yours</p>
            <h2 id="checkout-title">Where should we send your confirmation?</h2>
            <p className="modal-summary">{quantity}× {plateName} · {orderSides.join(" + ")} · ${total}</p>
            <form onSubmit={submitOrder}>
              <label>Full name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
              <label>Mobile number<input name="phone" autoComplete="tel" inputMode="tel" required placeholder="(215) 555-0123" /></label>
              {fulfillment === "delivery" && <label>Delivery address<input name="address" autoComplete="street-address" required placeholder="Street address" /></label>}
              <label>Anything Chef should know?<textarea name="notes" placeholder="Allergies or order notes (optional)"></textarea></label>
              <button className="checkout-button" type="submit">Place order request · ${total}<span>→</span></button>
              <p>Chef Dnia will confirm availability, timing, and payment details by text.</p>
            </form>
          </section>
        </div>
      )}

      {confirmed && (
        <div className="modal-backdrop" role="presentation">
          <section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
            <div className="success-icon">✓</div>
            <p className="eyebrow"><span></span> Order request received</p>
            <h2 id="success-title">You&apos;re on Chef Dnia&apos;s list.</h2>
            <p>Your order request is ready for confirmation. You&apos;ll receive a text with availability, timing, and payment details.</p>
            <button className="primary-button" type="button" onClick={() => setConfirmed(false)}>Back to the menu</button>
          </section>
        </div>
      )}
    </main>
  );
}
