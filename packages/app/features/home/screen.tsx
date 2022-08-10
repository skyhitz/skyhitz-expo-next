import Navbar from 'app/ui/navbar'
import BackgroundImage from 'app/ui/background-image'
import Footer from 'app/ui/footer'
import { Pressable, Text, View } from 'react-native'
import { tw } from 'app/design-system/tailwind'
import { useLink } from 'solito/link'

export function HomeScreen() {
  return (
    <View style={tw`w-full h-full flex flex-col h-full`}>
      <BackgroundImage />
      <Navbar />
      <View
        style={tw`mx-auto text-center flex-1 w-[300px] md:w-[600px] mt-6 md:mt-10`}
      >
        <Text
          style={tw`mt-4 text-center text-white font-raleway text-4xl md:text-[64px] md:leading-[76px]`}
        >
          Music NFTs on Stellar
        </Text>
        <Text
          style={tw`mx-auto text-center text-white mb-9 max-w-[500px] font-raleway font-semibold tracking-0.5 leading-6 md:text-lg mt-9 md:mt-8`}
        >
          Upload, buy or sell music NFTs on the Stellar Network. Join a
          community of beatmakers!
        </Text>
        <SignUpButton />
      </View>
      <Footer />
    </View>
  )
}

function SignUpButton() {
  const link = useLink({ href: '/sign-up' })
  return (
    <Pressable
      style={tw`mx-auto bg-white border-2 border-black rounded-full py-3 px-8`}
      {...link}
    >
      <Text style={tw`text-black text-lg font-raleway font-medium`}>
        Sign up for free
      </Text>
    </Pressable>
  )
}
