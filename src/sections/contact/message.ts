/**
 * The request builder's answers and the message they make. Pure functions: the
 * message is a picture of the answers, in the language of the page.
 */
import {
  contractDurations,
  dayPeriods,
  divisions,
  programmedServices,
  serviceTypes,
  visitsPerWeek,
  workDays,
  type DivisionId,
} from "@/content/facts";
import { DEFAULT_MESSAGE } from "@/content/site";
import type { Locale, Localized } from "@/i18n/locale";

import { BUILDER, COLON, LIST_SEPARATOR } from "./content";

export type ServiceTypeId = keyof typeof serviceTypes;

/** Every answer is optional. Lists are kept as indexes into facts.ts, so they print in his order. */
export interface Answers {
  division: DivisionId | null;
  serviceType: ServiceTypeId | null;
  /** Index into `contractDurations`; only said when the service type is a contract. */
  duration: number | null;
  /** `visitsPerWeek[].count`; only said when the service type is a contract. */
  visits: number | null;
  /** Indexes into `workDays`. */
  days: number[];
  /** Index into `dayPeriods`. */
  period: number | null;
  /** `programmedServices[].id`. */
  programmed: string | null;
}

export const NO_ANSWERS: Answers = {
  division: null,
  serviceType: null,
  duration: null,
  visits: null,
  days: [],
  period: null,
  programmed: null,
};

export function hasAnswers(a: Answers): boolean {
  return (
    a.division !== null ||
    a.serviceType !== null ||
    a.duration !== null ||
    a.visits !== null ||
    a.days.length > 0 ||
    a.period !== null ||
    a.programmed !== null
  );
}

export interface AnswerLine {
  label: string;
  value: string;
}

/** One line per answer, label and value («القسم» / «المنازل»), in the order of his form. */
export function answerLines(a: Answers, locale: Locale): AnswerLine[] {
  const lines: AnswerLine[] = [];
  const add = (label: Localized, value: string) => lines.push({ label: label[locale], value });

  const division = divisions.find((d) => d.id === a.division);
  if (division) add(BUILDER.division, division.name[locale]);

  if (a.serviceType) add(BUILDER.serviceType, serviceTypes[a.serviceType][locale]);
  if (a.serviceType === "contract") {
    const duration = a.duration === null ? undefined : contractDurations[a.duration];
    if (duration) add(BUILDER.duration, duration[locale]);
    const visits = visitsPerWeek.find((v) => v.count === a.visits);
    if (visits) add(BUILDER.visits, visits[locale]);
  }

  if (a.days.length > 0) {
    const names = [...a.days].sort((x, y) => x - y).map((i) => workDays[i].name[locale]);
    add(BUILDER.days, names.join(LIST_SEPARATOR[locale]));
  }

  const period = a.period === null ? undefined : dayPeriods[a.period];
  if (period) add(BUILDER.period, period[locale]);

  const programmed = programmedServices.find((s) => s.id === a.programmed);
  if (programmed) add(BUILDER.programmed, programmed.name[locale]);

  return lines;
}

/** «القسم: المنازل»; French puts a no-break space before the colon. */
export function lineText(line: AnswerLine, locale: Locale): string {
  return `${line.label}${COLON[locale]}${line.value}`;
}

/** The greeting, then one line per answer. With nothing chosen, the default message alone. */
export function composeMessage(a: Answers, locale: Locale): string {
  const lines = answerLines(a, locale).map((line) => lineText(line, locale));
  return lines.length === 0 ? DEFAULT_MESSAGE[locale] : `${DEFAULT_MESSAGE[locale]}\n\n${lines.join("\n")}`;
}
