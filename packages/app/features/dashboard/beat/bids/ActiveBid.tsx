import { Button, Text, View } from "app/design-system";
import {
  Entry,
  Offer,
  useAcceptBidMutation,
  useHideBidMutation,
} from "app/api/graphql";
import { LinkWithLabel } from "app/ui/links/LinkWithLabel";
import { useCallback, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useErrorReport } from "app/hooks/useErrorReport";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";

type Props = {
  entry: Entry;
  index: number;
  offer: Offer;
  refetch: () => void;
};

export function ActiveBid({ entry, index, offer, refetch }: Props) {
  const { id, price, amount } = offer;
  const bgColor = index % 2 === 1 ? "bg-blue-dark" : "bg-blue-transparent";
  const numericAmount = parseFloat(amount);
  const numericPrice = parseFloat(price);
  const [hideBid, { loading: hideLoading }] = useHideBidMutation();
  const [acceptBid] = useAcceptBidMutation();
  const toast = useToast();
  const reportError = useErrorReport();
  const [loading, setLoading] = useState<boolean>(false);
  const { signAndSubmitXdr, session, connect } = useWalletConnectClient();
  const [walletConnectModalVisible, setWalletConnectModalVisible] =
    useState<boolean>(false);
  const [uri, setUri] = useState<string>("");

  const onHide = useCallback(async () => {
    try {
      await hideBid({ variables: { id: offer.id } });
      refetch();
      toast.show("You've hidden your bid", { type: "success" });
    } catch (ex) {
      reportError(ex, "There was an error during request.");
    }
  }, [hideBid, entry, reportError, toast]);

  const onAccept = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await acceptBid({ variables: { id: offer.id } });
      if (!data?.acceptBid.success) {
        throw Error("Error during transaction creation.");
      }
      if (!data?.acceptBid.submitted) {
        const xdr = data.acceptBid.xdr!;

        let currentSession = session;
        if (!currentSession) {
          currentSession = await connect((newUri) => {
            setUri(newUri);
            setWalletConnectModalVisible(true);
          });
        }
        toast.show("Sign transaction in your wallet", { type: "warning" });

        const response = await signAndSubmitXdr(xdr, currentSession);

        const { status } = response as { status: string };
        if (status !== "success") {
          throw Error("Error during signing transaction in your wallet");
        }
      }
      refetch();
      setLoading(false);
      toast.show("You've successfully accepted bid", { type: "success" });
    } catch (ex) {
      setLoading(false);
      reportError(ex, "There was an error during accepting the bid.");
    }
  }, [
    setLoading,
    acceptBid,
    session,
    connect,
    setUri,
    setWalletConnectModalVisible,
    signAndSubmitXdr,
    refetch,
    toast,
    reportError,
  ]);

  return (
    <View
      className={`md:flex-row py-3 px-5 md:items-center ${bgColor} h-30 md:h-20`}
    >
      <LinkWithLabel type="offer" id={id.toString()} />

      <View className="md:flex-1 my-2 md:mx-2 md:my-0">
        <Text className="ml-1 text-sm">
          {numericAmount} XLM for {numericAmount * numericPrice * 100}% of asset
        </Text>
      </View>
      <Button
        text="Hide"
        onPress={onHide}
        variant="secondary"
        size="small"
        className="md:mx-2 my-2 md:my-0"
        loading={hideLoading}
        disabled={hideLoading}
      />
      <Button
        text="Accept"
        onPress={onAccept}
        variant="primary"
        size="small"
        loading={loading}
        disabled={loading}
      />
      <WalletConnectModal
        visible={walletConnectModalVisible}
        close={() => setWalletConnectModalVisible(false)}
        uri={uri}
      />
    </View>
  );
}
