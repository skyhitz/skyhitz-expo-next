import { User } from "app/api/graphql";
import { Text, View } from "app/design-system";
import { UserAvatar } from "app/ui/userAvatar";

type Props = {
  likers: User[];
};

export function LikesList({ likers }: Props) {
  return (
    <View className="w-full flex-1 flex">
      <View className="flex flex-row justify-between">
        <Text className="text-sm text-white">Liked By</Text>
        <Text>Like</Text>
      </View>
      <View className="flex flex-row mt-2.5 min-h-10 space-x-2">
        {likers.map((liker: User) => (
          <UserAvatar user={liker} key={liker.id} />
        ))}
      </View>
    </View>
  );
}
