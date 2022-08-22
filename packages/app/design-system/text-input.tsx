import React, { ComponentProps, ForwardedRef } from "react";
import { TextInput as DripsyTextInput } from "dripsy";
import { TextInput as rTextInput } from "react-native";

import { tw as tailwind } from "app/design-system/tailwind";

export type TextProps = {
  className?: string;
} & ComponentProps<typeof DripsyTextInput>;

const TextInput = React.forwardRef(function TextInput(
  { className, sx, style, ...props }: TextProps,
  ref: ForwardedRef<rTextInput>
) {
  const hideOutline = tailwind.prefixMatch("web")
    ? { outlineStyle: "none" }
    : {};
  return (
    <DripsyTextInput
      sx={{ ...sx, ...tailwind.style(className), ...hideOutline }}
      {...props}
      ref={ref}
    />
  );
});

export { TextInput };
