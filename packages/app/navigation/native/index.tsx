import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "app/features/accounts/sign-in";
import { HomeScreen } from "app/features/home/screen";
import { SignUp } from "app/features/accounts/sign-up";
import { SearchScreen } from "app/features/dashboard/search";
import { useRecoilValue } from "recoil";
import { appInitializedAtom, userAtom } from "app/state/atoms";
import { SplashScreen } from "app/features/splash/splash-screen";
import { useRouter } from "solito/router";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChartScreen } from "app/features/dashboard/chart";
import { ProfileScreen } from "app/features/dashboard/profile";
import DashboardTabBar from "app/ui/dashboard-tab-bar";

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
      {user ? (
        <Stack.Screen
          name="dashboard"
          component={DashboardNavigation}
          options={{
            title: "Dashboard",
          }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<{
  search: undefined;
  chart: undefined;
  profile: undefined;
}>();

function DashboardNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <DashboardTabBar />}
    >
      <Tab.Screen component={SearchScreen} name="search" />
      <Tab.Screen component={ChartScreen} name="chart" />
      <Tab.Screen component={ProfileScreen} name="profile" />
    </Tab.Navigator>
  );
}
