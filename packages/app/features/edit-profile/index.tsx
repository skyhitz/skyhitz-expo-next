import { SafeAreaView } from "app/design-system/safe-area-view";
import { Text, View } from "app/design-system";
import { EditProfileTextInput } from "app/features/edit-profile/editProfileTextInput";
import AccountBox from "app/ui/icons/account-box";
import { tw } from "app/design-system/tailwind";
import { Line } from "app/ui/orSeparator";
import InfoCircle from "app/ui/icons/info-circle";
import PersonOutline from "app/ui/icons/person-outline";
import MailOutline from "app/ui/icons/mail-outline";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "app/state/atoms";
import {
  UpdateUserMutationVariables,
  useUpdateUserMutation,
} from "app/api/graphql";
import { editProfileFormSchema } from "app/validation";
import { Formik, FormikProps } from "formik";
import { LogOutBtn } from "app/features/edit-profile/logOutBtn";
import { UploadProfilePictureBanner } from "app/features/edit-profile/uploadProfilePictureBanner";
import { EditProfileHeader } from "app/features/edit-profile/editProfileHeader";
import { values as vals } from "ramda";
import { ChangeUserAvatar } from "app/features/edit-profile/changeUserAvatar";

export default function EditProfileScreen() {
  const user = useRecoilValue(userAtom)!;
  const setUser = useSetRecoilState(userAtom);
  const [updateUser, { data, loading, error }] = useUpdateUserMutation();

  const handleUpdateUser = async (form: UpdateUserMutationVariables) => {
    if (loading) return;

    // TODO: remove after adding ability to change profile picture
    const { avatarUrl: _, ...formWithoutAvatarUrl } = form;

    await updateUser({
      variables: {
        ...formWithoutAvatarUrl,
        avatarUrl: user.avatarUrl,
      },
    });
  };

  useEffect(() => {
    if (data?.updateUser) {
      setUser(data.updateUser);
    }
  }, [data, setUser]);

  const initialValues: UpdateUserMutationVariables = {
    displayName: user.displayName,
    description: user.description,
    username: user.username,
    avatarUrl: user.avatarUrl,
    email: user.email,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editProfileFormSchema}
      validateOnMount={true}
      onSubmit={handleUpdateUser}
    >
      {({
        values,
        handleChange,
        isValid,
        handleSubmit,
        errors,
      }: FormikProps<UpdateUserMutationVariables>) => (
        <SafeAreaView className="bg-blue-dark flex-1">
          <EditProfileHeader
            disableDoneBtn={!isValid}
            onDoneBtnClick={handleSubmit}
          />
          <UploadProfilePictureBanner />
          <View className="px-4">
            <ChangeUserAvatar
              avatarUri={values.avatarUrl}
              displayName={user.displayName}
              handleChange={handleChange("avatarUrl")}
            />
            <EditProfileTextInput
              value={values.displayName ?? ""}
              placeholder={"Display Name"}
              onChangeText={handleChange("displayName")}
            >
              <AccountBox {...iconProps} />
            </EditProfileTextInput>
            <Line />
            <EditProfileTextInput
              value={values.description ?? ""}
              placeholder={"Description"}
              onChangeText={handleChange("description")}
            >
              <InfoCircle {...iconProps} />
            </EditProfileTextInput>
            <Line />
            <EditProfileTextInput
              value={values.username ?? ""}
              placeholder={"Username"}
              onChangeText={handleChange("username")}
            >
              <PersonOutline {...iconProps} />
            </EditProfileTextInput>
            <Text className="font-bold text-sm pt-8 pb-2">
              Private information
            </Text>
            <EditProfileTextInput
              value={values.email ?? ""}
              placeholder={"Email address"}
              onChangeText={handleChange("email")}
            >
              <MailOutline {...iconProps} />
            </EditProfileTextInput>
            <Line />
          </View>
          <Text className="px-4 font-bold text-sm pt-8 pb-2">More</Text>
          <LogOutBtn />
          <Text className="text-red text-sm py-5 mx-4">
            {vals(errors)
              .join("\n")
              .concat(error?.message ?? "")}
          </Text>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const iconProps = {
  color: tw.color("white"),
  size: 22,
};
