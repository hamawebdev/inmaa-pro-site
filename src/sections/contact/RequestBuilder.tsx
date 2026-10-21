import { ClipboardCheck, Info, Mail, MessageSquareText, RotateCcw } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { DIVISION_ICON, DIVISION_TONE } from "@/components/divisionLook";
import { WhatsAppIcon } from "@/components/icons";
import { IconBadge } from "@/components/surfaces";
import {
  contractDurations,
  dayPeriods,
  divisions,
  programmedServices,
  serviceTypes,
  visitsPerWeek,
  workDays,
} from "@/content/facts";
import { DEFAULT_MESSAGE, EMAIL_SUBJECT, mailtoHref, whatsappHref } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { BUILDER, COLON } from "./content";
import { Group, NumberOption, OptionPill, SelectPill, TileOption } from "./controls";
import { answerLines, composeMessage, hasAnswers, NO_ANSWERS, type Answers, type ServiceTypeId } from "./message";

const SERVICE_TYPE_IDS = Object.keys(serviceTypes) as ServiceTypeId[];

/**
 * On a phone, pills are chips that wrap as they come (a pill never breaks
 * inside: no even grid fits «Dimanche» or «One month» in a 248 px card); from
 * `sm` up they stand in an even grid, his form's rows of boxes.
 */
const FLOW = "flex flex-wrap gap-2 sm:grid sm:gap-2.5";

/**
 * A clean, rounded version of his request form. The visitor ticks what suits
 * him; the message is written as he goes and opens, ready to send, in WhatsApp
 * or his e-mail. The site itself sends nothing.
 */
export function RequestBuilder({ className }: { className?: string }) {
  const { locale, pick } = useLocale();
  const id = useId();
  const [answers, setAnswers] = useState<Answers>(NO_ANSWERS);
  const set = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));
  const toggleDay = (day: number) =>
    setAnswers((a) => ({ ...a, days: a.days.includes(day) ? a.days.filter((d) => d !== day) : [...a.days, day] }));

  const lines = answerLines(answers, locale);
  const message = composeMessage(answers, locale);
  const name = (field: string) => `${id}-${field}`;

  return (
    <div className={cn("rounded-card bg-white text-ink-700 shadow-float ring-1 ring-white/10", className)}>
      <form aria-labelledby={name("title")} onSubmit={(e) => e.preventDefault()} className="p-4 xs:p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <IconBadge tone="green" className="max-xs:hidden">
            <ClipboardCheck strokeWidth={1.75} />
          </IconBadge>
          <div className="min-w-0">
            <h3 id={name("title")} className="text-h3">
              {pick(BUILDER.title)}
            </h3>
            <p className="mt-1 text-[0.95rem] text-ink-500">{pick(BUILDER.intro)}</p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-ink-100 border-y border-ink-100">
          <Group legend={pick(BUILDER.division)} className="py-5">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {divisions.map((division) => {
                const Icon = DIVISION_ICON[division.id];
                return (
                  <TileOption
                    key={division.id}
                    type="radio"
                    name={name("division")}
                    value={division.id}
                    checked={answers.division === division.id}
                    onChange={() => set({ division: division.id })}
                    icon={
                      <IconBadge tone={DIVISION_TONE[division.id]}>
                        <Icon strokeWidth={1.75} />
                      </IconBadge>
                    }
                  >
                    {pick(division.name)}
                  </TileOption>
                );
              })}
            </div>
          </Group>

          <Group legend={pick(BUILDER.serviceType)} className="py-5">
            <div className={cn(FLOW, "sm:grid-cols-2")}>
              {SERVICE_TYPE_IDS.map((type) => (
                <OptionPill
                  key={type}
                  type="radio"
                  name={name("type")}
                  value={type}
                  checked={answers.serviceType === type}
                  onChange={() => set({ serviceType: type })}
                >
                  {pick(serviceTypes[type])}
                </OptionPill>
              ))}
            </div>

            {answers.serviceType === "contract" && (
              <div className="mt-4 flex flex-col gap-5 rounded-tile bg-navy-50 p-4 ring-1 ring-navy-100/80 sm:p-5">
                <Group legend={pick(BUILDER.duration)}>
                  <div className={cn(FLOW, "sm:grid-cols-4 lg:grid-cols-2")}>
                    {contractDurations.map((duration, index) => (
                      <OptionPill
                        key={duration.ar}
                        type="radio"
                        name={name("duration")}
                        value={String(index)}
                        checked={answers.duration === index}
                        onChange={() => set({ duration: index })}
                      >
                        {pick(duration)}
                      </OptionPill>
                    ))}
                  </div>
                </Group>
                <Group legend={pick(BUILDER.visits)} hint={pick(BUILDER.visitsHint)}>
                  <div className="grid grid-cols-6 gap-1.5 xs:gap-2.5">
                    {visitsPerWeek.map((visits) => (
                      <NumberOption
                        key={visits.count}
                        type="radio"
                        name={name("visits")}
                        value={String(visits.count)}
                        number={visits.count}
                        label={pick(visits)}
                        checked={answers.visits === visits.count}
                        onChange={() => set({ visits: visits.count })}
                      />
                    ))}
                  </div>
                </Group>
              </div>
            )}
          </Group>

          <Group legend={pick(BUILDER.days)} className="py-5">
            <div className={cn(FLOW, "sm:grid-cols-3")}>
              {workDays.map((day, index) => (
                <OptionPill
                  key={day.name.ar}
                  type="checkbox"
                  name={name("days")}
                  value={String(index)}
                  checked={answers.days.includes(index)}
                  onChange={() => toggleDay(index)}
                >
                  {pick(day.name)}
                </OptionPill>
              ))}
            </div>
          </Group>

          <Group legend={pick(BUILDER.period)} className="py-5">
            <div className={cn(FLOW, "sm:grid-cols-3")}>
              {dayPeriods.map((period, index) => (
                <OptionPill
                  key={period.ar}
                  type="radio"
                  name={name("period")}
                  value={String(index)}
                  checked={answers.period === index}
                  onChange={() => set({ period: index })}
                >
                  {pick(period)}
                </OptionPill>
              ))}
            </div>
          </Group>

          <div className="py-5">
            <label htmlFor={name("programmed")} className="block font-display text-[0.95rem] font-semibold text-navy-950">
              {pick(BUILDER.programmed)}
            </label>
            <SelectPill
              id={name("programmed")}
              value={answers.programmed ?? ""}
              onChange={(e) => set({ programmed: e.target.value || null })}
              className="mt-3"
            >
              <option value="">{pick(BUILDER.programmedNone)}</option>
              {programmedServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {pick(service.name)}
                </option>
              ))}
            </SelectPill>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex min-h-8 items-center justify-between gap-3">
            <p id={name("preview")} className="flex items-center gap-2 font-display text-[0.95rem] font-semibold whitespace-nowrap text-navy-950">
              <MessageSquareText aria-hidden strokeWidth={1.75} className="size-5 text-green-600" />
              {pick(BUILDER.preview)}
            </p>
            {hasAnswers(answers) && (
              <button
                type="button"
                onClick={() => setAnswers(NO_ANSWERS)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 font-display text-[0.875rem] whitespace-nowrap text-ink-500 transition-colors duration-200 hover:bg-ink-100 hover:text-navy-900 xs:px-3"
              >
                <RotateCcw aria-hidden strokeWidth={1.75} className="size-4" />
                <span className="max-xs:sr-only">{pick(BUILDER.clearAll)}</span>
              </button>
            )}
          </div>
          <div
            role="group"
            aria-labelledby={name("preview")}
            className="mt-3 rounded-tile rounded-se-md bg-green-50 px-4 py-3.5 text-[0.95rem] leading-7 text-ink-800 ring-1 ring-green-100 sm:px-5"
          >
            <p>{pick(DEFAULT_MESSAGE)}</p>
            {lines.length > 0 && (
              <ul className="mt-2">
                {lines.map((line) => (
                  <li key={line.label}>
                    <span className="font-semibold text-navy-950">{line.label}</span>
                    {COLON[locale]}
                    {line.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button href={whatsappHref(message)} variant="whatsapp" icon={<WhatsAppIcon />} className="w-full">
            {pick(BUILDER.sendWhatsapp)}
          </Button>
          <Button href={mailtoHref(pick(EMAIL_SUBJECT), message)} variant="outline" icon={<Mail strokeWidth={1.75} />} className="w-full">
            {pick(BUILDER.sendEmail)}
          </Button>
        </div>
        <p className="mt-4 flex items-start gap-2 text-[0.875rem] leading-6 text-ink-500">
          <Info aria-hidden strokeWidth={1.75} className="mt-0.5 size-[18px] shrink-0" />
          {pick(BUILDER.note)}
        </p>
      </form>
    </div>
  );
}
