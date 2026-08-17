"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <main className="inner-page dark-page">
      <header className="contact-hero">
        <p>06 / Contact</p><h1>Start<br />a project.</h1><p>Have a project that needs direction?<br />Share the essentials.</p>
      </header>
      <section className="contact-intro">
        <p>Before you write</p>
        <h2>Context helps.</h2>
        <p>Tell me what you are making, where the project stands and what kind of direction would be useful. Short and direct is perfect.</p>
      </section>
      <form className="contact-form" onSubmit={submit}>
        <label htmlFor="name">Name<input id="name" name="name" type="text" autoComplete="name" required /></label>
        <label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" required /></label>
        <label htmlFor="company">Company / Studio<input id="company" name="company" type="text" autoComplete="organization" /></label>
        <label htmlFor="project-type">Project type<select id="project-type" name="projectType" required defaultValue=""><option value="" disabled>Select one</option><option>Brand identity</option><option>Campaign</option><option>Digital experience</option><option>Creative direction</option><option>Other</option></select></label>
        <label htmlFor="budget">Budget<select id="budget" name="budget" required defaultValue=""><option value="" disabled>Select a range</option><option>R$ 5k — 15k</option><option>R$ 15k — 30k</option><option>R$ 30k+</option><option>Not defined yet</option></select></label>
        <label htmlFor="timeline">Timeline<input id="timeline" name="timeline" type="text" placeholder="When should it launch?" /></label>
        <label htmlFor="message">Message<textarea id="message" name="message" rows={6} required /></label>
        <button className="light-button" type="submit">Send inquiry →</button>
        <p className="form-note" role="status" aria-live="polite">{sent ? "Inquiry captured in demonstration mode. Email delivery will be connected before launch." : "Demonstration mode — this form does not send email yet."}</p>
      </form>
      <section className="contact-expectations">
        <p>What happens next</p>
        <div><span>01</span><strong>Project fit</strong><p>Review the context and scope.</p></div>
        <div><span>02</span><strong>Conversation</strong><p>Align goals, timing and working model.</p></div>
        <div><span>03</span><strong>Direction</strong><p>Define the right creative path.</p></div>
      </section>
    </main>
  );
}
