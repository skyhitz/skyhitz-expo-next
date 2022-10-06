import { Entry } from "app/api/graphql";
import { Button } from "app/design-system";

import { ComponentAuthGuard } from "app/utils/authGuard";
import { useEntryOffer } from "app/hooks/useEntryOffer";
import { useState } from "react";
import { PaymentConfirmationModal } from "app/ui/modal/PaymentConfirmationModal";

type Props = {
  entry: Entry;
  invalidate: () => void;
};

export function BuyNowBtn({ entry, invalidate }: Props) {
  const price = useEntryOffer(entry.code, entry.issuer);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  if (!price) {
    return null;
  }

  return (
    <ComponentAuthGuard>
      <Button
        text="Buy Now"
        className="flex-row-reverse"
        onPress={() => {
          setModalVisible(true);
        }}
        useTouchable
      />
      <PaymentConfirmationModal
        visible={modalVisible}
        entry={entry}
        price={price.price}
        equityForSale={price.amount}
        hideModal={(success: boolean) => {
          setModalVisible(false);
          if (success) {
            invalidate();
          }
        }}
      />
    </ComponentAuthGuard>
  );
}
