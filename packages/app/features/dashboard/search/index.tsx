import { SafeAreaView } from "app/design-system/safe-area-view";
import React, { useState } from "react";
import { TabBar, Tabs } from "app/features/dashboard/search/tabs";
import { SearchInputField } from "app/features/dashboard/search/search-input-field";
import RecentlyAddedList from "app/features/dashboard/search/recently-added";
import { isEmpty } from "ramda";

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
        onChangeText={setSearchFraze}
        showX={isEmpty(searchFraze)}
        onXClick={() => {
          setSearchFraze("");
        }}
      />
      <TabBar selected={tab} onTabClick={setTab} />
      <RecentlyAddedList />
    </SafeAreaView>
  );
}
