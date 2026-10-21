import { Logo } from "@/components/Logo";

/** Placeholder: replaced by the section's owner. Keep `data-site-header` on the root element. */
export function SiteHeader() {
  return (
    <header data-site-header className="sticky top-0 z-50 p-3">
      <div className="mx-auto flex max-w-[1232px] items-center rounded-full bg-white p-2 shadow-soft">
        <Logo />
      </div>
    </header>
  );
}
