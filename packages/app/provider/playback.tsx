import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { createContext, useEffect, useMemo, useState } from "react";
import { Playback } from "expo-av/build/AV";

export const PlaybackContext = createContext<{
  playback: null | Playback;
  setPlayback: (_playback: Playback) => void;
}>({ playback: null, setPlayback: (_) => null });

export function PlaybackProvider({ children }: { children: React.ReactNode }) {
  const [playback, setPlayback] = useState<Playback | null>(null);
  const value = useMemo(
    () => ({
      playback,
      setPlayback,
    }),
    [playback, setPlayback]
  );

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}
