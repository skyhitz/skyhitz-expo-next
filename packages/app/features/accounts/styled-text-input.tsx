import { TextInput, View } from 'app/design-system'
import { TextInput as rTextInput } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { TextProps } from 'app/design-system/text-input'
import React, { ForwardedRef } from 'react'

type StyledInputProps = TextProps & {
  valid?: boolean
  showFeedback?: boolean
}

const StyledTextInput = React.forwardRef(function StyledTextInput(
  { className, valid, value, showFeedback, ...rest }: StyledInputProps,
  ref: ForwardedRef<rTextInput>
) {
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
        {...rest}
        ref={ref}
      />
      {showFeedback && (
        <Icon
          name={valid ? 'check-circle-outline' : 'close-circle-outline'}
          size={24}
          color={valid ? '#0EAC8DCC' : '#d9544f'}
        />
      )}
    </View>
  )
})

export default StyledTextInput
