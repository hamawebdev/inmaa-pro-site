import { ChevronDown, Headset, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { ForwardArrow, WhatsAppIcon } from "@/components/icons";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Ltr } from "@/components/Ltr";
import { IconBadge } from "@/components/surfaces";
import { TickBox } from "@/components/TickBox";
import { contact } from "@/content/facts";
import { CTA, SECTION_IDS, telHref, whatsappHref } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { firstVisitMessage, heading, help, questions, type FormLine, type Question } from "./content";

/**
 * The FAQ: the heading and a card for anything not answered on the start side,
 * the questions as an accordion on the end side (one column on a phone, where
 * the card follows the questions). The first answer is open.
 */
export function Faq() {
  const { pick } = useLocale();
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set([questions[0].id]));

  function toggle(id: string) {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Section id={SECTION_IDS.faq} labelledBy="faq-title">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:gap-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-10">
          <SectionHeading
            id="faq-title"
            eyebrow={pick(heading.eyebrow)}
            title={pick(heading.title)}
            lead={pick(heading.lead)}
            className="lg:col-span-5"
          />

          <ul className="flex flex-col gap-3 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            {questions.map((question) => (
              <FaqItem key={question.id} question={question} open={open.has(question.id)} onToggle={() => toggle(question.id)} />
            ))}
          </ul>

          <HelpCard className="lg:sticky lg:top-28 lg:col-span-5 lg:row-start-2 lg:self-start" />
        </div>
      </Container>
    </Section>
  );
}

function FaqItem({ question, open, onToggle }: { question: Question; open: boolean; onToggle: () => void }) {
  const { pick, locale } = useLocale();
  const questionId = `faq-${question.id}-question`;
  const answerId = `faq-${question.id}-answer`;

  return (
    <li
      className={cn(
        "rounded-card bg-white ring-1 transition-[box-shadow] duration-200",
        open ? "shadow-soft ring-navy-200" : "ring-ink-200/70 hover:shadow-soft",
      )}
    >
      <h3 className="text-[1.04rem] font-medium sm:text-[1.12rem]">
        <button
          type="button"
          id={questionId}
          aria-expanded={open}
          aria-controls={answerId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 rounded-card px-5 py-4 text-start sm:px-7 sm:py-5"
        >
          <span className="min-w-0 flex-1">{pick(question.question)}</span>
          <span
            aria-hidden
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-200",
              open ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-800",
            )}
          >
            <ChevronDown strokeWidth={1.75} className={cn("size-5 transition-transform duration-200", open && "rotate-180")} />
          </span>
        </button>
      </h3>

      {/* Rows 0fr → 1fr: the answer opens to its own height. Closed, it is inert. */}
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        inert={!open}
        className={cn("grid transition-[grid-template-rows] duration-250 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-6 sm:px-7 sm:pb-7">
            <p className="text-ink-600">{pick(question.answer)}</p>

            {question.lines && <FormLines lines={question.lines} />}

            {question.action === "firstVisit" && (
              <Button
                variant="ghost"
                size="sm"
                href={whatsappHref(firstVisitMessage[locale])}
                icon={<WhatsAppIcon className="text-green-600" />}
                iconEnd={<ForwardArrow strokeWidth={1.75} />}
                className="-ms-4 mt-3"
              >
                {pick(CTA.firstVisit)}
              </Button>
            )}
            {question.action === "call" && (
              <Button
                variant="ghost"
                size="sm"
                href={telHref}
                icon={<Phone strokeWidth={1.75} aria-hidden />}
                iconEnd={<ForwardArrow strokeWidth={1.75} />}
                className="-ms-4 mt-3"
              >
                {pick(CTA.call)}
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * The lines of his form an answer rests on: his label, then the options with
 * their ☐ boxes. On a phone the options flow; from tablets up they stand in
 * even columns (three for three or six options, two for two or four), so a
 * long line wraps as a table, never leaving one option alone.
 * The label sits beside the options on a tablet and above them from desktops
 * up, where the questions' column is narrower.
 */
function FormLines({ lines }: { lines: FormLine[] }) {
  const { pick } = useLocale();
  return (
    <dl className="mt-5 divide-y divide-ink-200/70 rounded-tile bg-paper px-4 ring-1 ring-ink-200/60 sm:px-5">
      {lines.map((line) => (
        <div key={line.label.en} className="flex flex-col gap-2.5 py-4 sm:flex-row sm:gap-5 lg:flex-col lg:gap-2.5">
          <dt className="font-display text-[0.92rem] leading-6 font-medium text-navy-900 sm:w-36 sm:shrink-0 lg:w-auto">{pick(line.label)}</dt>
          <dd className="min-w-0 flex-1">
            <ul
              className={cn(
                "flex flex-wrap gap-x-5 gap-y-2.5 sm:grid sm:gap-x-4",
                line.options.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2",
              )}
            >
              {line.options.map((option) => (
                <li key={option.en}>
                  <TickBox className="items-start [&>span:first-child]:mt-[0.2rem]">
                    <span className="text-[0.95rem] leading-6 text-ink-700">{pick(option)}</span>
                  </TickBox>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** For anything the questions do not answer: the number, WhatsApp and a call. */
function HelpCard({ className }: { className?: string }) {
  const { pick, locale } = useLocale();
  return (
    <div className={cn("rounded-card bg-navy-50 p-6 ring-1 ring-navy-100/80 sm:p-8", className)}>
      <IconBadge tone="white">
        <Headset strokeWidth={1.75} aria-hidden />
      </IconBadge>
      <h3 className="mt-5 text-h3">{pick(help.title)}</h3>
      <p className="mt-2 text-ink-600">{pick(help.text)}</p>
      <p className="mt-4 font-display text-[1.45rem] font-semibold text-navy-950">
        <Ltr>{contact.phoneDisplay}</Ltr>
      </p>
      <div className="mt-6 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
        <Button variant="whatsapp" href={whatsappHref(help.message[locale])} icon={<WhatsAppIcon />} className="w-full xs:w-auto">
          {pick(CTA.whatsappShort)}
        </Button>
        <Button variant="outline" href={telHref} icon={<Phone strokeWidth={1.75} aria-hidden />} className="w-full xs:w-auto">
          {pick(CTA.call)}
        </Button>
      </div>
    </div>
  );
}
