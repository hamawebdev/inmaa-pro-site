import type { ReactNode } from "react";

/**
 * Text that reads left to right inside Arabic: a phone number, an e-mail
 * address, a code like «F3». Without it Arabic shows «0659 53 81 83» as
 * «83 81 53 0659».
 */
export function Ltr({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <bdi dir="ltr" className={className}>
      {children}
    </bdi>
  );
}
