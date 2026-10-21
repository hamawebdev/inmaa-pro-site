import { Menu, Phone, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/Button";
import { cn } from "@/components/cn";
import { ForwardChevron, WhatsAppIcon } from "@/components/icons";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Container } from "@/components/layout";
import { Logo } from "@/components/Logo";
import { CTA, NAV, contactLinks } from "@/content/site";
import { useLocale } from "@/i18n/locale";

import { headerText } from "./content";

/**
 * From here up the menu sits in the bar and the folded menu closes (Tailwind's
 * `xl`): below it the French menu, the switch and the WhatsApp pill don't fit
 * beside the logo.
 */
const WIDE = "(min-width: 80rem)";

/**
 * The floating, rounded, sticky bar (alma): the logo on the start side, the
 * menu in the middle, the language switch and the WhatsApp pill at the end.
 * Below `xl` the menu, the calls and the switch fold into a panel under the
 * bar; the switch stays in the bar from 416 px, the WhatsApp pill from `md`.
 */
export function SiteHeader() {
  const { locale, pick } = useLocale();
  const links = contactLinks(locale);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // While the phone menu is open: Escape, a press outside it, or a window grown wide closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const wide = window.matchMedia(WIDE);
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header data-site-header className="pointer-events-none sticky top-0 z-50 pt-3 sm:pt-4">
      <Container>
        <div ref={wrapRef} className="pointer-events-auto relative">
          <div className="flex h-16 items-center gap-2 rounded-full bg-white/85 ps-2.5 pe-2.5 shadow-soft ring-1 ring-ink-200/70 backdrop-blur-xl">
            <a href="#top" aria-label={pick(headerText.home)} onClick={close} className="flex min-w-0 shrink items-center rounded-full pe-2">
              <Logo />
            </a>

            <nav aria-label={pick(headerText.nav)} className="mx-auto hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-full px-3 py-2 font-display text-[0.95rem] font-medium whitespace-nowrap text-ink-700 transition-colors duration-200 hover:bg-navy-50 hover:text-navy-900"
                    >
                      {pick(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ms-auto flex shrink-0 items-center gap-2 xl:ms-0">
              {/* Wrapped: the switch and the button set their own `inline-flex`, which a `hidden` beside it would not beat. */}
              <div className="hidden xs:flex">
                <LanguageSwitch />
              </div>
              <div className="hidden md:flex">
                <Button href={links.whatsapp} variant="whatsapp" size="sm" icon={<WhatsAppIcon />}>
                  {pick(CTA.whatsappShort)}
                </Button>
              </div>
              <button
                ref={buttonRef}
                type="button"
                aria-label={pick(headerText.menu)}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((was) => !was)}
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-200 xl:hidden",
                  open ? "bg-navy-900 text-white hover:bg-navy-800" : "bg-navy-50 text-navy-900 ring-1 ring-navy-100 hover:bg-navy-100",
                )}
              >
                {open ? (
                  <X aria-hidden strokeWidth={1.75} className="size-[22px]" />
                ) : (
                  <Menu aria-hidden strokeWidth={1.75} className="size-[22px]" />
                )}
              </button>
            </div>
          </div>

          <div
            id={panelId}
            hidden={!open}
            className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6.5rem)] sm:start-auto sm:w-[23rem] overflow-y-auto overscroll-contain rounded-card bg-white p-3 shadow-float ring-1 ring-ink-200/70 transition-[opacity,translate] duration-200 starting:-translate-y-1 starting:opacity-0 sm:p-4 xl:hidden"
          >
            <nav aria-label={pick(headerText.nav)}>
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={close}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 font-display text-[1.02rem] font-medium text-navy-950 transition-colors duration-200 hover:bg-navy-50"
                    >
                      {pick(item.label)}
                      <ForwardChevron strokeWidth={1.75} className="size-5 text-ink-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-2 grid gap-2.5 border-t border-ink-200/70 px-1 pt-4">
              <Button href={links.whatsapp} variant="whatsapp" icon={<WhatsAppIcon />} onClick={close} className="w-full">
                {pick(CTA.whatsapp)}
              </Button>
              <Button href={links.tel} variant="outline" icon={<Phone strokeWidth={1.75} />} onClick={close} className="w-full">
                {pick(CTA.call)}
              </Button>
            </div>
            {/* Only where the bar has no room for the switch. */}
            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-ink-50 py-2 ps-4 pe-2 xs:hidden">
              <span className="font-display text-[0.92rem] font-medium text-ink-600">{pick(headerText.language)}</span>
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
