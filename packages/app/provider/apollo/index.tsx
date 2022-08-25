import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Config } from "../../config";
import { setContext } from "@apollo/client/link/context";
import { SecureStorage } from "app/utils/secure-storage";

const httpLink = createHttpLink({
  uri: Config.GRAPHQL_URL,
});

export const SkyhitzApolloProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token if it exists
    const token = await SecureStorage.get("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
