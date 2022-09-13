import { useState } from "react";
import {
  ImageInfo,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";

export default function usePickMedia(
  type: "video" | "image",
  validateFile: (_file: ImageInfo) => string | null
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [data, setData] = useState<Blob | null>(null);

  const pickMedia = async () => {
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
    setData(file);
    setLoading(false);
  };

  return { pickMedia, loading, error, data };
}
