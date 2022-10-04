import { ComponentProps } from "react";
import { styled, useSx } from "dripsy";

import { tw as tailwind } from "app/design-system/tailwind";
import { TouchableOpacity as NativeTouchable } from "react-native";

type TextProps = { className?: string } & ComponentProps<
  typeof NativeTouchable
>;

export function TouchableWithoutFeedback({ className, ...props }: TextProps) {
  useSx();
  const DripsyTouchable = styled(NativeTouchable)();

  return <DripsyTouchable {...props} sx={{ ...tailwind.style(className) }} />;
}
