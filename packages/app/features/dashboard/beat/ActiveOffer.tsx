import { Text, View } from "app/design-system";
import { Offer } from "app/types";
import { CancelOfferBtn } from "app/features/dashboard/beat/CancelOfferBtn";
import { Entry, EntryHolder } from "app/api/graphql";
import { CreateOfferBtn } from "app/features/dashboard/beat/CreateOfferBtn";
import { LinkWithLabel } from "app/ui/links/LinkWithLabel";

type ActiveOfferProps = {
  entry: Entry;
  index: number;
  offer: Offer;
  holders?: EntryHolder[] | null;
};

export function ActiveOffer({
  entry,
  index,
  offer,
  holders,
}: ActiveOfferProps) {
  const { id, price, amount } = offer;

  const bgColor = index % 2 === 1 ? "bg-blue-dark" : "bg-blue-transparent";

  const numericAmount = parseFloat(amount);
  const numericPrice = parseFloat(price);

  return (
    <View className={`md:flex-row py-3 px-5 md:items-center ${bgColor}`}>
      <LinkWithLabel type="offer" id={id.toString()} />

      <View className="md:flex-1 my-2 md:mx-2 md:my-0">
        <View className="md:flex-col">
          <Text className="my-1 md:my-0 text-sm">Amount: {numericAmount}</Text>
          <Text className="my-1 md:my-0 text-sm">
            Price: {Math.round(numericAmount * numericPrice)} XLM
          </Text>
        </View>
      </View>
      <CreateOfferBtn entry={entry} holders={holders} offerId={id.toString()} />
      <CancelOfferBtn entry={entry} offerId={id.toString()} />
    </View>
  );
}
