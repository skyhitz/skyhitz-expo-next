import { Pressable, Text, View } from "app/design-system";
import ChevronRight from "app/ui/icons/chevron-right";
import { ReactElement } from "react";
import { tw } from "app/design-system/tailwind";

type ProfileRowProps = {
  icon: ReactElement;
  title: string;
  trailingText?: number;
  onPress?: () => void;
};

export function ProfileRow({
  icon,
  trailingText,
  title,
  onPress,
}: ProfileRowProps) {
  return (
    <Pressable
      className="flex flex-row justify-between py-1.5"
      onPress={onPress}
    >
      <View className="flex flex-row items-center">
        {icon}
        <Text className="font-bold ml-2 text-sm">{title}</Text>
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-sm">
          {trailingText && trailingText > 0 ? trailingText : ""}
        </Text>
        <ChevronRight size={28} color={tw.color("white")} />
      </View>
    </Pressable>
  );
}
