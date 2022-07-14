import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { View, Text, TextInput, Pressable } from 'app/design-system'
import { useLinkTo } from '@react-navigation/native'
import BackgroundImage from 'app/ui/background-image'
import { openEmail } from 'app/functions/email'
import * as Linking from 'expo-linking'
import { Config } from 'app/config'
import * as Device from 'expo-device'
import WalletConnectBtn from 'app/ui/walletconnect-btn'
import { SessionStore } from 'app/state/session'
import {
  usernameOrEmailValidationErrorAtom,
  usernameOrEmailBackendErrorAtom,
  usernameOrEmailErrorAtom,
  usernameOrEmailValidAtom,
} from 'app/state/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'

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

const SignIn = ({ route, navigation }) => {
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
  const { token, uid } = route.params || {}
  const linkTo = useLinkTo()

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
      linkTo('/accounts/sign-up')
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
      signIn()
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
      return linkTo('/')
    }

    navigation.setParams({ token: undefined, uid: undefined })
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
          <TouchableHighlight
            style={[styles.joinBtn]}
            onPress={handleOpenEmail}
          >
            {loading ? (
              <ActivityIndicator size="small" style={styles.loadingIndicator} />
            ) : (
              <Text style={[styles.joinTextBtn]}>Open Email</Text>
            )}
          </TouchableHighlight>
        </InputContainer>
      ) : (
        <>
          <InputContainer>
            <WalletConnectBtn signInWithXDR={signInWithXDR} />
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
            <View style={styles.errorContainer}>
              <Text style={[styles.error, { opacity: error ? 1 : 0 }]}>
                {error}
              </Text>
            </View>
            <Pressable
              style={[styles.joinBtn, { opacity: validForm ? 1 : 0.5 }]}
              onPress={handleSignIn}
              disabled={!validForm}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  style={styles.loadingIndicator}
                  color={Colors.white}
                />
              ) : (
                <Text style={[styles.joinTextBtn]}>Log In</Text>
              )}
            </Pressable>
          </InputContainer>
        </>
      )}
    </BackgroundImage>
  )
}

export default SignIn

let styles = StyleSheet.create({
  joinBtn: {
    height: 48,
    backgroundColor: Colors.lightBlueBtn,
    borderRadius: 24,
  },
  joinTextBtn: {
    textAlign: 'center',
    color: Colors.white,
    paddingTop: 15,
    letterSpacing: 2,
    fontSize: 16,
  },
  errorContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  error: {
    color: Colors.errorBackground,
  },
  forgotPass: {
    backgroundColor: 'transparent',
  },
  forgotPassText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    paddingTop: 30,
    fontSize: 16,
  },
  loadingIndicator: {
    paddingTop: 15,
  },
})
