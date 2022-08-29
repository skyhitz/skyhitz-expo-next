import React, { useEffect, useState } from "react";
import { User } from "app/api/graphql";
import { usersIndex } from "app/api/algolia";
import { FlatList } from "react-native";
import { MakerListEntry } from "app/ui/maker-list-entry";

export function BeatmakersSearchResultList() {
  const [searchResult, setSearchResult] = useState<User[]>([]);

  useEffect(() => {
    usersIndex.search<User>("ala").then(({ hits }) => setSearchResult(hits));
  }, []);

  return (
    <FlatList
      data={searchResult}
      renderItem={({ item }) => <MakerListEntry user={item} />}
    />
  );
}
