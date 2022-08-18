import { Pressable, Text, View } from 'app/design-system'
import { Platform, TextInput } from 'react-native'
import BackgroundImage from 'app/ui/background-image'
import WalletconnectBtn from 'app/ui/walletconnect-btn'
import KeyboardAvoidingView from 'app/design-system/keyboard-avoiding-view'
import { Separator } from 'app/features/accounts/or-separator'
import StyledTextInput from 'app/features/accounts/styled-text-input'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useRef } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER_WITH_EMAIL } from 'app/api/user'

type FormFields = {
  username: string
  displayedName: string
  email: string
}

export function SignUp() {
  const [createUserWithEmail, { loading, error }] = useMutation(
    CREATE_USER_WITH_EMAIL
  )
  const handleSignUp = async (formData: FormFields) => {
    await createUserWithEmail({
      variables: {
        displayName: formData.displayedName,
        username: formData.username,
        email: formData.email,
        publicKey: '',
      },
    })
  }

  const displayedNameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)

  const initialValues: FormFields = {
    username: '',
    email: '',
    displayedName: '',
  }

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required.')
      .min(2, 'Username is minimum 2 characters.')
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        'Usernames cannot have spaces or special characters'
      ),
    displayedName: Yup.string()
      .required('Display name is required.')
      .min(2, 'Display name is minimum 2 characters.'),
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
          onSubmit={handleSignUp}
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
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                className="mt-4"
                placeholder="Username"
                showFeedback={touched.username}
                valid={!errors.username}
                autoFocus={true}
                blurOnSubmit={false}
                onSubmitEditing={() => displayedNameInputRef.current?.focus()}
              />

              <StyledTextInput
                value={values.displayedName}
                onChangeText={handleChange('displayedName')}
                onBlur={handleBlur('displayedName')}
                className="mt-4"
                placeholder="Displayed Name"
                showFeedback={touched.displayedName}
                valid={!errors.displayedName}
                ref={displayedNameInputRef}
                blurOnSubmit={false}
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <StyledTextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                className="mt-4"
                placeholder="Email address"
                showFeedback={touched.email}
                valid={!errors.email}
                blurOnSubmit={false}
                ref={emailInputRef}
                onSubmitEditing={() => handleSubmit()}
              />
              <Text
                className={
                  'w-full text-center text-sm text-[#d9544f] mt-4 min-h-5'
                }
              >
                {(touched.username && errors.username) ||
                  (touched.displayedName && errors.displayedName) ||
                  (touched.email && errors.email) ||
                  error?.message ||
                  ' '}
              </Text>
              <Pressable
                onPress={() => handleSubmit()}
                className={`btn mt-6 ${isValid ? '' : 'opacity-50'}`}
              >
                <Text className="tracking-0.5">Join</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )
}
