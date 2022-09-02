import { Text, View } from "app/design-system";
import React from "react";

export function UploadProfilePictureBanner() {
  return (
    <View className="w-full bg-red p-4">
      <Text className="mx-auto text-sm">Upload a profile picture</Text>
    </View>
  );
}
