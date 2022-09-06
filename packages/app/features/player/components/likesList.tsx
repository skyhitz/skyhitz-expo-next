import { User } from "app/api/graphql";
import { Text, View } from "app/design-system";
import { FavoriteButton } from "app/ui/buttons/favoriteButton";
import { UserAvatar } from "app/ui/userAvatar";
import { FlatList } from "react-native";

type Props = {
  likers: User[];
};

export function LikesList({ likers }: Props) {
  const renderItem = ({ item }: { item: User }) => {
    return (
      <View className="mr-2" key={item.id}>
        <UserAvatar user={item} />
      </View>
    );
  };

  return (
    <View className="w-full mb-10 flex">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-sm text-white">Liked By</Text>
        <FavoriteButton size={24} />
      </View>
      <View className="flex flex-row mt-2.5 min-h-10">
        <FlatList
          data={likers}
          keyExtractor={(item) => item.id!}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
