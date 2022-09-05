import React from "react";
import { SearchResultList } from "app/features/dashboard/search/search-result-lists/index";
import { usersIndex } from "app/api/algolia";
import { User } from "app/api/graphql";
import { MakerListEntry } from "app/ui/maker-list-entry";
import { useAlgoliaSearch } from "app/hooks/useAlgoliaSearch";

export function BeatmakersSearchResultList({
  searchPhrase,
}: {
  searchPhrase: string;
}) {
  const { data, loading, error } = useAlgoliaSearch<User>({
    searchPhrase,
    algoliaIndex: usersIndex,
  });

  return (
    <SearchResultList
      searchPhrase={searchPhrase}
      data={data}
      loading={loading}
      renderItem={({ item }) => <MakerListEntry user={item} />}
      emptyListText="No beatmakers found"
      error={!!error}
    />
  );
}
