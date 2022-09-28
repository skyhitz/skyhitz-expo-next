import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { compose, isEmpty, map, prop, sum } from "ramda";
import { EntryHolder } from "app/api/graphql";
import { StellarAccountLink } from "app/ui/links/StellarAccountLink";
import { PeopleIcon } from "app/ui/icons/people";
function Holder({
  account,
  percentage,
}: {
  account: string;
  percentage: number;
}) {
  return (
    <View className="flex flex-row w-full justify-between">
      <StellarAccountLink address={account} />
      <Text className="flex-1 text-right">{percentage.toFixed(2)}%</Text>
    </View>
  );
}

type Props = {
  holders: EntryHolder[];
};

export function Owners({ holders }: Props) {
  const totalBalance = sum(map(compose(parseInt, prop("balance")), holders));
  const Content = () => {
    if (isEmpty(holders)) {
      return <Text>No one owns this asset</Text>;
    } else {
      return (
        <>
          {holders.map((item) => (
            <Holder
              account={item.account}
              percentage={(parseInt(item.balance, 10) * 100) / totalBalance}
              key={item.account}
            />
          ))}
        </>
      );
    }
  };

  return (
    <CollapsableView headerText="Owners" icon={PeopleIcon}>
      <View className="m-5">
        <Content />
      </View>
    </CollapsableView>
  );
}
