import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import useAssetHistory from "app/hooks/stellar-expert/useAssetHistory";
import { Maybe } from "app/types";
import { Text, View } from "app/design-system";

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
  return (
    <View className="flex flex-row justify-between my-0.5">
      <Text>{operation}</Text>
      <Text>{typeNumberMeaning[type] ?? "Unknown activity"}</Text>
      <Text>{date}</Text>
    </View>
  );
}

export function Activity({
  code,
  issuer,
}: {
  code: Maybe<string>;
  issuer: Maybe<string>;
}) {
  const { data } = useAssetHistory(code, issuer);
  return (
    <CollapsableView headerText="Activity">
      <View className="mx-5 my-4.5">
        {data?.map((item) => (
          <ActivityEntry
            key={item.id}
            date={new Date(item.ts)}
            operation={item.id}
            type={item.type}
          />
        )) ?? <Text>No activity</Text>}
      </View>
    </CollapsableView>
  );
}
