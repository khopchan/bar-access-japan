"use client";

import { useEffect, useId, useState, type FormEvent } from "react";

export type ContactFormCopy = {
  emailAddress: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  submit: string;
  general: string;
  successTitle: string;
  successBody: string;
  mailto: string;
  back: string;
  subjectPrefix: string;
  errors: { name: string; email: string; message: string };
  topics: { id: string; label: string }[];
};

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const baseId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic");
    if (requested && copy.topics.some((item) => item.id === requested)) {
      setTopic(requested);
    }
  }, [copy.topics]);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length === 0) next.name = copy.errors.name;
    if (!EMAIL.test(email.trim())) next.email = copy.errors.email;
    if (message.trim().length === 0) next.message = copy.errors.message;
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (next.name || next.email || next.message) {
      setMailtoHref(null);
      const order: FieldName[] = ["name", "email", "message"];
      const first = order.find((field) => next[field]);
      if (first) {
        document.getElementById(`${baseId}-${first}`)?.focus();
      }
      return;
    }

    const topicLabel = copy.topics.find((item) => item.id === topic)?.label ?? copy.general;
    const body = [`Name: ${name.trim()}`, `Email: ${email.trim()}`, `Topic: ${topicLabel}`, "", message.trim()]
      .join("\n")
      .slice(0, 1500);
    const href = `mailto:${copy.emailAddress}?subject=${encodeURIComponent(`${copy.subjectPrefix} — ${topicLabel}`)}&body=${encodeURIComponent(body)}`;
    setMailtoHref(href);
  }

  if (mailtoHref) {
    return (
      <div className="form-status" role="status">
        <h2>{copy.successTitle}</h2>
        <p>{copy.successBody}</p>
        <p>
          <a className="text-link" href={mailtoHref}>
            {copy.mailto}
            <span aria-hidden="true"> →</span>
          </a>
        </p>
        <button type="button" className="text-button" onClick={() => setMailtoHref(null)}>
          {copy.back}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" method="dialog" noValidate onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor={`${baseId}-name`}>{copy.name}</label>
        <input
          id={`${baseId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name ? (
          <p id={`${baseId}-name-error`} className="field-error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor={`${baseId}-email`}>{copy.email}</label>
        <input
          id={`${baseId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email ? (
          <p id={`${baseId}-email-error`} className="field-error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label htmlFor={`${baseId}-topic`}>{copy.topic}</label>
        <select id={`${baseId}-topic`} name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
          <option value="general">{copy.general}</option>
          {copy.topics.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${baseId}-message`}>{copy.message}</label>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={6}
          value={message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
          onChange={(event) => setMessage(event.target.value)}
        />
        {errors.message ? (
          <p id={`${baseId}-message-error`} className="field-error" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>
      <button type="submit" className="text-button">
        {copy.submit}
      </button>
    </form>
  );
}
