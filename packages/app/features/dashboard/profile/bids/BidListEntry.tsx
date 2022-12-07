import { Button, Image, Text, View } from "app/design-system";
import { Pressable } from "react-native";
import { useRouter } from "solito/router";
import { imageSrc, imageUrlSmall } from "app/utils/entry";
import { usePlayback } from "app/hooks/usePlayback";
import { EnrichedEntry } from "app/types";
import { useCancelBidMutation } from "app/api/graphql";
import { useCallback, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";

type Props = {
  entry: EnrichedEntry;
  refetchBids: () => void;
};

export function BidListEntry({ entry, refetchBids }: Props) {
  const { push } = useRouter();
  const { playEntry } = usePlayback();
  const [cancelBid] = useCancelBidMutation();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signAndSubmitXdr, session, connect } = useWalletConnectClient();
  const [walletConnectModalVisible, setWalletConnectModalVisible] =
    useState<boolean>(false);
  const [uri, setUri] = useState<string>("");

  const onCancel = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await cancelBid({
        variables: {
          id: entry.offer.id.toString(),
        },
      });
      if (!data?.cancelBid.success) {
        throw Error("Error during transaction creation.");
      }
      if (!data?.cancelBid.submitted) {
        const xdr = data.cancelBid.xdr!;

        let currentSession = session;
        if (!currentSession) {
          currentSession = await connect((newUri) => {
            setUri(newUri);
            setWalletConnectModalVisible(true);
          });
        }
        const response = await signAndSubmitXdr(xdr, currentSession);

        const { status } = response as { status: string };
        if (status !== "success") {
          throw Error("Error during signing transaction in your wallet");
        }
      }
      refetchBids();
      setLoading(false);
      toast.show("You have successfully cancelled your bid", {
        type: "success",
      });
    } catch (ex) {
      setLoading(false);
      reportError(ex);
    }
  }, [
    setLoading,
    session,
    connect,
    signAndSubmitXdr,
    setUri,
    setWalletConnectModalVisible,
    toast,
    reportError,
  ]);

  return (
    <>
      <Pressable onPress={() => playEntry(entry, [entry])}>
        <View className="w-full flex items-center flex-row py-2">
          <Image
            className="w-10 h-10"
            uri={imageUrlSmall(entry.imageUrl)}
            fallbackUri={imageSrc(entry.imageUrl)}
          />

          <View className="ml-2 flex justify-center pr-2">
            <Text numberOfLines={1} className="text-sm font-bold leading-6">
              {entry.title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs text-neutral-400 leading-6"
            >
              {entry.artist}
            </Text>
          </View>
          <Text className="text-sm text-grey flex-1">
            {parseFloat(entry.offer.amount).toFixed(0)} XLM for{" "}
            {(
              parseFloat(entry.offer.price) *
              parseFloat(entry.offer.amount) *
              100
            ).toFixed()}
            % of the asset
          </Text>
          <View className="flex flex-row items-center">
            <Button
              text="Cancel"
              onPress={onCancel}
              variant="primary"
              className="mx-2"
              loading={loading}
              disabled={loading}
            />
            <Button
              text="Details"
              onPress={() => push(`/dashboard/beat/${entry.id}`)}
            />
          </View>
        </View>
      </Pressable>
      <WalletConnectModal
        visible={walletConnectModalVisible}
        close={() => setWalletConnectModalVisible(false)}
        uri={uri}
      />
    </>
  );
}
