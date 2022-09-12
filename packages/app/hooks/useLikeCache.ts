import { ApolloCache, useApolloClient } from "@apollo/client";
import { Entry, UserLikesDocument, UserLikesQuery } from "app/api/graphql";
import { isSome } from "app/utils";
import { useRecoilState } from "recoil";
import { userAtom } from "app/state/user";
import { useCallback } from "react";

function removeLike(cache: ApolloCache<unknown>, entry: Entry) {
  cache.updateQuery({ query: UserLikesDocument }, (data) => {
    const typedData = data as UserLikesQuery;
    if (!typedData || !typedData.userLikes) return;

    const update: Partial<UserLikesQuery> = {
      userLikes: typedData.userLikes
        .filter(isSome)
        .filter((item) => item.id !== entry.id),
    };

    return update;
  });
}

function addLike(cache: ApolloCache<unknown>, entry: Entry) {
  cache.updateQuery({ query: UserLikesDocument }, (data) => {
    const typedData = data as UserLikesQuery;
    if (
      !typedData ||
      !typedData.userLikes ||
      typedData.userLikes.some((item) => item?.id === entry.id)
    ) {
      return;
    }

    const update: Partial<UserLikesQuery> = {
      userLikes: typedData.userLikes.concat([entry]),
    };

    return update;
  });
}

export default function useLikeCache() {
  const user = useRecoilState(userAtom);
  const cache = useApolloClient().cache;

  const addLikeToCache = useCallback((entry) => addLike(cache, entry), [cache]);
  const removeLikeFromCache = useCallback(
    (entry) => removeLike(cache, entry),
    [cache]
  );

  return { addLikeToCache, removeLikeFromCache };
}
