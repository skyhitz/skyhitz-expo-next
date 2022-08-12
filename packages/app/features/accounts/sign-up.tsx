import { Pressable, Text, View } from 'app/design-system'
import { Platform } from 'react-native'
import BackgroundImage from 'app/ui/background-image'
import WalletconnectBtn from 'app/ui/walletconnect-btn'
import {
  validateDisplayName,
  validateEmail,
  validateUsername,
} from 'app/features/accounts/validators'
import KeyboardAvoidingView from 'app/design-system/keyboard-avoiding-view'
import { Separator } from 'app/features/accounts/or-separator'
import { StyledInput } from 'app/features/accounts/styled-input'
import { useValidation } from 'app/hooks/use-validation'

export function SignUp() {
  const username = useValidation<string>('', validateUsername)
  const displayedName = useValidation<string>('', validateDisplayName)
  const email = useValidation<string>('', validateEmail)
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
