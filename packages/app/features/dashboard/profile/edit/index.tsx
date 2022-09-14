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
import { values as vals } from "ramda";
import { ChangeUserAvatar } from "app/features/dashboard/profile/edit/changeUserAvatar";
import { Credits } from "app/features/dashboard/profile/edit/credits";
import { userAtom } from "app/state/user";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import { ScrollView } from "app/design-system/ScrollView";
import { useRouter } from "solito/router";
import { ChangeAvatarImg, EditProfileForm } from "app/types";
import * as assert from "assert";
import { editProfileFormSchema } from "app/validation";
import useUploadFileToNFTStorage from "app/hooks/useUploadFileToNFTStorage";
import { ipfsProtocol } from "app/constants/constants";
import { toast } from "app/utils/toast";

export default function EditProfileScreen() {
  const [user, setUser] = useRecoilState(userAtom);
  assert.ok(user, "Unauthorized access on EditProfileScreen");
  const [avatar, setAvatar] = useState<ChangeAvatarImg>({
    url: user.avatarUrl ?? "",
  });
  const [updateUser, { data, loading, error }] = useUpdateUserMutation();
  const { uploadFile, progress } = useUploadFileToNFTStorage();
  const { back } = useRouter();

  const handleUpdateUser = async (form: EditProfileForm) => {
    if (loading) return;

    let avatarUrl = "";
    try {
      if (avatar.blob) {
        const cid = await uploadFile(avatar.blob);
        avatarUrl = `${ipfsProtocol}${cid}`;
      }
    } catch (e) {
      console.error(e);
      return;
    }

    await updateUser({
      variables: { ...form, avatarUrl },
    });
  };

  useEffect(() => {
    if (data?.updateUser) {
      setUser(data.updateUser);
      toast("Changes successfully saved", "success");
    }
  }, [data, setUser, back]);

  const initialValues: EditProfileForm = {
    displayName: user.displayName,
    description: user.description,
    username: user.username,
    email: user.email,
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
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
          <View
            className={`w-full bg-red p-4 ${user.avatarUrl ? "hidden" : ""}`}
          >
            <Text className="mx-auto text-sm">Upload a profile picture</Text>
          </View>
          <View className="px-4">
            <ChangeUserAvatar
              avatarImg={avatar}
              displayName={user!.displayName}
              onChange={setAvatar}
              disable={loading}
            />
            <FormInputWithIcon
              value={values.displayName ?? ""}
              placeholder={"Display Name"}
              onChangeText={handleChange("displayName")}
              icon={AccountBox}
              editable={!loading}
            />
            <Line />
            <FormInputWithIcon
              value={values.description ?? ""}
              placeholder={"Description"}
              onChangeText={handleChange("description")}
              icon={InfoCircle}
              editable={!loading}
            />
            <Line />
            <FormInputWithIcon
              value={values.username ?? ""}
              placeholder={"Username"}
              onChangeText={handleChange("username")}
              icon={PersonOutline}
            />
            <Text className="font-bold text-sm pt-8 pb-2">
              Private information
            </Text>
            <FormInputWithIcon
              value={values.email ?? ""}
              placeholder={"Email address"}
              onChangeText={handleChange("email")}
              icon={MailOutline}
              editable={!loading}
            />
            <Line />
            <Credits className="mt-8" />
          </View>
          <Text className="px-4 font-bold text-sm pt-8 pb-2">More</Text>
          <LogOutBtn />
          <Text className="text-red text-sm py-5 mx-4">
            {vals(errors)
              .join("\n")
              .concat(error?.message ?? "")}
          </Text>
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
