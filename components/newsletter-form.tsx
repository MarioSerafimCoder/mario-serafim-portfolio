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
        <button type="submit">Quero receber →</button>
      </form>
      <small aria-live="polite">{submitted ? "Obrigado. O cadastro está em modo de demonstração por enquanto." : "Prévia de interface: o envio da newsletter será conectado antes do lançamento."}</small>
    </>
  );
}
