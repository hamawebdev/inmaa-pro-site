/**
 * The process section's own words. The six steps and their names come from
 * `processSteps` in facts.ts; only the sentences under them are here, and each
 * says what his forms say: the request, the first visit («تقييم النظافة»,
 * «دخول الفريق», «مكان التخلص من النفايات»), the quote, the contract
 * («الإمضاء والختم»), the visits, the follow-up.
 *
 * French: a no-break space ( ) before « : ; ? ! ».
 */
import type { Localized } from "@/i18n/locale";

export const heading = {
  eyebrow: { ar: "كيف نعمل", fr: "Notre méthode", en: "How it works" } as Localized,
  title: {
    ar: "من طلبكم إلى المتابعة",
    fr: "De votre demande au suivi",
    en: "From your request to the follow-up",
  } as Localized,
  lead: {
    ar: "يسير كل ملف في المركز بالخطوات الست نفسها، فتعرفون في كل مرحلة ما الذي يأتي بعدها.",
    fr: "Chaque dossier du centre suit les mêmes six étapes : à chaque moment, vous savez ce qui vient ensuite.",
    en: "Every file at the centre follows the same six steps, so at each stage you know what comes next.",
  } as Localized,
};

/** One or two sentences under each step's name, keyed by the step's id in facts.ts. */
export const stepText: Record<string, Localized> = {
  request: {
    ar: "اتصلوا بنا، أو راسلونا عبر واتساب أو بالبريد الإلكتروني، ويفتح المركز ملفًا لطلبكم.",
    fr: "Appelez-nous, ou écrivez-nous sur WhatsApp ou par e-mail : le centre ouvre un dossier pour votre demande.",
    en: "Call us, or write to us on WhatsApp or by e-mail, and the centre opens a file for your request.",
  },
  "first-visit": {
    ar: "نأتي لمعاينة الموقع: فضاءاته، وتقييم النظافة، ودخول الفريق، ومكان التخلص من النفايات.",
    fr: "Nous venons voir les lieux : les espaces, leur état de propreté, l’accès de l’équipe et l’endroit où vont les déchets.",
    en: "We come to see the site: its spaces, how clean it is, how the team will get in and where the waste goes.",
  },
  quote: {
    ar: "نعدّ عرض السعر على أساس ما وجدناه في الزيارة الأولى، فكل سعر يأتي منها.",
    fr: "Nous établissons le devis d’après ce que la première visite a montré : chaque prix en découle.",
    en: "We draw up the quote from what the first visit found: every price comes from it.",
  },
  contract: {
    ar: "نتفق معًا على التواريخ والأيام والفترة وعدد العمال، وعلى طريقة السداد ودوريته، ثم يحمل العقد الإمضاء والختم.",
    fr: "Nous fixons ensemble les dates, les jours, la période, le nombre d’agents, le mode et le rythme de paiement ; puis le contrat est signé et porte le cachet du centre.",
    en: "Together we set the dates, days, period and number of workers, and how and how often you pay; then the contract is signed and stamped.",
  },
  visits: {
    ar: "فريق مدرَّب يؤطّره مشرف، يأتيكم في الأيام والأوقات المتفق عليها.",
    fr: "Une équipe formée, encadrée par un superviseur, intervient aux jours et aux heures convenus.",
    en: "A trained team, under a supervisor, comes on the agreed days at the agreed times.",
  },
  quality: {
    ar: "يتابع المركز جودة العمل بعمليات تفتيش، وتُرفع كل شكوى إلى المشرف لمعالجتها.",
    fr: "Le centre contrôle la qualité du travail par des inspections, et toute réclamation remonte au superviseur, qui la traite.",
    en: "The centre checks the quality of the work with inspections, and any complaint goes to the supervisor, who deals with it.",
  },
};

/** The bar under the steps: the first step is the reader's. */
export const closing = {
  text: {
    ar: "الخطوة الأولى منكم: اطلبوا زيارة أولى، ونأتيكم لمعاينة الموقع.",
    fr: "La première étape vient de vous : demandez une première visite, nous venons voir les lieux.",
    en: "The first step is yours: book a first visit and we will come to see the site.",
  } as Localized,
  /** What the WhatsApp button types for the visitor. */
  message: {
    ar: "السلام عليكم، أرغب في طلب زيارة أولى من مركز إنماء برو لمعاينة الموقع.",
    fr: "Bonjour, je souhaite demander une première visite d’UNMAA Pro Center pour voir les lieux.",
    en: "Hello, I would like to book a first visit from UNMAA Pro Center to see the site.",
  } as Localized,
};
