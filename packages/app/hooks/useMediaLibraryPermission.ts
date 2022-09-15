import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import { useRouter } from "solito/router";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";

export default function useMediaLibraryPermission() {
  const { back } = useRouter();
  useEffect(() => {
    const getPermissionAsync = async () => {
      const permissions = await requestMediaLibraryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert(
          "Media Library Permission",
          "We need madia library permissions so you can upload beats!",
          [{ text: "OK", onPress: () => back() }]
        );
      }
    };
    if (Platform.OS !== "web") {
      getPermissionAsync();
    }
  }, [back]);
}
