import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { isEmpty } from "ramda";
import { EntryHolder } from "app/api/graphql";

function Holder({ account, balance }: { account: string; balance: string }) {
  return (
    <View className="flex flex-row w-full justify-between">
      <Text>{account}</Text>
      <Text>{balance}</Text>
    </View>
  );
}

type Props = {
  holders: EntryHolder[];
};

export function Owners({ holders }: Props) {
  const Content = () => {
    if (isEmpty(holders)) {
      return <Text>No one owns this asset</Text>;
    } else {
      return (
        <>
          {holders.map((item) => (
            <Holder {...item} key={item.account} />
          ))}
        </>
      );
    }
  };

  return (
    <CollapsableView headerText="Owners">
      <View className="m-5">
        <Content />
      </View>
    </CollapsableView>
  );
}
