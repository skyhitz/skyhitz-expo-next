import { CollapsableView } from "app/ui/CollapsableView";
import { View, Text } from "app/design-system";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { OfferRecord } from "app/types";
import { ActiveOffer } from "./ActiveOffer";
import { Entry, EntryHolder } from "app/api/graphql";
import { CreateOfferBtn } from "app/ui/buttons/CreateOfferBtn";
import { useUserOffers } from "app/hooks/useUserOffers";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

type OwnerOffersProps = {
  entry: Entry;
  holders?: EntryHolder[] | null;
};

type ListOffersProps = {
  offers: OfferRecord[];
  entry: Entry;
  holders?: EntryHolder[] | null;
};

type CreateOfferProps = {
  entry: Entry;
  holders?: EntryHolder[] | null;
};

export function OwnerOffers({ entry, holders }: OwnerOffersProps) {
  const user = useRecoilValue(userAtom);
  const { offers }: { offers: OfferRecord[] } = useUserOffers(
    user?.publicKey,
    entry.issuer,
    entry.code
  );

  const Offers = ({ offers, entry }: ListOffersProps) => {
    return (
      <CollapsableView headerText="Your active offers" icon={ArrowsUpDownIcon}>
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

  const CreateOfferRow = ({ entry, holders }: CreateOfferProps) => {
    return (
      <CollapsableView headerText="Your active offers" icon={ArrowsUpDownIcon}>
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

  return (
    <>
      {offers && offers.length > 0 ? (
        <Offers offers={offers} entry={entry} holders={holders} />
      ) : (
        <CreateOfferRow entry={entry} holders={holders} />
      )}
    </>
  );
}
