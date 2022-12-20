import { Button, Text, View } from "app/design-system";
import AccountBox from "app/ui/icons/account-box";
import { Line } from "app/ui/orSeparator";
import InfoCircle from "app/ui/icons/info-circle";
import PersonOutline from "app/ui/icons/person-outline";
import MailOutline from "app/ui/icons/mail-outline";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useUpdateUserMutation } from "app/api/graphql";
import { Formik, FormikProps } from "formik";
import { LogOutBtn } from "app/features/dashboard/profile/edit/logOutBtn";
import { WithdrawCredits } from "app/features/dashboard/profile/edit/WithdrawCredits";
import { userAtom } from "app/state/user";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import { ScrollView } from "app/design-system/ScrollView";
import { useRouter } from "solito/router";
import { ChangeImage, EditProfileForm } from "app/types";
import * as assert from "assert";
import { editProfileFormSchema } from "app/validation";
import useUploadFileToNFTStorage from "app/hooks/useUploadFileToNFTStorage";
import { ipfsProtocol } from "app/constants/constants";
import { useToast } from "react-native-toast-notifications";
import { ChangeWallet } from "./ChangeWallet";
import Twitter from "app/ui/icons/twitter";
import Instagram from "app/ui/icons/instagram";
import { ProfileHeader } from "../ProfileHeader";
import { ChangeImages } from "./ChangeImages";
import { Platform } from "react-native";

export default function EditProfileScreen() {
  const [user, setUser] = useRecoilState(userAtom);
  assert.ok(user, "Unauthorized access on EditProfileScreen");
  const [avatar, setAvatar] = useState<ChangeImage>({
    url: user.avatarUrl,
  });
  const [background, setBackground] = useState<ChangeImage>({
    url: user.backgroundUrl ?? "",
  });
  const [updateUser, { data, loading }] = useUpdateUserMutation();
  const { uploadFile, progress } = useUploadFileToNFTStorage();
  const { back } = useRouter();
  const toast = useToast();

  const handleUpdateUser = async (form: EditProfileForm) => {
    if (loading) return;

    let avatarUrl = user.avatarUrl;
    let backgroundUrl = user.backgroundUrl ?? "";

    try {
      if (avatar.blob) {
        const cid = await uploadFile(avatar.blob);
        avatarUrl = `${ipfsProtocol}${cid}`;
      }
      if (background.blob) {
        const cid = await uploadFile(background.blob);
        backgroundUrl = `${ipfsProtocol}${cid}`;
      }
      await updateUser({
        variables: { ...form, avatarUrl, backgroundUrl },
      });
    } catch (e: any) {
      console.error(e);
      toast.show(e?.message ?? "Unknown error", { type: "danger" });
    }
  };

  useEffect(() => {
    if (data?.updateUser) {
      setUser(data.updateUser);
      toast.show("Changes successfully saved", { type: "success" });
      back();
    }
  }, [data, setUser, back, toast]);

  const initialValues: EditProfileForm = {
    displayName: user.displayName,
    description: user.description ?? "",
    username: user.username,
    email: user.email,
    twitter: user.twitter ?? "",
    instagram: user.instagram ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount
      validationSchema={editProfileFormSchema}
      onSubmit={handleUpdateUser}
    >
      {({
        values,
        handleChange,
        isValid,
        handleSubmit,
        errors,
      }: FormikProps<EditProfileForm>) => (
        <ScrollView className="bg-blue-dark flex-1">
          <ProfileHeader
            avatar={avatar.url}
            background={background.url}
            displayName={user!.displayName!}
          />

          <View className="px-4 mt-5">
            <ChangeImages
              onAvatarChange={setAvatar}
              onBackgroundChange={setBackground}
              activeSubmission={loading}
            />

            <FormInputWithIcon
              value={values.displayName ?? ""}
              placeholder="Display Name"
              onChangeText={handleChange("displayName")}
              icon={AccountBox}
              editable={!loading}
              error={errors.displayName}
            />
            <Line />
            <FormInputWithIcon
              value={values.description ?? ""}
              placeholder="Description"
              onChangeText={handleChange("description")}
              icon={InfoCircle}
              editable={!loading}
              error={errors.description}
            />
            <Line />
            <FormInputWithIcon
              value={values.username ?? ""}
              placeholder="Username"
              onChangeText={handleChange("username")}
              icon={PersonOutline}
              error={errors.username}
            />
            <Line />
            <FormInputWithIcon
              value={values.twitter ?? ""}
              placeholder="Twitter username"
              onChangeText={handleChange("twitter")}
              icon={Twitter}
              error={errors.twitter}
            />
            <Line />
            <FormInputWithIcon
              value={values.instagram ?? ""}
              placeholder="Instagram username"
              onChangeText={handleChange("instagram")}
              icon={Instagram}
              error={errors.instagram}
            />
            <Text className="font-bold text-sm pt-8 pb-2">
              Private information
            </Text>
            <FormInputWithIcon
              value={values.email ?? ""}
              placeholder="Email address"
              onChangeText={handleChange("email")}
              icon={MailOutline}
              editable={!loading}
              error={errors.email}
            />
            <Line />
            {user.managed && Platform.OS !== "ios" && <WithdrawCredits />}
            <ChangeWallet />
          </View>
          <Text className="px-4 font-bold text-sm pt-8 pb-2">More</Text>
          <LogOutBtn />
          <View className="flex md:flex-row justify-center items-center mb-5">
            <Button
              text="Done"
              size="large"
              onPress={handleSubmit}
              className="mb-5 md:mb-0 md:mr-5"
              disabled={!isValid}
              loading={loading || !!progress}
            />
            <Button
              text="Cancel"
              size="large"
              variant="secondary"
              onPress={back}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}
