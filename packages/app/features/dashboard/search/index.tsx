import { SafeAreaView } from "app/design-system/safe-area-view";
import React, { useState } from "react";
import { TabBar, Tabs } from "app/features/dashboard/search/tabs";
import { SearchInputField } from "app/features/dashboard/search/searchInputField";
import RecentlyAddedList from "app/features/dashboard/search/recently-added";
import { isEmpty } from "ramda";
import { BeatmakersSearchResultList } from "app/features/dashboard/search/search-result-lists/beatmakersSearchResultList";
import { BeatsSearchResultList } from "app/features/dashboard/search/search-result-lists/beatsSearchResultList";
import BeatmakersEmptyState from "app/features/dashboard/search/beatmakersEmptyState";

export function SearchScreen() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [tab, setTab] = useState<Tabs>("Beats");

  return (
    <SafeAreaView
      edges={["top"]}
      className="w-full max-w-6xl mx-auto flex-1 flex p-4 pb-0 bg-blue-dark"
    >
      <SearchInputField
        value={searchPhrase}
        autoCapitalize="none"
        onChangeText={setSearchPhrase}
        showX={!isEmpty(searchPhrase)}
        onXClick={() => {
          setSearchPhrase("");
        }}
      />
      <TabBar selected={tab} onTabClick={setTab} />
      {!searchPhrase && tab === "Beats" && <RecentlyAddedList />}
      {!searchPhrase && tab === "Beatmakers" && <BeatmakersEmptyState />}
      {!!searchPhrase && tab === "Beats" && (
        <BeatsSearchResultList searchPhrase={searchPhrase} />
      )}
      {!!searchPhrase && tab === "Beatmakers" && (
        <BeatmakersSearchResultList searchPhrase={searchPhrase} />
      )}
    </SafeAreaView>
  );
}
