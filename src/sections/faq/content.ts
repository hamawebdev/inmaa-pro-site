/**
 * The FAQ's own words. Every answer is drawn from facts.ts (his request and
 * contract forms, his worker registration form). Where an answer rests on a
 * list, the list is shown as the line of his form it comes from: his label,
 * then the options with their ☐ boxes, taken from facts.ts and never typed here.
 *
 * French: a no-break space ( ) before « : ; ? ! » and inside « ».
 */
import {
  bearers,
  bornItems,
  contractDurations,
  dayPeriods,
  divisions,
  durationUnits,
  paymentFrequencies,
  paymentMethods,
  requestKinds,
  teamAccess,
  visitsPerWeek,
  workDays,
} from "@/content/facts";
import type { Localized } from "@/i18n/locale";

export const heading = {
  eyebrow: { ar: "أسئلة شائعة", fr: "Questions fréquentes", en: "Frequently asked" } as Localized,
  title: { ar: "قبل أن تتصلوا بنا", fr: "Avant de nous appeler", en: "Before you call" } as Localized,
  lead: {
    ar: "أجوبة مأخوذة من استمارات المركز وعقوده.",
    fr: "Des réponses tirées des formulaires et des contrats du centre.",
    en: "Answers taken from the centre’s own forms and contracts.",
  } as Localized,
};

/** The card beside the questions, for anything they do not answer. */
export const help = {
  title: { ar: "سؤال آخر؟", fr: "Une autre question ?", en: "Another question?" } as Localized,
  text: {
    ar: "اسألونا مباشرة: اتصلوا بنا أو راسلونا عبر واتساب.",
    fr: "Posez-la-nous directement, par téléphone ou sur WhatsApp.",
    en: "Ask us directly, by phone or on WhatsApp.",
  } as Localized,
  /** What the WhatsApp button types for the visitor. */
  message: {
    ar: "السلام عليكم، لدي سؤال عن خدمات التنظيف في مركز إنماء برو.",
    fr: "Bonjour, j’ai une question sur les prestations de nettoyage d’UNMAA Pro Center.",
    en: "Hello, I have a question about UNMAA Pro Center’s cleaning services.",
  } as Localized,
};

/** A line of his form: his label, then the options with their boxes. */
export interface FormLine {
  label: Localized;
  options: Localized[];
}

/** A link at the foot of an answer. */
export type AnswerAction = "firstVisit" | "call";

export interface Question {
  id: string;
  question: Localized;
  answer: Localized;
  lines?: FormLine[];
  action?: AnswerAction;
}

/** The WhatsApp message of the "book a first visit" link under the price answer. */
export const firstVisitMessage: Localized = {
  ar: "السلام عليكم، أرغب في طلب زيارة أولى من مركز إنماء برو لمعاينة الموقع.",
  fr: "Bonjour, je souhaite demander une première visite d’UNMAA Pro Center pour voir les lieux.",
  en: "Hello, I would like to book a first visit from UNMAA Pro Center to see the site.",
};

const contractingParties = divisions.find((division) => division.id === "buildings")!.kinds[0];

export const questions: Question[] = [
  {
    id: "price",
    question: { ar: "كم تكلّف الخدمة؟", fr: "Combien coûte une prestation ?", en: "How much does it cost?" },
    answer: {
      ar: "كل سعر يأتي بعد الزيارة الأولى: نعاين الموقع وفضاءاته ونقيّم نظافته، ثم نعدّ لكم عرض السعر على أساس ما وجدناه.",
      fr: "Chaque prix vient après une première visite : nous voyons les lieux, leurs espaces et leur état de propreté, puis nous établissons votre devis d’après ce que nous avons constaté.",
      en: "Every price comes after a first visit: we see the site, its spaces and how clean it is, then draw up your quote from what we found.",
    },
    action: "firstVisit",
  },
  {
    id: "days",
    question: {
      ar: "في أي أيام وأوقات تعملون؟",
      fr: "Quels jours et à quelles heures intervenez-vous ?",
      en: "Which days and times do you work?",
    },
    answer: {
      ar: "من السبت إلى الخميس. تختارون الأيام التي تناسبكم والفترة، ونأتيكم في الأوقات المتفق عليها.",
      fr: "Du samedi au jeudi. Vous choisissez vos jours et la période, et nous venons aux heures convenues.",
      en: "Saturday to Thursday. You choose the days and the period, and we come at the agreed times.",
    },
    lines: [
      { label: { ar: "أيام التنفيذ", fr: "Jours d’intervention", en: "Days" }, options: workDays.map((day) => day.name) },
      { label: { ar: "تحديد الفترة", fr: "Période", en: "Period" }, options: dayPeriods },
    ],
  },
  {
    id: "contract-length",
    question: {
      ar: "كم مدة العقد، وكم زيارة في الأسبوع؟",
      fr: "Quelle durée de contrat, et combien de passages par semaine ?",
      en: "How long is a contract, and how many visits a week?",
    },
    answer: {
      ar: "من شهر إلى سنة، ومن زيارة واحدة إلى ست زيارات في الأسبوع، حسب حاجة موقعكم.",
      fr: "D’un mois à un an, et d’un à six passages par semaine, selon les besoins de vos lieux.",
      en: "From one month to a year, and from one to six visits a week, as your site needs.",
    },
    lines: [
      { label: { ar: "مدة العقد", fr: "Durée du contrat", en: "Contract length" }, options: contractDurations },
      { label: { ar: "عدد الزيارات", fr: "Passages par semaine", en: "Visits a week" }, options: visitsPerWeek },
    ],
  },
  {
    id: "on-demand",
    question: {
      ar: "هل يمكن طلب خدمة واحدة دون عقد؟",
      fr: "Peut-on demander une seule intervention, sans contrat ?",
      en: "Can we book a single job, without a contract?",
    },
    answer: {
      ar: "نعم، «عند الطلب»: خدمة واحدة، شاملة أو عميقة، تُحسب مدة تنفيذها بالساعات أو بالأيام.",
      fr: "Oui, « à la demande » : une seule intervention, complète ou en profondeur, dont la durée se compte en heures ou en jours.",
      en: "Yes, “on demand”: a single job, full or deep, its length counted in hours or in days.",
    },
    lines: [
      { label: { ar: "نوع الطلب", fr: "Type d’intervention", en: "Type of job" }, options: requestKinds },
      { label: { ar: "مدة التنفيذ", fr: "Durée", en: "Length" }, options: durationUnits },
    ],
  },
  {
    id: "products",
    question: {
      ar: "من يوفّر مواد التنظيف والنقل؟",
      fr: "Qui fournit les produits et le transport ?",
      en: "Who provides the cleaning products and the transport?",
    },
    answer: {
      ar: "حسب ما ينصّ عليه العقد: كلٌّ منهما على عاتق المركز أو على عاتقكم.",
      fr: "C’est le contrat qui le précise : chacun est à la charge du centre ou à la vôtre.",
      en: "The contract says: each is borne either by the centre or by you.",
    },
    lines: [
      { label: bornItems.materials, options: bearers },
      { label: bornItems.transport, options: bearers },
    ],
  },
  {
    id: "payment",
    question: { ar: "كيف يتم السداد؟", fr: "Comment payer ?", en: "How do I pay?" },
    answer: {
      ar: "نقدًا، أو بتحويل بنكي أو بريدي. وفي العقد تختارون أيضًا دورية السداد.",
      fr: "En espèces, par virement bancaire ou postal. Pour un contrat, vous choisissez aussi le rythme des paiements.",
      en: "In cash, by bank transfer or by postal transfer. Under a contract, you also choose how often you pay.",
    },
    lines: [
      { label: { ar: "طريقة السداد", fr: "Mode de paiement", en: "Payment method" }, options: paymentMethods },
      { label: { ar: "دورية السداد", fr: "Rythme de paiement", en: "How often" }, options: paymentFrequencies },
    ],
  },
  {
    id: "access",
    question: {
      ar: "كيف يدخل الفريق إلى الموقع؟",
      fr: "Comment l’équipe accède-t-elle aux lieux ?",
      en: "How does the team get in?",
    },
    answer: {
      ar: "نتفق على ذلك معكم ونكتبه في العقد، بإحدى هذه الطرق:",
      fr: "Nous en convenons avec vous et l’inscrivons au contrat, de l’une de ces façons :",
      en: "We agree it with you and write it into the contract, in one of these ways:",
    },
    lines: [{ label: { ar: "دخول الفريق", fr: "Accès de l’équipe", en: "Team access" }, options: teamAccess }],
  },
  {
    id: "building",
    question: {
      ar: "من يمكنه إمضاء عقد عمارة أو تجمّع سكني؟",
      fr: "Qui peut signer le contrat d’un immeuble ou d’un ensemble résidentiel ?",
      en: "Who can sign the contract for a building or a residential complex?",
    },
    answer: {
      ar: "تكون جهة التعاقد، مثلًا، إحدى هذه الجهات:",
      fr: "Le contrat peut être signé, par exemple, par :",
      en: "The contract can be signed, for example, by:",
    },
    lines: [{ label: contractingParties.label, options: contractingParties.items }],
  },
  {
    id: "not-right",
    question: {
      ar: "وإن لم يكن شيء على ما يرام؟",
      fr: "Et si quelque chose ne va pas ?",
      en: "What if something is not right?",
    },
    answer: {
      ar: "أخبروا المركز. لا يدخل العامل في نزاع معكم: تُرفع كل شكوى إلى المشرف لمعالجتها رسميًا، ويتابعها المركز.",
      fr: "Prévenez le centre. L’agent n’entre jamais en conflit avec vous : toute réclamation remonte au superviseur, qui la traite officiellement, et le centre en assure le suivi.",
      en: "Tell the centre. Workers never argue with you: every complaint goes to the supervisor, who deals with it formally, and the centre follows it up.",
    },
    action: "call",
  },
];
