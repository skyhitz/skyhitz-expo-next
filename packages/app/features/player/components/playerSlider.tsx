import React, { useState } from "react";
import { Text, View } from "app/design-system";
import { usePlayback } from "app/hooks/usePlayback";
import { any, equals } from "ramda";
import { SkyhitzSlider } from "app/ui/SkyhitzSlider";

export function PlayerSlider() {
  const { startSeeking, onSeekCompleted, duration, position, playbackState } =
    usePlayback();
  const [seekPosition, setSeekPosition] = useState<number>(position);
  const songTime = duration / 1000;
  const currentTime =
    playbackState === "SEEKING" ? seekPosition / 1000 : position / 1000;

  return (
    <View className="flex flex-row items-center justify-between w-full">
      <Text className="text-white text-xs mr-3 w-10 text-right">
        {Math.floor(currentTime / 60)}:
        {Math.floor(currentTime % 60)
          .toString()
          .padStart(2, "0")}
      </Text>

      <View
        className="flex-1"
        pointerEvents={
          any(equals(playbackState), ["LOADING", "IDLE", "ERROR", "FALLBACK"])
            ? "none"
            : "auto"
        }
      >
        <SkyhitzSlider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={setSeekPosition}
          onSlidingStart={startSeeking}
          onSlidingComplete={onSeekCompleted}
        />
      </View>

      <Text className="text-white text-xs ml-3 w-10">
        {Math.floor(songTime / 60)}:
        {Math.floor(songTime % 60)
          .toString()
          .padStart(2, "0")}
      </Text>
    </View>
  );
}
