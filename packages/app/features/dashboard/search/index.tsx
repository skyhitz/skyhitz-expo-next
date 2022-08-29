import { SafeAreaView } from "app/design-system/safe-area-view";
import React, { useState } from "react";
import { TabBar, Tabs } from "app/features/dashboard/search/tabs";
import { SearchInputField } from "app/features/dashboard/search/search-input-field";
import RecentlyAddedList from "app/features/dashboard/search/recently-added";
import { isEmpty } from "ramda";
import { BeatmakersSearchResultList } from "app/features/dashboard/search/beatmakersSearchResultList";

export function SearchScreen() {
  const [searchFraze, setSearchFraze] = useState("");
  const [tab, setTab] = useState<Tabs>("Beats");

  return (
    <SafeAreaView
      edges={["top"]}
      className="w-full max-w-6xl mx-auto flex-1 flex p-4 pb-0 bg-blue-dark"
    >
      <SearchInputField
        value={searchFraze}
        autoCapitalize="none"
        onChangeText={setSearchFraze}
        showX={!isEmpty(searchFraze)}
        onXClick={() => {
          setSearchFraze("");
        }}
      />
      <TabBar selected={tab} onTabClick={setTab} />
      {!searchFraze && <RecentlyAddedList />}
      {!isEmpty(searchFraze) && tab === "Beatmakers" && (
        <BeatmakersSearchResultList />
      )}
    </SafeAreaView>
  );
}
