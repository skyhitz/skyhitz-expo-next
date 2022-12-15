import { Text, View } from "app/design-system";
import { Offer } from "app/types";
import { CancelOfferBtn } from "app/features/dashboard/beat/offers/CancelOfferBtn";
import { Entry, EntryHolder } from "app/api/graphql";
import { CreateOfferBtn } from "app/features/dashboard/beat/offers/CreateOfferBtn";
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
        <Text className="ml-1 text-sm">
          {(100 * numericAmount).toFixed()}% of the asset for{" "}
          {Math.round(numericAmount * numericPrice)}XLM
        </Text>
      </View>
      <CreateOfferBtn entry={entry} holders={holders} offerId={id.toString()} />
      <CancelOfferBtn entry={entry} offerId={id.toString()} />
    </View>
  );
}
