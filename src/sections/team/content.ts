/**
 * The team section's own words. What it shows (the pledge, the three rules,
 * the golden rule, the evaluation criteria) comes from facts.ts, which has it
 * from his worker registration form («استمارة التسجيل», with its «إقرار وتعهد»)
 * and the internal rules every worker signs («النظام الداخلي»). Only the
 * sentences that frame them are here.
 *
 * French: a no-break space ( ) before « : ; ? ! ».
 */
import type { Localized } from "@/i18n/locale";

export const heading = {
  eyebrow: { ar: "فريقنا", fr: "Notre équipe", en: "Our team" } as Localized,
  title: {
    ar: "ما يُمضي عليه كل عامل",
    fr: "Ce que signe chaque agent",
    en: "What every worker signs",
  } as Localized,
  lead: {
    ar: "عند التسجيل في المركز، يُمضي كل عامل وعاملة استمارة التسجيل وما فيها من «إقرار وتعهد»، والنظام الداخلي. هذه بنودهما التي تخصّكم.",
    fr: "En rejoignant le centre, chaque agent signe sa fiche d’inscription, avec sa déclaration d’engagement, et le règlement intérieur. Voici ce qui vous concerne.",
    en: "On joining the centre, every worker signs the registration form, with its pledge, and the internal rules. Here is what concerns you.",
  } as Localized,
};

/** Under the golden rule: where it comes from. */
export const goldenRuleSource: Localized = {
  ar: "آخر سطر في النظام الداخلي الذي يُمضيه كل عامل.",
  fr: "La dernière ligne du règlement intérieur que signe chaque agent.",
  en: "The last line of the internal rules every worker signs.",
};

/** The pledge, as his form frames it. */
export const pledge = {
  title: { ar: "إقرار وتعهد", fr: "Déclaration et engagement", en: "Declaration and pledge" } as Localized,
  source: { ar: "من استمارة التسجيل بالمركز", fr: "Extrait de la fiche d’inscription", en: "From the registration form" } as Localized,
  /** His form's line above the list. */
  intro: {
    ar: "أتعهد بأن جميع المعلومات الواردة صحيحة، وأتعهد بما يلي:",
    fr: "Je certifie que toutes les informations fournies sont exactes, et je m’engage à :",
    en: "I declare that all the information given is true, and I undertake to:",
  } as Localized,
  /** «إقرار العامل(ة)», where the worker signs. */
  signature: { ar: "إمضاء العامل(ة)", fr: "Signature de l’agent", en: "Worker’s signature" } as Localized,
};

/** Over the three rule cards. */
export const rulesLabel: Localized = {
  ar: "من النظام الداخلي",
  fr: "Extraits du règlement intérieur",
  en: "From the internal rules",
};

/** Before the evaluation criteria: his article 16, «يخضع العامل للتقييم بناءً على». */
export const evaluationLead: Localized = {
  ar: "يخضع كل عامل للتقييم بناءً على:",
  fr: "Chaque agent est évalué sur :",
  en: "Every worker is evaluated on:",
};
