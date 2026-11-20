"use client";

import { useActionState } from "react";
import { submitNewsletter, type NewsletterState } from "@/server/actions";

const initialNewsletterState: NewsletterState = {
  status: "idle",
  message: "",
};

export function NewsletterForm() {
  const [state, action, pending] = useActionState(submitNewsletter, initialNewsletterState);

  return (
    <form action={action} className="mt-6" noValidate>
      <label className="field-label block" htmlFor="newsletter-email">
        Email address
      </label>
      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end">
        <input
          id="newsletter-email"
          className="field text-base"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@somewhere.far"
          required
          aria-invalid={state.status === "invalid"}
          aria-describedby="newsletter-note newsletter-status"
        />
        <button type="submit" className="btn-secondary shrink-0" disabled={pending}>
          {pending ? "Checking…" : "Check address"}
        </button>
      </div>
      <p id="newsletter-note" className="mt-4 text-sm leading-6 text-ink-soft">
        No mailing list is connected yet. A valid address is checked here and then discarded.
      </p>
      <p
        id="newsletter-status"
        role="status"
        className={`mt-3 text-sm leading-6 ${state.status === "invalid" ? "text-clay" : "text-ink"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
