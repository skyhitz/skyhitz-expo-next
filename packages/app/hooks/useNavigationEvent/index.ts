import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export function useNavigationEvent(
  eventName: "focus" | "blur" | "state" | "beforeRemove",
  eventHandler: () => void
) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener(eventName, () => {
      eventHandler();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
}
