import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import useAssetHolders from "app/hooks/stellar-expert/useAssetHolders";
import { Maybe } from "app/types";
import { Text, View } from "app/design-system";

function Holder({ account, balance }: { account: string; balance: string }) {
  return (
    <View className="flex flex-row w-full justify-between">
      <Text>{account}</Text>
      <Text>{balance}</Text>
    </View>
  );
}

export function Owners({
  code,
  issuer,
}: {
  code: Maybe<string>;
  issuer: Maybe<string>;
}) {
  const { data } = useAssetHolders(code, issuer);
  // TODO: add pie chart
  return (
    <CollapsableView headerText="Owners">
      <View className="m-5">
        {data?.map((item) => <Holder {...item} key={item.account} />) ?? (
          <Text>No one owns this asset</Text>
        )}
      </View>
    </CollapsableView>
  );
}
