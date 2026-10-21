# مركز إنماء برو — the website

The one-page site of مركز إنماء برو للتدريب والتنظيف والإحصاء (UNMAA Pro Center), a cleaning centre in أم البواقي, Algeria. Arabic by default, with French and English behind a language switch. React and Vite, no backend: every call to action is WhatsApp, a phone call or an e-mail.

| To do this | Run |
|---|---|
| Install | `npm install` |
| Work on it | `npm run dev` |
| Build the site into `dist/` | `npm run build` |
| Look at it in Chrome (phone and desktop, three languages) | `npm run shot -- --locale all --width 390,1440 --split` (see `scripts/shot.mjs`) |

`dist/` is a static site: any static host serves it. The language is chosen with `?lang=fr` or `?lang=en` (Arabic without), and remembered on the visitor's browser.

- What the site says, in three languages, and where each list comes from: `src/content/facts.ts`.
- Shared words and links (menu, calls to action, WhatsApp and e-mail links): `src/content/site.ts`.
- The design rules: `DESIGN.md`.
