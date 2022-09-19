import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'ConditionalXDR';
  message?: Maybe<Scalars['String']>;
  submitted?: Maybe<Scalars['Boolean']>;
  success?: Maybe<Scalars['Boolean']>;
  xdr?: Maybe<Scalars['String']>;
};

/** This is an Entry */
export type Entry = {
  __typename?: 'Entry';
  artist?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  issuer?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
};

/** Entry Likes */
export type EntryLikes = {
  __typename?: 'EntryLikes';
  /** Count of entry likes */
  count?: Maybe<Scalars['Int']>;
  /** List of users that liked the entry */
  users?: Maybe<Array<Maybe<PublicUser>>>;
};

/** This is an Entry Price */
export type EntryPrice = {
  __typename?: 'EntryPrice';
  amount?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
};

/** Result of the indexEntry mutation */
export type IndexEntryResult = {
  __typename?: 'IndexEntryResult';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Create users or entries */
export type Mutation = {
  __typename?: 'Mutation';
  buyCredits?: Maybe<Scalars['String']>;
  buyEntry?: Maybe<ConditionalXdr>;
  cancelSubscription?: Maybe<Scalars['String']>;
  createEntry?: Maybe<ConditionalXdr>;
  createUserWithEmail?: Maybe<SuccessResponse>;
  indexEntry?: Maybe<IndexEntryResult>;
  likeEntry?: Maybe<Scalars['Boolean']>;
  removeEntry?: Maybe<Scalars['Boolean']>;
  requestToken?: Maybe<Scalars['Boolean']>;
  signInWithToken?: Maybe<User>;
  signInWithXDR?: Maybe<User>;
  subscribeUser?: Maybe<Scalars['String']>;
  updatePricing?: Maybe<ConditionalXdr>;
  updateUser?: Maybe<User>;
  withdrawToExternalWallet?: Maybe<Scalars['Boolean']>;
};


/** Create users or entries */
export type MutationBuyCreditsArgs = {
  amount: Scalars['Float'];
  cardToken: Scalars['String'];
};


/** Create users or entries */
export type MutationBuyEntryArgs = {
  amount: Scalars['Float'];
  id: Scalars['String'];
  price: Scalars['Float'];
};


/** Create users or entries */
export type MutationCreateEntryArgs = {
  code: Scalars['String'];
  equityForSale: Scalars['Float'];
  fileCid: Scalars['String'];
  forSale: Scalars['Boolean'];
  metaCid: Scalars['String'];
  price: Scalars['Int'];
};


/** Create users or entries */
export type MutationCreateUserWithEmailArgs = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  publicKey: Scalars['String'];
  username: Scalars['String'];
};


/** Create users or entries */
export type MutationIndexEntryArgs = {
  issuer: Scalars['String'];
};


/** Create users or entries */
export type MutationLikeEntryArgs = {
  id: Scalars['String'];
  like: Scalars['Boolean'];
};


/** Create users or entries */
export type MutationRemoveEntryArgs = {
  id: Scalars['String'];
};


/** Create users or entries */
export type MutationRequestTokenArgs = {
  publicKey: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


/** Create users or entries */
export type MutationSignInWithTokenArgs = {
  token: Scalars['String'];
  uid: Scalars['String'];
};


/** Create users or entries */
export type MutationSignInWithXdrArgs = {
  signedXDR: Scalars['String'];
};


/** Create users or entries */
export type MutationSubscribeUserArgs = {
  cardToken?: InputMaybe<Scalars['String']>;
};


/** Create users or entries */
export type MutationUpdatePricingArgs = {
  equityForSale: Scalars['Int'];
  forSale: Scalars['Boolean'];
  id: Scalars['String'];
  price: Scalars['Int'];
};


/** Create users or entries */
export type MutationUpdateUserArgs = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


/** Create users or entries */
export type MutationWithdrawToExternalWalletArgs = {
  address: Scalars['String'];
  amount: Scalars['Int'];
};

/** Payments */
export type PaymentsInfo = {
  __typename?: 'PaymentsInfo';
  credits?: Maybe<Scalars['Float']>;
  subscribed?: Maybe<Scalars['Boolean']>;
};

/** This represents a User */
export type PublicUser = {
  __typename?: 'PublicUser';
  avatarUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** Get users or entries */
export type Query = {
  __typename?: 'Query';
  authenticatedUser?: Maybe<User>;
  entries?: Maybe<Array<Maybe<Entry>>>;
  entryLikes?: Maybe<EntryLikes>;
  entryPrice?: Maybe<EntryPrice>;
  getIssuer?: Maybe<Scalars['String']>;
  paymentsInfo?: Maybe<PaymentsInfo>;
  recentlyAdded?: Maybe<Array<Maybe<Entry>>>;
  topChart?: Maybe<Array<Maybe<Entry>>>;
  userLikes?: Maybe<Array<Maybe<Entry>>>;
  xlmPrice?: Maybe<Scalars['String']>;
};


/** Get users or entries */
export type QueryEntriesArgs = {
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


/** Get users or entries */
export type QueryEntryLikesArgs = {
  id: Scalars['String'];
};


/** Get users or entries */
export type QueryEntryPriceArgs = {
  id?: InputMaybe<Scalars['String']>;
};


/** Get users or entries */
export type QueryGetIssuerArgs = {
  cid: Scalars['String'];
};


/** Get users or entries */
export type QueryRecentlyAddedArgs = {
  page?: InputMaybe<Scalars['Int']>;
};


/** Get users or entries */
export type QueryTopChartArgs = {
  page?: InputMaybe<Scalars['Int']>;
};

/** This is an SuccessResponse */
export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** This represents a User */
export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  jwt?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type CreateEntryMutationVariables = Exact<{
  fileCid: Scalars['String'];
  metaCid: Scalars['String'];
  code: Scalars['String'];
  forSale: Scalars['Boolean'];
  price: Scalars['Int'];
  equityForSale: Scalars['Float'];
}>;


export type CreateEntryMutation = { __typename?: 'Mutation', createEntry?: { __typename?: 'ConditionalXDR', xdr?: string | null, success?: boolean | null, submitted?: boolean | null, message?: string | null } | null };

export type CreateUserWithEmailMutationVariables = Exact<{
  displayName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  publicKey: Scalars['String'];
}>;


export type CreateUserWithEmailMutation = { __typename?: 'Mutation', createUserWithEmail?: { __typename?: 'SuccessResponse', success?: boolean | null, message?: string | null } | null };

export type IndexEntryMutationVariables = Exact<{
  issuer: Scalars['String'];
}>;


export type IndexEntryMutation = { __typename?: 'Mutation', indexEntry?: { __typename?: 'IndexEntryResult', success?: boolean | null, message?: string | null } | null };

export type LikeEntryMutationVariables = Exact<{
  id: Scalars['String'];
  like: Scalars['Boolean'];
}>;


export type LikeEntryMutation = { __typename?: 'Mutation', likeEntry?: boolean | null };

export type RequestTokenMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  publicKey: Scalars['String'];
}>;


export type RequestTokenMutation = { __typename?: 'Mutation', requestToken?: boolean | null };

export type SignInWithTokenMutationVariables = Exact<{
  token: Scalars['String'];
  uid: Scalars['String'];
}>;


export type SignInWithTokenMutation = { __typename?: 'Mutation', signInWithToken?: { __typename?: 'User', avatarUrl?: string | null, displayName?: string | null, username?: string | null, id?: string | null, jwt?: string | null, publishedAt?: string | null, email?: string | null, description?: string | null, publicKey?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  avatarUrl?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', avatarUrl?: string | null, displayName?: string | null, email?: string | null, username?: string | null, id?: string | null, publishedAt?: string | null, version?: number | null, jwt?: string | null, description?: string | null, publicKey?: string | null } | null };

export type EntryLikesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EntryLikesQuery = { __typename?: 'Query', entryLikes?: { __typename?: 'EntryLikes', users?: Array<{ __typename?: 'PublicUser', avatarUrl?: string | null, displayName?: string | null, username?: string | null, id?: string | null, description?: string | null } | null> | null } | null };

export type GetIssuerQueryVariables = Exact<{
  cid: Scalars['String'];
}>;


export type GetIssuerQuery = { __typename?: 'Query', getIssuer?: string | null };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { __typename?: 'Query', authenticatedUser?: { __typename?: 'User', avatarUrl?: string | null, displayName?: string | null, email?: string | null, username?: string | null, id?: string | null, description?: string | null, jwt?: string | null, publicKey?: string | null } | null };

export type PaymentsInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentsInfoQuery = { __typename?: 'Query', paymentsInfo?: { __typename?: 'PaymentsInfo', subscribed?: boolean | null, credits?: number | null } | null };

export type RecentlyAddedQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type RecentlyAddedQuery = { __typename?: 'Query', recentlyAdded?: Array<{ __typename?: 'Entry', imageUrl?: string | null, videoUrl?: string | null, description?: string | null, title?: string | null, id?: string | null, artist?: string | null, code?: string | null, issuer?: string | null } | null> | null };

export type TopChartQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type TopChartQuery = { __typename?: 'Query', topChart?: Array<{ __typename?: 'Entry', imageUrl?: string | null, videoUrl?: string | null, description?: string | null, title?: string | null, id?: string | null, artist?: string | null, code?: string | null, issuer?: string | null } | null> | null };

export type UserLikesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserLikesQuery = { __typename?: 'Query', userLikes?: Array<{ __typename?: 'Entry', imageUrl?: string | null, videoUrl?: string | null, description?: string | null, title?: string | null, id?: string | null, artist?: string | null, code?: string | null, issuer?: string | null } | null> | null };


export const CreateEntryDocument = gql`
    mutation CreateEntry($fileCid: String!, $metaCid: String!, $code: String!, $forSale: Boolean!, $price: Int!, $equityForSale: Float!) {
  createEntry(
    fileCid: $fileCid
    metaCid: $metaCid
    code: $code
    forSale: $forSale
    price: $price
    equityForSale: $equityForSale
  ) {
    xdr
    success
    submitted
    message
  }
}
    `;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      fileCid: // value for 'fileCid'
 *      metaCid: // value for 'metaCid'
 *      code: // value for 'code'
 *      forSale: // value for 'forSale'
 *      price: // value for 'price'
 *      equityForSale: // value for 'equityForSale'
 *   },
 * });
 */
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, options);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const CreateUserWithEmailDocument = gql`
    mutation createUserWithEmail($displayName: String!, $email: String!, $username: String!, $publicKey: String!) {
  createUserWithEmail(
    displayName: $displayName
    email: $email
    username: $username
    publicKey: $publicKey
  ) {
    success
    message
  }
}
    `;
export type CreateUserWithEmailMutationFn = Apollo.MutationFunction<CreateUserWithEmailMutation, CreateUserWithEmailMutationVariables>;

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
export function useCreateUserWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserWithEmailMutation, CreateUserWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserWithEmailMutation, CreateUserWithEmailMutationVariables>(CreateUserWithEmailDocument, options);
      }
export type CreateUserWithEmailMutationHookResult = ReturnType<typeof useCreateUserWithEmailMutation>;
export type CreateUserWithEmailMutationResult = Apollo.MutationResult<CreateUserWithEmailMutation>;
export type CreateUserWithEmailMutationOptions = Apollo.BaseMutationOptions<CreateUserWithEmailMutation, CreateUserWithEmailMutationVariables>;
export const IndexEntryDocument = gql`
    mutation IndexEntry($issuer: String!) {
  indexEntry(issuer: $issuer) {
    success
    message
  }
}
    `;
export type IndexEntryMutationFn = Apollo.MutationFunction<IndexEntryMutation, IndexEntryMutationVariables>;

/**
 * __useIndexEntryMutation__
 *
 * To run a mutation, you first call `useIndexEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIndexEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [indexEntryMutation, { data, loading, error }] = useIndexEntryMutation({
 *   variables: {
 *      issuer: // value for 'issuer'
 *   },
 * });
 */
export function useIndexEntryMutation(baseOptions?: Apollo.MutationHookOptions<IndexEntryMutation, IndexEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IndexEntryMutation, IndexEntryMutationVariables>(IndexEntryDocument, options);
      }
export type IndexEntryMutationHookResult = ReturnType<typeof useIndexEntryMutation>;
export type IndexEntryMutationResult = Apollo.MutationResult<IndexEntryMutation>;
export type IndexEntryMutationOptions = Apollo.BaseMutationOptions<IndexEntryMutation, IndexEntryMutationVariables>;
export const LikeEntryDocument = gql`
    mutation likeEntry($id: String!, $like: Boolean!) {
  likeEntry(id: $id, like: $like)
}
    `;
export type LikeEntryMutationFn = Apollo.MutationFunction<LikeEntryMutation, LikeEntryMutationVariables>;

/**
 * __useLikeEntryMutation__
 *
 * To run a mutation, you first call `useLikeEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeEntryMutation, { data, loading, error }] = useLikeEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useLikeEntryMutation(baseOptions?: Apollo.MutationHookOptions<LikeEntryMutation, LikeEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeEntryMutation, LikeEntryMutationVariables>(LikeEntryDocument, options);
      }
export type LikeEntryMutationHookResult = ReturnType<typeof useLikeEntryMutation>;
export type LikeEntryMutationResult = Apollo.MutationResult<LikeEntryMutation>;
export type LikeEntryMutationOptions = Apollo.BaseMutationOptions<LikeEntryMutation, LikeEntryMutationVariables>;
export const RequestTokenDocument = gql`
    mutation requestToken($usernameOrEmail: String!, $publicKey: String!) {
  requestToken(usernameOrEmail: $usernameOrEmail, publicKey: $publicKey)
}
    `;
export type RequestTokenMutationFn = Apollo.MutationFunction<RequestTokenMutation, RequestTokenMutationVariables>;

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
export function useRequestTokenMutation(baseOptions?: Apollo.MutationHookOptions<RequestTokenMutation, RequestTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestTokenMutation, RequestTokenMutationVariables>(RequestTokenDocument, options);
      }
export type RequestTokenMutationHookResult = ReturnType<typeof useRequestTokenMutation>;
export type RequestTokenMutationResult = Apollo.MutationResult<RequestTokenMutation>;
export type RequestTokenMutationOptions = Apollo.BaseMutationOptions<RequestTokenMutation, RequestTokenMutationVariables>;
export const SignInWithTokenDocument = gql`
    mutation signInWithToken($token: String!, $uid: String!) {
  signInWithToken(token: $token, uid: $uid) {
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
export type SignInWithTokenMutationFn = Apollo.MutationFunction<SignInWithTokenMutation, SignInWithTokenMutationVariables>;

/**
 * __useSignInWithTokenMutation__
 *
 * To run a mutation, you first call `useSignInWithTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithTokenMutation, { data, loading, error }] = useSignInWithTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useSignInWithTokenMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithTokenMutation, SignInWithTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithTokenMutation, SignInWithTokenMutationVariables>(SignInWithTokenDocument, options);
      }
export type SignInWithTokenMutationHookResult = ReturnType<typeof useSignInWithTokenMutation>;
export type SignInWithTokenMutationResult = Apollo.MutationResult<SignInWithTokenMutation>;
export type SignInWithTokenMutationOptions = Apollo.BaseMutationOptions<SignInWithTokenMutation, SignInWithTokenMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($avatarUrl: String, $displayName: String, $description: String, $username: String, $email: String) {
  updateUser(
    avatarUrl: $avatarUrl
    displayName: $displayName
    description: $description
    username: $username
    email: $email
  ) {
    avatarUrl
    displayName
    email
    username
    id
    publishedAt
    version
    jwt
    description
    publicKey
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      avatarUrl: // value for 'avatarUrl'
 *      displayName: // value for 'displayName'
 *      description: // value for 'description'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const EntryLikesDocument = gql`
    query entryLikes($id: String!) {
  entryLikes(id: $id) {
    users {
      avatarUrl
      displayName
      username
      id
      description
    }
  }
}
    `;

/**
 * __useEntryLikesQuery__
 *
 * To run a query within a React component, call `useEntryLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryLikesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntryLikesQuery(baseOptions: Apollo.QueryHookOptions<EntryLikesQuery, EntryLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntryLikesQuery, EntryLikesQueryVariables>(EntryLikesDocument, options);
      }
export function useEntryLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryLikesQuery, EntryLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntryLikesQuery, EntryLikesQueryVariables>(EntryLikesDocument, options);
        }
export type EntryLikesQueryHookResult = ReturnType<typeof useEntryLikesQuery>;
export type EntryLikesLazyQueryHookResult = ReturnType<typeof useEntryLikesLazyQuery>;
export type EntryLikesQueryResult = Apollo.QueryResult<EntryLikesQuery, EntryLikesQueryVariables>;
export const GetIssuerDocument = gql`
    query GetIssuer($cid: String!) {
  getIssuer(cid: $cid)
}
    `;

/**
 * __useGetIssuerQuery__
 *
 * To run a query within a React component, call `useGetIssuerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIssuerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIssuerQuery({
 *   variables: {
 *      cid: // value for 'cid'
 *   },
 * });
 */
export function useGetIssuerQuery(baseOptions: Apollo.QueryHookOptions<GetIssuerQuery, GetIssuerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIssuerQuery, GetIssuerQueryVariables>(GetIssuerDocument, options);
      }
export function useGetIssuerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIssuerQuery, GetIssuerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIssuerQuery, GetIssuerQueryVariables>(GetIssuerDocument, options);
        }
export type GetIssuerQueryHookResult = ReturnType<typeof useGetIssuerQuery>;
export type GetIssuerLazyQueryHookResult = ReturnType<typeof useGetIssuerLazyQuery>;
export type GetIssuerQueryResult = Apollo.QueryResult<GetIssuerQuery, GetIssuerQueryVariables>;
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
export function useAuthenticatedUserQuery(baseOptions?: Apollo.QueryHookOptions<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>(AuthenticatedUserDocument, options);
      }
export function useAuthenticatedUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>(AuthenticatedUserDocument, options);
        }
export type AuthenticatedUserQueryHookResult = ReturnType<typeof useAuthenticatedUserQuery>;
export type AuthenticatedUserLazyQueryHookResult = ReturnType<typeof useAuthenticatedUserLazyQuery>;
export type AuthenticatedUserQueryResult = Apollo.QueryResult<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>;
export const PaymentsInfoDocument = gql`
    query PaymentsInfo {
  paymentsInfo {
    subscribed
    credits
  }
}
    `;

/**
 * __usePaymentsInfoQuery__
 *
 * To run a query within a React component, call `usePaymentsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function usePaymentsInfoQuery(baseOptions?: Apollo.QueryHookOptions<PaymentsInfoQuery, PaymentsInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentsInfoQuery, PaymentsInfoQueryVariables>(PaymentsInfoDocument, options);
      }
export function usePaymentsInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentsInfoQuery, PaymentsInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentsInfoQuery, PaymentsInfoQueryVariables>(PaymentsInfoDocument, options);
        }
export type PaymentsInfoQueryHookResult = ReturnType<typeof usePaymentsInfoQuery>;
export type PaymentsInfoLazyQueryHookResult = ReturnType<typeof usePaymentsInfoLazyQuery>;
export type PaymentsInfoQueryResult = Apollo.QueryResult<PaymentsInfoQuery, PaymentsInfoQueryVariables>;
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
export function useRecentlyAddedQuery(baseOptions?: Apollo.QueryHookOptions<RecentlyAddedQuery, RecentlyAddedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentlyAddedQuery, RecentlyAddedQueryVariables>(RecentlyAddedDocument, options);
      }
export function useRecentlyAddedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentlyAddedQuery, RecentlyAddedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentlyAddedQuery, RecentlyAddedQueryVariables>(RecentlyAddedDocument, options);
        }
export type RecentlyAddedQueryHookResult = ReturnType<typeof useRecentlyAddedQuery>;
export type RecentlyAddedLazyQueryHookResult = ReturnType<typeof useRecentlyAddedLazyQuery>;
export type RecentlyAddedQueryResult = Apollo.QueryResult<RecentlyAddedQuery, RecentlyAddedQueryVariables>;
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
export function useTopChartQuery(baseOptions?: Apollo.QueryHookOptions<TopChartQuery, TopChartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopChartQuery, TopChartQueryVariables>(TopChartDocument, options);
      }
export function useTopChartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopChartQuery, TopChartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopChartQuery, TopChartQueryVariables>(TopChartDocument, options);
        }
export type TopChartQueryHookResult = ReturnType<typeof useTopChartQuery>;
export type TopChartLazyQueryHookResult = ReturnType<typeof useTopChartLazyQuery>;
export type TopChartQueryResult = Apollo.QueryResult<TopChartQuery, TopChartQueryVariables>;
export const UserLikesDocument = gql`
    query userLikes {
  userLikes {
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
 * __useUserLikesQuery__
 *
 * To run a query within a React component, call `useUserLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLikesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserLikesQuery(baseOptions?: Apollo.QueryHookOptions<UserLikesQuery, UserLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserLikesQuery, UserLikesQueryVariables>(UserLikesDocument, options);
      }
export function useUserLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserLikesQuery, UserLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserLikesQuery, UserLikesQueryVariables>(UserLikesDocument, options);
        }
export type UserLikesQueryHookResult = ReturnType<typeof useUserLikesQuery>;
export type UserLikesLazyQueryHookResult = ReturnType<typeof useUserLikesLazyQuery>;
export type UserLikesQueryResult = Apollo.QueryResult<UserLikesQuery, UserLikesQueryVariables>;