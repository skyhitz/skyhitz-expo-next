import { useEffect, useState } from "react";
import { useDebounce } from "app/hooks/useDebounce";
import { SearchIndex } from "algoliasearch/lite";
import { ErrorType } from "app/types";

type Props = {
  searchPhrase: string;
  algoliaIndex: SearchIndex;
};

type SearchResult<T> = {
  loading: boolean;
  data: T[];
  error?: ErrorType;
};

const unknownError: ErrorType = {
  name: "Unknown error",
  message: "Unknown algolia search error",
};

export function useAlgoliaSearch<T>({
  searchPhrase,
  algoliaIndex,
}: Props): SearchResult<T> {
  const [searchResult, setSearchResult] = useState<T[]>([]);
  const [error, setError] = useState<ErrorType | undefined>(undefined);
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
        setError(undefined);
      } catch (e) {
        setError((e as ErrorType) ?? unknownError);
        setSearchResult([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedSearchPhrase, algoliaIndex]);

  return {
    loading,
    data: searchResult,
    error,
  };
}
