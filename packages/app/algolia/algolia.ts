import algoliasearch from 'algoliasearch/lite'
import { Config } from '../config/index'
const appDomain = Config.APP_URL.replace('https://', '')
const client = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_SEARCH_KEY)
export const entriesIndex = client.initIndex(`${appDomain}:entries`)
export const usersIndex = client.initIndex(`${appDomain}:users`)
