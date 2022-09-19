import { Entry, PublicUser, useEntryLikesQuery } from "app/api/graphql";
import { ActivityIndicator, Text, View } from "app/design-system";
import LikeButton from "app/ui/buttons/likeButton";
import { UserAvatar } from "app/ui/userAvatar";
import { FlatList } from "react-native";
import { isSome } from "app/utils";
import React from "react";

type Props = {
  entry: Entry;
  classname?: string;
};

export function LikesList({ entry, classname = "" }: Props) {
  const { data, loading } = useEntryLikesQuery({
    variables: {
      id: entry.id!,
    },
  });

  const renderItem = ({ item }: { item: PublicUser }) => {
    return (
      <View className="mr-2" key={item.id}>
        <UserAvatar avatarUrl={item.avatarUrl} displayName={item.displayName} />
      </View>
    );
  };

  return (
    <View className={`w-full mb-10 flex ${classname}`}>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-sm text-white">Liked By</Text>
        <LikeButton size={24} entry={entry} />
      </View>
      <View className="flex flex-row mt-2.5 min-h-10">
        <FlatList
          data={data?.entryLikes?.users?.filter(isSome)}
          keyExtractor={(item) => item.id!}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<ListEmptyComponent loading={loading} />}
        />
      </View>
    </View>
  );
}

function ListEmptyComponent({ loading }: { loading: boolean }) {
  return (
    <View className="flex items-center justify-center">
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text className="text-sm">Be first to like this beat</Text>
      )}
    </View>
  );
}
