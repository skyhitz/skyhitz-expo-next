import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignIn } from "app/features/accounts/sign-in"
import { HomeScreen } from "app/features/home/screen"
import { SignUp } from "app/features/accounts/sign-up"
import { SearchScreen } from "app/features/dashboard/search"
import { useRecoilValue } from "recoil"
import { appInitializedAtom, userAtom } from "app/state/atoms"
import { useAuthStatus } from "app/hooks/useAuthStatus"
import { useLogIn } from "app/hooks/useLogIn"
import { SplashScreen } from "../../features/splash/splash-screen"
import { useRouter } from "solito/router"
import { useEffect } from "react"

const Stack = createNativeStackNavigator<{
  splash: undefined
  home: undefined
  search: undefined
  "sign-in": undefined
  "sign-up": undefined
}>()

export function NativeNavigation() {
  const user = useRecoilValue(userAtom)
  const initialized = useRecoilValue(appInitializedAtom)
  const { push } = useRouter()

  useEffect(() => {
    if (initialized && !user) {
      push("/home")
    }
  }, [user, push, initialized])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen
          name="search"
          component={SearchScreen}
          options={{
            title: "Search",
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
  )
}
