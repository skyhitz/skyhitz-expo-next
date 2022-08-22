import { ComponentProps } from "react";
import { Pressable as DripsyPressable, useSx } from "dripsy";

import { tw as tailwind } from "app/design-system/tailwind";

type TextProps = { className?: string } & ComponentProps<
  typeof DripsyPressable
>;

function Pressable({ className, sx, ...props }: TextProps) {
  useSx();
  return (
    <DripsyPressable sx={{ ...sx, ...tailwind.style(className) }} {...props} />
  );
}

export { Pressable };
