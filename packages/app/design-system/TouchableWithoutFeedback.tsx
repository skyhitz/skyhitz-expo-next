import { ComponentProps } from "react";
import { styled, useSx } from "dripsy";

import { tw as tailwind } from "app/design-system/tailwind";
import { TouchableWithoutFeedback as NativeTouchable } from "react-native";

type TextProps = { className?: string } & ComponentProps<
  typeof NativeTouchable
>;

export function TouchableWithoutFeedback({ className, ...props }: TextProps) {
  useSx();
  console.log(tailwind.style(className));
  const DripsyTouchable = styled(NativeTouchable)({
    ...tailwind.style(className),
    bg: "red",
  });

  return <DripsyTouchable {...props} />;
}
