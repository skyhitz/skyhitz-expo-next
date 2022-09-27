import { CollapsableView } from "app/ui/CollapsableView";
import { Text, View } from "app/design-system";
import { Maybe } from "app/types";

type Props = {
  issuer: Maybe<string>;
  code: Maybe<string>;
};

const textClassNames = "text-sm leading-snug my-0.5";

export function Details({ issuer, code }: Props) {
  // TODO: Token standard and chain
  return (
    <CollapsableView headerText="Details">
      <View className="mx-5 my-4.5">
        <Text className={textClassNames}>Issuer address: {issuer}</Text>
        <Text className={textClassNames}>Asset code: {code}</Text>
        <Text className={textClassNames}>Token Standard: SEP-0039</Text>
        <Text className={textClassNames}>Chain: Stellar</Text>
      </View>
    </CollapsableView>
  );
}
