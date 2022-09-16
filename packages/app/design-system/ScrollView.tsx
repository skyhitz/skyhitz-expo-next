import React, { ComponentProps } from "react";
import { tw } from "app/design-system/tailwind";
import { ScrollView as DripsyScrollView, useSx } from "dripsy";

type ScrollViewProps = { className?: string } & ComponentProps<
  typeof DripsyScrollView
>;

export function ScrollView({ className, style, ...rest }: ScrollViewProps) {
  useSx();
  return <DripsyScrollView style={[tw.style(className), style]} {...rest} />;
}
