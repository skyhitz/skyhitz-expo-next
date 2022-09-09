import { Entry } from "app/api/graphql";
import { useState } from "react";
import { tw } from "app/design-system/tailwind";
import { Modal, Pressable } from "app/design-system";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { BeatInfo } from "app/ui/beat-list-entry/show-more/beatInfo";
import { BeatActions } from "app/ui/beat-list-entry/show-more/beatActions";
import { CancelBtn } from "app/ui/beat-list-entry/show-more/cancelBtn";
import VerticalDots from "app/ui/icons/verticalDots";

export function ShowMore({ entry }: { entry: Entry }) {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <Pressable onPress={() => setShowing(!showing)}>
        <VerticalDots size={30} color={tw.color("white")} />
      </Pressable>

      <Modal transparent={true} visible={showing} animationType="fade">
        <SafeAreaView className="bg-blue-field/90 flex-1 items-center justify-around pt-10 sm:pt-20">
          <BeatInfo
            imageUrl={entry.imageUrl ?? ""}
            title={entry.title ?? ""}
            artist={entry.artist ?? ""}
          />
          <BeatActions entryId={entry.id!} />
          <CancelBtn onPress={() => setShowing(false)} />
        </SafeAreaView>
      </Modal>
    </>
  );
}
