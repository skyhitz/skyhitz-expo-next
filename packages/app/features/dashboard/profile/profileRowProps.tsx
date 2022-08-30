import { Pressable, Text, View } from "app/design-system";
import ChevronRight from "app/ui/icons/chevron-right";

type ProfileRowProps = {
  icon: JSX.Element;
  title: string;
  number?: number;
};

export function ProfileRow({ icon, number, title }: ProfileRowProps) {
  return (
    <Pressable className="flex flex-row justify-between py-1.5">
      <View className="flex flex-row items-center">
        {icon}
        <Text className="font-bold ml-2 text-sm">{title}</Text>
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-sm">{number}</Text>
        <ChevronRight size={28} color="white" />
      </View>
    </Pressable>
  );
}
