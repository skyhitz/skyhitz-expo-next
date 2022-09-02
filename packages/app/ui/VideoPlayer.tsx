import { Video, ResizeMode } from "expo-av";
import { useContext } from "react";
import { ImageBackground, Platform } from "react-native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentDurationAtom, currentPositionAtom } from "../state/playback";
import { PlaybackContext } from "../provider/playback";
import { currentEntryAtom } from "app/state/playback";
import { videoSrc, imageSrc } from "app/utils/entry";

// Audio.setAudioModeAsync({
//   playsInSilentModeIOS: true,
//   allowsRecordingIOS: false,
//   staysActiveInBackground: true,
//   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//   shouldDuckAndroid: false,
//   playThroughEarpieceAndroid: false,
// });

type Props = {
  width: number;
  height: number;
};

export function VideoPlayer({ width, height }: Props) {
  console.log("Video component");
  const setDuration = useSetRecoilState(currentDurationAtom);
  const setPosition = useSetRecoilState(currentPositionAtom);
  const entry = useRecoilValue(currentEntryAtom);
  const { setPlayback } = useContext(PlaybackContext);

  console.log(imageSrc(entry?.imageUrl ?? ""));

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
    </ImageBackground>
  );
}
