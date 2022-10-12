import { ResizeMode, Video } from "expo-av";
import { useEffect } from "react";
import { ImageBackground, Platform, ViewStyle } from "react-native";
import { useRecoilValue } from "recoil";
import { imageSrc } from "app/utils/entry";
import { usePlayback } from "app/hooks/usePlayback";
import { userAtom } from "app/state/user";

type Props = {
  width: number;
  height: number;
  style?: ViewStyle;
};

export function VideoPlayer({ width, height, style }: Props) {
  const user = useRecoilValue(userAtom);
  const {
    onReadyForDisplay,
    playEntry,
    entry,
    playbackUri,
    playback,
    setPlayback,
    playbackState,
    onPlaybackStatusUpdate,
    onError,
    resetPlayer,
  } = usePlayback();

  const getVideoUri = () => {
    // we need to provide correct uri only for web
    // on native we can change uri using loadAsync
    if (Platform.OS === "web" && entry) {
      return { uri: playbackUri };
    }
    return undefined;
  };

  useEffect(() => {
    return () => {
      // resets player when component is unmounted
      resetPlayer();
    };
  }, []);

  useEffect(() => {
    // play the last played entry
    if (playback && playbackState === "IDLE" && user?.lastPlayedEntry) {
      playEntry(user.lastPlayedEntry, [user.lastPlayedEntry], false);
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
        source={getVideoUri()}
        ref={(ref) => {
          if (ref && !playback) {
            setPlayback(ref);
          }
        }}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        resizeMode={ResizeMode.CONTAIN}
        style={{
          height,
          width,
          alignItems: "center",
          justifyContent: "center",
        }}
        onReadyForDisplay={onReadyForDisplay}
        onError={onError}
      />
    </ImageBackground>
  );
}
