import { ResizeMode, Video } from "expo-av";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Platform, ViewStyle } from "react-native";
import { useRecoilValue } from "recoil";
import { usePlayback } from "app/hooks/usePlayback";
import { userAtom } from "app/state/user";
import { min } from "ramda";
import { Image, View } from "dripsy";
import { tw } from "app/design-system/tailwind";
import { imageUrlMedium, imageUrlSmall } from "app/utils/entry";

type Props = {
  maxHeight?: number;
  fixedSize?: number;
  style?: ViewStyle;
};

const windowWidth = Dimensions.get("window").width;

export function VideoPlayer({
  fixedSize,
  maxHeight = windowWidth,
  style,
}: Props) {
  const user = useRecoilValue(userAtom);
  const [aspectRatio, setAspectRatio] = useState<number>(0);
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

  useEffect(() => {
    if (playbackState === "LOADING" || playbackState === "FALLBACK") {
      setAspectRatio(0);
    }
  }, [playbackState]);

  let posterSize = 0;
  let playerWidth = fixedSize ?? min(maxHeight * aspectRatio, windowWidth);
  let playerHeight = fixedSize ?? min(playerWidth / aspectRatio, maxHeight);

  if (aspectRatio === 0) {
    posterSize = fixedSize ?? min(windowWidth, maxHeight);
    // we have to set it to 1 instead of 0 so it will load properly on android
    playerWidth = 1;
    playerHeight = 1;
  }

  const posterUri = useMemo(() => {
    if (entry?.imageUrl) {
      if (posterSize <= 80) {
        return imageUrlSmall(entry.imageUrl);
      } else {
        return imageUrlMedium(entry.imageUrl);
      }
    }
    return undefined;
  }, [posterSize, entry]);

  return (
    <View style={[tw.style("justify-center items-center"), style]}>
      <Image
        source={{
          uri: posterUri,
        }}
        style={[
          {
            width: posterSize,
            height: posterSize,
          },
        ]}
      />
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
          height: playerHeight,
          width: playerWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
        onReadyForDisplay={(event: any) => {
          let videoAspectRatio = 0;
          if (event.naturalSize) {
            const { width, height } = event.naturalSize;
            if (width && height) {
              videoAspectRatio = width / height;
            }
          } else if (event?.target) {
            const { videoHeight, videoWidth } = event.target;
            if (videoHeight && videoWidth) {
              videoAspectRatio = videoWidth / videoHeight;
            }
          }
          setAspectRatio(videoAspectRatio);

          onReadyForDisplay();
        }}
        onError={onError}
      />
    </View>
  );
}
