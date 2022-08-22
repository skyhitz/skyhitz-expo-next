import { ActivityIndicator, Pressable, Text, View } from 'app/design-system'
import { Platform } from 'react-native'
import BackgroundImage from 'app/ui/background-image'
import WalletconnectBtn from 'app/ui/walletconnect-btn'
import KeyboardAvoidingView from 'app/design-system/keyboard-avoiding-view'
import { Separator } from 'app/features/accounts/or-separator'
import StyledTextInput from 'app/features/accounts/styled-text-input'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { SchemaOf } from 'yup'
import { useMutation } from '@apollo/client'
import { REQUEST_TOKEN } from 'app/api/user'
import { useEffect, useState } from 'react'
import { useSignInParam } from 'app/hooks/use-sign-in-param'
import { useSignIn } from 'app/hooks/use-sign-in'
import { useRouter } from 'solito/router'
import { SignInForm as FormData } from 'app/types'

export function SignIn() {
  const { push } = useRouter()
  const signInParam = useSignInParam()
  const user = useSignIn(signInParam)

  const [wasEmailSend, setWasEmailSet] = useState(false)

  useEffect(() => {
    if (user) {
      alert(user)
      push('/home')
    }
  }, [user, push])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      <BackgroundImage />

      {wasEmailSend ? (
        <OpenEmailView />
      ) : (
        <SignInForm onEmailSend={() => setWasEmailSet(true)} />
      )}
    </KeyboardAvoidingView>
  )
}

type SignInFormProps = {
  onEmailSend: () => void
}

function SignInForm({ onEmailSend }: SignInFormProps) {
  const [requestToken, { loading, error }] = useMutation(REQUEST_TOKEN, {
    onCompleted: onEmailSend,
  })
  const handleSignIn = async (formData: FormData) => {
    if (loading) return
    await requestToken({
      variables: {
        usernameOrEmail: formData.usernameOrEmail,
        publicKey: '',
      },
    })
  }

  const initialValues: FormData = {
    usernameOrEmail: '',
  }
  //TODO: stricter validation
  const formSchema: SchemaOf<FormData> = Yup.object().shape({
    usernameOrEmail: Yup.string().required('Username or Email is required'),
  })

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
              onChangeText={handleChange('usernameOrEmail')}
              onBlur={handleBlur('usernameOrEmail')}
              className="mt-4"
              placeholder="Email address"
              showFeedback={touched.usernameOrEmail}
              valid={!errors.usernameOrEmail}
              blurOnSubmit={false}
              onSubmitEditing={() => handleSubmit()}
              editable={!loading}
              autoCapitalize="none"
            />
            <Text className="w-full text-center text-sm text-[#d9544f] mt-4 min-h-5">
              {(touched.usernameOrEmail && errors.usernameOrEmail) ||
                error?.message ||
                ' '}
            </Text>
            <Pressable
              onPress={() => handleSubmit()}
              className={`btn mt-6 ${isValid && !loading ? '' : 'opacity-50'}`}
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
  )
}

function OpenEmailView() {
  return (
    <View>
      <Text className="flex flex-row items-center text-sm w-full h-12 rounded-lg p-2 bg-gray-700/20">
        We send you an email to access your account!
      </Text>
      <Pressable
        onPress={() => console.log('todo: open email')}
        className="btn mt-4"
      >
        <Text className="tracking-0.5">Open Email</Text>
      </Pressable>
    </View>
  )
}
