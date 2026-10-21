import emblem from "@/assets/emblem.png";
import { centre } from "@/content/facts";
import { useLocale } from "@/i18n/locale";

import { cn } from "./cn";

/**
 * His emblem (the book, the cap, the broom and the chart) and his name. In
 * Arabic the Arabic name leads and the Latin one follows; in French and
 * English the Latin name leads and the Arabic one follows, as on his letterhead.
 */
export function Logo({ tone = "light", size = "md", className }: { tone?: "light" | "dark"; size?: "md" | "lg"; className?: string }) {
  const { locale } = useLocale();
  const first = locale === "ar" ? centre.shortName.ar : centre.latinName;
  const second = locale === "ar" ? centre.latinName : centre.shortName.ar;
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-white",
          size === "md" ? "size-11" : "size-14",
          tone === "dark" ? "ring-2 ring-white/20" : "shadow-soft ring-1 ring-ink-200/70",
        )}
      >
        <img src={emblem} alt="" width={256} height={256} className={size === "md" ? "size-9" : "size-12"} />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "truncate font-display font-semibold",
            size === "md" ? "text-[1.08rem]" : "text-[1.3rem]",
            tone === "dark" ? "text-white" : "text-navy-950",
          )}
        >
          {first}
        </span>
        <span
          lang={locale === "ar" ? "en" : "ar"}
          className={cn("truncate text-[0.75rem] font-medium", tone === "dark" ? "text-navy-200" : "text-ink-500")}
        >
          {second}
        </span>
      </span>
    </span>
  );
}
