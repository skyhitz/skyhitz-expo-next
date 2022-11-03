import { ratingEntriesIndex } from "app/api/algolia";
import { Entry } from "app/api/graphql";
import { filter } from "ramda";
import { isSome } from "app/utils";
import { usePaginatedAlgoliaSearch } from "./usePaginatedAlgoliaSearch";

export const topChartQueryKey = "topChart/page=";

const fetcher = async (key: string) => {
  const page = parseInt(key.replace(topChartQueryKey, ""), 10);
  const response = await ratingEntriesIndex.search<Entry>("", {
    page,
    hitsPerPage: 20,
  });
  return filter(isSome, response.hits) as NonNullable<Entry>[];
};

export function useTopChart() {
  return usePaginatedAlgoliaSearch({ fetcher, commonKey: topChartQueryKey });
}
