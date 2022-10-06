import { Button, Text, View } from "app/design-system";
import React, { useCallback, useEffect } from "react";
import { usePaymentsInfoQuery } from "app/api/graphql";
import { useToast } from "react-native-toast-notifications";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";

export function ChangeWallet() {
  const user = useRecoilValue(userAtom);
  const { data: paymentInfoData } = usePaymentsInfoQuery();
  const toast = useToast();

  useEffect(() => {
    // if (data?.withdrawToExternalWallet?.success) {
    //   setModalVisible(false);
    //   toast.show("Amount successfully transfered to your external wallet", {
    //     type: "success",
    //   });
    // }
  }, [toast]);

  const onSubmit = useCallback(async (): Promise<void> => {
    try {
    } catch (_) {
      // no-op, just to catch error
    }
  }, []);

  return (
    <View className="mt-8">
      <Text className="font-bold text-sm">Change Wallet</Text>
      <View className="flex-row mt-8">
        <Text className="text-sm">Current Account: </Text>
        <StellarExpertLink id={user?.publicKey!} path="account" align="left" />
      </View>
      {user?.managed && (
        <>
          <Text className="text-sm my-2">
            Current balance: {paymentInfoData?.paymentsInfo?.credits ?? "0.00"}
          </Text>
          <Text className="text-sm leading-none my-2">
            Withdrawal fee:{" "}
            {((paymentInfoData?.paymentsInfo?.credits ?? 0) * 0.06)
              .toFixed(6)
              .toString()}{" "}
            XLM
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
        //   loading={loading}
      />
    </View>
  );
}
