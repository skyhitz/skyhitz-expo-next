import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignIn } from "app/features/accounts/sign-in"
import { HomeScreen } from "app/features/home/screen"
import { SignUp } from "app/features/accounts/sign-up"
import { SearchScreen } from "app/features/dashboard/search"

const Stack = createNativeStackNavigator<{
  home: undefined
  search: undefined
  "sign-in": undefined
  "sign-up": undefined
}>()

export function NativeNavigation() {
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
        name="search"
        component={SearchScreen}
        options={{
          title: "Search",
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
  )
}
