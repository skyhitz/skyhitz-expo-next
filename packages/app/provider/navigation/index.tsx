import { NavigationContainer } from "@react-navigation/native";
import { tw } from "app/design-system/tailwind";
import * as Linking from "expo-linking";
import { ReactNode, useMemo } from "react";

export function NavigationProvider({ children }: { children: ReactNode }) {
  return (
    <NavigationContainer
      // TODO: find how to do it right
      // @ts-ignore
      theme={{
        dark: false,
        colors: {
          primary: tw.color("blue")!,
          background: tw.color("blue-dark")!,
          card: tw.color("blue-dark")!,
          text: tw.color("white")!,
          border: tw.color("white")!,
          notification: tw.color("blue-dark")!,
        },
      }}
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
              privacy: "privacy",
              terms: "terms",
              dashboard: {
                path: "dashboard",
                screens: {
                  search: {
                    screens: {
                      "search-for": "search",
                      beatmaker: "beatmaker/:id",
                      beat: "beat/:id",
                    },
                  },
                  chart: "chart",
                  profile: {
                    path: "profile",
                    screens: {
                      "user-details": "",
                      mint: "mint",
                      edit: "edit",
                      likes: "likes",
                      collection: "collection",
                      bids: "bids",
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
