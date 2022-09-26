import { ResizeMode, Video } from "expo-av";
import { useContext, useEffect } from "react";
import { ImageBackground, Platform, ViewStyle } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentDurationAtom,
  currentEntryAtom,
  currentPositionAtom,
  loopAtom,
  playbackStateAtom,
} from "app/state/playback";
import { PlaybackContext } from "../provider/playback";
import { imageSrc, videoSrc } from "app/utils/entry";
import { usePlayback } from "app/hooks/usePlayback";
import { userAtom } from "app/state/user";

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
  const { playback, setPlayback } = useContext(PlaybackContext);
  const user = useRecoilValue(userAtom);
  const { skipForward, playEntry } = usePlayback();

  const getVideoUri = () => {
    // we need to provide correct uri only for web
    // on native we can change uri using loadAsync
    if (Platform.OS === "web" && entry) {
      return videoSrc(entry.videoUrl!);
    }
    return "";
  };

  useEffect(() => {
    // play the last played entry
    if (playback && playbackState === "IDLE" && user?.lastPlayedEntry) {
      playEntry(user.lastPlayedEntry, [user.lastPlayedEntry]);
    }
  }, [playback, user, playEntry, playbackState]);

  return (
    <ImageBackground
      source={{ uri: entry?.imageUrl ? imageSrc(entry.imageUrl) : undefined }}
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
          if (ref && !playback) {
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
          height,
          width,
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
