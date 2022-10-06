import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { Config } from "app/config";
import { ReactElement } from "react";
import { StellarExpertLink } from "app/ui/links/StellarExpertLink";
import { Details as DetailsIcon } from "app/ui/icons/details";
import { getAssetId } from "../../../utils/stellar";

type Props = {
  issuer: string;
  code: string;
};

export function Details({ issuer, code }: Props) {
  const Row = ({
    label,
    trailingWidget,
    value = "",
  }: {
    label: string;
    trailingWidget?: ReactElement;
    value?: string;
  }) => {
    const defaultTrailingWidget = (
      <Text className="text-sm leading-snug my-0.5">{value}</Text>
    );

    return (
      <View className="flex-row items-center">
        <Text className="text-sm leading-snug my-0.5 flex-1">{label}</Text>
        {trailingWidget ?? defaultTrailingWidget}
      </View>
    );
  };
  return (
    <CollapsableView headerText="Details" icon={DetailsIcon}>
      <View className="mx-5 my-4.5">
        <Row
          label="Issuer address:"
          trailingWidget={
            <StellarExpertLink
              id={issuer}
              path="account"
              className="grow-1"
              align="end"
            />
          }
        />
        <Row
          label="Asset code:"
          trailingWidget={
            <StellarExpertLink
              id={getAssetId(code, issuer)}
              text={code}
              path="asset"
              className="grow-1"
              align="end"
            />
          }
        />
        <Row label="Chain:" value={Config.CHAIN_ID} />
      </View>
    </CollapsableView>
  );
}
