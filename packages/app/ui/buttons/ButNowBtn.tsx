import { Entry } from "app/api/graphql";
import { Button } from "app/design-system";

import { ComponentAuthGuard } from "app/utils/authGuard";
import { useEntryOffer } from "app/hooks/useEntryOffer";

type Props = {
  entry: Entry;
};

export function BuyNowBtn({ entry }: Props) {
  const price = useEntryOffer(entry.code, entry.issuer);

  if (!price) {
    return null;
  }

  return (
    <ComponentAuthGuard>
      <Button
        text="Buy Now"
        className="flex-row-reverse"
        onPress={() => {
          /*TODO*/
        }}
      />
    </ComponentAuthGuard>
  );
}
