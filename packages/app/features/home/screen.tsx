import Navbar from "app/ui/navbar";
import BackgroundImage from "app/ui/backgroundImage";
import Footer from "app/ui/footer";
import { Button, View, H1, P } from "app/design-system";
import { useSafeArea } from "app/provider/safe-area/useSafeArea";
import { StatusBar } from "react-native";
import ChevronRight from "app/ui/icons/chevron-right";
import { useRouter } from "solito/router";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

export function HomeScreen() {
  const insets = useSafeArea();
  const user = useRecoilValue(userAtom);
  const { push } = useRouter();

  const goToDashboard = () => {
    push("/dashboard/search");
  };

  const goToSignUp = () => {
    push("/sign-up");
  };

  const goToSignIn = () => {
    push("/sign-in");
  };

  const goToTryItOut = () => {
    push("/dashboard/chart");
  };

  const btnClassName = "btn border-2 border-black mt-2 mx-auto";

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
          {!!user && (
            <Button
              onPress={goToDashboard}
              text="Go to dashboard"
              variant="white"
              className={btnClassName}
            />
          )}
          {!user && (
            <Button
              onPress={goToSignUp}
              text="Sign up for free"
              variant="white"
              className={btnClassName}
            />
          )}
          {!user && (
            <Button
              onPress={goToSignIn}
              text="Sign in"
              variant="primary"
              className={btnClassName}
            />
          )}
          {!user && (
            <Button
              onPress={goToTryItOut}
              text="Try it out"
              variant="text"
              icon={ChevronRight}
              className="sm:hidden"
            />
          )}
        </View>
      </View>
      <Footer />
    </View>
  );
}
