import { Building2, BuildingComplex, House, Store, type LucideIcon } from "lucide-react";

import type { DivisionId } from "@/content/facts";

import type { Tone } from "./surfaces";

/** One icon per division, the same in every section that draws one. */
export const DIVISION_ICON: Record<DivisionId, LucideIcon> = {
  homes: House,
  organisations: Store,
  buildings: Building2,
  complexes: BuildingComplex,
};

/** One tint per division, the same wherever a division gets its colour. */
export const DIVISION_TONE: Record<DivisionId, Exclude<Tone, "deep">> = {
  homes: "green",
  organisations: "navy",
  buildings: "gold",
  complexes: "white",
};
