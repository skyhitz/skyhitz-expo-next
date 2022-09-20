import { Config } from "app/config";
import algoliasearch from "algoliasearch/lite";
import { PublicUser } from "app/api/graphql";

const appDomain = Config.APP_URL.replace("https://", "");
const client = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_SEARCH_KEY);
export const entriesIndex = client.initIndex(`${appDomain}:entries`);
export const usersIndex = client.initIndex(`${appDomain}:users`);

export async function getUser(id: string): Promise<PublicUser> {
  const res = await usersIndex.search("", {
    filters: `objectID:${id}`,
  });
  if (res.hits.length === 0) {
    throw { message: "User not found" };
  }
  const [user] = res.hits;
  return user as PublicUser;
}
