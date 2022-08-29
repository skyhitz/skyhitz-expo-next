import { Pressable, Text, View } from "app/design-system";
import { openEmail } from "app/utils/email";

export function OpenEmailView() {
  return (
    <View>
      <Text className="flex flex-row items-center text-sm w-full h-12 rounded-lg p-2 bg-gray-700/20">
        We send you an email to access your account!
      </Text>
      <Pressable onPress={() => openEmail()} className="btn mt-4">
        <Text className="tracking-0.5">Open Email</Text>
      </Pressable>
    </View>
  );
}
