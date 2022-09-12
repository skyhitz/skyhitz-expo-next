import { ApolloCache } from "@apollo/client";
import { Entry, UserLikesDocument, UserLikesQuery } from "app/api/graphql";
import { isSome } from "app/utils/index";

export function removeLike(cache: ApolloCache<unknown>, entry: Entry) {
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

export function addLike(cache: ApolloCache<unknown>, entry: Entry) {
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
