import { TextEllipsis } from "app/features/dashboard/profile/textEllipsis";
import { Linking, Pressable } from "react-native";
import { Config } from "app/config";
import { View } from "app/design-system";
type Props = {
  id: string;
  text?: string;
  path: string;
  align?: "left" | "right";
};

export function StellarExpertLink({ id, path, text, align = "right" }: Props) {
  return (
    <View className="grow-1">
      <Pressable
        onPress={() => {
          Linking.openURL(`${Config.STELLAR_EXPERT_URL}/${path}/${id}`);
        }}
      >
        <TextEllipsis
          className="text-blue"
          text={text ?? id}
          containerClassName={
            align === "left" ? "justify-start" : "justify-end"
          }
        />
      </Pressable>
    </View>
  );
}
