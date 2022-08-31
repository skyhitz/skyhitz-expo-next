import React from "react";
import RalewayLight from "app/assets/fonts/Raleway-Light.ttf";
import RalewayMedium from "app/assets/fonts/Raleway-Medium.ttf";
import RalewaySemiBold from "app/assets/fonts/Raleway-SemiBold.ttf";
import { FontDisplay, useFonts } from "expo-font";

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    "Raleway-Light": {
      uri: RalewayLight as any,
      display: FontDisplay.SWAP,
    },
    "Raleway-Medium": {
      uri: RalewayMedium as any,
      display: FontDisplay.SWAP,
    },
    "Raleway-SemiBold": {
      uri: RalewaySemiBold as any,
      display: FontDisplay.SWAP,
    },
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return <>{children}</>;
  }
};
