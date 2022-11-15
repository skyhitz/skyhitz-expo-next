import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import React, { useCallback, useState } from "react";
import { CopyIcon } from "app/ui/icons/copy";
import CheckIcon from "app/ui/icons/check";

type Props = {
  beatUrl: string;
};

function CopyBeatUrlButton({ beatUrl }: Props) {
  const [copied, changeCopied] = useState(false);

  const copyBeatUrl = useCallback(async () => {
    navigator.clipboard.writeText(beatUrl);
    changeCopied(true);
  }, [beatUrl, changeCopied]);

  if (!copied) {
    return (
      <Pressable onPress={copyBeatUrl}>
        <CopyIcon color={tw.color("white")} size={20} />
      </Pressable>
    );
  } else {
    return <CheckIcon size={20} color={tw.color("lightGreen")} />;
  }
}

export { CopyBeatUrlButton };
