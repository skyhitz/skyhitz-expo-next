import { Text, View } from 'app/design-system'

const Line = () => (
  <View className="border border-transparent border-b-white grow" />
)

export function Separator() {
  return (
    <View className="flex flex-row my-8 items-center w-full">
      <Line />
      <Text className="px-2">or</Text>
      <Line />
    </View>
  )
}
