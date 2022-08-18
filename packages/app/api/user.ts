import { gql } from '@apollo/client'

export const REQUEST_TOKEN = gql`
  mutation requestToken($email: String!, $publicKey: String!) {
    requestToken(usernameOrEmail: $email, publicKey: $publicKey)
  }
`

export const CREATE_USER_WITH_EMAIL = gql`
  mutation createUserWithEmail(
    $displayName: String!
    $email: String!
    $username: String!
    $publicKey: String!
  ) {
    createUserWithEmail(
      displayName: $displayName
      email: $email
      username: $username
      publicKey: $publicKey
    ) {
      jwt
      publicKey
    }
  }
`
