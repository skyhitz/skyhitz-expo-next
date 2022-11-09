import useSWR, { SWRResponse } from "swr";
import { RequestOptions } from "@algolia/transporter";
import { Hit, SearchOptions, SearchResponse } from "@algolia/client-search";
import { PublicUser } from "app/api/graphql";
import { usersIndex } from "app/api/algolia";

type SearchType<T> = (
  _query: string,
  _requestOptions?: RequestOptions & SearchOptions
) => Readonly<Promise<SearchResponse<T>>>;

function withGetFirst<T>(search: SearchType<T>) {
  async function getFirst(
    query: string,
    requestOptions?: RequestOptions & SearchOptions
  ) {
    const result = await search(query, requestOptions);

    if (!result.hits[0]) {
      throw new Error("No hits found");
    }

    return result.hits[0];
  }

  return getFirst;
}

export const useUserWithId = (id?: string | null) => {
  const result: SWRResponse<Hit<PublicUser>> = useSWR(
    [
      "",
      {
        filters: `objectID:${id}`,
      },
    ],
    id ? withGetFirst(usersIndex.search<PublicUser>) : null,
    {
      dedupingInterval: 15000,
    }
  );
  return result;
};
