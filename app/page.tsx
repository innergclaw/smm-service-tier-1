"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  category: "Bowls" | "Platters" | "Sides";
  price: number;
  description: string;
  accent: string;
  choices?: { label: string; options: string[] }[];
};

type CartItem = {
  key: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  selections: Record<string, string>;
};

const menu: MenuItem[] = [
  {
    id: "alfredo",
    name: "Alfredo Bowl",
    category: "Bowls",
    price: 15,
    description: "Creamy Alfredo pasta finished with your choice of protein.",
    accent: "01",
    choices: [
      { label: "Protein", options: ["Chicken", "Shrimp", "Salmon"] },
      { label: "Seasoning", options: ["Classic", "Cajun", "Jerk"] },
    ],
  },
  {
    id: "rice",
    name: "Rice Bowl",
    category: "Bowls",
    price: 15,
    description: "Yellow rice with broccoli or spinach, protein, and sauce.",
    accent: "02",
    choices: [
      { label: "Protein", options: ["Chicken", "Shrimp", "Salmon"] },
      { label: "Vegetable", options: ["Broccoli", "Spinach"] },
      { label: "Sauce", options: ["Teriyaki", "Sweet Chili", "Bourbon", "Honey Hot", "Jerk BBQ"] },
    ],
  },
  {
    id: "bundle",
    name: "Two-Bowl Bundle",
    category: "Bowls",
    price: 25,
    description: "Choose two bowls for one easy pickup. Best value on the menu.",
    accent: "2×",
    choices: [
      { label: "First bowl", options: ["Chicken Alfredo", "Shrimp Alfredo", "Salmon Alfredo", "Chicken Rice", "Shrimp Rice", "Salmon Rice"] },
      { label: "Second bowl", options: ["Chicken Alfredo", "Shrimp Alfredo", "Salmon Alfredo", "Chicken Rice", "Shrimp Rice", "Salmon Rice"] },
    ],
  },
  {
    id: "egg-roll",
    name: "Egg Roll Platter",
    category: "Platters",
    price: 15,
    description: "Two full egg rolls with your choice of fries and dipping sauce.",
    accent: "03",
    choices: [
      { label: "Egg rolls", options: ["Cheesesteak", "Salmon"] },
      { label: "Side", options: ["French Fries", "Sweet Potato Fries"] },
      { label: "Sauce", options: ["Teriyaki", "Sweet Chili", "Bourbon", "Honey Hot", "Jerk BBQ", "Ketchup"] },
    ],
  },
  {
    id: "dessert",
    name: "Pudding Cup",
    category: "Sides",
    price: 5,
    description: "A chilled finish to your Food Fusion order.",
    accent: "04",
    choices: [{ label: "Flavor", options: ["Biscoff", "Banana"] }],
  },
  {
    id: "drink",
    name: "Cold Drink",
    category: "Sides",
    price: 1,
    description: "Add a cold drink to your pickup order.",
    accent: "05",
    choices: [{ label: "Drink", options: ["Pepsi — $1", "Ginger Ale — $1", "Sprite — $1", "Bottled Water — $2"] }],
  },
];

const pickupTimes = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM"];

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function todayLabel(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(date);
}

export default function Home() {
  const [category, setCategory] = useState<"All" | MenuItem["category"]>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [configuring, setConfiguring] = useState<MenuItem | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("food-fusion-215-demo-cart");
    if (!stored) return;
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(JSON.parse(stored));
    } catch {
      window.localStorage.removeItem("food-fusion-215-demo-cart");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("food-fusion-215-demo-cart", JSON.stringify(cart));
  }, [cart]);

  const shownItems = category === "All" ? menu : menu.filter((item) => item.category === category);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function announce(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function addConfigured(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configuring) return;
    const data = new FormData(event.currentTarget);
    const selections = Object.fromEntries(configuring.choices?.map((choice) => [choice.label, String(data.get(choice.label))]) ?? []);
    const waterUpcharge = configuring.id === "drink" && selections.Drink?.startsWith("Bottled Water") ? 1 : 0;
    const next: CartItem = {
      key: `${configuring.id}-${Date.now()}`,
      id: configuring.id,
      name: configuring.name,
      price: configuring.price + waterUpcharge,
      quantity: 1,
      selections,
    };
    setCart((current) => [...current, next]);
    setConfiguring(null);
    announce(`${configuring.name} added to your order.`);
  }

  function updateQuantity(key: string, delta: number) {
    setCart((current) => current
      .map((item) => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart.length) {
      announce("Add at least one item before checking out.");
      return;
    }
    const orderNumber = `FF215-${String(Date.now()).slice(-5)}`;
    setConfirmation(orderNumber);
    setCart([]);
  }

  function scrollToMenu() {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <main>
      <div className="demo-ribbon">Interactive demo · Orders are not sent or charged</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Food Fusion 215 home">
          <span className="brand-mark">FF</span>
          <span><strong>FOOD FUSION</strong><small>215 · PHILADELPHIA</small></span>
        </a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Main navigation">
          <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How pickup works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>The fusion</a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
            <span>Bag</span><b>{cartCount}</b>
          </button>
          <button className="menu-button" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}><i></i><i></i></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Philadelphia pickup · Open daily 5 PM–12 AM</p>
          <h1>BIG FLAVOR.<br/><em>ZERO</em> DM CHAOS.</h1>
          <p className="hero-lead">Build your bowl, choose your pickup time, and keep every detail together. Food Fusion 215 ordering—organized.</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={scrollToMenu}>Start your order <span>↘</span></button>
            <a className="text-link" href="https://instagram.com/foodfusion_215" target="_blank" rel="noreferrer">@foodfusion_215 <span>↗</span></a>
          </div>
        </div>
        <div className="hero-board" aria-label="Popular menu preview">
          <div className="board-top"><span>Tonight’s menu</span><b>05—12</b></div>
          <div className="feature-tile feature-gold"><small>Most ordered</small><strong>TWO BOWLS</strong><b>$25</b><span>Choose any two</span></div>
          <div className="feature-tile"><small>Made your way</small><strong>ALFREDO</strong><b>$15</b><span>Chicken · Shrimp · Salmon</span></div>
          <div className="feature-tile"><small>Full platter</small><strong>EGG ROLLS</strong><b>$15</b><span>Fries + sauce included</span></div>
          <div className="board-stamp"><span>215</span><strong>ORDER<br/>READY</strong></div>
        </div>
      </section>

      <section className="marquee" aria-label="Food Fusion menu highlights"><div>
        <span>ALFREDO BOWLS</span><i>◆</i><span>RICE BOWLS</span><i>◆</i><span>EGG ROLL PLATTERS</span><i>◆</i><span>DESSERTS</span><i>◆</i><span>PICKUP ONLY</span><i>◆</i><span>ALFREDO BOWLS</span><i>◆</i><span>RICE BOWLS</span><i>◆</i><span>EGG ROLL PLATTERS</span><i>◆</i>
      </div></section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><p className="eyebrow">01 / Build your pickup</p><h2>CHOOSE YOUR<br/>FUSION.</h2></div>
          <p>Fresh bowls and platters prepared for pickup. Choose the details now so nothing gets lost in a message thread.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter menu categories">
          {(["All", "Bowls", "Platters", "Sides"] as const).map((item) => <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="menu-grid">
          {shownItems.map((item) => (
            <article className="menu-card" key={item.id}>
              <div className="menu-card-top"><span>{item.accent}</span><small>{item.category}</small></div>
              <div className="menu-card-copy"><h3>{item.name}</h3><p>{item.description}</p></div>
              <div className="choice-preview">{item.choices?.map((choice) => <span key={choice.label}>{choice.label}</span>)}</div>
              <div className="menu-card-action"><strong>{money(item.price)}</strong><button type="button" onClick={() => setConfiguring(item)}>Customize + add</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="section-heading light">
          <div><p className="eyebrow">02 / No more missing details</p><h2>THREE STEPS.<br/>ONE CLEAN ORDER.</h2></div>
          <p>Designed to replace scattered DMs with a simple pickup process customers can finish from their phone.</p>
        </div>
        <div className="steps-grid">
          <article><span>01</span><h3>Build the meal</h3><p>Choose your protein, side, sauce, and extras without typing a long message.</p></article>
          <article><span>02</span><h3>Pick your time</h3><p>Select an available evening pickup window and enter one reliable contact number.</p></article>
          <article><span>03</span><h3>Get confirmation</h3><p>A live version can send the kitchen ticket, receipt, and pickup instructions automatically.</p></article>
        </div>
      </section>

      <section className="story-section" id="about">
        <div className="flyer-frame"><img src="./assets/food-fusion-215-flyer.png" alt="Food Fusion 215 original Instagram menu flyer" /></div>
        <div className="story-copy">
          <p className="eyebrow">03 / From flyer to food system</p>
          <h2>KEEP THE FLAVOR.<br/>UPGRADE THE ORDER.</h2>
          <p>The flyer gets attention. The website turns that attention into organized orders—with selections, pickup timing, customer details, and order totals captured together.</p>
          <div className="upgrade-list">
            <div><span>Before</span><p>Customers type orders in DMs. Details get buried between messages.</p></div>
            <div><span>After</span><p>Every selection arrives in one structured order ready for the kitchen.</p></div>
          </div>
          <button className="primary-action" type="button" onClick={scrollToMenu}>Order from the menu <span>→</span></button>
        </div>
      </section>

      <section className="closing-section">
        <p>Food Fusion 215</p><h2>DINNER<br/>STARTS HERE.</h2><button type="button" onClick={scrollToMenu}>Start pickup order <span>↗</span></button>
      </section>

      <footer><div className="brand footer-brand"><span className="brand-mark">FF</span><span><strong>FOOD FUSION</strong><small>215 · PHILADELPHIA</small></span></div><p>Sunday–Saturday · 5 PM–12 AM<br/>Pickup only · Location confirmed with order</p><a href="https://instagram.com/foodfusion_215" target="_blank" rel="noreferrer">Instagram ↗</a></footer>

      {configuring && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setConfiguring(null)}>
          <section className="config-modal" role="dialog" aria-modal="true" aria-labelledby="config-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="close-button" type="button" aria-label="Close customization" onClick={() => setConfiguring(null)}>×</button>
            <p className="eyebrow">Customize your order</p><h2 id="config-title">{configuring.name}</h2><p>{configuring.description}</p>
            <form onSubmit={addConfigured}>
              {configuring.choices?.map((choice) => <label key={choice.label}>{choice.label}<select name={choice.label}>{choice.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
              <button className="primary-action full" type="submit">Add to bag · {money(configuring.price)} <span>→</span></button>
            </form>
          </section>
        </div>
      )}

      <div className={cartOpen ? "cart-backdrop is-open" : "cart-backdrop"} role="presentation" onMouseDown={() => setCartOpen(false)}>
        <aside className={cartOpen ? "cart-drawer is-open" : "cart-drawer"} role="dialog" aria-modal="true" aria-label="Pickup order" onMouseDown={(event) => event.stopPropagation()}>
          <div className="cart-head"><div><p className="eyebrow">Your pickup</p><h2>ORDER BAG</h2></div><button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button></div>
          {confirmation ? (
            <div className="confirmation"><span>✓</span><h3>Demo order complete.</h3><p>Order <strong>{confirmation}</strong> shows how a customer confirmation would appear.</p><p>No order was sent and no payment was collected.</p><button type="button" onClick={() => { setConfirmation(null); setCartOpen(false); }}>Back to menu</button></div>
          ) : cart.length ? (
            <form className="checkout" onSubmit={submitOrder}>
              <div className="cart-items">{cart.map((item) => <article key={item.key}><div><h3>{item.name}</h3><p>{Object.values(item.selections).join(" · ")}</p><strong>{money(item.price * item.quantity)}</strong></div><div className="quantity"><button type="button" aria-label={`Remove one ${item.name}`} onClick={() => updateQuantity(item.key, -1)}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => updateQuantity(item.key, 1)}>+</button></div></article>)}</div>
              <div className="cart-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div className="checkout-fields"><div className="field-row"><label>Pickup day<select required><option>{todayLabel()}</option><option>{todayLabel(1)}</option><option>{todayLabel(2)}</option></select></label><label>Pickup time<select required>{pickupTimes.map((time) => <option key={time}>{time}</option>)}</select></label></div><label>Full name<input required autoComplete="name" placeholder="Name for the order" /></label><label>Mobile number<input required autoComplete="tel" inputMode="tel" placeholder="(215) 555-0123" /></label><label>Order notes<textarea placeholder="Allergies or pickup notes"></textarea></label><fieldset><legend>Payment</legend><label className="radio"><input type="radio" name="payment" value="pickup" defaultChecked/><span><b>Pay at pickup</b><small>Cash or accepted mobile payment</small></span></label><label className="radio disabled"><input type="radio" name="payment" value="online" disabled/><span><b>Pay online</b><small>Connect Stripe or Square for live checkout</small></span></label></fieldset></div>
              <button className="primary-action full" type="submit">Place demo order <span>→</span></button><p className="demo-note">Demo only. Launch requires a secure order database, notifications, payment connection, and confirmed pickup location.</p>
            </form>
          ) : (
            <div className="empty-cart"><span>0</span><h3>Your bag is empty.</h3><p>Choose a bowl, platter, dessert, or drink to start your pickup order.</p><button type="button" onClick={() => { setCartOpen(false); scrollToMenu(); }}>Browse the menu</button></div>
          )}
        </aside>
      </div>

      {cartCount > 0 && !cartOpen && <button className="mobile-cart" type="button" onClick={() => setCartOpen(true)}><span>View order · {cartCount} {cartCount === 1 ? "item" : "items"}</span><strong>{money(subtotal)} →</strong></button>}
      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </main>
  );
}
