import { SafeAreaView } from "app/design-system/safe-area-view";
import React from "react";
import { Text, View } from "app/design-system";
import { Formik, FormikProps } from "formik";

export function SubmitScreen() {
  const initialValues: EditProfileForm = {
    displayName: user.displayName,
    description: user.description ?? "",
    username: user.username,
    email: user.email,
    twitter: user.twitter ?? "",
    instagram: user.instagram ?? "",
  };
  return (
    <SafeAreaView
      edges={["top"]}
      className="w-full max-w-6xl mx-auto flex-1 flex pt-4 pl-2 pb-0 bg-blue-dark"
    >
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
          <View>
            <Text>Submit music to decentralize it:</Text>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
