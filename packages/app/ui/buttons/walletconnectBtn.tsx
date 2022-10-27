import React, { useEffect, useState } from "react";
import WalletConnectIcon from "app/ui/icons/walletconnect-icon";
import { Button, Modal, Text, View, Pressable } from "app/design-system";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { Config } from "app/config";
import { useErrorReport } from "app/hooks/useErrorReport";
import { SafeAreaView } from "app/design-system/safe-area-view";
import XIcon from "app/ui/icons/x";
import { tw } from "app/design-system/tailwind";
import { CopyIcon } from "app/ui/icons/copy";
import { Platform, Linking, Image } from "react-native";
import * as Clipboard from "expo-clipboard";

type Props = {
  onConnected: (_publicKey: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export const WalletConnectBtn = ({ onConnected, disabled, loading }: Props) => {
  const [waitingForApproval, setWaitingForApproval] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [uri, setUri] = useState<string>("");
  const { connect, accounts, initialized } = useWalletConnectClient();
  const reportError = useErrorReport();

  useEffect(() => {
    if (accounts.length && waitingForApproval) {
      const publicKey = accounts[0]!.replace(`${Config.CHAIN_ID}:`, "");
      onConnected(publicKey);
    }
  }, [accounts, onConnected, waitingForApproval]);

  const onPress = async () => {
    if (!accounts.length) {
      setWaitingForApproval(true);
      const session = await connect((generatedUri) => {
        setUri(generatedUri);
        setModalVisible(true);
      });
      setWaitingForApproval(false);
      if (!session) {
        reportError("Connnection was cancelled");
      }
    } else {
      const publicKey = accounts[0]!.replace(`${Config.CHAIN_ID}:`, "");
      onConnected(publicKey);
    }
  };

  return (
    <>
      <Button
        text={waitingForApproval ? "Waiting for approval..." : "WalletConnect"}
        onPress={onPress}
        disabled={!initialized || disabled || waitingForApproval}
        icon={WalletConnectIcon}
        size="large"
        loading={loading}
      />
      <Modal visible={modalVisible} transparent>
        <SafeAreaView className="flex-1 flex items-center justify-center bg-blue-field/70 px-2">
          <View className="flex max-w-md bg-blue-field p-4 rounded-xl">
            <View className="flex-row items-center w-full mb-5">
              <Text className="text-white text-base flex-1 text-center font-bold">
                Open Your wallet app.
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
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
                setModalVisible(false);
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
                setModalVisible(false);
              }}
            >
              <CopyIcon color={tw.color("white")} />
              <Text className="ml-3 text-center text-sm">Copy</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
