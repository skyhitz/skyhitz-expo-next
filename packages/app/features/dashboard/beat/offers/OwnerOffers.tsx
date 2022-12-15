import { CollapsableView } from "app/ui/CollapsableView";
import { View, Text } from "app/design-system";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { ActiveOffer } from "./ActiveOffer";
import { Entry, EntryHolder } from "app/api/graphql";
import { CreateOfferBtn } from "app/features/dashboard/beat/offers/CreateOfferBtn";
import { useUserOffers } from "app/hooks/useUserOffers";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useMemo } from "react";
import { filter } from "ramda";

type OwnerOffersProps = {
  entry: Entry;
  holders?: EntryHolder[] | null;
};

export function OwnerOffers({ entry, holders }: OwnerOffersProps) {
  const user = useRecoilValue(userAtom);
  const { offers } = useUserOffers(user?.publicKey, entry.issuer, entry.code);

  const isOwner = useMemo(() => {
    const arrayWithOwner = holders
      ? filter((holder) => holder.account === user?.publicKey, holders)
      : [];

    return arrayWithOwner.length > 0;
  }, [holders, user]);

  const Offers = () => {
    return (
      <CollapsableView headerText="Offers" icon={ArrowsUpDownIcon}>
        <View>
          {offers.map((offer, index) => (
            <ActiveOffer
              key={offer.id}
              entry={entry}
              index={index}
              offer={offer}
              holders={holders}
            />
          ))}
        </View>
      </CollapsableView>
    );
  };

  const CreateOfferRow = () => {
    return (
      <CollapsableView headerText="Offers" icon={ArrowsUpDownIcon}>
        <View>
          <View className="md:flex-row py-3 px-5 md:items-center bg-blue-transparent justify-between">
            <Text className="my-1 md:my-0 text-sm">
              You don't have any offers
            </Text>
            <CreateOfferBtn entry={entry} holders={holders} offerId="0" />
          </View>
        </View>
      </CollapsableView>
    );
  };

  if (!isOwner) return null;

  return <>{offers && offers.length > 0 ? <Offers /> : <CreateOfferRow />}</>;
}
