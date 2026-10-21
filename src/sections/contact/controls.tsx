import { ChevronDown } from "lucide-react";
import type { ChangeEventHandler, ReactNode } from "react";

import { cn } from "@/components/cn";
import { TickBox } from "@/components/TickBox";

/**
 * Real radio and checkbox inputs, drawn as his form's ☐ boxes on rounded pills.
 * The input itself is hidden from sight but not from the keyboard or a screen
 * reader; the label carries the focus ring.
 */

const FOCUS = "has-[:focus-visible]:outline-[2.5px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy-500";

interface InputProps {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function HiddenInput({ type, name, value, checked, onChange }: InputProps) {
  return <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />;
}

/** A group of choices with his label as its legend. */
export function Group({
  legend,
  hint,
  className,
  children,
}: {
  legend: ReactNode;
  /** Muted words after the legend. */
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="float-start w-full font-display text-[0.95rem] font-semibold text-navy-950">
        {legend}
        {hint && (
          <span className="text-[0.875rem] font-normal whitespace-nowrap text-ink-500">
            <span aria-hidden className="mx-2">
              ·
            </span>
            {hint}
          </span>
        )}
      </legend>
      <div className="clear-both pt-3">{children}</div>
    </fieldset>
  );
}

/**
 * A native select drawn as a pill, with the tick box at its start: ticked once
 * something is chosen. Its first option is the empty one, so the answer can be
 * taken back.
 */
export function SelectPill({
  id,
  value,
  onChange,
  className,
  children,
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  children: ReactNode;
}) {
  const chosen = value !== "";
  return (
    <div className={cn("relative", className)}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          "h-12 w-full min-w-0 cursor-pointer appearance-none truncate rounded-full ps-12 pe-11 font-display text-[0.9375rem]",
          "transition-[background-color,box-shadow,color] duration-200",
          chosen
            ? "bg-green-50 text-navy-950 ring-[1.5px] ring-green-600"
            : "bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
        )}
      >
        {children}
      </select>
      <TickBox checked={chosen} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2" />
      <ChevronDown
        aria-hidden
        strokeWidth={1.75}
        className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-ink-500"
      />
    </div>
  );
}

/** A pill with a tick box: a way to hire, a duration, a day, a period. */
export function OptionPill({ className, children, ...input }: InputProps & { className?: string; children: ReactNode }) {
  return (
    <label
      className={cn(
        "relative flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 py-2 font-display text-[0.9375rem] leading-6 whitespace-nowrap select-none sm:gap-2.5 sm:px-4",
        "transition-[background-color,box-shadow,color] duration-200",
        FOCUS,
        input.checked
          ? "bg-green-50 text-navy-950 ring-[1.5px] ring-green-600"
          : "bg-white text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50 hover:text-navy-950 hover:ring-ink-300",
        className,
      )}
    >
      <HiddenInput {...input} />
      <TickBox checked={input.checked} />
      <span className="min-w-0">{children}</span>
    </label>
  );
}

/** A division: its icon over its name, the tick box in the corner. */
export function TileOption({
  icon,
  className,
  children,
  ...input
}: InputProps & { icon: ReactNode; className?: string; children: ReactNode }) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer flex-col items-center gap-2.5 rounded-tile px-1.5 pt-5 pb-3.5 text-center select-none xs:px-2",
        "transition-[background-color,box-shadow] duration-200",
        FOCUS,
        input.checked ? "bg-green-50 ring-[1.5px] ring-green-600" : "bg-white ring-1 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
        className,
      )}
    >
      <HiddenInput {...input} />
      <TickBox checked={input.checked} className="absolute top-2.5 end-2.5" />
      {icon}
      <span className="font-display text-[0.875rem] leading-6 text-navy-950 hyphens-auto xs:text-[0.9375rem]">{children}</span>
    </label>
  );
}

/** A number in a round pill (the visits a week); `label` is what a screen reader hears. */
export function NumberOption({ label, number, className, ...input }: InputProps & { label: string; number: number; className?: string }) {
  return (
    <label
      className={cn(
        "relative grid h-11 cursor-pointer place-items-center rounded-full font-display text-[1.05rem] font-medium select-none",
        "transition-[background-color,box-shadow,color] duration-200",
        FOCUS,
        input.checked
          ? "bg-green-600 text-white shadow-button ring-[1.5px] ring-green-600"
          : "bg-white text-navy-900 ring-1 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
        className,
      )}
    >
      <HiddenInput {...input} />
      <span aria-hidden>{number}</span>
      <span className="sr-only">{label}</span>
    </label>
  );
}
