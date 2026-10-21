import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

export type ButtonVariant = "primary" | "whatsapp" | "outline" | "light" | "outlineLight" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-display font-medium whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,box-shadow,translate] duration-200 active:translate-y-px " +
  "[&_svg]:shrink-0";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-navy-900 text-white shadow-button hover:bg-navy-800",
  whatsapp: "bg-green-600 text-white shadow-button hover:bg-green-700",
  outline: "border-[1.5px] border-navy-900/85 bg-white/70 text-navy-900 hover:bg-navy-50",
  light: "bg-white text-navy-950 shadow-button hover:bg-navy-50",
  outlineLight: "border-[1.5px] border-white/45 text-white hover:border-white/70 hover:bg-white/10",
  ghost: "text-navy-800 hover:bg-navy-50",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.9rem] [&_svg]:size-[18px]",
  md: "h-12 px-6 text-[0.98rem] [&_svg]:size-5",
  lg: "h-14 px-7 text-[1.06rem] [&_svg]:size-[22px]",
};

interface Common {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Drawn before the label (on the right in Arabic). */
  icon?: ReactNode;
  /** Drawn after the label. */
  iconEnd?: ReactNode;
  className?: string;
  children: ReactNode;
}

type AsLink = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & { href: string };
type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined };

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

/**
 * The pill button. With `href` it is a link: every call to action on this site
 * is one (WhatsApp, a phone call, an e-mail, an anchor). A WhatsApp link opens
 * in a new tab.
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", icon, iconEnd, className, children, ...rest } = props;
  const classes = buttonClasses(variant, size, className);
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {iconEnd}
    </>
  );
  if (rest.href !== undefined) {
    const anchor = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const external = anchor.href?.startsWith("http");
    return (
      <a
        {...anchor}
        className={classes}
        target={anchor.target ?? (external ? "_blank" : undefined)}
        rel={anchor.rel ?? (external ? "noopener noreferrer" : undefined)}
      >
        {inner}
      </a>
    );
  }
  const button = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...button} className={classes}>
      {inner}
    </button>
  );
}
