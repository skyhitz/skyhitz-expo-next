import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { EntryActivity } from "app/api/graphql";
import { ArrowsUpDownIcon } from "app/ui/icons/arrows-up-down";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";

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
      return <Text>Unsupported activity type</Text>;
    }
    const sender = activity.accounts[0]!;
    const receiver = activity.accounts[1]!;
    return (
      <View className="flex-row flex-wrap items-center">
        <StellarExpertLink
          id={sender}
          path="account"
          fixedWidth={20}
          align="start"
        />
        <Text className="my-1 md:my-0 text-sm"> Transfered Asset to </Text>
        <StellarExpertLink
          id={receiver}
          path="account"
          fixedWidth={20}
          align="start"
        />
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
      return <Text>Unsupported activity type</Text>;
    }
    const account = activity.accounts[0]!;
    if (amount === "0") {
      return (
        <View className="flex-row flex-wrap items-center">
          <StellarExpertLink
            id={account}
            path="account"
            fixedWidth={20}
            align="start"
          />
          <Text className="my-1 md:my-0 text-sm"> Cancelled offer</Text>
        </View>
      );
    }

    const price = (parseFloat(amount) * activity.price.n) / activity.price.d;

    const buyAsset = activity.assets[type === "buy" ? 1 : 0]!;
    const sellAsset = activity.assets[type === "buy" ? 0 : 1]!;

    return (
      <View className="flex-row flex-wrap items-center">
        <StellarExpertLink
          id={account}
          path="account"
          fixedWidth={20}
          align="start"
        />
        <Text className="my-1 md:my-0 text-sm">
          {" "}
          Created a {type} offer {amount}{" "}
        </Text>
        <StellarExpertLink id={buyAsset} path="asset" fixedWidth={20} />
        <Text className="my-1 md:my-0 text-sm"> for {price} </Text>
        <StellarExpertLink
          id={sellAsset}
          path="asset"
          fixedWidth={20}
          align="start"
        />
      </View>
    );
  };

  const EstablishedTrustline = () => {
    if (activity?.accounts?.length !== 1 || activity.assets?.length !== 1) {
      return <Text>Unsupported activity type</Text>;
    }
    const account = activity.accounts[0]!;
    const asset = activity.assets[0]!;

    return (
      <View className="flex-row flex-wrap items-center">
        <StellarExpertLink
          id={account}
          path="account"
          fixedWidth={20}
          align="start"
        />
        <Text className="my-1 md:my-0 text-sm"> Established trustline to </Text>
        <StellarExpertLink id={asset} path="asset" fixedWidth={20} />
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
      return <Text>Unsupported activity type</Text>;
    }
    const buyer = activity.accounts[0]!;

    const buyAsset = activity.assets[1]!;
    const sellAsset = activity.assets[0]!;

    return (
      <View className="md:flex-row flex-wrap md:items-center">
        <StellarExpertLink
          id={buyer}
          path="account"
          fixedWidth={20}
          align="start"
        />
        <Text className="my-1 md:my-0 text-sm">
          Transfered {activity.sourceAmount}{" "}
        </Text>
        <StellarExpertLink
          id={sellAsset}
          path="asset"
          fixedWidth={20}
          align="center"
        />
        <Text className="my-1 md:my-0 text-sm">
          {" "}
          in exchange for {activity.amount}{" "}
        </Text>
        <StellarExpertLink
          id={buyAsset}
          path="asset"
          fixedWidth={20}
          align="start"
        />
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
        return <Text>Unsupported activity type</Text>;
    }
  };

  const bgColor = index % 2 === 1 ? "bg-blue-dark" : "bg-blue-transparent";
  return (
    <View className={`flex md:flex-row py-3 px-5 md:items-center ${bgColor}`}>
      <StellarExpertLink id={activity.tx} path="tx" align="start" />
      <View className="flex-5 my-2 md:mx-2 md:my-0">
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
