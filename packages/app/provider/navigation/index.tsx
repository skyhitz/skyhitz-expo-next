import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useMemo } from "react";
import { useAuthStatus } from "app/hooks/useAuthStatus";

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthStatus();

  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL("/")],
          config: {
            initialRouteName: "splash",
            screens: {
              splash: "splash",
              home: "home",
              search: "dashboard/search",
              "sign-in": "sign-in",
              "sign-up": "sign-up",
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  );
}
