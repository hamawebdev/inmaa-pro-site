/**
 * The divisions section's own words. Every list it shows (names, scopes, kinds,
 * spaces, services) comes from `divisions` in facts.ts; only the prose is here.
 */
import type { DivisionId } from "@/content/facts";
import type { Localized } from "@/i18n/locale";

export const heading = {
  eyebrow: { ar: "أقسامنا", fr: "Nos pôles", en: "Our divisions" } as Localized,
  title: {
    ar: "من الشقة إلى التجمّع السكني",
    fr: "De l’appartement à l’ensemble résidentiel",
    en: "From a flat to a residential complex",
  } as Localized,
  lead: {
    ar: "لكل موقع فضاءاته. اختاروا القسم الذي يناسبكم لتروا ما نغطيه فيه والخدمات المقدمة.",
    fr: "Chaque lieu a ses espaces. Choisissez le pôle qui vous concerne pour voir ce que nous couvrons et les prestations proposées.",
    en: "Every site has its own spaces. Choose your division to see what we cover and the services offered.",
  } as Localized,
};

/** The tab row's name for screen readers. */
export const tablistLabel: Localized = {
  ar: "أقسام المركز",
  fr: "Les pôles du centre",
  en: "The centre’s divisions",
};

/** The WhatsApp message each division's button types for the visitor; it names the division. */
export const whatsappMessage: Record<DivisionId, Localized> = {
  homes: {
    ar: "السلام عليكم، أرغب في طلب خدمة تنظيف من قسم المنازل في مركز إنماء برو.",
    fr: "Bonjour, je souhaite demander une prestation de nettoyage au pôle Logements d’UNMAA Pro Center.",
    en: "Hello, I would like to request a cleaning service from UNMAA Pro Center’s Homes division.",
  },
  organisations: {
    ar: "السلام عليكم، أرغب في طلب خدمة تنظيف من قسم المؤسسات في مركز إنماء برو.",
    fr: "Bonjour, je souhaite demander une prestation de nettoyage au pôle Établissements d’UNMAA Pro Center.",
    en: "Hello, I would like to request a cleaning service from UNMAA Pro Center’s Organisations division.",
  },
  buildings: {
    ar: "السلام عليكم، أرغب في طلب خدمة تنظيف من قسم العمارات في مركز إنماء برو.",
    fr: "Bonjour, je souhaite demander une prestation de nettoyage au pôle Immeubles d’UNMAA Pro Center.",
    en: "Hello, I would like to request a cleaning service from UNMAA Pro Center’s Apartment buildings division.",
  },
  complexes: {
    ar: "السلام عليكم، أرغب في طلب خدمة تنظيف من قسم التجمعات السكنية في مركز إنماء برو.",
    fr: "Bonjour, je souhaite demander une prestation de nettoyage au pôle Ensembles résidentiels d’UNMAA Pro Center.",
    en: "Hello, I would like to request a cleaning service from UNMAA Pro Center’s Residential complexes division.",
  },
};

/** Under the buttons: every price comes from a first visit. */
export const priceNote: Localized = {
  ar: "يُحدَّد السعر بعد الزيارة الأولى للموقع.",
  fr: "Le prix est fixé après une première visite sur place.",
  en: "The price is set after a first visit on site.",
};
