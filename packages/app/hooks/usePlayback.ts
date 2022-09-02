import { Entry } from "app/api/graphql";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentDurationAtom,
  currentEntryAtom,
  currentPlaylistAtom,
  currentPositionAtom,
  loopAtom,
  playbackStateAtom,
  playingHistoryAtom,
  shuffleAtom,
} from "app/state/playback";
import { useCallback } from "react";
import { isSome } from "app/utils";
import { useContext } from "react";
import { PlaybackContext } from "../provider/playback";
import { videoSrc } from "app/utils/entry";
import { isPlayingAtom } from "../state/playback";
import { append, findIndex, init, last } from "ramda";

type PlaybackResult = {
  playEntry: (_entry: Entry, _playlist: Entry[]) => void;
  playPause: () => void;
  startSeeking: () => void;
  onSeekCompleted: (_position: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  toggleLoop: () => void;
};

export function usePlayback(): PlaybackResult {
  const [entry, setEntry] = useRecoilState(currentEntryAtom);
  const setPlaybackState = useSetRecoilState(playbackStateAtom);
  const [playingHistory, setPlayingHistory] =
    useRecoilState(playingHistoryAtom);
  const setDuration = useSetRecoilState(currentDurationAtom);
  const setPosition = useSetRecoilState(currentPositionAtom);
  const [looping, setLooping] = useRecoilState(loopAtom);
  const [playlist, setPlaylist] = useRecoilState(currentPlaylistAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const shuffle = useRecoilValue(shuffleAtom);
  const { playback } = useContext(PlaybackContext);

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
        await playback.loadAsync(source, initialStatus, true);
        console.log("loaded");
        setEntry(entry);
        setPlayingHistory(append(entry, playingHistory));
        setIsPlaying(true);
        setPlaybackState("PLAYING");
        await playback.playAsync();
      }
    },
    [
      playback,
      setPlaybackState,
      setIsPlaying,
      setEntry,
      setPlayingHistory,
      playingHistory,
    ]
  );

  const playEntry = useCallback(
    async (entry: Entry, playlist: Entry[]) => {
      await _loadAndPlay(entry);
      setPlaylist(playlist);
    },
    [_loadAndPlay, setPlaylist]
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

  const onSeekCompleted = useCallback(
    async (position: number) => {
      setPlaybackState(isPlaying ? "PLAYING" : "PAUSED");
      await playback?.setStatusAsync({
        positionMillis: position,
        shouldPlay: isPlaying,
      });
    },
    [playback, isPlaying, setPlaybackState]
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
    setDuration(0);
    setPosition(0);
    await _loadAndPlay(playlist[nextIndex]!);
  }, [
    playback,
    entry,
    _loadAndPlay,
    shuffle,
    playlist,
    setPlaybackState,
    setPosition,
    setDuration,
  ]);

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
    setDuration(0);
    setPosition(0);
    await _loadAndPlay(previousEntry);
    setPlayingHistory(init(playingHistory));
  }, [
    playingHistory,
    playback,
    setPlayingHistory,
    _loadAndPlay,
    setPlaybackState,
    isPlaying,
    setPosition,
    setDuration,
  ]);

  const toggleLoop = useCallback(async () => {
    await playback?.setIsLoopingAsync(!looping);
    setLooping(!looping);
  }, [playback, looping, setLooping]);

  return {
    playEntry,
    playPause,
    startSeeking,
    onSeekCompleted,
    skipForward,
    skipBackward,
    toggleLoop,
  };
}
