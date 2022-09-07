import { Button, Text, View } from "app/design-system";
import { Pressable } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import ChevronDown from "app/ui/icons/chevron-down";
import { Dimensions, ViewStyle } from "react-native";
import { LikesList } from "./components/likesList";
import { PlayerButtonsRow } from "./components/playerButtonsRow";
import { PlayerSlider } from "./components/playerSlider";
import { SafeAreaView } from "app/design-system/safe-area-view";
import Animated from "react-native-reanimated";
import { VideoPlayer } from "app/ui/VideoPlayer";
import { useRecoilValue } from "recoil";
import { currentEntryAtom, playbackStateAtom } from "app/state/playback";

const { height } = Dimensions.get("window");

type Props = {
  onTogglePress: () => void;
  animatedStyle: ViewStyle;
};

export function FullScreenPlayer({ onTogglePress, animatedStyle }: Props) {
  const entry = useRecoilValue(currentEntryAtom);
  const playbackState = useRecoilValue(playbackStateAtom);

  if (playbackState === "ERROR") {
    return (
      <Animated.View
        style={[
          tw.style(
            ` bg-blue-dark absolute w-full items-center justify-center h-${
              height / 4
            }`
          ),
          animatedStyle,
        ]}
      >
        <Text className="text-red">Something went wrong. Try again.</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        tw.style(` bg-blue-dark absolute w-full h-${height / 4}`),
        animatedStyle,
      ]}
    >
      <SafeAreaView className="flex px-4 items-center h-full">
        <Pressable
          className="w-full flex flex-row items-center py-4"
          onPress={onTogglePress}
          hitSlop={10}
        >
          <ChevronDown size={24} color={tw.color("white")} />
        </Pressable>
        <VideoPlayer width={200} height={200} style={{ marginBottom: 40 }} />

        <PlayerSlider />
        <View className="flex-1 items-center justify-center">
          <Text
            className="text-base font-bold text-center text-white"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry?.title}
          </Text>
          <Text
            className="text-base text-center text-white"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry?.artist}
          </Text>
        </View>

        <Button
          text="Buy Now"
          onPress={() => {
            //TODO
          }}
          className="mb-5"
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
    </Animated.View>
  );
}
