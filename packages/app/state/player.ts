import { Entry } from '../models';
import { entriesBackend } from '../api/entries';
import { PlaybackState, SeekState, ControlsState } from '../types/index';
import { Platform } from 'react-native';
import { atom, useRecoilState } from 'recoil';

const entryAtom = atom<Entry | null>({
  key: 'playerEntry',
  default: null,
});
const showMiniPlayerAtom = atom<boolean>({
  key: 'showMiniPlayer',
  default: false,
});
const showAtom = atom<boolean>({
  key: 'show',
  default: false,
});
const tabBarBottomAtom = atom<number>({
  key: 'tabBarBottom',
  default: 0,
});
const loopAtom = atom<boolean>({
  key: 'loop',
  default: false,
});
const shuffleAtom = atom<boolean>({
  key: 'shuffle',
  default: false,
});
const playbackStateAtom = atom<PlaybackState>({
  key: 'playbackState',
  default: 'LOADING',
});
const seekStateAtom = atom<SeekState>({
  key: 'seekState',
  default: 'NOT_SEEKING',
});
const controlsStateAtom = atom<ControlsState>({
  key: 'controlsState',
  default: 'SHOWN',
});
const shouldPlayAtom = atom<boolean>({
  key: 'shouldPlay',
  default: false,
});
const fullscreenAtom = atom<boolean>({
  key: 'fullscreen',
  default: false,
});
const positionMillisAtom = atom<number>({
  key: 'positionMillis',
  default: 0,
});

const playbackInstancePositionAtom = atom<number>({
  key: 'playbackInstancePosition',
  default: 0,
});
const playbackInstanceDurationAtom = atom<number>({
  key: 'playbackInstanceDuration',
  default: 0,
});
const lastPlaybackStateUpdateAtom = atom<number>({
  key: 'lastPlaybackStateUpdate',
  default: Date.now(),
});
const errorAtom = atom<any>({ key: 'error' });
const networkStateAtom = atom<any>({ key: 'networkState' });
const shouldPlayAtEndOfSeekAtom = atom<boolean>({
  key: 'shouldPlayAtEndOfSeek',
  default: false,
});
const sliderWidthAtom = atom<number>({ key: 'sliderWidth', default: 0 });
const cueListAtom = atom<any[]>({ key: 'cueList', default: [] });
const currentIndexAtom = atom<number>({ key: 'currentIndex', default: 0 });
const playlistModeAtom = atom<boolean>({ key: 'playlistMode', default: false });
const playbackInstanceAtom = atom<any>({ key: 'playbackInstance' });
const seekPositionAtom = atom<number>({ key: 'seekPosition', default: 0 });
const slidingAtom = atom<boolean>({ key: 'sliding', default: false });
const streamUrlAtom = atom<string>({ key: 'streamUrl', default: '' });
const videoAtom = atom<any>({ key: 'video' });

export const PlayerStore = () => {
  const [entry, setEntry] = useRecoilState(entryAtom);
  const [showMiniPlayer, setShowMiniPlayer] = useRecoilState(
    showMiniPlayerAtom
  );
  const [show, setShow] = useRecoilState(showAtom);
  const [tabBarBottom, setTabBarBottom] = useRecoilState(tabBarBottomAtom);
  const [loop, setLoop] = useRecoilState(loopAtom);
  const [shuffle, setShuffle] = useRecoilState(shuffleAtom);
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);
  const [seekState, setSeekState] = useRecoilState(seekStateAtom);
  const [controlsState, setControlsState] = useRecoilState(controlsStateAtom);
  const [shouldPlay, setShouldPlay] = useRecoilState(shouldPlayAtom);
  const [fullscreen, setFullscreen] = useRecoilState(fullscreenAtom);
  const [positionMillis, setPositionMillis] = useRecoilState(
    positionMillisAtom
  );
  const [
    playbackInstancePosition,
    setPlaybackInstancePosition,
  ] = useRecoilState(playbackInstancePositionAtom);
  const [
    playbackInstanceDuration,
    setPlaybackInstanceDuration,
  ] = useRecoilState(playbackInstanceDurationAtom);
  const [lastPlaybackState, setLastPlaybackState] = useRecoilState(
    lastPlaybackStateUpdateAtom
  );
  const [error, setError] = useRecoilState(errorAtom);
  const [networkState, setNetworkState] = useRecoilState(networkStateAtom);
  const [shouldPlayEndOfSeek, setShouldPlayEndofSeek] = useRecoilState(
    shouldPlayAtEndOfSeekAtom
  );
  const [sliderWidth, setSliderWidth] = useRecoilState(sliderWidthAtom);
  const [cueList, setCueList] = useRecoilState(cueListAtom);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexAtom);
  const [playlistMode, setPlaylistMode] = useRecoilState(playlistModeAtom);
  const [playbackInstance, setPlaybackInstance] = useRecoilState(
    playbackInstanceAtom
  );
  const [seekPosition, setSeekPosition] = useRecoilState(seekPositionAtom);
  const [sliding, setSliding] = useRecoilState(slidingAtom);
  const [streamUrl, setStreamUrl] = useRecoilState(streamUrlAtom);
  const [video, setVideo] = useRecoilState(videoAtom);

  const mountVideo = (component) => {
    if (!component) return;

    setVideo(component);
    loadNewPlaybackInstance(false);
  };

  const loadNewPlaybackInstance = async (
    playing,
    streamUrlPayload = streamUrl
  ) => {
    if (playbackInstance != null) {
      try {
        await playbackInstance.unloadAsync();
      } catch (e) {}

      setPlaybackInstance(null);
    }

    if (!streamUrlPayload) return;
    if (!video) return;

    await video.loadAsync(
      { uri: streamUrlPayload },
      {
        shouldPlay: playing,
        positionMillis: 0,
        progressUpdateIntervalMillis: 50,
      }
    );
    setPlaybackInstance(video);
    if (playing && !isPlaying) {
      playAsync();
    }
  };

  const refreshEntry = async () => {
    if (entry && entry.id) {
      let res = await entriesBackend.getById(entry.id);
      setEntry(res);
    }
  };

  const handleSetPlaylistMode = (entries: Entry[]) => {
    setPlaylistMode(true);
    setCueList(entries);
  };

  const setPlaylistModeFromArray = (entries: Entry[]) => {
    setPlaylistMode(true);
    setCueList(entries);
  };

  const disablePlaylistMode = () => {
    setPlaylistMode(false);
    setCueList([]);
  };

  const handleSetPlaybackInstance = (playbackInstance: any) => {
    if (playbackInstance !== null) {
      setPlaybackInstance(playbackInstance);
    }
  };

  const playbackInstanceExists = () => {
    return !!playbackInstance;
  };

  const playAsync = async () => {
    if (playbackInstanceExists()) {
      setPlaybackState('PLAYING');
      return await playbackInstance.setStatusAsync({ shouldPlay: true });
    }
  };

  const pauseAsync = async () => {
    if (playbackInstanceExists()) {
      setPlaybackState('PAUSED');
      await playbackInstance.setStatusAsync({ shouldPlay: false });
      setPlaybackState('PAUSED');
      return true;
    }
  };

  const stopAsync = async () => {
    if (playbackInstanceExists()) {
      setPlaybackState('PAUSED');
      return await playbackInstance.setStatusAsync({
        shouldPlay: false,
        positionMillis: 0,
      });
    }
  };

  const toggleLoop = async () => {
    if (playbackInstanceExists()) {
      setLoop(!loop);
      return await playbackInstance.setIsLoopingAsync(loop);
    }
  };

  const presentFullscreenPlayer = async () => {
    if (playbackInstance) {
      await playbackInstance.presentFullscreenPlayer();
      return;
    }
  };

  const dismissFullscreenPlayer = async () => {
    if (playbackInstance) {
      await playbackInstance.dismissFullscreenPlayer();
      return;
    }
  };

  const onFullscreenUpdate = (status: any) => {
    if (status.fullscreenUpdate === 1) {
      setFullscreen(true);
    }

    if (status.fullscreenUpdate === 3) {
      setFullscreen(false);
      // resume video manually,
      // TODO: add bug to expo client on github.
      if (shouldPlay) {
        playAsync();
      }
    }
  };
  const isPlaying = () => {
    if (playbackState === 'PLAYING') {
      return true;
    }
    return false;
  };

  const togglePlay = async () => {
    if (isPlaying()) {
      return pauseAsync();
    }
    return playAsync();
  };

  const replay = async () => {
    await stopAsync();
    setPlaybackState('PLAYING');
    return playAsync();
  };

  const loadAndPlay = async (entry: Entry, play = true) => {
    if (!entry) {
      return null;
    }
    const currentIndex = cueList.findIndex(
      (item) => !!item && item.id === entry.id
    );
    if (currentIndex !== -1) {
      setCurrentIndex(currentIndex);
    }

    setPlaybackState('LOADING');
    setEntry(entry);
    setShow(true);
    let { videoUrl, isIpfs, videoSrc } = entry;

    if (!videoUrl) {
      return;
    }

    setStreamUrl(isIpfs && videoSrc ? videoSrc : videoUrl);
    await loadNewPlaybackInstance(play, streamUrl);
    setPlaybackState(play ? 'PLAYING' : 'PAUSED');
    return;
  };

  const playNext = async () => {
    setPlaybackState('LOADING');
    pauseAsync();

    if (isCurrentIndexAtTheEndOfCue()) {
      // Override the value if playlistMode was set to true, it will loop through the
      // list instead of playing a related video.
      if (playlistMode) {
        let entry = cueList[0];
        setCurrentIndex(0);
        if (!entry) return;
        return loadAndPlay(entry);
      }
    }

    setCurrentIndex((oldVal) => oldVal++);
    let nextEntry = cueList[currentIndex];
    if (!nextEntry) return;
    loadAndPlay(nextEntry);
  };

  const loadPlayAndPushToCueList = async (entry: Entry) => {
    loadAndPlay(entry);
    setCueList((oldVal) => {
      const arr = oldVal;
      arr.push(entry);
      return arr;
    });
    setCurrentIndex(cueList.length - 1);
  };

  const loadPlayAndUnshiftToCueList = async (entry: Entry) => {
    loadAndPlay(entry);
    setCueList((oldVal) => {
      const arr = oldVal;
      arr.unshift(entry);
      return arr;
    });
    setCurrentIndex(0);
  };

  const onError = (e: string) => {
    console.info(e);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const unmountMiniPlayer = () => {
    setShowMiniPlayer(false);
  };

  const mountMiniPlayer = () => {
    setShowMiniPlayer(true);
  };

  const hidePlayer = () => {
    setShow(false);
  };

  const isCurrentIndexAtTheStartOfCue = () => {
    return currentIndex === 0;
  };

  const isCurrentIndexAtTheEndOfCue = () => {
    return currentIndex === cueList.length - 1;
  };

  const updateTabBarBottomPosition = (bottom: number) => {
    setTabBarBottom(bottom);
  };

  const playPrev = async () => {
    setPlaybackState('LOADING');
    pauseAsync();
    if (isCurrentIndexAtTheStartOfCue()) {
      // Override the value if playlistMode was set to true, it will loop through the
      // list instead of playing a related video.
      if (playlistMode) {
        let lastIndexInCueList = cueList.length - 1;
        let entry = cueList[lastIndexInCueList];
        setCurrentIndex(lastIndexInCueList);
        if (!entry) return;
        return loadAndPlay(entry);
      }

      return;
    }

    setCurrentIndex((oldVal) => oldVal--);
    let prevEntry = cueList[currentIndex];
    if (!prevEntry) return;
    loadAndPlay(prevEntry);
  };

  const padWithZero = (value: number) => {
    const result = value.toString();
    if (value < 10) {
      return '0' + result;
    }
    return result;
  };

  const getMMSSFromMillis = (millis: number) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  };

  const durationDisplay = () => {
    return getMMSSFromMillis(playbackInstanceDuration);
  };

  const positionDisplay = () => {
    return getMMSSFromMillis(playbackInstancePosition);
  };

  const onSeekSliderValueChange = () => {
    if (
      playbackInstance !== null &&
      seekState !== 'SEEKING' &&
      seekState !== 'SEEKED'
    ) {
      setShouldPlayEndofSeek(false);
      setSeekState('SEEKING');

      if (isPlaying()) {
        pauseAsync();
        setShouldPlayEndofSeek(true);
      }
    }
  };

  const onSeekSliderSlidingComplete = async (value: number) => {
    if (seekState !== 'SEEKED') {
      setSeekState('SEEKED');
      let status;
      try {
        status = await playbackInstance.setStatusAsync({
          positionMillis: value * playbackInstanceDuration,
          shouldPlay: shouldPlayEndOfSeek,
        });

        setSeekState('NOT_SEEKING');
        setPlaybackState(getPlaybackStateFromStatus(status));
      } catch (message) {}
    }
  };

  const onSeekBarTap = (evt: any) => {
    if (sliding) return;
    if (
      !(
        playbackState === 'LOADING' ||
        playbackState === 'ENDED' ||
        playbackState === 'ERROR' ||
        controlsState !== 'SHOWN'
      )
    ) {
      let xValue;
      if (Platform.OS === 'web') {
        xValue = evt.nativeEvent.clientX - evt.target.getBoundingClientRect().x;
      } else {
        xValue = evt.nativeEvent.locationX;
      }
      const value = xValue / sliderWidth;
      onSeekSliderSlidingComplete(value);
    }
  };

  const onSliderLayout = (evt: any) => {
    setSliderWidth(evt.nativeEvent.layout.width);
  };

  const generateRandomNumber = (max: number): number => {
    var num = Math.floor(Math.random() * (max + 1));
    return num === currentIndex ? generateRandomNumber(max) : num;
  };

  const handleEndedPlaybackState = async () => {
    if (playbackState === 'ENDED') {
      let pause = await pauseAsync();
      if (pause) {
        if (shuffle) {
          setCurrentIndex(generateRandomNumber(cueList.length));
        }
        return playNext();
      }
    }
  };

  const disablePlaybackStatusUpdate = () => {
    if (
      playbackState === 'ENDED' ||
      playbackState === 'LOADING' ||
      seekState === 'SEEKING' ||
      seekState === 'SEEKED'
    ) {
      return true;
    }
    return false;
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) {
      if (status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        setError(errorMsg);
        return setPlaybackState('ERROR');
      }
      return;
    }

    if (networkState === 'none' && status.isBuffering) {
      setPlaybackState('ERROR');
      setError(
        'You are probably offline. Please make sure you are connected to the Internet to watch this video'
      );
      return;
    }

    if (status.isPlaying && !status.isBuffering) {
      setPlaybackInstancePosition(status.positionMillis);
      setPlaybackInstanceDuration(status.durationMillis);
      setSeekPosition(playbackInstancePosition / playbackInstanceDuration);
    }

    setShouldPlay(status.shouldPlay);

    handleSetPlaybackState(getPlaybackStateFromStatus(status));
  };

  const handleSetPlaybackState = async (playbackState: PlaybackState) => {
    if (playbackState !== playbackState) {
      setPlaybackState(playbackState);
      handleEndedPlaybackState();
      setLastPlaybackState(Date.now());
    }
  };

  const getPlaybackStateFromStatus = (status: any) => {
    if (status.didJustFinish && !status.isLooping) {
      return 'ENDED';
    }

    if (status.isPlaying) {
      return 'PLAYING';
    }

    if (status.isBuffering) {
      return 'BUFFERING';
    }

    return 'PAUSED';
  };

  return {
    entry,
    setShow,
    getPlaybackStateFromStatus,
    handleSetPlaybackState,
    onPlaybackStatusUpdate,
    disablePlaybackStatusUpdate,
    handleEndedPlaybackState,
    onSliderLayout,
    onSeekBarTap,
    onSeekSliderSlidingComplete,
    onSeekSliderValueChange,
    positionDisplay,
    durationDisplay,
    playPrev,
    updateTabBarBottomPosition,
    hidePlayer,
    toggleShuffle,
    playNext,
    shuffle,
    fullscreen,
    presentFullscreenPlayer,
    dismissFullscreenPlayer,
    playbackState,
    error,
    seekState,
    togglePlay,
    show,
    isPlaying,
    pauseAsync,
    playAsync,
    toggleLoop,
    loop,
    replay,
    seekPosition,
    setSliding,
    streamUrl,
    mountVideo,
    onFullscreenUpdate,
    onError,
    handleSetPlaylistMode,
    loadAndPlay,
    setPlaylistModeFromArray,
    showMiniPlayer,
    tabBarBottom,
    setControlsState,
    positionMillis,
    setPositionMillis,
    lastPlaybackState,
    setLastPlaybackState,
    setNetworkState,
    refreshEntry,
    disablePlaylistMode,
    loadPlayAndUnshiftToCueList,
    unmountMiniPlayer,
    mountMiniPlayer,
    loadPlayAndPushToCueList,
    handleSetPlaybackInstance,
  };
};
