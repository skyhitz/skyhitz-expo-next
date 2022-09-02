import { Video, ResizeMode } from "expo-av";
import { useContext } from "react";
import { ImageBackground } from "react-native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  currentDurationAtom,
  currentPositionAtom,
  loopAtom,
  playbackStateAtom,
} from "app/state/playback";
import { PlaybackContext } from "../provider/playback";
import { currentEntryAtom } from "app/state/playback";
import { videoSrc, imageSrc } from "app/utils/entry";
import { usePlayback } from "app/hooks/usePlayback";

type Props = {
  width: number;
  height: number;
};

export function VideoPlayer({ width, height }: Props) {
  const setDuration = useSetRecoilState(currentDurationAtom);
  const setPosition = useSetRecoilState(currentPositionAtom);
  const playbackState = useRecoilValue(playbackStateAtom);
  const isLooping = useRecoilValue(loopAtom);
  const entry = useRecoilValue(currentEntryAtom);
  const { setPlayback } = useContext(PlaybackContext);
  const { skipForward } = usePlayback();

  return (
    <ImageBackground
      source={{ uri: entry?.imageUrl ? imageSrc(entry.imageUrl) : "" }}
      style={{ width, height, alignItems: "center", justifyContent: "center" }}
    >
      <Video
        posterSource={{ uri: entry?.imageUrl ? imageSrc(entry.imageUrl) : "" }}
        usePoster={true}
        source={{
          uri: entry ? videoSrc(entry.videoUrl!) : "",
        }}
        posterStyle={{ width, height }}
        ref={(ref) => {
          console.log("set video ref");
          if (ref !== null) {
            setPlayback(ref);
          }
        }}
        onPlaybackStatusUpdate={(status) => {
          console.log("status", status);
          if (!status.isLoaded) {
            if (status.error) {
              console.log(status.error);
            }
            return;
          }

          // if (this.networkState === "none" && status.isBuffering) {
          //   console.log(
          //     "You are probably offline. Please make sure you are connected to the Internet to watch this video"
          //   );
          //   return;
          // }

          if (
            status.didJustFinish &&
            playbackState === "PLAYING" &&
            !isLooping
          ) {
            skipForward();
          }

          if (status.isPlaying && !status.isBuffering) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis ?? 0);
          }
        }}
        resizeMode={ResizeMode.CONTAIN}
        style={{
          height: height,
          width: width,
          alignItems: "center",
          justifyContent: "center",
        }}
        onError={(error) => {
          // TODO
          console.log(error);
        }}
        // onFullscreenUpdate={(update) => playerStore.onFullscreenUpdate(update)}
      />
    </ImageBackground>
  );
}
