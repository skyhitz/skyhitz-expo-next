import { Pressable, Text, View } from "app/design-system";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import useEntryPrice from "app/hooks/useEntryPrice";
import { openURL } from "expo-linking";
import { stellarAssetLink } from "app/utils/stellar";

type PriceProps = {
  code?: string | null;
  issuer?: string | null;
  className?: string;
  defaultPrice?: number;
};

export default function Price({
  className,
  code,
  defaultPrice = 0,
  issuer,
}: PriceProps) {
  const entryPrice = useEntryPrice(code, issuer);

  const onPress: undefined | (() => Promise<true>) =
    code && issuer ? () => openURL(stellarAssetLink(code, issuer)) : undefined;
  return (
    <Pressable onPress={onPress}>
      <PriceFront className={className} price={entryPrice ?? defaultPrice} />
    </Pressable>
  );
}

type PriceFrontProps = {
  className?: string;
  price: number;
};

export function PriceFront({ className, price }: PriceFrontProps) {
  return (
    <View className={`flex flex-row items-center ${className}`}>
      <Dollar size={10} color={tw.color("white")} />
      {price > 0 && <Text className="text-sm ml-1">{price}</Text>}
    </View>
  );
}
