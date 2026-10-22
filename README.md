# Kuracja24 – strona główna

Next.js (App Router) + TypeScript + CSS Modules. Płynne przewijanie: [Lenis](https://github.com/darkroomengineering/lenis).
Projekt odtworzony z handoffu w `design_handoff_kuracja24_strona_glowna/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Struktura

- `app/layout.tsx` – font Figtree (`next/font`), metadane, `<SmoothScroll />`
- `app/globals.css` – tokeny kolorów, przyciski (`.btn`), typografia, kontener
- `app/actions/contact.ts` – server action formularza (Resend, honeypot, limit 5 wiadomości / 10 min na IP)
- `components/` – sekcje strony, każda z własnym `*.module.css`
- `lib/content.ts` – wszystkie treści, dane kontaktowe i linki
- `lib/contact.ts` – walidacja formularza wspólna dla klienta i serwera

## Formularz kontaktowy

Skopiuj `.env.example` do `.env.local` i uzupełnij `RESEND_API_KEY`. Domena nadawcy (`CONTACT_FROM`)
musi być zweryfikowana w Resend. Bez klucza w trybie `dev` wiadomość trafia tylko do logu serwera,
a na produkcji formularz pokaże błąd z numerem telefonu.

## Do zrobienia

- Linki `#` w `PAGES` i `CLINICS[].href` (`lib/content.ts`) – podpiąć, gdy powstaną podstrony.
- Zdjęcia z Unsplash to placeholdery – podmienić na zdjęcia przychodni (hero: 9 zdjęć ~4:3, motyw ok. 35% od góry).
- Logo w SVG od klienta (teraz `public/kuracja-logo.png`).
- Adres URL studia Avenly w stopce.
