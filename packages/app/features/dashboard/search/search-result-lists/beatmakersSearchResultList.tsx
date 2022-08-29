import React, { useMemo } from "react";
import { SearchResultList } from "app/features/dashboard/search/search-result-lists/index";
import { usersIndex } from "app/api/algolia";
import { User } from "app/api/graphql";
import { MakerListEntry } from "app/ui/maker-list-entry";

export function BeatmakersSearchResultList({
  searchFraze,
}: {
  searchFraze: string;
}) {
  const searchFn = useMemo(() => {
    return (_fraze: string) =>
      usersIndex.search<User>(_fraze).then(({ hits }) => hits);
  }, []);

  return (
    <SearchResultList
      searchFraze={searchFraze}
      searchFn={searchFn}
      renderItem={({ item }) => <MakerListEntry user={item} />}
      emptyListText="No beatmakers found"
    />
  );
}
