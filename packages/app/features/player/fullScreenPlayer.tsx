import { Button, Text, View } from "app/design-system";
import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import ChevronDown from "app/ui/icons/chevron-down";
import { Dimensions } from "react-native";
import { LikesList } from "./components/likesLIst";
import { PlayerButtonsRow } from "./components/playerButtonsRow";
import { PlayerSlider } from "./components/playerSlider";
import { SafeAreaView } from "app/design-system/safe-area-view";

const { height } = Dimensions.get("window");

type Props = {
  onTogglePress: () => void;
};

export function FullScreenPlayer({ onTogglePress }: Props) {
  return (
    <SafeAreaView
      className={`flex flex-column px-4 bg-blue-dark items-center absolute w-full h-${
        height / 4
      }`}
      style={{ transform: [{ translateY: -height }] }}
    >
      <Pressable
        className="w-full flex flex-row items-center py-4"
        onPress={onTogglePress}
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
        onPress={() => {
          //TODO
        }}
        className="bg-blue px-5 py-2 mb-5 rounded-xl"
      />
      <PlayerButtonsRow size="large" />
      {/* TODO replace, it's mocked */}
      <LikesList
        likers={[
          {
            id: "1",
            avatarUrl: "https://avatars.dicebear.com/api/male/john.jpg",
          },
          { id: "2", displayName: "Long Name Text" },
          { id: "3", displayName: "Short" },
          { id: "4", displayName: "Short" },
          { id: "5", displayName: "Short" },
          { id: "6", displayName: "Short" },
          { id: "7", displayName: "Short" },
          { id: "8", displayName: "Short" },
          { id: "9", displayName: "Short" },
          { id: "10", displayName: "Short" },
          { id: "11", displayName: "Short" },
        ]}
      />
    </SafeAreaView>
  );
}
