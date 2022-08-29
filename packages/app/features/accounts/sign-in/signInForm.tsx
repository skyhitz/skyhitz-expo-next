import { SignInForm as FormData } from "app/types";
import * as Yup from "yup";
import { SchemaOf } from "yup";
import { ActivityIndicator, Pressable, Text, View } from "app/design-system";
import WalletconnectBtn from "app/ui/walletconnectBtn";
import { Separator } from "app/features/accounts/orSeparator";
import { Formik, FormikProps } from "formik";
import StyledTextInput from "app/features/accounts/styledTextInput";
import { useRequestTokenMutation } from "app/api/graphql";

type SignInFormProps = {
  onEmailSend: () => void;
};

export function SignInForm({ onEmailSend }: SignInFormProps) {
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

  const formSchema: SchemaOf<FormData> = Yup.object().shape({
    usernameOrEmail: Yup.string()
      .required("Username or email is required")
      .min(2, "Enter a valid username or email"),
  });

  return (
    <View className="w-72 md:w-96">
      <WalletconnectBtn />
      <Separator />
      <Formik
        validateOnMount={true}
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validationSchema={formSchema}
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
          <View>
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
              keyboardType={"email-address"}
            />
            <Text className="w-full text-center text-sm text-[#d9544f] mt-4 min-h-5">
              {(touched.usernameOrEmail && errors.usernameOrEmail) ||
                error?.message ||
                " "}
            </Text>
            <Pressable
              onPress={() => handleSubmit()}
              className={`btn mt-6 ${isValid && !loading ? "" : "opacity-50"}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="tracking-0.5">Log In</Text>
              )}
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}
