import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { tw } from "app/design-system/tailwind";
import { SearchScreen } from "app/features/dashboard/search";
import BeatmakerScreen from "app/features/dashboard/beatmaker";
import BeatScreen from "app/features/dashboard/beat";

const SearchStack = createNativeStackNavigator<{
  "search-for": undefined;
  beatmaker: {
    id: string;
  };
  beat: {
    id: string;
  };
}>();

export function SearchNavigation() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        component={SearchScreen}
        name="search-for"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        component={BeatmakerScreen}
        name="beatmaker"
        options={{
          title: "Beatmaker",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <SearchStack.Screen
        component={BeatScreen}
        name="beat"
        options={{
          title: "Beat",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: tw.color("blue-dark"),
          },
          headerTintColor: tw.color("white"),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </SearchStack.Navigator>
  );
}
