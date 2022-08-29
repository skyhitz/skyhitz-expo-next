import React, { useMemo } from "react";
import { SearchResultList } from "app/features/dashboard/search/search-result-lists/index";
import { entriesIndex } from "app/api/algolia";
import { Entry } from "app/api/graphql";
import { BeatListEntry } from "app/ui/beat-list-entry";

export function BeatsSearchResultList({
  searchFraze,
}: {
  searchFraze: string;
}) {
  const searchFn = useMemo(() => {
    return (_fraze: string) =>
      entriesIndex.search<Entry>(_fraze).then(({ hits }) => hits);
  }, []);

  return (
    <SearchResultList
      searchFraze={searchFraze}
      searchFn={searchFn}
      renderItem={({ item }) => <BeatListEntry entry={item} />}
      emptyListText="No beats found"
    />
  );
}
