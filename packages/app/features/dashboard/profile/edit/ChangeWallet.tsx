import { Button, Text, View } from "app/design-system";
import React, { useCallback, useState } from "react";
import { useChangeWalletMutation, useUserCreditsQuery } from "app/api/graphql";
import { useToast } from "react-native-toast-notifications";
import { useRecoilState } from "recoil";
import { userAtom } from "app/state/user";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";
import { buildTransactionForAuth } from "app/utils/stellar";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { useErrorReport } from "app/hooks/useErrorReport";
import { convertToString } from "app/utils/float";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";

export function ChangeWallet() {
  const [user, setUser] = useRecoilState(userAtom);
  const { data: credits } = useUserCreditsQuery();
  const [changeWallet] = useChangeWalletMutation();
  const { authNewSession } = useWalletConnectClient();
  const reportError = useErrorReport();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [uri, setUri] = useState<string>("");

  const onSubmit = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await authNewSession((newUri) => {
        setUri(newUri);
        setModalVisible(true);
      });
      const { signedXDR } = result as { signedXDR: string };
      const { data } = await changeWallet({ variables: { signedXDR } });
      if (data?.changeWallet) {
        setLoading(false);
        setUser(data.changeWallet);
        toast.show("Wallet successfully changed.", { type: "success" });
      }
    } catch (err) {
      setLoading(false);
      reportError(err, "There was an error during wallet change procedure");
    }
  }, [
    toast,
    buildTransactionForAuth,
    authNewSession,
    changeWallet,
    setUser,
    reportError,
  ]);

  return (
    <>
      <View className="mt-8">
        <Text className="font-bold text-sm">Change Wallet</Text>
        <View className="flex-row mt-8">
          <Text className="text-sm">Current Account: </Text>
          <StellarExpertLink
            id={user?.publicKey!}
            path="account"
            className="w-50"
          />
        </View>
        {user?.managed && (
          <>
            <Text className="text-sm my-2">
              Current balance: {convertToString(credits?.userCredits ?? 0)}XLM
            </Text>
            <Text className="text-sm leading-none my-2">
              Withdrawal fee:{" "}
              {convertToString((credits?.userCredits ?? 0) * 0.06)} XLM
            </Text>
            <Text className="text-xs text-grey leading-none mt-2">
              We collect a transaction fee that equals 6% of the current account
              balance.
            </Text>
          </>
        )}

        <Button
          text="Change Wallet"
          onPress={onSubmit}
          className="mt-8"
          loading={loading}
          disabled={loading}
        />
      </View>
      <WalletConnectModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        uri={uri}
      />
    </>
  );
}
