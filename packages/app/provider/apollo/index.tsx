import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Config } from '../../config'

export const SkyhitzApolloProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const client = new ApolloClient({
    uri: Config.GRAPHQL_URL,
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
