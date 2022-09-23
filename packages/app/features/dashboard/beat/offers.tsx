import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import { Text, View } from "app/design-system";
import { Maybe } from "app/types";
import useAssetOffers from "app/hooks/stellar-expert/useAssetOffers";

const typeNumberMeaning: Record<number, string> = {
  0: "Account created",
  1: "Transferred to",
  2: "Transferred dimmed",
  3: "Placed a new offer or modified existing",
  6: "Established trustline",
  13: "Transferred",
};

function OfferEntry({
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
export function Offers({
  code,
  issuer,
}: {
  code: Maybe<string>;
  issuer: Maybe<string>;
}) {
  const { data } = useAssetOffers(code, issuer);
  return (
    <CollapsableView headerText="Offers">
      <View className="mx-5 my-4.5">
        {data?.map((item) => (
          <OfferEntry
            key={item.id}
            date={new Date(item.ts)}
            operation={item.id}
            type={item.type}
          />
        )) ?? <Text>No offers</Text>}
      </View>
    </CollapsableView>
  );
}
