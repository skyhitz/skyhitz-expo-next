import { SignInForm as FormData } from "app/types";
import { Button, Text, View } from "app/design-system";
import { WalletConnectBtn } from "app/ui/buttons/walletconnectBtn";
import { Separator } from "app/ui/orSeparator";
import { Formik, FormikProps } from "formik";
import StyledTextInput from "app/features/accounts/styledTextInput";
import { useRequestTokenMutation } from "app/api/graphql";
import { signInFormSchema } from "app/validation";

type SignInFormProps = {
  onEmailSend: () => void;
  onWalletConnected: (signedXDR: string) => void;
};

export function SignInForm({
  onEmailSend,
  onWalletConnected,
}: SignInFormProps) {
  const [requestToken, { loading, error }] = useRequestTokenMutation({
    onCompleted: onEmailSend,
  });
  const handleSignIn = async (formData: FormData) => {
    if (loading) return;
    await requestToken({
      variables: {
        usernameOrEmail: formData.usernameOrEmail,
        publicKey: "",
      },
    });
  };

  const initialValues: FormData = {
    usernameOrEmail: "",
  };

  return (
    <View className="w-72 md:w-96 items-center">
      <WalletConnectBtn loading={false} onAuth={onWalletConnected} />
      <Separator />
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validationSchema={signInFormSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isValid,
          handleSubmit,
        }: FormikProps<FormData>) => (
          <View className="items-center">
            <StyledTextInput
              value={values.usernameOrEmail}
              onChangeText={handleChange("usernameOrEmail")}
              onBlur={handleBlur("usernameOrEmail")}
              className="mt-4"
              placeholder="Email address"
              showFeedback={touched.usernameOrEmail}
              valid={!errors.usernameOrEmail}
              blurOnSubmit={false}
              onSubmitEditing={() => handleSubmit()}
              editable={!loading}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text className="w-full text-center text-sm text-[#d9544f] mt-4 min-h-5">
              {(touched.usernameOrEmail && errors.usernameOrEmail) ||
                error?.message ||
                " "}
            </Text>
            <Button
              onPress={handleSubmit}
              loading={loading}
              text="Log In"
              size="large"
              className="mt-6"
              disabled={!isValid}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
