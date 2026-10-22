# Handoff: Kuracja24 — strona główna

## Overview
A modernised homepage for **Kuracja** (kuracja24.pl), a specialist outpatient clinic and physiotherapy centre in Radzyń Podlaski, Poland. It is a single long page in Polish: hero, clinics, physiotherapy, NFZ and registration, "why Kuracja", contact with a form and a map, and a footer. Its main goal is to get patients to call or book quickly, and to explain what the clinic offers and how NFZ (public health insurance) visits work.

## About the Design Files
The files in this bundle are **design references created in HTML**: prototypes that show the intended look and behaviour. They are **not production code to copy directly**. The task is to **recreate this design in the target codebase's environment** (e.g. Next.js/React, Astro, WordPress theme) using its established patterns. If no codebase exists yet, a good fit is **Astro or Next.js + plain CSS/Tailwind**. The site is mostly static, with three small interactive islands: the header, the hero photo carousel and the contact form.

`Kuracja Strona Główna.dc.html` opens directly in a browser (it needs `support.js` next to it). All styles are inline. The logic lives in the `class Component` block at the bottom of the file; read it for exact behaviour.

## Fidelity
**High-fidelity.** Colours, typography, spacing, radii, copy and interactions are final. Recreate it pixel-accurately. The photos are Unsplash placeholders and will be replaced with the clinic's own photos.

---

## Global layout
- Content container: `max-width: 1760px; margin: 0 auto; padding-inline: clamp(20px, 5vw, 96px)`.
- Vertical section padding: `clamp(80px, 9vw, 128px)` (some sections use `clamp(96px, 11vw, 160px)` on top).
- Page background `#EBF1F8`. The white sections (Fizjoterapia, Kontakt) blend into it with a 140px vertical gradient at the top and bottom:
  `linear-gradient(180deg, #EBF1F8 0, #fff 140px, #fff calc(100% - 140px), #EBF1F8 100%)`.
- Layouts are flex-wrap rows with `gap`. Columns wrap below roughly 900px, so the page is fully fluid with no fixed breakpoints except the header (see below).
- Smooth scrolling for anchor links: `html { scroll-behavior: smooth; scroll-padding-top: 88px }`.

### Signature shape: the "leaf"
The brand shape, taken from the logo, is a rectangle with **only the top-right and bottom-left corners rounded**: `border-radius: 0 R 0 R`. It is used everywhere:
- Buttons: `0 16px 0 16px` (height 56) / `0 14px 0 14px` (height 48) / `0 12px 0 12px` (height 44).
- Photos and cards: `0 140px 0 140px`, `0 160px 0 160px`, `0 96px 0 96px`, `0 72px 0 72px`.
- The hero container has only a large bottom-left radius: `0 0 0 clamp(80px, 10vw, 180px)`.
- Small markers (step numbers, map pin): `0 14px 0 14px`, `0 4px 0 4px`.

**Do not use circles or dots as decoration.** The earlier "spine of dots" motif was deliberately removed.

---

## Sections

### 1. Header (sticky)
- `position: sticky; top: 0; z-index: 20; height: 88px`. The hero pulls up under it with `margin-top: -88px; padding-top: 88px`.
- Left: logo `assets/kuracja-logo.png`, height 44px. Centre: nav with 5 links (`Przychodnia`, `Fizjoterapia`, `NFZ`, `Rejestracja`, `Kontakt`), Figtree 500 15px, gap `clamp(20px, 2.5vw, 36px)`. Right: phone `83 352 24 92` (500 15px, tabular-nums) and a CTA `Umów wizytę` (height 44, padding 0 22px, radius `0 12px 0 12px`, 600 15px).
- **Responsive:** the full nav shows only when the viewport is at least about 1100px wide (`wide`). Below that a 44×44 burger button replaces it (leaf radius, three 18×1.5px bars, gap 5) and opens a full-width dropdown menu. The phone number is hidden on narrow widths.
- **Two themes**, chosen by scroll position:
  - **Dark**, while the header is over the hero (`scrollY < heroHeight − 88 − 44`): logo `filter: brightness(0) invert(1)`, nav `rgba(255,255,255,.86)`, phone `#fff`, CTA white background with `#0B1630` text, burger background `rgba(255,255,255,.12)`.
  - **Light**, over the rest of the page: logo unchanged, nav `#1D2B48`, phone `#0E1A33`, CTA `#2F4F96` background with white text, burger background `#E4ECF7`.
- **Glass background** appears only once `scrollY > 24`. At the very top the header is fully transparent with no blur.
  - Dark: `background: rgba(11,22,48,.18)`. Light: `rgba(246,248,251,.38)`.
  - `backdrop-filter: blur(22px) saturate(170%)`.
  - Bottom hairline: `inset 0 -1px 0 rgba(255,255,255,.08)` (dark) or `rgba(14,26,51,.07)` (light).
  - Transition: background / box-shadow / backdrop-filter `.45s ease`.
- **Hide on scroll down, show on scroll up.** `transform: translateY(-100%)` when the user scrolls down by more than 6px and `scrollY ≥ 120`. It reappears on any upward scroll of more than 6px, and is always visible while `scrollY < 120` or while the mobile menu is open. Transition `transform .5s cubic-bezier(.22,1,.36,1)`.
- **Nav link hover:** an underline grows **from the centre outwards**. It is drawn as a background gradient: `padding: 8px 0 10px; background-image: linear-gradient(C, C); background-repeat: no-repeat; background-position: 50% 100%; background-size: 0% 2px`, and becomes `100% 2px` on hover. Transition `background-size .5s cubic-bezier(.22,1,.36,1)`.
  - Underline colour C: `#fff` on dark, `#0E1A33` on light.
  - Text hover colour: `#8CCBFA` on dark, `#2A86DB` on light.
- CTA hover: dark `#DCEBFA` background; light `#24407D` background.

### 2. Hero (`#start`), dark
- Container: background `#0B1630`, bottom-left radius `clamp(80px, 10vw, 180px)`, `overflow: hidden`, `isolation: isolate`, bottom padding `clamp(64px, 7vw, 104px)`.
- **Animated background** (WebGL), absolutely positioned behind everything at `z-index: -1`. It fades in with `opacity 0 → 1` over `1.6s` once it is ready. It uses the `@paper-design/shaders` library, specifically `ShaderMount` with `meshGradientFragmentShader`:
  ```js
  colors: ['#0B1630','#2F4F96','#0B1630','#2A86DB','#0E1A33','#5AB0F4'],
  distortion: 0.9, swirl: 0.6, grainMixer: 0.15, grainOverlay: 0.12,
  fit: cover(2), scale: 1.2, offsetX: -0.2, speed: 0.35
  ```
  If the OS has reduced motion turned on, speed is 0 (a static frame). Fallback: the plain `#0B1630` background. In React you can use `@paper-design/shaders-react` → `<MeshGradient … />`.
- **Left column** (`flex: 1 1 460px; max-width: 620px; padding-top: 64px`), stacked with gap 28:
  - Eyebrow: `Przychodnia specjalistyczna i centrum fizjoterapii`, 500 15px/1.4, `#8CCBFA`.
  - H1: `Stawiamy<br>na nogi<br>od ponad 20 lat.`, Figtree 500, `clamp(52px, 6.1vw, 88px)`/0.97, letter-spacing −0.045em, `#fff`.
  - Lead: `Lekarze dziewięciu specjalności i centrum rehabilitacji pod jednym dachem. Część wizyt i zabiegów w ramach umowy z NFZ.`, 400 18px/1.55, `#B4C2DA`, max-width 430.
  - Actions row (gap 20/28):
    - Primary button `Umów wizytę` → `#rejestracja`: height 56, padding 0 30px, radius `0 16px 0 16px`, white background, `#0B1630` text, 600 16px.
    - Phone block → `tel:+48833522492`: a small line `lub zadzwoń` (13px, `#B4C2DA`) above `83 352 24 92` (600 17px, white, tabular-nums).
- **Right column: photo carousel** (`flex: 0 1 860px; min-width: min(100%, 380px); padding-top: 24px`).
  - Frame: height `clamp(440px, 44vw, 640px)`, radius `0 140px 0 140px`, overflow hidden, background `#13213F`.
  - 9 stacked images (`object-fit: cover; object-position: 50% 35%`), one per clinic. Only the active image has `opacity: 1; transform: scale(1)`; the others have `opacity: 0; scale(1.06)`. Transition: opacity `1.1s`, transform `4s`, both `cubic-bezier(.22,1,.36,1)`. This gives a slow "settle-in" zoom.
  - **Caption, bottom-right, on the photo.** There is no box behind it. Readability comes from a radial shade layer above the photo:
    `radial-gradient(120% 90% at 100% 100%, rgba(11,22,48,.92) 0%, rgba(11,22,48,.6) 30%, rgba(11,22,48,0) 60%)`.
    - The caption is positioned `right: clamp(24px, 3vw, 44px); bottom: clamp(24px, 3vw, 40px)`, with width `min(380px, 100% − 180px)`, height 120, and right-aligned text.
    - It has three lines, with a clear hierarchy:
      1. Counter `01 / 09`: 500 13px, `#8CCBFA`, tabular-nums.
      2. Clinic name: 500 `clamp(30px, 2.8vw, 42px)`/1, letter-spacing −0.035em, `#fff`.
      3. Description: 500 16px/1.4, `#B9D9F5` (light blue, deliberately **not** white), `text-shadow: 0 1px 12px rgba(11,22,48,.8)`.
    - Captions cross-fade: the active one has `opacity 1; translateY(0)`, the previous one `translateY(-18px)`, the others `translateY(18px)`. Transition `opacity .6s ease, transform .8s cubic-bezier(.22,1,.36,1)`. Use `aria-live="polite"`.
  - **Progress bars** under the photo: a 9-column grid with gap 6. Each bar is a button with a 20px hit area containing a 3px track (`rgba(255,255,255,.18)`, radius 2). The fill is `#8CCBFA`. Bars before the active one are 100% filled. The active bar fills over `3.6s linear`. Clicking a bar jumps to that slide.
  - Autoplay every **3.6s**. Hovering the photo pauses it.
  - Slides, in order (name, then description):
    1. Reumatologia: Choroby stawów, kręgosłupa i tkanki łącznej
    2. Alergologia: Diagnostyka i leczenie alergii
    3. Okulistyka: Badanie wzroku i choroby oczu
    4. Endokrynologia: Tarczyca, cukrzyca i zaburzenia hormonalne
    5. Dermatologia: Choroby skóry, włosów i paznokci
    6. Laryngologia: Ucho, nos, gardło i krtań
    7. Chirurgia naczyniowa: Żylaki i choroby naczyń krwionośnych
    8. Urologia: Układ moczowy i męski układ płciowy
    9. Neurologia: Układ nerwowy, bóle głowy i kręgosłupa

### 3. Przychodnia (`#przychodnia`), on the `#EBF1F8` background
- Left column (`flex: 1 1 340px; max-width: 460px`):
  - Eyebrow `Przychodnia specjalistyczna`: 500 15px, `#4A5874`.
  - H2 `Dziewięć poradni, jeden adres.`: 500 `clamp(40px, 4.2vw, 60px)`/1, −0.04em, `#0E1A33`.
  - Paragraph: 400 17px/1.6, `#4A5874`.
  - Outline button `Harmonogram przyjęć`: height 52, radius `0 16px 0 16px`, `inset 0 0 0 1.5px #2F4F96`, text `#2F4F96`.
- Right column: a list of 9 rows (the same clinics and descriptions as above), each a link. Row layout: `grid-template-columns: 36px 1fr auto; padding: 22px 16px; border-top: 1px solid #DCE4EF`. The list itself has a bottom border.
  - Number `01`: 500 13px, `#6A7894`. Name: 600 22px, −0.02em, min-width 240. Description: 400 15px, `#4A5874`. Arrow `→`: 20px, `#2A86DB`.
  - **Row hover:**
    - background `rgba(42,134,219,.08)`;
    - text colour `#2F4F96`;
    - left padding grows to 30px, so the content slides right;
    - radius `0 24px 0 24px`;
    - the top border fades to transparent.
    - Transitions: padding and radius `.45s cubic-bezier(.22,1,.36,1)`, colours `.35s`.

### 4. Fizjoterapia (`#fizjoterapia`), white with gradient edges
- Left: photo, height `clamp(460px, 46vw, 660px)`, radius `0 160px 0 160px`.
- Right: eyebrow `Centrum fizjoterapii i rehabilitacji`, H2 `Zabiegi, które przywracają sprawność.`, a paragraph, then a 2-column grid of 6 treatments. Each treatment has `border-top: 1px solid #DCE4EF; padding: 20px 0`, a 600 18px name and a 400 15px description in `#4A5874`:
  - Kinezyterapia: Ćwiczenia lecznicze pod okiem rehabilitanta
  - Krioterapia: Miejscowe leczenie zimnem, łagodzi ból i obrzęk
  - Masaże: Rozluźnienie mięśni i poprawa krążenia
  - Elektrolecznictwo: Prądy lecznicze o działaniu przeciwbólowym
  - Pole elektromagnetyczne: Magnetoterapia wspierająca regenerację tkanek
  - Światło- i ciepłolecznictwo: Naświetlania i zabiegi cieplne
- Then an outline button `Wszystkie zabiegi`.

### 5. NFZ i rejestracja (`#nfz`, contains `#rejestracja`)
- A dark card: background `#0B1630`, radius `0 140px 0 140px`, padding `clamp(48px, 6.5vw, 104px) clamp(28px, 6.5vw, 104px)`, white text.
- Left: eyebrow `Narodowy Fundusz Zdrowia`; H2 `Porady i zabiegi także w ramach NFZ.` (`clamp(38px, 4vw, 56px)`); a paragraph; a button `Zasady korzystania z NFZ`.
- Right (`#rejestracja`): the label `Rejestracja w trzech krokach`, then 3 rows. Each row is `grid 56px 1fr`, `border-top: 1px solid rgba(255,255,255,.14)`, padding 22px 0.
  - Each row has a **numbered leaf tile**: 44×44, radius `0 14px 0 14px`, background `linear-gradient(150deg, #5AB0F4, #2A86DB 46%, #2F4F96)`, white 600 17px digit.
  - Step titles and descriptions:
    1. Zadzwoń lub przyjdź: Telefonicznie pod numerem 83 352 24 92 albo osobiście w rejestracji przy ul. Warszawskiej 17.
    2. Przygotuj dokumenty: Dokument tożsamości, a przy wizycie w ramach NFZ także skierowanie, jeśli jest wymagane.
    3. Przyjdź kilka minut wcześniej: Spokojnie dopełnisz formalności przed wizytą lub zabiegiem.
- Buttons: `Zadzwoń i umów wizytę` (white, links to `tel:`) and `Co przygotować` (outline).

### 6. Dlaczego Kuracja (`#o-nas`)
- A large statement paragraph, 500 `clamp(30px, 3.4vw, 48px)`/1.16. The first sentence is `#0E1A33`; the continuation is in a muted `#6A7894` span.
- A row of 3 photos with leaf radii.
- A 4-column grid of values, each with a top border: **Wiedza**, **Doświadczenie**, **Zespół**, **Sprzęt**. Names are 600 20px; descriptions are 15px/1.55 in `#4A5874`.

### 7. Kontakt (`#kontakt`), white with gradient edges
- **Left column:**
  - Eyebrow `Kontakt`; H2 `Zapraszamy na Warszawską 17.`.
  - Detail rows, each `grid 140px 1fr` with a top border: Adres (`ul. Warszawska 17 (Grzybek)`, `21-300 Radzyń Podlaski`), Rejestracja (`tel./fax 83 352 24 92`), E-mail (`kontakt@kuracja24.pl`).
  - Buttons: `Zadzwoń` (primary `#2F4F96`) and `Wyznacz trasę`. The second is an outline button linking to Google Maps directions: `https://www.google.com/maps/dir/?api=1&destination=Warszawska+17,+21-300+Radzy%C5%84+Podlaski`, opened in a new tab.
  - **Map** under the buttons:
    - Size: `flex: 1 1 auto; min-height: 260px; height: clamp(260px, 22vw, 340px); margin-top: 12px`.
    - Shape: radius `0 72px 0 72px`, overflow hidden.
    - Content: a Google Maps embed iframe (`?q=…&z=16&output=embed`) with `filter: grayscale(1) contrast(1.05) brightness(1.03)`. The iframe is shifted up by 60px (`top: -60px; height: calc(100% + 60px)`) to hide Google's top bar.
    - Overlay: a soft bottom gradient on top of the map.
    - Pill label, bottom-left: `Kuracja · Warszawska 17`. White at 92% opacity, `blur(10px)`, radius `0 14px 0 14px`, height 44. It contains a 12px gradient leaf marker. It links to the same directions URL.
    - In production, consider a styled Mapbox or MapLibre map instead of the iframe.
- **Right column: contact form card.**
  - Card: `flex: 1.4 1 480px`, padding `clamp(28px, 4vw, 56px)`, radius `0 96px 0 96px`, background `#F6F8FB`, `inset 0 0 0 1px #E4ECF7`.
  - H3 `Napisz do nas` (`clamp(28px, 2.6vw, 36px)`), followed by `Odpowiadamy w dni robocze. Wizytę najszybciej umówisz telefonicznie.`
  - **Topic** (`W jakiej sprawie?`): a segmented set of 4 leaf buttons: `Wizyta` (default), `Fizjoterapia`, `NFZ`, `Inne`. Each is height 42, radius `0 12px 0 12px`. Selected: `#2F4F96` background, white text. Unselected: white background, `#2F4F96` text, `inset 0 0 0 1px #C9D6EA`. Use `aria-pressed`.
  - **Fields:**
    - Field style: height 54, padding 0 18px, radius `0 14px 0 14px`, white background, `inset 0 0 0 1px #DCE4EF`, 500 16px. Focus ring `inset 0 0 0 2px #2A86DB`. Error ring `inset 0 0 0 1.5px #C0392B`.
    - Labels: 500 14px, `#1D2B48`.
    - `Imię i nazwisko` (autocomplete `name`) and `Telefon` (type `tel`, placeholder `np. 600 100 200`) sit side by side in an auto-fit grid (min column 220px).
    - `E-mail (opcjonalnie)`.
    - `Wiadomość`: a textarea with 5 rows, min-height 140, vertical resize, placeholder `Opisz krótko, w czym możemy pomóc`.
    - Consent checkbox (`accent-color: #2F4F96`) with the label: `Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na wiadomość, zgodnie z polityką prywatności.` The words "polityką prywatności" are an underlined link.
  - Submit button `Wyślij wiadomość`: primary, height 56.
  - **Validation** runs on submit. After the first failed submit it re-runs live on every change. Rules and error messages (13px, `#C0392B`):
    - name has 3 or more characters, otherwise `Podaj imię i nazwisko`;
    - phone has 9–11 digits **or** an e-mail is filled in, otherwise `Podaj telefon lub e-mail`;
    - if an e-mail is given it must look like `x@y.z`, otherwise `Sprawdź adres e-mail`;
    - message has 5 or more characters, otherwise `Napisz kilka słów`;
    - consent is checked, otherwise the consent label turns `#C0392B`.
  - **Success state** replaces the form:
    - a 64px gradient leaf tile with `✓`;
    - H3 `Dziękujemy, wiadomość wysłana.`;
    - the text `Odpowiemy najszybciej, jak to możliwe. W pilnych sprawach zadzwoń do rejestracji: 83 352 24 92.`;
    - an outline button `Wyślij kolejną wiadomość` that resets the form.
  - **Backend: not implemented in the prototype.** Wire the form to send to `kontakt@kuracja24.pl` (e.g. a server action or API route plus SMTP or Resend). Add rate-limiting or a honeypot field, and a loading state on the button.

### 8. Footer
- On the `#EBF1F8` background, padding 72px top, 40px bottom.
- Top row:
  - the logo with the text `Przychodnia specjalistyczna i centrum fizjoterapii w Radzyniu Podlaskim. Umowa z Narodowym Funduszem Zdrowia.`;
  - a nav with the same 5 links as the header;
  - company details: `KURACJA Sp. z o.o.`, `ul. Warszawska 17, 21-300 Radzyń Podlaski`, `NIP 538-16-63-762 · REGON 030307590`.
- Bottom bar: `border-top: 1px solid #DCE4EF`, 13px text in `#6A7894`. Items: `© 2026 Kuracja24.pl` · links `Regulamin`, `Polityka prywatności i cookies` · photo credits · `Projekt i realizacja: Avenly`. "Avenly" is 600 weight, `#0E1A33`, and is a link; its URL is still to be provided.

---

## Interactions & motion summary
- **Standard easing:** `cubic-bezier(.22,1,.36,1)`, an ease-out-quint feel.
- **Hover transitions:** every hoverable element animates colour, background, box-shadow, border, transform, filter and opacity over **.35s** with that easing. Global rule: `a { transition: color .35s, opacity .35s }`, default `a:hover { color: #2A86DB }`. Override the hover colour on dark surfaces, where `#8CCBFA` is used.
- **Primary buttons on hover:** `translateY(-1px)` plus a soft shadow:
  - on light surfaces: `0 12px 28px -12px rgba(47,79,150,.55)`, with background `#2F4F96 → #24407D`;
  - white buttons on dark: `0 12px 28px -12px rgba(0,0,0,.45)`, with background `#fff → #E4ECF7`.
- **Outline buttons on hover:** fill with `#2F4F96` and turn the text white.
- **Header:** theme swap, glass on scroll, hide on scroll down, centre-out underline (all described above).
- **Hero:** shader fade-in, photo carousel with captions and progress bars (described above).
- **Reduced motion:** the shader speed is 0. Also consider turning off carousel autoplay and the long zoom when `prefers-reduced-motion` is set.

## State
- `header`:
  - `scrolled` (scrollY > 24);
  - `onDark` (whether the header is over the hero);
  - `navHidden` (scroll direction, using the last Y and a 6px threshold);
  - `menuOpen`;
  - `wide` (window.innerWidth breakpoint, about 1100px).
- `heroCarousel`: `index` (0–8), `paused` (on hover). Interval 3600ms.
- `contactForm`:
  - `topic`, `name`, `phone`, `email`, `msg`, `consent`;
  - `errors` (an object), `triedSubmit`, `sent`.
- `shader`: mount on load, then dispose on unmount; `ready` drives the fade-in.

## Design tokens
**Colours**
| Token | Hex | Use |
|---|---|---|
| navy-900 | `#0B1630` | hero, NFZ card, dark text on white buttons |
| navy-850 | `#13213F` | image placeholders on dark |
| ink | `#0E1A33` | primary text |
| ink-2 | `#1D2B48` | nav text (light), form labels |
| brand | `#2F4F96` | primary buttons, links, selected states |
| brand-hover | `#24407D` | primary button hover |
| blue-600 | `#2A86DB` | accents, arrows, focus ring, link hover |
| blue-400 | `#5AB0F4` | gradient start |
| blue-200 | `#8CCBFA` | eyebrows and hovers on dark, progress fill |
| blue-150 | `#B9D9F5` | secondary caption text on photos |
| blue-100 | `#DCEBFA` | white-button hover on dark |
| muted-on-dark | `#B4C2DA` | body text on dark |
| text-2 | `#4A5874` | secondary text |
| text-3 | `#6A7894` | tertiary text, numbers |
| line | `#DCE4EF` | dividers, input ring |
| line-2 | `#C9D6EA` | unselected chip ring |
| tint | `#E4ECF7` | light hover background, image placeholders |
| surface-2 | `#F6F8FB` | form card |
| page | `#EBF1F8` | page background |
| white | `#FFFFFF` | white sections |
| error | `#C0392B` | validation |

**Brand gradient:** `linear-gradient(150deg, #5AB0F4, #2A86DB 46%, #2F4F96)`, used for leaf markers and step tiles.

**Typography: Figtree** (Google Fonts, weights 400/500/600/700). Use `-webkit-font-smoothing: antialiased`.
| Role | Size / line-height | Weight | Tracking |
|---|---|---|---|
| H1 hero | clamp(52px, 6.1vw, 88px) / 0.97 | 500 | −0.045em |
| H2 | clamp(40px, 4.2vw, 60px) / 1 | 500 | −0.04em |
| Statement | clamp(30px, 3.4vw, 48px) / 1.16 | 500 | −0.03em |
| Caption name | clamp(30px, 2.8vw, 42px) / 1 | 500 | −0.035em |
| H3 form | clamp(28px, 2.6vw, 36px) / 1.05 | 500 | −0.035em |
| List title | 22px / 1.15 | 600 | −0.02em |
| Item title | 18–20px / 1.2 | 600 | −0.01em |
| Lead | 17–18px / 1.55–1.6 | 400 | — |
| Body / UI | 15–16px / 1.45–1.5 | 400–500 | — |
| Buttons | 15–16px / 1 | 600 | — |
| Eyebrow | 15px / 1.4 | 500 | — |
| Small / meta | 13px | 400–500 | tabular-nums for numbers |

Use `text-wrap: pretty` on paragraphs.

**Radii (leaf `0 R 0 R`):** 4, 12, 14, 16, 24, 72, 96, 140, 160. Hero bottom-left: `clamp(80px, 10vw, 180px)`.

**Spacing:** gaps of 6, 8, 12, 16, 20, 22, 24, 28, 40, 56 and 64. Section padding uses the clamp values above.

**Shadows:** primary hover `0 12px 28px -12px rgba(47,79,150,.55)`; map pill `0 10px 30px -12px rgba(14,26,51,.35)`.

## Assets
- `assets/kuracja-logo.png`: the clinic logo, rendered white on dark via a CSS filter. Ask the client for an SVG version.
- Photos: Unsplash placeholders, credited in the footer (J. Toltesi, M. Zeman, T. Heftiba, P. Madison). **Replace them with the clinic's own photos.** The hero needs 9 photos, one per clinic, at about a 4:3 crop with the subject roughly 35% from the top.
- Map: Google Maps embed (no API key needed for `output=embed`).
- Shader: `@paper-design/shaders` (npm), the mesh gradient.

## Content / copy
All copy is final Polish copy and is in the HTML file. Real data:
- address: ul. Warszawska 17 (Grzybek), 21-300 Radzyń Podlaski;
- phone and fax: 83 352 24 92;
- e-mail: kontakt@kuracja24.pl;
- NIP 538-16-63-762, REGON 030307590.

Links that are currently `#` (Harmonogram przyjęć, the individual clinic pages, Wszystkie zabiegi, Zasady korzystania z NFZ, Co przygotować, Regulamin, Polityka prywatności, Avenly) need real routes.

## Files
- `Kuracja Strona Główna.dc.html`: the full homepage. It is the single source of truth: inline styles, plus a logic class at the bottom that covers header state, the carousel, form validation and the shader setup.
- `support.js`: the runtime that lets the `.dc.html` file open in a browser. It is for preview only and is not part of the implementation.
- `assets/kuracja-logo.png`: the logo.
