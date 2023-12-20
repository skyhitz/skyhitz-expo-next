import { Pressable, Text, View } from "app/design-system";

export type Tabs = "MFTs" | "Collectors";

type TabBarProps = {
  selected: Tabs;
  onTabClick?: (tab: Tabs) => void;
};

export function TabBar({ onTabClick, selected }: TabBarProps) {
  return (
    <View className="w-full flex flex-row">
      <Pressable className="grow py-4" onPress={() => onTabClick?.("MFTs")}>
        <Text
          className={`${
            selected === "MFTs" ? "text-white" : "text-neutral-500"
          } text-sm mx-auto`}
        >
          MFTs
        </Text>
      </Pressable>
      <Pressable
        className="grow py-4"
        onPress={() => onTabClick?.("Collectors")}
      >
        <Text
          className={`${
            selected === "Collectors" ? "text-white" : "text-neutral-500"
          } text-sm mx-auto`}
        >
          Collectors
        </Text>
      </Pressable>
    </View>
  );
}
