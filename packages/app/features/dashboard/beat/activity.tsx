import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { EntryActivity } from "app/api/graphql";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";

const typeNumberMeaning: Record<number, string> = {
  0: "Account created",
  1: "Transferred to",
  2: "Transferred dimmed",
  3: "Placed a new offer or modified existing",
  6: "Established trustline",
  13: "Transferred",
};

function ActivityEntry({
  date,
  operation,
  type,
}: {
  date: Date;
  operation: string;
  type: number;
}) {
  console.log(date);

  return (
    <View className="flex flex-row justify-between my-0.5">
      <Text>{operation}</Text>
      <Text>{typeNumberMeaning[type] ?? "Unknown activity"}</Text>
      <Text>{date.toLocaleDateString("en-us")}</Text>
    </View>
  );
}

export function Activity({ activities }: { activities: EntryActivity[] }) {
  return (
    <CollapsableView headerText="Activity" icon={ArrowsUpDownIcon}>
      <View className="mx-5 my-4.5">
        {activities?.map((item) => (
          <ActivityEntry
            key={item.id}
            date={new Date(item.ts * 1000)}
            operation={item.id}
            type={item.type}
          />
        )) ?? <Text>No activity</Text>}
      </View>
    </CollapsableView>
  );
}
