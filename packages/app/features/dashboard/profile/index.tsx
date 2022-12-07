import { Button, Text, View } from "app/design-system";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { UserAvatar } from "app/ui/userAvatar";
import Cog from "app/ui/icons/cog";
import { tw } from "app/design-system/tailwind";
import { CopyWalletPublicKeyButton } from "app/ui/buttons/CopyWalletPublicKeyButton";
import { SafeAreaView } from "app/design-system/safe-area-view";
import Like from "app/ui/icons/like";
import StarBorder from "app/ui/icons/star-border";
import { ProfileRow } from "app/features/dashboard/profile/profileRow";
import { Link } from "solito/link";
import Dollar from "app/ui/icons/dollar";
import Upload from "app/ui/icons/upload";
import { useRouter } from "solito/router";
import { useState } from "react";
import { LowBalanceModal } from "./LowBalanceModal";
import {
  useUserCollectionQuery,
  useUserCreditsQuery,
  useUserLikesQuery,
} from "app/api/graphql";
import * as assert from "assert";
import { useUserBids } from "app/hooks/useUserBids";
// import { useSendwyreCheckout } from "app/hooks/useSendwyreCheckout";

export function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const user = useRecoilValue(userAtom);
  assert.ok(user?.id);
  const { data: credits } = useUserCreditsQuery();
  const { push } = useRouter();
  const { data: userLikesData } = useUserLikesQuery();
  const { data: userCollectionData } = useUserCollectionQuery({
    variables: { userId: user.id },
  });
  const { bids } = useUserBids(user.publicKey);
  // TODO uncomment when production ready
  // const { startCheckout, loading } = useSendwyreCheckout({
  //   publicAddress: user.publicKey!,
  // });

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
              {credits?.userCredits.toFixed(2) ?? ""}
            </Text>
            <Link href="/dashboard/profile/edit">
              <Cog color={tw.color("white")} size={18} />
            </Link>
          </View>
          <CopyWalletPublicKeyButton walletPublicKey={user.publicKey} />
        </View>
      </View>
      <ProfileRow
        icon={<Like size={24} color={tw.color("blue")} />}
        trailingNumber={userLikesData?.userLikes?.length}
        title="Likes"
        onPress={() => push("/dashboard/profile/likes")}
      />
      <ProfileRow
        icon={<StarBorder size={24} color={tw.color("blue")} />}
        trailingNumber={userCollectionData?.userEntries?.length}
        title="Collections"
        onPress={() => push("/dashboard/profile/collection")}
      />
      <ProfileRow
        icon={<StarBorder size={24} color={tw.color("blue")} />}
        trailingNumber={bids.length}
        title="Your bids"
        onPress={() => push("/dashboard/profile/bids")}
      />
      {/* <Button
        text="Buy XLM"
        onPress={startCheckout}
        icon={Dollar}
        loading={loading}
        disabled={loading}
        className="mx-auto mt-16"
        size="large"
      /> */}
      <Button
        text="Mint new NFT"
        onPress={() => {
          push("/dashboard/profile/mint");
        }}
        icon={Upload}
        className="mx-auto mt-16"
        size="large"
        disabled={(credits?.userCredits ?? 0) < 2}
        onDisabledPress={() => setModalVisible(true)}
      />

      <LowBalanceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        availableBalance={credits?.userCredits ?? 0}
        publicKey={user.publicKey}
      />
    </SafeAreaView>
  );
}
