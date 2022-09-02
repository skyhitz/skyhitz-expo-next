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
    console.log(debouncedSearchPhrase);
    if (!debouncedSearchPhrase) return;

    const search = async () => {
      console.log("search", debouncedSearchPhrase);
      try {
        const result = await algoliaIndex.search<T>(debouncedSearchPhrase);
        console.log("result", result);
        setSearchResult(result.hits);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    };
    search();
  }, [debouncedSearchPhrase, algoliaIndex]);

  return {
    loading,
    data: searchResult,
  };
}
