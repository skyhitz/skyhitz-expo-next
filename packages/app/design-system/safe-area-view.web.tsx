import { View } from "app/design-system/view";
import { NativeSafeAreaViewProps } from "react-native-safe-area-context";
import { useSx } from "dripsy";
import { tw } from "app/design-system/tailwind";
import React from "react";

export function SafeAreaView({
  className,
  style,
  ...rest
}: NativeSafeAreaViewProps & { className?: string }) {
  useSx();
  return <View style={[tw.style(className), style]} {...rest} />;
}
