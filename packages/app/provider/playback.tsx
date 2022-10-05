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
import { append, findIndex, init, last } from "ramda";
import { videoSrc } from "app/utils/entry";

export type PlaybackApi = {
  playback: null | Playback;
  setPlayback: (playback: Playback) => void;
  playEntry: (entry: Entry, playlist: Entry[]) => Promise<void>;
  playPause: () => Promise<void>;
  startSeeking: () => Promise<void>;
  onSeeking: (value: number) => void;
  onSeekCompleted: (position: number) => Promise<void>;
  skipForward: () => Promise<void>;
  skipBackward: () => Promise<void>;
  toggleLoop: () => Promise<void>;
  entry: Entry | null;
  playbackState: PlaybackState;
  playingHistory: Entry[];
  playlist: Entry[];
  duration: number;
  position: number;
  looping: boolean;
  isPlaying: boolean;
  shuffle: boolean;
  toggleShuffle: () => void;
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
  onReadyForDisplay: () => void;
};

export const PlaybackContext = createContext<PlaybackApi>({
  playback: null,
  setPlayback: (_) => null,
  playEntry: async (_, __) => {},
  playPause: async () => {},
  startSeeking: async () => {},
  onSeeking: () => {},
  onSeekCompleted: async (_) => {},
  skipForward: async () => {},
  skipBackward: async () => {},
  toggleLoop: async () => {},
  entry: null,
  playbackState: "IDLE",
  playingHistory: [],
  playlist: [],
  duration: 0,
  position: 0,
  looping: false,
  isPlaying: false,
  shuffle: false,
  toggleShuffle: () => {},
  onPlaybackStatusUpdate: (_) => {},
  onReadyForDisplay: () => {},
});

export function PlaybackProvider({ children }: { children: React.ReactNode }) {
  const [playback, setPlayback] = useState<Playback | null>(null);
  const [entry, setEntry] = useState<Entry | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("IDLE");
  const [playingHistory, setPlayingHistory] = useState<Entry[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [looping, setLooping] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Entry[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [setLastPlayedEntry] = useSetLastPlayedEntryMutation();

  const _loadAndPlay = useCallback(
    async (entry: Entry) => {
      if (!isSome(entry.videoUrl)) return;
      const videoUrl = videoSrc(entry.videoUrl);
      if (playback !== null) {
        await playback.unloadAsync();
        const source = { uri: videoUrl };
        const initialStatus = {
          shouldPlay: true,
        };
        setDuration(0);
        setPosition(0);
        setEntry(entry);
        setPlayingHistory(append(entry, playingHistory));
        await playback.loadAsync(source, initialStatus, true);
        setIsPlaying(true);
        await playback.playAsync();
        setLastPlayedEntry({ variables: { entryId: entry.id! } });
      }
    },
    [
      playback,
      setIsPlaying,
      setEntry,
      setPlayingHistory,
      playingHistory,
      setPosition,
      setDuration,
      setLastPlayedEntry,
    ]
  );

  const playEntry = useCallback(
    async (newEntry: Entry, playlist: Entry[]) => {
      setPlaylist(playlist);
      if (newEntry.id === entry?.id) {
        // if the new entry is the same as the current one, just set position to 0
        await playback?.setStatusAsync({
          positionMillis: 0,
          shouldPlay: isPlaying,
        });
        return;
      }
      setPlaybackState("LOADING");
      await _loadAndPlay(newEntry);
    },
    [entry, playback, isPlaying, _loadAndPlay, setPlaylist, setPlaybackState]
  );

  const playPause = useCallback(async () => {
    if (playback === null) return;
    if (isPlaying) {
      setIsPlaying(false);
      setPlaybackState("PAUSED");
      await playback.pauseAsync();
    } else {
      setIsPlaying(true);
      setPlaybackState("PLAYING");
      await playback.playAsync();
    }
  }, [playback, isPlaying, setIsPlaying, setPlaybackState]);

  const startSeeking = useCallback(async () => {
    setPlaybackState("SEEKING");
    await playback?.pauseAsync();
  }, [playback, setPlaybackState]);

  const onSeeking = useCallback(
    (value: number) => {
      if (playbackState === "SEEKING") {
        setPosition(value * duration);
      }
    },
    [playbackState, setPosition, duration]
  );

  const onSeekCompleted = useCallback(
    async (value: number) => {
      setPlaybackState(isPlaying ? "PLAYING" : "PAUSED");
      await playback?.setStatusAsync({
        positionMillis: value * duration,
        shouldPlay: isPlaying,
      });
    },
    [duration, playback, isPlaying, setPlaybackState]
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
    await _loadAndPlay(playlist[nextIndex]!);
  }, [playback, entry, _loadAndPlay, shuffle, playlist, setPlaybackState]);

  const skipBackward = useCallback(async () => {
    const previousEntry = last(init(playingHistory));
    if (previousEntry === undefined) {
      await playback?.setStatusAsync({
        positionMillis: 0,
        shouldPlay: isPlaying,
      });
      return;
    }
    setPlaybackState("LOADING");
    await playback?.pauseAsync();
    await _loadAndPlay(previousEntry);
    setPlayingHistory(init(playingHistory));
  }, [
    playingHistory,
    playback,
    setPlayingHistory,
    _loadAndPlay,
    setPlaybackState,
    isPlaying,
  ]);

  const toggleLoop = useCallback(async () => {
    await playback?.setIsLoopingAsync(!looping);
    setLooping(!looping);
  }, [playback, looping, setLooping]);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) {
        if (status.error) {
          setPlaybackState("ERROR");
        }
        return;
      }

      if (status.didJustFinish && playbackState === "PLAYING" && !looping) {
        skipForward();
      }

      if (status.isPlaying && !status.isBuffering) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis ?? 0);
      }
    },
    [
      skipForward,
      setPosition,
      setDuration,
      looping,
      playbackState,
      setPlaybackState,
    ]
  );

  const onReadyForDisplay = useCallback(() => {
    if (playbackState === "LOADING") {
      setPlaybackState("PLAYING");
    }
  }, [playbackState, setPlaybackState]);

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
      onSeeking,
      onSeekCompleted,
      skipForward,
      skipBackward,
      toggleLoop,
      entry,
      playbackState,
      playingHistory,
      playlist,
      duration,
      position,
      looping,
      isPlaying,
      shuffle,
      toggleShuffle: () => setShuffle(!shuffle),
      onPlaybackStatusUpdate,
      onReadyForDisplay,
    }),
    [
      playback,
      setPlayback,
      playEntry,
      playPause,
      startSeeking,
      onSeeking,
      onSeekCompleted,
      skipForward,
      skipBackward,
      toggleLoop,
      entry,
      playbackState,
      playingHistory,
      playlist,
      duration,
      position,
      looping,
      isPlaying,
      shuffle,
      setShuffle,
      onPlaybackStatusUpdate,
      onReadyForDisplay,
    ]
  );

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}
