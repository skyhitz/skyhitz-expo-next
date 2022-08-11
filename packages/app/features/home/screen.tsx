import Navbar from 'app/ui/navbar'
import BackgroundImage from 'app/ui/background-image'
import Footer from 'app/ui/footer'
import { Pressable, Text, View } from 'app/design-system'
import { useLink } from 'solito/link'

export function HomeScreen() {
  return (
    <View className="w-full h-full flex flex-col h-full">
      <BackgroundImage />
      <Navbar />
      <View className="mx-auto text-center flex-1 max-w-[300px] mt-6 sm:max-w-[600px] sm:mt-10">
        <Text className="mt-4 text-center font-raleway text-4xl sm:text-[4rem] sm:leading-[4.75rem]">
          Music NFTs on Stellar
        </Text>
        <Text className="mx-auto text-center mb-9 max-w-[500px] font-raleway font-semibold tracking-0.5 text-sm leading-6 mt-9 sm:text-base sm:mt-8">
          Upload, buy or sell music NFTs on the Stellar Network. Join a
          community of beatmakers!
        </Text>
        <View className="android:w-60 ios:w-60 mx-auto">
          <SignUpButton />
          <LogInButton />
        </View>
      </View>
      <Footer />
    </View>
  )
}

function SignUpButton() {
  return (
    <Pressable className="btn bg-white border-2 border-black">
      <Text className="text-black text-lg font-raleway font-medium leading-none">
        Sign up for free
      </Text>
    </Pressable>
  )
}

function LogInButton() {
  const logInBtnProps = useLink({ href: '/log-in' })
  return (
    <Pressable
      className="btn w-full mt-2 sm:hidden border-2 border-black"
      {...logInBtnProps}
    >
      <Text className="text-lg text-center font-raleway font-medium leading-none">
        Sign in
      </Text>
    </Pressable>
  )
}
