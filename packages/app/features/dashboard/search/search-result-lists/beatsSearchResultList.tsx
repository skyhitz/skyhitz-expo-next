import React from "react";
import { SearchResultList } from "app/features/dashboard/search/search-result-lists/index";
import { entriesIndex } from "app/api/algolia";
import { Entry } from "app/api/graphql";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { useAlgoliaSearch } from "app/hooks/useAlgoliaSearch";

export function BeatsSearchResultList({
  searchPhrase,
}: {
  searchPhrase: string;
}) {
  const { data, loading, error } = useAlgoliaSearch<Entry>({
    searchPhrase,
    algoliaIndex: entriesIndex,
  });

  return (
    <SearchResultList
      searchPhrase={searchPhrase}
      data={data}
      loading={loading}
      renderItem={({ item }) => <BeatListEntry entry={item} />}
      emptyListText="No beats found"
      error={!!error}
    />
  );
}
