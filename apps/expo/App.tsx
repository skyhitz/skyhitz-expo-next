import { NativeNavigation } from "app/navigation/native";
import { Provider } from "app/provider";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { tw } from "app/design-system/tailwind";
import { Platform } from "react-native";

export default function App() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(tw.color("blue-dark")!);
    }
  }, []);

  return (
    <Provider>
      <StatusBar translucent />
      <NativeNavigation />
    </Provider>
  );
}
