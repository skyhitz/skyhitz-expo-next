import { Pressable, Text, View } from "app/design-system";

export type Tabs = "Beats" | "Beatmakers";

type TabBarProps = {
  selected: Tabs;
  onTabClick?: (_: Tabs) => void;
};

export function TabBar({ onTabClick, selected }: TabBarProps) {
  return (
    <View className="w-full flex flex-row">
      <Pressable className="grow py-4" onPress={() => onTabClick?.("Beats")}>
        <Text
          className={`${
            selected === "Beats" ? "text-white" : "text-neutral-500"
          } text-sm mx-auto`}
        >
          Beats
        </Text>
      </Pressable>
      <Pressable
        className="grow py-4"
        onPress={() => onTabClick?.("Beatmakers")}
      >
        <Text
          className={`${
            selected === "Beatmakers" ? "text-white" : "text-neutral-500"
          } text-sm mx-auto`}
        >
          Beatmakers
        </Text>
      </Pressable>
    </View>
  );
}
