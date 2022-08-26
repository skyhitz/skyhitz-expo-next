import { Text, View } from "app/design-system";
import { Pressable } from "react-native";
import ChevronUp from "app/ui/icons/chevron-up";
import { tw } from "app/design-system/tailwind";
import { useState } from "react";
import PlayIcon from "app/ui/icons/play";
import PauseIcon from "app/ui/icons/pause";

export function MiniPlayerBar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <View className="flex flex-row justify-between items-center h-10 bg-blue-transparent">
      <Pressable onPress={() => console.log("toggle player")}>
        <View className="flex flex-row justify-between items-center">
          <ChevronUp color={tw.color("white")} />
          <Text className="text-sm pl-1 text-white">title - artist</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <PauseIcon color={tw.color("white")} size={22} />
        ) : (
          <PlayIcon color={tw.color("white")} size={22} />
        )}
      </Pressable>
    </View>
  );
}
