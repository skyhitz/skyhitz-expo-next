import { UpdateUserMutationVariables } from "app/api/graphql";

export type PlaybackState =
  | "LOADING"
  | "PLAYING"
  | "PAUSED"
  | "SEEKING"
  | "IDLE"
  | "ERROR";

export type SignUpForm = {
  username: string;
  displayName: string;
  email: string;
  publicKey?: string;
};
export type SignInForm = {
  usernameOrEmail: string;
};
export type ErrorType = {
  name?: string;
  message: string;
  status?: number | string;
};

export type IconProps = {
  color?: string;
  size?: number;
};
export type MintForm = {
  artist: string;
  title: string;
  description: string;
  availableForSale: boolean;
  price?: string;
  equityForSale?: number;
};

export type ChangeAvatarImg = {
  blob?: Blob;
  url: string;
};

export type Maybe<T> = T | null | undefined;

export type EditProfileForm = Omit<UpdateUserMutationVariables, "avatarUrl">;
