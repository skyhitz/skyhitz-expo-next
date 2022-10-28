import { Modal, Pressable, Text, View } from "app/design-system";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { tw } from "app/design-system/tailwind";
import XIcon from "app/ui/icons/x";
import { Image, Linking, Platform } from "react-native";
import { CopyIcon } from "app/ui/icons/copy";
import * as Clipboard from "expo-clipboard";

type Props = {
  visible: boolean;
  close: () => void;
  uri: string;
};
export function WalletConnectModal({ visible, close, uri }: Props) {
  return (
    <Modal visible={visible} transparent>
      <SafeAreaView className="flex-1 flex items-center justify-center bg-blue-field/70 px-2">
        <View className="flex max-w-md bg-blue-field p-4 rounded-xl">
          <View className="flex-row items-center w-full mb-5">
            <Text className="text-white text-base flex-1 text-center font-bold">
              Open Your wallet app
            </Text>
            <Pressable onPress={close}>
              <XIcon color={tw.color("white")} size={22} />
            </Pressable>
          </View>
          <Pressable
            className="p-4 bg-blue-dark flex-row rounded mb-2 items-center"
            onPress={() => {
              const link =
                Platform.OS === "ios"
                  ? `https://lobstr.co/uni/wc/wc?uri=${uri}`
                  : uri;
              close();
              Linking.openURL(link);
            }}
          >
            <Image
              source={require("app/assets/images/lobstr.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text className="ml-3 text-center text-sm">Lobstr</Text>
          </Pressable>
          <Pressable
            className="p-4 bg-blue-dark flex-row rounded items-center"
            onPress={() => {
              Clipboard.setStringAsync(uri);
              close();
            }}
          >
            <CopyIcon color={tw.color("white")} />
            <Text className="ml-3 text-center text-sm">Copy</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
