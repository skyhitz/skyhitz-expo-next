import { Button, Text, View } from "app/design-system";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { UserAvatar } from "app/ui/userAvatar";
import Cog from "app/ui/icons/cog";
import { tw } from "app/design-system/tailwind";
import Wallet from "app/ui/icons/wallet";
import { SafeAreaView } from "app/design-system/safe-area-view";
import Like from "app/ui/icons/like";
import StarBorder from "app/ui/icons/star-border";
import { ProfileRow } from "app/features/dashboard/profile/profileRowProps";
import { TextEllipsis } from "app/features/dashboard/profile/textEllipsis";
import { Link } from "solito/link";
import Dollar from "app/ui/icons/dollar";
import Upload from "app/ui/icons/upload";
import { useRouter } from "solito/router";
import { usePaymentsInfoQuery } from "app/api/graphql";

export function ProfileScreen() {
  const user = useRecoilValue(userAtom)!;
  const { data } = usePaymentsInfoQuery();
  const { push } = useRouter();

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto"
    >
      <View className="flex flex-row items-center py-4 ">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          displayName={user.displayName}
          size="large"
        />
        <View className="ml-8 flex-1">
          <View className="flex flex-row items-center mb-2.5">
            <Text className="font-bold mr-2.5">{user.displayName}</Text>
            <Dollar size={22} color={tw.color("white")} />
            <Text className="font-bold ml-1 mr-2.5">
              {data?.paymentsInfo?.credits?.toFixed(2) ?? ""}
            </Text>
            <Link href={"/dashboard/profile/edit"}>
              <Cog color={tw.color("white")} size={18} />
            </Link>
          </View>
          <View className="flex flex-row items-center">
            <Wallet color={tw.color("white")} size={18} />
            <TextEllipsis text={user.publicKey!} />
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
      <Button
        text="Buy XLM"
        onPress={() => {}}
        icon={Dollar}
        className="mx-auto my-16"
        size="large"
      />
      <Button
        text="Mint new NFT"
        onPress={() => {
          // TODO add low balance modal
          if ((data?.paymentsInfo?.credits ?? 0) > 2) {
            push("/dashboard/profile/mint");
          }
        }}
        icon={Upload}
        className="mx-auto"
        size="large"
        disabled={(data?.paymentsInfo?.credits ?? 0) <= 2}
      />
    </SafeAreaView>
  );
}
