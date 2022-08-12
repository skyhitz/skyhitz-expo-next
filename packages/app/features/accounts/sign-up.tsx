import { Pressable, Text, TextInput, View } from 'app/design-system'
import {
  NativeSyntheticEvent,
  Platform,
  TextInput as rTextInput,
  TextInputChangeEventData,
} from 'react-native'
import BackgroundImage from 'app/ui/background-image'
import WalletconnectBtn from 'app/ui/walletconnect-btn'
import { Ref, useState } from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import {
  validateDisplayName,
  validateEmail,
  validateUsername,
  ValidationResult,
} from 'app/features/accounts/validators'
import KeyboardAvoidingView from 'app/design-system/keyboard-avoiding-view'

function useValidation<T>(
  initialState: T,
  validationFunction: (val: T) => ValidationResult
) {
  const [state, setState] = useState(initialState)
  const [firstChangeLatch, setFirstChangeLatch] = useState(false)
  const validationResult = validationFunction(state)
  const setStateWithLatch = (s: T) => {
    setFirstChangeLatch(true)
    setState(s)
  }

  return {
    state,
    setState: setStateWithLatch,
    ...validationResult,
    firstChangeLatch,
  }
}

export function SignUp() {
  const username = useValidation('', validateUsername)
  const displayedName = useValidation('', validateDisplayName)
  const email = useValidation('', validateEmail)
  const isFormValid = username.isValid && displayedName.isValid && email.isValid

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      <BackgroundImage />
      <View className="w-72 md:w-96">
        <WalletconnectBtn />
        <Separator />
        <StyledInput
          value={username.state}
          onChangeText={username.setState}
          placeholder="Username"
          autofocus={true}
          valid={username.isValid}
        />
        <StyledInput
          value={displayedName.state}
          placeholder="Display Name"
          className="mt-4"
          onChangeText={displayedName.setState}
          valid={displayedName.isValid}
        />
        <StyledInput
          value={email.state}
          placeholder="Email address"
          className="mt-4"
          onChangeText={email.setState}
          valid={email.isValid}
        />
        <Text
          className={'w-full text-center text-sm text-[#d9544f] mt-4 min-h-5'}
        >
          {(username.firstChangeLatch && username.errorMsg) ||
            (displayedName.firstChangeLatch && displayedName.errorMsg) ||
            (email.firstChangeLatch && email.errorMsg) ||
            ' '}
        </Text>
        <Pressable className={`btn mt-6 ${isFormValid ? '' : 'opacity-50'}`}>
          <Text className="tracking-0.5">Join</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

interface StyledInputProps {
  placeholder: string
  autofocus?: boolean
  value?: string
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  onChangeText?: (s: string) => void
  className?: string
  valid?: boolean
  inputRef?: Ref<rTextInput>
}

function StyledInput({
  className,
  valid,
  value,
  onChange,
  ...rest
}: StyledInputProps) {
  const [firstInputLatch, setFirstInputLatch] = useState(false)

  return (
    <View
      className={'flex flex-row items-center w-full h-12 rounded-lg p-2 bg-gray-700/20 '.concat(
        className ?? ''
      )}
    >
      <TextInput
        placeholderTextColor="white"
        autoCapitalize="none"
        className="text-white text-sm grow leading-none remove-font-padding"
        value={value}
        onChange={(e) => {
          setFirstInputLatch(true)
          onChange?.apply(e)
        }}
        {...rest}
      />
      <Icon
        name={valid ? 'check-circle-outline' : 'close-circle-outline'}
        size={24}
        style={{
          display: firstInputLatch ? 'flex' : 'none',
        }}
        color={valid ? '#0EAC8DCC' : '#d9544f'}
      />
    </View>
  )
}

const LINE_STYLE = 'border border-transparent border-b-white grow'

function Separator() {
  return (
    <View className="flex flex-row my-8 items-center w-full">
      <View className={LINE_STYLE} />
      <Text>or</Text>
      <View className={LINE_STYLE} />
    </View>
  )
}
