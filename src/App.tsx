import { LocaleProvider, useLocale } from "@/i18n/locale";
import { Contact } from "@/sections/contact/Contact";
import { Divisions } from "@/sections/divisions/Divisions";
import { Faq } from "@/sections/faq/Faq";
import { SiteFooter } from "@/sections/footer/SiteFooter";
import { SiteHeader } from "@/sections/header/SiteHeader";
import { Hero } from "@/sections/hero/Hero";
import { WaysToHire } from "@/sections/hire/WaysToHire";
import { Process } from "@/sections/process/Process";
import { Promises } from "@/sections/promises/Promises";
import { ProgrammedServices } from "@/sections/services/ProgrammedServices";
import { Team } from "@/sections/team/Team";

function Page() {
  const { locale, dir } = useLocale();
  return (
    // `key` remounts the page when the language changes, so nothing keeps the old direction.
    <div key={locale} dir={dir} lang={locale} className="relative flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-navy-900 px-5 py-3 font-display text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {{ ar: "انتقل إلى المحتوى", fr: "Aller au contenu", en: "Skip to content" }[locale]}
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Promises />
        <Divisions />
        <WaysToHire />
        <ProgrammedServices />
        <Process />
        <Team />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Page />
    </LocaleProvider>
  );
}
