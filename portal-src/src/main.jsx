import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { AUTH_CALLBACK_ERROR, PORTAL_URL, supabase } from "./supabase";

const GOLD = "#C9FF46";
const STORAGE_KEY = "owy-portal-demo-v2";

const samplePosts = [
  { id: 1, date: "2026-07-03", time: "10:00 AM", platform: "Instagram", type: "Carousel", category: "Education", campaign: "July Glow", title: "Summer Skin Reset", status: "Approved", caption: "Your summer routine should feel lighter, smarter, and made for your skin.", cta: "Book your consultation", hashtags: "#LuxeBeauty #SummerSkin", feedback: "Approved as presented.", versions: 1 },
  { id: 2, date: "2026-07-05", time: "12:00 PM", platform: "Facebook", type: "Graphic", category: "Authority", campaign: "Meet Luxe", title: "Meet Your Esthetician", status: "Published", caption: "Expert care begins with listening. Meet the hands behind every Luxe treatment.", cta: "Meet the studio", hashtags: "#LuxeBeautyStudio #PhiladelphiaBeauty", feedback: "", versions: 1, link: "https://example.com/post/2" },
  { id: 3, date: "2026-07-08", time: "11:00 AM", platform: "Instagram", type: "Graphic", category: "Education", campaign: "July Glow", title: "The Hydration Myth", status: "Awaiting Client Approval", caption: "Dry and dehydrated skin are not the same thing. Here is how to tell the difference.", cta: "Save this guide", hashtags: "#SkinEducation #LuxeTips", feedback: "", versions: 1 },
  { id: 4, date: "2026-07-10", time: "1:30 PM", platform: "Facebook", type: "Photo", category: "Social Proof", campaign: "Client Stories", title: "Client Glow Story", status: "Awaiting Client Approval", caption: "A consistent routine and the right treatment plan changed everything for this client.", cta: "Start your glow plan", hashtags: "#ClientResults #LuxeGlow", feedback: "", versions: 1 },
  { id: 5, date: "2026-07-12", time: "6:00 PM", platform: "Instagram", type: "Carousel", category: "Service", campaign: "Signature Facial", title: "Luxe Facial Walkthrough", status: "Awaiting Client Approval", caption: "What happens during a Luxe Signature Facial? Swipe through the full experience.", cta: "Reserve your session", hashtags: "#LuxuryFacial #SelfCare", feedback: "", versions: 1 },
  { id: 6, date: "2026-07-14", time: "9:00 AM", platform: "Facebook", type: "Graphic", category: "Promotion", campaign: "July Booking", title: "Book Your July Treatment", status: "Approved", caption: "July appointments are moving quickly. Secure your preferred time while it is available.", cta: "Book now", hashtags: "#JulyAppointments #LuxeBeauty", feedback: "Use the gold treatment-room image.", versions: 2 },
  { id: 7, date: "2026-07-16", time: "11:00 AM", platform: "Instagram", type: "Carousel", category: "Education", campaign: "Skin Signals", title: "Three Signs Your Skin Needs Support", status: "Revision Requested", caption: "Your skin communicates before it becomes uncomfortable. Watch for these three signs.", cta: "Request a consultation", hashtags: "#SkinHealth #LuxeAdvice", feedback: "Please replace slide three with the redness example and soften the CTA.", versions: 2 },
  { id: 8, date: "2026-07-18", time: "10:30 AM", platform: "Facebook", type: "Graphic", category: "Availability", campaign: "July Booking", title: "Weekend Availability", status: "Scheduled", caption: "Two weekend appointments just opened. Choose the time that works for you.", cta: "Claim an opening", hashtags: "#WeekendBeauty #BookLuxe", feedback: "", versions: 1 },
  { id: 9, date: "2026-07-21", time: "7:00 PM", platform: "Instagram", type: "Photo", category: "Product", campaign: "Studio Favorites", title: "Product Spotlight", status: "In Production", caption: "A closer look at the formula we recommend for calm, supported skin.", cta: "Ask about your routine", hashtags: "#ProductSpotlight #SkinRoutine", feedback: "", versions: 1 },
  { id: 10, date: "2026-07-23", time: "2:00 PM", platform: "Facebook", type: "Photo", category: "Behind the Scenes", campaign: "Meet Luxe", title: "Behind the Studio", status: "Internal Review", caption: "The details behind a calm, elevated client experience.", cta: "Visit Luxe", hashtags: "#BehindTheScenes #LuxeStudio", feedback: "", versions: 1 },
  { id: 11, date: "2026-07-26", time: "10:00 AM", platform: "Instagram", type: "Carousel", category: "FAQ", campaign: "Client Questions", title: "FAQ: Sensitive Skin", status: "Idea", caption: "", cta: "", hashtags: "", feedback: "", versions: 0 },
  { id: 12, date: "2026-07-29", time: "6:30 PM", platform: "Facebook", type: "Graphic", category: "Promotion", campaign: "August Preview", title: "August Waitlist", status: "Paused", caption: "Join the August priority list for first access to new appointment times.", cta: "Join the waitlist", hashtags: "#AugustBeauty #LuxeWaitlist", feedback: "Waiting on final launch date.", versions: 1 },
];

const initialState = {
  posts: samplePosts,
  onboarding: { completed: true, step: 7, values: { fullName: "Client", businessName: "The Luxe Beauty Studio", email: "client@luxebeautystudio.com", phone: "(215) 555-0182", website: "https://luxebeautystudio.example", industry: "Beauty and wellness", location: "Philadelphia, PA", years: "6", description: "A premium skincare studio focused on personalized facial treatments and long-term skin health.", services: "Signature facials, acne consultations, hydration treatments, retail skincare", goals: "Increase qualified bookings, build authority, and create a consistent luxury brand presence.", instagram: "@theluxebeautystudio", facebook: "The Luxe Beauty Studio", platforms: "Instagram, Facebook", audience: "Professional women ages 28–48 in Greater Philadelphia who value expert skincare and premium service.", voice: "Luxurious, educational, friendly", colors: "#181A17, #C9FF46, #F2EEDF", signature: "Client", signedDate: "2026-06-24" } },
  assets: [
    { id: 1, folder: "Logos", name: "luxe-primary-logo.png", type: "PNG", size: "1.8 MB", date: "Jun 24, 2026", owner: "Client" },
    { id: 2, folder: "Brand Guidelines", name: "Luxe-Brand-Guide.pdf", type: "PDF", size: "4.2 MB", date: "Jun 24, 2026", owner: "Admin" },
    { id: 3, folder: "Photos", name: "treatment-room-01.jpg", type: "JPG", size: "3.6 MB", date: "Jun 26, 2026", owner: "Client" },
    { id: 4, folder: "Photos", name: "client-headshot.jpg", type: "JPG", size: "2.1 MB", date: "Jun 26, 2026", owner: "Client" },
    { id: 5, folder: "Testimonials", name: "client-review-june.txt", type: "TXT", size: "8 KB", date: "Jul 2, 2026", owner: "Admin" },
    { id: 6, folder: "Offers and Promotions", name: "july-facial-offer.pdf", type: "PDF", size: "740 KB", date: "Jul 3, 2026", owner: "Admin" },
  ],
  requests: [{ id: "OWY-2026-1042", title: "Promote weekend opening", category: "Schedule change", priority: "High", due: "2026-07-15", platform: "Instagram", status: "In Progress", description: "Please promote the two newly available Saturday appointments.", created: "Jul 9, 2026" }],
  messages: [
    { id: 1, from: "Jordan Lee", role: "Account Manager", text: "Your July approval batch is ready. Three posts are waiting for your review.", time: "Yesterday, 4:18 PM" },
    { id: 2, from: "Client", role: "Client", text: "Thank you. I reviewed the first two and left one revision note on the skin-signals carousel.", time: "Today, 9:12 AM" },
  ],
  notifications: { approval: true, revision: true, approved: false, scheduled: true, published: false, message: true, request: true, report: true, payment: true, failed: true, onboarding: false, email: true },
};

const clientNav = ["Dashboard", "Onboarding", "Content", "Brand Library", "Requests", "Messages", "Analytics", "Billing", "Notifications"];
const adminNav = ["Admin Dashboard", "Clients", "Content", "Create Content", "Brand Library", "Requests", "Messages", "Analytics", "Billing", "Notifications"];
const folders = ["Logos", "Brand Guidelines", "Photos", "Videos", "Testimonials", "Product Information", "Offers and Promotions", "Previous Content", "Other Files"];

function loadState() {
  try { return { ...initialState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return initialState; }
}

function persist(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function cx(...classes) { return classes.filter(Boolean).join(" "); }

function Button({ children, variant = "primary", className = "", type = "button", onClick, disabled = false }) {
  return <button type={type} className={cx("btn", `btn-${variant}`, className)} onClick={onClick} disabled={disabled}>{children}</button>;
}

function Status({ children }) {
  const key = String(children).toLowerCase().replaceAll(" ", "-");
  return <span className={cx("status-pill", `status-${key}`)}>{children}</span>;
}

function Card({ children, className = "" }) { return <section className={cx("card", className)}>{children}</section>; }

function IntegrationNotice({ service, children }) {
  return <div className="integration-note"><strong>{service} connection required</strong><span>{children}</span></div>;
}

function Login({ recoveryMode, clearRecovery, authCallbackError }) {
  const [mode, setMode] = useState(recoveryMode ? "update" : "signin");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(() => authCallbackError
    ? authCallbackError.code === "otp_expired"
      ? "That verification link is invalid or has expired. Enter your email below and send a new link."
      : authCallbackError.description
    : "");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (recoveryMode) setMode("update"); }, [recoveryMode]);

  const changeMode = (next) => {
    setMode(next); setError(""); setNotice(""); setPassword(""); setConfirmPassword("");
  };

  const resendVerification = async () => {
    setError(""); setNotice("");
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("Enter the email address used to create the account."); return; }
    setLoading(true);
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: { emailRedirectTo: PORTAL_URL },
    });
    setLoading(false);
    if (resendError) { setError(resendError.message); return; }
    setNotice("A fresh verification link was sent. Use the newest email and open it within the allowed time.");
  };

  const submit = async (e) => {
    e.preventDefault(); setError(""); setNotice("");
    if (mode !== "update" && !/^\S+@\S+\.\S+$/.test(email)) { setError("Enter a valid email address."); return; }
    if (mode === "reset") {
      setLoading(true);
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: PORTAL_URL });
      setLoading(false);
      if (resetError) { setError(resetError.message); return; }
      setNotice("Password reset link sent. Check your email to continue.");
      return;
    }
    if (password.length < 8) { setError("Use a password with at least eight characters."); return; }
    if ((mode === "signup" || mode === "update") && password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (mode === "signup" && (!fullName.trim() || !businessName.trim())) { setError("Your name and business name are required."); return; }
    if (mode === "signup" && !terms) { setError("Confirm that you agree to the portal terms and privacy policy."); return; }

    setLoading(true);
    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: PORTAL_URL,
          data: { full_name: fullName.trim(), business_name: businessName.trim() },
        },
      });
      setLoading(false);
      if (signUpError) { setError(signUpError.message); return; }
      if (!data.session) setNotice("Account created. Check your email and click the verification link before signing in.");
      return;
    }
    if (mode === "update") {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      setLoading(false);
      if (updateError) { setError(updateError.message); return; }
      setNotice("Password updated. You can now continue to your portal.");
      clearRecovery();
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (signInError) setError("Unable to sign in. Check your email, password, and email verification status.");
  };

  const title = mode === "signup" ? "Create your client account" : mode === "reset" ? "Reset your password" : mode === "update" ? "Choose a new password" : "Sign in to your portal";
  const intro = mode === "signup" ? "Use your business email to open your secure Own Your Web workspace." : mode === "reset" ? "We will email you a secure password-reset link." : mode === "update" ? "Enter a new password for your Own Your Web account." : "Access your private client workspace.";
  return <main className="auth-shell">
    <div className="auth-brand"><span className="brand-seal">OYM</span><div><b>OWNYOURWEB</b><small>Client Portal</small></div></div>
    <section className="auth-panel">
      <div className="auth-copy"><p className="overline">AI-powered client operations</p><h1>Everything your brand needs, in one clear workspace.</h1><p>Review content, share feedback, track requests, and understand performance without chasing email threads.</p><div className="auth-proof"><span>Content approvals</span><span>Private collaboration</span><span>Monthly reporting</span></div></div>
      <form className="login-card" onSubmit={submit} noValidate>
        <div className="demo-flag">Secure client access</div>
        <h2>{title}</h2><p className="muted">{intro}</p>
        {mode !== "reset" && mode !== "update" && <div className="role-switch auth-switch" aria-label="Choose authentication action"><button type="button" className={mode === "signin" ? "active" : ""} onClick={() => changeMode("signin")}>Sign in</button><button type="button" className={mode === "signup" ? "active" : ""} onClick={() => changeMode("signup")}>Create account</button></div>}
        {mode === "signup" && <><label>Full name<input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" /></label><label>Business name<input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} autoComplete="organization" /></label></>}
        {mode !== "update" && <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>}
        {mode !== "reset" && <label>{mode === "update" ? "New password" : "Password"}<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} /></label>}
        {(mode === "signup" || mode === "update") && <label>Confirm password<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" /></label>}
        {mode === "signup" && <label className="check auth-consent"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /> I agree to use this private portal for my Own Your Web client account.</label>}
        {mode === "signin" && <div className="login-options"><span className="auth-security">Encrypted session</span><button type="button" className="text-button" onClick={() => changeMode("reset")}>Forgot password?</button></div>}
        {error && <p className="form-error" role="alert">{error}</p>}
        {notice && <p className="auth-success" role="status">{notice}</p>}
        <Button type="submit" className="full" disabled={loading}>{loading ? <><span className="spinner" /> Working…</> : mode === "signup" ? "Create client account" : mode === "reset" ? "Send reset link" : mode === "update" ? "Update password" : "Sign in securely"}</Button>
        {(mode === "signin" || mode === "signup") && <div className="auth-links"><button type="button" className="text-button" onClick={resendVerification} disabled={loading}>Resend verification email</button></div>}
        {(mode === "reset" || mode === "update") && <div className="auth-links"><button type="button" className="text-button" onClick={() => { clearRecovery(); changeMode("signin"); }}>Back to sign in</button></div>}
        <div className="integration-note"><strong>Email verification enabled</strong><span>New accounts must verify their email before accessing the private workspace. Administrator access is assigned separately and cannot be selected during registration.</span></div>
      </form>
    </section>
  </main>;
}

function Sidebar({ role, profile, page, setPage, open, setOpen, logout }) {
  const nav = role === "client" ? clientNav : adminNav;
  const displayName = profile?.full_name || (role === "client" ? "Client" : "Administrator");
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "CL";
  return <aside className={cx("sidebar", open && "open")}>
    <div className="side-brand"><span className="brand-seal">OYM</span><div><b>OWNYOURWEB</b><small>Client Portal</small></div></div>
    <nav aria-label="Portal navigation">{nav.map((item) => <button key={item} className={page === item ? "active" : ""} onClick={() => { setPage(item); setOpen(false); }}><span className="nav-mark" />{item}{item === "Messages" && <span className="nav-count">1</span>}{item === "Content" && role === "client" && <span className="nav-count">3</span>}</button>)}</nav>
    <div className="sidebar-foot"><div className="role-card"><span>{initials}</span><div><b>{displayName}</b><small>{role === "client" ? "Client account" : "Administrator"}</small></div></div><button className="logout" onClick={logout}>Secure logout</button></div>
  </aside>;
}

function Topbar({ page, role, profile, setOpen, notify }) {
  return <header className="topbar"><button className="menu-button" onClick={() => setOpen((v) => !v)} aria-label="Open navigation">Menu</button><div><p className="breadcrumb">{role === "client" ? (profile?.business_name || "Client workspace") : "Administrator workspace"}</p><h2>{page}</h2></div><div className="top-actions"><span className="demo-chip">Secure portal</span><button className="notification-button" onClick={() => notify("You have three content approvals and one unread message.")}>Notifications <b>4</b></button></div></header>;
}

function Metric({ label, value, note }) { return <Card className="metric-card"><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</Card>; }

function ProgressTracker() {
  const stages = ["Strategy", "Content Creation", "Client Review", "Revisions", "Approved", "Scheduled", "Published"];
  return <Card><div className="card-head"><div><p className="overline">July production</p><h3>Content progress</h3></div><Status>Client Review</Status></div><div className="progress-track">{stages.map((stage, i) => <div className={i < 3 ? "done" : i === 3 ? "current" : ""} key={stage}><span>{i + 1}</span><small>{stage}</small></div>)}</div></Card>;
}

function ClientDashboard({ state, setPage, profile }) {
  const awaiting = state.posts.filter((p) => p.status === "Awaiting Client Approval").length;
  const revisions = state.posts.filter((p) => p.status === "Revision Requested").length;
  const firstName = profile?.full_name?.trim().split(/\s+/)[0] || "Client";
  const businessName = profile?.business_name || "Your business";
  return <div className="page-stack"><section className="welcome"><div><p className="overline">Client workspace</p><h1>Welcome back, {firstName}.</h1><p>{businessName} · Current content cycle</p></div><div className="subscription"><span>Subscription</span><b>Active · $250/month</b><small>Manage details in Billing</small></div></section>
    <div className="metric-grid"><Metric label="Posts planned" value="12" note="Instagram + Facebook"/><Metric label="Awaiting approval" value={awaiting} note="Your review is needed"/><Metric label="Revision requests" value={revisions} note="One round in progress"/><Metric label="Onboarding" value="100%" note="Profile complete"/></div>
    <Card className="action-card"><div><p className="overline">Recommended next step</p><h3>Three posts are ready for your approval.</h3><p>Review the July batch by Monday to keep the publishing schedule on track.</p></div><div className="action-buttons"><Button onClick={() => setPage("Content")}>Review content</Button><Button variant="secondary" onClick={() => setPage("Messages")}>Message your manager</Button></div></Card>
    <div className="dashboard-grid"><ProgressTracker/><Card><div className="card-head"><div><p className="overline">Latest activity</p><h3>Workspace updates</h3></div><button className="text-button" onClick={() => setPage("Messages")}>Open messages</button></div><div className="activity-list"><article><span>JL</span><div><b>Jordan sent a message</b><p>“Your July approval batch is ready…”</p><small>Yesterday at 4:18 PM</small></div></article><article><span>R</span><div><b>Monthly report available</b><p>June performance report</p><small>July 2 at 10:30 AM</small></div></article><article><span>$</span><div><b>Invoice paid</b><p>$250 · July subscription</p><small>July 1 at 8:05 AM</small></div></article></div></Card></div>
    <Card><div className="card-head"><div><p className="overline">Quick actions</p><h3>Keep your account moving</h3></div></div><div className="quick-grid"><button onClick={() => setPage("Onboarding")}><b>Review onboarding</b><span>Update business and brand details</span></button><button onClick={() => setPage("Brand Library")}><b>Upload brand assets</b><span>Add photos, logos, or offers</span></button><button onClick={() => setPage("Requests")}><b>Submit a request</b><span>Share an event, idea, or update</span></button><button onClick={() => setPage("Analytics")}><b>View monthly report</b><span>See June performance</span></button></div></Card>
  </div>;
}

const onboardingSteps = [
  { title: "Business Information", fields: [["fullName","Full name"],["businessName","Business name"],["email","Email address","email"],["phone","Phone number","tel"],["website","Website","url"],["industry","Industry"],["location","Business location"],["years","Years in business","number"],["description","Business description","textarea"],["services","Products or services","textarea"],["goals","Main business goals","textarea"]] },
  { title: "Social Media Accounts", fields: [["instagram","Instagram username"],["facebook","Facebook page"],["tiktok","TikTok username"],["linkedin","LinkedIn page"],["otherPlatforms","Other platforms"],["followers","Current follower counts"],["platforms","Two managed platforms"],["postingDays","Preferred posting days"],["postingTimes","Preferred posting times"]] },
  { title: "Target Audience", fields: [["audience","Ideal customer","textarea"],["ageRange","Customer age range"],["customerLocation","Customer location"],["interests","Customer interests","textarea"],["needs","Customer needs or problems","textarea"],["whyChoose","Why customers choose you","textarea"],["primaryCta","Primary call to action"]] },
  { title: "Brand Voice", fields: [["voice","Preferred voice (professional, friendly, educational, bold, luxurious, or other)","textarea"],["useWords","Words or phrases to use","textarea"],["avoidWords","Words or topics to avoid","textarea"],["emojiPreference","Emoji preference"],["preferredCtas","Preferred calls to action","textarea"],["admiredBrands","Example accounts or brands","textarea"]] },
  { title: "Visual Branding", fields: [["colors","Brand color hex codes"],["visualInstructions","Additional visual instructions","textarea"]], uploads: true },
  { title: "Content Preferences", fields: [["topics","Content topics","textarea"],["educational","Educational themes","textarea"],["promotional","Promotional themes","textarea"],["faqs","Frequently asked questions","textarea"],["offers","Current offers","textarea"],["launches","Upcoming launches","textarea"],["importantDates","Important dates"],["testimonials","Testimonials","textarea"],["prohibited","Content not to post","textarea"],["inspiration","Competitor or inspiration links","textarea"]] },
  { title: "Final Agreement", agreement: true, fields: [["signature","Electronic signature"],["signedDate","Date","date"]] },
];

function Onboarding({ state, updateState, notify }) {
  const [step, setStep] = useState(state.onboarding.step || 1);
  const [values, setValues] = useState(state.onboarding.values || {});
  const current = onboardingSteps[step - 1];
  const save = (nextStep = step) => { const onboarding = { completed: nextStep === 7, step: nextStep, values }; updateState({ ...state, onboarding }); notify("Onboarding answers saved."); };
  const field = ([name,label,type="text"]) => <label key={name} className={type === "textarea" ? "field-wide" : ""}>{label}{type === "textarea" ? <textarea value={values[name] || ""} onChange={(e) => setValues({ ...values, [name]: e.target.value })}/> : <input type={type} value={values[name] || ""} onChange={(e) => setValues({ ...values, [name]: e.target.value })}/>}</label>;
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">Profile setup</p><h1>Client onboarding</h1><p>Your completed profile powers strategy, content guidance, and approvals.</p></div><Status>{state.onboarding.completed ? "Completed" : "In Progress"}</Status></section>
    <div className="onboarding-layout"><aside className="step-nav">{onboardingSteps.map((s,i) => <button className={step === i + 1 ? "active" : ""} key={s.title} onClick={() => setStep(i+1)}><span>{i+1}</span><div><b>{s.title}</b><small>{i < 6 || state.onboarding.completed ? "Saved" : "Final step"}</small></div></button>)}</aside>
      <Card className="form-card"><div className="form-progress"><span>Step {step} of 7</span><div><i style={{width:`${step/7*100}%`}}/></div></div><h2>{current.title}</h2>
        {step === 2 && <IntegrationNotice service="Secure social access">Never enter social passwords here. Production access should use Meta Business Manager partner access or platform OAuth.</IntegrationNotice>}
        <div className="form-grid">{current.fields.map(field)}{current.uploads && <><label>Primary logo<input type="file" accept=".png,.jpg,.jpeg,.svg" /></label><label>Brand guide<input type="file" accept=".pdf" /></label><label>Professional photographs<input type="file" accept="image/*" multiple /></label><label>Videos<input type="file" accept="video/mp4,video/quicktime" multiple /></label></>}{current.agreement && <div className="agreement field-wide">{["Information is accurate","I understand the approval process","I understand the revision policy","I understand late approvals may delay posting","I agree to the service terms"].map((x) => <label className="check" key={x}><input type="checkbox" defaultChecked /> {x}</label>)}</div>}</div>
        <p className="autosave">Changes are saved to this demonstration browser automatically when you continue.</p><div className="form-actions"><Button variant="secondary" disabled={step === 1} onClick={() => setStep(step-1)}>Back</Button>{step < 7 ? <Button onClick={() => { save(step+1); setStep(step+1); }}>Save and continue</Button> : <Button onClick={() => save(7)}>Confirm profile</Button>}</div>
      </Card></div>
  </div>;
}

function Content({ state, updateState, notify }) {
  const [view, setView] = useState("list");
  const [status, setStatus] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [type, setType] = useState("All");
  const [campaign, setCampaign] = useState("All");
  const [selected, setSelected] = useState(null);
  const [revision, setRevision] = useState("");
  const posts = state.posts.filter((p) => (status === "All" || p.status === status) && (platform === "All" || p.platform === platform) && (type === "All" || p.type === type) && (campaign === "All" || p.campaign === campaign));
  const setPostStatus = (id, next, feedback="") => { updateState({ ...state, posts: state.posts.map((p) => p.id === id ? { ...p, status: next, feedback: feedback || p.feedback, versions: next === "Revision Requested" ? p.versions + 1 : p.versions } : p) }); notify(`Content marked ${next.toLowerCase()}.`); setSelected(null); setRevision(""); };
  const approveAll = () => { updateState({ ...state, posts: state.posts.map((p) => p.status === "Awaiting Client Approval" ? { ...p, status: "Approved" } : p) }); notify("All ready content approved."); };
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">July 2026</p><h1>Content calendar</h1><p>Review the full monthly plan, leave comments, and approve content.</p></div><Button onClick={approveAll}>Approve all ready content</Button></section>
    <div className="filterbar"><div className="segmented"><button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button><button className={view === "calendar" ? "active" : ""} onClick={() => setView("calendar")}>Calendar</button></div><select aria-label="Month"><option>July 2026</option></select><select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option>{[...new Set(state.posts.map((p) => p.status))].map((x)=><option key={x}>{x}</option>)}</select><select aria-label="Platform" value={platform} onChange={(e)=>setPlatform(e.target.value)}><option>All</option><option>Instagram</option><option>Facebook</option></select><select aria-label="Content type" value={type} onChange={(e)=>setType(e.target.value)}><option>All</option>{[...new Set(state.posts.map((p)=>p.type))].map(x=><option key={x}>{x}</option>)}</select><select aria-label="Campaign" value={campaign} onChange={(e)=>setCampaign(e.target.value)}><option>All</option>{[...new Set(state.posts.map((p)=>p.campaign))].map(x=><option key={x}>{x}</option>)}</select></div>
    <div className="revision-policy">Your package includes one revision round per content batch. Additional revisions or new concepts may require an added fee.</div>
    {view === "list" ? <div className="content-list">{posts.length ? posts.map((p) => <article key={p.id} className="content-row"><div className="date-box"><b>{new Date(`${p.date}T12:00:00`).toLocaleDateString("en-US",{day:"2-digit"})}</b><span>{new Date(`${p.date}T12:00:00`).toLocaleDateString("en-US",{month:"short"})}</span></div><div className="post-preview"><span>{p.platform.slice(0,2).toUpperCase()}</span><div><b>{p.title}</b><small>{p.type} · {p.category} · {p.time}</small></div></div><Status>{p.status}</Status><Button variant="secondary" onClick={() => setSelected(p)}>Open content</Button></article>) : <div className="empty-state"><b>No content matches these filters</b><p>Reset one or more filters to see the calendar.</p></div>}</div> : <div className="calendar-grid">{Array.from({length:31},(_,i)=>i+1).map((day) => { const items = posts.filter((p)=>Number(p.date.slice(-2))===day); return <div key={day} className="calendar-day"><span>{day}</span>{items.map((p)=><button key={p.id} onClick={() => setSelected(p)}><b>{p.platform.slice(0,2)}</b>{p.title}</button>)}</div>})}</div>}
    {selected && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}><article className="content-modal"><div className="modal-head"><div><p className="overline">{selected.platform} · {selected.type}</p><h2>{selected.title}</h2></div><button className="close" onClick={() => setSelected(null)}>Close</button></div><div className="content-detail"><div className="media-preview"><span>{selected.type}</span><strong>{selected.title}</strong><small>Media preview placeholder</small></div><div className="detail-copy"><Status>{selected.status}</Status><dl><div><dt>Publish</dt><dd>{selected.date} at {selected.time}</dd></div><div><dt>Campaign</dt><dd>{selected.campaign}</dd></div><div><dt>Caption</dt><dd>{selected.caption || "Draft caption not yet available."}</dd></div><div><dt>Keywords</dt><dd>{selected.hashtags || "Not added"}</dd></div><div><dt>Call to action</dt><dd>{selected.cta || "Not added"}</dd></div><div><dt>Revision history</dt><dd>{selected.versions} version{selected.versions === 1 ? "" : "s"}</dd></div><div><dt>Original submission</dt><dd>Jordan Lee · Jul 8, 2026 at 2:30 PM</dd></div><div><dt>Latest action</dt><dd>{selected.feedback ? "Client · Jul 10, 2026 at 9:12 AM" : "Awaiting client action"}</dd></div></dl></div></div>{selected.feedback && <div className="feedback"><b>Latest feedback</b><p>{selected.feedback}</p></div>}<label>Comment or required revision<textarea value={revision} onChange={(e)=>setRevision(e.target.value)} placeholder="Be specific about the change you need…" /></label><div className="modal-actions"><Button variant="secondary" disabled={!revision.trim()} onClick={() => { setPostStatus(selected.id,selected.status,revision); notify("Comment saved to this content item."); }}>Leave comment</Button><Button variant="danger" disabled={!revision.trim()} onClick={() => setPostStatus(selected.id,"Revision Requested",revision)}>Request revision</Button><Button onClick={() => setPostStatus(selected.id,"Approved")}>Approve content</Button></div></article></div>}
  </div>;
}

function BrandLibrary({ state, updateState, notify, role }) {
  const [folder, setFolder] = useState("All Files");
  const files = folder === "All Files" ? state.assets : state.assets.filter((a)=>a.folder===folder);
  const upload = (e) => { const newFiles = [...e.target.files].map((f,i)=>({id:Date.now()+i,folder:folder === "All Files" ? "Other Files" : folder,name:f.name,type:f.name.split(".").pop().toUpperCase(),size:`${Math.max(.1,f.size/1024/1024).toFixed(1)} MB`,date:"Today",owner:role === "client" ? "Client" : "Admin"})); updateState({...state,assets:[...state.assets,...newFiles]}); notify(`${newFiles.length} file${newFiles.length===1?"":"s"} added to the demonstration library.`); e.target.value=""; };
  const rename=(file)=>{const name=window.prompt("Rename file",file.name);if(name?.trim()){updateState({...state,assets:state.assets.map(a=>a.id===file.id?{...a,name:name.trim()}:a)});notify("File renamed.");}};
  const remove=(file)=>{if(file.owner==="Admin"&&role==="client"){notify("Administrator-created files require an administrator deletion request.");return;}if(window.confirm(`Delete ${file.name}? This action cannot be undone in the demonstration.`)){updateState({...state,assets:state.assets.filter(a=>a.id!==file.id)});notify("File removed.");}};
  const download=(file)=>{downloadFile(`${file.name}.details.txt`,`${file.name}\nFolder: ${file.folder}\nType: ${file.type}\nSize: ${file.size}\nUploaded: ${file.date}`);notify("File details downloaded.");};
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">Shared workspace</p><h1>Brand library</h1><p>Organize approved logos, photography, offers, and reference material.</p></div><label className="btn btn-primary upload-button">Upload files<input type="file" multiple accept="image/*,video/mp4,application/pdf,.txt,.doc,.docx" onChange={upload}/></label></section><IntegrationNotice service="Cloud file storage">Production uploads require private object storage, signed URLs, malware scanning, file-type validation, and a 25 MB file limit.</IntegrationNotice><div className="library-layout"><aside className="folder-list"><button className={folder === "All Files" ? "active":""} onClick={()=>setFolder("All Files")}>All Files <span>{state.assets.length}</span></button>{folders.map((f)=><button className={folder===f?"active":""} key={f} onClick={()=>setFolder(f)}>{f}<span>{state.assets.filter((a)=>a.folder===f).length}</span></button>)}</aside><div className="file-grid">{files.length ? files.map((file)=><Card className="file-card" key={file.id}><div className="file-icon">{file.type}</div><h3>{file.name}</h3><p>{file.folder}</p><div><span>{file.size}</span><span>{file.date}</span></div><div className="file-actions"><button onClick={()=>notify(`${file.name} · ${file.type} · ${file.size} · uploaded ${file.date}`)}>Details</button><button onClick={()=>download(file)}>Download</button><button onClick={()=>rename(file)}>Rename</button><button onClick={()=>remove(file)}>{file.owner==="Admin"&&role==="client"?"Request deletion":"Delete"}</button></div>{file.owner === "Admin" && role === "client" && <small className="protected-file">Admin-managed · deletion protected</small>}</Card>) : <div className="empty-state"><b>No files in this folder</b><p>Upload a file or choose another folder.</p></div>}</div></div></div>;
}

function Requests({ state, updateState, notify, role }) {
  const [show, setShow] = useState(false); const [form, setForm] = useState({title:"",category:"New promotion",priority:"Normal",due:"",platform:"Instagram",description:""});
  const submit=(e)=>{e.preventDefault(); if(!form.title.trim()||!form.description.trim()){notify("Add a title and description before submitting.","error");return;} const id=`OWY-2026-${Math.floor(1100+Math.random()*8000)}`; updateState({...state,requests:[{...form,id,status:"Submitted",created:"Today"},...state.requests]}); setShow(false); setForm({title:"",category:"New promotion",priority:"Normal",due:"",platform:"Instagram",description:""}); notify(`Request ${id} submitted successfully.`);};
  const updateRequest=(id,status)=>{updateState({...state,requests:state.requests.map(r=>r.id===id?{...r,status}:r)});notify(`Request ${id} updated to ${status}.`);};
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">Client support</p><h1>Requests</h1><p>Submit promotions, schedule changes, questions, and new content ideas.</p></div>{role==="client"&&<Button onClick={()=>setShow(true)}>Submit a request</Button>}</section><div className="request-list">{state.requests.map((r)=><Card key={r.id} className="request-card"><div><small>{r.id}</small><h3>{r.title}</h3><p>{r.category} · {r.platform} · Due {r.due || "Not specified"}</p></div><div>{role==="admin"?<select aria-label={`Status for ${r.id}`} value={r.status} onChange={(e)=>updateRequest(r.id,e.target.value)}>{["Submitted","Under Review","In Progress","Waiting for Client","Completed","Declined"].map(x=><option key={x}>{x}</option>)}</select>:<Status>{r.status}</Status>}<span className={cx("priority",`priority-${r.priority.toLowerCase()}`)}>{r.priority}</span></div><p>{r.description}</p><button className="text-button" onClick={()=>notify(`${r.id}: submitted ${r.created}; latest status ${r.status}.`)}>View activity</button></Card>)}</div>{show&&<div className="modal-backdrop"><form className="standard-modal" onSubmit={submit}><div className="modal-head"><div><p className="overline">New client request</p><h2>What does your business need?</h2></div><button type="button" className="close" onClick={()=>setShow(false)}>Close</button></div><div className="form-grid"><label>Request title<input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/></label><label>Category<select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>{["New promotion","Upcoming event","Content idea","Caption change","Graphic change","Schedule change","Account update","General question","Technical issue","Other"].map(x=><option key={x}>{x}</option>)}</select></label><label>Priority<select value={form.priority} onChange={(e)=>setForm({...form,priority:e.target.value})}><option>Low</option><option>Normal</option><option>High</option><option>Urgent</option></select></label><label>Requested completion date<input type="date" value={form.due} onChange={(e)=>setForm({...form,due:e.target.value})}/></label><label>Related platform<select value={form.platform} onChange={(e)=>setForm({...form,platform:e.target.value})}><option>Instagram</option><option>Facebook</option><option>Both platforms</option><option>Account-wide</option></select></label><label>Related content item<select><option>None</option>{state.posts.map(p=><option key={p.id}>{p.title}</option>)}</select></label><label className="field-wide">Description<textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></label><label className="field-wide">Attachments<input type="file" multiple /></label></div><div className="modal-actions"><Button variant="secondary" onClick={()=>setShow(false)}>Cancel</Button><Button type="submit">Submit request</Button></div></form></div>}</div>;
}

function Messages({ state, updateState, notify, role }) {
  const [text,setText]=useState(""); const [query,setQuery]=useState(""); const send=(e)=>{e.preventDefault(); if(!text.trim())return; updateState({...state,messages:[...state.messages,{id:Date.now(),from:role==="client"?"Client":"Avery Morgan",role:role==="client"?"Client":"Administrator",text,time:"Just now"}]});setText("");notify("Message sent in the demonstration conversation.");};
  const showJordan="Jordan Lee Account Manager".toLowerCase().includes(query.toLowerCase()); const showBilling="Billing Support".toLowerCase().includes(query.toLowerCase());
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">Private workspace</p><h1>Messages</h1><p>Direct communication between The Luxe Beauty Studio and the Own Your Web team.</p></div></section><IntegrationNotice service="Private messaging backend">Production conversations require authenticated database access, client-ID row policies, attachment scanning, and notification delivery.</IntegrationNotice><div className="message-layout"><Card className="threads"><label className="search-field">Search conversations<input placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)}/></label>{showJordan&&<button className="thread active" onClick={()=>notify("Jordan Lee conversation is already open.")}><span>JL</span><div><b>Jordan Lee</b><small>Account Manager · 1 unread</small></div></button>}{showBilling&&<button className="thread" onClick={()=>notify("Billing support thread opened.")}><span>BI</span><div><b>Billing Support</b><small>No unread messages</small></div></button>}{!showJordan&&!showBilling&&<div className="empty-state"><b>No conversations found</b></div>}</Card><Card className="conversation"><div className="conversation-head"><div><span>JL</span><div><b>Jordan Lee</b><small>Your account manager</small></div></div><Status>Online</Status></div><div className="messages">{state.messages.map((m)=><article className={m.role === (role === "client"?"Client":"Administrator") ? "mine":""} key={m.id}><div><b>{m.from}</b><p>{m.text}</p><small>{m.time}</small></div></article>)}</div><form className="composer" onSubmit={send}><textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a message…"/><div><label className="attachment">Attach file<input type="file"/></label><Button type="submit" disabled={!text.trim()}>Send message</Button></div></form></Card></div></div>;
}

function downloadFile(name, content, type="text/plain") { const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500); }

function Analytics({ notify, role }) {
  const metrics=[ ["Starting followers","2,418"],["Ending followers","2,557"],["Follower growth","+139"],["Reach","18,420"],["Impressions","27,891"],["Engagements","1,984"],["Engagement rate","7.1%"],["Profile visits","1,206"],["Website clicks","184"],["Leads / inquiries","27"] ];
  const report=()=>{downloadFile("own-your-web-june-report.html",`<!doctype html><title>Own Your Web Monthly Report</title><style>body{font-family:Arial;padding:48px;color:#181A17;background:#F2EEDF}h1{border-bottom:4px solid #C9FF46;padding-bottom:18px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.card{border:1px solid rgba(24,26,23,.16);padding:20px;background:#fff}</style><h1>OWNYOURWEB · June 2026 Report</h1><h2>The Luxe Beauty Studio</h2><div class="grid">${metrics.map(m=>`<div class="card"><b>${m[0]}</b><h2>${m[1]}</h2></div>`).join("")}</div><h2>Recommendation</h2><p>Continue education-led carousels and increase booking-focused story support around weekend availability.</p>`,`text/html`);notify("Monthly report downloaded.");};
  const enterMetrics=()=>{const month=window.prompt("Reporting month","July 2026");if(month)notify(`${month} manual analytics entry created.`);};
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">June 2026 report</p><h1>Analytics</h1><p>A clear view of visibility, engagement, and client action.</p></div><div className="action-buttons">{role==="admin"&&<Button variant="secondary" onClick={enterMetrics}>Enter monthly metrics</Button>}<Button onClick={report}>Download monthly report</Button></div></section><div className="analytics-grid">{metrics.map(([l,v])=><Metric key={l} label={l} value={v}/>)}</div><div className="chart-grid"><Card><div className="card-head"><div><p className="overline">Weekly trend</p><h3>Reach and engagement</h3></div><span className="legend"><i/>Reach <i/>Engagement</span></div><div className="bar-chart">{[54,72,64,89].map((v,i)=><div key={i}><span style={{height:`${v}%`}}/><i style={{height:`${v*.58}%`}}/><small>Week {i+1}</small></div>)}</div></Card><Card><div className="card-head"><div><p className="overline">Platform comparison</p><h3>Instagram leads performance</h3></div></div><div className="platform-bars"><div><span>Instagram</span><i><b style={{width:"78%"}}/></i><strong>78%</strong></div><div><span>Facebook</span><i><b style={{width:"52%"}}/></i><strong>52%</strong></div></div><div className="recommendation"><b>Monthly recommendation</b><p>Continue education-led carousels and add booking-focused story support around weekend availability.</p></div></Card></div><div className="performance-grid"><Card><p className="overline">Top-performing content</p><h3>The Hydration Myth</h3><p>4,812 reach · 9.4% engagement rate</p><Status>Top performer</Status></Card><Card><p className="overline">Lowest-performing content</p><h3>Weekend Availability</h3><p>1,108 reach · 3.2% engagement rate</p><Status>Needs Review</Status></Card></div><IntegrationNotice service="Analytics integrations">Administrators can enter metrics manually in this demo. Production imports should connect authorized Meta and platform APIs.</IntegrationNotice></div>;
}

function Billing({ notify }) {
  const receipt=()=>{downloadFile("OWY-INV-2026-0701.txt","OWN YOUR WEB SYSTEMS\nInvoice OWY-INV-2026-0701\nThe Luxe Beauty Studio\nAI-Powered Social Media Management\nPaid July 1, 2026\nTotal: $250.00\nPayment status: Paid");notify("Receipt downloaded.");};
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">Account billing</p><h1>Billing</h1><p>Plan details, invoices, receipts, and payment preferences.</p></div><Status>Active</Status></section><div className="billing-grid"><Card className="plan-card"><p className="overline">Current plan</p><h2>AI-Powered Social Media Management</h2><div className="plan-price">$250<small>/ month</small></div><dl><div><dt>Subscription</dt><dd>Active</dd></div><div><dt>Payment status</dt><dd>Paid</dd></div><div><dt>Next billing date</dt><dd>August 1, 2026</dd></div></dl><Button onClick={()=>notify("Stripe customer portal must be connected before payment methods can be changed.")}>Manage payment method</Button><button className="text-button danger-text" onClick={()=>notify("A cancellation request confirmation would be sent to billing support.")}>Request cancellation</button></Card><Card><div className="card-head"><div><p className="overline">Payment history</p><h3>Previous invoices</h3></div></div><div className="invoice"><span>Jul 1</span><div><b>OWY-INV-2026-0701</b><small>AI-Powered Social Media Management</small></div><strong>$250.00</strong><Status>Paid</Status><Button variant="secondary" onClick={receipt}>Receipt</Button></div></Card></div><IntegrationNotice service="Stripe-ready billing">Production billing requires Stripe Checkout or Billing Portal, webhook verification, and server-side subscription reconciliation. Raw card data must never enter this application.</IntegrationNotice></div>;
}

function Notifications({ state, updateState, notify }) {
  const labels={approval:"New content awaiting approval",revision:"Revision completed",approved:"Content approved",scheduled:"Post scheduled",published:"Post published",message:"New message",request:"Request status changed",report:"Monthly report available",payment:"Payment upcoming",failed:"Payment failed",onboarding:"Onboarding incomplete"};
  const toggle=(key)=>updateState({...state,notifications:{...state.notifications,[key]:!state.notifications[key]}});
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">Communication preferences</p><h1>Notifications</h1><p>Choose which account events should create in-app and email alerts.</p></div><Button onClick={()=>notify("Notification preferences saved.")}>Save preferences</Button></section><Card className="preference-card"><div className="preference-head"><div><h3>Email notifications</h3><p>Send enabled updates to client@luxebeautystudio.com</p></div><label className="switch"><input type="checkbox" checked={state.notifications.email} onChange={()=>toggle("email")}/><span/></label></div>{Object.entries(labels).map(([key,label])=><div className="preference" key={key}><div><b>{label}</b><small>In-app {state.notifications.email ? "and email" : "only"}</small></div><label className="switch"><input type="checkbox" checked={state.notifications[key]} onChange={()=>toggle(key)}/><span/></label></div>)}</Card></div>;
}

function AdminDashboard({ state, setPage }) {
  const stats=[["Active clients","12"],["New clients","2"],["Onboarding","3"],["Internal review","5"],["Client approval","9"],["Revision requests","4"],["Overdue approvals","2"],["Open requests",state.requests.length],["Unread messages","6"],["Upcoming payments","8"],["Failed payments","1"],["Scheduled this week","21"],["Published this month","46"]];
  return <div className="page-stack"><section className="welcome"><div><p className="overline">Operations overview</p><h1>Good morning, Avery.</h1><p>Here is what needs the team’s attention today.</p></div><Button onClick={()=>setPage("Create Content")}>Create content</Button></section><div className="admin-metrics">{stats.map(([l,v])=><Metric key={l} label={l} value={v}/>)}</div><div className="dashboard-grid"><Card><div className="card-head"><div><p className="overline">Priority queue</p><h3>Needs attention</h3></div></div><div className="priority-list"><button onClick={()=>setPage("Clients")}><span>2</span><div><b>Overdue approvals</b><small>Follow up before scheduling shifts</small></div></button><button onClick={()=>setPage("Requests")}><span>4</span><div><b>Revision requests</b><small>Two due within 24 hours</small></div></button><button onClick={()=>setPage("Billing")}><span>1</span><div><b>Failed payment</b><small>Client notification queued</small></div></button></div></Card><ProgressTracker/></div><ClientTable setPage={setPage}/></div>;
}

function ClientTable({ setPage }) {
  const [query,setQuery]=useState(""); const visible="Client The Luxe Beauty Studio Instagram Facebook Jordan Lee".toLowerCase().includes(query.toLowerCase());
  return <Card><div className="card-head"><div><p className="overline">Client portfolio</p><h3>Active clients</h3></div><label className="table-search">Search<input placeholder="Search clients" value={query} onChange={(e)=>setQuery(e.target.value)}/></label></div><div className="responsive-table"><table><thead><tr><th>Client</th><th>Platforms</th><th>Onboarding</th><th>Subscription</th><th>Content</th><th>Last activity</th><th>Next payment</th><th>Manager</th></tr></thead><tbody>{visible&&<tr onClick={()=>setPage("Clients")}><td><b>Client</b><small>The Luxe Beauty Studio</small></td><td>Instagram, Facebook</td><td><Status>Completed</Status></td><td><Status>Active</Status></td><td>3 awaiting approval</td><td>Today, 9:12 AM</td><td>Aug 1, 2026</td><td>Jordan Lee</td></tr>}</tbody></table>{!visible&&<div className="empty-state"><b>No clients match “{query}”</b></div>}</div></Card>;
}

function AdminClients({ notify, setPage }) {
  const [tab,setTab]=useState("Overview"); const tabs=["Overview","Onboarding Answers","Content Calendar","Approvals","Brand Assets","Requests","Messages","Analytics","Billing","Internal Notes","Activity History"];
  const route={"Onboarding Answers":"Onboarding","Content Calendar":"Content",Approvals:"Content","Brand Assets":"Brand Library",Requests:"Requests",Messages:"Messages",Analytics:"Analytics",Billing:"Billing"}[tab];
  return <div className="page-stack"><section className="client-profile-head"><div className="client-avatar">LB</div><div><p className="overline">Client profile</p><h1>The Luxe Beauty Studio</h1><p>Client · Instagram + Facebook · Jordan Lee</p></div><div className="profile-actions"><Status>Active</Status><Button variant="secondary" onClick={()=>notify("Client invitation link generated for secure email delivery.")}>Invite client</Button><Button onClick={()=>setPage("Messages")}>Send message</Button></div></section><div className="profile-tabs">{tabs.map(t=><button className={tab===t?"active":""} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><Card className="tab-content"><div className="card-head"><div><p className="overline">{tab}</p><h3>{tab === "Overview" ? "Account summary" : `${tab} workspace`}</h3></div></div>{tab==="Overview"?<div className="profile-overview"><dl><div><dt>Primary contact</dt><dd>Client</dd></div><div><dt>Plan</dt><dd>$250 monthly</dd></div><div><dt>Account manager</dt><dd>Jordan Lee</dd></div><div><dt>Managed platforms</dt><dd>Instagram, Facebook</dd></div><div><dt>Onboarding</dt><dd>100% completed</dd></div><div><dt>Next billing</dt><dd>August 1, 2026</dd></div></dl><div className="admin-actions"><Button variant="secondary" onClick={()=>notify("Account manager assignment updated in the demonstration audit log.")}>Assign manager</Button><Button variant="secondary" onClick={()=>notify("Client information changes saved.")}>Edit client</Button><Button variant="secondary" onClick={()=>setTab("Internal Notes")}>Add internal note</Button><Button variant="danger" onClick={()=>window.confirm("Pause The Luxe Beauty Studio account?")&&notify("Account paused in the demonstration.")}>Pause account</Button></div></div>:tab==="Internal Notes"?<div className="notes-panel"><textarea aria-label="Administrator internal note" placeholder="Visible only to administrators…"/><Button onClick={()=>notify("Private internal note saved.")}>Save internal note</Button></div>:tab==="Activity History"?<div className="activity-list"><article><span>A</span><div><b>Content approved</b><p>Client approved Summer Skin Reset.</p><small>Jul 10, 2026 · 9:12 AM</small></div></article><article><span>R</span><div><b>Revision requested</b><p>Skin Signals carousel · version 2</p><small>Jul 9, 2026 · 5:44 PM</small></div></article><article><span>$</span><div><b>Invoice payment received</b><p>OWY-INV-2026-0701 · $250</p><small>Jul 1, 2026 · 8:05 AM</small></div></article></div>:<div className="empty-state"><b>{tab} is connected to the operational workspace.</b><p>Open the full client-scoped view to manage this information.</p>{route&&<Button onClick={()=>setPage(route)}>Open {tab.toLowerCase()}</Button>}</div>}</Card></div>;
}

function CreateContent({ state, updateState, notify, modal }) {
  const [form,setForm]=useState({platform:"Instagram",date:"",time:"10:00",format:"Graphic",pillar:"Education",campaign:"July Glow",title:"",caption:"",hashtags:"",cta:"",deadline:"",status:"Idea",visibleNotes:"",internalNotes:""});
  const submit=(e)=>{e.preventDefault();if(!form.title||!form.date){notify("Post title and content date are required.","error");return;}const item={id:Date.now(),...form,category:form.pillar,type:form.format,feedback:"",versions:1};updateState({...state,posts:[...state.posts,item]});notify("Content item added to The Luxe Beauty Studio calendar.");setForm({...form,title:"",caption:"",hashtags:"",cta:""});};
  const f=(key)=>(e)=>setForm({...form,[key]:e.target.value});
  return <div className="page-stack"><section className="page-intro"><div><p className="overline">Administrator workflow</p><h1>Create content</h1><p>Add a post, prepare client-visible notes, and set the approval deadline.</p></div><Button variant="secondary" onClick={()=>modal("AI caption assistant", "Connect an approved AI provider to generate drafts from client brand data. Every output must remain in draft until administrator and client approval.")}>Open AI assistant</Button></section><form className="content-form" onSubmit={submit}><Card><div className="card-head"><div><p className="overline">Content details</p><h3>Calendar entry</h3></div></div><div className="form-grid"><label>Client<select><option>The Luxe Beauty Studio</option></select></label><label>Platform<select value={form.platform} onChange={f("platform")}><option>Instagram</option><option>Facebook</option><option>Both platforms</option></select></label><label>Content date<input type="date" value={form.date} onChange={f("date")}/></label><label>Content time<input type="time" value={form.time} onChange={f("time")}/></label><label>Content format<select value={form.format} onChange={f("format")}><option>Graphic</option><option>Carousel</option><option>Photo</option><option>Video</option></select></label><label>Content pillar<input value={form.pillar} onChange={f("pillar")}/></label><label>Campaign<input value={form.campaign} onChange={f("campaign")}/></label><label>Status<select value={form.status} onChange={f("status")}>{["Idea","In Production","Internal Review","Awaiting Client Approval","Revision Requested","Approved","Scheduled","Published","Paused"].map(x=><option key={x}>{x}</option>)}</select></label><label className="field-wide">Post title<input value={form.title} onChange={f("title")}/></label><label className="field-wide">Caption<textarea value={form.caption} onChange={f("caption")}/></label><label>Hashtags or keywords<input value={form.hashtags} onChange={f("hashtags")}/></label><label>Call to action<input value={form.cta} onChange={f("cta")}/></label><label>Approval deadline<input type="date" value={form.deadline} onChange={f("deadline")}/></label><label>Media upload<input type="file" accept="image/*,video/*"/></label><label className="field-wide">Client-visible notes<textarea value={form.visibleNotes} onChange={f("visibleNotes")}/></label><label className="field-wide">Internal notes<textarea value={form.internalNotes} onChange={f("internalNotes")}/></label></div></Card><aside><Card><p className="overline">AI assistance</p><h3>Human review required</h3><p>AI-generated captions, topics, keywords, and platform adaptations remain drafts until reviewed by an Own Your Web administrator.</p>{["Generate caption draft","Suggest content topics","Rewrite in brand voice","Recommend keywords","Adapt for Facebook"].map(x=><button type="button" className="ai-action" key={x} onClick={()=>modal(x,"Connect an AI provider and approved client context before enabling this tool.")}>{x}<span>Future integration</span></button>)}</Card><Button type="submit" className="full">Add to calendar</Button><Button variant="secondary" className="full" onClick={()=>notify("Duplicate-and-adapt workflow prepared for the selected platform.")}>Duplicate for another platform</Button></aside></form></div>;
}

function PortalLoading() {
  return <main className="auth-loading"><span className="brand-seal">OYM</span><div><b>Opening your secure workspace</b><small>Verifying your session…</small></div></main>;
}

function App() {
  const [state,setState]=useState(loadState);
  const [session,setSession]=useState(null);
  const [profile,setProfile]=useState(null);
  const [authReady,setAuthReady]=useState(false);
  const [profileReady,setProfileReady]=useState(false);
  const [recoveryMode,setRecoveryMode]=useState(false);
  const [page,setPage]=useState("Dashboard"); const [menuOpen,setMenuOpen]=useState(false); const [toast,setToast]=useState(null); const [modalData,setModalData]=useState(null);

  useEffect(()=>persist(state),[state]);
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") setRecoveryMode(true);
      setSession(nextSession);
      setAuthReady(true);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!session?.user) {
      setProfile(null); setProfileReady(true); setPage("Dashboard");
      return () => { mounted = false; };
    }
    setProfileReady(false);
    supabase.from("portal_profiles").select("id,email,full_name,business_name,role,account_status").eq("id", session.user.id).maybeSingle().then(({ data, error }) => {
      if (!mounted) return;
      const safeProfile = data || {
        id: session.user.id,
        email: session.user.email || "",
        full_name: session.user.user_metadata?.full_name || "Client",
        business_name: session.user.user_metadata?.business_name || "",
        role: "client",
        account_status: error ? "pending" : "active",
      };
      setProfile(safeProfile);
      setPage(safeProfile.role === "administrator" ? "Admin Dashboard" : "Dashboard");
      setProfileReady(true);
    });
    return () => { mounted = false; };
  }, [session?.user?.id]);

  const notify=(message,type="success")=>{setToast({message,type});setTimeout(()=>setToast(null),3200);};
  const modal=(title,text)=>setModalData({title,text});
  const logout=async()=>{await supabase.auth.signOut();setSession(null);setProfile(null);setPage("Dashboard");};
  if(!authReady || (session && !profileReady))return <PortalLoading/>;
  if(recoveryMode || !session)return <Login recoveryMode={recoveryMode} clearRecovery={()=>setRecoveryMode(false)} authCallbackError={AUTH_CALLBACK_ERROR}/>;
  if(profile?.account_status === "paused")return <main className="auth-loading"><span className="brand-seal">OYM</span><div><b>Account access is paused</b><small>Contact ownyourwebsmm@gmail.com for help.</small><Button onClick={logout}>Secure logout</Button></div></main>;
  if(profile?.account_status === "pending")return <main className="auth-loading"><span className="brand-seal">OYM</span><div><b>Your account is being prepared</b><small>Your email is verified. Contact Own Your Web if you need immediate access.</small><Button onClick={logout}>Secure logout</Button></div></main>;
  const role=profile?.role === "administrator" ? "admin" : "client";
  const pages={
    Dashboard:<ClientDashboard state={state} setPage={setPage} profile={profile}/>, Onboarding:<Onboarding state={state} updateState={setState} notify={notify}/>, Content:<Content state={state} updateState={setState} notify={notify}/>, "Brand Library":<BrandLibrary state={state} updateState={setState} notify={notify} role={role}/>, Requests:<Requests state={state} updateState={setState} notify={notify} role={role}/>, Messages:<Messages state={state} updateState={setState} notify={notify} role={role}/>, Analytics:<Analytics notify={notify} role={role}/>, Billing:<Billing notify={notify}/>, Notifications:<Notifications state={state} updateState={setState} notify={notify}/>, "Admin Dashboard":<AdminDashboard state={state} setPage={setPage}/>, Clients:<AdminClients notify={notify} setPage={setPage}/>, "Create Content":<CreateContent state={state} updateState={setState} notify={notify} modal={modal}/>
  };
  return <div className="app-shell"><Sidebar role={role} profile={profile} page={page} setPage={setPage} open={menuOpen} setOpen={setMenuOpen} logout={logout}/>{menuOpen&&<button className="mobile-scrim" aria-label="Close navigation" onClick={()=>setMenuOpen(false)}/>}<div className="main-shell"><Topbar page={page} role={role} profile={profile} setOpen={setMenuOpen} notify={notify}/><main className="page"><div className="page-view" key={page}>{pages[page] || <AdminDashboard state={state} setPage={setPage}/>}</div></main></div>{toast&&<div className={cx("toast",toast.type)} role="status"><span/>{toast.message}</div>}{modalData&&<InfoModal {...modalData} close={()=>setModalData(null)}/>}</div>;
}

function InfoModal({title,text,close}) { return <div className="modal-backdrop" onMouseDown={(e)=>e.target===e.currentTarget&&close()}><article className="info-modal"><p className="overline">Integration notice</p><h2>{title}</h2><p>{text}</p><Button onClick={close}>Understood</Button></article></div>; }

createRoot(document.getElementById("root")).render(<App/>);
