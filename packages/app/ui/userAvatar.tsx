import { User } from "app/api/graphql";
import { Text, View, Image } from "app/design-system";
import { compose, join, map, split, take } from "ramda";

type Props = {
  user: User;
};
export function UserAvatar({ user }: Props) {
  if (user.avatarUrl) {
    return (
      <Image
        source={{ uri: user.avatarUrl }}
        className="h-10 w-10 rounded-full"
        resizeMode="cover"
      />
    );
  }

  let initials = "";
  if (user.displayName) {
    initials = compose(
      join(""),
      take(2),
      map((part) => part[0]),
      split(" ")
    )(user.displayName);
  }

  return (
    <View className="h-10 w-10 rounded-full bg-blue-light items-center justify-center flex">
      <Text className="text-sm text-center">{initials}</Text>
    </View>
  );
}