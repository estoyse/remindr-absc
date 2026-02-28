import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo } from "react";
import { createListCollection } from "@chakra-ui/react";
import { TaskApi } from "../api/api";
import { useDebounce } from "./use-debounce";
import { type SelectItem } from "../types";

interface UsePerformersProps {
  search: string;
  isTeamMode: boolean;
}

export function usePerformers({ search, isTeamMode }: UsePerformersProps) {
  const debouncedSearch = useDebounce(search, 300);
  const isDebouncing = search !== debouncedSearch;

  const query = useQuery({
    queryKey: ["performers", debouncedSearch, isTeamMode],
    queryFn: () => TaskApi.getPerformers(debouncedSearch, isTeamMode),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  const collection = useMemo(() => {
    return createListCollection<SelectItem>({
      items: (query.data || []).map(item => ({
        label: item.name,
        value: item.id,
        avatar: item.avatar,
      })),
    });
  }, [query.data]);

  return {
    ...query,
    collection,
    isDebouncing,
    isLoading: query.isLoading || query.isFetching || isDebouncing,
  };
}
