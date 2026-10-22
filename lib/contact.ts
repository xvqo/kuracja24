export const TOPICS = ['Wizyta', 'Fizjoterapia', 'NFZ', 'Inne'] as const;
export type Topic = (typeof TOPICS)[number];

export type ContactValues = {
  topic: Topic;
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
};

export type ContactField = 'name' | 'phone' | 'email' | 'message' | 'consent';
export type ContactErrors = Partial<Record<ContactField, true>>;

export const EMPTY_CONTACT: ContactValues = {
  topic: 'Wizyta',
  name: '',
  phone: '',
  email: '',
  message: '',
  consent: false,
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Wspólna walidacja dla formularza (na żywo) i server action (ostatnie słowo). */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const email = values.email.trim();
  const phoneDigits = values.phone.replace(/\D/g, '');

  if (values.name.trim().length < 3) errors.name = true;
  if (!/^\d{9,11}$/.test(phoneDigits) && !email) errors.phone = true;
  if (email && !EMAIL_RE.test(email)) errors.email = true;
  if (values.message.trim().length < 5) errors.message = true;
  if (!values.consent) errors.consent = true;

  return errors;
}

export const hasErrors = (errors: ContactErrors) => Object.keys(errors).length > 0;
