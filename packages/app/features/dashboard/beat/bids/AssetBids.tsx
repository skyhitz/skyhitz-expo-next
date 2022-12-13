import { CollapsableView } from "app/ui/CollapsableView";
import { View } from "app/design-system";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { Entry, EntryHolder, useAssetBidsQuery } from "app/api/graphql";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useMemo } from "react";
import { ActiveBid } from "./ActiveBid";

type Props = {
  entry: Entry;
  holders?: EntryHolder[] | null;
};

export function AssetBids({ entry, holders }: Props) {
  const user = useRecoilValue(userAtom);
  const { data } = useAssetBidsQuery({
    variables: { assetCode: entry.code, assetIssuer: entry.issuer },
  });

  const isOwner = useMemo(() => {
    const isOwner = (holders ?? []).some(
      (holder) => holder.account === user?.publicKey
    );
    return isOwner;
  }, [holders, user]);

  console.log(isOwner, data);

  if (!isOwner || !data || data?.bids.length === 0) return null;

  return (
    <CollapsableView headerText="Active Bids" icon={ArrowsUpDownIcon}>
      <View>
        {data.bids.map((offer, index) => (
          <ActiveBid key={offer.id} entry={entry} index={index} offer={offer} />
        ))}
      </View>
    </CollapsableView>
  );
}
