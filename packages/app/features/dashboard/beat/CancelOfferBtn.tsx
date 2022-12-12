import { Entry } from "app/api/graphql";
import { Button } from "app/design-system";
import { ComponentAuthGuard } from "app/utils/authGuard";
import { useState } from "react";
import { CancelConfirmationModal } from "./CancelOfferModal";

type Props = {
  entry: Entry;
  offerId: string;
};

export function CancelOfferBtn({ offerId, entry }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ComponentAuthGuard>
      <Button
        text="Cancel an offer"
        className="flex-row-reverse mt-3 mr-1"
        onPress={() => {
          setModalVisible(true);
        }}
        useTouchable
      />
      <CancelConfirmationModal
        visible={modalVisible}
        entry={entry}
        offerId={offerId}
        hideModal={() => {
          setModalVisible(false);
        }}
      />
    </ComponentAuthGuard>
  );
}
