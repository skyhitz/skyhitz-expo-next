import { Button } from "app/design-system";
import React, { useEffect } from "react";
import useMediaLibraryPermission from "app/hooks/useMediaLibraryPermission";
import usePickMedia from "app/hooks/usePickMedia";
import { validateBackgroundImage } from "app/validation";
import { ChangeBackgroundImg } from "app/types";
import { useToast } from "react-native-toast-notifications";
import Image from "app/ui/icons/image";
import { tw } from "app/design-system/tailwind";

type ChangeUserBackgroundProps = {
  backgroundImg: ChangeBackgroundImg;
  onChange: (_avatar: ChangeBackgroundImg) => void;
  disable?: boolean;
};

export function ChangeUserBackground({
  onChange,
  disable,
}: ChangeUserBackgroundProps) {
  const toast = useToast();
  const { permissionGranted } = useMediaLibraryPermission();
  const { pickMedia, error, data, url } = usePickMedia(
    "image",
    validateBackgroundImage
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
      disabled={disable || !permissionGranted}
      onPress={pickMedia}
      icon={Image}
      text="Change Background Photo"
      variant="text"
      iconProps={{
        color:
          disable || !permissionGranted ? tw.color("grey") : tw.color("white"),
        size: 40,
      }}
      className="m-0"
    />
  );
}
