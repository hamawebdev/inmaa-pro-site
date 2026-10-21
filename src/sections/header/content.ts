import type { Localized } from "@/i18n/locale";

/** The header's own words. The menu itself is `NAV` and the calls are `CTA` (src/content/site.ts). */
export const headerText = {
  /** The landmark around the menu links. */
  nav: { ar: "القائمة الرئيسية", fr: "Menu principal", en: "Main menu" } as Localized,
  /** The phone menu button: one name, its state given by aria-expanded. */
  menu: { ar: "القائمة", fr: "Menu", en: "Menu" } as Localized,
  /** The logo link back to the top of the page. */
  home: { ar: "مركز إنماء برو، أعلى الصفحة", fr: "UNMAA Pro Center, haut de page", en: "UNMAA Pro Center, top of the page" } as Localized,
  /** Beside the language switch in the phone menu. */
  language: { ar: "اللغة", fr: "Langue", en: "Language" } as Localized,
};
