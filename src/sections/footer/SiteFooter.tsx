import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { FacebookIcon, WhatsAppIcon } from "@/components/icons";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Container } from "@/components/layout";
import { Logo } from "@/components/Logo";
import { Ltr } from "@/components/Ltr";
import { centre, contact } from "@/content/facts";
import { contactLinks, CTA, NAV, telHref } from "@/content/site";
import { useLocale } from "@/i18n/locale";
import { EmailText } from "@/sections/contact/ContactWays";

import { FOOTER } from "./content";

const LINK = "rounded-sm text-ink-600 transition-colors duration-200 hover:text-navy-900";

function ContactLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden className="mt-[3px] grid size-5 shrink-0 place-items-center text-navy-600 [&_svg]:size-[18px]">
        {icon}
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

/** On paper, after a hairline: who the centre is, the menu, every way to reach it, the language switch. */
export function SiteFooter() {
  const { locale, pick } = useLocale();
  const links = contactLinks(locale);
  const year = new Date().getFullYear();
  const activities = [centre.activities.cleaning, centre.activities.training, centre.activities.statistics];

  return (
    <footer className="pb-8 sm:pb-10">
      <Container>
        <div className="relative border-t border-ink-200 pt-12 sm:pt-14 lg:pt-16">
          <span aria-hidden className="absolute -top-px start-0 h-px w-20 bg-gold-500" />

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-12 lg:gap-x-10">
            <div className="sm:col-span-2 lg:col-span-5">
              <a href="#top" className="inline-flex rounded-full">
                <Logo size="lg" />
              </a>
              <p className="mt-6 max-w-sm font-display text-[1.05rem] leading-relaxed font-medium text-navy-950">
                {pick(centre.fullName)}
              </p>
              <p className="mt-2 flex items-start gap-3 text-[0.95rem] text-ink-600">
                <span aria-hidden className="mt-[0.85em] h-px w-6 shrink-0 bg-gold-500" />
                {pick(centre.tagline)}
              </p>
              <p className="mt-5 font-display text-[0.875rem] text-ink-500">
                <span className="sr-only">{pick(FOOTER.activities)}: </span>
                {activities.map((activity, index) => (
                  <span key={activity.en}>
                    {index > 0 && (
                      <span aria-hidden className="mx-2 text-gold-500">
                        ·
                      </span>
                    )}
                    {pick(activity)}
                  </span>
                ))}
              </p>
            </div>

            <nav aria-labelledby="footer-menu" className="lg:col-span-3">
              <p id="footer-menu" className="font-display text-[0.95rem] font-semibold text-navy-950">
                {pick(FOOTER.menu)}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem] sm:grid-cols-1">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className={LINK}>
                      {pick(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-4">
              <p className="font-display text-[0.95rem] font-semibold text-navy-950">{pick(FOOTER.contact)}</p>
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                <ContactLine icon={<Phone strokeWidth={1.75} />}>
                  <a href={telHref} className={LINK}>
                    <Ltr>{contact.phoneDisplay}</Ltr>
                  </a>
                </ContactLine>
                <ContactLine icon={<WhatsAppIcon />}>
                  <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {pick(CTA.whatsapp)}
                  </a>
                </ContactLine>
                <ContactLine icon={<Mail strokeWidth={1.75} />}>
                  <a href={links.mailto} className={LINK}>
                    <EmailText />
                  </a>
                </ContactLine>
                <ContactLine icon={<MapPin strokeWidth={1.75} />}>
                  <span className="text-ink-600">
                    {pick(centre.city)}
                    {locale === "ar" ? "، " : ", "}
                    {pick(centre.country)}
                  </span>
                </ContactLine>
                <ContactLine icon={<FacebookIcon />}>
                  <span className="text-ink-600">
                    <span className="sr-only">{pick(FOOTER.facebook)}: </span>
                    <span lang="ar">{contact.facebookPage}</span>
                    {locale !== "ar" && (
                      <span lang="en" className="text-ink-500">
                        {" · "}
                        {contact.facebookPageLatin}
                      </span>
                    )}
                  </span>
                </ContactLine>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col-reverse items-start gap-5 border-t border-ink-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
            <p className="text-[0.875rem] text-ink-500">
              © {year} {pick(centre.shortName)}
            </p>
            <LanguageSwitch />
          </div>
        </div>
      </Container>
    </footer>
  );
}
