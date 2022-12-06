import { UserAvatar } from "app/ui/userAvatar";
import { ActivityIndicator, Button, View } from "app/design-system";
import React, { useEffect } from "react";
import useMediaLibraryPermission from "app/hooks/useMediaLibraryPermission";
import usePickMedia from "app/hooks/usePickMedia";
import { validateProfilePicture } from "app/validation";
import { ChangeAvatarImg } from "app/types";
import { useToast } from "react-native-toast-notifications";

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
  const toast = useToast();
  const { permissionGranted } = useMediaLibraryPermission();
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
      toast.show(error, { type: "danger" });
    }
  }, [error, toast]);

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
      <Button
        disabled={disable || !permissionGranted}
        onPress={pickMedia}
        text="Change Profile Photo"
        variant="text"
        className="m-0"
      />
    </View>
  );
}
