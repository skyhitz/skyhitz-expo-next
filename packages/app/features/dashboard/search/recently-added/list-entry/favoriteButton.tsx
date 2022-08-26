import { useState } from "react";
import { Pressable } from "app/design-system";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { tw } from "app/design-system/tailwind";

export function FavoriteButton({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <Pressable className={className} onPress={() => setActive(!active)}>
      {active ? (
        <Icon name="heart" size={size} color={tw.color("blue")} />
      ) : (
        <Icon name="heart-outline" size={size} color={tw.color("white")} />
      )}
    </Pressable>
  );
}
