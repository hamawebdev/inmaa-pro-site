import { Armchair, CameraOff, MessageSquareWarning, Quote, Signature, type LucideIcon } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/layout";
import { Card, Chip, IconBadge, Panel } from "@/components/surfaces";
import { TickBox } from "@/components/TickBox";
import { evaluationCriteria, goldenRule, workerPledge, workerRules } from "@/content/facts";
import { SECTION_IDS } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { evaluationLead, goldenRuleSource, heading, pledge, rulesLabel } from "./content";

/** The three rules, in facts.ts order: the client's belongings, privacy, complaints. */
const RULE_ICON: LucideIcon[] = [Armchair, CameraOff, MessageSquareWarning];

/**
 * The team: what every worker signs on joining the centre. The page's warm
 * moment, a gold panel. His golden rule as a large quote beside the heading;
 * the pledge ticked as on his form, in two columns; three rules from the
 * internal rules as white cards; the evaluation criteria as chips.
 */
export function Team() {
  const { pick } = useLocale();

  return (
    <Section id={SECTION_IDS.team} labelledBy="team-title">
      <Container>
        <Panel tone="gold">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-12">
            <SectionHeading
              id="team-title"
              eyebrow={pick(heading.eyebrow)}
              title={pick(heading.title)}
              lead={pick(heading.lead)}
              className="lg:col-span-6"
            />

            {/* «القاعدة الذهبية للعامل» */}
            <figure className="flex flex-col border-t-[1.5px] border-gold-200 pt-8 lg:col-span-6 lg:self-center lg:border-t-0 lg:border-s-[1.5px] lg:border-gold-300 lg:pt-0 lg:ps-12">
              <div className="flex items-center gap-3">
                <Quote aria-hidden strokeWidth={1.75} className="size-8 shrink-0 text-gold-500 rtl:-scale-x-100" />
                <p className="font-display text-[0.95rem] font-medium text-gold-800">{pick(goldenRule.title)}</p>
              </div>
              <blockquote className="mt-4 font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] leading-[1.45] font-medium text-balance text-navy-950 rtl:leading-[1.75]">
                {pick(goldenRule.text)}
              </blockquote>
              <figcaption className="mt-4 text-[0.95rem] text-ink-600">{pick(goldenRuleSource)}</figcaption>
            </figure>
          </div>

          {/* «إقرار وتعهد», ticked as on his form */}
          <div className="mt-10 rounded-tile bg-white p-5 shadow-soft ring-1 ring-gold-100 sm:p-7 md:mt-14 md:rounded-card lg:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-h3">{pick(pledge.title)}</h3>
              <p className="text-[0.9rem] text-ink-500">{pick(pledge.source)}</p>
            </div>
            <p className="mt-2 text-ink-600">{pick(pledge.intro)}</p>
            <ul className="mt-5 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:gap-x-14">
              {workerPledge.map((item) => (
                <li key={item.en} className="border-t border-ink-100 py-3.5 first:border-t-0 sm:nth-2:border-t-0">
                  <TickBox checked className="items-start [&>span:first-child]:mt-[0.3rem]">
                    <span className="ms-1 text-[0.98rem] text-ink-700">{pick(item)}</span>
                  </TickBox>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-end gap-3 border-t border-ink-100 pt-5">
              <Signature aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-gold-600" />
              <span className="font-display text-[0.9rem] text-ink-500">{pick(pledge.signature)}</span>
              <span aria-hidden className="w-24 self-end border-b-[1.5px] border-dotted border-ink-300 sm:w-36" />
            </div>
          </div>

          {/* Three rules from the internal rules */}
          <div className="mt-10 md:mt-12">
            <h3 className="font-display text-[1.06rem] text-navy-950">{pick(rulesLabel)}</h3>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {workerRules.map((rule, index) => {
                const Icon = RULE_ICON[index];
                return (
                  <li key={rule.title.en} className="flex">
                    {/* Icon above the words on a phone and from desktops up; beside them on a tablet. */}
                    <Card className="flex flex-1 flex-col gap-4 sm:flex-row sm:gap-5 lg:flex-col lg:gap-4 lg:p-7">
                      <IconBadge tone="gold">
                        <Icon strokeWidth={1.75} aria-hidden />
                      </IconBadge>
                      <div className="flex flex-col gap-2 sm:pt-2.5 lg:gap-4 lg:pt-0">
                        <h4 className="text-[1.15rem]">{pick(rule.title)}</h4>
                        <p className="text-[0.98rem] text-ink-600">{pick(rule.text)}</p>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* What every worker is evaluated on (article 16) */}
          <div className="mt-10 flex flex-col gap-4 border-t border-gold-200 pt-8 md:mt-12 lg:flex-row lg:items-center lg:gap-8">
            <p className="font-display text-[1.06rem] font-medium text-navy-950 lg:shrink-0">{pick(evaluationLead)}</p>
            <ul className="flex flex-wrap gap-2">
              {evaluationCriteria.map((criterion) => (
                <li key={criterion.en}>
                  <Chip tone="white" className="px-3.5 py-1.5 text-[0.95rem] shadow-soft">
                    {pick(criterion)}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}
