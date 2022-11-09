import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import { Platform, Share } from "react-native";
import React, { useCallback, useState } from "react";
import { CopyIcon } from "app/ui/icons/copy";
import CheckIcon from "app/ui/icons/check";
import { TextEllipsis } from "app/features/dashboard/profile/textEllipsis";
import { useNavigationEvent } from "app/hooks/useNavigationEvent";

type Props = {
  walletPublicKey: string;
};

function CopyWalletPublicKeyButton({ walletPublicKey }: Props) {
  const [copied, changeCopied] = useState(false);

  const copyPublicKey = useCallback(async () => {
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
  }, [copied, changeCopied, walletPublicKey]);

  useNavigationEvent("blur", () => changeCopied(false));

  return (
    <Pressable
      className="flex flex-row items-center"
      onPress={copyPublicKey}
      disabled={copied}
    >
      {!copied && <CopyIcon color={tw.color("white")} size={18} />}
      {copied && <CheckIcon color={tw.color("lightGreen")} size={18} />}
      <TextEllipsis text={walletPublicKey} containerClassName="mx-2" />
    </Pressable>
  );
}

export { CopyWalletPublicKeyButton };
