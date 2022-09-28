import { TextEllipsis } from "app/features/dashboard/profile/textEllipsis";
import { Linking, Pressable } from "react-native";
import { Config } from "app/config";
import { View } from "app/design-system";
type Props = {
  id: string;
  text?: string;
  path: string;
  align?: "left" | "right";
  fixedWidth?: number;
};

export function StellarExpertLink({
  id,
  path,
  text,
  align = "right",
  fixedWidth,
}: Props) {
  return (
    <View className={fixedWidth ? `w-${fixedWidth} h-3` : "grow-1 h-3"}>
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
