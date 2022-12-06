import { UpdateUserMutationVariables } from "app/api/graphql";

export type PlaybackState =
  | "LOADING"
  | "FALLBACK"
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

export type WithdrawForm = {
  address: string;
  amount: number;
};

export type ChangeAvatarImg = {
  blob?: Blob;
  url: string;
};

export type MediaFileInfo =
  | {
      image: true;
      uri: string;
      width: number;
      height: number;
    }
  | { image: false; uri: string; mimeType: string };

export type Maybe<T> = T | null | undefined;

export type EditProfileForm = Omit<UpdateUserMutationVariables, "avatarUrl">;

export type Offer = {
  id: number;
  seller: string;
  selling:
    | {
        asset_type: "native";
      }
    | {
        asset_type: "credit_alphanum12" | "credit_alphanum4";
        asset_code: string;
        asset_issuer: string;
      };
  amount: string;
  price: string;
};
