import React from "react";
import {
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    "Inter-Semibold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  const [ralewayLoaded] = useFonts({
    "Raleway-Light": Raleway_300Light,
    "Raleway-SemiBold": Raleway_600SemiBold,
    "Raleway-Bold": Raleway_700Bold,
    "Raleway-Regular": Raleway_400Regular,
    "Raleway-Medium": Raleway_500Medium,
  });

  if (!fontsLoaded || !ralewayLoaded) {
    return null;
  } else {
    return <>{children}</>;
  }
};
