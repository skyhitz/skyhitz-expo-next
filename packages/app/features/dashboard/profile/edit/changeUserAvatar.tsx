import { UserAvatar } from "app/ui/userAvatar";
import { ActivityIndicator, Pressable, Text, View } from "app/design-system";
import React, { useEffect } from "react";
import useMediaLibraryPermission from "app/hooks/useMediaLibraryPermission";
import usePickMedia from "app/hooks/usePickMedia";
import { validateProfilePicture } from "app/validation";
import { ChangeAvatarImg } from "app/types";

type ChangeUserAvatarProps = {
  avatarImg: ChangeAvatarImg;
  displayName?: string | null;
  onChange: (_avatar: ChangeAvatarImg) => void;
  disable?: boolean;
};

export function ChangeUserAvatar({
  avatarImg,
  displayName,
  onChange,
  disable,
}: ChangeUserAvatarProps) {
  useMediaLibraryPermission();
  const { pickMedia, loading, error, data, url } = usePickMedia(
    "image",
    validateProfilePicture
  );

  useEffect(() => {
    if (data && url) {
      onChange({
        blob: data,
        url,
      });
    }
  }, [data, url, onChange]);

  useEffect(() => {
    if (error) {
      //TODO: toast(error);
    }
  }, [error]);

  return (
    <View className="flex items-center mt-4 mb-5">
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <UserAvatar
          avatarUrl={avatarImg.url}
          displayName={displayName}
          size="large"
        />
      )}
      <Pressable disabled={disable} onPress={pickMedia}>
        <Text className="mt-2 font-light text-sm">Change Profile Photo</Text>
      </Pressable>
    </View>
  );
}
