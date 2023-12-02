import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { delay } from "app/helpers/delay";

const TAGS = [
  { id: "Upper Body", name: "Upper Body" },
  { id: "Lower Body", name: "Lower Body" },
  { id: "Hat", name: "Hat" },
  { id: "Shoes", name: "Shoes" },
  { id: "Accessory", name: "Accessory" },
  { id: "Legendary", name: "Legendary" },
  { id: "Mythic", name: "Mythic" },
  { id: "Epic", name: "Epic" },
  { id: "Rare", name: "Rare" },
  { id: "Common", name: "Common" },
];

export const getTags = async () => {
  return delay(100).then(() => TAGS);
};

type UseUsersOptions = {
  config?: UseQueryOptions<Array<{ id: string; name: string }>>;
};

export const useTags = ({ config }: UseUsersOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["users"],
    queryFn: getTags,
  });
};
