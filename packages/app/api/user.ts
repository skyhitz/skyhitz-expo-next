import { gql } from "@apollo/client";

export const REQUEST_TOKEN = gql`
  mutation requestToken($usernameOrEmail: String!, $publicKey: String!) {
    requestToken(usernameOrEmail: $usernameOrEmail, publicKey: $publicKey)
  }
`;

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
      avatarUrl
      displayName
      email
      username
      id
      description
      jwt
      publicKey
    }
  }
`;

export const GET_USER = gql`
  query authenticatedUser {
    authenticatedUser {
      avatarUrl
      displayName
      email
      username
      id
      description
      jwt
      publicKey
    }
  }
`;
