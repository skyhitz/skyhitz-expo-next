import { Video } from "expo-av";
import { useContext } from "react";
import { Platform } from "react-native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentDurationAtom, currentPositionAtom } from "../state/playback";
import { PlaybackContext } from "../provider/playback";
import { currentEntryAtom } from "app/state/playback";
import { videoSrc } from "app/utils/entry";

// Audio.setAudioModeAsync({
//   playsInSilentModeIOS: true,
//   allowsRecordingIOS: false,
//   staysActiveInBackground: true,
//   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//   shouldDuckAndroid: false,
//   playThroughEarpieceAndroid: false,
// });

export function VideoPlayer() {
  console.log("Video component");
  const setDuration = useSetRecoilState(currentDurationAtom);
  const setPosition = useSetRecoilState(currentPositionAtom);
  const entry = useRecoilValue(currentEntryAtom);
  const { setPlayback } = useContext(PlaybackContext);

  return (
    <Video
      // posterSource={{ uri: playerStore.entry?.imageSrc }}
      // usePoster={desktop ? true : false}
      source={{
        uri: entry
          ? videoSrc(entry.videoUrl!)
          : "https://res.cloudinary.com/skyhitz/video/upload/v1554330926/app/-LbM3m6WKdVQAsY3zrAd/videos/-Lb_KsQ7hbr0nquOTZee.mov",
      }}
      // posterStyle={[styles.poster, { width: dynamicWidth }]}
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

        if (status.isPlaying && !status.isBuffering) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis ?? 0);
        }
      }}
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      style={
        [
          // { opacity: dynamicOpacity },
          // desktop
          //   ? {
          //       maxWidth: dynamicWidth,
          //       width: dynamicWidth,
          //       minWidth: dynamicWidth,
          //     }
          //   : { height: dynamicHeight, maxHeight: 360 },
          // desktop ? styles.videoPlayerDesktop : styles.videoPlayer,
        ]
      }
      // onError={(error) => playerStore.onError(error)}
      // onFullscreenUpdate={(update) => playerStore.onFullscreenUpdate(update)}
      onReadyForDisplay={(res: any) => {
        console.log("aaa");
        if (Platform.OS !== "web") return;
        const { videoHeight, videoWidth } = res.target;
        const aspectRatio = videoWidth / videoHeight;
        if (videoWidth === 0) {
          // setDynamicOpacity(1);
          return;
        }
        // setDynamicWidth(Math.ceil(aspectRatio * dynamicHeight));
        // // add delay or transition

        // setBlur(80);
        // setDynamicOpacity(1);
      }}
    />
  );
}
