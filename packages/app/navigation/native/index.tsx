import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "app/features/accounts/sign-in";
import { HomeScreen } from "app/features/home/screen";
import { SignUp } from "app/features/accounts/sign-up";
import { useRecoilValue } from "recoil";
import { appInitializedAtom, userAtom } from "app/state/user";
import { SplashScreen } from "app/features/splash/splashScreen";
import { useRouter } from "solito/router";
import { useEffect } from "react";
import { Linking } from "react-native";
import { Config } from "app/config";
import { DashboardNavigation } from "./tab";

const Stack = createNativeStackNavigator<{
  splash: undefined;
  home: undefined;
  search: undefined;
  "sign-in": undefined;
  "sign-up": undefined;
  dashboard: undefined;
}>();

export function NativeNavigation() {
  const user = useRecoilValue(userAtom);
  const initialized = useRecoilValue(appInitializedAtom);
  const { push } = useRouter();

  useEffect(() => {
    Linking.addEventListener("url", (event) => {
      const path = event.url.replace(Config.APP_URL, "");
      push(path);
    });
    const getInitialUrl = async () => {
      const link = await Linking.getInitialURL();
      if (link) {
        const path = link.replace(Config.APP_URL, "");
        push(path);
      }
    };
    getInitialUrl();
  }, [push]);

  useEffect(() => {
    if (initialized && !user) {
      // if the app was initialized, redirect from splash to home screen
      push("/home");
    }
  }, [user, push, initialized]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="dashboard"
        component={DashboardNavigation}
        options={{
          title: "Dashboard",
        }}
      />
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{
          title: "Splash",
        }}
      />

      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Home",
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
    </Stack.Navigator>
  );
}
