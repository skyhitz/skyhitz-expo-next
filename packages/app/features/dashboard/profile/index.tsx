import { Text, View } from "app/design-system";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/atoms";
import { UserAvatar } from "app/ui/userAvatar";
import Cog from "app/ui/icons/cog";
import { tw } from "app/design-system/tailwind";
import Wallet from "app/ui/icons/wallet";
import { SafeAreaView } from "app/design-system/safe-area-view";
import Like from "app/ui/icons/like";
import StarBorder from "app/ui/icons/star-border";
import { MintNewNftBtn } from "app/features/dashboard/profile/mintNewNftBtn";
import { BuyXlmBtn } from "app/features/dashboard/profile/buyXlmBtn";
import { ProfileRow } from "app/features/dashboard/profile/profileRowProps";

export function ProfileScreen() {
  const user = useRecoilValue(userAtom)!;

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto"
    >
      <View className="flex flex-row items-center py-4 ">
        <UserAvatar user={user} big />
        <View className="ml-8 flex-1">
          <View className="flex flex-row items-center mb-2.5">
            <Text className="font-bold mr-2.5">{user.displayName}</Text>
            <Cog color={tw.color("white")} size={18} />
          </View>
          <View className="flex flex-row items-center">
            <Wallet color={tw.color("white")} size={18} />
            <Text
              numberOfLines={1}
              ellipsizeMode="middle"
              className="ml-2.5m text-xs font-bold flex-1"
            >
              {user.publicKey}
            </Text>
          </View>
        </View>
      </View>
      <ProfileRow
        icon={<Like size={24} color={tw.color("blue")} />}
        number={3}
        title="Likes"
      />
      <ProfileRow
        icon={<StarBorder size={24} color={tw.color("blue")} />}
        title="Collections"
      />
      <BuyXlmBtn />
      <MintNewNftBtn />
    </SafeAreaView>
  );
}
