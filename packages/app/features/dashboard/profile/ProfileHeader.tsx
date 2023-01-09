import { Image, View, Pressable } from "app/design-system";
import { imageSrc } from "app/utils/entry";
import { UserAvatar } from "app/ui/userAvatar";
import { tw } from "app/design-system/tailwind";
import Twitter from "app/ui/icons/twitter";
import Instagram from "app/ui/icons/instagram";
import { Linking } from "react-native";
import { ShareButton } from "app/ui/buttons/ShareButton";

type Props = {
  background: string;
  avatar: string;
  displayName: string;
  twitter?: string;
  instagram?: string;
  profileUrl?: string;
};
export function ProfileHeader({
  background,
  avatar,
  displayName,
  twitter,
  instagram,
  profileUrl,
}: Props) {
  return (
    <View className="h-50 md:h-90 w-full">
      {background ? (
        <Image
          uri={imageSrc(background)}
          className="w-full h-40 md:h-80"
          resizeMode="cover"
        />
      ) : (
        <View className="bg-blue-field w-full h-40 md:h-80" />
      )}

      <View className="absolute bottom-0 left-5 md:left-20 flex-row items-end">
        <UserAvatar
          avatarUrl={avatar}
          displayName={displayName}
          size="xlarge"
        />
      </View>
      <View className="-bottom-4 flex flex-row-reverse">
        {!!twitter && (
          <Pressable
            className="ml-3 mr-3"
            onPress={() => Linking.openURL(`https://twitter.com/${twitter}`)}
          >
            <Twitter size={20} color={tw.color("white")} />
          </Pressable>
        )}
        {!!instagram && (
          <Pressable
            className="ml-3 mr-3"
            onPress={() =>
              Linking.openURL(`https://instagram.com/${instagram}`)
            }
          >
            <Instagram size={20} color={tw.color("white")} />
          </Pressable>
        )}
        {!!profileUrl && (
          <View className="mr-3">
            <ShareButton url={profileUrl} title="Share profile" />
          </View>
        )}
      </View>
    </View>
  );
}
