import * as Yup from "yup";

export const usernameSchema = Yup.string()
  .required("Username is required.")
  .min(2, "Username is minimum 2 characters.")
  .matches(
    /^[a-zA-Z0-9_-]+$/,
    "Usernames cannot have spaces or special characters"
  );

export const displayedNameSchema = Yup.string()
  .required("Display name is required.")
  .min(2, "Display name is minimum 2 characters.");

export const emailSchema = Yup.string()
  .required("Email is required")
  .email("Please enter a valid email.");
