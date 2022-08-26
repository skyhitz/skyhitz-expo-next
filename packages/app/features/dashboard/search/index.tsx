import { SafeAreaView } from "app/design-system/safe-area-view";
import React, { useState } from "react";
import { TabBar, Tabs } from "app/features/dashboard/search/tabs";
import { View } from "app/design-system";
import { SearchInputField } from "app/features/dashboard/search/search-input-field";
import RecentlyAddedList from "app/features/dashboard/search/recently-added";

export function SearchScreen() {
  const [searchFraze, setSearchFraze] = useState("");
  const [tab, setTab] = useState<Tabs>("Beats");

  return (
    <SafeAreaView className="w-full max-w-6xl mx-auto flex-1 flex p-4 bg-blue-dark">
      <SearchInputField
        value={searchFraze}
        onChangeText={setSearchFraze}
        showX={searchFraze !== ""}
        onXClick={() => {
          setSearchFraze("");
        }}
      />
      <TabBar selected={tab} onTabClick={setTab} />
      <View className="flex-1">
        <RecentlyAddedList />
      </View>
    </SafeAreaView>
  );
}
