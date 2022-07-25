import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { View, Text, TextInput } from 'app/design-system'
import BackgroundImage from 'app/ui/background-image'
import { openEmail } from 'app/functions/email'
import * as Linking from 'expo-linking'
import { Config } from 'app/config'
import * as Device from 'expo-device'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

// import WalletConnectBtn from 'app/ui/walletconnect-btn'
import { SessionStore } from 'app/state/session'
import {
  usernameOrEmailValidationErrorAtom,
  usernameOrEmailBackendErrorAtom,
  usernameOrEmailErrorAtom,
  usernameOrEmailValidAtom,
} from 'app/state/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from 'app/design-system/button'

const InputContainer = ({ children }) => {
  return <View tw="self-center max-w-sm w-full">{children}</View>
}

const Field = ({ children }) => {
  return (
    <View tw="h-12 w-full flex-row justify-start items-center bg-blue-field/30 rounded-lg my-3">
      {children}
    </View>
  )
}

const { useParam } = createParam()

export function SignIn() {
  const { requestToken, signIn } = SessionStore()
  const setValidationError = useSetRecoilState(
    usernameOrEmailValidationErrorAtom
  )
  const setBackendError = useSetRecoilState(usernameOrEmailBackendErrorAtom)
  const error = useRecoilValue(usernameOrEmailErrorAtom)
  const validForm = useRecoilValue(usernameOrEmailValidAtom)

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showEmailLink, setShowEmailLink] = useState(false)
  const [token, setToken] = useParam('token')
  const [uid, setUid] = useParam('uid')

  const { replace } = useRouter()

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await requestToken(usernameOrEmail, '')
      // check your email to access your account
      setLoading(false)
      setShowEmailLink(true)
      return
    } catch (e) {
      setBackendError(e as any)
    }
    return setLoading(false)
  }

  const signInWithXDR = async (xdr) => {
    setLoading(true)
    try {
      await signIn(undefined, undefined, xdr)
      // check your email to access your account
      setLoading(false)
      return
    } catch (e) {
      setBackendError(e as any)
      replace('/accounts/sign-up')
    }
    return setLoading(false)
  }

  const handleOpenEmail = () => {
    openEmail()
  }

  const validateUsernameOrEmail = (usernameOrEmail: string) => {
    if (!usernameOrEmail) {
      setValidationError('Username is required.')
      return
    }

    if (usernameOrEmail.length < 2) {
      setValidationError('Enter a valid username or email.')
      return
    }

    setValidationError('')
  }

  const updateUsernameOrEmail = ({ target }: any) => {
    setUsernameOrEmail(target.value)
    validateUsernameOrEmail(target.value)
  }

  const onSubmit = (e) => {
    if (e.nativeEvent.key == 'Enter') {
      // signIn()
    }
  }

  const handleAuth = async () => {
    const device = await Device.getDeviceTypeAsync()

    if (
      Platform.OS === 'web' &&
      Device.osName === 'Android' &&
      (device === Device.DeviceType.PHONE ||
        device === Device.DeviceType.TABLET)
    ) {
      await Linking.openURL(
        `${Config.SCHEMA}accounts/sign-in?token=${token}&uid=${uid}`
      )
      return
    }
    const res = await signIn(token, uid)
    if (res) {
      return replace('/')
    }

    setToken(undefined)
    setUid(undefined)
    return
  }

  useEffect(() => {
    // prevent bug where deep links don't handle auth even if token and uid are set
    if (token && uid) {
      handleAuth()
    }
  }, [token, uid])

  return (
    <BackgroundImage authBackground={true}>
      {token && uid ? (
        <InputContainer>
          <Field>
            <Text>Authenticating...</Text>
          </Field>
        </InputContainer>
      ) : showEmailLink ? (
        <InputContainer>
          <Field>
            <Text>We sent you an email to access your account!</Text>
          </Field>
          <Button
            loading={loading}
            onPress={handleOpenEmail}
            text="Open Email"
          />
        </InputContainer>
      ) : (
        <>
          <InputContainer>
            {/* <WalletConnectBtn signInWithXDR={signInWithXDR} /> */}
            <View tw="flex-row my-8 justify-center items-center">
              <View tw="grow h-px bg-white" />
              <Text tw="text-white px-5">or</Text>
              <View tw="grow h-px bg-white" />
            </View>
          </InputContainer>
          <InputContainer>
            <Field>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Email address"
                autoCorrect={false}
                tw="w-full p-2 text-sm"
                autoFocus={true}
                placeholderTextColor="white"
                value={usernameOrEmail}
                onChange={updateUsernameOrEmail}
                onChangeText={(value) =>
                  updateUsernameOrEmail({ target: { value: value } })
                }
                onKeyPress={onSubmit}
              />
            </Field>
            <View tw="h-10 items-center justify-center">
              {error && <Text tw="bg-red">{error}</Text>}
            </View>

            <Button
              disabled={false}
              loading={false}
              text="Log In"
              onPress={() => {}}
            />
          </InputContainer>
        </>
      )}
    </BackgroundImage>
  )
}
