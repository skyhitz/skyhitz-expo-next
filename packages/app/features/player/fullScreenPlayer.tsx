import { Pressable, Text, View } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import ChevronDown from "app/ui/icons/chevron-down";
import { Dimensions, ViewStyle } from "react-native";
import { LikesList } from "./components/likesList";
import { PlayerButtonsRow } from "./components/playerButtonsRow";
import { PlayerSlider } from "./components/playerSlider";
import { SafeAreaView } from "app/design-system/safe-area-view";
import Animated from "react-native-reanimated";
import { VideoPlayer } from "app/ui/VideoPlayer";
import { usePlayback } from "app/hooks/usePlayback";
import { BuyNowBtn } from "app/ui/buttons/BuyNowBtn";

const { height } = Dimensions.get("window");

type Props = {
  onTogglePress: () => void;
  animatedStyle: ViewStyle;
};

export function FullScreenPlayer({ onTogglePress, animatedStyle }: Props) {
  const { playbackState, entry } = usePlayback();

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
        <VideoPlayer maxHeight={200} style={{ marginBottom: 40 }} />

        {playbackState === "ERROR" || !entry ? (
          <View>
            <Text className="text-red">Something went wrong. Try again.</Text>
          </View>
        ) : (
          <>
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
            <BuyNowBtn entry={entry!} />
            <PlayerButtonsRow size="large" />
            {entry && <LikesList entry={entry} showLikeButton />}
          </>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}
