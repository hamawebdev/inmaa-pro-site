import { centre, processSteps } from "@/content/facts";
import type { Localized } from "@/i18n/locale";

/**
 * The hero's own words. The lists it shows (divisions, ways to hire, days,
 * periods) come from facts.ts; the calls to action from site.ts.
 */

const firstVisit = processSteps.find((step) => step.id === "first-visit")!.name;

export const heroText = {
  eyebrow: {
    ar: `خدمات التنظيف في ${centre.city.ar}`,
    fr: `Nettoyage à ${centre.city.fr}`,
    en: `Cleaning in ${centre.city.en}`,
  } as Localized,

  /**
   * The h1. `mark` takes the gold highlight: the reader's trust, as in his
   * tagline «ثقتكم». `line2`, when there is one, starts its own line.
   */
  title: {
    ar: { before: "نظافة تليق ", mark: "بثقتكم", after: "،", line2: "من البيت إلى العمارة" },
    fr: { before: "Une propreté à la hauteur de ", mark: "votre confiance", after: "", line2: "" },
    en: { before: "Cleaning that lives up to ", mark: "your trust", after: "", line2: "" },
  } as Localized<{ before: string; mark: string; after: string; line2: string }>,

  /**
   * One sentence: `{divisions}` is the four division names from facts.ts,
   * joined in the language's way. No-break spaces keep «عند الطلب» and
   * « à la demande » whole.
   */
  lead: {
    ar: "نتكفّل بتنظيف {divisions}، عند الطلب أو بعقد.",
    fr: "Nous prenons en charge le nettoyage des {divisions}, à la demande ou sous contrat.",
    en: "We clean {divisions}, on demand or under contract.",
  } as Localized,

  /** The quiet line under the calls. */
  priceNote: {
    ar: "نحدّد السعر بعد الزيارة الأولى لمعاينة الموقع.",
    fr: "Le prix est fixé après une première visite des lieux.",
    en: "We set the price after a first visit to inspect the site.",
  } as Localized,
  emailLabel: { ar: "البريد الإلكتروني", fr: "E-mail", en: "E-mail" } as Localized,

  // ── The visual: a request form drawn from his, and cards floating round it ──

  form: {
    title: { ar: "طلب خدمة تنظيف", fr: "Demande de nettoyage", en: "Cleaning request" } as Localized,
    serviceType: { ar: "نوع الخدمة", fr: "Type de prestation", en: "Type of service" } as Localized,
    days: { ar: "أيام التنفيذ", fr: "Jours d’intervention", en: "Working days" } as Localized,
    period: { ar: "تحديد الفترة", fr: "Moment de la journée", en: "Time of day" } as Localized,
  },

  firstVisit: {
    title: firstVisit,
    text: {
      ar: "لمعاينة الموقع قبل عرض السعر",
      fr: "Pour voir les lieux avant le devis",
      en: "To inspect the site before the quote",
    } as Localized,
  },
  divisions: { ar: "أقسامنا", fr: "Nos pôles", en: "Our divisions" } as Localized,
  team: {
    title: { ar: "فريق مدرَّب", fr: "Une équipe formée", en: "A trained team" } as Localized,
    text: { ar: "يؤطّره مشرف", fr: "Sous la conduite d’un superviseur", en: "Working under a supervisor" } as Localized,
  },
};

/** What the drawn form shows as ticked: a contract, three mornings a week. */
export const FORM_TICKS = {
  /** `serviceTypes` key. */
  serviceType: "contract",
  /** Indexes into `workDays` (Saturday to Thursday): Saturday, Monday, Wednesday. */
  days: [0, 2, 4],
  /** Index into `dayPeriods`: «الصباحية». */
  period: 0,
} as const;
