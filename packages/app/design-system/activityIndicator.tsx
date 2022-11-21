import { ComponentProps } from "react";
import { ActivityIndicator as DripsyActivityIndicator } from "dripsy";

import { tw as tailwind } from "app/design-system/tailwind";

type TextProps = { className?: string } & ComponentProps<
  typeof DripsyActivityIndicator
>;

function ActivityIndicator({ className, sx, ...props }: TextProps) {
  return (
    <DripsyActivityIndicator
      sx={{ ...sx, ...tailwind.style(className) }}
      {...props}
    />
  );
}

export { ActivityIndicator };
