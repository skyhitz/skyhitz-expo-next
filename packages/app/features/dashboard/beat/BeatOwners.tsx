import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { compose, isEmpty, map, prop, sum } from "ramda";
import { EntryHolder } from "app/api/graphql";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";
import { PeopleIcon } from "app/ui/icons/people";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

function Holder({
  account,
  percentage,
  isCurrentUser,
}: {
  account: string;
  percentage: number;
  isCurrentUser: boolean;
}) {
  return (
    <View className="flex flex-row w-full justify-between my-2">
      <StellarExpertLink id={account} path="account" className="grow-1" />
      {isCurrentUser && (
        <Text className="text-sm text-grey text-left">(me)</Text>
      )}
      <Text className="flex-1 text-right">{percentage.toFixed(2)}%</Text>
    </View>
  );
}

type Props = {
  holders: EntryHolder[];
};

export function Owners({ holders }: Props) {
  const totalBalance = sum(map(compose(parseInt, prop("balance")), holders));
  const user = useRecoilValue(userAtom);

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
              isCurrentUser={user?.publicKey === item.account}
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
