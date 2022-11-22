import { Button, Modal, Pressable, Text, View, Image } from "app/design-system";
import X from "app/ui/icons/x";
import { tw } from "app/design-system/tailwind";
import {
  Entry,
  EntryDetailsDocument,
  usePaymentsInfoQuery,
  useBuyEntryMutation,
  BuyEntryMutation,
} from "app/api/graphql";
import { Line } from "app/ui/orSeparator";
import { imageSrc, imageUrlSmall } from "app/utils/entry";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useErrorReport } from "app/hooks/useErrorReport";
import { SkyhitzSlider } from "app/ui/SkyhitzSlider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";
import { ApolloClient } from "@apollo/client";

type Props = {
  client: ApolloClient<object>;
  visible: boolean;
  hideModal: (success: boolean) => void;
  price: number;
  initialEquityForSale: number;
  entry: Entry;
};

export function PaymentConfirmationModal({
  client,
  visible,
  hideModal,
  price,
  initialEquityForSale,
  entry,
}: Props) {
  const { data: paymentInfoData } = usePaymentsInfoQuery();
  const [buy] = useBuyEntryMutation();
  const { signAndSubmitXdr, session, connect } = useWalletConnectClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();
  const [equityForSale, setEquityForSale] =
    useState<number>(initialEquityForSale);
  const [walletConnectModalVisible, setWalletConnectModalVisible] =
    useState<boolean>(false);
  const [uri, setUri] = useState<string>("");
  const toast = useToast();
  const reportError = useErrorReport();

  const onMutationCompleted = async (data: BuyEntryMutation) => {
    if (data?.buyEntry?.success) {
      if (data.buyEntry.submitted) {
        setLoading(false);
        hideModal(true);
        toast.show("You have successfully bought an NFT", {
          type: "success",
        });
        client.refetchQueries({
          include: [EntryDetailsDocument],
          onQueryUpdated: async (observableQuery) => {
            // It takes time for Stellar to process transaction, thus refetch has to be delayed
            await new Promise((res) => setTimeout(res, 3000));
            observableQuery.refetch({ id: entry.id });
          },
        });
      } else if (data.buyEntry.xdr) {
        setMessage("Sign and submit transaction in your wallet");
        const xdr = data.buyEntry.xdr;

        try {
          let currentSession = session;
          if (!currentSession) {
            currentSession = await connect((newUri) => {
              setUri(newUri);
              setWalletConnectModalVisible(true);
            });
          }
          const response = await signAndSubmitXdr(xdr, currentSession);
          setMessage(undefined);
          setLoading(false);

          const { status } = response as { status: string };
          if (status === "success") {
            hideModal(true);
            toast.show("You have successfully bought an NFT", {
              type: "success",
            });
            client.refetchQueries({
              include: [EntryDetailsDocument],
              onQueryUpdated: async (observableQuery) => {
                await new Promise((res) => setTimeout(res, 3000));
                observableQuery.refetch({ id: entry.id });
              },
            });
          } else {
            hideModal(false);
            reportError(
              Error(
                "Something went wrong during signing and submitting transaction in your wallet."
              )
            );
          }
        } catch (ex) {
          hideModal(false);
          reportError(ex);
        }
      }
    }
  };

  return (
    <>
      <Modal visible={visible} transparent>
        <Pressable
          onPress={() => hideModal(false)}
          className="flex-1 flex items-center justify-center bg-blue-field/70 w-full p-4"
        >
          <Pressable
            onPress={() => {}}
            className="flex items-center w-full max-w-lg bg-blue-field p-4"
          >
            <Pressable
              className="absolute right-2 top-2 "
              onPress={() => hideModal(false)}
            >
              <X color={tw.color("white")} />
            </Pressable>
            <Text className="text-lg font-bold">Confirm payment</Text>
            <View className="flex-row my-4 items-center">
              <Image
                className="w-10 h-10"
                uri={entry.imageUrl ? imageUrlSmall(entry.imageUrl) : ""}
                fallbackUri={entry.imageUrl ? imageSrc(entry.imageUrl) : ""}
              />
              <Text className="ml-2">
                {entry.title}-{entry.artist}
              </Text>
            </View>
            <Line />
            <Text className="my-2 text-sm">
              Current Balance:{" "}
              {paymentInfoData?.paymentsInfo?.credits?.toFixed(2) ?? "0.00"} XLM
            </Text>
            <Text className="my-2 text-sm">
              Price: {(price * equityForSale).toFixed(2)} XLM
            </Text>
            <Text className="my-2 text-sm">
              Equity for sale: {(equityForSale * 100).toFixed()}%
            </Text>
            <Text className="my-2 text-sm">Network fee: 0.01 XLM</Text>
            <GestureHandlerRootView
              style={{ flexDirection: "row", width: "100%" }}
            >
              <SkyhitzSlider
                minimumValue={1}
                maximumValue={initialEquityForSale * 100}
                value={initialEquityForSale * 100}
                key={entry.id}
                onValueChange={(value: number) => {
                  setEquityForSale(parseFloat((value / 100).toFixed(2)));
                }}
              />
            </GestureHandlerRootView>
            <Text className="my-2 text-sm">
              Stellar collects a network fee per transaction. It depends on the
              number of operations in the transaction and the current network
              traffic. It's safe to assume that in the worst case you will be
              charged 0.01 XLM.
            </Text>
            <Line />

            {message && (
              <Text className="w-full text-center text-sm my-4 min-h-5">
                {message}
              </Text>
            )}
            <Button
              className="mt-4"
              text="Confirm"
              onPress={async () => {
                setLoading(true);
                try {
                  await buy({
                    variables: {
                      id: entry.id!,
                      amount: equityForSale,
                      price,
                    },
                    onCompleted: onMutationCompleted,
                  });
                } catch (ex) {
                  setLoading(false);
                  hideModal(false);
                  reportError(ex);
                }
              }}
              disabled={
                price * equityForSale >=
                  (paymentInfoData?.paymentsInfo?.credits ?? 0) || loading
              }
              loading={loading}
            />
          </Pressable>
        </Pressable>
      </Modal>
      <WalletConnectModal
        visible={walletConnectModalVisible}
        close={() => setWalletConnectModalVisible(false)}
        uri={uri}
      />
    </>
  );
}
