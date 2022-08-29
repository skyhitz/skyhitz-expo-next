import { User } from "app/api/graphql";
import { Text, View } from "app/design-system";
import { Image } from "react-native";
import { getInitials } from "app/utils/user";
import { tw } from "app/design-system/tailwind";

export function MakerListEntry({ user }: { user: User }) {
  return (
    <View className="w-full flex items-center flex-row py-2">
      <View className="relative w-8 h-8 bg-blue rounded-full overflow-hidden">
        <View className="w-8 h-8 flex items-center justify-center">
          <Text className="text-xs text-black leading-none">
            {getInitials(user.displayName!)}
          </Text>
        </View>
        {!!user.avatarUrl && (
          <Image
            source={{
              uri: user.avatarUrl!,
              width: 32,
              height: 32,
            }}
            style={tw`rounded-full absolute`}
          />
        )}
      </View>

      <View>
        <View className="ml-2 flex justify-center flex-1 pr-2">
          <Text numberOfLines={1} className="text-xs -tracking-tight leading-5">
            {user.username}
          </Text>
          <Text numberOfLines={1} className="text-xs -tracking-tight leading-5">
            {user.displayName}
          </Text>
        </View>
      </View>
    </View>
  );
}
