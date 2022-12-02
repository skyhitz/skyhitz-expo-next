import { Entry } from "app/api/graphql";
import { useEntryOffer } from "app/hooks/useEntryOffer";
import { Button, Text, View } from "app/design-system";
import { BuyNowBtn } from "app/ui/buttons/BuyNowBtn";
import Dollar from "app/ui/icons/dollar";
import { tw } from "app/design-system/tailwind";
import useUSDPrice from "app/hooks/useUSDPrice";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import PieChartIcon from "app/ui/icons/pie";
import { useState } from "react";
import { useCreateBuyOfferMutation } from "../../../api/graphql";
type Props = {
  entry: Entry;
};

export function PriceContainer({ entry }: Props) {
  const offer = useEntryOffer(entry.code!, entry.issuer!);
  const usd = useUSDPrice(offer.price * offer.amount);
  const [proposedPrice, setProposedPrice] = useState("");
  const [createOffer, { data, loading }] = useCreateBuyOfferMutation();
  const [equityToBuy, setEquityToBuy] = useState("");

  console.log(data);

  if (!offer.price) {
    return (
      <View className="border-[0.5px] mt-4 border-grey-light rounded-lg bg-blue-transparent flex p-4">
        <Text className="mb-3 text-sm text-grey-light">
          Create an offer for this asset
        </Text>
        <View className="flex flex-row items-center mb-3">
          <FormInputWithIcon
            containerClassNames="border border-white rounded p-5 mr-2"
            icon={Dollar}
            value={proposedPrice}
            onChangeText={(text) =>
              setProposedPrice(text.replace(/[^0-9]/g, ""))
            }
            placeholder="Price (XLM)"
            keyboardType="numeric"
            maxLength={10}
          />
          <FormInputWithIcon
            containerClassNames="border border-white rounded p-5 ml-2"
            icon={PieChartIcon}
            value={equityToBuy}
            onChangeText={(text) => {
              if (text === "") {
                setEquityToBuy("");
              }
              const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
              if (num <= 100 && num >= 1) {
                setEquityToBuy(num.toString());
              }
            }}
            placeholder="Equity To Buy (1-100)"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <Button
          text="Submit offer"
          onPress={() => {
            createOffer({
              variables: {
                id: entry.id!,
                price: parseInt(proposedPrice, 10),
                equityToBuy: parseFloat(equityToBuy) / 100,
              },
            });
          }}
          disabled={!proposedPrice || !equityToBuy}
          loading={loading}
        />
      </View>
    );
  }

  return (
    <View className="border-[0.5px] mt-4 border-grey-light rounded-lg bg-blue-transparent flex p-4">
      <Text className="mb-3 text-sm text-grey-light">
        Current price ( {(100 * offer.amount).toFixed(0)}% of the asset )
      </Text>
      <View className="flex flex-row items-end mb-3">
        <Dollar size={30} color={tw.color("white")} />
        <Text className="text-3xl ml-3 text-white">
          {(offer.price * offer.amount).toFixed()} XLM
        </Text>
        <Text className="text-base ml-3 text-grey-light">
          ${usd.toFixed(2)}
        </Text>
      </View>
      <BuyNowBtn entry={entry} />
    </View>
  );
}
