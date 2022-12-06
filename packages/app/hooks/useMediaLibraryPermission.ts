import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useRouter } from "solito/router";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";

type Props = {
  showAlert?: boolean;
};

type Result = {
  permissionGranted: boolean;
};

export default function useMediaLibraryPermission(options?: Props): Result {
  const { back } = useRouter();
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const getPermissionAsync = async () => {
      const permissions = await requestMediaLibraryPermissionsAsync();
      if (!permissions.granted && options?.showAlert) {
        Alert.alert(
          "Media Library Permission",
          "We need madia library permissions so you can upload beats!",
          [{ text: "OK", onPress: () => back() }]
        );
      } else if (permissions.granted) {
        setPermissionGranted(true);
      }
    };
    if (Platform.OS !== "web") {
      getPermissionAsync();
    } else {
      setPermissionGranted(true);
    }
  }, [back]);

  return { permissionGranted };
}
