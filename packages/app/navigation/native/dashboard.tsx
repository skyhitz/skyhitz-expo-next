import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BeatmakerScreen from "app/features/dashboard/beatmaker";
import { DashboardTabNavigation } from "app/navigation/native/tab";
import { tw } from "app/design-system/tailwind";

const Stack = createNativeStackNavigator<{
  tabs: undefined;
  beatmaker: {
    id: string;
  };
}>();

export function Dashboard() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
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
        name="beatmaker"
        component={BeatmakerScreen}
      />
      <Stack.Screen name="tabs" component={DashboardTabNavigation} />
    </Stack.Navigator>
  );
}
