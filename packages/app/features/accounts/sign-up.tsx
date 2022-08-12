import { Pressable, Text, TextInput, View } from 'app/design-system'
import {
  NativeSyntheticEvent,
  TextInput as rTextInput,
  TextInputChangeEventData,
} from 'react-native'
import BackgroundImage from 'app/ui/background-image'
import WalletconnectBtn from 'app/ui/walletconnect-btn'
import { Ref, useState } from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

interface StyledInputProps {
  placeholder: string
  autofocus?: boolean
  value?: string
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  onChangeText?: (string) => void
  className?: string
  valid?: boolean
  inputRef?: Ref<rTextInput>
}

function StyledInput({ className, valid, value, ...rest }: StyledInputProps) {
  return (
    <View
      className={'flex flex-row items-center w-full h-12 rounded-lg p-2 bg-gray-700/20 '.concat(
        className ?? ''
      )}
    >
      <TextInput
        placeholderTextColor="white"
        autoCapitalize="none"
        className="text-white text-sm grow leading-none"
        value={value}
        {...rest}
      />
      <Icon
        name={valid ? 'check-circle-outline' : 'close-circle-outline'}
        size={24}
        style={{
          display: value === '' ? 'none' : 'flex',
        }}
        color={valid ? '#0EAC8DCC' : '#d9544f'}
      />
    </View>
  )
}

export function SignUp() {
  const [username, setUsername] = useState('')
  const [displayedName, setDisplayedName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <View className="w-full h-full flex items-center justify-center pb-16">
      <BackgroundImage />
      <View className="w-72 md:w-96">
        <WalletconnectBtn />
        <Separator />
        <StyledInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autofocus={true}
        />
        <StyledInput
          value={displayedName}
          placeholder="Display Name"
          className="mt-4"
          onChangeText={setDisplayedName}
        />
        <StyledInput
          value={email}
          placeholder="Email address"
          className="mt-4"
          onChangeText={setEmail}
        />
        <Pressable className="btn mt-6 opacity-50">
          <Text className="tracking-0.5">Join</Text>
        </Pressable>
      </View>
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
