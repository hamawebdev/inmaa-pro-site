/**
 * The words of the "ways to hire" section. The options themselves (request
 * kinds, durations, days, periods, visits, payment) come from facts.ts; the
 * field names are his, as printed on his request and contract forms.
 */
import type { Localized } from "@/i18n/locale";

const NBSP = " ";

export const HEADING = {
  title: { ar: "عند الطلب، أو بعقد", fr: "À la demande, ou sous contrat", en: "On demand, or under contract" } as Localized,
  lead: {
    ar: "خدمة واحدة متى احتجتم إليها، أو زيارات منتظمة بعقد. هذه خيارات كل طريقة كما تجدونها في استماراتنا.",
    fr: "Une prestation ponctuelle quand vous en avez besoin, ou des passages réguliers sous contrat. Voici les options de chaque formule, telles qu’elles figurent sur nos formulaires.",
    en: "A single job when you need one, or regular visits under a contract. Here are the options of each, just as they appear on our forms.",
  } as Localized,
};

/** His field names, from the request and contract forms. */
export const FIELDS = {
  requestKind: { ar: "نوع الطلب", fr: "Type de demande", en: "Type of job" } as Localized,
  duration: { ar: "مدة التنفيذ", fr: "Durée de l’intervention", en: "Duration" } as Localized,
  days: { ar: "أيام التنفيذ", fr: "Jours d’intervention", en: "Days" } as Localized,
  period: { ar: "تحديد الفترة", fr: "Moment de la journée", en: "Time of day" } as Localized,
  contractLength: { ar: "مدة العقد", fr: "Durée du contrat", en: "Length of contract" } as Localized,
  visits: { ar: "عدد الزيارات", fr: "Nombre de passages", en: "Visits a week" } as Localized,
  paymentFrequency: { ar: "دورية السداد", fr: "Rythme de paiement", en: "How often you pay" } as Localized,
};

/** The small notes beside a field name. */
export const HINTS = {
  /** Between two options that exclude each other. */
  or: { ar: "أو", fr: "ou", en: "or" } as Localized,
  youChoose: { ar: "تختارونها", fr: "À votre choix", en: "Your choice" } as Localized,
  week: { ar: "من السبت إلى الخميس", fr: "Du samedi au jeudi", en: "Saturday to Thursday" } as Localized,
  visits: { ar: "من واحدة إلى ستة بالأسبوع", fr: "D’une à six fois par semaine", en: "Once to six times a week" } as Localized,
};

export const ON_DEMAND = {
  lead: {
    ar: "خدمة واحدة متى احتجتم إليها، في اليوم والفترة التي تختارونها.",
    fr: "Une seule prestation, quand vous en avez besoin, le jour et au moment que vous choisissez.",
    en: "A single job whenever you need it, on the day and at the time of day you choose.",
  } as Localized,
  occasions: {
    ar: "يناسب المناسبات التي نبرمج لها التنظيف: بعد البناء، قبل المناسبات وبعدها…",
    fr: `Convient aux occasions que nous programmons${NBSP}: après construction, avant ou après un événement…`,
    en: "Suits the occasions we programme a clean for: after construction, before or after an event…",
  } as Localized,
  occasionsLink: { ar: "الخدمات المبرمجة", fr: "Les prestations programmées", en: "The programmed services" } as Localized,
  cta: { ar: "اطلبوا خدمة عند الطلب", fr: "Demander une prestation", en: "Book a single job" } as Localized,
  message: {
    ar: "السلام عليكم، أرغب في طلب خدمة تنظيف عند الطلب من مركز إنماء برو.",
    fr: "Bonjour, je souhaite une prestation de nettoyage ponctuelle (à la demande) auprès d’UNMAA Pro Center.",
    en: "Hello, I would like to book a one-off cleaning job (on demand) with UNMAA Pro Center.",
  } as Localized,
};

export const CONTRACT = {
  lead: {
    ar: "زيارات منتظمة طوال مدة العقد، بالعدد والأيام والفترة التي نتفق عليها معًا.",
    fr: "Des passages réguliers pendant toute la durée du contrat, au rythme, aux jours et au moment convenus ensemble.",
    en: "Regular visits for the length of the contract, as often, on the days and at the times we agree together.",
  } as Localized,
  cta: { ar: "اسألوا عن عقد", fr: "Parler d’un contrat", en: "Ask about a contract" } as Localized,
  message: {
    ar: "السلام عليكم، أرغب في التعاقد مع مركز إنماء برو على زيارات تنظيف منتظمة.",
    fr: "Bonjour, je souhaite un contrat de nettoyage avec passages réguliers auprès d’UNMAA Pro Center.",
    en: "Hello, I would like a cleaning contract with regular visits from UNMAA Pro Center.",
  } as Localized,
};

/** The strip under the two cards: what holds for both ways. */
export const PRACTICAL = {
  payment: { ar: "طريقة السداد", fr: "Moyens de paiement", en: "Ways to pay" } as Localized,
  borne: {
    /** Joins the two borne items, then the two bearers (facts.ts), into one line each. Arabic «و» takes no space after it. */
    and: { ar: " و", fr: " et ", en: " and " } as Localized,
    or: { ar: " أو ", fr: " ou ", en: " or " } as Localized,
    tail: { ar: "، كما ينص العقد", fr: ", selon le contrat", en: ", as the contract says" } as Localized,
  },
  price: {
    title: { ar: "السعر بعد الزيارة الأولى", fr: "Le prix, après la première visite", en: "The price comes after a first visit" } as Localized,
    text: {
      ar: "نعاين موقعكم أولًا، ثم نقدّم لكم عرض السعر.",
      fr: "Nous examinons d’abord les lieux, puis nous vous remettons le devis.",
      en: "We inspect your site first, then give you a quote.",
    } as Localized,
  },
};
