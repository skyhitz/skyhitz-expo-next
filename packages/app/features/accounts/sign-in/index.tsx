import { Platform } from "react-native";
import BackgroundImage from "app/ui/backgroundImage";
import KeyboardAvoidingView from "app/design-system/keyboardAvoidingView";
import { useState } from "react";
import { useSignInParam } from "app/hooks/param/useSignInParam";
import { AuthenticationView } from "app/features/accounts/sign-in/authenticationView";
import { OpenEmailView } from "app/features/accounts/sign-in/openEmailView";
import { SignInForm } from "app/features/accounts/sign-in/signInForm";

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
