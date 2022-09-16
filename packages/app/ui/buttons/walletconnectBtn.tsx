import React, { useEffect, useState } from "react";
import WalletConnectIcon from "app/ui/icons/walletconnect-icon";
import { Button } from "app/design-system";
import { useWalletConnectClient } from "app/provider/WalletConnect";

type Props = {
  onConnected: (_publicKey: string) => void;
  disabled: boolean;
  loading: boolean;
};

export const WalletConnectBtn = ({ onConnected, disabled, loading }: Props) => {
  const [waitingForApproval, setWaitingForApproval] = useState<boolean>(false);
  const { connect, accounts } = useWalletConnectClient();

  useEffect(() => {
    if (accounts.length && waitingForApproval) {
      setWaitingForApproval(false);
      const publicKey = accounts[0]!.replace("stellar:pubnet:", "");
      onConnected(publicKey);
    }
  }, [accounts, onConnected, waitingForApproval]);

  const onPress = () => {
    if (!accounts.length) {
      setWaitingForApproval(true);
      connect();
    } else {
      const publicKey = accounts[0]!.replace("stellar:pubnet:", "");
      onConnected(publicKey);
    }
  };

  return (
    <Button
      text={waitingForApproval ? "Waiting for approval..." : "WalletConnect"}
      onPress={onPress}
      disabled={disabled || waitingForApproval}
      icon={WalletConnectIcon}
      size="large"
      loading={loading}
    />
  );
};
