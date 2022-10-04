import { Button, Modal, Pressable, Text, View, Image } from "app/design-system";
import { SafeAreaView } from "app/design-system/safe-area-view";
import X from "app/ui/icons/x";
import { tw } from "app/design-system/tailwind";
import { Entry, usePaymentsInfoQuery } from "app/api/graphql";
import { Line } from "app/ui/orSeparator";
import { imageUrlSmall } from "app/utils/entry";

type Props = {
  visible: boolean;
  hideModal: () => void;
  price: number;
  equityForSale: number;
  entry: Entry;
};
export function PaymentConfirmationModal({
  visible,
  hideModal,
  price,
  equityForSale,
  entry,
}: Props) {
  const { data: paymentInfoData } = usePaymentsInfoQuery();

  return (
    <Modal visible={visible} transparent>
      <SafeAreaView className="flex-1 flex items-center justify-center bg-blue-field/70 px-2">
        <View className="flex items-center w-full max-w-lg bg-blue-field p-4">
          <Pressable className="absolute right-2 top-2 " onPress={hideModal}>
            <X color={tw.color("white")} />
          </Pressable>
          <Text className="text-lg font-bold">Confirm payment</Text>
          <View className="flex-row my-4 items-center">
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: entry.imageUrl ? imageUrlSmall(entry.imageUrl) : "",
              }}
            />
            <Text className="ml-2">
              {entry.title}-{entry.artist}
            </Text>
          </View>

          <Line />
          <Text className="my-2 text-sm">
            Current Balance:{" "}
            {paymentInfoData?.paymentsInfo?.credits?.toFixed(2) ?? "0.00"} XLM
          </Text>
          <Text className="my-2 text-sm">Price: {price.toFixed(2)} XLM</Text>
          <Text className="my-2 text-sm">
            Equity for sale: {(equityForSale * 100).toFixed()}%
          </Text>
          <Line />
          <Button
            className="mt-4"
            text="Confirm"
            onPress={() => console.log("Confirm")}
            disabled={price >= (paymentInfoData?.paymentsInfo?.credits ?? 0)}
            // loading={loading}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
