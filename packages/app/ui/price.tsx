import { Text, View } from "app/design-system";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import { useEntryOffer } from "app/hooks/useEntryOffer";
import { BuyNowBtn } from "app/ui/buttons/ButNowBtn";
import { Entry } from "app/api/graphql";

type PriceProps = {
  entry: Entry;
  className?: string;
  hovered?: boolean;
};

export default function Price({ className, entry, hovered }: PriceProps) {
  const offer = useEntryOffer(entry.code, entry.issuer);

  if (!offer.price) {
    return null;
  }

  if (hovered) {
    return (
      <View className={`${className}`}>
        <BuyNowBtn entry={entry} />
      </View>
    );
  } else
    return (
      <View className={`flex flex-row items-center ${className}`}>
        <Dollar size={10} color={tw.color("white")} />
        <Text className="text-sm ml-1">
          {(offer.price * offer.amount).toFixed()} for{" "}
          {(offer.amount * 100).toFixed()}%
        </Text>
      </View>
    );
}
