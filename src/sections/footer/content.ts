/**
 * The footer's own words. The centre's names, tagline, activities and contact
 * details come from `@/content/facts`; the menu and the links from
 * `@/content/site`.
 */
import type { Localized } from "@/i18n/locale";

export const FOOTER = {
  menu: { ar: "في هذه الصفحة", fr: "Sur cette page", en: "On this page" } as Localized,
  contact: { ar: "تواصلوا معنا", fr: "Nous joindre", en: "Get in touch" } as Localized,
  /** For screen readers: the Facebook line is a page's name, not a link. */
  facebook: { ar: "صفحتنا على فيسبوك", fr: "Notre page Facebook", en: "Our Facebook page" } as Localized,
  activities: { ar: "أنشطة المركز", fr: "Activités du centre", en: "The centre’s activities" } as Localized,
};
