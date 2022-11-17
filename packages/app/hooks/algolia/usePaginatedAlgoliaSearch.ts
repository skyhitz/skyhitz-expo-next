import useSWRInfinite from "swr/infinite";
import { useCallback, useMemo } from "react";
import { flatten } from "ramda";

type ReturnValue<T> = {
  data: T[];
  onNextPage: () => void;
  loading: boolean;
};

type Props<T> = {
  fetcher: (key: string) => Promise<T[]>;
  commonKey: string;
  pageSize: number;
};

export function usePaginatedAlgoliaSearch<T>({
  fetcher,
  commonKey,
  pageSize,
}: Props<T>): ReturnValue<T> {
  const getKey = useMemo(
    () => (page: number, previousPageData: T[]) => {
      if (previousPageData && !previousPageData.length) return null;
      return `${commonKey}${page}`;
    },
    [commonKey]
  );

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    dedupingInterval: 300000,
    revalidateAll: true,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && size > data.length);

  const onNextPage = useCallback(() => {
    if (!isLoadingMore && data && data[size - 1]?.length === pageSize) {
      setSize(size + 1);
    }
  }, [isLoadingMore]);

  const flattenData = useMemo(() => {
    if (data) {
      return flatten(data) as unknown as T[];
    }
    return [];
  }, [data]);

  return {
    data: flattenData,
    onNextPage,
    loading: isLoadingInitialData,
  };
}
