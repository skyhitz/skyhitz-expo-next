import { gql } from '@apollo/client'

export const REQUEST_TOKEN = gql`
  mutation requestToken($usernameOrEmail: String!, $publicKey: String!) {
    requestToken(usernameOrEmail: $usernameOrEmail, publicKey: $publicKey)
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
export const SIGN_IN = gql`
  mutation signIn($token: String!, $uid: String!, $signedXDR: String) {
    signIn(token: $token, uid: $uid, signedXDR: $signedXDR) {
      avatarUrl
      displayName
      username
      id
      jwt
      publishedAt
      email
      description
      publicKey
    }
  }
`
