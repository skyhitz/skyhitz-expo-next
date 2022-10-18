import { ActivityIndicator, View } from "app/design-system";

export function SplashScreen() {
  return (
    <View className="bg-blue-dark h-full w-full items-center justify-center flex flex-1">
      <ActivityIndicator />
    </View>
  );
}
