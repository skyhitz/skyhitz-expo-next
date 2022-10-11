import { ActivityIndicator, Text, View } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import { TextProps } from "app/design-system/textInput";
import { IconProps } from "app/types";
import { ReactElement, useEffect } from "react";
import CheckIcon from "app/ui/icons/check";
import UploadIcon from "app/ui/icons/upload";
import { Pressable } from "react-native";
import { ImageInfo } from "expo-image-picker";
import XIcon from "app/ui/icons/x";
import usePickMedia from "app/hooks/usePickMedia";

type Props = {
  type: "video" | "image";
  label: string;
  onUploadFinished: (_blob: Blob) => void;
  onClear: () => void;
  icon: (_props: IconProps) => ReactElement;
  iconProps?: IconProps;
  containerClassNames?: string;
  validateFile: (_file: ImageInfo) => string | null;
  success: boolean;
};

const defaultIconProps = {
  color: tw.color("white"),
  size: 22,
};

export function UploadInputWithIcon({
  type,
  icon,
  label,
  onUploadFinished,
  validateFile,
  iconProps,
  containerClassNames,
  onClear,
  success,
}: TextProps & Props) {
  const { pickMedia, loading, error, data } = usePickMedia(type, validateFile);

  useEffect(() => {
    if (data) {
      onUploadFinished(data);
    }
  }, [data, onUploadFinished]);

  const UploadWidget = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={tw.color("white")} />;
    }
    if (success) {
      return (
        <View className="flex-row justify-between flex-1 pr-4 items-center">
          <CheckIcon size={30} color={tw.color("lightGreen")} />
          <Pressable onPress={onClear}>
            <XIcon size={30} color={tw.color("white")} />
          </Pressable>
        </View>
      );
    } else {
      return (
        <>
          <Pressable onPress={pickMedia}>
            <UploadIcon size={30} color={tw.color("white")} />
          </Pressable>
          {error !== null && (
            <Text className="text-red text-sm ml-5">{error}</Text>
          )}
        </>
      );
    }
  };

  return (
    <View className={`flex flex-row py-5 items-center ${containerClassNames}`}>
      {icon(iconProps ?? defaultIconProps)}
      <Text className="mx-4 text-sm w-20">{label}</Text>
      <UploadWidget />
    </View>
  );
}
