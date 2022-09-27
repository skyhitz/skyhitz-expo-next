import { Entry } from "app/api/graphql";
import { Button } from "app/design-system";
import useEntryPrice from "app/hooks/useEntryPrice";
import { IconProps } from "app/types";
import { PriceFront } from "app/ui/price";
import { ComponentAuthGuard } from "app/utils/authGuard";

type Props = {
  entry: Entry;
  showPrice?: boolean;
};

export function BuyNowBtn({ entry, showPrice }: Props) {
  const price = useEntryPrice(entry.code, entry.issuer);

  const PriceIcon = (_: IconProps) => <PriceFront price={price} />;

  if (!price) {
    return null;
  }

  return (
    <ComponentAuthGuard>
      <Button
        icon={showPrice ? PriceIcon : undefined}
        text="Buy Now"
        className="flex-row-reverse"
        onPress={() => {
          /*TODO*/
        }}
      />
    </ComponentAuthGuard>
  );
}
