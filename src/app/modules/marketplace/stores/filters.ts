import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { PRICE_RANGE } from "../config";

export const DEFAULT_FILTERS = {
  query: "",
  priceRange: PRICE_RANGE,
  tier: "All",
  theme: "None",
  time: "Latest",
  priceSorting: "None",
} as const;

export type TFilterStore = {
  tags: string[];
  toggleTag: (tag: string) => void;
  query: string;
  priceRange: [start: number, end: number];
  tier: string;
  theme: string;
  time: string;
  priceSorting: string;
  setFilters: (
    filters: Omit<TFilterStore, "tags" | "toggleTag" | "setFilters">
  ) => void;
};

export const useFilterStore = create<TFilterStore>((set) => ({
  tags: ["All"],
  toggleTag: (tag) => {
    set((state) => {
      if (state.tags.includes(tag)) {
        return {
          ...state,
          tags: [...state.tags].filter((t) => t !== tag),
        };
      }
      if (tag === "All") {
        return { ...state, tags: ["All"] };
      }
      return {
        ...state,
        tags: [...state.tags, tag].filter((t) => t !== "All"),
      };
    });
  },
  query: DEFAULT_FILTERS.query,
  priceRange: DEFAULT_FILTERS.priceRange,
  tier: DEFAULT_FILTERS.tier,
  theme: DEFAULT_FILTERS.theme,
  time: DEFAULT_FILTERS.time,
  priceSorting: DEFAULT_FILTERS.priceSorting,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));

export const useFilters = () =>
  useFilterStore(useShallow(({ tags, toggleTag, ...state }) => state));
