import { Pressable, Text } from "app/design-system";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";

export function BuyXLMBtn() {
  return (
    <Pressable className="btn w-72 mx-auto mt-16">
      <Text className="text-sm font-semibold mr-2">Buy XML</Text>
      <Dollar size={24} color={tw.color("white")} />
    </Pressable>
  );
}
