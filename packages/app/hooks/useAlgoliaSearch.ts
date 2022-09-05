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

  useEffect(() => {
    setLoading(true);
  }, [searchPhrase]);

  useEffect(() => {
    if (!debouncedSearchPhrase) return;

    const search = async () => {
      try {
        const algoliaSearchResult = await algoliaIndex.search<T>(
          debouncedSearchPhrase
        );
        setSearchResult(algoliaSearchResult.hits);
      } catch (ex) {
        console.error(ex);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedSearchPhrase, algoliaIndex]);

  return {
    loading,
    data: searchResult,
  };
}
