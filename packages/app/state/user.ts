import { atom } from "recoil";
import { User } from "app/api/graphql";

export const userAtom = atom<User | null>({
  key: "user",
  default: null,
});

export const appInitializedAtom = atom<boolean>({
  key: "initialized",
  default: false,
});
