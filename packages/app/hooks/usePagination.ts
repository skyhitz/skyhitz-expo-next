import * as Apollo from "@apollo/client";
import { isSome } from "app/utils";
import { filter, isEmpty, uniqWith } from "ramda";
import { useEffect, useState } from "react";

type InputProps<T, R> = {
  queryHook: (_baseOptions?: Apollo.QueryHookOptions) => Apollo.QueryResult<R>;
  transformResponse: (_result: R) => T[] | undefined | null;
  getId: (_item: NonNullable<T>) => string;
};

type Result<T> = {
  data: NonNullable<T>[];
  onNextPage: () => void;
};

/**
 * hook that helps to create list with pagination
 * @param queryHook: hook with query to execute
 * @param transformResponse: how to transform response returned by hook.
 * i.ex. when hook returns nested data like: { data: [] }
 * @param getId: how to get id of the object that can be used for
 * object comparison
 *
 * @returns {data} -> list of the items
 * @returns {onNextPage} -> function to call after end of the list is reached
 *
 * */
export function usePagination<T, R>({
  queryHook,
  transformResponse,
  getId,
}: InputProps<T, R>): Result<T> {
  const [nextPage, setNextPage] = useState<number>(0);
  const [isNextPage, setIsNextPage] = useState<boolean>(true);
  const [data, setData] = useState<NonNullable<T>[]>([]);
  const {
    data: queryData,
    refetch,
    loading,
  } = queryHook({
    variables: { page: 0 },
  });

  useEffect(() => {
    if (queryData) {
      const result = transformResponse(queryData);
      if (result) {
        if (isEmpty(result)) {
          // if result is empty, it means there are no more pages
          setIsNextPage(false);
        } else {
          const nonNullableResult = filter(isSome, result) as NonNullable<T>[];
          // checks for duplicated data with uniqWith
          setData((prev) =>
            uniqWith(
              (a, b) => getId(a) === getId(b),
              [...prev, ...nonNullableResult]
            )
          );
          setNextPage((prev) => prev + 1);
        }
      }
    }
  }, [
    queryData,
    setData,
    setNextPage,
    transformResponse,
    setIsNextPage,
    getId,
  ]);

  const onNextPage = () => {
    if (loading || !isNextPage) return;
    refetch({ page: nextPage });
  };

  return {
    data,
    onNextPage,
  };
}
