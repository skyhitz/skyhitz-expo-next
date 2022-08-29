import { Button, Text, View } from "app/design-system";
import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import ChevronDown from "app/ui/icons/chevron-down";
import { Dimensions } from "react-native";
import { LikesList } from "./components/likesLIst";
import { PlayerButtonsRow } from "./components/playerButtonsRow";
import { PlayerSlider } from "./components/playerSlider";

const { height } = Dimensions.get("window");

export function FullScreenPlayer() {
  console.log(height);
  return (
    <View
      className={`flex flex-column px-4 bg-blue-dark items-center z-10 h-${
        height / 4
      }`}
      style={{ transform: [{ translateY: -(height / 4 - 250) }] }}
    >
      <Pressable
        className="w-full flex flex-row items-center py-4"
        onPress={() => console.log("hide")}
      >
        <ChevronDown size={24} color={tw.color("white")} />
      </Pressable>
      <View className="bg-red h-50 w-50 mb-2.5" />
      <PlayerSlider />
      <View className="flex-1 flex-column items-center justify-center">
        <Text
          className="text-base font-bold text-center text-white"
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          Title
        </Text>
        <Text
          className="text-base text-center text-white"
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          Artist
        </Text>
      </View>

      <Button
        text="Buy Now"
        onPress={() => console.log("buy")}
        className="bg-blue px-5 py-2 mb-5 rounded-xl"
      />
      <PlayerButtonsRow size="large" />
      <LikesList likers={[]} />
    </View>
  );
}
