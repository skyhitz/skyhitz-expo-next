import { UserAvatar, UserAvatarProps } from "app/ui/userAvatar";
import { Pressable, Text, View } from "app/design-system";
import React from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

type ChangeUserAvatarProps = Omit<UserAvatarProps, "size"> & {
  handleChange: (_avatar: string) => void;
};

export function ChangeUserAvatar({
  avatarUri,
  displayName,
  handleChange,
}: ChangeUserAvatarProps) {
  async function launchImageLibrary() {
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
      exif: true,
    });

    if (image.cancelled || !image.base64) return;
    handleChange("data:image/jpeg;base64,".concat(image.base64));
  }

  return (
    <View className="flex items-center mt-4 mb-5">
      <UserAvatar
        avatarUri={avatarUri}
        displayName={displayName}
        size="large"
      />
      <Pressable onPress={() => launchImageLibrary()}>
        <Text className="mt-2 font-light text-sm">Change Profile Photo</Text>
      </Pressable>
    </View>
  );
}
