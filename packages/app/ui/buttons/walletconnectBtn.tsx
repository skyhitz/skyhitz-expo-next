import React, { useState } from "react";
import WalletConnectIcon from "app/ui/icons/walletconnect-icon";
import { Button } from "app/design-system";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { useErrorReport } from "app/hooks/useErrorReport";
import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";

type Props = {
  onAuth: (signedXDR: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export const WalletConnectBtn = ({ onAuth, disabled, loading }: Props) => {
  const [waitingForApproval, setWaitingForApproval] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [uri, setUri] = useState<string>("");
  const { initialized, authNewSession } = useWalletConnectClient();
  const reportError = useErrorReport();

  const onPress = async () => {
    try {
      setWaitingForApproval(true);
      const result = await authNewSession((newUri) => {
        setUri(newUri);
        setModalVisible(true);
      });
      const { signedXDR } = result as { signedXDR: string };
      setWaitingForApproval(false);
      onAuth(signedXDR);
    } catch (ex) {
      reportError(ex, "Something went wrong");
      setWaitingForApproval(false);
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
