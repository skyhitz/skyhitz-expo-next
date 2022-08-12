import {
  KeyboardAvoidingView as NativeKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native'
import { useSx } from 'dripsy'
import { tw } from 'app/design-system/tailwind'

type Props = KeyboardAvoidingViewProps & {
  className?: string
}

export default function KeyboardAvoidingView({
  className,
  style,
  ...rest
}: Props) {
  useSx()
  return (
    <NativeKeyboardAvoidingView
      style={[tw.style(className), style]}
      {...rest}
    />
  )
}
