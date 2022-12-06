import { ApolloCache, useApolloClient } from "@apollo/client";
import {
  Entry,
  EntryLikesDocument,
  EntryLikesQuery,
  PublicUser,
  User,
  UserLikesDocument,
  UserLikesQuery,
} from "app/api/graphql";
import { isSome } from "app/utils";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useCallback } from "react";
import { prepend } from "ramda";

export default function useLikeCache() {
  const user = useRecoilValue(userAtom);
  const { cache } = useApolloClient();
  const publicUser = userToPublicUser(user);

  const addLikeToCache = useCallback(
    (entry) => addLike(cache, publicUser, entry),
    [cache, publicUser]
  );
  const removeLikeFromCache = useCallback(
    (entry) => removeLike(cache, publicUser, entry),
    [cache, publicUser]
  );

  return { addLikeToCache, removeLikeFromCache };
}

function userToPublicUser(user: User | null): PublicUser | null {
  if (!user) return null;
  return {
    __typename: "PublicUser",
    avatarUrl: user.avatarUrl,
    description: user.description,
    displayName: user.displayName,
    id: user.id,
    username: user.username,
  };
}

function addLike(
  cache: ApolloCache<unknown>,
  user: null | PublicUser,
  entry: Entry
) {
  if (!user) return;

  cache.updateQuery(
    { query: UserLikesDocument, overwrite: true },
    getAddToUserLikesCacheUpdate(entry)
  );

  cache.updateQuery(
    { query: EntryLikesDocument, variables: { id: entry.id }, overwrite: true },
    getAddToEntryLikesCacheUpdate(user)
  );
}

function getAddToEntryLikesCacheUpdate(user: PublicUser) {
  return (data: any) => {
    const update: Partial<EntryLikesQuery> = {
      entryLikes: {
        users: prepend(user, data?.entryLikes?.users ?? []),
      },
    };

    return update;
  };
}

function getAddToUserLikesCacheUpdate(entry: Entry) {
  return (data: any) => {
    const update: Partial<UserLikesQuery> = {
      userLikes: prepend(entry, data?.userLikes ?? []),
    };

    return update;
  };
}

function removeLike(
  cache: ApolloCache<unknown>,
  user: null | PublicUser,
  entry: Entry
) {
  if (!user) return;

  cache.updateQuery(
    { query: UserLikesDocument, overwrite: true },
    getRemoveFromUserLikesCacheUpdate(entry)
  );

  cache.updateQuery(
    { query: EntryLikesDocument, variables: { id: entry.id }, overwrite: true },
    getRemoveFromEntryLikesUpdate(user)
  );
}

function getRemoveFromUserLikesCacheUpdate(entry: Entry) {
  return (data: any) => {
    const typedData = data as UserLikesQuery;
    if (!typedData || !typedData.userLikes) return;

    const update: Partial<UserLikesQuery> = {
      userLikes: typedData.userLikes.filter(
        (item) => isSome(item) && item.id !== entry.id
      ),
    };

    return update;
  };
}

function getRemoveFromEntryLikesUpdate(user: PublicUser) {
  return (data: any) => {
    const typedData = data as EntryLikesQuery;
    if (!typedData || !typedData.entryLikes?.users) {
      return;
    }

    const update: Partial<EntryLikesQuery> = {
      entryLikes: {
        users: typedData.entryLikes.users.filter(
          (item) => isSome(item) && item.id !== user.id
        ),
      },
    };

    return update;
  };
}
