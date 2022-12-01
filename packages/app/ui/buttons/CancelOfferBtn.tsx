import { Entry } from "app/api/graphql";
import { Button, Modal, Pressable, Text } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import { ComponentAuthGuard } from "app/utils/authGuard";
import { useState } from "react";
import X from "../icons/x";

type Props = {
  entry: Entry;
};

type ModalProps = {
  visible: boolean;
  entry: Entry;
  hideModal: () => void;
};

export function CancelOfferBtn({ entry }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const CancelConfirmationModal = ({ visible, hideModal }: ModalProps) => {
    return (
      <>
        <Modal visible={visible} transparent>
          <Pressable
            onPress={() => {
              hideModal();
            }}
            className="flex-1 flex items-center justify-center bg-blue-field/70 w-full p-4"
          >
            <Pressable
              onPress={() => {}}
              className="flex items-center w-full max-w-lg bg-blue-field p-4"
            >
              <Pressable
                className="absolute right-2 top-2 "
                onPress={() => {
                  hideModal();
                }}
              >
                <X color={tw.color("white")} />
              </Pressable>
              <Text className="text-lg font-bold">
                Confirm to cancel the offer.
              </Text>
              <Button
                className="mt-4"
                text="Confirm"
                onPress={async () => {}}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </>
    );
  };
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
        hideModal={() => {
          setModalVisible(false);
        }}
      />
    </ComponentAuthGuard>
  );
}
