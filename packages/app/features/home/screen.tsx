import Navbar from "app/ui/navbar";
import BackgroundImage from "app/ui/backgroundImage";
import Footer from "app/ui/footer";
import { Pressable, View, H1, P, Text } from "app/design-system";
import { useLink } from "solito/link";
import { useSafeArea } from "app/provider/safe-area/useSafeArea";
import { StatusBar } from "react-native";
import ChevronRight from "app/ui/icons/chevron-right";
import { tw } from "app/design-system/tailwind";
import { useRouter } from "solito/router";

export function HomeScreen() {
  const insets = useSafeArea();
  return (
    <View
      className={`w-full h-full flex pt-[${insets.top}px] pb-[${insets.bottom}px]`}
    >
      <BackgroundImage />
      <StatusBar barStyle="light-content" />
      <Navbar />
      <View className="mx-auto text-center flex-1 max-w-xs mt-6 sm:max-w-xl sm:mt-10">
        <H1 className="mt-4 text-center font-raleway text-4xl sm:text-6xl sm:leading-tight">
          Music NFTs on Stellar
        </H1>
        <P className="mx-auto text-center mb-9 max-w-lg font-raleway font-semibold tracking-0.5 text-sm leading-6 mt-9 sm:text-lg sm:mt-8">
          Upload, buy or sell music NFTs on the Stellar Network. Join a
          community of beatmakers!
        </P>
        <View className="android:w-60 ios:w-60 mx-auto">
          <SignUpButton />
          <LogInButton />
          <TryOutButton />
        </View>
      </View>
      <Footer />
    </View>
  );
}

function SignUpButton() {
  const signUpBtnProps = useLink({ href: "/sign-up" });
  return (
    <Pressable
      className="btn bg-white border-2 border-black"
      {...signUpBtnProps}
    >
      <Text className="text-black text-lg font-raleway font-medium leading-none">
        Sign up for free
      </Text>
    </Pressable>
  );
}

function LogInButton() {
  const logInBtnProps = useLink({ href: "/sign-in" });
  return (
    <Pressable
      className="btn w-full mt-2 sm:hidden border-2 border-black"
      {...logInBtnProps}
    >
      <Text className="text-lg text-center font-raleway font-medium leading-none">
        Sign in
      </Text>
    </Pressable>
  );
}

function TryOutButton() {
  const { push } = useRouter();
  return (
    <Pressable
      className="flex flex-row items-center mx-auto mt-8 sm:hidden"
      onPress={() => push("/dashboard/chart")}
    >
      <Text className="text-sm">Try It Out</Text>
      <ChevronRight color={tw.color("white")} />
    </Pressable>
  );
}
