import {
  NativeSyntheticEvent,
  TextInput as rTextInput,
  TextInputChangeEventData,
} from 'react-native'
import { Ref, useState } from 'react'
import { TextInput, View } from 'app/design-system'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

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

export function StyledInput({
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
