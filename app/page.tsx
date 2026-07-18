"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Fulfillment = "Delivery" | "Warehouse pickup" | "Wholesale";
type Status = "New" | "Contacted" | "Confirmed" | "Ready" | "Out for delivery" | "Complete";
type View = "Overview" | "Orders" | "Delivery" | "Pickup" | "Wholesale" | "Locations";

type Order = {
  id: string;
  customer: string;
  initials: string;
  item: string;
  quantity: string;
  total: number;
  fulfillment: Fulfillment;
  location: string;
  status: Status;
  due: string;
  source: "Instagram" | "Call" | "Text" | "Repeat customer";
  note?: string;
};

const seedOrders: Order[] = [
  { id: "SG-1048", customer: "Marcus T.", initials: "MT", item: "Laundry detergent", quantity: "6 × 5-gallon", total: 270, fulfillment: "Delivery", location: "Philadelphia route", status: "New", due: "Today · 12:30 PM", source: "Instagram", note: "Apartment building—call on arrival." },
  { id: "SG-1047", customer: "Keisha Supply Co.", initials: "KS", item: "Mixed cleaning pallet", quantity: "1 pallet · 48 units", total: 1680, fulfillment: "Wholesale", location: "Warehouse", status: "Contacted", due: "Quote due · 1:00 PM", source: "Call", note: "Needs resale pricing and freight estimate." },
  { id: "SG-1046", customer: "Darnell R.", initials: "DR", item: "Dish soap + softener", quantity: "4 × 5-gallon", total: 190, fulfillment: "Warehouse pickup", location: "Warehouse", status: "Ready", due: "Pickup · 2:15 PM", source: "Text" },
  { id: "SG-1045", customer: "Fresh Start Cleaning", initials: "FS", item: "Floor cleaner", quantity: "10 × 5-gallon", total: 420, fulfillment: "Delivery", location: "North Jersey route", status: "Confirmed", due: "Tomorrow · 9:00 AM", source: "Repeat customer" },
  { id: "SG-1044", customer: "Alisha B.", initials: "AB", item: "Laundry detergent", quantity: "2 × 5-gallon", total: 90, fulfillment: "Delivery", location: "Philadelphia route", status: "Out for delivery", due: "ETA · 11:40 AM", source: "Instagram" },
  { id: "SG-1043", customer: "Rico’s Market", initials: "RM", item: "Mixed cleaning pallet", quantity: "2 pallets · 96 units", total: 3200, fulfillment: "Wholesale", location: "DMV freight", status: "Confirmed", due: "Ship · Friday", source: "Call" },
  { id: "SG-1042", customer: "Nia J.", initials: "NJ", item: "Fabric softener", quantity: "3 × 5-gallon", total: 135, fulfillment: "Warehouse pickup", location: "Warehouse", status: "Contacted", due: "Pickup · 4:30 PM", source: "Text" },
  { id: "SG-1041", customer: "Bright Life LLC", initials: "BL", item: "Multi-surface cleaner", quantity: "8 × 5-gallon", total: 360, fulfillment: "Delivery", location: "North Jersey route", status: "Complete", due: "Delivered · 9:22 AM", source: "Repeat customer" },
];

const locations = ["All locations", "Warehouse", "Philadelphia route", "North Jersey route", "DMV freight"];
const statuses: Status[] = ["New", "Contacted", "Confirmed", "Ready", "Out for delivery", "Complete"];

const viewCopy: Record<View, { eyebrow: string; title: string; description: string }> = {
  Overview: { eyebrow: "Saturday, July 18", title: "Good morning, Soap Game.", description: "Here’s what needs attention across orders, pickups, routes, and wholesale today." },
  Orders: { eyebrow: "Order desk", title: "Every customer in one place.", description: "Move call, text, and Instagram requests forward without losing the details." },
  Delivery: { eyebrow: "Dispatch board", title: "Keep every route moving.", description: "See confirmed drops, driver-ready orders, timing, and location at a glance." },
  Pickup: { eyebrow: "Warehouse queue", title: "Make pickup feel effortless.", description: "Know who is coming, what is packed, and which orders still need confirmation." },
  Wholesale: { eyebrow: "Wholesale pipeline", title: "Turn pallet interest into invoices.", description: "Track quotes, follow-ups, quantities, freight routes, and next actions." },
  Locations: { eyebrow: "Location command", title: "One view across every market.", description: "Compare warehouse volume, delivery routes, freight, and open workload." },
};

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function Home() {
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [view, setView] = useState<View>("Overview");
  const [location, setLocation] = useState("All locations");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("soap-game-strong-demo-orders");
    if (saved) {
      try { setOrders(JSON.parse(saved)); } catch { /* Keep the seeded demo. */ }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("soap-game-strong-demo-orders", JSON.stringify(orders));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const viewMatches = view === "Delivery" ? order.fulfillment === "Delivery"
        : view === "Pickup" ? order.fulfillment === "Warehouse pickup"
          : view === "Wholesale" ? order.fulfillment === "Wholesale" : true;
      const locationMatches = location === "All locations" || order.location === location;
      const statusMatches = statusFilter === "All" || order.status === statusFilter;
      const searchMatches = `${order.customer} ${order.id} ${order.item} ${order.location}`.toLowerCase().includes(query.toLowerCase());
      return viewMatches && locationMatches && statusMatches && searchMatches;
    });
  }, [orders, view, location, statusFilter, query]);

  const openCount = orders.filter((order) => !["Complete"].includes(order.status)).length;
  const needsReply = orders.filter((order) => ["New", "Contacted"].includes(order.status)).length;
  const readyCount = orders.filter((order) => ["Ready", "Out for delivery"].includes(order.status)).length;
  const sales = orders.filter((order) => ["Confirmed", "Ready", "Out for delivery", "Complete"].includes(order.status)).reduce((sum, order) => sum + order.total, 0);

  function announce(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function updateStatus(id: string, next: Status) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status: next } : order));
    setSelectedOrder((current) => current?.id === id ? { ...current, status: next } : current);
    announce(`Order ${id} moved to ${next.toLowerCase()}.`);
  }

  function addOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = String(data.get("customer"));
    const next: Order = {
      id: `SG-${1049 + orders.length - seedOrders.length}`,
      customer,
      initials: initials(customer),
      item: String(data.get("item")),
      quantity: String(data.get("quantity")),
      total: Number(data.get("total")),
      fulfillment: String(data.get("fulfillment")) as Fulfillment,
      location: String(data.get("location")),
      status: "New",
      due: "Needs scheduling",
      source: String(data.get("source")) as Order["source"],
      note: String(data.get("note") || ""),
    };
    setOrders((current) => [next, ...current]);
    setAddOpen(false);
    announce(`${next.id} added to the order queue.`);
  }

  function selectView(next: View) {
    setView(next);
    setStatusFilter("All");
    setMenuOpen(false);
  }

  return (
    <main className="app-shell">
      <aside className={menuOpen ? "sidebar is-open" : "sidebar"}>
        <div className="brand-lockup">
          <div className="brand-bubble" aria-hidden="true"><span></span><span></span><span></span><strong>SG</strong></div>
          <div><b>Soap Game</b><strong>Strong</strong><small>Order Flow</small></div>
        </div>

        <nav aria-label="Dashboard navigation">
          <p>Workspace</p>
          {(["Overview", "Orders", "Delivery", "Pickup", "Wholesale", "Locations"] as View[]).map((item) => (
            <button key={item} className={view === item ? "active" : ""} type="button" onClick={() => selectView(item)}>
              <span aria-hidden="true">{item === "Overview" ? "⌂" : item === "Orders" ? "▤" : item === "Delivery" ? "↗" : item === "Pickup" ? "⌑" : item === "Wholesale" ? "▦" : "◎"}</span>
              {item}
              {item === "Orders" && <em>{openCount}</em>}
            </button>
          ))}
        </nav>

        <div className="sidebar-guide">
          <span>💬</span>
          <strong>Never lose an order</strong>
          <p>Log every call, text, and Instagram message before it leaves your mind.</p>
          <button type="button" onClick={() => setAddOpen(true)}>Add an order <span>＋</span></button>
        </div>

        <div className="sidebar-user">
          <div>SG</div><span><strong>Soap Game Strong</strong><small>Owner workspace</small></span><button type="button" aria-label="Account options">•••</button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="mobile-menu" type="button" aria-label="Toggle dashboard menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>☰</button>
          <label className="global-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customer, order, or product" /></label>
          <div className="topbar-actions">
            <button className="notification" type="button" aria-label="Notifications">♢<span>3</span></button>
            <button className="add-button" type="button" onClick={() => setAddOpen(true)}><span>＋</span> Add order</button>
          </div>
        </header>

        <div className="dashboard">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">{viewCopy[view].eyebrow}</p>
              <h1>{viewCopy[view].title}</h1>
              <p>{viewCopy[view].description}</p>
            </div>
            <label className="location-filter"><span>◎</span><select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Filter by location">{locations.map((item) => <option key={item}>{item}</option>)}</select></label>
          </section>

          <section className="metrics" aria-label="Business summary">
            <article><div className="metric-icon blue">▤</div><p>Open orders</p><strong>{openCount}</strong><small><span>↑ 18%</span> from last week</small></article>
            <article><div className="metric-icon amber">◌</div><p>Needs a reply</p><strong>{needsReply}</strong><small><span className="warn">Oldest: 38 min</span></small></article>
            <article><div className="metric-icon green">✓</div><p>Ready to move</p><strong>{readyCount}</strong><small>Pickup or dispatch</small></article>
            <article><div className="metric-icon violet">$</div><p>Confirmed sales</p><strong>{currency(sales)}</strong><small><span>↑ $890</span> this week</small></article>
          </section>

          <section className="attention-card">
            <div className="attention-mark">!</div>
            <div><strong>{needsReply} customers are waiting for a response</strong><p>Replying now keeps Instagram and text orders from going cold.</p></div>
            <button type="button" onClick={() => { setStatusFilter("New"); setView("Orders"); }}>Review waiting orders <span>→</span></button>
          </section>

          <section className="orders-card">
            <div className="card-heading">
              <div><p className="eyebrow">Live order desk</p><h2>{view === "Overview" ? "Today’s order flow" : `${view} queue`}</h2><span>{filteredOrders.length} records shown · demo locations</span></div>
              <div className="heading-actions"><button type="button" onClick={() => { setQuery(""); setStatusFilter("All"); setLocation("All locations"); }}>Clear filters</button><button className="icon-button" type="button" aria-label="More order options">•••</button></div>
            </div>

            <div className="order-tabs" role="group" aria-label="Filter orders by status">
              <button className={statusFilter === "All" ? "active" : ""} type="button" onClick={() => setStatusFilter("All")}>All <span>{orders.length}</span></button>
              {(["New", "Contacted", "Confirmed", "Ready"] as Status[]).map((status) => <button key={status} className={statusFilter === status ? "active" : ""} type="button" onClick={() => setStatusFilter(status)}>{status} <span>{orders.filter((order) => order.status === status).length}</span></button>)}
            </div>

            <div className="table-wrap">
              <table>
                <thead><tr><th>Order / customer</th><th>Products</th><th>Fulfillment</th><th>Status</th><th>Total</th><th>Timing</th><th><span className="sr-only">Open</span></th></tr></thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td><button className="customer-cell" type="button" onClick={() => setSelectedOrder(order)}><span>{order.initials}</span><div><strong>{order.customer}</strong><small>{order.id} · {order.source}</small></div></button></td>
                      <td><strong className="product-name">{order.item}</strong><small>{order.quantity}</small></td>
                      <td><span className={`fulfillment-chip ${order.fulfillment.toLowerCase().replaceAll(" ", "-")}`}>{order.fulfillment === "Delivery" ? "↗" : order.fulfillment === "Warehouse pickup" ? "⌑" : "▦"} {order.fulfillment}</span><small>{order.location}</small></td>
                      <td><select className={`status-select status-${order.status.toLowerCase().replaceAll(" ", "-")}`} value={order.status} onChange={(event) => updateStatus(order.id, event.target.value as Status)} aria-label={`Status for ${order.id}`}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td>
                      <td><strong className="money">{currency(order.total)}</strong></td>
                      <td><strong className="due">{order.due.split(" · ")[0]}</strong><small>{order.due.split(" · ")[1] ?? ""}</small></td>
                      <td><button className="row-open" type="button" aria-label={`Open ${order.id}`} onClick={() => setSelectedOrder(order)}>›</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && <div className="empty-state"><span>⌕</span><strong>No orders match these filters.</strong><p>Clear the filters or add a new request.</p></div>}
            </div>
          </section>

          <section className="operations-grid">
            <article className="route-card">
              <div className="card-heading"><div><p className="eyebrow">Fulfillment snapshot</p><h2>Today by lane</h2></div><button className="icon-button" type="button" aria-label="Route options">•••</button></div>
              <div className="lane"><span className="lane-icon delivery">↗</span><div><strong>Delivery routes</strong><small>Philadelphia + North Jersey</small></div><b>5</b><em>2 on the road</em></div>
              <div className="lane"><span className="lane-icon pickup">⌑</span><div><strong>Warehouse pickup</strong><small>Next arrival at 2:15 PM</small></div><b>3</b><em>1 ready</em></div>
              <div className="lane"><span className="lane-icon wholesale">▦</span><div><strong>Wholesale freight</strong><small>Quotes and pallet orders</small></div><b>4</b><em>$4.8K open</em></div>
            </article>

            <article className="pipeline-card">
              <div className="card-heading"><div><p className="eyebrow">Wholesale</p><h2>Pallet pipeline</h2></div><button type="button" onClick={() => selectView("Wholesale")}>View pipeline →</button></div>
              <div className="pipeline-bars">
                <div><span><strong>New interest</strong><b>4 leads</b></span><i><em style={{ width: "74%" }}></em></i></div>
                <div><span><strong>Quote sent</strong><b>3 leads</b></span><i><em style={{ width: "58%" }}></em></i></div>
                <div><span><strong>Ready to close</strong><b>2 leads</b></span><i><em style={{ width: "39%" }}></em></i></div>
              </div>
              <div className="pipeline-total"><span>Open wholesale value<small>Across all demo locations</small></span><strong>$8,460</strong></div>
            </article>
          </section>
        </div>
      </section>

      {selectedOrder && (
        <div className="drawer-backdrop" role="presentation" onMouseDown={() => setSelectedOrder(null)}>
          <aside className="order-drawer" role="dialog" aria-modal="true" aria-labelledby="order-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="drawer-close" type="button" aria-label="Close order details" onClick={() => setSelectedOrder(null)}>×</button>
            <p className="eyebrow">{selectedOrder.id}</p>
            <h2 id="order-title">{selectedOrder.customer}</h2>
            <p className="drawer-source">Came in through {selectedOrder.source.toLowerCase()}</p>
            <div className="drawer-total"><span>Order total</span><strong>{currency(selectedOrder.total)}</strong></div>
            <div className="detail-block"><small>Products</small><strong>{selectedOrder.item}</strong><p>{selectedOrder.quantity}</p></div>
            <div className="detail-grid"><div><small>Fulfillment</small><strong>{selectedOrder.fulfillment}</strong></div><div><small>Location</small><strong>{selectedOrder.location}</strong></div></div>
            <div className="detail-block"><small>Timing</small><strong>{selectedOrder.due}</strong></div>
            <div className="detail-block note"><small>Order notes</small><p>{selectedOrder.note || "No special notes added."}</p></div>
            <label className="drawer-status">Move order to<select value={selectedOrder.status} onChange={(event) => updateStatus(selectedOrder.id, event.target.value as Status)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            <div className="drawer-actions"><button type="button" onClick={() => announce(`Call task queued for ${selectedOrder.customer}.`)}>Call customer</button><button type="button" onClick={() => announce(`Text follow-up queued for ${selectedOrder.customer}.`)}>Text update</button></div>
            <p className="demo-note">Demo only—communication buttons show the workflow and do not contact a real customer.</p>
          </aside>
        </div>
      )}

      {addOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setAddOpen(false)}>
          <section className="add-modal" role="dialog" aria-modal="true" aria-labelledby="add-order-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="drawer-close" type="button" aria-label="Close new order form" onClick={() => setAddOpen(false)}>×</button>
            <p className="eyebrow">Quick capture</p><h2 id="add-order-title">Add a new order</h2><p>Get the request out of DMs, calls, or texts and into the system.</p>
            <form onSubmit={addOrder}>
              <div className="form-grid"><label>Customer name<input name="customer" required placeholder="Customer or business" /></label><label>Order source<select name="source"><option>Instagram</option><option>Call</option><option>Text</option><option>Repeat customer</option></select></label></div>
              <label>Product<input name="item" required placeholder="e.g. Laundry detergent" /></label>
              <div className="form-grid"><label>Quantity<input name="quantity" required placeholder="e.g. 4 × 5-gallon" /></label><label>Estimated total<input name="total" required min="0" type="number" inputMode="decimal" placeholder="180" /></label></div>
              <div className="form-grid"><label>Fulfillment<select name="fulfillment"><option>Delivery</option><option>Warehouse pickup</option><option>Wholesale</option></select></label><label>Location<select name="location">{locations.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label></div>
              <label>Notes<textarea name="note" placeholder="Address, product scent, timing, or follow-up details"></textarea></label>
              <button className="submit-order" type="submit">Add to order flow <span>→</span></button>
            </form>
          </section>
        </div>
      )}

      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </main>
  );
}
