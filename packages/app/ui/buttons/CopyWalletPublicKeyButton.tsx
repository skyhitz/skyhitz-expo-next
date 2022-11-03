import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import { Platform, Share } from "react-native";
import React, { useState } from "react";
import Wallet from "app/ui/icons/wallet";
import CheckIcon from "app/ui/icons/check";

type Props = {
  walletPublicKey: string;
};

function CopyWalletPublicKeyButton({ walletPublicKey }: Props) {
  const [copied, changeCopied] = useState(false);

  const copyPublicKey = async () => {
    try {
      if (Platform.OS === "web") {
        navigator.clipboard.writeText(walletPublicKey);
        changeCopied(true);
      } else if (Platform.OS === "ios") {
        await Share.share({
          url: walletPublicKey,
        }).then(({ action }) => {
          if (action !== Share.dismissedAction) changeCopied(true);
        });
      } else {
        await Share.share({
          message: walletPublicKey,
        }).then(({ action }) => {
          if (action === Share.sharedAction) changeCopied(true);
        });
      }
    } catch (error) {
      // no-op
    }
  };

  if (!copied) {
    return (
      <Pressable onPress={copyPublicKey}>
        <Wallet color={tw.color("white")} size={18} />
      </Pressable>
    );
  } else {
    return <CheckIcon size={18} color={tw.color("lightGreen")} />;
  }
}

export { CopyWalletPublicKeyButton };
