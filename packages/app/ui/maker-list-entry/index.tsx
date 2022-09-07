import { User } from "app/api/graphql";
import { Text, View } from "app/design-system";
import { UserAvatar } from "app/ui/userAvatar";

export function MakerListEntry({ user }: { user: User }) {
  return (
    <View className="w-full flex items-center flex-row py-2">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        displayName={user.displayName}
        size="small"
      />
      <View>
        <View className="px-2 flex justify-center flex-1">
          <Text numberOfLines={1} className="text-xs font-bold">
            {user.username}
          </Text>
          <Text numberOfLines={1} className="text-xs mt-1">
            {user.displayName}
          </Text>
        </View>
      </View>
    </View>
  );
}
