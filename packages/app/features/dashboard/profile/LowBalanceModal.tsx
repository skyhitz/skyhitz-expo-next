import { Modal, Pressable, Text, View } from "app/design-system";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { tw } from "app/design-system/tailwind";
import XIcon from "app/ui/icons/x";
import DollarIcon from "app/ui/icons/dollar";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import WalletIcon from "app/ui/icons/wallet";

type Props = {
  visible: boolean;
  onClose: () => void;
  availableBalance: number;
  publicKey: string;
};
export function LowBalanceModal({
  visible,
  onClose,
  availableBalance,
  publicKey,
}: Props) {
  return (
    <Modal visible={visible} transparent={true}>
      <SafeAreaView className="flex-1 flex items-center justify-center bg-blue-field/70 px-2">
        <View className="flex items-center w-full max-w-lg bg-blue-field p-4 rounded-xl">
          <View className="flex-row items-center w-full">
            <Text className="text-white text-base flex-1 text-center font-bold">
              Balance Too Low!
            </Text>
            <Pressable onPress={onClose}>
              <XIcon color={tw.color("white")} size={22} />
            </Pressable>
          </View>
          <Text className="mt-5 text-center text-sm">
            We require a minimum balance of 2 XLM before you can mint a new NFT.
          </Text>
          <View className="flex-row mt-5 items-center">
            <Text className="mr-3 text-sm">Available Balance:</Text>
            <DollarIcon color={tw.color("white")} size={22} />
            <Text className="text-white ml-1 text-sm">
              {availableBalance.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row mt-5 items-center">
            <Text className="mr-3 text-sm">Required Minimum:</Text>
            <DollarIcon color={tw.color("white")} size={22} />
            <Text className="text-white ml-1 text-sm">2</Text>
          </View>
          <Text className="my-5 text-white text-center text-sm">
            Please transfer more XLM to your account:
          </Text>

          <FormInputWithIcon
            icon={WalletIcon}
            containerClassNames="w-full"
            style={{ fontWeight: "bold" }}
            value={publicKey}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
