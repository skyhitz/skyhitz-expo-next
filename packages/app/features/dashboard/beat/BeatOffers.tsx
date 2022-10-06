import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { EntryActivity } from "app/api/graphql";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { BeatActivity } from "./BeatActivities";

export function Offers({ offers }: { offers: EntryActivity[] }) {
  return (
    <CollapsableView headerText="Offers" icon={ArrowsUpDownIcon}>
      <View>
        {offers?.map((item, index) => (
          <BeatActivity key={item.id} activity={item} index={index} />
        )) ?? <Text>No offers</Text>}
      </View>
    </CollapsableView>
  );
}
