import { Text, Pressable, ActivityIndicator } from 'app/design-system'

import { tw as tailwind } from 'app/design-system/tailwind'

const Button = ({
  loading,
  text,
  onPress,
  tw,
  rightIcon,
  disabled,
}: {
  loading?: boolean
  text: string
  onPress: () => void
  tw?: string
  rightIcon?: JSX.Element
  disabled?: boolean
}) => {
  return (
    <Pressable
      sx={{ ...tailwind.style(tw) }}
      tw="bg-blue/90 flex-row items-center justify-center"
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? <ActivityIndicator size="small" /> : <Text>{text}</Text>}
      {rightIcon && rightIcon}
    </Pressable>
  )
}

export default Button
