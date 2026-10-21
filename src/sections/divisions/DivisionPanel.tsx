import { Phone } from "lucide-react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { DIVISION_ICON, DIVISION_TONE } from "@/components/divisionLook";
import { WhatsAppIcon } from "@/components/icons";
import { Ltr } from "@/components/Ltr";
import { Chip, IconBadge, Panel, type Tone } from "@/components/surfaces";
import { TickBox } from "@/components/TickBox";
import type { Division, DivisionId } from "@/content/facts";
import { CTA, telHref, whatsappHref } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { priceNote, whatsappMessage } from "./content";

export const tabId = (id: DivisionId) => `division-tab-${id}`;
export const panelId = (id: DivisionId) => `division-panel-${id}`;

/** A code such as «F3» reads left to right inside Arabic. */
function Words({ text }: { text: string }) {
  return /\p{Script=Arabic}/u.test(text) ? <>{text}</> : <Ltr>{text}</Ltr>;
}

/** The kinds' chips wear the panel's tint; on the white panel they take the navy one. */
const KIND_CHIP: Record<Exclude<Tone, "deep">, Tone> = { green: "green", navy: "navy", gold: "gold", white: "navy" };

/** The services card: white on a tinted panel, paper on the white one. */
const SHEET: Record<Exclude<Tone, "deep">, string> = {
  green: "bg-white shadow-soft ring-1 ring-green-100",
  navy: "bg-white shadow-soft ring-1 ring-navy-100/80",
  gold: "bg-white shadow-soft ring-1 ring-gold-100",
  white: "bg-paper ring-1 ring-ink-200/70",
};

const GROUP_LABEL = "font-display text-[0.95rem] font-medium text-navy-950";

/**
 * One division, as a large tinted panel. Phones read it top to bottom: name,
 * kinds, spaces, the services ticked as on his form, then the call. From
 * desktops up the services sit on a white sheet on the end side, and the call
 * runs under both columns.
 */
export function DivisionPanel({ division, active }: { division: Division; active: boolean }) {
  const { pick } = useLocale();
  const tone = DIVISION_TONE[division.id];
  const Icon = DIVISION_ICON[division.id];

  return (
    <div
      role="tabpanel"
      id={panelId(division.id)}
      aria-labelledby={tabId(division.id)}
      hidden={!active}
      tabIndex={0}
      className="rounded-card md:rounded-panel"
    >
      <Panel
        tone={tone}
        className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr_auto] lg:gap-x-12 xl:gap-x-16"
      >
        {/* Name and scope */}
        <div className="flex flex-col items-start gap-5">
          <IconBadge tone={tone} size="lg">
            <Icon strokeWidth={1.75} aria-hidden />
          </IconBadge>
          <div className="flex flex-col gap-2">
            <h3 className="text-h3">{pick(division.name)}</h3>
            <p className="text-lead text-ink-600">{pick(division.scope)}</p>
          </div>
        </div>

        {/* Who the client is, and the spaces his form describes */}
        <div className="flex flex-col gap-7">
          {division.kinds.map((group) => (
            <div key={group.label.en} className="flex flex-col gap-3">
              <h4 className={GROUP_LABEL}>{pick(group.label)}</h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.en}>
                    <Chip tone={KIND_CHIP[tone]}>
                      <Words text={pick(item)} />
                    </Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <h4 className={GROUP_LABEL}>{pick(division.spaces.label)}</h4>
            <ul className="flex flex-wrap gap-2">
              {division.spaces.items.map((item) => (
                <li key={item.en}>
                  <Chip tone="white" className="px-3.5 py-1.5 text-[0.95rem] shadow-soft">
                    {pick(item)}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* «الخدمات المقدمة», ticked as on his form */}
        <div
          className={cn(
            "rounded-tile p-5 sm:p-7 md:rounded-card lg:col-start-2 lg:row-[1/3] lg:self-start lg:p-8",
            SHEET[tone],
          )}
        >
          <h4 className={cn(GROUP_LABEL, "text-[1.05rem]")}>{pick(division.services.label)}</h4>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {division.services.items.map((item) => (
              <li key={item.en} className="border-t border-ink-100 py-2.5 first:border-t-0 sm:py-3 sm:nth-2:border-t-0">
                <TickBox checked>
                  <span className="ms-1 text-[0.97rem] leading-snug text-ink-700">{pick(item)}</span>
                </TickBox>
              </li>
            ))}
          </ul>
        </div>

        {/* The call: it closes the division, under both columns from desktops up */}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-2 lg:border-t lg:border-navy-900/10 lg:pt-8">
          <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button
              variant="whatsapp"
              href={whatsappHref(pick(whatsappMessage[division.id]))}
              icon={<WhatsAppIcon />}
              className="w-full xs:w-auto"
            >
              {pick(CTA.whatsapp)}
            </Button>
            <Button variant="outline" href={telHref} icon={<Phone strokeWidth={1.75} aria-hidden />} className="w-full xs:w-auto">
              {pick(CTA.call)}
            </Button>
          </div>
          <p className="text-[0.9rem] text-ink-500">{pick(priceNote)}</p>
        </div>
      </Panel>
    </div>
  );
}
