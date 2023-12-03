import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { delay } from "app/helpers/delay";

export const THEMES = [
  { id: "None", name: "None" },
  { id: "Halloween", name: "Halloween" },
  { id: "Christmas", name: "Christmas" },
  { id: "Summer", name: "Summer" },
];

export const getThemes = async () => {
  return delay(100).then(() => THEMES);
};

type UseThemeOptions = {
  config?: UseQueryOptions<Array<{ id: string; name: string }>>;
};

export const useThemes = ({ config }: UseThemeOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["themes"],
    queryFn: getThemes,
  });
};
