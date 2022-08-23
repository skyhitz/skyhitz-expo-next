import { Platform } from "react-native";
import BackgroundImage from "app/ui/background-image";
import KeyboardAvoidingView from "app/design-system/keyboard-avoiding-view";
import { useState } from "react";
import { useSignInParam } from "app/hooks/use-sign-in-param";
import { AuthenticationView } from "app/features/accounts/sign-in/authentication-view";
import { OpenEmailView } from "app/features/accounts/sign-in/open-email-view";
import { SignInForm } from "app/features/accounts/sign-in/sign-in-form";

export function SignIn() {
  const signInParam = useSignInParam();
  const [emailSend, setEmailSend] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      <BackgroundImage />

      {emailSend ? (
        <OpenEmailView />
      ) : signInParam ? (
        <AuthenticationView signInParam={signInParam} />
      ) : (
        <SignInForm onEmailSend={() => setEmailSend(true)} />
      )}
    </KeyboardAvoidingView>
  );
}
