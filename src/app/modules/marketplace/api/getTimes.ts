import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { delay } from "app/helpers/delay";

export const TIMES = [
  { id: "Latest", name: "Latest" },
  { id: "Oldest", name: "Oldest" },
  { id: "Last 24h", name: "Last 24h" },
  { id: "Last 7 days", name: "Last 7 days" },
  { id: "Last 30 days", name: "Last 30 days" },
];

export const getTimes = async () => {
  return delay(100).then(() => TIMES);
};

type UseTimeOptions = {
  config?: UseQueryOptions<Array<{ id: string; name: string }>>;
};

export const useTimes = ({ config }: UseTimeOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["times"],
    queryFn: getTimes,
  });
};
