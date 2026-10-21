import type { ReactNode } from "react";

import { cn } from "./cn";

export type Tone = "navy" | "green" | "gold" | "white" | "deep";

const PANEL_TONES: Record<Tone, string> = {
  navy: "bg-navy-50 ring-1 ring-navy-100/80",
  green: "bg-green-50 ring-1 ring-green-100",
  gold: "bg-gold-50 ring-1 ring-gold-100",
  white: "bg-white ring-1 ring-ink-200/70 shadow-soft",
  deep: "bg-navy-900 text-navy-100 ring-1 ring-navy-800",
};

/**
 * The large rounded tinted panel (Casper's offers): a section's main surface.
 * 28 px corners on a phone, 40 px from tablets up.
 */
export function Panel({
  tone = "white",
  className,
  children,
  as: Tag = "div",
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
  as?: "div" | "article" | "aside" | "li";
}) {
  return (
    <Tag className={cn("relative isolate overflow-hidden rounded-card p-6 sm:p-8 md:rounded-panel lg:p-12", PANEL_TONES[tone], className)}>
      {children}
    </Tag>
  );
}

/** A white card on paper or on a panel. */
export function Card({ className, children, as: Tag = "div" }: { className?: string; children: ReactNode; as?: "div" | "article" | "li" }) {
  return <Tag className={cn("rounded-card bg-white p-6 shadow-soft ring-1 ring-ink-200/70", className)}>{children}</Tag>;
}

const BADGE_TONES: Record<Exclude<Tone, "deep">, string> = {
  navy: "bg-navy-100/70 text-navy-800",
  green: "bg-green-100 text-green-700",
  gold: "bg-gold-100 text-gold-700",
  white: "bg-white text-navy-800 ring-1 ring-ink-200/70",
};

/**
 * A line icon on a soft rounded tile. Pass a lucide icon with
 * `strokeWidth={1.75}`; the badge sizes it.
 */
export function IconBadge({
  tone = "navy",
  size = "md",
  className,
  children,
}: {
  tone?: Exclude<Tone, "deep">;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  const sizes = {
    sm: "size-10 rounded-xl [&_svg]:size-5",
    md: "size-12 rounded-2xl [&_svg]:size-6",
    lg: "size-14 rounded-[1.1rem] [&_svg]:size-7",
  };
  return <span className={cn("inline-grid shrink-0 place-items-center", sizes[size], BADGE_TONES[tone], className)}>{children}</span>;
}

const CHIP_TONES: Record<Tone, string> = {
  white: "bg-white text-ink-700 ring-1 ring-ink-200/80",
  navy: "bg-navy-100/60 text-navy-800",
  green: "bg-green-100/70 text-green-800",
  gold: "bg-gold-100 text-gold-800",
  deep: "bg-white/10 text-white ring-1 ring-white/15",
};

/** A small pill: a space, a day, an option. */
export function Chip({ tone = "white", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.875rem] leading-6 font-medium", CHIP_TONES[tone], className)}>
      {children}
    </span>
  );
}
