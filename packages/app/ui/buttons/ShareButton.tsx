import { Modal, Pressable } from "app/design-system";
import React, { useState } from "react";
import { Linking, Platform, Share } from "react-native";
import { ShareIcon } from "app/ui/icons/share";
import { Text } from "app/design-system/text";
import { tw } from "app/design-system/tailwind";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { View } from "app/design-system/view";
import XIcon from "app/ui/icons/x";
import Twitter from "app/ui/icons/twitter";
import { CopyBeatUrlButton } from "app/ui/buttons/CopyBeatUrlButton";

type Props = {
  url: string;
  title: string;
};
export function ShareButton({ url, title }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onShare = async () => {
    try {
      if (Platform.OS === "web") {
        setModalVisible(true);
      } else if (Platform.OS === "ios") {
        await Share.share({
          url,
        });
      } else {
        await Share.share({
          message: url,
        });
      }
    } catch (error) {
      // no-op
    }
  };
  return (
    <>
      <Pressable className="flex-row items-center" onPress={onShare}>
        <ShareIcon color={tw.color("white")} />
        <Text className="text-grey-light ml-1">Share</Text>
      </Pressable>
      <Modal visible={modalVisible} transparent>
        <SafeAreaView className="flex-1 flex items-center justify-center bg-blue-field/70 px-2">
          <View className="flex items-center max-w-md bg-blue-field p-4 rounded-xl">
            <View className="flex-row items-center w-full">
              <Text className="text-white text-base flex-1 text-center font-bold">
                {title}
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <XIcon color={tw.color("white")} size={22} />
              </Pressable>
            </View>
            <Text className="mt-5 text-center text-sm">
              Copy link or tweet directly.
            </Text>
            <View className="flex-row items-center justify-center mt-5">
              <CopyBeatUrlButton beatUrl={url} />
              <Text className="mx-3 text-center text-sm">or</Text>
              <Pressable
                onPress={() =>
                  Linking.openURL(`https://twitter.com/intent/tweet?url=${url}`)
                }
                aria-label="Read more about Skyhitz on twitter"
              >
                <Twitter size={20} color={tw.color("white")} />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
