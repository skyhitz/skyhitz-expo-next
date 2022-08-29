import React, { useEffect, useState } from "react";
import { User } from "app/api/graphql";
import { usersIndex } from "app/api/algolia";
import { FlatList } from "react-native";
import { MakerListEntry } from "app/ui/maker-list-entry";
import { useDebounce } from "app/hooks/useDebounce";

export function BeatmakersSearchResultList({
  searchFraze,
}: {
  searchFraze: string;
}) {
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const debouncedSearchFraze = useDebounce(searchFraze, 200);

  useEffect(() => {
    if (!debouncedSearchFraze) return;
    usersIndex
      .search<User>(debouncedSearchFraze)
      .then(({ hits }) => setSearchResult(hits));
  }, [debouncedSearchFraze]);

  return (
    <FlatList
      data={searchResult}
      renderItem={({ item }) => <MakerListEntry user={item} />}
    />
  );
}
