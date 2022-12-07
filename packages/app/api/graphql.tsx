import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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

export type AccountCredits = {
  __typename?: "AccountCredits";
  credits: Scalars["Float"];
};

export type ActivityPrice = {
  __typename?: "ActivityPrice";
  d: Scalars["Int"];
  n: Scalars["Int"];
};

export type ConditionalUser = {
  __typename?: "ConditionalUser";
  message: Scalars["String"];
  user?: Maybe<User>;
};

export type ConditionalXdr = {
  __typename?: "ConditionalXDR";
  message?: Maybe<Scalars["String"]>;
  submitted: Scalars["Boolean"];
  success: Scalars["Boolean"];
  xdr?: Maybe<Scalars["String"]>;
};

export type Entry = {
  __typename?: "Entry";
  artist: Scalars["String"];
  code: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  imageUrl: Scalars["String"];
  issuer: Scalars["String"];
  title: Scalars["String"];
  videoUrl: Scalars["String"];
};

export type EntryActivity = {
  __typename?: "EntryActivity";
  accounts?: Maybe<Array<Maybe<Scalars["String"]>>>;
  amount?: Maybe<Scalars["String"]>;
  assets?: Maybe<Array<Maybe<Scalars["String"]>>>;
  createdOffer?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  offer?: Maybe<Scalars["String"]>;
  price?: Maybe<ActivityPrice>;
  sourceAmount?: Maybe<Scalars["String"]>;
  ts: Scalars["Int"];
  tx: Scalars["String"];
  type: Scalars["Int"];
};

export type EntryDetails = {
  __typename?: "EntryDetails";
  artist: Scalars["String"];
  code: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  history?: Maybe<Array<EntryActivity>>;
  holders?: Maybe<Array<EntryHolder>>;
  id: Scalars["String"];
  imageUrl: Scalars["String"];
  issuer: Scalars["String"];
  offers?: Maybe<Array<EntryActivity>>;
  title: Scalars["String"];
  videoUrl: Scalars["String"];
};

export type EntryHolder = {
  __typename?: "EntryHolder";
  account: Scalars["String"];
  balance: Scalars["String"];
};

export type EntryLikes = {
  __typename?: "EntryLikes";
  count: Scalars["Int"];
  users?: Maybe<Array<Maybe<PublicUser>>>;
};

export type EntryPrice = {
  __typename?: "EntryPrice";
  amount: Scalars["String"];
  price: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  buyEntry: ConditionalXdr;
  cancelBid: ConditionalXdr;
  changeWallet: User;
  createBid: ConditionalXdr;
  createEntry: ConditionalXdr;
  createUserWithEmail: ConditionalUser;
  indexEntry: Entry;
  likeEntry: Scalars["Boolean"];
  removeEntry: Scalars["Boolean"];
  requestToken: Scalars["Boolean"];
  setLastPlayedEntry: Scalars["Boolean"];
  signInWithToken: User;
  signInWithXDR: User;
  updatePricing: ConditionalXdr;
  updateUser: User;
  withdrawToExternalWallet: Scalars["Boolean"];
};

export type MutationBuyEntryArgs = {
  amount: Scalars["Float"];
  id: Scalars["String"];
  price: Scalars["Float"];
};

export type MutationCancelBidArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type MutationChangeWalletArgs = {
  signedXDR: Scalars["String"];
};

export type MutationCreateBidArgs = {
  equityToBuy: Scalars["Float"];
  id: Scalars["String"];
  price: Scalars["Int"];
};

export type MutationCreateEntryArgs = {
  code: Scalars["String"];
  equityForSale: Scalars["Float"];
  fileCid: Scalars["String"];
  forSale: Scalars["Boolean"];
  metaCid: Scalars["String"];
  price: Scalars["Int"];
};

export type MutationCreateUserWithEmailArgs = {
  displayName: Scalars["String"];
  email: Scalars["String"];
  signedXDR?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationIndexEntryArgs = {
  issuer: Scalars["String"];
};

export type MutationLikeEntryArgs = {
  id: Scalars["String"];
  like: Scalars["Boolean"];
};

export type MutationRemoveEntryArgs = {
  id: Scalars["String"];
};

export type MutationRequestTokenArgs = {
  usernameOrEmail: Scalars["String"];
};

export type MutationSetLastPlayedEntryArgs = {
  entryId: Scalars["String"];
};

export type MutationSignInWithTokenArgs = {
  token: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationSignInWithXdrArgs = {
  signedXDR: Scalars["String"];
};

export type MutationUpdatePricingArgs = {
  equityForSale: Scalars["Int"];
  forSale: Scalars["Boolean"];
  id: Scalars["String"];
  price: Scalars["Int"];
};

export type MutationUpdateUserArgs = {
  avatarUrl?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type MutationWithdrawToExternalWalletArgs = {
  address: Scalars["String"];
  amount: Scalars["Int"];
};

export type PublicUser = {
  __typename?: "PublicUser";
  avatarUrl: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  username: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  authenticatedUser: User;
  entry: EntryDetails;
  entryLikes: EntryLikes;
  entryPrice: EntryPrice;
  getAudibleToken: Token;
  getIssuer: Scalars["String"];
  userCredits: Scalars["Float"];
  userEntries: Array<Entry>;
  userLikes: Array<Entry>;
  xlmPrice: Scalars["String"];
};

export type QueryEntryArgs = {
  id: Scalars["String"];
};

export type QueryEntryLikesArgs = {
  id: Scalars["String"];
};

export type QueryEntryPriceArgs = {
  id: Scalars["String"];
};

export type QueryGetIssuerArgs = {
  cid: Scalars["String"];
};

export type QueryUserEntriesArgs = {
  userId: Scalars["String"];
};

export type Token = {
  __typename?: "Token";
  token: Scalars["String"];
};

export type User = {
  __typename?: "User";
  avatarUrl: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  id: Scalars["String"];
  jwt?: Maybe<Scalars["String"]>;
  lastPlayedEntry?: Maybe<Entry>;
  managed: Scalars["Boolean"];
  publicKey: Scalars["String"];
  publishedAt?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
  version?: Maybe<Scalars["Int"]>;
};

export type BuyEntryMutationVariables = Exact<{
  id: Scalars["String"];
  amount: Scalars["Float"];
  price: Scalars["Float"];
}>;

export type BuyEntryMutation = {
  __typename?: "Mutation";
  buyEntry: {
    __typename?: "ConditionalXDR";
    xdr?: string | null;
    success: boolean;
    submitted: boolean;
  };
};

export type CancelBidMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type CancelBidMutation = {
  __typename?: "Mutation";
  cancelBid: {
    __typename?: "ConditionalXDR";
    xdr?: string | null;
    success: boolean;
    submitted: boolean;
  };
};

export type ChangeWalletMutationVariables = Exact<{
  signedXDR: Scalars["String"];
}>;

export type ChangeWalletMutation = {
  __typename?: "Mutation";
  changeWallet: {
    __typename?: "User";
    avatarUrl: string;
    displayName?: string | null;
    email: string;
    username: string;
    id: string;
    publishedAt?: string | null;
    version?: number | null;
    jwt?: string | null;
    description?: string | null;
    publicKey: string;
    managed: boolean;
  };
};

export type CreateBidMutationVariables = Exact<{
  id: Scalars["String"];
  price: Scalars["Int"];
  equityToBuy: Scalars["Float"];
}>;

export type CreateBidMutation = {
  __typename?: "Mutation";
  createBid: {
    __typename?: "ConditionalXDR";
    xdr?: string | null;
    success: boolean;
    submitted: boolean;
  };
};

export type CreateEntryMutationVariables = Exact<{
  fileCid: Scalars["String"];
  metaCid: Scalars["String"];
  code: Scalars["String"];
  forSale: Scalars["Boolean"];
  price: Scalars["Int"];
  equityForSale: Scalars["Float"];
}>;

export type CreateEntryMutation = {
  __typename?: "Mutation";
  createEntry: {
    __typename?: "ConditionalXDR";
    xdr?: string | null;
    success: boolean;
    submitted: boolean;
    message?: string | null;
  };
};

export type CreateUserWithEmailMutationVariables = Exact<{
  displayName: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  signedXDR: Scalars["String"];
}>;

export type CreateUserWithEmailMutation = {
  __typename?: "Mutation";
  createUserWithEmail: {
    __typename?: "ConditionalUser";
    message: string;
    user?: {
      __typename?: "User";
      avatarUrl: string;
      displayName?: string | null;
      username: string;
      id: string;
      jwt?: string | null;
      publishedAt?: string | null;
      email: string;
      description?: string | null;
      publicKey: string;
      managed: boolean;
      lastPlayedEntry?: {
        __typename?: "Entry";
        imageUrl: string;
        videoUrl: string;
        description?: string | null;
        title: string;
        id: string;
        artist: string;
        code: string;
        issuer: string;
      } | null;
    } | null;
  };
};

export type IndexEntryMutationVariables = Exact<{
  issuer: Scalars["String"];
}>;

export type IndexEntryMutation = {
  __typename?: "Mutation";
  indexEntry: {
    __typename?: "Entry";
    imageUrl: string;
    videoUrl: string;
    description?: string | null;
    title: string;
    id: string;
    artist: string;
    code: string;
    issuer: string;
  };
};

export type LikeEntryMutationVariables = Exact<{
  id: Scalars["String"];
  like: Scalars["Boolean"];
}>;

export type LikeEntryMutation = { __typename?: "Mutation"; likeEntry: boolean };

export type RequestTokenMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"];
}>;

export type RequestTokenMutation = {
  __typename?: "Mutation";
  requestToken: boolean;
};

export type SetLastPlayedEntryMutationVariables = Exact<{
  entryId: Scalars["String"];
}>;

export type SetLastPlayedEntryMutation = {
  __typename?: "Mutation";
  setLastPlayedEntry: boolean;
};

export type SignInWithTokenMutationVariables = Exact<{
  token: Scalars["String"];
  uid: Scalars["String"];
}>;

export type SignInWithTokenMutation = {
  __typename?: "Mutation";
  signInWithToken: {
    __typename?: "User";
    avatarUrl: string;
    displayName?: string | null;
    username: string;
    id: string;
    jwt?: string | null;
    publishedAt?: string | null;
    email: string;
    description?: string | null;
    publicKey: string;
    managed: boolean;
    lastPlayedEntry?: {
      __typename?: "Entry";
      imageUrl: string;
      videoUrl: string;
      description?: string | null;
      title: string;
      id: string;
      artist: string;
      code: string;
      issuer: string;
    } | null;
  };
};

export type SignInWithXdrMutationVariables = Exact<{
  signedXDR: Scalars["String"];
}>;

export type SignInWithXdrMutation = {
  __typename?: "Mutation";
  signInWithXDR: {
    __typename?: "User";
    avatarUrl: string;
    displayName?: string | null;
    username: string;
    id: string;
    jwt?: string | null;
    publishedAt?: string | null;
    email: string;
    description?: string | null;
    publicKey: string;
    managed: boolean;
    lastPlayedEntry?: {
      __typename?: "Entry";
      imageUrl: string;
      videoUrl: string;
      description?: string | null;
      title: string;
      id: string;
      artist: string;
      code: string;
      issuer: string;
    } | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  avatarUrl?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "User";
    avatarUrl: string;
    displayName?: string | null;
    email: string;
    username: string;
    id: string;
    publishedAt?: string | null;
    version?: number | null;
    jwt?: string | null;
    description?: string | null;
    publicKey: string;
    managed: boolean;
  };
};

export type WithdrawToExternalWalletMutationVariables = Exact<{
  address: Scalars["String"];
  amount: Scalars["Int"];
}>;

export type WithdrawToExternalWalletMutation = {
  __typename?: "Mutation";
  withdrawToExternalWallet: boolean;
};

export type EntryDetailsQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type EntryDetailsQuery = {
  __typename?: "Query";
  entry: {
    __typename?: "EntryDetails";
    imageUrl: string;
    videoUrl: string;
    description?: string | null;
    title: string;
    id: string;
    artist: string;
    code: string;
    issuer: string;
    holders?: Array<{
      __typename?: "EntryHolder";
      account: string;
      balance: string;
    }> | null;
    history?: Array<{
      __typename?: "EntryActivity";
      id: string;
      type: number;
      ts: number;
      accounts?: Array<string | null> | null;
      assets?: Array<string | null> | null;
      tx: string;
      offer?: string | null;
      amount?: string | null;
      sourceAmount?: string | null;
      price?: { __typename?: "ActivityPrice"; n: number; d: number } | null;
    }> | null;
    offers?: Array<{
      __typename?: "EntryActivity";
      id: string;
      type: number;
      ts: number;
      accounts?: Array<string | null> | null;
      assets?: Array<string | null> | null;
      tx: string;
      offer?: string | null;
      amount?: string | null;
      sourceAmount?: string | null;
      price?: { __typename?: "ActivityPrice"; n: number; d: number } | null;
    }> | null;
  };
};

export type EntryLikesQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type EntryLikesQuery = {
  __typename?: "Query";
  entryLikes: {
    __typename?: "EntryLikes";
    users?: Array<{
      __typename?: "PublicUser";
      avatarUrl: string;
      displayName?: string | null;
      username: string;
      id: string;
      description?: string | null;
    } | null> | null;
  };
};

export type GetIssuerQueryVariables = Exact<{
  cid: Scalars["String"];
}>;

export type GetIssuerQuery = { __typename?: "Query"; getIssuer: string };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never }>;

export type AuthenticatedUserQuery = {
  __typename?: "Query";
  authenticatedUser: {
    __typename?: "User";
    avatarUrl: string;
    displayName?: string | null;
    email: string;
    username: string;
    id: string;
    description?: string | null;
    jwt?: string | null;
    publicKey: string;
    managed: boolean;
    lastPlayedEntry?: {
      __typename?: "Entry";
      imageUrl: string;
      videoUrl: string;
      description?: string | null;
      title: string;
      id: string;
      artist: string;
      code: string;
      issuer: string;
    } | null;
  };
};

export type UserCreditsQueryVariables = Exact<{ [key: string]: never }>;

export type UserCreditsQuery = { __typename?: "Query"; userCredits: number };

export type UserCollectionQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type UserCollectionQuery = {
  __typename?: "Query";
  userEntries: Array<{
    __typename?: "Entry";
    imageUrl: string;
    videoUrl: string;
    description?: string | null;
    title: string;
    id: string;
    artist: string;
    code: string;
    issuer: string;
  }>;
};

export type UserLikesQueryVariables = Exact<{ [key: string]: never }>;

export type UserLikesQuery = {
  __typename?: "Query";
  userLikes: Array<{
    __typename?: "Entry";
    imageUrl: string;
    videoUrl: string;
    description?: string | null;
    title: string;
    id: string;
    artist: string;
    code: string;
    issuer: string;
  }>;
};

export const BuyEntryDocument = gql`
  mutation BuyEntry($id: String!, $amount: Float!, $price: Float!) {
    buyEntry(id: $id, amount: $amount, price: $price) {
      xdr
      success
      submitted
    }
  }
`;
export type BuyEntryMutationFn = Apollo.MutationFunction<
  BuyEntryMutation,
  BuyEntryMutationVariables
>;

/**
 * __useBuyEntryMutation__
 *
 * To run a mutation, you first call `useBuyEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyEntryMutation, { data, loading, error }] = useBuyEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      amount: // value for 'amount'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useBuyEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BuyEntryMutation,
    BuyEntryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BuyEntryMutation, BuyEntryMutationVariables>(
    BuyEntryDocument,
    options
  );
}
export type BuyEntryMutationHookResult = ReturnType<typeof useBuyEntryMutation>;
export type BuyEntryMutationResult = Apollo.MutationResult<BuyEntryMutation>;
export type BuyEntryMutationOptions = Apollo.BaseMutationOptions<
  BuyEntryMutation,
  BuyEntryMutationVariables
>;
export const CancelBidDocument = gql`
  mutation CancelBid($id: String!) {
    cancelBid(id: $id) {
      xdr
      success
      submitted
    }
  }
`;
export type CancelBidMutationFn = Apollo.MutationFunction<
  CancelBidMutation,
  CancelBidMutationVariables
>;

/**
 * __useCancelBidMutation__
 *
 * To run a mutation, you first call `useCancelBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBidMutation, { data, loading, error }] = useCancelBidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelBidMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelBidMutation,
    CancelBidMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CancelBidMutation, CancelBidMutationVariables>(
    CancelBidDocument,
    options
  );
}
export type CancelBidMutationHookResult = ReturnType<
  typeof useCancelBidMutation
>;
export type CancelBidMutationResult = Apollo.MutationResult<CancelBidMutation>;
export type CancelBidMutationOptions = Apollo.BaseMutationOptions<
  CancelBidMutation,
  CancelBidMutationVariables
>;
export const ChangeWalletDocument = gql`
  mutation changeWallet($signedXDR: String!) {
    changeWallet(signedXDR: $signedXDR) {
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
      managed
    }
  }
`;
export type ChangeWalletMutationFn = Apollo.MutationFunction<
  ChangeWalletMutation,
  ChangeWalletMutationVariables
>;

/**
 * __useChangeWalletMutation__
 *
 * To run a mutation, you first call `useChangeWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeWalletMutation, { data, loading, error }] = useChangeWalletMutation({
 *   variables: {
 *      signedXDR: // value for 'signedXDR'
 *   },
 * });
 */
export function useChangeWalletMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeWalletMutation,
    ChangeWalletMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeWalletMutation,
    ChangeWalletMutationVariables
  >(ChangeWalletDocument, options);
}
export type ChangeWalletMutationHookResult = ReturnType<
  typeof useChangeWalletMutation
>;
export type ChangeWalletMutationResult =
  Apollo.MutationResult<ChangeWalletMutation>;
export type ChangeWalletMutationOptions = Apollo.BaseMutationOptions<
  ChangeWalletMutation,
  ChangeWalletMutationVariables
>;
export const CreateBidDocument = gql`
  mutation CreateBid($id: String!, $price: Int!, $equityToBuy: Float!) {
    createBid(id: $id, price: $price, equityToBuy: $equityToBuy) {
      xdr
      success
      submitted
    }
  }
`;
export type CreateBidMutationFn = Apollo.MutationFunction<
  CreateBidMutation,
  CreateBidMutationVariables
>;

/**
 * __useCreateBidMutation__
 *
 * To run a mutation, you first call `useCreateBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBidMutation, { data, loading, error }] = useCreateBidMutation({
 *   variables: {
 *      id: // value for 'id'
 *      price: // value for 'price'
 *      equityToBuy: // value for 'equityToBuy'
 *   },
 * });
 */
export function useCreateBidMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBidMutation,
    CreateBidMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBidMutation, CreateBidMutationVariables>(
    CreateBidDocument,
    options
  );
}
export type CreateBidMutationHookResult = ReturnType<
  typeof useCreateBidMutation
>;
export type CreateBidMutationResult = Apollo.MutationResult<CreateBidMutation>;
export type CreateBidMutationOptions = Apollo.BaseMutationOptions<
  CreateBidMutation,
  CreateBidMutationVariables
>;
export const CreateEntryDocument = gql`
  mutation CreateEntry(
    $fileCid: String!
    $metaCid: String!
    $code: String!
    $forSale: Boolean!
    $price: Int!
    $equityForSale: Float!
  ) {
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
export type CreateEntryMutationFn = Apollo.MutationFunction<
  CreateEntryMutation,
  CreateEntryMutationVariables
>;

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
export function useCreateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEntryMutation,
    CreateEntryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(
    CreateEntryDocument,
    options
  );
}
export type CreateEntryMutationHookResult = ReturnType<
  typeof useCreateEntryMutation
>;
export type CreateEntryMutationResult =
  Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<
  CreateEntryMutation,
  CreateEntryMutationVariables
>;
export const CreateUserWithEmailDocument = gql`
  mutation createUserWithEmail(
    $displayName: String!
    $email: String!
    $username: String!
    $signedXDR: String!
  ) {
    createUserWithEmail(
      displayName: $displayName
      email: $email
      username: $username
      signedXDR: $signedXDR
    ) {
      message
      user {
        avatarUrl
        displayName
        username
        id
        jwt
        publishedAt
        email
        description
        publicKey
        managed
        lastPlayedEntry {
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
 *      signedXDR: // value for 'signedXDR'
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
export const IndexEntryDocument = gql`
  mutation IndexEntry($issuer: String!) {
    indexEntry(issuer: $issuer) {
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
export type IndexEntryMutationFn = Apollo.MutationFunction<
  IndexEntryMutation,
  IndexEntryMutationVariables
>;

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
export function useIndexEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IndexEntryMutation,
    IndexEntryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IndexEntryMutation, IndexEntryMutationVariables>(
    IndexEntryDocument,
    options
  );
}
export type IndexEntryMutationHookResult = ReturnType<
  typeof useIndexEntryMutation
>;
export type IndexEntryMutationResult =
  Apollo.MutationResult<IndexEntryMutation>;
export type IndexEntryMutationOptions = Apollo.BaseMutationOptions<
  IndexEntryMutation,
  IndexEntryMutationVariables
>;
export const LikeEntryDocument = gql`
  mutation likeEntry($id: String!, $like: Boolean!) {
    likeEntry(id: $id, like: $like)
  }
`;
export type LikeEntryMutationFn = Apollo.MutationFunction<
  LikeEntryMutation,
  LikeEntryMutationVariables
>;

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
export function useLikeEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikeEntryMutation,
    LikeEntryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LikeEntryMutation, LikeEntryMutationVariables>(
    LikeEntryDocument,
    options
  );
}
export type LikeEntryMutationHookResult = ReturnType<
  typeof useLikeEntryMutation
>;
export type LikeEntryMutationResult = Apollo.MutationResult<LikeEntryMutation>;
export type LikeEntryMutationOptions = Apollo.BaseMutationOptions<
  LikeEntryMutation,
  LikeEntryMutationVariables
>;
export const RequestTokenDocument = gql`
  mutation requestToken($usernameOrEmail: String!) {
    requestToken(usernameOrEmail: $usernameOrEmail)
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
export const SetLastPlayedEntryDocument = gql`
  mutation setLastPlayedEntry($entryId: String!) {
    setLastPlayedEntry(entryId: $entryId)
  }
`;
export type SetLastPlayedEntryMutationFn = Apollo.MutationFunction<
  SetLastPlayedEntryMutation,
  SetLastPlayedEntryMutationVariables
>;

/**
 * __useSetLastPlayedEntryMutation__
 *
 * To run a mutation, you first call `useSetLastPlayedEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLastPlayedEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLastPlayedEntryMutation, { data, loading, error }] = useSetLastPlayedEntryMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useSetLastPlayedEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetLastPlayedEntryMutation,
    SetLastPlayedEntryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetLastPlayedEntryMutation,
    SetLastPlayedEntryMutationVariables
  >(SetLastPlayedEntryDocument, options);
}
export type SetLastPlayedEntryMutationHookResult = ReturnType<
  typeof useSetLastPlayedEntryMutation
>;
export type SetLastPlayedEntryMutationResult =
  Apollo.MutationResult<SetLastPlayedEntryMutation>;
export type SetLastPlayedEntryMutationOptions = Apollo.BaseMutationOptions<
  SetLastPlayedEntryMutation,
  SetLastPlayedEntryMutationVariables
>;
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
      managed
      lastPlayedEntry {
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
  }
`;
export type SignInWithTokenMutationFn = Apollo.MutationFunction<
  SignInWithTokenMutation,
  SignInWithTokenMutationVariables
>;

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
export function useSignInWithTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInWithTokenMutation,
    SignInWithTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SignInWithTokenMutation,
    SignInWithTokenMutationVariables
  >(SignInWithTokenDocument, options);
}
export type SignInWithTokenMutationHookResult = ReturnType<
  typeof useSignInWithTokenMutation
>;
export type SignInWithTokenMutationResult =
  Apollo.MutationResult<SignInWithTokenMutation>;
export type SignInWithTokenMutationOptions = Apollo.BaseMutationOptions<
  SignInWithTokenMutation,
  SignInWithTokenMutationVariables
>;
export const SignInWithXdrDocument = gql`
  mutation signInWithXDR($signedXDR: String!) {
    signInWithXDR(signedXDR: $signedXDR) {
      avatarUrl
      displayName
      username
      id
      jwt
      publishedAt
      email
      description
      publicKey
      managed
      lastPlayedEntry {
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
  }
`;
export type SignInWithXdrMutationFn = Apollo.MutationFunction<
  SignInWithXdrMutation,
  SignInWithXdrMutationVariables
>;

/**
 * __useSignInWithXdrMutation__
 *
 * To run a mutation, you first call `useSignInWithXdrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithXdrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithXdrMutation, { data, loading, error }] = useSignInWithXdrMutation({
 *   variables: {
 *      signedXDR: // value for 'signedXDR'
 *   },
 * });
 */
export function useSignInWithXdrMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInWithXdrMutation,
    SignInWithXdrMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SignInWithXdrMutation,
    SignInWithXdrMutationVariables
  >(SignInWithXdrDocument, options);
}
export type SignInWithXdrMutationHookResult = ReturnType<
  typeof useSignInWithXdrMutation
>;
export type SignInWithXdrMutationResult =
  Apollo.MutationResult<SignInWithXdrMutation>;
export type SignInWithXdrMutationOptions = Apollo.BaseMutationOptions<
  SignInWithXdrMutation,
  SignInWithXdrMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser(
    $avatarUrl: String
    $displayName: String
    $description: String
    $username: String
    $email: String
  ) {
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
      managed
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

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
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const WithdrawToExternalWalletDocument = gql`
  mutation withdrawToExternalWallet($address: String!, $amount: Int!) {
    withdrawToExternalWallet(address: $address, amount: $amount)
  }
`;
export type WithdrawToExternalWalletMutationFn = Apollo.MutationFunction<
  WithdrawToExternalWalletMutation,
  WithdrawToExternalWalletMutationVariables
>;

/**
 * __useWithdrawToExternalWalletMutation__
 *
 * To run a mutation, you first call `useWithdrawToExternalWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWithdrawToExternalWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [withdrawToExternalWalletMutation, { data, loading, error }] = useWithdrawToExternalWalletMutation({
 *   variables: {
 *      address: // value for 'address'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useWithdrawToExternalWalletMutation(
  baseOptions?: Apollo.MutationHookOptions<
    WithdrawToExternalWalletMutation,
    WithdrawToExternalWalletMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    WithdrawToExternalWalletMutation,
    WithdrawToExternalWalletMutationVariables
  >(WithdrawToExternalWalletDocument, options);
}
export type WithdrawToExternalWalletMutationHookResult = ReturnType<
  typeof useWithdrawToExternalWalletMutation
>;
export type WithdrawToExternalWalletMutationResult =
  Apollo.MutationResult<WithdrawToExternalWalletMutation>;
export type WithdrawToExternalWalletMutationOptions =
  Apollo.BaseMutationOptions<
    WithdrawToExternalWalletMutation,
    WithdrawToExternalWalletMutationVariables
  >;
export const EntryDetailsDocument = gql`
  query entryDetails($id: String!) {
    entry(id: $id) {
      imageUrl
      videoUrl
      description
      title
      id
      artist
      code
      issuer
      holders {
        account
        balance
      }
      history {
        id
        type
        ts
        accounts
        assets
        tx
        offer
        amount
        price {
          n
          d
        }
        sourceAmount
      }
      offers {
        id
        type
        ts
        accounts
        assets
        tx
        offer
        amount
        price {
          n
          d
        }
        sourceAmount
      }
    }
  }
`;

/**
 * __useEntryDetailsQuery__
 *
 * To run a query within a React component, call `useEntryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntryDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    EntryDetailsQuery,
    EntryDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EntryDetailsQuery, EntryDetailsQueryVariables>(
    EntryDetailsDocument,
    options
  );
}
export function useEntryDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EntryDetailsQuery,
    EntryDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EntryDetailsQuery, EntryDetailsQueryVariables>(
    EntryDetailsDocument,
    options
  );
}
export type EntryDetailsQueryHookResult = ReturnType<
  typeof useEntryDetailsQuery
>;
export type EntryDetailsLazyQueryHookResult = ReturnType<
  typeof useEntryDetailsLazyQuery
>;
export type EntryDetailsQueryResult = Apollo.QueryResult<
  EntryDetailsQuery,
  EntryDetailsQueryVariables
>;
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
export function useEntryLikesQuery(
  baseOptions: Apollo.QueryHookOptions<
    EntryLikesQuery,
    EntryLikesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EntryLikesQuery, EntryLikesQueryVariables>(
    EntryLikesDocument,
    options
  );
}
export function useEntryLikesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EntryLikesQuery,
    EntryLikesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EntryLikesQuery, EntryLikesQueryVariables>(
    EntryLikesDocument,
    options
  );
}
export type EntryLikesQueryHookResult = ReturnType<typeof useEntryLikesQuery>;
export type EntryLikesLazyQueryHookResult = ReturnType<
  typeof useEntryLikesLazyQuery
>;
export type EntryLikesQueryResult = Apollo.QueryResult<
  EntryLikesQuery,
  EntryLikesQueryVariables
>;
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
export function useGetIssuerQuery(
  baseOptions: Apollo.QueryHookOptions<GetIssuerQuery, GetIssuerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetIssuerQuery, GetIssuerQueryVariables>(
    GetIssuerDocument,
    options
  );
}
export function useGetIssuerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetIssuerQuery,
    GetIssuerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetIssuerQuery, GetIssuerQueryVariables>(
    GetIssuerDocument,
    options
  );
}
export type GetIssuerQueryHookResult = ReturnType<typeof useGetIssuerQuery>;
export type GetIssuerLazyQueryHookResult = ReturnType<
  typeof useGetIssuerLazyQuery
>;
export type GetIssuerQueryResult = Apollo.QueryResult<
  GetIssuerQuery,
  GetIssuerQueryVariables
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
      managed
      lastPlayedEntry {
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
export const UserCreditsDocument = gql`
  query UserCredits {
    userCredits
  }
`;

/**
 * __useUserCreditsQuery__
 *
 * To run a query within a React component, call `useUserCreditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCreditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCreditsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCreditsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserCreditsQuery,
    UserCreditsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserCreditsQuery, UserCreditsQueryVariables>(
    UserCreditsDocument,
    options
  );
}
export function useUserCreditsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserCreditsQuery,
    UserCreditsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserCreditsQuery, UserCreditsQueryVariables>(
    UserCreditsDocument,
    options
  );
}
export type UserCreditsQueryHookResult = ReturnType<typeof useUserCreditsQuery>;
export type UserCreditsLazyQueryHookResult = ReturnType<
  typeof useUserCreditsLazyQuery
>;
export type UserCreditsQueryResult = Apollo.QueryResult<
  UserCreditsQuery,
  UserCreditsQueryVariables
>;
export const UserCollectionDocument = gql`
  query userCollection($userId: String!) {
    userEntries(userId: $userId) {
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
 * __useUserCollectionQuery__
 *
 * To run a query within a React component, call `useUserCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCollectionQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserCollectionQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserCollectionQuery,
    UserCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserCollectionQuery, UserCollectionQueryVariables>(
    UserCollectionDocument,
    options
  );
}
export function useUserCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserCollectionQuery,
    UserCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserCollectionQuery, UserCollectionQueryVariables>(
    UserCollectionDocument,
    options
  );
}
export type UserCollectionQueryHookResult = ReturnType<
  typeof useUserCollectionQuery
>;
export type UserCollectionLazyQueryHookResult = ReturnType<
  typeof useUserCollectionLazyQuery
>;
export type UserCollectionQueryResult = Apollo.QueryResult<
  UserCollectionQuery,
  UserCollectionQueryVariables
>;
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
export function useUserLikesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserLikesQuery, UserLikesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserLikesQuery, UserLikesQueryVariables>(
    UserLikesDocument,
    options
  );
}
export function useUserLikesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserLikesQuery,
    UserLikesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserLikesQuery, UserLikesQueryVariables>(
    UserLikesDocument,
    options
  );
}
export type UserLikesQueryHookResult = ReturnType<typeof useUserLikesQuery>;
export type UserLikesLazyQueryHookResult = ReturnType<
  typeof useUserLikesLazyQuery
>;
export type UserLikesQueryResult = Apollo.QueryResult<
  UserLikesQuery,
  UserLikesQueryVariables
>;
