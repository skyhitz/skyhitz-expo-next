import { Config } from '../config';
import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(Config.GRAPHQL_URL);
