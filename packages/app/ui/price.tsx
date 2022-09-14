import { Text, View } from "app/design-system";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";

export function Price({ className = "" }: { className?: string }) {
  const price = 25;

  return (
    <View className={`flex flex-row items-center ${className}`}>
      <Dollar size={10} color={tw.color("white")} />
      {price > 0 && <Text className="text-sm ml-1">{price}</Text>}
    </View>
  );
}
