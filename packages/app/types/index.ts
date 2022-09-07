export type PlaybackState =
  | "LOADING"
  | "PLAYING"
  | "PAUSED"
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
export type ErrorType = { name?: string; message: string; status?: number };

export type IconProps = {
  color?: string;
  size?: number;
};
export type MintForm = {
  artist: string;
  title: string;
  description: string;
  availableForSale: boolean;
  price?: number;
  equityForSale?: number;
};