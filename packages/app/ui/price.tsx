import { Pressable, Text, View } from "app/design-system";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import { useEntryOffer } from "app/hooks/useEntryOffer";
import { openURL } from "expo-linking";
import { stellarAssetLink } from "app/utils/stellar";

type PriceProps = {
  code?: string | null;
  issuer?: string | null;
  className?: string;
  defaultPrice?: number;
};

export default function Price({ className, code, issuer }: PriceProps) {
  const offer = useEntryOffer(code, issuer);

  const onPress = () => {
    if (code && issuer) {
      return openURL(stellarAssetLink(code, issuer));
    }
  };

  if (!offer.price) {
    return null;
  }

  return (
    <Pressable onPress={onPress}>
      <PriceFront className={className} offer={offer} />
    </Pressable>
  );
}

type PriceFrontProps = {
  className?: string;
  offer: {
    price: number;
    amount: number;
  };
};

export function PriceFront({ className = "", offer }: PriceFrontProps) {
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
