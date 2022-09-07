import { ActivityIndicator, Text, View } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import { TextProps } from "app/design-system/textInput";
import { IconProps } from "app/types";
import { ReactElement, useState } from "react";
import CheckIcon from "app/ui/icons/check";
import UploadIcon from "app/ui/icons/upload";
import { Pressable } from "react-native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  ImageInfo,
} from "expo-image-picker";

type Props = {
  type: "video" | "image";
  label: string;
  onUploadFinished: (_blob: Blob) => void;
  icon: (_props: IconProps) => ReactElement;
  iconProps?: IconProps;
  containerClassNames?: string;
  validateFile: (_file: ImageInfo) => string | null;
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
}: TextProps & Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onUpload = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes:
        type === "image" ? MediaTypeOptions.Images : MediaTypeOptions.Videos,
      allowsEditing: type === "image",
      aspect: type === "image" ? [1, 1] : undefined,
      quality: 1,
      base64: true,
      exif: true,
    });
    if (!result || result.cancelled) return;
    setLoading(true);
    const error = validateFile(result);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    const response = await fetch(result.uri);
    const file = await response.blob();
    onUploadFinished(file);
    setLoading(false);
    setSuccess(true);
  };

  const UploadWidget = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={tw.color("white")} />;
    }
    if (success) {
      return <CheckIcon size={30} color={tw.color("lightGreen")} />;
    } else {
      return (
        <>
          <Pressable onPress={onUpload}>
            <UploadIcon size={30} color={tw.color("white")} />
          </Pressable>
          {error !== null && <Text className="text-red text-sm ml-5">{error}</Text>}
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
