import React, { useEffect, useState } from "react";
import { useDebounce } from "app/hooks/useDebounce";
import { FlatList, ListRenderItem } from "react-native";
import SearchingIndicator from "app/features/dashboard/search/search-result-lists/searchingIndicator";
import EmptyListIndicator from "app/features/dashboard/search/search-result-lists/emptyListIndicator";

type SearchResultListsProps<T> = {
  searchFraze: string;
  searchFn: (_fraze: string) => Promise<T[]>;
  renderItem: ListRenderItem<T>;
  emptyListText: string;
};

export function SearchResultList<T>({
  searchFraze,
  searchFn,
  renderItem,
  emptyListText,
}: SearchResultListsProps<T>) {
  const [searchResult, setSearchResult] = useState<T[]>([]);
  const debouncedSearchFraze = useDebounce(searchFraze, 200);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [searchFraze]);

  useEffect(() => {
    if (!debouncedSearchFraze) return;

    searchFn(debouncedSearchFraze)
      .then((hits) => setSearchResult(hits))
      .finally(() => setLoading(false));
  }, [debouncedSearchFraze, searchFn, setLoading]);

  return (
    <FlatList
      ListHeaderComponent={
        <SearchingIndicator visible={loading} searchFraze={searchFraze} />
      }
      data={searchResult}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListIndicator visible={!loading} text={emptyListText} />
      }
    />
  );
}
