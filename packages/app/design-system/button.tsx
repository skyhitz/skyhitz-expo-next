import { Text } from 'app/design-system/text'
import { Pressable } from 'app/design-system/pressable'
import { ActivityIndicator } from 'app/design-system/activity-indicator'

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
      tw="bg-blue/90 flex-row items-center justify-center rounded-full h-11"
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? <ActivityIndicator size="small" /> : <Text>{text}</Text>}
      {rightIcon && rightIcon}
    </Pressable>
  )
}

export { Button }
