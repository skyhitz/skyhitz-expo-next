import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** This is an ConditionalXDR */
export type ConditionalXdr = {
  __typename?: "ConditionalXDR";
  submitted?: Maybe<Scalars["Boolean"]>;
  success?: Maybe<Scalars["Boolean"]>;
  xdr?: Maybe<Scalars["String"]>;
};

/** This is an Entry */
export type Entry = {
  __typename?: "Entry";
  artist?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  issuer?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  videoUrl?: Maybe<Scalars["String"]>;
};

/** Entry Likes */
export type EntryLikes = {
  __typename?: "EntryLikes";
  /** Count of entry likes */
  count?: Maybe<Scalars["Int"]>;
  /** List of users that liked the entry */
  users?: Maybe<Array<Maybe<PublicUser>>>;
};

/** This is an Entry Price */
export type EntryPrice = {
  __typename?: "EntryPrice";
  amount?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["String"]>;
};

/** Create users or entries */
export type Mutation = {
  __typename?: "Mutation";
  buyCredits?: Maybe<Scalars["String"]>;
  buyEntry?: Maybe<ConditionalXdr>;
  cancelSubscription?: Maybe<Scalars["String"]>;
  createEntry?: Maybe<ConditionalXdr>;
  createUserWithEmail?: Maybe<User>;
  indexEntry?: Maybe<Scalars["Boolean"]>;
  likeEntry?: Maybe<Scalars["Boolean"]>;
  removeEntry?: Maybe<Scalars["Boolean"]>;
  requestToken?: Maybe<Scalars["Boolean"]>;
  signIn?: Maybe<User>;
  subscribeUser?: Maybe<Scalars["String"]>;
  updatePricing?: Maybe<ConditionalXdr>;
  updateUser?: Maybe<User>;
  withdrawToExternalWallet?: Maybe<Scalars["Boolean"]>;
};

/** Create users or entries */
export type MutationBuyCreditsArgs = {
  amount: Scalars["Float"];
  cardToken: Scalars["String"];
};

/** Create users or entries */
export type MutationBuyEntryArgs = {
  amount: Scalars["Float"];
  id: Scalars["String"];
  price: Scalars["Float"];
};

/** Create users or entries */
export type MutationCreateEntryArgs = {
  code: Scalars["String"];
  equityForSale: Scalars["Float"];
  fileCid: Scalars["String"];
  forSale: Scalars["Boolean"];
  metaCid: Scalars["String"];
  price: Scalars["Int"];
};

/** Create users or entries */
export type MutationCreateUserWithEmailArgs = {
  displayName: Scalars["String"];
  email: Scalars["String"];
  publicKey: Scalars["String"];
  username: Scalars["String"];
};

/** Create users or entries */
export type MutationIndexEntryArgs = {
  issuer: Scalars["String"];
};

/** Create users or entries */
export type MutationLikeEntryArgs = {
  id: Scalars["String"];
  like: Scalars["Boolean"];
};

/** Create users or entries */
export type MutationRemoveEntryArgs = {
  id: Scalars["String"];
};

/** Create users or entries */
export type MutationRequestTokenArgs = {
  publicKey: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

/** Create users or entries */
export type MutationSignInArgs = {
  signedXDR?: InputMaybe<Scalars["String"]>;
  token: Scalars["String"];
  uid: Scalars["String"];
};

/** Create users or entries */
export type MutationSubscribeUserArgs = {
  cardToken?: InputMaybe<Scalars["String"]>;
};

/** Create users or entries */
export type MutationUpdatePricingArgs = {
  equityForSale: Scalars["Int"];
  forSale: Scalars["Boolean"];
  id: Scalars["String"];
  price: Scalars["Int"];
};

/** Create users or entries */
export type MutationUpdateUserArgs = {
  avatarUrl?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

/** Create users or entries */
export type MutationWithdrawToExternalWalletArgs = {
  address: Scalars["String"];
  amount: Scalars["Int"];
};

/** Payments */
export type PaymentsInfo = {
  __typename?: "PaymentsInfo";
  credits?: Maybe<Scalars["Float"]>;
  subscribed?: Maybe<Scalars["Boolean"]>;
};

/** This represents a User */
export type PublicUser = {
  __typename?: "PublicUser";
  avatarUrl?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

/** Get users or entries */
export type Query = {
  __typename?: "Query";
  authenticatedUser?: Maybe<User>;
  entries?: Maybe<Array<Maybe<Entry>>>;
  entryLikes?: Maybe<EntryLikes>;
  entryPrice?: Maybe<EntryPrice>;
  getIssuer?: Maybe<Scalars["String"]>;
  paymentsInfo?: Maybe<PaymentsInfo>;
  recentlyAdded?: Maybe<Array<Maybe<Entry>>>;
  topChart?: Maybe<Array<Maybe<Entry>>>;
  userLikes?: Maybe<Array<Maybe<Entry>>>;
  xlmPrice?: Maybe<Scalars["String"]>;
};

/** Get users or entries */
export type QueryEntriesArgs = {
  id?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
};

/** Get users or entries */
export type QueryEntryLikesArgs = {
  id: Scalars["String"];
};

/** Get users or entries */
export type QueryEntryPriceArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

/** Get users or entries */
export type QueryGetIssuerArgs = {
  cid: Scalars["String"];
};

/** Get users or entries */
export type QueryRecentlyAddedArgs = {
  page?: InputMaybe<Scalars["Int"]>;
};

/** Get users or entries */
export type QueryTopChartArgs = {
  page?: InputMaybe<Scalars["Int"]>;
};

/** This represents a User */
export type User = {
  __typename?: "User";
  avatarUrl?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  jwt?: Maybe<Scalars["String"]>;
  publicKey?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  version?: Maybe<Scalars["Int"]>;
};

export type CreateUserWithEmailMutationVariables = Exact<{
  displayName: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  publicKey: Scalars["String"];
}>;

export type CreateUserWithEmailMutation = {
  __typename?: "Mutation";
  createUserWithEmail?: {
    __typename?: "User";
    avatarUrl?: string | null;
    displayName?: string | null;
    email?: string | null;
    username?: string | null;
    id?: string | null;
    description?: string | null;
    jwt?: string | null;
    publicKey?: string | null;
  } | null;
};

export type RequestTokenMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"];
  publicKey: Scalars["String"];
}>;

export type RequestTokenMutation = {
  __typename?: "Mutation";
  requestToken?: boolean | null;
};

export type SignInMutationVariables = Exact<{
  token: Scalars["String"];
  uid: Scalars["String"];
  signedXDR?: InputMaybe<Scalars["String"]>;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn?: {
    __typename?: "User";
    avatarUrl?: string | null;
    displayName?: string | null;
    username?: string | null;
    id?: string | null;
    jwt?: string | null;
    publishedAt?: string | null;
    email?: string | null;
    description?: string | null;
    publicKey?: string | null;
  } | null;
};

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never }>;

export type AuthenticatedUserQuery = {
  __typename?: "Query";
  authenticatedUser?: {
    __typename?: "User";
    avatarUrl?: string | null;
    displayName?: string | null;
    email?: string | null;
    username?: string | null;
    id?: string | null;
    description?: string | null;
    jwt?: string | null;
    publicKey?: string | null;
  } | null;
};

export type RecentlyAddedQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
}>;

export type RecentlyAddedQuery = {
  __typename?: "Query";
  recentlyAdded?: Array<{
    __typename?: "Entry";
    imageUrl?: string | null;
    videoUrl?: string | null;
    description?: string | null;
    title?: string | null;
    id?: string | null;
    artist?: string | null;
    code?: string | null;
    issuer?: string | null;
  } | null> | null;
};

export type TopChartQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
}>;

export type TopChartQuery = {
  __typename?: "Query";
  topChart?: Array<{
    __typename?: "Entry";
    imageUrl?: string | null;
    videoUrl?: string | null;
    description?: string | null;
    title?: string | null;
    id?: string | null;
    artist?: string | null;
    code?: string | null;
    issuer?: string | null;
  } | null> | null;
};

export const CreateUserWithEmailDocument = gql`
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
export type CreateUserWithEmailMutationFn = Apollo.MutationFunction<
  CreateUserWithEmailMutation,
  CreateUserWithEmailMutationVariables
>;

/**
 * __useCreateUserWithEmailMutation__
 *
 * To run a mutation, you first call `useCreateUserWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserWithEmailMutation, { data, loading, error }] = useCreateUserWithEmailMutation({
 *   variables: {
 *      displayName: // value for 'displayName'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      publicKey: // value for 'publicKey'
 *   },
 * });
 */
export function useCreateUserWithEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserWithEmailMutation,
    CreateUserWithEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUserWithEmailMutation,
    CreateUserWithEmailMutationVariables
  >(CreateUserWithEmailDocument, options);
}
export type CreateUserWithEmailMutationHookResult = ReturnType<
  typeof useCreateUserWithEmailMutation
>;
export type CreateUserWithEmailMutationResult =
  Apollo.MutationResult<CreateUserWithEmailMutation>;
export type CreateUserWithEmailMutationOptions = Apollo.BaseMutationOptions<
  CreateUserWithEmailMutation,
  CreateUserWithEmailMutationVariables
>;
export const RequestTokenDocument = gql`
  mutation requestToken($usernameOrEmail: String!, $publicKey: String!) {
    requestToken(usernameOrEmail: $usernameOrEmail, publicKey: $publicKey)
  }
`;
export type RequestTokenMutationFn = Apollo.MutationFunction<
  RequestTokenMutation,
  RequestTokenMutationVariables
>;

/**
 * __useRequestTokenMutation__
 *
 * To run a mutation, you first call `useRequestTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestTokenMutation, { data, loading, error }] = useRequestTokenMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      publicKey: // value for 'publicKey'
 *   },
 * });
 */
export function useRequestTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestTokenMutation,
    RequestTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestTokenMutation,
    RequestTokenMutationVariables
  >(RequestTokenDocument, options);
}
export type RequestTokenMutationHookResult = ReturnType<
  typeof useRequestTokenMutation
>;
export type RequestTokenMutationResult =
  Apollo.MutationResult<RequestTokenMutation>;
export type RequestTokenMutationOptions = Apollo.BaseMutationOptions<
  RequestTokenMutation,
  RequestTokenMutationVariables
>;
export const SignInDocument = gql`
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
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      token: // value for 'token'
 *      uid: // value for 'uid'
 *      signedXDR: // value for 'signedXDR'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const AuthenticatedUserDocument = gql`
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

/**
 * __useAuthenticatedUserQuery__
 *
 * To run a query within a React component, call `useAuthenticatedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticatedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticatedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthenticatedUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AuthenticatedUserQuery,
    AuthenticatedUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AuthenticatedUserQuery,
    AuthenticatedUserQueryVariables
  >(AuthenticatedUserDocument, options);
}
export function useAuthenticatedUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AuthenticatedUserQuery,
    AuthenticatedUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AuthenticatedUserQuery,
    AuthenticatedUserQueryVariables
  >(AuthenticatedUserDocument, options);
}
export type AuthenticatedUserQueryHookResult = ReturnType<
  typeof useAuthenticatedUserQuery
>;
export type AuthenticatedUserLazyQueryHookResult = ReturnType<
  typeof useAuthenticatedUserLazyQuery
>;
export type AuthenticatedUserQueryResult = Apollo.QueryResult<
  AuthenticatedUserQuery,
  AuthenticatedUserQueryVariables
>;
export const RecentlyAddedDocument = gql`
  query recentlyAdded($page: Int) {
    recentlyAdded(page: $page) {
      imageUrl
      videoUrl
      description
      title
      id
      artist
      code
      issuer
    }
  }
`;

/**
 * __useRecentlyAddedQuery__
 *
 * To run a query within a React component, call `useRecentlyAddedQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentlyAddedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentlyAddedQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useRecentlyAddedQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RecentlyAddedQuery,
    RecentlyAddedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RecentlyAddedQuery, RecentlyAddedQueryVariables>(
    RecentlyAddedDocument,
    options
  );
}
export function useRecentlyAddedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RecentlyAddedQuery,
    RecentlyAddedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RecentlyAddedQuery, RecentlyAddedQueryVariables>(
    RecentlyAddedDocument,
    options
  );
}
export type RecentlyAddedQueryHookResult = ReturnType<
  typeof useRecentlyAddedQuery
>;
export type RecentlyAddedLazyQueryHookResult = ReturnType<
  typeof useRecentlyAddedLazyQuery
>;
export type RecentlyAddedQueryResult = Apollo.QueryResult<
  RecentlyAddedQuery,
  RecentlyAddedQueryVariables
>;
export const TopChartDocument = gql`
  query topChart($page: Int) {
    topChart(page: $page) {
      imageUrl
      videoUrl
      description
      title
      id
      artist
      code
      issuer
    }
  }
`;

/**
 * __useTopChartQuery__
 *
 * To run a query within a React component, call `useTopChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopChartQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTopChartQuery(
  baseOptions?: Apollo.QueryHookOptions<TopChartQuery, TopChartQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TopChartQuery, TopChartQueryVariables>(
    TopChartDocument,
    options
  );
}
export function useTopChartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TopChartQuery,
    TopChartQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TopChartQuery, TopChartQueryVariables>(
    TopChartDocument,
    options
  );
}
export type TopChartQueryHookResult = ReturnType<typeof useTopChartQuery>;
export type TopChartLazyQueryHookResult = ReturnType<
  typeof useTopChartLazyQuery
>;
export type TopChartQueryResult = Apollo.QueryResult<
  TopChartQuery,
  TopChartQueryVariables
>;
