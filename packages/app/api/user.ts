import { gql } from 'graphql-request';
import { client } from './client';
import { SignUpForm } from '../types';

export async function getAuthenticatedUser() {
  return client
    .request(
      gql`
        {
          authenticatedUser {
            avatarUrl
            displayName
            username
            id
            jwt
            publishedAt
            email
            description
          }
        }
      `
    )
    .then(({ authenticatedUser }) => authenticatedUser);
}

export async function signUp({
  displayName,
  email,
  username,
  publicKey,
}: SignUpForm) {
  return client
    .request(
      gql`
          mutation {
            createUserWithEmail(displayName: "${displayName}", email: "${email}", username: "${username}",publicKey: "${publicKey}"){
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
    )
    .then(({ createUserWithEmail }) => createUserWithEmail)
    .catch(({ graphQLErrors }) => {
      let [{ message }] = graphQLErrors;
      throw message;
    });
}

export async function requestToken(usernameOrEmail, publicKey) {
  return client
    .request(
      gql`
          mutation {
            requestToken(usernameOrEmail: "${usernameOrEmail}", publicKey: "${publicKey}")
          }
          `
    )
    .catch((graphQLErrors) => {
      let [{ message }] = graphQLErrors;
      throw message;
    });
}

export async function signIn(token?: string, uid?: string, xdr?: string) {
  return client
    .request(
      gql`
          mutation {
            signIn(token: "${token}", uid: "${uid}", signedXDR: "${xdr}"){
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
    )
    .then(({ signIn }) => signIn)
    .catch(({ graphQLErrors }) => {
      let [{ message }] = graphQLErrors;
      throw message;
    });
}

export async function updateUser(
  avatarUrl: string,
  displayName: string,
  description: string,
  username: string,
  email: string
) {
  client
    .request(
      gql`
          mutation {
            updateUser(avatarUrl: "${avatarUrl}", displayName: "${displayName}", description: "${description}", username: "${username}", email: "${email}"){
              avatarUrl
              displayName
              username
              id
              publishedAt
              email
              description
            }
          }
          `
    )
    .then(({ updateUser }) => updateUser)
    .catch(({ graphQLErrors }) => {
      let [{ message }] = graphQLErrors;
      throw message;
    });
}
