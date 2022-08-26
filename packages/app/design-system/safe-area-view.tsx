import React from "react";
import {
  NativeSafeAreaViewProps,
  SafeAreaView as NativeSafeAreaView,
} from "react-native-safe-area-context";
import { tw } from "app/design-system/tailwind";
import { useSx } from "dripsy";

export function SafeAreaView({
  className,
  style,
  ...rest
}: NativeSafeAreaViewProps & { className?: string }) {
  useSx();
  return <NativeSafeAreaView style={[tw.style(className), style]} {...rest} />;
}
