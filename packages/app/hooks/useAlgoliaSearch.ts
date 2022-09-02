import { useEffect, useState } from "react";
import { useDebounce } from "app/hooks/useDebounce";
import { SearchIndex } from "algoliasearch/lite";

type Props = {
  searchPhrase: string;
  algoliaIndex: SearchIndex;
};

type SearchResult<T> = {
  loading: boolean;
  data: T[];
};

export function useAlgoliaSearch<T>({
  searchPhrase,
  algoliaIndex,
}: Props): SearchResult<T> {
  const [searchResult, setSearchResult] = useState<T[]>([]);
  const debouncedSearchPhrase = useDebounce(searchPhrase, 200);
  const [loading, setLoading] = useState(false);
  const setLoadingFalse = () => setLoading(false);

  useEffect(() => {
    setLoading(true);
  }, [searchPhrase]);

  useEffect(() => {
    if (!debouncedSearchPhrase) return;

    algoliaIndex
      .search<T>(debouncedSearchPhrase)
      .then((result) => result.hits)
      .then(setSearchResult)
      .catch(console.log)
      .finally(setLoadingFalse);
  }, [debouncedSearchPhrase, algoliaIndex]);

  return {
    loading,
    data: searchResult,
  };
}
