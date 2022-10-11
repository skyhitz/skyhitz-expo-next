import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
  AVPlaybackStatus,
} from "expo-av";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Playback } from "expo-av/build/AV";
import { Entry, useSetLastPlayedEntryMutation } from "app/api/graphql";
import { PlaybackState } from "app/types";
import { isSome } from "app/utils";
import { any, append, equals, findIndex, init, last } from "ramda";
import { videoSrc } from "app/utils/entry";
import { useErrorReport } from "app/hooks/useErrorReport";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

export type PlaybackApi = {
  playback: null | Playback;
  setPlayback: (playback: Playback) => void;
  playEntry: (
    entry: Entry,
    playlist: Entry[],
    shouldPlayEntry?: boolean
  ) => Promise<void>;
  playPause: () => Promise<void>;
  startSeeking: () => Promise<void>;
  onSeekCompleted: (position: number) => Promise<void>;
  skipForward: () => Promise<void>;
  skipBackward: () => Promise<void>;
  toggleLoop: () => Promise<void>;
  entry: Entry | null;
  playbackUri: string;
  playbackState: PlaybackState;
  playingHistory: Entry[];
  playlist: Entry[];
  duration: number;
  position: number;
  looping: boolean;
  shuffle: boolean;
  toggleShuffle: () => void;
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
  onReadyForDisplay: () => void;
  onError: (error: string) => void;
  resetPlayer: () => void;
};

export const PlaybackContext = createContext<PlaybackApi>({
  playback: null,
  setPlayback: (_) => null,
  playEntry: async (_, __, ___) => {},
  playPause: async () => {},
  startSeeking: async () => {},
  onSeekCompleted: async (_) => {},
  skipForward: async () => {},
  skipBackward: async () => {},
  toggleLoop: async () => {},
  entry: null,
  playbackUri: "",
  playbackState: "IDLE",
  playingHistory: [],
  playlist: [],
  duration: 0,
  position: 0,
  looping: false,
  shuffle: false,
  toggleShuffle: () => {},
  onPlaybackStatusUpdate: (_) => {},
  onReadyForDisplay: () => {},
  onError: () => {},
  resetPlayer: () => {},
});

export function PlaybackProvider({ children }: { children: React.ReactNode }) {
  const user = useRecoilValue(userAtom);
  const [playbackUri, setPlaybackUri] = useState<string>("");
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [entry, setEntry] = useState<Entry | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("IDLE");
  const [playingHistory, setPlayingHistory] = useState<Entry[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [looping, setLooping] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Entry[]>([]);
  const [shouldPlay, setShouldPlay] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [setLastPlayedEntry] = useSetLastPlayedEntryMutation();
  const reportError = useErrorReport();
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();

  const resetPlayer = useCallback(() => {
    setPlayback(null);
    setPlaybackState("IDLE");
    setEntry(null);
    setPlaybackUri("");
    setPlayingHistory([]);
    setPlaylist([]);
    setDuration(0);
    setPosition(0);
  }, [
    setPlaybackState,
    reportError,
    setEntry,
    setPlaybackUri,
    setPlayingHistory,
    setPlaylist,
    setDuration,
    setPosition,
  ]);

  const loadBeat = useCallback(
    async (entry: Entry, fallback = false, shouldPlayEntry = shouldPlay) => {
      if (!isSome(entry.videoUrl)) return;
      const videoUrl = videoSrc(entry.videoUrl, fallback);
      if (playback !== null) {
        await playback.unloadAsync();
        const source = { uri: videoUrl };
        const initialStatus = {
          shouldPlay: shouldPlayEntry,
        };
        if (!fallback) {
          setDuration(0);
          setPosition(0);
          setEntry(entry);
          setPlayingHistory(append(entry, playingHistory));
        }
        setPlaybackUri(videoUrl);

        playback.loadAsync(source, initialStatus, true);
        if (user) {
          setLastPlayedEntry({ variables: { entryId: entry.id! } });
        }

        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        const id = setTimeout(() => {
          if (fallback) {
            setPlaybackState("ERROR");
            reportError(Error("Couldn't play that beat. Try Again!"));
            resetPlayer();
          } else {
            setPlaybackState("FALLBACK");
            loadBeat(entry, true);
          }
        }, 10000);
        setTimeoutId(id);
      }
    },
    [
      playback,
      setEntry,
      setPlaybackUri,
      setPlayingHistory,
      playingHistory,
      setPosition,
      setDuration,
      setLastPlayedEntry,
      resetPlayer,
      timeoutId,
      shouldPlay,
    ]
  );

  const playEntry = useCallback(
    async (newEntry: Entry, playlist: Entry[], shouldPlayEntry = true) => {
      setPlaylist(playlist);
      setShouldPlay(shouldPlayEntry);
      if (newEntry.id === entry?.id) {
        // if the new entry is the same as the current one, just set position to 0
        await playback?.setStatusAsync({
          positionMillis: 0,
          shouldPlay: shouldPlayEntry,
        });
        return;
      }
      setPlaybackState("LOADING");
      await loadBeat(newEntry, false, shouldPlayEntry);
    },
    [
      entry,
      playback,
      shouldPlay,
      loadBeat,
      setPlaylist,
      setPlaybackState,
      setShouldPlay,
    ]
  );

  const playPause = useCallback(async () => {
    if (playback === null) return;
    if (playbackState === "PLAYING") {
      setShouldPlay(false);
      setPlaybackState("PAUSED");
      await playback.pauseAsync();
    } else if (playbackState === "PAUSED") {
      setShouldPlay(true);
      setPlaybackState("PLAYING");
      await playback.playAsync();
    }
  }, [playback, setShouldPlay, playbackState, setPlaybackState]);

  const startSeeking = useCallback(async () => {
    setPlaybackState("SEEKING");
    await playback?.pauseAsync();
  }, [playback, setPlaybackState]);

  const onSeekCompleted = useCallback(
    async (value: number) => {
      setPosition(value * duration);
      setPlaybackState(shouldPlay ? "PLAYING" : "PAUSED");
      await playback?.setStatusAsync({
        positionMillis: value * duration,
        shouldPlay,
      });
    },
    [duration, playback, shouldPlay, setPlaybackState]
  );

  const skipForward = useCallback(async () => {
    setPlaybackState("LOADING");
    await playback?.pauseAsync();
    const currentIndex = findIndex((item) => item?.id === entry?.id, playlist);
    if (currentIndex < 0) return;
    let nextIndex: number;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    await loadBeat(playlist[nextIndex]!);
  }, [playback, entry, loadBeat, shuffle, playlist, setPlaybackState]);

  const skipBackward = useCallback(async () => {
    const previousEntry = last(init(playingHistory));
    if (previousEntry === undefined) {
      await playback?.setStatusAsync({
        positionMillis: 0,
        shouldPlay,
      });
      return;
    }
    setPlaybackState("LOADING");
    await playback?.pauseAsync();
    await loadBeat(previousEntry);
    setPlayingHistory(init(playingHistory));
  }, [
    playingHistory,
    playback,
    setPlayingHistory,
    loadBeat,
    setPlaybackState,
    shouldPlay,
  ]);

  const toggleLoop = useCallback(async () => {
    await playback?.setIsLoopingAsync(!looping);
    setLooping(!looping);
  }, [playback, looping, setLooping]);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) {
        return;
      }

      if (status.didJustFinish && playbackState === "PLAYING" && !looping) {
        skipForward();
      }

      if (
        !isNaN(status.durationMillis ?? NaN) &&
        any(equals(playbackState), ["PLAYING", "LOADING", "FALLBACK"])
      ) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis ?? 0);
      }
    },
    [skipForward, setPosition, setDuration, looping, playbackState]
  );

  const onReadyForDisplay = useCallback(async () => {
    if (playbackState === "LOADING" || playbackState === "FALLBACK") {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (shouldPlay) {
        setPlaybackState("PLAYING");
        await playback?.playAsync();
      } else {
        setPlaybackState("PAUSED");
      }
    }
  }, [playbackState, setPlaybackState, timeoutId, playback]);

  const onError = useCallback(
    (error: string) => {
      console.error(error);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (playbackState === "FALLBACK" || !entry) {
        setPlaybackState("ERROR");
        reportError(Error("Couldn't play that beat. Try Again!"));
        resetPlayer();
      } else {
        setPlaybackState("FALLBACK");
        loadBeat(entry, true);
      }
    },
    [playbackState, entry, resetPlayer, loadBeat, timeoutId]
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

  const value = useMemo(
    () => ({
      playback,
      setPlayback,
      playEntry,
      playPause,
      startSeeking,
      onSeekCompleted,
      skipForward,
      skipBackward,
      toggleLoop,
      entry,
      playbackUri,
      playbackState,
      playingHistory,
      playlist,
      duration,
      position,
      looping,
      shuffle,
      toggleShuffle: () => setShuffle(!shuffle),
      onPlaybackStatusUpdate,
      onReadyForDisplay,
      onError,
      resetPlayer,
    }),
    [
      playback,
      setPlayback,
      playEntry,
      playPause,
      startSeeking,
      onSeekCompleted,
      skipForward,
      skipBackward,
      toggleLoop,
      entry,
      playbackUri,
      playbackState,
      playingHistory,
      playlist,
      duration,
      position,
      looping,
      shuffle,
      setShuffle,
      onPlaybackStatusUpdate,
      onReadyForDisplay,
      onError,
      resetPlayer,
    ]
  );

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}
