import React, { useEffect, useState } from "react";
import WalletConnectIcon from "app/ui/icons/walletconnect-icon";
import { Button } from "app/design-system";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { Config } from "app/config";
import { useErrorReport } from "app/hooks/useErrorReport";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";

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
      <WalletConnectModal
        visible={modalVisible}
        close={() => setModalVisible(false)}
        uri={uri}
      />
    </>
  );
};
