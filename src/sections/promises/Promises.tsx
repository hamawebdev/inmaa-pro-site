import { CalendarCheck, ClipboardCheck, FilePenLine, UsersRound, type LucideIcon } from "lucide-react";

import { Container, Section } from "@/components/layout";
import { IconBadge, Panel, type Tone } from "@/components/surfaces";
import { useLocale } from "@/i18n/locale";

import { promises, promisesTitle, type PromiseId } from "./content";

const LOOK: Record<PromiseId, { icon: LucideIcon; tone: Exclude<Tone, "deep" | "white"> }> = {
  "first-visit": { icon: CalendarCheck, tone: "green" },
  contract: { icon: FilePenLine, tone: "navy" },
  team: { icon: UsersRound, tone: "gold" },
  quality: { icon: ClipboardCheck, tone: "green" },
};

/** Four promises in a row right under the hero, in a soft rounded panel (casper). */
export function Promises() {
  const { pick } = useLocale();
  return (
    <Section id="promises" labelledBy="promises-title" className="pt-0 sm:pt-0 lg:pt-0">
      <Container>
        <h2 id="promises-title" className="sr-only">
          {pick(promisesTitle)}
        </h2>
        <Panel tone="white" className="px-4 py-8 sm:px-8 sm:py-10 lg:px-6 lg:py-12">
          <ul className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-0">
            {promises.map((promise) => {
              const { icon: Icon, tone } = LOOK[promise.id];
              return (
                <li key={promise.id} className="flex flex-col items-center px-1 text-center sm:px-3 lg:border-s lg:border-ink-200/70 lg:px-6 lg:first:border-s-0">
                  <IconBadge tone={tone} size="lg">
                    <Icon strokeWidth={1.75} />
                  </IconBadge>
                  <h3 className="mt-4 text-[1.0625rem] sm:text-[1.125rem]">{pick(promise.title)}</h3>
                  <p className="mt-1.5 max-w-[17rem] text-[0.9375rem] leading-relaxed text-ink-600">{pick(promise.text)}</p>
                </li>
              );
            })}
          </ul>
        </Panel>
      </Container>
    </Section>
  );
}
