import { Text } from "app/design-system";
import React from "react";

export default function EmptyListIndicator({
  visible,
  text,
}: {
  visible: boolean;
  text: string;
}) {
  if (!visible) return null;

  return <Text className="text-xs w-full text-center">{text}</Text>;
}
