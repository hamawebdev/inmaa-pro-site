import { CalendarCheck, ClipboardCheck, FilePenLine, MapPinned, MessagesSquare, Phone, ReceiptText, type LucideIcon } from "lucide-react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { WhatsAppIcon } from "@/components/icons";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Card, IconBadge } from "@/components/surfaces";
import { processSteps } from "@/content/facts";
import { CTA, SECTION_IDS, telHref, whatsappHref } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { closing, heading, stepText } from "./content";

/** One line icon per step, keyed by the step's id in facts.ts. */
const STEP_ICON: Record<string, LucideIcon> = {
  request: MessagesSquare,
  "first-visit": MapPinned,
  quote: ReceiptText,
  contract: FilePenLine,
  visits: CalendarCheck,
  quality: ClipboardCheck,
};

/**
 * The line that joins a step's bubble to the next one. On a phone it runs down
 * the start side; from tablets up it runs across, two steps to a row, then
 * three from wide screens. It stops at the end of each row and after the last
 * step, and crosses the grid gap (`-me-…`) to reach the next bubble.
 */
function connector(index: number, count: number) {
  const last = index === count - 1;
  const endsRowOfTwo = (index + 1) % 2 === 0;
  const endsRowOfThree = (index + 1) % 3 === 0;
  return cn(
    last && "invisible",
    !last && endsRowOfTwo && "md:invisible",
    !last && endsRowOfThree && "xl:invisible",
    !last && endsRowOfTwo && !endsRowOfThree && "xl:visible",
    !endsRowOfTwo && "md:-me-5 lg:-me-6",
    endsRowOfThree ? "xl:me-0" : "xl:-me-6",
  );
}

/**
 * How it works: the six steps of every file, from the request to the
 * follow-up. A vertical timeline on a phone; a sequence of cards joined by a
 * soft line from tablets up (2 × 3, then 3 × 2 from 1280 px, where every
 * step's name still fits on one line). Step 1 sits on the start side, so in
 * Arabic the sequence reads from the right.
 */
export function Process() {
  const { pick, locale } = useLocale();

  return (
    <Section id={SECTION_IDS.process} labelledBy="process-title">
      <Container>
        <SectionHeading id="process-title" eyebrow={pick(heading.eyebrow)} title={pick(heading.title)} lead={pick(heading.lead)} />

        <ol className="mt-10 grid grid-cols-1 md:mt-14 md:grid-cols-2 md:gap-x-5 md:gap-y-10 lg:gap-x-6 lg:gap-y-12 xl:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = STEP_ICON[step.id];
            const first = index === 0;
            const last = index === processSteps.length - 1;
            return (
              <li key={step.id} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 md:flex md:flex-col">
                {/* The rail: the number in its bubble, and the line on to the next step. */}
                <div aria-hidden className="flex flex-col items-center md:flex-row">
                  {/* On a phone the bubble sits level with the card's icon; the line runs on above it. */}
                  <span className={cn("h-[1.625rem] w-0.5 shrink-0 bg-navy-200 md:hidden", first && "invisible")} />
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-[1.05rem] font-semibold text-white shadow-button">
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      "w-0.5 flex-1 bg-navy-200 md:ms-3 md:h-0.5 md:w-auto md:rounded-full",
                      connector(index, processSteps.length),
                    )}
                  />
                </div>

                <div className={cn("flex md:mt-5 md:flex-1", !last && "pb-4 sm:pb-5 md:pb-0")}>
                  <Card as="article" className="flex flex-1 flex-col gap-4 lg:p-7">
                    {/* The icon beside the name on a phone (level with the bubble), above it from tablets up. */}
                    <div className="flex items-center gap-4 md:flex-col md:items-start">
                      <IconBadge tone="navy">
                        <Icon strokeWidth={1.75} aria-hidden />
                      </IconBadge>
                      <h3 className="text-h3">{pick(step.name)}</h3>
                    </div>
                    <p className="text-ink-600">{pick(stepText[step.id])}</p>
                  </Card>
                </div>
              </li>
            );
          })}
        </ol>

        {/* The first step is the reader's. */}
        <div className="mt-10 flex flex-col gap-5 rounded-card bg-navy-50 p-6 ring-1 ring-navy-100/80 sm:p-7 md:mt-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:rounded-full lg:py-4 lg:ps-9 lg:pe-4">
          <p className="font-display text-[1.06rem] font-medium text-balance text-navy-950 lg:min-w-0 lg:flex-1">{pick(closing.text)}</p>
          <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:shrink-0 lg:flex-nowrap">
            <Button variant="whatsapp" href={whatsappHref(closing.message[locale])} icon={<WhatsAppIcon />} className="w-full xs:w-auto">
              {pick(CTA.firstVisit)}
            </Button>
            <Button variant="outline" href={telHref} icon={<Phone strokeWidth={1.75} aria-hidden />} className="w-full xs:w-auto">
              {pick(CTA.call)}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
