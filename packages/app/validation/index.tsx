import * as Yup from "yup";
import { object, SchemaOf, string } from "yup";
import { SignInForm, MintForm } from "app/types";
import { UpdateUserMutationVariables } from "app/api/graphql";

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

export const editProfileFormSchema: SchemaOf<UpdateUserMutationVariables> =
  object().shape({
    displayName: displayedNameSchema,
    description: string(),
    username: usernameSchema,
    avatarUrl: string(),
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
