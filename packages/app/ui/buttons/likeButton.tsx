import { useState } from "react";
import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import Like from "app/ui/icons/like";

export function LikeButton({
  size,
  className,
}: {
  size: number;
  className?: string;
  entryId: string;
}) {
  const [active, setActive] = useState(false);

  const likeColor = active ? tw.color("blue") : tw.color("white");

  return (
    <Pressable className={className} onPress={() => setActive(!active)}>
      <Like size={size} color={likeColor} fill={active} />
    </Pressable>
  );
}
