import { Entry } from "app/api/graphql";
import { Button } from "app/design-system";

import { ComponentAuthGuard } from "app/utils/authGuard";
import { useState } from "react";
import { OfferSettingsModal } from "../modal/OfferSettingsModal";

type Props = {
  entry: Entry;
};

export function CreateOfferBtn({ entry }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ComponentAuthGuard>
      <Button
        text="Create an offer"
        className="flex-row-reverse mt-3"
        onPress={() => {
          setModalVisible(true);
        }}
        useTouchable
      />
      <OfferSettingsModal
        visible={modalVisible}
        entry={entry}
        hideModal={(_: boolean) => {
          setModalVisible(false);
        }}
      />
    </ComponentAuthGuard>
  );
}
