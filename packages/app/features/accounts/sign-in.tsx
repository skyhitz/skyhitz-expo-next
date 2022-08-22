import React, { ReactNode, useState } from "react";
import { Button, Text, TextInput, View } from "app/design-system";
import { createParam } from "solito";
import BackgroundImage from "app/ui/background-image";
import { openEmail } from "app/utils/email";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  usernameOrEmailBackendErrorAtom,
  usernameOrEmailValidationErrorAtom,
  usernameOrEmailValidAtom,
} from "app/state/atoms";
import { useMutation } from "@apollo/client";
import { REQUEST_TOKEN } from "app/api/user";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";

const InputContainer = ({ children }: { children: ReactNode }) => {
  return <View className="self-center max-w-sm w-full">{children}</View>;
};

const Field = ({ children }: { children: ReactNode }) => {
  return (
    <View className="h-12 w-full flex-row justify-start items-center bg-blue-field/30 rounded-lg">
      {children}
    </View>
  );
};

const { useParam } = createParam();

export function SignIn() {
  // apollo test
  const [mutation, { data, loading, error }] = useMutation(REQUEST_TOKEN);
  console.log(data, loading, error);

  const [token, setToken] = useParam("token");
  const [uid, setUid] = useParam("uid");
  const [showEmailLink, setShowEmailLink] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  const setValidationError = useSetRecoilState(
    usernameOrEmailValidationErrorAtom
  );
  const setBackendError = useSetRecoilState(usernameOrEmailBackendErrorAtom);
  const validForm = useRecoilValue(usernameOrEmailValidAtom);

  const handleOpenEmail = () => {
    openEmail();
  };

  const validateUsernameOrEmail = (usernameOrEmail: string) => {
    if (!usernameOrEmail) {
      setValidationError("Username is required.");
      return;
    }

    if (usernameOrEmail.length < 2) {
      setValidationError("Enter a valid username or email.");
      return;
    }

    setValidationError("");
  };

  const updateUsernameOrEmail = ({ target }: any) => {
    setUsernameOrEmail(target.value);
    validateUsernameOrEmail(target.value);
  };

  const onSubmit = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key == "Enter") {
      // TODO
    }
  };

  const handleSignIn = async () => {
    try {
      await mutation({ variables: { usernameOrEmail, publicKey: "" } });
      // check your email to access your account
      setShowEmailLink(true);
      return;
    } catch (e) {
      setBackendError(e as any);
    }
  };

  return (
    <View>
      <BackgroundImage />
      <InputContainer>
        {token && uid && (
          <Field>
            <Text>Authenticating...</Text>
          </Field>
        )}
        {showEmailLink && (
          <Field>
            <Text>We sent you an email to access your account!</Text>
          </Field>
        )}
        {showEmailLink && (
          <Button
            loading={loading}
            onPress={handleOpenEmail}
            text="Open Email"
          />
        )}
      </InputContainer>
      <InputContainer>
        <Field>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={"white"}
            autoCapitalize="none"
            placeholder="Username or Email address"
            autoCorrect={false}
            className="w-full p-2"
            autoFocus={true}
            value={usernameOrEmail}
            onChange={updateUsernameOrEmail}
            onChangeText={(value) =>
              updateUsernameOrEmail({ target: { value: value } })
            }
            onKeyPress={onSubmit}
          />
        </Field>
        <View className="h-12 items-center justify-center w-full">
          {error && <Text className="text-red text-sm">{error.message}</Text>}
        </View>
        <Button
          onPress={handleSignIn}
          disabled={!validForm}
          loading={loading}
          text="Log In"
        />
      </InputContainer>
    </View>
  );
}
