'use server';

import { headers } from 'next/headers';
import { EMAIL } from '@/lib/content';
import { TOPICS, hasErrors, validateContact, type ContactValues } from '@/lib/contact';

export type SendContactResult = { ok: true } | { ok: false; reason: 'invalid' | 'rate-limited' | 'failed' };

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, number[]>();

// Prosty limit w pamięci procesu – wystarczy na jedną instancję. Przy wielu
// instancjach (np. serverless) przenieść do Redis/Upstash.
function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > RATE_LIMIT;
}

function normalize(input: ContactValues): ContactValues {
  const text = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max);
  return {
    topic: TOPICS.includes(input.topic) ? input.topic : 'Inne',
    name: text(input.name, 120),
    phone: text(input.phone, 30),
    email: text(input.email, 200),
    message: text(input.message, 5000),
    consent: input.consent === true,
  };
}

export async function sendContactMessage(input: ContactValues, honeypot: string): Promise<SendContactResult> {
  // Pole-pułapka wypełniają tylko boty – udajemy sukces, nic nie wysyłamy.
  if (honeypot) return { ok: true };

  const values = normalize(input);
  if (hasErrors(validateContact(values))) return { ok: false, reason: 'invalid' };

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) return { ok: false, reason: 'rate-limited' };

  const text = [
    `Sprawa: ${values.topic}`,
    `Imię i nazwisko: ${values.name}`,
    `Telefon: ${values.phone || '—'}`,
    `E-mail: ${values.email || '—'}`,
    '',
    values.message,
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[kontakt] Brak RESEND_API_KEY – wiadomość tylko w logu:\n' + text);
      return { ok: true };
    }
    console.error('[kontakt] Brak RESEND_API_KEY – nie można wysłać wiadomości.');
    return { ok: false, reason: 'failed' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? 'Kuracja24 <formularz@kuracja24.pl>',
        to: process.env.CONTACT_TO ?? EMAIL,
        reply_to: values.email || undefined,
        subject: `Formularz: ${values.topic} – ${values.name}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error('[kontakt] Resend odpowiedział', response.status, await response.text());
      return { ok: false, reason: 'failed' };
    }
    return { ok: true };
  } catch (error) {
    console.error('[kontakt] Błąd wysyłki', error);
    return { ok: false, reason: 'failed' };
  }
}
