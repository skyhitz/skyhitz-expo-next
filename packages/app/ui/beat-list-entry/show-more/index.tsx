import { Entry } from "app/api/graphql";
import { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { tw } from "app/design-system/tailwind";
import { Modal } from "app/design-system";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { BeatInfo } from "app/ui/beat-list-entry/show-more/beatInfo";
import { BeatActions } from "app/ui/beat-list-entry/show-more/beatActions";
import { CancelBtn } from "app/ui/beat-list-entry/show-more/cancelBtn";

export function ShowMore({ entry }: { entry: Entry }) {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <Icon.Button
        name="dots-vertical"
        size={30}
        color={tw.color("white")}
        backgroundColor={tw.color("transparent")}
        iconStyle={tw`m-0`}
        style={tw`p-0`}
        onPress={() => setShowing(!showing)}
      />
      <Modal transparent={true} visible={showing} animationType="fade">
        <SafeAreaView className="bg-blue-field/90 flex-1 items-center justify-around pt-10 sm:pt-20">
          <BeatInfo
            imageUrl={entry.imageUrl ?? ""}
            title={entry.title ?? ""}
            artist={entry.artist ?? ""}
          />
          <BeatActions />
          <CancelBtn onPress={() => setShowing(false)} />
        </SafeAreaView>
      </Modal>
    </>
  );
}
