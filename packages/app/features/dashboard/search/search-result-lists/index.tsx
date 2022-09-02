import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import SearchingIndicator from "app/features/dashboard/search/search-result-lists/searchingIndicator";
import EmptyListIndicator from "app/features/dashboard/search/search-result-lists/emptyListIndicator";

type SearchResultListsProps<T> = {
  searchPhrase: string;
  loading: boolean;
  data: T[];
  renderItem: ListRenderItem<T>;
  emptyListText: string;
};

export function SearchResultList<T>({
  searchPhrase,
  loading,
  data,
  renderItem,
  emptyListText,
}: SearchResultListsProps<T>) {
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
    />
  );
}
