# The site's design rules

The one-page site of مركز إنماء برو (UNMAA Pro Center), a cleaning centre in أم البواقي, Algeria. It presents the centre to the households, businesses and building managers who might hire it. Several people build its sections at the same time; these rules are what make the page read as one design. Read all of it before writing a line.

## 1. What the site may say

- **Only true things.** Every list (divisions, spaces, services, contract options, days, payment) comes from `src/content/facts.ts`, which is taken from the client's own forms. Never write a list of your own.
- **No invented facts.** No prices, no figures ("10 years", "500 clients", "100 %"), no client names, no testimonials, no ratings, no certifications, no awards, no guarantees, no "free". If an idea needs one of those, leave it out.
- **Every price comes from a first visit.** The site may say that; it never shows an amount.
- **Cleaning is the subject.** «مركز إنماء برو للتدريب والتنظيف والإحصاء» also trains and does statistics: mention those only as the centre's other activities, never as services on offer here.
- **Calls to action are links**: WhatsApp, a phone call, an e-mail, or an anchor on the page. There is no backend and no form that sends anything. Use the helpers in `src/content/site.ts` (`whatsappHref`, `telHref`, `mailtoHref`, `contactLinks`, `CTA`, `DEFAULT_MESSAGE`) and the numbers in `contact` (facts.ts). Never type the number or the address yourself.
- **Facebook**: name the page «مركز إنماء للخدمات», never link it.

## 2. Languages

- Arabic is the main version and the default; French and English sit behind the switch. Every text exists in all three.
- Keep a section's words in its own `content.ts`, as `Localized` values (`{ ar, fr, en }`) or one object per language, and read them with `useLocale().pick(...)`.
- **Arabic** uses the client's words wherever he has one (they are in facts.ts: «عند الطلب», «عقد», «الزيارة الأولى», «عرض السعر», «الخدمات المقدمة», «الخدمات المبرمجة», «الصباحية / المسائية / معا»…). Modern Standard Arabic, warm and plain, short sentences. Speak to the reader in the plural, as his tagline does («ثقتكم», «اتصلوا بنا», «اطلبوا»). No superlatives («الأفضل», «رقم 1»).
- **French** says «vous», sober and precise. Put a no-break space (` `) before « : ; ? ! » and inside « guillemets ». Typographic apostrophe ’.
- **English** is British (organisations, flats, lifts, programme), plain and short.
- French runs about 30 % longer than English and Arabic needs taller lines: design every block for the French length and the Arabic height.

## 3. Direction (right to left)

- The page is `dir="rtl"` in Arabic, `ltr` otherwise; the whole layout must mirror by itself.
- Use **logical** classes only: `ps-/pe-`, `ms-/me-`, `start-/end-`, `text-start/text-end`, `border-s/border-e`, `rounded-s-/rounded-e-`, `inset-s-…`. Never `left`, `right`, `pl-`, `pr-`, `ml-`, `mr-`, `text-left`, `text-right`, `rounded-l`… (`tailwind` variants `rtl:` and `ltr:` exist for the rare case that needs them.)
- An arrow that means "go on" is `ForwardArrow` / `ForwardChevron` (`src/components/icons.tsx`): it points left in Arabic. Never a bare `ArrowRight`.
- A phone number, an e-mail address, a code such as «F3», or digits with a unit go inside `<Ltr>` (`src/components/Ltr.tsx`).
- Decorative shapes placed with `start-`/`end-` mirror too. Check every section in Arabic **and** in French.

## 4. Tokens (src/styles/index.css)

Tailwind's default colours are switched off: only these exist.

| Token | Use |
|---|---|
| `paper` | The page background (near-white, warm). Sections sit on it. |
| `navy-50…950` (brand `navy-900` #002a66) | Structure: headings (`navy-950`), primary buttons, dark panels (`navy-900`), tints (`navy-50/100`). |
| `green-50…900` (brand `green-600` #00723c) | Action and "done": the WhatsApp button, ticked boxes, small positive accents, tints. |
| `gold-50…900` (brand `gold-500` #c69630) | Accent only: the eyebrow dot, a thin rule, a highlight, tints (`gold-50/100`). Never body text on white (too pale), never a large gold fill. |
| `ink-50…900` | Text and lines. Body `ink-600`/`ink-700`, muted `ink-500` (never lighter for text), lines `ink-200`. |

- Text on a dark panel: `white` for headings, `navy-100`/`navy-200` for text.
- **Type**: `font-display` (Readex Pro) for headings, buttons, chips, labels, numbers of steps; `font-sans` (IBM Plex Sans Arabic, the default) for paragraphs. Sizes: `text-display` (the hero's h1 only), `text-h2` (via `SectionHeading`), `text-h3`, `text-lead`; body 16–17 px; nothing under 13 px. Headings are weight 600 (set globally); don't go above 700.
- Arabic never takes letter-spacing; the tokens handle line heights per language. Don't set `leading-*` or `tracking-*` on headings.
- **Shapes: everything is rounded.** Panels `rounded-card md:rounded-panel` (the `Panel` component does it), cards `rounded-card` (28 px), tiles `rounded-tile` (20 px), buttons, chips, switches and inputs `rounded-full`, icon tiles `rounded-2xl`. No square corners anywhere, no borders thicker than 1.5 px.
- **Shadows**: `shadow-soft` for cards at rest, `shadow-float` only for cards floating over a visual (the hero), `shadow-button` for filled buttons.
- **Icons**: `lucide-react`, line icons, `strokeWidth={1.75}`, inside `IconBadge` or at 20–24 px inline. Brand marks (WhatsApp, Facebook) from `src/components/icons.tsx`. The four divisions use `DIVISION_ICON` and `DIVISION_TONE` (`src/components/divisionLook.ts`) everywhere.
- **Motion**: hover transitions of 150–250 ms; the hero's floating cards may use `animate-bob`. Nothing appears on scroll (no reveal animations: content must be visible without JavaScript timing). Reduced motion is handled globally.
- No photos: the page must look finished without any. Richness comes from rounded tinted panels, floating cards, the tick-box motif, icons and type.

## 5. Components (src/components) — use them, don't redraw them

| Component | What |
|---|---|
| `Container` | Page width (1232 px) and the 16 px phone gutter. Every section's content goes inside one. |
| `Section` | `<section id>` with the shared vertical rhythm (`py-16 sm:py-20 lg:py-28`). Don't add your own outer padding. |
| `SectionHeading` | Eyebrow + h2 + lead, `align="start"` (default) or `"center"`, `tone="dark"` on a dark panel. Every section but the hero opens with one. Gap from heading to content: `mt-10 md:mt-14`. |
| `Eyebrow` | The pill with the gold dot. |
| `Button` | Pill. `variant`: `whatsapp` (green, the main call), `primary` (navy), `outline` (navy line, the second call), `light` / `outlineLight` (on dark), `ghost`. `size`: `sm`/`md`/`lg`. With `href` it is a link; WhatsApp links open in a new tab by themselves. |
| `Panel` | The large rounded tinted surface: `tone` `navy`, `green`, `gold`, `white`, `deep` (dark navy). |
| `Card` | White card. |
| `IconBadge` | A line icon on a rounded tint. |
| `Chip` | A small pill: a space, a day, an option. |
| `TickBox` | His forms' ☐ box, rounded; ticked it is green with a white check. The site's recurring motif: use it where the client's form has boxes. |
| `Ltr` | Left-to-right text inside Arabic. |
| `Logo`, `LanguageSwitch` | The emblem and name; the ع · FR · EN switch. |

Grid gaps: `gap-4 sm:gap-5 lg:gap-6`. Inside cards: `p-6` (phone) to `p-8`.

## 6. The page, top to bottom

| # | Section (id) | Surface | Note |
|---|---|---|---|
| 1 | Header | Floating rounded white bar, sticky | Logo, menu (`NAV` in site.ts), language switch, WhatsApp pill. Root element carries `data-site-header`. |
| 2 | Hero (`top`) | Paper; the visual sits on a soft gradient | Split: copy on the start side, visual on the end side. The page's only h1. |
| 3 | Promises | White panel | Four promises with line icons in a row. |
| 4 | Divisions (`divisions`) | Four tinted panels (`DIVISION_TONE`) | The four divisions and the spaces each covers. |
| 5 | Ways to hire (`hire`) | Two large cards; the contract one is `deep` | «عند الطلب» and «عقد». First dark moment. |
| 6 | Programmed services (`services`) | Tiles on paper or on a white panel | The nine occasions. |
| 7 | How it works (`process`) | Paper | Six steps from the request to the follow-up. |
| 8 | Team (`team`) | `gold` panel | What every worker signs; his golden rule. |
| 9 | FAQ (`faq`) | Paper, cards | Answers drawn from his forms. |
| 10 | Contact (`contact`) | `deep` panel | Every way to reach the centre; second dark moment. |
| 11 | Footer | Paper | Logo, menu, contact, switch. |

Never put two dark panels next to each other.

## 7. Accessibility

One h1 (the hero). One h2 per section (`SectionHeading`), h3 inside. Decorative images and icons are `aria-hidden` / `alt=""`; icon-only buttons have an `aria-label` in the current language. Interactive things are real `<a>` or `<button>`. Colour contrast as in §4. Focus rings are global; don't remove them.

## 8. Working here

- Edit only your own files (your section's folder). Shared files (`src/components`, `src/content`, `src/i18n`, `src/styles`, `App.tsx`, `index.html`, config) are the lead's: if you need a change there, say so in your report with the exact change.
- No git commands, no `npm install` (ask the lead for a package).
- Check your work:
  - `npx tsc -b` — no errors in your files.
  - `npm run shot -- --section <your id> --locale all --width 390,1440 --no-header` — then open the PNGs in `.shots/` and look at them. Also `--width 820` for a tablet. The run reports any overflow.
  - `npm run shot -- --locale ar --width 390 --split` to see your section in the whole page.
- The screenshot script starts and stops its own server. Don't leave a dev server running.
