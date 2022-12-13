import { Button, Text, View } from "app/design-system";
import { Entry, EntryHolder, Offer } from "app/api/graphql";
import { LinkWithLabel } from "app/ui/links/LinkWithLabel";
import { useCallback } from "react";

type ActiveOfferProps = {
  entry: Entry;
  index: number;
  offer: Offer;
  holders?: EntryHolder[] | null;
};

export function ActiveBid({ entry, index, offer }: ActiveOfferProps) {
  const { id, price, amount } = offer;
  const bgColor = index % 2 === 1 ? "bg-blue-dark" : "bg-blue-transparent";
  const numericAmount = parseFloat(amount);
  const numericPrice = parseFloat(price);

  // TODO
  const hideBid = useCallback(() => {}, []);

  // TODO
  const acceptBid = useCallback(() => {}, []);

  return (
    <View className={`md:flex-row py-3 px-5 md:items-center ${bgColor}`}>
      <LinkWithLabel type="offer" id={id.toString()} />

      <View className="md:flex-1 my-2 md:mx-2 md:my-0">
        <Text className="ml-1 text-sm">
          {numericAmount} XLM for {numericAmount * numericPrice * 100}% of asset
        </Text>
      </View>
      <Button
        text="Hide"
        onPress={hideBid}
        variant="secondary"
        size="small"
        className="mx-2"
      />
      <Button
        text="Accept"
        onPress={acceptBid}
        variant="primary"
        size="small"
      />
    </View>
  );
}
