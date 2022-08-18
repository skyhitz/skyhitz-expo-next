import { ActivityIndicator, Pressable, Text, View } from 'app/design-system'
import { Platform } from 'react-native'
import BackgroundImage from 'app/ui/background-image'
import WalletconnectBtn from 'app/ui/walletconnect-btn'
import KeyboardAvoidingView from 'app/design-system/keyboard-avoiding-view'
import { Separator } from 'app/features/accounts/or-separator'
import StyledTextInput from 'app/features/accounts/styled-text-input'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { REQUEST_TOKEN } from 'app/api/user'

type FormFields = {
  email: string
}

export function SignIn() {
  const [requestToken, { loading, error }] = useMutation(REQUEST_TOKEN)
  const handleSignIn = async (formData) => {
    if (loading) return
    await requestToken({
      variables: {
        email: formData.email,
        publicKey: '',
      },
    })
  }

  const initialValues: FormFields = {
    email: '',
  }

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email.'),
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      <BackgroundImage />
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
          }: FormikProps<FormFields>) => (
            <View>
              <StyledTextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                className="mt-4"
                placeholder="Email address"
                showFeedback={touched.email}
                valid={!errors.email}
                blurOnSubmit={false}
                onSubmitEditing={() => handleSubmit()}
                editable={!loading}
                autoCapitalize="none"
              />
              <Text
                className={
                  'w-full text-center text-sm text-[#d9544f] mt-4 min-h-5'
                }
              >
                {(touched.email && errors.email) || error?.message || ' '}
              </Text>
              <Pressable
                onPress={() => handleSubmit()}
                className={`btn mt-6 ${
                  isValid && !loading ? '' : 'opacity-50'
                }`}
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
    </KeyboardAvoidingView>
  )
}
