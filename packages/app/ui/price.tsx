import { Text, View } from "app/design-system";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import useEntryPrice from "app/hooks/useEntryPrice";

type PriceProps = PriceOfEntryProps | PriceFrontProps;

export default function Price(props: PriceProps) {
  if ("code" in props) {
    return <PriceOfEntry {...props} />;
  }
  return <PriceFront {...props} />;
}

type PriceOfEntryProps = {
  code: string;
  issuer: string;
} & Partial<PriceFrontProps>;

function PriceOfEntry({
  code,
  issuer,
  price: defaultPrice,
  ...rest
}: PriceOfEntryProps) {
  const entryPrice = useEntryPrice(code, issuer);
  return <PriceFront {...rest} price={entryPrice ?? defaultPrice ?? 0} />;
}

type PriceFrontProps = {
  className?: string;
  price: number;
};

function PriceFront({ className, price }: PriceFrontProps) {
  return (
    <View className={`flex flex-row items-center ${className}`}>
      <Dollar size={10} color={tw.color("white")} />
      {price > 0 && <Text className="text-sm ml-1">{price}</Text>}
    </View>
  );
}
