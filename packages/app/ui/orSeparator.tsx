import { Text, View } from "app/design-system";

export function Line({ className = "w-full" }) {
  return (
    <View className={`border border-transparent border-b-white ${className}`} />
  );
}

export function Separator() {
  return (
    <View className="flex flex-row my-8 items-center w-full">
      <Line className="grow" />
      <Text className="px-2">or</Text>
      <Line className="grow" />
    </View>
  );
}
