import type { ReactNode } from "react";

import { cn } from "./cn";

/** The page's width: 1200 px of content, a 16 px gutter on a phone. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1232px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/**
 * One section of the page: an anchor and the vertical rhythm every section
 * shares. Sections sit on the paper; colour comes from the panels inside them.
 */
export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id: string;
  className?: string;
  children: ReactNode;
  /** The id of the section's heading. */
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-20 lg:py-28", className)}>
      {children}
    </section>
  );
}

/** The small pill over a heading: a gold dot and a few words. */
export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[0.85rem] font-medium",
        tone === "light" ? "bg-white text-navy-800 shadow-soft ring-1 ring-navy-100" : "bg-white/10 text-white ring-1 ring-white/20",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-gold-500" />
      {children}
    </span>
  );
}

/** A section's heading: eyebrow, title, and one or two sentences under it. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "start",
  tone = "light",
  className,
}: {
  /** Put it on the title and pass the same to `<Section labelledBy>`. */
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-4", align === "center" ? "mx-auto items-center text-center" : "items-start text-start", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn("text-h2", tone === "dark" && "text-white")}>
        {title}
      </h2>
      {lead && <p className={cn("max-w-2xl text-lead", tone === "light" ? "text-ink-600" : "text-navy-100")}>{lead}</p>}
    </div>
  );
}
