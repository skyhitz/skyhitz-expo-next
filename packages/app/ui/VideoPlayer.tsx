import { Video, ResizeMode } from "expo-av";
import { useContext } from "react";
import { ImageBackground, Platform, ViewStyle } from "react-native";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
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
  style?: ViewStyle;
};

export function VideoPlayer({ width, height, style }: Props) {
  const setDuration = useSetRecoilState(currentDurationAtom);
  const setPosition = useSetRecoilState(currentPositionAtom);
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);
  const isLooping = useRecoilValue(loopAtom);
  const entry = useRecoilValue(currentEntryAtom);
  const { setPlayback } = useContext(PlaybackContext);
  const { skipForward } = usePlayback();

  const getVideoUri = () => {
    // we need to provide correct uri only for web
    // on native we can change uri using loadAsync
    if (Platform.OS === "web" && entry) {
      return videoSrc(entry.videoUrl!);
    }
    return "";
  };

  return (
    <ImageBackground
      source={{ uri: entry?.imageUrl ? imageSrc(entry.imageUrl) : "" }}
      style={[
        { width, height, alignItems: "center", justifyContent: "center" },
        style,
      ]}
    >
      <Video
        source={{
          uri: getVideoUri(),
        }}
        ref={(ref) => {
          if (ref !== null) {
            setPlayback(ref);
          }
        }}
        onPlaybackStatusUpdate={(status) => {
          if (!status.isLoaded) {
            return;
          }

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
        onError={(_) => {
          setPlaybackState("ERROR");
        }}
        onReadyForDisplay={() => {
          if (playbackState === "LOADING") {
            setPlaybackState("PLAYING");
          }
        }}
      />
    </ImageBackground>
  );
}
