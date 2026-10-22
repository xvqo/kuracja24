'use client';

import { useState, type FormEvent } from 'react';
import { sendContactMessage, type SendContactResult } from '@/app/actions/contact';
import {
  EMPTY_CONTACT,
  TOPICS,
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/lib/contact';
import { PAGES, PHONE } from '@/lib/content';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'sent' | Extract<SendContactResult, { ok: false }>['reason'];

const STATUS_MESSAGES: Partial<Record<Status, string>> = {
  'rate-limited': `Wysłano zbyt wiele wiadomości. Spróbuj za kilka minut albo zadzwoń: ${PHONE}.`,
  invalid: 'Sprawdź pola formularza i spróbuj ponownie.',
  failed: `Nie udało się wysłać wiadomości. Spróbuj ponownie albo zadzwoń: ${PHONE}.`,
};

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const update = (patch: Partial<ContactValues>) => {
    const next = { ...values, ...patch };
    setValues(next);
    // Po pierwszej nieudanej próbie walidujemy na bieżąco, żeby błędy znikały w trakcie poprawiania.
    if (triedSubmit) setErrors(validateContact(next));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(values);
    if (hasErrors(found)) {
      setErrors(found);
      setTriedSubmit(true);
      return;
    }

    setStatus('sending');
    const honeypot = String(new FormData(event.currentTarget).get('company') ?? '');
    try {
      const result = await sendContactMessage(values, honeypot);
      setStatus(result.ok ? 'sent' : result.reason);
    } catch {
      setStatus('failed');
    }
  };

  const reset = () => {
    setValues(EMPTY_CONTACT);
    setErrors({});
    setTriedSubmit(false);
    setStatus('idle');
  };

  if (status === 'sent') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          ✓
        </span>
        <h3 className={styles.successTitle}>Dziękujemy, wiadomość wysłana.</h3>
        <p className="lead">
          Odpowiemy najszybciej, jak to możliwe. W pilnych sprawach zadzwoń do rejestracji: {PHONE}.
        </p>
        <button type="button" className={`btn btn--sm btn--outline ${styles.again}`} onClick={reset}>
          Wyślij kolejną wiadomość
        </button>
      </div>
    );
  }

  const sending = status === 'sending';
  const statusMessage = STATUS_MESSAGES[status];

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.heading}>
        <h3 className={styles.title}>Napisz do nas</h3>
        <p className={styles.subtitle}>Odpowiadamy w dni robocze. Wizytę najszybciej umówisz telefonicznie.</p>
      </div>

      <fieldset className={styles.topics}>
        <legend className={styles.label}>W jakiej sprawie?</legend>
        <div className={styles.topicList}>
          {TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className={styles.topic}
              aria-pressed={values.topic === topic}
              onClick={() => update({ topic })}
            >
              {topic}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <Field label="Imię i nazwisko" error={errors.name && 'Podaj imię i nazwisko'}>
          <input
            name="name"
            autoComplete="name"
            className={styles.input}
            value={values.name}
            aria-invalid={!!errors.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </Field>
        <Field label="Telefon" error={errors.phone && 'Podaj telefon lub e-mail'}>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="np. 600 100 200"
            className={`${styles.input} tabular`}
            value={values.phone}
            aria-invalid={!!errors.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />
        </Field>
      </div>

      <Field
        label={
          <>
            E-mail <span className={styles.optional}>(opcjonalnie)</span>
          </>
        }
        error={errors.email && 'Sprawdź adres e-mail'}
      >
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={styles.input}
          value={values.email}
          aria-invalid={!!errors.email}
          onChange={(e) => update({ email: e.target.value })}
        />
      </Field>

      <Field label="Wiadomość" error={errors.message && 'Napisz kilka słów'}>
        <textarea
          name="message"
          rows={5}
          placeholder="Opisz krótko, w czym możemy pomóc"
          className={`${styles.input} ${styles.textarea}`}
          value={values.message}
          aria-invalid={!!errors.message}
          onChange={(e) => update({ message: e.target.value })}
        />
      </Field>

      {/* Pole-pułapka na boty, niewidoczne dla ludzi */}
      <div className="visually-hidden" aria-hidden="true">
        <label>
          Firma
          <input name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <label className={styles.consent} data-invalid={!!errors.consent}>
        <input
          name="consent"
          type="checkbox"
          checked={values.consent}
          aria-invalid={!!errors.consent}
          onChange={(e) => update({ consent: e.target.checked })}
        />
        <span>
          Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na wiadomość, zgodnie z{' '}
          <a href={PAGES.privacy}>polityką prywatności</a>.
        </span>
      </label>

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn--lg btn--primary" disabled={sending} aria-busy={sending}>
          {sending ? 'Wysyłanie…' : 'Wyślij wiadomość'}
        </button>
        {statusMessage && (
          <p className={styles.formError} role="alert">
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: React.ReactNode;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
