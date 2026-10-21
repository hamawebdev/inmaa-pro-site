import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "./cn";

/**
 * His forms are rows of ☐ boxes: «السبت ☐ الأحد ☐ …». This is that box, rounded,
 * as the site's recurring motif. Ticked, it is green with a white check.
 * It draws a choice; it is not a form control.
 */
export function TickBox({
  checked = false,
  tone = "green",
  className,
  children,
}: {
  checked?: boolean;
  tone?: "green" | "navy" | "gold" | "onDark";
  className?: string;
  children?: ReactNode;
}) {
  const on = {
    green: "bg-green-600 text-white",
    navy: "bg-navy-900 text-white",
    gold: "bg-gold-500 text-white",
    onDark: "bg-white text-navy-900",
  }[tone];
  const off = tone === "onDark" ? "ring-[1.5px] ring-white/40" : "bg-white ring-[1.5px] ring-ink-300";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden className={cn("grid size-[1.15rem] shrink-0 place-items-center rounded-[0.4rem]", checked ? on : off)}>
        {checked && <Check strokeWidth={3} className="size-3" />}
      </span>
      {children}
    </span>
  );
}
