import * as Yup from "yup";
import { object, SchemaOf, string } from "yup";
import {
  EditProfileForm,
  MediaFileInfo,
  MintForm,
  SignInForm,
  WithdrawForm,
} from "app/types";

export const usernameSchema = Yup.string()
  .required("Username is required.")
  .min(2, "Username is minimum 2 characters.")
  .matches(
    /^[a-z0-9_-]+$/,
    "Usernames cannot have spaces, special characters or capital letters"
  );

export const displayedNameSchema = Yup.string()
  .required("Display name is required.")
  .min(2, "Display name is minimum 2 characters.");

export const emailSchema = Yup.string()
  .required("Email is required")
  .email("Please enter a valid email.");

export const editProfileFormSchema: SchemaOf<EditProfileForm> = object().shape({
  displayName: displayedNameSchema,
  description: string(),
  username: usernameSchema,
  email: emailSchema,
});

export const signInFormSchema: SchemaOf<SignInForm> = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required("Username or email is required")
    .min(2, "Username should contain at least 2 characters"),
});

export const signUpFormSchema = Yup.object().shape({
  username: usernameSchema,
  displayedName: displayedNameSchema,
  email: emailSchema,
});

export const mintFormSchema: SchemaOf<MintForm> = object().shape({
  artist: Yup.string()
    .required("Artist name is required")
    .min(2, "Artist name should contain at least 2 characters")
    .max(20, "Artist name should not contain more than 20 characters"),
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title should contain at least 2 characters")
    .max(20, "Title should not contain more than 20 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(2, "Description should contain at least 2 characters")
    .max(100, "Description should not contain more than 100 characters"),
  availableForSale: Yup.boolean().required(),
  price: Yup.string(),
  equityForSale: Yup.number()
    .min(1, "Equity should be within range 0 - 100")
    .max(100, "Equity should be within range 0 - 100"),
});

export const withdrawFormSchema: (
  currentBalance: number
) => SchemaOf<WithdrawForm> = (currentBalance: number) => {
  return object().shape({
    address: Yup.string().required("Stellar Address is required"),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "Minimal amount to withdraw is 1XLM")
      .max(currentBalance, "You can't withdraw more than your balance"),
  });
};

const ASPECT_RATIO_MIN = 0.99;
const ASPECT_RATIO_MAX = 1.01;
const validateImgSquare = (image: MediaFileInfo) => {
  if (!image.image) {
    return "File is not an image!";
  }
  const aspectRatio = image.width / image.height;
  if (aspectRatio < ASPECT_RATIO_MIN || aspectRatio > ASPECT_RATIO_MAX) {
    return "Only square images supported!";
  }
  return null;
};

const validateImgFormatOneOf = (image: MediaFileInfo, formats = ["png"]) => {
  for (const format of formats) {
    if (image.uri.startsWith(`data:image/${format}`)) return null;
    if (image.uri.endsWith(`.${format}`)) return null;
  }

  return "Unsupported image format";
};

const validateImgWideEnough = (image: MediaFileInfo, minWidth = 3000) => {
  if (!image.image) {
    return "File is not an image!";
  }
  if (image.width < minWidth) {
    return `Image should be at least ${minWidth}px wide!`;
  }
  return null;
};

export const validateProfilePicture = (image: MediaFileInfo): string | null => {
  return (
    validateImgSquare(image) ??
    validateImgFormatOneOf(image, ["png", "jpg", "jpeg"])
  );
};

export const validateArtwork = (image: MediaFileInfo): string | null => {
  return (
    validateImgSquare(image) ??
    validateImgFormatOneOf(image) ??
    validateImgWideEnough(image)
  );
};

export const validateVideo = (video: MediaFileInfo): string | null => {
  const isMp4 = video.uri.startsWith("data:video/mp4");
  const isWav = video.uri.startsWith("data:audio/wav");
  const isAiff = video.uri.startsWith("data:audio/mpeg");
  if (!isMp4 && !isWav && !isAiff) {
    return "Supported media formats: .mp4, .wav, .mp3";
  }
  return null;
};
