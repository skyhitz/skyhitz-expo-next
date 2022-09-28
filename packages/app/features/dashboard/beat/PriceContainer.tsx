import { Entry } from "app/api/graphql";
import { useEntryOffer } from "app/hooks/useEntryOffer";
import { Text, View } from "app/design-system";
import { BuyNowBtn } from "app/ui/buttons/ButNowBtn";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import useUSDPrice from "app/hooks/useUSDPrice";

type Props = {
  entry: Entry;
};

export function PriceContainer({ entry }: Props) {
  const offer = useEntryOffer(entry.code, entry.issuer);
  const usd = useUSDPrice(offer.price * offer.amount);

  if (!offer.price) {
    return null;
  }

  return (
    <View className="border-[0.5px] mt-4 border-grey-light rounded-lg bg-blue-transparent flex p-4">
      <Text className="mb-3 text-sm text-grey-light">
        Current price ( {(100 * offer.amount).toFixed(0)}% of the asset )
      </Text>
      <View className="flex flex-row items-end mb-3">
        <Dollar size={30} color={tw.color("white")} />
        <Text className="text-3xl ml-3 text-white">
          {(offer.price * offer.amount).toFixed()} XLM
        </Text>
        <Text className="text-base ml-3 text-grey-light">
          ${usd.toFixed(2)}
        </Text>
      </View>
      <BuyNowBtn entry={entry} />
    </View>
  );
}
