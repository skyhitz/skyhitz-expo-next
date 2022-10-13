import { Platform } from "react-native";
import BackgroundImage from "app/ui/backgroundImage";
import KeyboardAvoidingView from "app/design-system/keyboardAvoidingView";
import { useState } from "react";
import { useSignInParam } from "app/hooks/param/useSignInParam";
import { AuthenticationView } from "app/features/accounts/sign-in/authenticationView";
import { OpenEmailView } from "app/features/accounts/sign-in/openEmailView";
import { SignInForm } from "app/features/accounts/sign-in/signInForm";
import { WalletConnectView } from "./WalletConnectView";
import { isEmpty, not } from "ramda";

export function SignIn() {
  const signInParam = useSignInParam();
  const [emailSend, setEmailSend] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<string>("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      <BackgroundImage />

      {signInParam ? (
        <AuthenticationView signInParam={signInParam} />
      ) : emailSend ? (
        <OpenEmailView />
      ) : not(isEmpty(publicKey)) ? (
        <WalletConnectView publicKey={publicKey} />
      ) : (
        <SignInForm
          onEmailSend={() => setEmailSend(true)}
          onWalletConnected={setPublicKey}
        />
      )}
    </KeyboardAvoidingView>
  );
}
