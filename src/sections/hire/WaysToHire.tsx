import { Banknote, CalendarCheck, CalendarDays, Clock3, FileSignature, PartyPopper, ScanSearch, SprayCan } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Fragment, type ReactNode } from "react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { ForwardArrow, WhatsAppIcon } from "@/components/icons";
import { Container, Section, SectionHeading } from "@/components/layout";
import { IconBadge, Panel, type Tone } from "@/components/surfaces";
import {
  bearers,
  bornItems,
  contractDurations,
  durationUnits,
  paymentFrequencies,
  paymentMethods,
  requestKinds,
  serviceTypes,
} from "@/content/facts";
import { CTA, NAV, SECTION_IDS, whatsappHref } from "@/content/site";
import { useLocale, type Locale, type Localized } from "@/i18n/locale";

import { CONTRACT, FIELDS, HEADING, HINTS, ON_DEMAND, PRACTICAL } from "./content";
import { EitherOr, Field, FieldList, Periods, PillGrid, VisitsMeter, WeekStrip, type Look } from "./visuals";

const EYEBROW = NAV.find((item) => item.id === SECTION_IDS.hire)!.label;

/** What the pictures show as chosen: three visits a week on three matching days; one day for a single job. */
const SAMPLE_VISITS = 3;
const SAMPLE_CONTRACT_DAYS = [0, 2, 4]; // Saturday, Monday, Wednesday
const SAMPLE_JOB_DAY = [2]; // Monday

/**
 * The two ways to hire the centre, side by side: «عند الطلب» on a light card,
 * «عقد» on the page's first dark panel. Each card draws the options of his
 * form and ends with a WhatsApp message saying which way the visitor wants.
 * Under them, the facts that hold for both.
 */
export function WaysToHire() {
  const { pick } = useLocale();
  return (
    <Section id={SECTION_IDS.hire} labelledBy="hire-title">
      <Container>
        <SectionHeading id="hire-title" eyebrow={pick(EYEBROW)} title={pick(HEADING.title)} lead={pick(HEADING.lead)} />
        <div className="mt-10 grid gap-4 sm:gap-5 md:mt-14 lg:grid-cols-2 lg:gap-6">
          <OnDemandCard />
          <ContractCard />
        </div>
        <PracticalStrip />
      </Container>
    </Section>
  );
}

// ── The two cards ─────────────────────────────────────────────────────────────

function OnDemandCard() {
  const { pick } = useLocale();
  const or = pick(HINTS.or);
  return (
    <Panel as="article" tone="white" className="flex flex-col @container">
      <LightDecor />
      <CardHead
        look="light"
        icon={
          <IconBadge tone="green" size="lg">
            <CalendarCheck strokeWidth={1.75} />
          </IconBadge>
        }
        title={pick(serviceTypes.onDemand)}
        lead={pick(ON_DEMAND.lead)}
      />
      <FieldList look="light">
        <Field look="light" label={pick(FIELDS.requestKind)}>
          <EitherOr look="light" options={requestKinds} ticks or={or} />
        </Field>
        <Field look="light" label={pick(FIELDS.duration)}>
          <EitherOr look="light" options={durationUnits} icons={[Clock3, CalendarDays]} or={or} />
        </Field>
        <Field look="light" label={pick(FIELDS.days)} hint={pick(HINTS.youChoose)}>
          <WeekStrip look="light" ticked={SAMPLE_JOB_DAY} />
        </Field>
        <Field look="light" label={pick(FIELDS.period)}>
          <Periods look="light" />
        </Field>
      </FieldList>
      {/* The note goes down with the button, so the spare height falls after the fields. */}
      <div className="mt-auto">
        <OccasionsNote />
        <CardAction label={pick(ON_DEMAND.cta)} message={pick(ON_DEMAND.message)} />
      </div>
    </Panel>
  );
}

function ContractCard() {
  const { pick } = useLocale();
  return (
    <Panel as="article" tone="deep" className="flex flex-col @container">
      <DeepDecor />
      <CardHead
        look="dark"
        icon={
          <IconBadge tone="gold" size="lg">
            <FileSignature strokeWidth={1.75} />
          </IconBadge>
        }
        title={pick(serviceTypes.contract)}
        lead={pick(CONTRACT.lead)}
      />
      <FieldList look="dark">
        <Field look="dark" label={pick(FIELDS.contractLength)}>
          <PillGrid look="dark" options={contractDurations} />
        </Field>
        <Field look="dark" label={pick(FIELDS.visits)} hint={pick(HINTS.visits)}>
          <VisitsMeter lit={SAMPLE_VISITS} />
        </Field>
        <Field look="dark" label={pick(FIELDS.days)} hint={pick(HINTS.week)}>
          <WeekStrip look="dark" ticked={SAMPLE_CONTRACT_DAYS} />
        </Field>
        <Field look="dark" label={pick(FIELDS.period)}>
          <Periods look="dark" />
        </Field>
        <Field look="dark" label={pick(FIELDS.paymentFrequency)}>
          <PillGrid look="dark" options={paymentFrequencies} wide="wrap" />
        </Field>
      </FieldList>
      <CardAction label={pick(CONTRACT.cta)} message={pick(CONTRACT.message)} />
    </Panel>
  );
}

function CardHead({ look, icon, title, lead }: { look: Look; icon: ReactNode; title: string; lead: string }) {
  return (
    <header>
      <div className="flex items-center gap-4">
        {icon}
        <h3 className={cn("text-h3", look === "dark" && "text-white")}>{title}</h3>
      </div>
      <p className={cn("mt-4 max-w-md text-[1.0625rem]", look === "light" ? "text-ink-600" : "text-navy-100")}>{lead}</p>
    </header>
  );
}

/** The card's WhatsApp pill, at its foot; full width on a phone. */
function CardAction({ label, message }: { label: string; message: string }) {
  const { pick } = useLocale();
  return (
    <div className="mt-auto pt-8">
      <Button variant="whatsapp" size="lg" href={whatsappHref(message)} icon={<WhatsAppIcon />} className="w-full sm:w-auto">
        {label}
        <span className="sr-only"> ({pick(CTA.whatsappShort)})</span>
      </Button>
    </div>
  );
}

/** On the on-demand card: the programmed occasions it suits, and the way to them. */
function OccasionsNote() {
  const { pick } = useLocale();
  return (
    <div className="mt-3 flex items-start gap-3.5 rounded-tile bg-gold-50 p-4 ring-1 ring-gold-100 sm:mt-4 sm:p-5">
      <IconBadge tone="gold" size="sm">
        <PartyPopper strokeWidth={1.75} />
      </IconBadge>
      <p className="text-[0.95rem] text-ink-700">
        {pick(ON_DEMAND.occasions)}{" "}
        <a
          href={`#${SECTION_IDS.services}`}
          className="inline-flex items-center gap-1 font-display font-medium whitespace-nowrap text-navy-900 underline decoration-gold-400 decoration-2 underline-offset-[5px] transition-colors hover:decoration-navy-900"
        >
          {pick(ON_DEMAND.occasionsLink)}
          <ForwardArrow className="size-4" />
        </a>
      </p>
    </div>
  );
}

// ── Decoration ────────────────────────────────────────────────────────────────

/** Faint rings and a green glow in the light card's far corner. */
function LightDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -end-36 -top-44 size-[26rem] rounded-full bg-green-50 blur-2xl" />
      <div className="absolute -end-28 -top-28 size-72 rounded-full border border-green-100" />
      <div className="absolute -end-44 -top-44 size-[26rem] rounded-full border border-ink-200/50" />
    </div>
  );
}

/** The contract card: a deep gradient, rings in the far corner, a gold dot on one. */
function DeepDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-navy-800 via-navy-900 to-navy-950" />
      <div className="absolute -end-40 -top-48 size-[30rem] rounded-full bg-navy-600/25 blur-3xl" />
      <div className="absolute -end-28 -top-28 size-72 rounded-full border border-white/10" />
      <div className="absolute -end-44 -top-44 size-[26rem] rounded-full border border-white/[0.07]" />
      <div className="absolute -end-60 -top-60 size-[34rem] rounded-full border border-white/[0.05]" />
      {/* On the inner ring, 1 rem from the top edge: above the content at every width. */}
      <div className="absolute end-[10.7rem] top-[0.75rem] size-2 rounded-full bg-gold-400 ring-4 ring-gold-400/20" />
    </div>
  );
}

// ── The strip under the cards ─────────────────────────────────────────────────

/** "À la charge du client" → "à la charge du client" in the middle of a sentence. */
function lowerFirst(text: string, locale: Locale): string {
  return locale === "ar" ? text : text.charAt(0).toLocaleLowerCase(locale) + text.slice(1);
}

/** Items of a list from facts.ts, divided by small gold dots. */
function Dotted({ items }: { items: Localized[] }) {
  const { pick } = useLocale();
  return (
    <>
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span aria-hidden className="text-gold-500">
              {" · "}
            </span>
          )}
          <span className="whitespace-nowrap">{pick(item)}</span>
        </Fragment>
      ))}
    </>
  );
}

function PracticalStrip() {
  const { pick, locale } = useLocale();
  // «مواد التنظيف وتوفير النقل» / «على عاتق المركز أو على عاتق صاحبها، كما ينص العقد», from facts.ts.
  const borneTitle = pick(bornItems.materials) + pick(PRACTICAL.borne.and) + lowerFirst(pick(bornItems.transport), locale);
  const borne =
    pick(bearers[0]) + pick(PRACTICAL.borne.or) + lowerFirst(pick(bearers[1]), locale) + pick(PRACTICAL.borne.tail);
  const items: Array<{ icon: LucideIcon; tone: Exclude<Tone, "deep">; title: ReactNode; text: ReactNode }> = [
    { icon: Banknote, tone: "green", title: pick(PRACTICAL.payment), text: <Dotted items={paymentMethods} /> },
    { icon: SprayCan, tone: "navy", title: borneTitle, text: borne },
    { icon: ScanSearch, tone: "gold", title: pick(PRACTICAL.price.title), text: pick(PRACTICAL.price.text) },
  ];
  return (
    <ul className="mt-4 grid rounded-card bg-white px-5 shadow-soft ring-1 ring-ink-200/70 sm:mt-5 sm:px-7 md:grid-cols-3 md:px-1 md:py-7 lg:mt-6 lg:px-2">
      {items.map(({ icon: Icon, tone, title, text }, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-4 py-5 md:flex-col md:gap-3 md:px-6 md:py-0 lg:flex-row lg:gap-4",
            i > 0 && "border-t border-ink-200/70 md:border-t-0 md:border-s",
          )}
        >
          <IconBadge tone={tone} size="sm">
            <Icon strokeWidth={1.75} />
          </IconBadge>
          <div className="min-w-0">
            <p className="font-display font-medium text-navy-950">{title}</p>
            <p className="mt-1 text-[0.95rem] text-ink-600">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
