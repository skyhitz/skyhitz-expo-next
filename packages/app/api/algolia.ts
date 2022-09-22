import { Config } from "app/config";
import algoliasearch from "algoliasearch/lite";
import useSWR, { SWRResponse } from "swr";
import { RequestOptions } from "@algolia/transporter";
import { Hit, SearchOptions, SearchResponse } from "@algolia/client-search";
import { PublicUser } from "app/api/graphql";

const appDomain = Config.APP_URL.replace("https://", "");
const client = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_SEARCH_KEY);
export const entriesIndex = client.initIndex(`${appDomain}:entries`);
export const usersIndex = client.initIndex(`${appDomain}:users`);

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
