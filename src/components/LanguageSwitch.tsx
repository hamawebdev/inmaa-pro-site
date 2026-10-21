import { LOCALE_NAMES, LOCALE_SHORT, LOCALES, useLocale } from "@/i18n/locale";

import { cn } from "./cn";

/** ع · FR · EN, as a pill with the current language lit. */
export function LanguageSwitch({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label={{ ar: "اللغة", fr: "Langue", en: "Language" }[locale]}
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 rounded-full p-1",
        tone === "light" ? "bg-ink-100/80 ring-1 ring-ink-200/60" : "bg-white/10 ring-1 ring-white/15",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={LOCALE_NAMES[code]}
            aria-label={LOCALE_NAMES[code]}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={cn(
              "grid h-8 min-w-9 place-items-center rounded-full px-2.5 font-display text-[0.8rem] font-semibold transition-colors",
              code === "ar" && "text-[0.95rem]",
              active
                ? tone === "light"
                  ? "bg-white text-navy-900 shadow-soft"
                  : "bg-white text-navy-900"
                : tone === "light"
                  ? "text-ink-500 hover:text-navy-900"
                  : "text-navy-200 hover:text-white",
            )}
          >
            {LOCALE_SHORT[code]}
          </button>
        );
      })}
    </div>
  );
}
