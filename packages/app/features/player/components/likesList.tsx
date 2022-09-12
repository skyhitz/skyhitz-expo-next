import { Entry, PublicUser, useEntryLikesQuery } from "app/api/graphql";
import { Text, View } from "app/design-system";
import { LikeButton } from "app/ui/buttons/likeButton";
import { UserAvatar } from "app/ui/userAvatar";
import { FlatList } from "react-native";
import { isSome } from "app/utils";

type Props = {
  entry: Entry;
};

export function LikesList({ entry }: Props) {
  const { data } = useEntryLikesQuery({
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
    <View className="w-full mb-10 flex">
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
        />
      </View>
    </View>
  );
}
