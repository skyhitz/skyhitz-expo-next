import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import SearchingIndicator from "app/features/dashboard/search/search-result-lists/searchingIndicator";
import EmptyListIndicator from "app/features/dashboard/search/search-result-lists/emptyListIndicator";
import { Text, View } from "app/design-system";

type SearchResultListsProps<T> = {
  searchPhrase: string;
  loading: boolean;
  data: T[];
  renderItem: ListRenderItem<T>;
  emptyListText: string;
  error?: boolean;
};

export function SearchResultList<T>({
  searchPhrase,
  loading,
  data,
  renderItem,
  emptyListText,
  error,
}: SearchResultListsProps<T>) {
  if (error && !loading) {
    return (
      <View className="flex-1 items-center pt-4">
        <Text className="text-red">Something went wrong. Try again.</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <SearchingIndicator visible={loading} searchPhrase={searchPhrase} />
      }
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListIndicator visible={!loading} text={emptyListText} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
