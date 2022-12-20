import { useState } from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { MediaFileInfo } from "app/types";
import * as DocumentPicker from "expo-document-picker";
import { SUPPORTED_MIME_TYPES } from "app/validation";

type usePickMediaReturn = {
  pickMedia: () => Promise<void>;
  loading: boolean;
  error: string | null;
  data: Blob | null;
  url: string;
};

export default function usePickMedia(
  type: "other" | "image",
  validateFile: (file: MediaFileInfo) => string | null
): usePickMediaReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [data, setData] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string>("");

  const pickMedia = async () => {
    setError(null);
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
      if (!file || !file.assets || file.assets.length !== 1 || !file.assets[0])
        return;

      result = { image: true, ...file.assets[0] };
    } else {
      const file = await DocumentPicker.getDocumentAsync({
        type: SUPPORTED_MIME_TYPES,
      });
      if (!file || file.type === "cancel") return;
      result = { image: false, uri: file.uri, mimeType: file.mimeType ?? "" };
    }

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
    setUrl(result.uri);
    setLoading(false);
  };

  return { pickMedia, loading, error, data, url };
}
