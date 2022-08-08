import { gql } from '@apollo/client'

export const REQUEST_TOKEN = gql`
  mutation requestToken($usernameOrEmail: String!, $publicKey: String!) {
    requestToken(usernameOrEmail: $usernameOrEmail, publicKey: $publicKey)
  }
`
