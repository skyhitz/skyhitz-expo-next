import { User } from "app/api/graphql";
import { Text, View, Image } from "app/design-system";

type Props = {
  user: User;
};
export function UserAvatar({ user }: Props) {
  if (user.avatarUrl) {
    return (
      <Image
        source={{ uri: user.avatarUrl }}
        className="h-10 w-10 rounded-2xl"
        onError={() => this.loadFallback()}
      />
    );
  }

  const initials = "TODO";

  return (
    <View className="h-10 w-10 rounded-2xl bg-blue-light items-center justify-center flex">
      <Text className="text-sm text-center">{initials}</Text>
    </View>
  );
}
