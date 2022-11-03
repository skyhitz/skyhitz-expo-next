import { timestampDescEntriesIndex } from "app/api/algolia";
import { Entry } from "app/api/graphql";
import { filter } from "ramda";
import { isSome } from "app/utils";
import { usePaginatedAlgoliaSearch } from "./usePaginatedAlgoliaSearch";

export const recentlyAddedQueryKey = "recentlyAdded/page=";

const fetcher = async (key: string) => {
  const page = parseInt(key.replace(recentlyAddedQueryKey, ""), 10);
  const response = await timestampDescEntriesIndex.search<Entry>("", {
    page,
    hitsPerPage: 20,
  });
  return filter(isSome, response.hits) as NonNullable<Entry>[];
};

export function useRecentlyAdded() {
  return usePaginatedAlgoliaSearch({
    fetcher,
    commonKey: recentlyAddedQueryKey,
  });
}
