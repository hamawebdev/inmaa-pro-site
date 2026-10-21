import {
  CalendarSync,
  HardHat,
  Luggage,
  MoonStar,
  PaintRoller,
  PartyPopper,
  Sparkles,
  Trash2,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { WhatsAppIcon } from "@/components/icons";
import { Container, Section, SectionHeading } from "@/components/layout";
import { IconBadge, type Tone } from "@/components/surfaces";
import { programmedServices } from "@/content/facts";
import { SECTION_IDS, whatsappHref } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { CLOSING, DESCRIPTIONS, HEADING } from "./content";

const ICONS: Record<string, LucideIcon> = {
  periodic: CalendarSync,
  "after-construction": HardHat,
  "after-renovation": PaintRoller,
  "after-banquets": UtensilsCrossed,
  deep: Sparkles,
  "after-travel": Luggage,
  ramadan: MoonStar,
  debris: Trash2,
  events: PartyPopper,
};

type TileTone = Exclude<Tone, "deep" | "white">;

/**
 * The tints, in tile order: no two neighbours share one in the 3 × 3 grid, and
 * each tint comes three times.
 */
const TONES: TileTone[] = ["navy", "green", "gold", "green", "gold", "navy", "navy", "green", "gold"];

const TINT: Record<TileTone, { corner: string; hover: string }> = {
  navy: { corner: "bg-navy-50", hover: "hover:ring-navy-200" },
  green: { corner: "bg-green-50", hover: "hover:ring-green-200" },
  gold: { corner: "bg-gold-50", hover: "hover:ring-gold-200" },
};

/**
 * «الخدمات المبرمجة»: the nine occasions his forms list, as tiles on the paper
 * (3 × 3 on a desktop, two columns on a tablet, one on a phone), then a quiet
 * line for an occasion that is not listed.
 */
export function ProgrammedServices() {
  const { pick } = useLocale();
  return (
    <Section id={SECTION_IDS.services} labelledBy="services-title">
      <Container>
        <SectionHeading id="services-title" eyebrow={pick(HEADING.eyebrow)} title={pick(HEADING.title)} lead={pick(HEADING.lead)} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-14 lg:grid-cols-3 lg:gap-6">
          {programmedServices.map((service, i) => {
            const Icon = ICONS[service.id] ?? Sparkles;
            const tone = TONES[i % TONES.length];
            return (
              <li
                key={service.id}
                className={cn(
                  "group relative isolate flex gap-4 overflow-hidden rounded-card bg-white p-5 shadow-soft ring-1 ring-ink-200/70",
                  "transition-[translate,box-shadow] duration-200 hover:-translate-y-1 sm:flex-col sm:gap-5 sm:p-6 lg:p-7",
                  TINT[tone].hover,
                )}
              >
                {/* A soft halo centred on the icon, whatever the tile's padding. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -start-8 -top-8 -z-10 size-40 rounded-full transition-transform duration-300 group-hover:scale-110 sm:-start-7 sm:-top-7 lg:-start-6 lg:-top-6",
                    TINT[tone].corner,
                  )}
                />
                <IconBadge tone={tone} size="lg">
                  <Icon strokeWidth={1.75} />
                </IconBadge>
                <div className="min-w-0">
                  <h3 className="text-[1.125rem] sm:text-[1.1875rem]">{pick(service.name)}</h3>
                  {DESCRIPTIONS[service.id] && (
                    <p className="mt-1.5 text-[0.95rem] text-ink-600 sm:mt-2">{pick(DESCRIPTIONS[service.id])}</p>
                  )}
                </div>
              </li>
            );
          })}
          <Closing />
        </ul>
      </Container>
    </Section>
  );
}

/**
 * The closing call. On a phone and a desktop it is a quiet line under the
 * grid; in the two columns of a tablet it fills the tenth place as a dashed
 * tile, so the ninth occasion is not left alone on its row.
 */
function Closing() {
  const { pick } = useLocale();
  return (
    <li
      className={cn(
        "flex flex-col items-center gap-4 pt-6 text-center",
        "sm:items-start sm:justify-center sm:rounded-card sm:border-[1.5px] sm:border-dashed sm:border-navy-300/80 sm:p-6 sm:text-start",
        "lg:col-span-3 lg:flex-row lg:items-center lg:justify-center lg:gap-6 lg:border-0 lg:p-0 lg:pt-6 lg:text-center",
      )}
    >
      <p className="font-display text-[1.0625rem] font-medium text-navy-950">{pick(CLOSING.text)}</p>
      <Button variant="whatsapp" href={whatsappHref(pick(CLOSING.message))} icon={<WhatsAppIcon />}>
        {pick(CLOSING.cta)}
      </Button>
    </li>
  );
}
