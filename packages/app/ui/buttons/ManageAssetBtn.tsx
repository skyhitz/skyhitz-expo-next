import { Entry } from "app/api/graphql";
import { Button } from "app/design-system";

import { ComponentAuthGuard } from "app/utils/authGuard";
import { useState } from "react";
import { AssetSettingsModal } from "../modal/AssetSettingsModal";

type Props = {
  entry: Entry;
};

export function ManageAssetBtn({ entry }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ComponentAuthGuard>
      <Button
        text="Manage an asset"
        className="flex-row-reverse mt-3"
        onPress={() => {
          setModalVisible(true);
        }}
        useTouchable
      />
      <AssetSettingsModal
        visible={modalVisible}
        entry={entry}
        hideModal={(_: boolean) => {
          setModalVisible(false);
        }}
      />
    </ComponentAuthGuard>
  );
}
