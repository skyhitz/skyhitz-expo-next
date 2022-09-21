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
              home: "",
              "sign-in": "sign-in",
              "sign-up": "sign-up",
              dashboard: {
                screens: {
                  search: {
                    path: "dashboard/search",
                    screens: {
                      "search-for": "",
                      beatmaker: "beatmaker/:id",
                    },
                  },
                  chart: "dashboard/chart",
                  profile: {
                    path: "dashboard/profile",
                    screens: {
                      "user-details": "",
                      mint: "mint",
                      edit: "edit",
                      likes: "likes",
                      collection: "collection",
                    },
                  },
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
