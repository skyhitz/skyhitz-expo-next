import { SearchScreen } from "app/features/dashboard/search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChartScreen } from "app/features/dashboard/chart";
import { MobileTabBarWrapper } from "app/ui/navigation/mobileTabBarWrapper";
import { ProfileNavigation } from "./profile";
import BeatmakerScreen from "app/features/dashboard/beatmaker";
import { tw } from "app/design-system/tailwind";

const Tab = createBottomTabNavigator<{
  search: undefined;
  chart: undefined;
  profile: undefined;
  beatmaker: {
    id: string;
  };
}>();

export function DashboardNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <MobileTabBarWrapper />}
    >
      <Tab.Screen component={SearchScreen} name="search" />
      <Tab.Screen component={ChartScreen} name="chart" />
      <Tab.Screen component={ProfileNavigation} name="profile" />
      <Tab.Screen
        options={{
          headerShown: true,
          title: "Beatmaker",
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={BeatmakerScreen}
        name="beatmaker"
      />
    </Tab.Navigator>
  );
}
