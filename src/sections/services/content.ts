/**
 * The words of the programmed-services section. The nine occasions and their
 * names are his («الخدمات المبرمجة», facts.ts); the line under each name says
 * what the occasion is, and promises nothing.
 */
import type { Localized } from "@/i18n/locale";

const NBSP = " ";

export const HEADING = {
  eyebrow: { ar: "الخدمات المبرمجة", fr: "Prestations programmées", en: "Programmed services" } as Localized,
  title: {
    ar: "تنظيف نبرمجه حسب المناسبة",
    fr: "Un nettoyage programmé selon l’occasion",
    en: "A clean programmed for the occasion",
  } as Localized,
  lead: {
    ar: "المناسبات التي نبرمج لها التنظيف، كما تذكرها استمارات الطلب والعقد: تطلبونها مرة واحدة عند الطلب، أو ضمن عقد.",
    fr: `Les occasions pour lesquelles nous programmons un nettoyage, comme les citent nos formulaires de demande et de contrat${NBSP}: une fois à la demande, ou dans le cadre d’un contrat.`,
    en: "The occasions we programme a clean for, as our request and contract forms list them: once, on demand, or as part of a contract.",
  } as Localized,
};

/** One line per occasion, by its id in facts.ts. */
export const DESCRIPTIONS: Record<string, Localized> = {
  periodic: {
    ar: "تنظيف يتكرر في مواعيد منتظمة يُتفق عليها مسبقًا.",
    fr: "Un nettoyage qui revient à intervalles réguliers, convenus à l’avance.",
    en: "Cleaning that comes round at regular intervals, agreed in advance.",
  },
  "after-construction": {
    ar: "بعد انتهاء أشغال البناء، لتهيئة المكان للسكن أو الاستعمال.",
    fr: "Une fois les travaux de construction terminés, pour rendre les lieux habitables ou utilisables.",
    en: "Once building work is over, to make the place ready to live in or use.",
  },
  "after-renovation": {
    ar: "بعد أشغال الترميم أو الطلاء، وما تخلّفه من غبار وبقع.",
    fr: "Après des travaux de rénovation ou de peinture, et la poussière et les taches qu’ils laissent.",
    en: "After renovation or painting work, and the dust and marks it leaves behind.",
  },
  "after-banquets": {
    ar: "بعد الولائم واستقبال الضيوف، حين تحتاج القاعات والمطبخ إلى تنظيف.",
    fr: "Après un repas de fête ou une réception, quand les salles et la cuisine en ont besoin.",
    en: "After a banquet or a gathering, when the rooms and the kitchen need it.",
  },
  deep: {
    ar: "تنظيف كامل للمكان، يتجاوز التنظيف المعتاد إلى التفاصيل والزوايا.",
    fr: "Un nettoyage complet des lieux, qui va au-delà de l’entretien courant, jusqu’aux détails et aux recoins.",
    en: "A complete clean of the place that goes beyond routine cleaning, into the details and corners.",
  },
  "after-travel": {
    ar: "حين يبقى البيت مغلقًا مدة غيابكم ويتراكم فيه الغبار.",
    fr: "Quand le logement est resté fermé pendant votre absence et que la poussière s’y est accumulée.",
    en: "When your home has stood closed while you were away and the dust has settled.",
  },
  ramadan: {
    ar: "لتهيئة المكان لاستقبال شهر رمضان المبارك.",
    fr: "Pour préparer les lieux à l’arrivée du mois de Ramadan.",
    en: "To get the place ready for the coming of Ramadan.",
  },
  debris: {
    ar: "جمع البقايا والمخلفات وإخراجها من المكان.",
    fr: "Rassembler les restes et les déchets, et les sortir des lieux.",
    en: "Gathering up leftovers and waste, and clearing them out of the place.",
  },
  events: {
    ar: "تحضير المكان قبل المناسبة، وتنظيفه بعد انصراف الضيوف.",
    fr: "Préparer les lieux avant l’événement, et les nettoyer une fois les invités partis.",
    en: "Getting the place ready before the event, and cleaning it once the guests have gone.",
  },
};

export const CLOSING = {
  text: {
    ar: "مناسبة غير مذكورة هنا، أو سؤال عن إحداها؟",
    fr: `Une occasion qui ne figure pas ici, ou une question sur l’une d’elles${NBSP}?`,
    en: "An occasion that isn’t listed, or a question about one of these?",
  } as Localized,
  cta: { ar: "اسألونا عبر واتساب", fr: "Nous écrire sur WhatsApp", en: "Ask us on WhatsApp" } as Localized,
  message: {
    ar: "السلام عليكم، أودّ الاستفسار من مركز إنماء برو عن خدمة تنظيف مبرمجة لمناسبة لديّ.",
    fr: "Bonjour, j’aimerais me renseigner auprès d’UNMAA Pro Center sur un nettoyage programmé pour une occasion.",
    en: "Hello, I would like to ask UNMAA Pro Center about a programmed clean for an occasion.",
  } as Localized,
};
