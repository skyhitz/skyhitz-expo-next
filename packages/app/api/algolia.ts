import { Config } from "app/config";
import algoliasearch from "algoliasearch/lite";

const appDomain = Config.APP_URL.replace("https://", "");
const client = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_SEARCH_KEY);
export const entriesIndex = client.initIndex(`${appDomain}:entries`);
export const usersIndex = client.initIndex(`${appDomain}:users`);
export const ratingEntriesIndex = client.initIndex(
  `${appDomain}:entries_rating_desc`
);
export const timestampDescEntriesIndex = client.initIndex(
  `${appDomain}:entries_timestamp_desc`
);
