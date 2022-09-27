import { Entry } from "app/api/graphql";
import useEntryPrice from "app/hooks/useEntryPrice";
import { Text, View } from "app/design-system";
import { BuyNowBtn } from "app/ui/buttons/ButNowBtn";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";

type Props = {
  entry: Entry;
};

export function PriceContainer({ entry }: Props) {
  const price = useEntryPrice(entry.code, entry.issuer);

  if (!price) {
    return null;
  }

  return (
    <View className="border-[0.5px] mt-4 border-grey-light rounded-lg bg-blue-transparent flex p-4">
      <Text className="mb-3 text-sm text-grey-light">Current price</Text>
      <View className="flex flex-row items-center mb-3">
        <Dollar size={30} color={tw.color("white")} />
        <Text className="text-3xl ml-3 text-white">{price} XLM</Text>
      </View>
      <BuyNowBtn entry={entry} />
    </View>
  );
}
