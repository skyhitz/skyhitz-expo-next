import { TextEllipsis } from "app/features/dashboard/profile/textEllipsis";
import { Linking, Pressable } from "react-native";
import { Config } from "app/config";
import { View } from "app/design-system";
type Props = {
  id: string;
  text?: string;
  path: string;
  align?: "start" | "end" | "center";
  className?: string;
};

export function StellarExpertLink({
  id,
  path,
  text,
  align = "start",
  className,
}: Props) {
  return (
    <View className={`${className ?? ""} h-3`}>
      <Pressable
        onPress={() => {
          Linking.openURL(`${Config.STELLAR_EXPERT_URL}/${path}/${id}`);
        }}
      >
        <TextEllipsis
          className="text-blue"
          text={text ?? id}
          containerClassName={`justify-${align}`}
        />
      </Pressable>
    </View>
  );
}
