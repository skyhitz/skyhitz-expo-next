import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import { Text } from "app/design-system";

export function Details() {
  return (
    <CollapsableView headerText="Details">
      <Text>
        Issuer address: GBCEH2GSFIPRIYILY6JB37NI7CJWWRGNQO7YFMXSHTC6P4B3QFWT34G
      </Text>
      <Text>Asset code: AIGENDRVICE</Text>
      <Text>Token Standard: SEP-0039</Text>
      <Text>Chain: Stellar</Text>
    </CollapsableView>
  );
}
