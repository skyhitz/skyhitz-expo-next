import { Button, Text, View } from "app/design-system";
import { Platform, TextInput } from "react-native";
import BackgroundImage from "app/ui/backgroundImage";
import { WalletConnectBtn } from "app/ui/buttons/walletconnectBtn";
import KeyboardAvoidingView from "app/design-system/keyboardAvoidingView";
import { Separator } from "app/ui/orSeparator";
import StyledTextInput from "app/features/accounts/styledTextInput";
import { Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { useLogIn } from "app/hooks/useLogIn";
import { useCreateUserWithEmailMutation } from "app/api/graphql";
import { signUpFormSchema } from "app/validation";

type FormFields = {
  username: string;
  displayedName: string;
  email: string;
};

export function SignUp() {
  const logIn = useLogIn();
  const [publicKey, setPublicKey] = useState<string>("");
  const [createUserWithEmail, { loading, error, data }] =
    useCreateUserWithEmailMutation();

  useEffect(() => {
    if (data?.createUserWithEmail) {
      logIn(data.createUserWithEmail);
    }
  }, [data, logIn]);

  const handleSignUp = async (formData: FormFields) => {
    if (loading) return;
    await createUserWithEmail({
      variables: {
        displayName: formData.displayedName,
        username: formData.username,
        email: formData.email,
        publicKey,
      },
    });
  };

  const displayedNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

  const initialValues: FormFields = {
    username: "",
    email: "",
    displayedName: "",
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      <BackgroundImage />
      <View className="w-72 md:w-96">
        <Formik
          validateOnMount={true}
          initialValues={initialValues}
          onSubmit={handleSignUp}
          validationSchema={signUpFormSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
            handleSubmit,
          }: FormikProps<FormFields>) => (
            <View className="items-center">
              <StyledTextInput
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                className="mt-4"
                placeholder="Username"
                showFeedback={touched.username}
                valid={!errors.username}
                autoFocus={true}
                blurOnSubmit={false}
                onSubmitEditing={() => displayedNameInputRef.current?.focus()}
                editable={!loading}
                autoCapitalize="none"
              />

              <StyledTextInput
                value={values.displayedName}
                onChangeText={handleChange("displayedName")}
                onBlur={handleBlur("displayedName")}
                className="mt-4"
                placeholder="Displayed Name"
                showFeedback={touched.displayedName}
                valid={!errors.displayedName}
                ref={displayedNameInputRef}
                blurOnSubmit={false}
                onSubmitEditing={() => emailInputRef.current?.focus()}
                editable={!loading}
                autoCapitalize="none"
              />

              <StyledTextInput
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                className="mt-4"
                placeholder="Email address"
                showFeedback={touched.email}
                valid={!errors.email}
                blurOnSubmit={false}
                ref={emailInputRef}
                onSubmitEditing={() => handleSubmit()}
                editable={!loading}
                autoCapitalize="none"
                keyboardType={"email-address"}
              />
              <Text
                className={
                  "w-full text-center text-sm text-[#d9544f] mt-4 min-h-5"
                }
              >
                {(touched.username && errors.username) ||
                  (touched.displayedName && errors.displayedName) ||
                  (touched.email && errors.email) ||
                  error?.message ||
                  " "}
              </Text>
              <Button
                text="Join"
                loading={loading}
                disabled={!isValid}
                onPress={handleSubmit}
                size="large"
                className="mt-5"
              />
              <Separator />

              <WalletConnectBtn
                disabled={!isValid}
                loading={loading}
                onConnected={(publicKey: string) => {
                  setPublicKey(publicKey);
                  handleSubmit();
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}
