import { Entry } from "app/api/graphql";
import { useState } from "react";
import { tw } from "app/design-system/tailwind";
import { Button, Modal, Pressable } from "app/design-system";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { BeatInfo } from "app/ui/beat-list-entry/show-more/beatInfo";
import { CancelBtn } from "app/ui/beat-list-entry/show-more/cancelBtn";
import VerticalDots from "app/ui/icons/verticalDots";
import { LikesList } from "app/features/player/components/likesList";
import { useRouter } from "solito/router";
import { BuyNowBtn } from "app/ui/buttons/ButNowBtn";

export function ShowMore({ entry }: { entry: Entry }) {
  const [showing, setShowing] = useState(false);
  const { push } = useRouter();

  return (
    <>
      <Pressable onPress={() => setShowing(!showing)}>
        <VerticalDots size={30} color={tw.color("white")} />
      </Pressable>

      <Modal transparent visible={showing} animationType="fade">
        <SafeAreaView className="bg-blue-field/90 flex-1 items-center justify-around pt-10 sm:pt-20 px-8">
          <BeatInfo
            imageUrl={entry.imageUrl ?? ""}
            title={entry.title ?? ""}
            artist={entry.artist ?? ""}
          />
          <LikesList entry={entry} classname="max-w-sm" showLikeButton />
          <BuyNowBtn entry={entry} showPrice />
          <Button
            text="See details"
            onPress={() => push(`/dashboard/search/beat/${entry.id}`)}
          />

          <CancelBtn onPress={() => setShowing(false)} />
        </SafeAreaView>
      </Modal>
    </>
  );
}
