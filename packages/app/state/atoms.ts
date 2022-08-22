import { atom, selector } from "recoil";
import { UserData } from "app/models/user";
import { ProfileEdit } from "app/models/profile";

export const userAtom = atom<null | UserData>({
  key: "user",
  default: null,
});
