/**
 * Words and links more than one section uses: the page's anchors, the calls to
 * action, the contact links. One copy, so the header, the hero and the contact
 * section always say the same thing.
 */
import type { Locale, Localized } from "@/i18n/locale";

import { contact } from "./facts";

// ── Anchors, in page order ────────────────────────────────────────────────────

export const SECTION_IDS = {
  top: "top",
  divisions: "divisions",
  hire: "hire",
  services: "services",
  process: "process",
  team: "team",
  faq: "faq",
  contact: "contact",
} as const;
export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** The page's menu: the header and the footer show these, in this order. */
export const NAV: Array<{ id: SectionId; label: Localized }> = [
  { id: "divisions", label: { ar: "الأقسام", fr: "Nos pôles", en: "Divisions" } },
  { id: "hire", label: { ar: "طرق التعاقد", fr: "Formules", en: "Ways to hire" } },
  { id: "services", label: { ar: "الخدمات", fr: "Prestations", en: "Services" } },
  { id: "process", label: { ar: "كيف نعمل", fr: "Notre méthode", en: "How it works" } },
  { id: "faq", label: { ar: "أسئلة شائعة", fr: "Questions", en: "FAQ" } },
  { id: "contact", label: { ar: "اتصلوا بنا", fr: "Contact", en: "Contact" } },
];

// ── Calls to action ───────────────────────────────────────────────────────────

/** Arabic speaks to the reader in the plural, as his tagline does («ثقتكم»). */
export const CTA = {
  whatsapp: { ar: "راسلونا عبر واتساب", fr: "Écrire sur WhatsApp", en: "Message us on WhatsApp" } as Localized,
  whatsappShort: { ar: "واتساب", fr: "WhatsApp", en: "WhatsApp" } as Localized,
  call: { ar: "اتصلوا بنا", fr: "Nous appeler", en: "Call us" } as Localized,
  email: { ar: "راسلونا بالبريد", fr: "Écrire un e-mail", en: "Send an e-mail" } as Localized,
  firstVisit: { ar: "اطلبوا زيارة أولى", fr: "Demander une première visite", en: "Book a first visit" } as Localized,
};

// ── Links ─────────────────────────────────────────────────────────────────────

/** What a WhatsApp message or an e-mail starts with when the visitor has not written one. */
export const DEFAULT_MESSAGE: Localized = {
  ar: "السلام عليكم، أرغب في طلب خدمة تنظيف من مركز إنماء برو.",
  fr: "Bonjour, je souhaite demander une prestation de nettoyage à UNMAA Pro Center.",
  en: "Hello, I would like to request a cleaning service from UNMAA Pro Center.",
};

export const EMAIL_SUBJECT: Localized = {
  ar: "طلب خدمة تنظيف",
  fr: "Demande de prestation de nettoyage",
  en: "Cleaning service request",
};

/** Opens a WhatsApp chat with the centre, the message already typed. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telHref = `tel:${contact.phoneE164}`;

export function mailtoHref(subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${contact.email}?${params.join("&")}`;
}

/** The three links with the default words of a language. */
export function contactLinks(locale: Locale) {
  return {
    whatsapp: whatsappHref(DEFAULT_MESSAGE[locale]),
    tel: telHref,
    mailto: mailtoHref(EMAIL_SUBJECT[locale], DEFAULT_MESSAGE[locale]),
  };
}
