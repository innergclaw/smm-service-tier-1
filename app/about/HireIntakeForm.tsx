"use client";

import { FormEvent } from "react";

const phoneNumber = "+12674730397";

export default function HireIntakeForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const message = [
      "NEW PROJECT INQUIRY",
      "",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Business / Project: ${form.get("project")}`,
      `Service needed: ${form.get("service")}`,
      `Budget: ${form.get("budget")}`,
      `Timeline: ${form.get("timeline")}`,
      "",
      `Project details: ${form.get("details")}`,
    ].join("\n");

    window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
  }

  return (
    <form className="hire-form" onSubmit={handleSubmit}>
      <div className="hire-form-grid">
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Best phone number</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
        </label>
        <label className="hire-form-wide">
          <span>Business or project name</span>
          <input name="project" type="text" required />
        </label>
        <label>
          <span>What do you need?</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Creative design</option>
            <option>Website design or development</option>
            <option>Brand identity</option>
            <option>Digital systems or automation</option>
            <option>Speaking, teaching, or consulting</option>
            <option>Something else</option>
          </select>
        </label>
        <label>
          <span>Estimated budget</span>
          <select name="budget" defaultValue="" required>
            <option value="" disabled>Select a range</option>
            <option>Under $500</option>
            <option>$500 - $1,000</option>
            <option>$1,000 - $2,500</option>
            <option>$2,500+</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="hire-form-wide">
          <span>Preferred timeline</span>
          <input name="timeline" type="text" placeholder="Example: Within 30 days" required />
        </label>
        <label className="hire-form-wide">
          <span>Tell me about the project</span>
          <textarea name="details" rows={6} required />
        </label>
      </div>

      <button className="positioning-cta hire-submit" type="submit">SEND PROJECT DETAILS</button>
      <p className="hire-form-note">Submitting opens a text to 267-473-0397 with your answers. Review it, then press send from your phone.</p>
    </form>
  );
}
