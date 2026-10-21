import { useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/components/cn";
import { DIVISION_ICON, DIVISION_TONE } from "@/components/divisionLook";
import { Container, Section, SectionHeading } from "@/components/layout";
import type { Tone } from "@/components/surfaces";
import { DIVISION_IDS, divisions, type DivisionId } from "@/content/facts";
import { SECTION_IDS } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { heading, tablistLabel } from "./content";
import { DivisionPanel, panelId, tabId } from "./DivisionPanel";

/** The round icon in each tab wears its division's tint, selected or not. */
const TAB_ICON: Record<Exclude<Tone, "deep">, string> = {
  green: "bg-green-100 text-green-700",
  navy: "bg-navy-100 text-navy-800",
  gold: "bg-gold-100 text-gold-700",
  white: "bg-white text-navy-800 ring-1 ring-ink-200",
};

/**
 * The four divisions: a row of four tabs (two by two on a phone) above one
 * large panel in the selected division's tint. Arrow keys follow the reading
 * direction: in Arabic the next tab is to the left.
 */
export function Divisions() {
  const { dir, pick } = useLocale();
  const [selected, setSelected] = useState<DivisionId>("homes");
  const tabs = useRef<Partial<Record<DivisionId, HTMLButtonElement | null>>>({});

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = DIVISION_IDS.indexOf(selected);
    const last = DIVISION_IDS.length - 1;
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    const next =
      event.key === forward
        ? (index + 1) % DIVISION_IDS.length
        : event.key === back
          ? (index + last) % DIVISION_IDS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    const id = DIVISION_IDS[next];
    setSelected(id);
    tabs.current[id]?.focus();
  }

  return (
    <Section id={SECTION_IDS.divisions} labelledBy="divisions-title">
      <Container>
        <SectionHeading id="divisions-title" eyebrow={pick(heading.eyebrow)} title={pick(heading.title)} lead={pick(heading.lead)} />

        <div
          role="tablist"
          aria-label={pick(tablistLabel)}
          onKeyDown={onKeyDown}
          className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-3 md:mt-14 lg:grid-cols-4"
        >
          {divisions.map((division) => {
            const active = division.id === selected;
            const Icon = DIVISION_ICON[division.id];
            return (
              <button
                key={division.id}
                ref={(el) => {
                  tabs.current[division.id] = el;
                }}
                type="button"
                role="tab"
                id={tabId(division.id)}
                aria-selected={active}
                aria-controls={panelId(division.id)}
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(division.id)}
                className={cn(
                  "flex min-h-13 items-center gap-2 rounded-[1.6rem] p-1.5 pe-3 text-start font-display text-[0.9rem] leading-snug font-medium transition-[background-color,box-shadow,color] duration-200 sm:min-h-14 sm:gap-3 sm:rounded-full sm:p-2 sm:pe-5 sm:text-[1rem] lg:justify-center lg:pe-6",
                  active
                    ? "bg-navy-900 text-white shadow-button"
                    : "bg-white text-navy-900 shadow-soft ring-1 ring-ink-200/80 hover:bg-navy-50 hover:ring-navy-200",
                )}
              >
                <span
                  aria-hidden
                  className={cn("grid size-9 shrink-0 place-items-center rounded-full sm:size-10 [&_svg]:size-[18px] sm:[&_svg]:size-5", TAB_ICON[DIVISION_TONE[division.id]])}
                >
                  <Icon strokeWidth={1.75} />
                </span>
                <span className="min-w-0">{pick(division.name)}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-5">
          {divisions.map((division) => (
            <DivisionPanel key={division.id} division={division} active={division.id === selected} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
