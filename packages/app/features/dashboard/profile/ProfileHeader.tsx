import { Image, View } from "app/design-system";
import { imageSrc } from "app/utils/entry";
import { UserAvatar } from "app/ui/userAvatar";

type Props = {
  background: string;
  avatar: string;
  displayName: string;
  canEdit?: boolean;
};
export function ProfileHeader({ background, avatar, displayName }: Props) {
  return (
    <View className="h-50 md:h-90 w-full">
      {background && (
        <Image
          uri={imageSrc(background)}
          className="w-full h-40 md:h-80"
          resizeMode="cover"
        />
      )}
      {!background && <View className="bg-grey w-full h-40 md:h-80" />}

      <View className="absolute bottom-0 left-5 md:left-20 flex-row items-end">
        <UserAvatar
          avatarUrl={avatar}
          displayName={displayName}
          size="xlarge"
        />
      </View>
    </View>
  );
}
