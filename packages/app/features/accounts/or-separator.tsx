import { Text, View } from 'app/design-system'

const LINE_STYLE = 'border border-transparent border-b-white grow'

export function Separator() {
  return (
    <View className="flex flex-row my-8 items-center w-full">
      <View className={LINE_STYLE} />
      <Text className="px-2">or</Text>
      <View className={LINE_STYLE} />
    </View>
  )
}
