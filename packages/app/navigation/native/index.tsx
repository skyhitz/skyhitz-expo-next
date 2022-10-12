import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "app/features/accounts/sign-in";
import { HomeScreen } from "app/features/home/screen";
import { SignUp } from "app/features/accounts/sign-up";
import { SplashScreen } from "app/features/splash/splashScreen";
import { DashboardNavigation } from "./tab";
import TermsScreen from "app/features/legal/termsScreen";
import PrivacyScreen from "app/features/legal/privacyScreen";
import { tw } from "app/design-system/tailwind";
import { useAuthStatus } from "app/hooks/useAuthStatus";
import { useRecoilValue } from "recoil";
import { appInitializedAtom } from "app/state/user";
import { useEffect } from "react";
import { Linking } from "react-native";
import { Config } from "app/config";
import { useRouter } from "solito/router";

const Stack = createNativeStackNavigator<{
  splash: undefined;
  home: undefined;
  search: undefined;
  "sign-in": undefined;
  "sign-up": undefined;
  dashboard: undefined;
  privacy: undefined;
  terms: undefined;
}>();

export function NativeNavigation() {
  const initialized = useRecoilValue(appInitializedAtom);
  const { push } = useRouter();

  useAuthStatus();

  useEffect(() => {
    if (initialized) {
      Linking.addEventListener("url", (event) => {
        const path = event.url.replace(Config.APP_URL, "");
        push(path);
      });

      return () => {
        Linking.removeAllListeners("url");
      };
    }
  }, [push, initialized]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!initialized ? (
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{
            title: "Splash",
          }}
        />
      ) : (
        <>
          {}
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: "Home",
            }}
          />

          <Stack.Screen
            name="dashboard"
            component={DashboardNavigation}
            options={{
              title: "Dashboard",
            }}
          />

          <Stack.Screen
            name="sign-in"
            component={SignIn}
            options={{
              title: "Log In",
            }}
          />
          <Stack.Screen
            name="sign-up"
            component={SignUp}
            options={{
              title: "Sign Up",
            }}
          />
          <Stack.Screen
            name="terms"
            component={TermsScreen}
            options={{
              title: "Terms of Use",
              headerBackTitleVisible: false,
              headerShown: true,
              headerStyle: {
                backgroundColor: tw.color("blue-dark"),
              },
              headerTintColor: tw.color("white"),
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="privacy"
            component={PrivacyScreen}
            options={{
              title: "Privacy Policy",
              headerBackTitleVisible: false,
              headerShown: true,
              headerStyle: {
                backgroundColor: tw.color("blue-dark"),
              },
              headerTintColor: tw.color("white"),
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
