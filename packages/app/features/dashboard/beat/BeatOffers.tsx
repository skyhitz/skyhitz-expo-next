import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { EntryActivity } from "app/api/graphql";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { BeatActivity } from "./BeatActivities";

export function Offers({ offers }: { offers: EntryActivity[] }) {
  return (
    <CollapsableView headerText="Offers" icon={ArrowsUpDownIcon}>
      <View className="mx-5 my-4.5">
        {offers?.map((item) => (
          <BeatActivity key={item.id} activity={item} />
        )) ?? <Text>No offers</Text>}
      </View>
    </CollapsableView>
  );
}
