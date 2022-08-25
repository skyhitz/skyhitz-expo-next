import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignIn } from "app/features/accounts/sign-in";
import { HomeScreen } from "app/features/home/screen";
import { UserDetailScreen } from "app/features/user/detail-screen";
import { SignUp } from "app/features/accounts/sign-up";
import BackgroundImage from "app/ui/background-image";
import DashboardTabBar from "app/ui/dashboard-tab-bar";
import SearchView from "app/features/dashboard/search-view";
import { SafeAreaView } from "app/design-system/safe-area-view";

const Stack = createNativeStackNavigator<{
  splash: undefined;
  home: undefined;
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
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: "User",
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
        name="dashboard"
        component={DashboardNavigation}
        options={{
          title: "Dashboard",
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<{
  search: undefined;
  chart: undefined;
  profile: undefined;
}>();

const SearchScreen = () => (
  <SafeAreaView className="flex-1 flex h-full w-full bg-blue-dark">
    <SearchView />
  </SafeAreaView>
);

function DashboardNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({}) => {
        return TabBarAdapter();
      }}
    >
      <Tab.Screen component={SearchScreen} name="search" />
      <Tab.Screen component={BackgroundImage} name="chart" />
      <Tab.Screen component={BackgroundImage} name="profile" />
    </Tab.Navigator>
  );
}

function TabBarAdapter() {
  return <DashboardTabBar />;
}
