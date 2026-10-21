/**
 * The options of his request and contract forms, drawn as pictures: they show
 * what can be chosen, they are not inputs. Each piece comes in a light version
 * (the on-demand card) and a dark one (the contract card).
 */
import type { LucideIcon } from "lucide-react";
import { Moon, Sun, SunMoon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { TickBox } from "@/components/TickBox";
import { dayPeriods, visitsPerWeek, workDays } from "@/content/facts";
import { useLocale, type Localized } from "@/i18n/locale";

export type Look = "light" | "dark";

// ── A field of the form: his label, a note, the options ───────────────────────

/** The list of fields: rows divided by a hairline, like the rows of his form. */
export function FieldList({ look, children }: { look: Look; children: ReactNode }) {
  return (
    <dl
      className={cn(
        "mt-7 divide-y border-y sm:mt-8",
        look === "light" ? "divide-ink-200/70 border-ink-200/70" : "divide-white/10 border-white/10",
      )}
    >
      {children}
    </dl>
  );
}

/**
 * One row. Narrow, the label sits over the options with its note at the end;
 * in a wide card (a tablet) the label takes a column of its own.
 */
export function Field({ look, label, hint, children }: { look: Look; label: ReactNode; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-3 py-4 sm:py-5 @xl:grid-cols-[10rem_minmax(0,1fr)] @xl:items-center @xl:gap-8">
      <dt className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 @xl:flex-col @xl:justify-start">
        <span className={cn("font-display text-[0.95rem] font-medium", look === "light" ? "text-navy-950" : "text-white")}>{label}</span>
        {hint && <span className={cn("text-[0.8125rem]", look === "light" ? "text-ink-500" : "text-navy-200")}>{hint}</span>}
      </dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

// ── Pills ─────────────────────────────────────────────────────────────────────

const PILL = "inline-flex items-center gap-2 rounded-full font-display text-[0.9rem] font-medium leading-6";
const PILL_LOOK: Record<Look, string> = {
  light: "bg-navy-50 text-navy-900 ring-1 ring-navy-100",
  dark: "bg-white/[0.07] text-white ring-1 ring-white/15",
};

export function Pill({ look, icon: Icon, className, children }: { look: Look; icon?: LucideIcon; className?: string; children: ReactNode }) {
  return (
    <span className={cn(PILL, PILL_LOOK[look], "px-3.5 py-1.5", className)}>
      {Icon && <Icon aria-hidden strokeWidth={1.75} className={cn("size-[18px] shrink-0", look === "light" ? "text-gold-600" : "text-gold-300")} />}
      {children}
    </span>
  );
}

/** Two options that exclude each other: «شامل» or «عميق», drawn with his ☐ boxes. */
export function EitherOr({
  look,
  options,
  icons,
  ticks = false,
  or,
}: {
  look: Look;
  options: Localized[];
  icons?: LucideIcon[];
  ticks?: boolean;
  or: string;
}) {
  const { pick } = useLocale();
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {options.map((option, i) => (
        <span key={i} className="contents">
          {i > 0 && <span className={cn("text-[0.875rem]", look === "light" ? "text-ink-500" : "text-navy-200")}>{or}</span>}
          <Pill look={look} icon={icons?.[i]} className={ticks ? "ps-2.5" : undefined}>
            {ticks ? <TickBox tone={look === "light" ? "green" : "onDark"}>{pick(option)}</TickBox> : pick(option)}
          </Pill>
        </span>
      ))}
    </div>
  );
}

/**
 * Four options as a tidy block: two by two in a narrow card, then either one
 * row of equal pills (`wide="row"`) or pills of their own width (`wide="wrap"`).
 * A long option may take two lines in a narrow cell.
 */
export function PillGrid({ look, options, wide = "row" }: { look: Look; options: Localized[]; wide?: "row" | "wrap" }) {
  const { pick } = useLocale();
  return (
    <ul className={cn("grid grid-cols-2 gap-2", wide === "row" ? "@sm:grid-cols-4" : "@md:flex @md:flex-wrap")}>
      {options.map((option, i) => (
        <li key={i} className={cn(PILL, PILL_LOOK[look], "min-h-11 justify-center px-3 py-1.5 text-center leading-5")}>
          {pick(option)}
        </li>
      ))}
    </ul>
  );
}

const PERIOD_ICONS: LucideIcon[] = [Sun, Moon, SunMoon];

/**
 * «الصباحية / المسائية / معا», with a sun, a moon, and both. In a phone's card
 * they are three small tiles, the icon over the word, like the day cells; from
 * a wider card on, pills.
 */
export function Periods({ look }: { look: Look }) {
  const { pick } = useLocale();
  return (
    <ul className="grid grid-cols-3 gap-1.5 @xs:gap-2 @md:flex @md:flex-wrap">
      {dayPeriods.map((period, i) => {
        const Icon = PERIOD_ICONS[i];
        return (
          <li
            key={i}
            className={cn(
              "flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-center font-display text-[0.875rem] leading-5 font-medium",
              "@xs:min-h-11 @xs:flex-row @xs:gap-2 @xs:rounded-full @xs:px-3 @xs:py-1.5 @xs:text-[0.9rem] @md:px-3.5",
              PILL_LOOK[look],
            )}
          >
            <Icon aria-hidden strokeWidth={1.75} className={cn("size-[18px] shrink-0", look === "light" ? "text-gold-600" : "text-gold-300")} />
            <span className="max-w-full">{pick(period)}</span>
          </li>
        );
      })}
    </ul>
  );
}

// ── The week: Saturday to Thursday ────────────────────────────────────────────

/**
 * His six working days as a strip of day cells, each with his ☐ box. `ticked`
 * holds the indices drawn as chosen. Short names in a narrow card, full names
 * in a wide one; a screen reader always hears the full name.
 */
export function WeekStrip({ look, ticked }: { look: Look; ticked: number[] }) {
  const { pick } = useLocale();
  return (
    // Six across from 19rem; a 360 px phone gets two rows of three so «خميس» is never cut.
    <ul className="grid grid-cols-3 gap-1.5 @[19rem]:grid-cols-6 @sm:gap-2">
      {workDays.map((day, i) => {
        const on = ticked.includes(i);
        return (
          <li
            key={i}
            className={cn(
              "flex min-w-0 flex-col items-center gap-2 rounded-2xl px-0.5 pt-3 pb-2.5",
              look === "light"
                ? on
                  ? "bg-green-50 ring-[1.5px] ring-green-300"
                  : "bg-paper ring-1 ring-ink-200/80"
                : on
                  ? "bg-white/[0.12] ring-[1.5px] ring-gold-400/70"
                  : "bg-white/[0.04] ring-1 ring-white/10",
            )}
          >
            <TickBox checked={on} tone={look === "light" ? "green" : on ? "gold" : "onDark"} />
            <span
              aria-hidden
              className={cn(
                "max-w-full truncate font-display text-[0.8125rem] font-medium",
                look === "light" ? (on ? "text-green-800" : "text-ink-600") : on ? "text-white" : "text-navy-200",
              )}
            >
              <span className="@xl:hidden">{pick(day.short)}</span>
              <span className="hidden @xl:inline">{pick(day.name)}</span>
            </span>
            <span className="sr-only">{pick(day.name)}</span>
          </li>
        );
      })}
    </ul>
  );
}

// ── Visits a week: one to six ─────────────────────────────────────────────────

/**
 * Six numbered stops on a track, the first `lit` of them lit in gold: «عدد
 * الزيارات», from once to six times a week.
 */
export function VisitsMeter({ lit }: { lit: number }) {
  const stops = visitsPerWeek.length;
  return (
    <div aria-hidden className="relative flex items-center justify-between">
      <span className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-white/15" />
      <span
        className="absolute start-5 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gold-400"
        style={{ width: `calc((100% - 2.5rem) * ${(lit - 1) / (stops - 1)})` }}
      />
      {visitsPerWeek.map((visit) => {
        const on = visit.count <= lit;
        return (
          <span
            key={visit.count}
            className={cn(
              "relative grid size-10 place-items-center rounded-full font-display text-[0.95rem] font-semibold",
              on ? "bg-gold-400 text-navy-950 ring-[5px] ring-gold-400/20" : "bg-navy-800 text-navy-200 ring-1 ring-white/20",
            )}
          >
            {visit.count}
          </span>
        );
      })}
    </div>
  );
}
