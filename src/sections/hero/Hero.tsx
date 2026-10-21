import { CalendarCheck, Check, ClipboardCheck, Mail, Phone, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

import emblem from "@/assets/emblem.png";
import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { DIVISION_ICON, DIVISION_TONE } from "@/components/divisionLook";
import { WhatsAppIcon } from "@/components/icons";
import { Container, Eyebrow, Section } from "@/components/layout";
import { Ltr } from "@/components/Ltr";
import { Chip, IconBadge } from "@/components/surfaces";
import { TickBox } from "@/components/TickBox";
import { centre, contact, dayPeriods, divisions, serviceTypes, workDays } from "@/content/facts";
import { CTA, contactLinks } from "@/content/site";
import { useLocale, type Locale } from "@/i18n/locale";

import { FORM_TICKS, heroText } from "./content";

/**
 * The page's opening: the copy on the start side (warby parker, campaign
 * monitor), and on the end side a request form drawn from his, with cards
 * floating round it on a soft gradient (alma). No photos.
 */
export function Hero() {
  const { locale, pick } = useLocale();
  const links = contactLinks(locale);
  const title = pick(heroText.title);

  return (
    <Section id="top" labelledBy="hero-title" className="pt-8 pb-14 sm:pt-12 sm:pb-16 lg:pt-12 lg:pb-16">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10 xl:gap-16">
          <div className="flex flex-col items-start text-start">
            <Eyebrow>{pick(heroText.eyebrow)}</Eyebrow>

            <h1 id="hero-title" className="mt-5 text-display">
              {title.before}
              <span className="relative isolate whitespace-nowrap">
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-[-0.06em] -z-10 rounded-full bg-gold-200/80",
                    // Arabic letters join on the baseline: the highlight sits under it, not across it.
                    locale === "ar" ? "-bottom-[0.02em] h-[0.2em]" : "bottom-[0.1em] h-[0.3em]",
                  )}
                />
                {title.mark}
              </span>
              {title.after}
              {title.line2 && <span className="block">{title.line2}</span>}
            </h1>

            <p className="mt-5 max-w-xl text-lead text-ink-600">
              <Lead template={pick(heroText.lead)} locale={locale} />
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button href={links.whatsapp} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
                {pick(CTA.whatsapp)}
              </Button>
              <Button href={links.tel} variant="outline" size="lg" icon={<Phone strokeWidth={1.75} />}>
                {pick(CTA.call)}
              </Button>
            </div>

            <ul className="mt-7 flex flex-col gap-2.5 text-[0.95rem] text-ink-600">
              <li>
                <a
                  href={links.mailto}
                  className="inline-flex items-center gap-2.5 rounded-full text-navy-800 underline decoration-navy-200 decoration-1 underline-offset-[0.3em] transition-colors duration-200 hover:text-navy-950 hover:decoration-navy-400"
                >
                  <Mail aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-ink-500" />
                  <span className="sr-only">{pick(heroText.emailLabel)} </span>
                  <Ltr>{contact.email}</Ltr>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-pretty">
                <ClipboardCheck aria-hidden strokeWidth={1.75} className="mt-[0.2em] size-5 shrink-0 text-green-600" />
                {pick(heroText.priceNote)}
              </li>
            </ul>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </Section>
  );
}

/** The lead sentence, the four division names from facts.ts set a little darker. */
function Lead({ template, locale }: { template: string; locale: Locale }) {
  const [before, after] = template.split("{divisions}");
  const names = divisions.map((division) => {
    const name = division.name[locale];
    // Inside a French or English sentence the names are common nouns.
    return locale === "ar" ? name : name.charAt(0).toLowerCase() + name.slice(1);
  });
  const parts = new Intl.ListFormat(locale === "en" ? "en-GB" : locale, { type: "conjunction" }).formatToParts(names);
  return (
    <>
      {before}
      {parts.map((part, i) =>
        part.type === "element" ? (
          <span key={i} className="font-medium text-navy-900">
            {part.value}
          </span>
        ) : (
          part.value
        ),
      )}
      {after}
    </>
  );
}

// ── The visual ────────────────────────────────────────────────────────────────

/**
 * The form in the middle; the floating cards sit in the bands above and below
 * it and cross the panel's edges, so none of them hides a line of the form.
 */
function HeroVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[36rem] lg:max-w-none">
      <Backdrop />
      <div className="px-4 pt-16 pb-28 xs:px-6 sm:px-12 sm:pt-24 sm:pb-28 lg:px-8 lg:pt-22 lg:pb-26 xl:px-12">
        <RequestCard />
      </div>
      <FirstVisitCard className="-top-3 start-3 -rotate-2 sm:-top-4 sm:-start-3 lg:-start-5" />
      {/* Beside the first card from a tablet up, except where the column is too narrow for both. */}
      <TeamCard className="top-3 -end-2 hidden rotate-3 [animation-delay:-2.4s] sm:flex lg:hidden xl:-end-3 xl:flex" />
      <DivisionsCard className="inset-x-3 -bottom-4 rotate-1 [animation-delay:-4.6s] sm:inset-x-auto sm:-end-3 sm:-bottom-5 sm:rotate-2 xl:-end-5" />
    </div>
  );
}

/** The rounded panel the visual sits on: soft blends of navy, green and gold, and a few of his ☐ boxes. */
function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-card bg-navy-50 sm:rounded-panel">
      <div className="absolute -end-24 -top-28 size-[26rem] rounded-full bg-green-100/90 blur-3xl" />
      <div className="absolute -start-24 -bottom-32 size-[26rem] rounded-full bg-gold-100 blur-3xl" />
      <div className="absolute start-1/4 top-1/3 size-72 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute start-7 bottom-7 hidden grid-cols-3 gap-2 sm:grid">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "grid size-4 place-items-center rounded-[0.35rem]",
              [1, 3, 8].includes(i) ? "bg-green-500/55 text-white" : "ring-[1.5px] ring-navy-200",
            )}
          >
            {[1, 3, 8].includes(i) && <Check strokeWidth={3} className="size-2.5" />}
          </span>
        ))}
      </div>
    </div>
  );
}

/** «طلب خدمة تنظيف»: his letterhead, three rows of his form, his tagline as the signature. */
function RequestCard() {
  const { pick } = useLocale();
  const form = heroText.form;
  return (
    <div className="relative mx-auto w-full max-w-[24rem] rounded-card bg-white p-5 shadow-float ring-1 ring-ink-200/70 xs:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white ring-1 ring-ink-200/80">
          <img src={emblem} alt="" width={256} height={256} className="size-10" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.8125rem] leading-snug text-ink-500">{pick(centre.fullName)}</p>
          <p className="font-display text-[1.125rem] leading-snug font-semibold text-navy-950">{pick(form.title)}</p>
        </div>
      </div>

      <div aria-hidden className="mt-4 flex flex-col gap-3.5 border-t border-dashed border-ink-200 pt-4">
        <FormRow label={pick(form.serviceType)}>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(serviceTypes) as Array<keyof typeof serviceTypes>).map((key) => (
              <Option key={key} checked={key === FORM_TICKS.serviceType}>
                {pick(serviceTypes[key])}
              </Option>
            ))}
          </div>
        </FormRow>
        <FormRow label={pick(form.days)}>
          <div className="grid grid-cols-3 gap-2">
            {workDays.map((day, i) => (
              <Option key={i} checked={(FORM_TICKS.days as readonly number[]).includes(i)}>
                {pick(day.short)}
              </Option>
            ))}
          </div>
        </FormRow>
        <FormRow label={pick(form.period)}>
          <div className="flex flex-wrap gap-2">
            {dayPeriods.map((period, i) => (
              <Option key={i} checked={FORM_TICKS.period === i}>
                {pick(period)}
              </Option>
            ))}
          </div>
        </FormRow>
      </div>

      {/* The foot of his forms: the stamp, and his tagline as the signature. */}
      <div className="mt-4 flex items-center gap-4 border-t border-dashed border-ink-200 pt-3.5">
        <span aria-hidden className="grid size-14 shrink-0 -rotate-12 place-items-center rounded-full ring-[1.5px] ring-gold-300 ring-offset-2">
          <img src={emblem} alt="" width={256} height={256} className="size-10 opacity-85" />
        </span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <span aria-hidden className="h-[1.5px] w-8 rounded-full bg-gold-500" />
          <p className="font-display text-[0.98rem] font-medium text-navy-900">{pick(centre.tagline)}</p>
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 font-display text-[0.8125rem] font-medium text-ink-500">{label}</p>
      {children}
    </div>
  );
}

function Option({ checked, children }: { checked: boolean; children: ReactNode }) {
  return (
    <Chip tone={checked ? "green" : "white"} className="ps-2">
      <TickBox checked={checked}>{children}</TickBox>
    </Chip>
  );
}

// ── The floating cards ────────────────────────────────────────────────────────

function Floating({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden className={cn("absolute animate-bob rounded-tile bg-white p-3 shadow-float ring-1 ring-ink-200/60", className)}>
      {children}
    </div>
  );
}

function FirstVisitCard({ className }: { className?: string }) {
  const { pick } = useLocale();
  return (
    <Floating className={cn("flex max-w-[16rem] items-center gap-3 pe-4", className)}>
      <IconBadge tone="green" size="sm">
        <CalendarCheck strokeWidth={1.75} />
      </IconBadge>
      <div className="min-w-0">
        <p className="font-display text-[0.95rem] leading-snug font-semibold text-navy-950">{pick(heroText.firstVisit.title)}</p>
        <p className="text-[0.8125rem] leading-snug text-ink-500">{pick(heroText.firstVisit.text)}</p>
      </div>
    </Floating>
  );
}

function TeamCard({ className }: { className?: string }) {
  const { pick } = useLocale();
  return (
    <Floating className={cn("max-w-[16rem] items-center gap-3 pe-4", className)}>
      <IconBadge tone="gold" size="sm">
        <UsersRound strokeWidth={1.75} />
      </IconBadge>
      <div className="min-w-0">
        <p className="font-display text-[0.95rem] leading-snug font-semibold text-navy-950">{pick(heroText.team.title)}</p>
        <p className="text-[0.8125rem] leading-snug text-ink-500">{pick(heroText.team.text)}</p>
      </div>
    </Floating>
  );
}

function DivisionsCard({ className }: { className?: string }) {
  const { pick } = useLocale();
  return (
    <Floating className={cn("p-3 sm:w-max sm:p-3.5 sm:pe-5", className)}>
      <p className="mb-2.5 px-0.5 font-display text-[0.8125rem] font-medium text-ink-500">{pick(heroText.divisions)}</p>
      <ul className="grid grid-cols-2 gap-x-2 gap-y-2.5 sm:grid-cols-[auto_auto] sm:gap-x-5">
        {divisions.map((division) => {
          const Icon = DIVISION_ICON[division.id];
          return (
            <li key={division.id} className="flex items-center gap-2">
              <IconBadge tone={DIVISION_TONE[division.id]} size="sm">
                <Icon strokeWidth={1.75} />
              </IconBadge>
              <span className="font-display text-[0.8125rem] leading-tight font-medium text-navy-950 sm:max-w-[7rem]">{pick(division.name)}</span>
            </li>
          );
        })}
      </ul>
    </Floating>
  );
}
