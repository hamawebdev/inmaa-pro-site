/**
 * The contact section's own words. Every list it shows (divisions, ways to
 * hire, durations, visits, days, periods, programmed services, payment) comes
 * from `@/content/facts`; the links and the default message from
 * `@/content/site`. The builder's legends are the labels of his request and
 * contract forms.
 */
import type { Localized } from "@/i18n/locale";

export const HEADING = {
  eyebrow: { ar: "اتصلوا بنا", fr: "Contact", en: "Contact" } as Localized,
  title: {
    ar: "حدّثونا عمّا تريدون تنظيفه",
    fr: "Dites-nous ce qu’il faut nettoyer",
    en: "Tell us what needs cleaning",
  } as Localized,
  lead: {
    ar: "صفوا لنا المكان وما تحتاجونه، ونتفق معكم على موعد الزيارة الأولى. عرض السعر يأتي بعد هذه الزيارة.",
    fr: "Décrivez-nous le lieu et vos besoins, et nous convenons avec vous de la date de la première visite. Le devis vient après cette visite.",
    en: "Describe the place and what you need, and we will agree a date for the first visit. The quote comes after that visit.",
  } as Localized,
};

/** The ways to reach the centre, on the dark side. */
export const REACH = {
  phoneLabel: { ar: "الهاتف وواتساب", fr: "Téléphone et WhatsApp", en: "Phone and WhatsApp" } as Localized,
  phoneHint: {
    ar: "رقم واحد للمكالمات والرسائل",
    fr: "Un seul numéro pour appeler ou écrire",
    en: "One number for calls and messages",
  } as Localized,
  email: { ar: "البريد الإلكتروني", fr: "E-mail", en: "E-mail" } as Localized,
  place: { ar: "المدينة", fr: "Ville", en: "City" } as Localized,
  facebook: { ar: "صفحتنا على فيسبوك", fr: "Notre page Facebook", en: "Our Facebook page" } as Localized,
  payment: { ar: "طريقة السداد", fr: "Règlement", en: "Payment" } as Localized,
  /** The list's name for screen readers. */
  listLabel: { ar: "طرق التواصل", fr: "Nous joindre", en: "Ways to reach us" } as Localized,
};

/** The request builder: his form's labels, then the builder's own words. */
export const BUILDER = {
  title: { ar: "جهّزوا طلبكم", fr: "Préparez votre demande", en: "Prepare your request" } as Localized,
  intro: {
    ar: "اختاروا ما يناسبكم فتُكتب رسالتكم وحدها. لا شيء إلزامي.",
    fr: "Cochez ce qui vous convient\u00a0: votre message s’écrit tout seul. Rien n’est obligatoire.",
    en: "Tick what suits you and your message writes itself. Nothing is required.",
  } as Localized,

  division: { ar: "القسم", fr: "Pôle", en: "Division" } as Localized,
  serviceType: { ar: "نوع الخدمة", fr: "Type de prestation", en: "Type of service" } as Localized,
  duration: { ar: "مدة العقد", fr: "Durée du contrat", en: "Contract length" } as Localized,
  visits: { ar: "عدد الزيارات", fr: "Nombre de passages", en: "Number of visits" } as Localized,
  /** Under the six numbers while none is chosen. */
  visitsHint: { ar: "في الأسبوع", fr: "par semaine", en: "a week" } as Localized,
  days: { ar: "أيام التنفيذ", fr: "Jours d’intervention", en: "Working days" } as Localized,
  period: { ar: "تحديد الفترة", fr: "Moment de la journée", en: "Time of day" } as Localized,
  programmed: { ar: "الخدمات المبرمجة", fr: "Prestation programmée", en: "Programmed service" } as Localized,
  /** The select's first, empty choice: choosing it again clears the answer. */
  programmedNone: {
    ar: "اختاروا مناسبة (اختياري)",
    fr: "Choisir une occasion (facultatif)",
    en: "Choose an occasion (optional)",
  } as Localized,

  preview: { ar: "رسالتكم", fr: "Votre message", en: "Your message" } as Localized,
  clearAll: { ar: "مسح الاختيارات", fr: "Tout effacer", en: "Clear all" } as Localized,
  sendWhatsapp: { ar: "أرسلوها عبر واتساب", fr: "Envoyer sur WhatsApp", en: "Send on WhatsApp" } as Localized,
  sendEmail: { ar: "أرسلوها بالبريد", fr: "Envoyer par e-mail", en: "Send by e-mail" } as Localized,
  note: {
    ar: "تُفتح الرسالة في واتساب أو في بريدكم جاهزةً للإرسال؛ الموقع نفسه لا يرسل شيئًا.",
    fr: "Le message s’ouvre dans WhatsApp ou votre messagerie, prêt à partir\u00a0: le site, lui, n’envoie rien.",
    en: "The message opens in WhatsApp or your e-mail, ready to send: the site itself sends nothing.",
  } as Localized,
};

/** Between a label and its answer in the message: French takes a no-break space before the colon. */
export const COLON: Localized = { ar: ": ", fr: " : ", en: ": " };
/** Between the days of a list. */
export const LIST_SEPARATOR: Localized = { ar: "، ", fr: ", ", en: ", " };
