import Navbar from 'app/ui/navbar'
import BackgroundImage from 'app/ui/background-image'
import Footer from 'app/ui/footer'
import { Pressable, Text, View } from 'app/design-system'

export function HomeScreen() {
  return (
    <View tw="w-full h-full">
      <BackgroundImage />
      <Navbar />
      <View tw="mx-auto text-center" sx={{ width: [300, 600], mt: [56, 100] }}>
        <Text
          tw="mt-4 text-center font-raleway"
          sx={{
            fontSize: [36, 64],
            lineHeight: [40, 76],
          }}
        >
          Music NFTs on Stellar
        </Text>
        <Text
          tw="mx-auto text-center mb-9 max-w-[500px] font-raleway font-semibold"
          sx={{
            fontSize: [16, 18],
            letterSpacing: 2,
            lineHeight: 24,
            marginTop: [38, 32],
          }}
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
  return (
    <Pressable tw="mx-auto bg-white border-2 border-black rounded-full py-3 px-8">
      <Text tw="text-black text-lg font-raleway font-medium">
        Sign up for free
      </Text>
    </Pressable>
  )
}
