import { TextEllipsis } from "app/features/dashboard/profile/textEllipsis";
import { Linking, Pressable } from "react-native";
import { Config } from "app/config";
import { View } from "app/design-system";
type Props = {
  address: string;
};

export function StellarAccountLink({ address }: Props) {
  return (
    <View className="flex-1">
      <Pressable
        onPress={() => {
          Linking.openURL(`${Config.STELLAR_EXPERT_URL}/account/${address}`);
        }}
      >
        <TextEllipsis className="text-blue" text={address} />
      </Pressable>
    </View>
  );
}
