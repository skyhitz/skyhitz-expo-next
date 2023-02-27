import { Button, View } from "app/design-system";
import useMediaLibraryPermission from "app/hooks/useMediaLibraryPermission";
import usePickMedia from "app/hooks/usePickMedia";
import { ChangeImage, MediaFileInfo } from "app/types";
import {
  validateProfilePicture,
  validateBackgroundImage,
} from "app/validation";
import { useEffect } from "react";
import { useToast } from "react-native-toast-notifications";

type Props = {
  onAvatarChange: (newAvatar: ChangeImage) => void;
  onBackgroundChange: (newBackground: ChangeImage) => void;
  activeSubmission: boolean;
};

export function ChangeImages({
  onAvatarChange,
  onBackgroundChange,
  activeSubmission,
}: Props) {
  return (
    <View className="flex md:flex-row">
      <ChangeImageButton
        text="Change Profile Photo"
        onChange={onAvatarChange}
        classNames="mb-2 md:mb-0 md:mr-2"
        validator={validateProfilePicture}
        activeSubmission={activeSubmission}
      />
      <ChangeImageButton
        text="Change Background"
        onChange={onBackgroundChange}
        validator={validateBackgroundImage}
        activeSubmission={activeSubmission}
      />
    </View>
  );
}

function ChangeImageButton({
  text,
  onChange,
  classNames,
  validator,
  activeSubmission,
}: {
  text: string;
  onChange: (newImage: ChangeImage) => void;
  classNames?: string;
  validator: (file: MediaFileInfo) => string | null;
  activeSubmission: boolean;
}) {
  const toast = useToast();
  const { permissionGranted } = useMediaLibraryPermission();
  const { pickMedia, loading, error, data, url } = usePickMedia(
    "image",
    validator
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
    <Button
      disabled={!permissionGranted || loading || activeSubmission}
      loading={loading}
      onPress={pickMedia}
      text={text}
      variant="primary"
      className={`p-2 h-10 w-50 ${classNames ?? ""}`}
    />
  );
}
