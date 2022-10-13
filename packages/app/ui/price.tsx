import { Text, View } from "app/design-system";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import { useEntryOffer } from "app/hooks/useEntryOffer";
import { BuyNowBtn } from "app/ui/buttons/BuyNowBtn";
import { Entry } from "app/api/graphql";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

type PriceProps = {
  entry: Entry;
  className?: string;
  hovered?: boolean;
};

export default function Price({ className, entry, hovered }: PriceProps) {
  const offer = useEntryOffer(entry.code, entry.issuer);
  const user = useRecoilValue(userAtom);

  if (!offer.price) {
    return null;
  }

  if (hovered && user) {
    return (
      <View className={`${className}`}>
        <BuyNowBtn entry={entry} invalidate={offer.invalidate} />
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
