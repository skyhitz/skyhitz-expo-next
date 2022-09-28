import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { EntryActivity } from "app/api/graphql";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";

const typeNumberMeaning: Record<number, string> = {
  0: "Account created",
  1: "Transferred to",
  2: "Transferred dimmed",
  3: "Placed a new offer or modified existing",
  6: "Established trustline",
  12: "Placed a new buy offer",
  13: "Transferred",
};

function ActivityEntry({ activity }: { activity: EntryActivity }) {
  const date = new Date(activity.ts * 1000);
  return (
    <View className="flex flex-row my-2">
      <StellarExpertLink id={activity.tx} path="tx" align="left" />
      <Text className="flex-3 mx-2">
        {typeNumberMeaning[activity.type] ?? "Unknown activity"}
      </Text>
      <Text className="flex-1">{date.toLocaleDateString("en-us")}</Text>
    </View>
  );
}

export function Activity({ activities }: { activities: EntryActivity[] }) {
  return (
    <CollapsableView headerText="Activity" icon={ArrowsUpDownIcon}>
      <View className="mx-5 my-4.5">
        {activities?.map((item) => (
          <ActivityEntry key={item.id} activity={item} />
        )) ?? <Text>No activity</Text>}
      </View>
    </CollapsableView>
  );
}
