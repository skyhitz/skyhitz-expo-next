import { useState } from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { MediaFileInfo } from "app/types";
import * as DocumentPicker from "expo-document-picker";
import { SUPPORTED_MIME_TYPES } from "app/validation";

type usePickMediaReturn = {
  pickMedia: () => Promise<void>;
  loading: boolean;
  error: string | null;
  media: MediaFileInfo | null;
};

export default function usePickMedia(
  type: "other" | "image",
  validateFile: (file: MediaFileInfo) => string | null
): usePickMediaReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [media, setMedia] = useState<MediaFileInfo | null>(null);

  const pickMedia = async () => {
    setError(null);
    setMedia(null);
    setLoading(true);
    let result: MediaFileInfo;
    if (type === "image") {
      const file = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
        exif: true,
      });
      if (!file || file.cancelled) return;

      result = { image: true, ...file };
    } else {
      const file = await DocumentPicker.getDocumentAsync({
        type: SUPPORTED_MIME_TYPES,
      });
      if (!file || file.type === "cancel") return;
      result = { image: false, uri: file.uri, mimeType: file.mimeType ?? "" };
    }

    const error = validateFile(result);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    setMedia(result);
    setLoading(false);
  };

  return { pickMedia, loading, error, media };
}
