import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { ChartScreen } from "app/features/dashboard/chart";
import { MobileTabBarWrapper } from "app/ui/navigation/mobileTabBarWrapper";
import { ProfileNavigation } from "./profile";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { SearchNavigation } from "app/navigation/native/search";

const Tab = createBottomTabNavigator<{
  search: undefined;
  chart: undefined;
  profile: undefined;
}>();

export function DashboardNavigation() {
  const user = useRecoilValue(userAtom);

  const GetWrapperWithHighlightedTab = (props: BottomTabBarProps) => {
    const state = props.state;
    const index = state.index;

    const tabName = state.routeNames[index] || "";
    return <MobileTabBarWrapper currentTabName={tabName} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={GetWrapperWithHighlightedTab}
    >
      <Tab.Screen component={SearchNavigation} name="search" />
      <Tab.Screen component={ChartScreen} name="chart" />
      {user ? (
        <>
          <Tab.Screen component={ProfileNavigation} name="profile" />
        </>
      ) : (
        <></>
      )}
    </Tab.Navigator>
  );
}
