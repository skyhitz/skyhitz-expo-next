import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { ReactNode, useMemo } from "react";
import { useAuthStatus } from "app/hooks/useAuthStatus";

export function NavigationProvider({ children }: { children: ReactNode }) {
  useAuthStatus();

  return (
    <NavigationContainer
      // TODO: find how to do it right
      // @ts-ignore
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL("/")],
          config: {
            initialRouteName: "splash",
            screens: {
              splash: "splash",
              home: "home",
              "sign-in": "sign-in",
              "sign-up": "sign-up",
              "edit-profile": "edit-profile",
              dashboard: {
                screens: {
                  search: "dashboard/search",
                  chart: "dashboard/chart",
                  profile: "dashboard/profile",
                },
              },
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
