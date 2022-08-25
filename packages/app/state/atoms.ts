import { atom } from "recoil";
import { UserData } from "app/models/user";

export const userAtom = atom<null | UserData>({
  key: "user",
  default: null,
});

export const appInitializedAtom = atom<boolean>({
  key: "initialized",
  default: false,
});
