import React from "react";
import {
  NativeSafeAreaViewProps,
  SafeAreaView as NativeSafeAreaView,
} from "react-native-safe-area-context";
import { tw } from "app/design-system/tailwind";

export function SafeAreaView({
  className,
  style,
  ...rest
}: NativeSafeAreaViewProps & { className?: string }) {
  return <NativeSafeAreaView style={[tw.style(className), style]} {...rest} />;
}
