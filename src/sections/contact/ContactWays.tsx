import { Banknote, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { FacebookIcon, WhatsAppIcon } from "@/components/icons";
import { Ltr } from "@/components/Ltr";
import { Chip } from "@/components/surfaces";
import { centre, contact, paymentMethods } from "@/content/facts";
import { contactLinks, CTA, telHref } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { REACH } from "./content";

/** The e-mail address with a break allowed after «@», so it never runs out of a phone's width. */
export function EmailText() {
  const [user, domain] = contact.email.split("@");
  return (
    <Ltr>
      {user}@<wbr />
      {domain}
    </Ltr>
  );
}

function Row({ icon, label, children }: { icon: ReactNode; label: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 md:first:pt-1 lg:first:pt-0">
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-gold-300 ring-1 ring-white/10 [&_svg]:size-5"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.875rem] leading-6 text-navy-200">{label}</p>
        <div className="mt-0.5 font-display text-[1rem] leading-7 text-white">{children}</div>
      </div>
    </li>
  );
}

/** Every way to reach the centre: the one number for calls and WhatsApp first, then the rest. */
export function ContactWays({ className }: { className?: string }) {
  const { locale, pick } = useLocale();
  const links = contactLinks(locale);
  return (
    <div className={cn("grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-1 lg:gap-8", className)}>
      <div className="flex flex-col rounded-tile bg-white/[0.06] p-5 ring-1 ring-white/12 sm:p-6">
        <p className="flex items-center gap-2 font-display text-[0.9rem] text-navy-200">
          <Phone aria-hidden strokeWidth={1.75} className="size-[18px] text-gold-300" />
          {pick(REACH.phoneLabel)}
        </p>
        <a
          href={telHref}
          className="mt-2 self-start rounded-lg font-display text-[1.875rem] leading-snug font-semibold text-white transition-colors duration-200 hover:text-navy-100 sm:text-[2.125rem]"
        >
          <Ltr>{contact.phoneDisplay}</Ltr>
        </a>
        <p className="mt-0.5 font-display text-[0.95rem] leading-6 text-navy-100">
          <Ltr>{contact.phoneInternational}</Ltr>
        </p>
        <p className="mt-1 text-[0.9rem] leading-6 text-navy-200">{pick(REACH.phoneHint)}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <Button href={links.whatsapp} variant="whatsapp" icon={<WhatsAppIcon />} className="grow">
            {pick(CTA.whatsapp)}
          </Button>
          <Button href={telHref} variant="light" icon={<Phone strokeWidth={1.75} />} className="grow">
            {pick(CTA.call)}
          </Button>
        </div>
      </div>

      <ul aria-label={pick(REACH.listLabel)} className="divide-y divide-white/10 md:pt-1 lg:pt-0">
        <Row icon={<Mail strokeWidth={1.75} />} label={pick(REACH.email)}>
          <a
            href={links.mailto}
            className="rounded-sm text-[0.95rem] underline sm:text-[1rem] decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-gold-300"
          >
            <EmailText />
          </a>
        </Row>
        <Row icon={<MapPin strokeWidth={1.75} />} label={pick(REACH.place)}>
          {pick(centre.city)}
          {locale === "ar" ? "، " : ", "}
          {pick(centre.country)}
        </Row>
        <Row icon={<FacebookIcon />} label={pick(REACH.facebook)}>
          <span lang="ar">{contact.facebookPage}</span>
          {locale !== "ar" && (
            <span lang="en" className="block text-[0.9rem] text-navy-200">
              {contact.facebookPageLatin}
            </span>
          )}
        </Row>
        <Row icon={<Banknote strokeWidth={1.75} />} label={pick(REACH.payment)}>
          <ul className="mt-1.5 flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <li key={method.ar}>
                <Chip tone="deep">{pick(method)}</Chip>
              </li>
            ))}
          </ul>
        </Row>
      </ul>
    </div>
  );
}
