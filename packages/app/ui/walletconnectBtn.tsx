import React, { useEffect, useState } from "react";
import WalletConnectIcon from "app/ui/icons/walletconnect-icon";
import { Button } from "app/design-system";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { tw } from "app/design-system/tailwind";

type Props = {
  onConnected: (_publicKey: string) => void;
  disabled: boolean;
};

export const WalletConnectBtn = ({ onConnected, disabled }: Props) => {
  const [waitingForApproval, setWaitingForApproval] = useState<boolean>(false);
  const { connect, accounts } = useWalletConnectClient();

  useEffect(() => {
    if (accounts.length) {
      const publicKey = accounts[0]!.replace("stellar:pubnet:", "");
      onConnected(publicKey);
    }
  }, [accounts, onConnected]);

  const onPress = () => {
    setWaitingForApproval(true);
    connect();
  };

  return (
    <Button
      text={waitingForApproval ? "Waiting for approval..." : "WalletConnect"}
      onPress={onPress}
      disabled={disabled || waitingForApproval}
      rightIcon={<WalletConnectIcon color={tw.color("white")} />}
    />
  );
};
