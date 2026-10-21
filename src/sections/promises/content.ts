import type { Localized } from "@/i18n/locale";

/** The row's name, for screen readers only: the row has no visible heading. */
export const promisesTitle: Localized = { ar: "التزاماتنا", fr: "Nos engagements", en: "Our commitments" };

export type PromiseId = "first-visit" | "contract" | "team" | "quality";

/** Four promises, each true from his forms. No figures, nothing "free". */
export const promises: Array<{ id: PromiseId; title: Localized; text: Localized }> = [
  {
    id: "first-visit",
    title: { ar: "الزيارة الأولى", fr: "Une première visite", en: "A first visit" },
    text: {
      ar: "نعاين موقعكم قبل أن نقدّم لكم أي سعر.",
      fr: "Nous voyons vos lieux avant de vous donner un prix.",
      en: "We inspect your site before we give you any price.",
    },
  },
  {
    id: "contract",
    title: { ar: "عقد مكتوب", fr: "Un contrat écrit", en: "A written contract" },
    text: {
      ar: "بالإمضاء والختم، يحدّد المدة والأيام وطريقة السداد.",
      fr: "Signé et tamponné, il fixe la durée, les jours et le paiement.",
      en: "Signed and stamped, it sets the term, the days and the payment.",
    },
  },
  {
    id: "team",
    title: { ar: "فريق مدرَّب", fr: "Une équipe formée", en: "A trained team" },
    text: {
      ar: "يؤطّره مشرف، ويلتزم بتعليماته.",
      fr: "Elle travaille sous la conduite d’un superviseur.",
      en: "Working under a supervisor and following their instructions.",
    },
  },
  {
    id: "quality",
    title: { ar: "متابعة الجودة", fr: "Une qualité suivie", en: "Quality followed up" },
    text: {
      ar: "نراقب جودة العمل، ونتابع كل شكوى.",
      fr: "Nous contrôlons le travail et donnons suite à chaque réclamation.",
      en: "We check the work and follow up every complaint.",
    },
  },
];
