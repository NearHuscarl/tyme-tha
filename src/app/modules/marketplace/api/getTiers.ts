import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { delay } from "app/helpers/delay";

export const TIERS = [
  { id: "All", name: "All" },
  { id: "Legendary", name: "Legendary" },
  { id: "Mythic", name: "Mythic" },
  { id: "Epic", name: "Epic" },
  { id: "Rare", name: "Rare" },
  { id: "Common", name: "Common" },
];

export const getTiers = async () => {
  return delay(100).then(() => TIERS);
};

type UseTierOptions = {
  config?: UseQueryOptions<Array<{ id: string; name: string }>>;
};

export const useTiers = ({ config }: UseTierOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["tiers"],
    queryFn: getTiers,
  });
};
