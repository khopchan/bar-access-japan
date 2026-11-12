"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter({
  kicker,
  title,
  body,
  emailLabel,
  submitLabel,
  errorLabel,
  thanksTitle,
  thanksBody,
}: {
  kicker: string;
  title: string;
  body: string;
  emailLabel: string;
  submitLabel: string;
  errorLabel: string;
  thanksTitle: string;
  thanksBody: string;
}) {
  const fieldId = useId();
  const errorId = useId();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!EMAIL.test(email)) {
      setError(errorLabel);
      setDone(false);
      return;
    }
    setError("");
    setDone(true);
    event.currentTarget.reset();
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-inner">
        <p className="kicker">{kicker}</p>
        <h2 id="newsletter-title">{title}</h2>
        <p>{body}</p>
        {done ? (
          <div className="form-status" role="status">
            <h3>{thanksTitle}</h3>
            <p>{thanksBody}</p>
          </div>
        ) : (
          <form className="newsletter-form" method="dialog" noValidate onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor={fieldId}>{emailLabel}</label>
              <input
                id={fieldId}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
              />
              {error ? (
                <p id={errorId} className="field-error" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
            <button type="submit" className="text-button">
              {submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
