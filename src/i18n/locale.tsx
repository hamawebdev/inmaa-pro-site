import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const LOCALES = ["ar", "fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** A value in each of the three languages. */
export type Localized<T = string> = Record<Locale, T>;

export const LOCALE_NAMES: Localized = { ar: "العربية", fr: "Français", en: "English" };
/** Short labels for the switch. */
export const LOCALE_SHORT: Localized = { ar: "ع", fr: "FR", en: "EN" };

const STORAGE_KEY = "inmaa-pro-lang";

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Arabic unless the address (`?lang=fr`) or a past visit says otherwise. */
function initialLocale(): Locale {
  if (typeof window === "undefined") return "ar";
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLocale(fromUrl)) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // storage blocked: Arabic
  }
  return "ar";
}

interface LocaleState {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  /** The current language's value of a `Localized` record. */
  pick: <T>(value: Localized<T>) => T;
}

const LocaleContext = createContext<LocaleState | null>(null);

const TITLES: Localized = {
  ar: "مركز إنماء برو | خدمات التنظيف في أم البواقي",
  fr: "UNMAA Pro Center | Nettoyage à Oum El Bouaghi",
  en: "UNMAA Pro Center | Cleaning services in Oum El Bouaghi",
};
const DESCRIPTIONS: Localized = {
  ar: "مركز إنماء برو للتدريب والتنظيف والإحصاء: تنظيف المنازل والمؤسسات والعمارات والتجمعات السكنية في أم البواقي، عند الطلب أو بعقد. ثقتكم ... أساس نجاحنا.",
  fr: "UNMAA Pro Center : nettoyage des logements, établissements, immeubles et ensembles résidentiels à Oum El Bouaghi, à la demande ou sous contrat.",
  en: "UNMAA Pro Center: cleaning for homes, organisations, apartment buildings and residential complexes in Oum El Bouaghi, on demand or under contract.",
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dir;
    document.title = TITLES[locale];
    document.querySelector('meta[name="description"]')?.setAttribute("content", DESCRIPTIONS[locale]);
  }, [locale, dir]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage blocked: the choice lasts for this visit
    }
    const url = new URL(window.location.href);
    if (next === "ar") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  }, []);

  const value = useMemo<LocaleState>(
    () => ({ locale, dir, setLocale, pick: <T,>(v: Localized<T>) => v[locale] }),
    [locale, dir, setLocale],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleState {
  const state = useContext(LocaleContext);
  if (!state) throw new Error("useLocale outside LocaleProvider");
  return state;
}
