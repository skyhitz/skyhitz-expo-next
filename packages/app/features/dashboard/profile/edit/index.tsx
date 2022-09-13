import { Button, Text, View } from "app/design-system";
import AccountBox from "app/ui/icons/account-box";
import { Line } from "app/ui/orSeparator";
import InfoCircle from "app/ui/icons/info-circle";
import PersonOutline from "app/ui/icons/person-outline";
import MailOutline from "app/ui/icons/mail-outline";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  UpdateUserMutationVariables,
  useUpdateUserMutation,
} from "app/api/graphql";
import { editProfileFormSchema } from "app/validation";
import { Formik, FormikProps } from "formik";
import { LogOutBtn } from "app/features/dashboard/profile/edit/logOutBtn";
import { values as vals } from "ramda";
import { ChangeUserAvatar } from "app/features/dashboard/profile/edit/changeUserAvatar";
import { Credits } from "app/features/dashboard/profile/edit/credits";
import { userAtom } from "app/state/user";
import { FormInputWithIcon } from "app/ui/inputs/FormInputWithIcon";
import { ScrollView } from "app/design-system/ScrollView";
import { useRouter } from "solito/router";

export default function EditProfileScreen() {
  const [user, setUser] = useRecoilState(userAtom);
  const [updateUser, { data, loading, error }] = useUpdateUserMutation();
  const { back } = useRouter();

  const handleUpdateUser = async (form: UpdateUserMutationVariables) => {
    if (loading) return;

    await updateUser({
      variables: form,
    });
  };

  useEffect(() => {
    if (data?.updateUser) {
      setUser(data.updateUser);
      back();
    }
  }, [data, setUser, back]);

  const initialValues: UpdateUserMutationVariables = {
    displayName: user!.displayName,
    description: user!.description,
    username: user!.username,
    avatarUrl: user!.avatarUrl,
    email: user!.email,
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
        <ScrollView className="bg-blue-dark flex-1">
          <View className="w-full bg-red p-4">
            <Text className="mx-auto text-sm">Upload a profile picture</Text>
          </View>
          <View className="px-4">
            <ChangeUserAvatar
              avatarUri={values.avatarUrl}
              displayName={user!.displayName}
              handleChange={handleChange("avatarUrl")}
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
              loading={loading}
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
