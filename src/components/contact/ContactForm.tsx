"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/server/actions";

const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialContactState);

  return (
    <form action={action} className="mt-6 space-y-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" error={state.fieldErrors.name} />
        <Field label="Your email" name="email" type="email" autoComplete="email" error={state.fieldErrors.email} />
      </div>
      <Field label="Regarding" name="subject" error={state.fieldErrors.subject} />
      <label className="block">
        <span className="field-label">Message</span>
        <textarea
          className="field min-h-48 resize-y"
          name="message"
          required
          minLength={20}
          aria-invalid={Boolean(state.fieldErrors.message)}
          aria-describedby={state.fieldErrors.message ? "message-error" : undefined}
        />
        {state.fieldErrors.message ? (
          <span id="message-error" className="mt-1 block text-sm text-clay">
            {state.fieldErrors.message}
          </span>
        ) : null}
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Checking…" : "Check my message"} <span aria-hidden="true" className="arrow">→</span>
        </button>
        <p className="text-sm leading-6 text-ink-soft">Checks the form only. Nothing is delivered yet.</p>
      </div>
      {state.message ? (
        <p role="status" className="border-l-2 border-clay bg-paper px-4 py-3 text-sm leading-6 text-ink">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input
        className="field"
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <span id={errorId} className="mt-1 block text-sm text-clay">
          {error}
        </span>
      ) : null}
    </label>
  );
}
