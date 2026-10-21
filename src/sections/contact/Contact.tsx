import emblem from "@/assets/emblem.png";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Panel } from "@/components/surfaces";
import { useLocale } from "@/i18n/locale";

import { ContactWays } from "./ContactWays";
import { HEADING } from "./content";
import { RequestBuilder } from "./RequestBuilder";

/**
 * The light that makes the deep panel rich rather than flat: a slow gradient,
 * two blurred glows in the brand's green and gold, soft rings, a gold hairline,
 * his emblem as a watermark, and a faint field of his form's tick boxes. All of
 * it mirrors with the page. It clips itself, so the panel need not (see below).
 */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      <div className="absolute inset-0 bg-linear-to-br from-navy-800 via-navy-900 to-navy-950 rtl:bg-linear-to-bl" />
      <div className="absolute -start-32 -top-40 size-[30rem] rounded-full bg-green-500/25 blur-[110px]" />
      <div className="absolute -end-24 top-1/3 size-[34rem] rounded-full bg-navy-500/30 blur-[120px]" />
      <div className="absolute -bottom-44 start-1/4 size-[24rem] rounded-full bg-gold-500/20 blur-[120px]" />
      <div className="absolute -start-56 -bottom-56 size-[36rem] rounded-full border border-white/[0.07]" />
      <div className="absolute -start-[22rem] -bottom-[22rem] size-[50rem] rounded-full border border-white/[0.05]" />
      <img
        src={emblem}
        alt=""
        width={256}
        height={256}
        className="absolute -start-20 -bottom-40 hidden w-[28rem] opacity-[0.05] brightness-[2.5] grayscale lg:block"
      />
      <svg className="absolute -bottom-6 -start-6 h-72 w-96 text-white opacity-[0.07] [mask-image:radial-gradient(closest-side,black,transparent)] lg:hidden">
        <defs>
          <pattern id="contact-ticks" width="26" height="26" patternUnits="userSpaceOnUse">
            <rect x="5" y="5" width="15" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-ticks)" />
      </svg>
      <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-gold-400/70 to-transparent" />
    </div>
  );
}

/**
 * Every way to reach the centre, and a request written for the visitor. The
 * page's second dark moment.
 *
 * On a desktop the builder is the longer side; the ways to reach the centre
 * stay in sight beside it (sticky) on a window tall enough to hold them. A
 * clipping panel would stop that, so the panel lets its overflow show and the
 * backdrop clips itself.
 */
export function Contact() {
  const { pick } = useLocale();
  return (
    <Section id="contact" labelledBy="contact-title">
      <Container>
        <Panel tone="deep" className="overflow-visible!">
          <Backdrop />
          <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-16">
            <div className="flex min-w-0 flex-col gap-10 md:gap-12">
              <SectionHeading
                id="contact-title"
                tone="dark"
                eyebrow={pick(HEADING.eyebrow)}
                title={pick(HEADING.title)}
                lead={pick(HEADING.lead)}
              />
              <ContactWays className="lg:top-28 lg:[@media(min-height:50rem)]:sticky" />
            </div>
            <RequestBuilder className="min-w-0" />
          </div>
        </Panel>
      </Container>
    </Section>
  );
}
