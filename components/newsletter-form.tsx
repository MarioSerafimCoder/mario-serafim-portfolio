"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="newsletter">Email</label>
        <input id="newsletter" name="email" type="email" placeholder="you@email.com" required />
        <button type="submit">Subscribe →</button>
      </form>
      <small aria-live="polite">{submitted ? "Thank you. Signup is in demonstration mode for now." : "Interface preview only. Newsletter delivery will be connected before launch."}</small>
    </>
  );
}
