import { Entry } from "app/api/graphql";
import { atom } from "recoil";

export const isPlayingAtom = atom<boolean>({
  key: "isPlaying",
  default: false,
});

export const shuffleAtom = atom<boolean>({
  key: "shuffle",
  default: false,
});

export const loopAtom = atom<boolean>({
  key: "loop",
  default: false,
});

export const currentEntryAtom = atom<Entry | null>({
  key: "currentEntry",
  default: null,
});

export const currentPlaylistAtom = atom<Entry[] | null>({
  key: "currentPlaylist",
  default: null,
});

export const currentDurationAtom = atom<number>({
  key: "currentDuration",
  default: 0,
});

export const currentPositionAtom = atom<number>({
  key: "currentPosition",
  default: 0,
});

