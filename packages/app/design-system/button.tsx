import { ActivityIndicator, Pressable, Text } from 'react-native'
import tailwind from 'twrnc'

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
      style={tailwind.style(
        'bg-blue/90 flex-row items-center justify-center rounded-full h-11',
        tw
      )}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? <ActivityIndicator size="small" /> : <Text>{text}</Text>}
      {rightIcon && rightIcon}
    </Pressable>
  )
}

export { Button }
