import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { EntryActivity } from "app/api/graphql";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";

type LinkWithLabelProps = {
  type: "account" | "asset" | "tx";
  id: string;
  className?: string;
};

function LinkWithLabel({ type, id, className = "w-20" }: LinkWithLabelProps) {
  const label =
    type === "tx"
      ? "Transaction"
      : type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <View className="flex-row md:ml-1 items-center">
      <Text className="text-grey text-sm">{label}: </Text>
      <StellarExpertLink id={id} path={type} className={className} />
    </View>
  );
}

export function BeatActivity({
  activity,
  index,
}: {
  activity: EntryActivity;
  index: number;
}) {
  const date = new Date(activity.ts * 1000);

  const AssetTransfered = () => {
    if (activity?.accounts?.length !== 2) {
      return (
        <Text className="my-1 md:my-0 text-sm">Unsupported activity type</Text>
      );
    }
    const sender = activity.accounts[0]!;
    const receiver = activity.accounts[1]!;
    return (
      <View className="md:flex-row flex md:items-center md:flex-wrap">
        <LinkWithLabel type="account" id={sender} />
        <Text className="my-1 md:my-0 text-sm">Transfered Asset to</Text>
        <LinkWithLabel type="account" id={receiver} />
      </View>
    );
  };

  const Offer = ({ type = "sell" }: { type: "buy" | "sell" }) => {
    const amount = type === "buy" ? activity.amount : activity.sourceAmount;

    if (
      activity?.accounts?.length !== 1 ||
      !amount ||
      !activity.price?.n ||
      !activity.price?.d ||
      activity.assets?.length !== 2
    ) {
      return (
        <Text className="my-1 md:my-0 text-sm">Unsupported activity type</Text>
      );
    }
    const account = activity.accounts[0]!;
    if (amount === "0") {
      return (
        <View className="md:flex-row flex md:items-center md:flex-wrap">
          <LinkWithLabel type="account" id={account} />
          <Text className="my-1 md:my-0 text-sm">Cancelled offer</Text>
        </View>
      );
    }

    const price = (parseFloat(amount) * activity.price.n) / activity.price.d;

    const buyAsset = activity.assets[type === "buy" ? 1 : 0]!;
    const sellAsset = activity.assets[type === "buy" ? 0 : 1]!;

    return (
      <View className="md:flex-row flex md:items-center md:flex-wrap">
        <LinkWithLabel type="account" id={account} />
        <Text className="my-1 md:my-0 text-sm">
          Created a {type} offer {amount}
        </Text>
        <LinkWithLabel type="asset" id={buyAsset} />
        <Text className="my-1 md:my-0 text-sm">for {price}</Text>
        <LinkWithLabel type="asset" id={sellAsset} />
      </View>
    );
  };

  const EstablishedTrustline = () => {
    if (activity?.accounts?.length !== 1 || activity.assets?.length !== 1) {
      return (
        <Text className="my-1 md:my-0 text-sm">Unsupported activity type</Text>
      );
    }
    const account = activity.accounts[0]!;
    const asset = activity.assets[0]!;

    return (
      <View className="md:flex-row flex md:items-center md:flex-wrap">
        <LinkWithLabel type="account" id={account} />
        <Text className="my-1 md:my-0 text-sm">Established trustline to</Text>
        <LinkWithLabel type="asset" id={asset} />
      </View>
    );
  };

  const Transfer = () => {
    if (
      activity?.accounts?.length !== 2 ||
      !activity.sourceAmount ||
      !activity.amount ||
      activity.assets?.length !== 2
    ) {
      return (
        <Text className="my-1 md:my-0 text-sm">Unsupported activity type</Text>
      );
    }
    const buyer = activity.accounts[0]!;

    const buyAsset = activity.assets[1]!;
    const sellAsset = activity.assets[0]!;

    return (
      <View className="md:flex-row flex md:items-center md:flex-wrap">
        <LinkWithLabel type="account" id={buyer} />
        <Text className="my-1 md:my-0 text-sm">
          Transfered {activity.sourceAmount}
        </Text>
        <LinkWithLabel type="asset" id={sellAsset} />
        <Text className="my-1 md:my-0 text-sm">
          in exchange for {activity.amount}
        </Text>
        <LinkWithLabel type="asset" id={buyAsset} />
      </View>
    );
  };

  const CenterWidget = () => {
    switch (activity.type) {
      case 0:
        return <Text>Account Created</Text>;
      case 1:
        return <AssetTransfered />;
      case 2:
        return <Transfer />;
      case 3:
        return <Offer type="sell" />;
      case 6:
        return <EstablishedTrustline />;
      case 12:
        return <Offer type="buy" />;
      case 13:
        return <Transfer />;
      default:
        return (
          <Text className="my-1 md:my-0 text-sm">
            Unsupported activity type
          </Text>
        );
    }
  };

  const bgColor = index % 2 === 1 ? "bg-blue-dark" : "bg-blue-transparent";
  return (
    <View className={`md:flex-row py-3 px-5 md:items-center ${bgColor}`}>
      <LinkWithLabel type="tx" id={activity.tx} className="w-30" />

      <View className="md:flex-1 my-2 md:mx-2 md:my-0">
        <CenterWidget />
      </View>
      <Text className="text-sm my-2 md:my-0 text-grey">
        {date.toLocaleDateString("en-us")}
      </Text>
    </View>
  );
}

export function Activity({ activities }: { activities: EntryActivity[] }) {
  return (
    <CollapsableView headerText="Activity" icon={ArrowsUpDownIcon}>
      <View>
        {activities?.map((item, index) => (
          <BeatActivity key={item.id} activity={item} index={index} />
        )) ?? <Text>No activity</Text>}
      </View>
    </CollapsableView>
  );
}
