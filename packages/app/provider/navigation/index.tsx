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
