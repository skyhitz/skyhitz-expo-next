import Navbar from 'app/ui/navbar'
import BackgroundImage from 'app/ui/background-image'
import Footer from 'app/ui/footer'
import { Button, Text, View } from 'app/design-system'

export function HomeScreen() {
  return (
    <View tw="w-full h-full">
      <BackgroundImage />
      <Navbar />
      <View tw="mt-16 mx-auto text-center" sx={{ width: [300, 400] }}>
        <Text
          tw="mt-4 text-center"
          sx={{
            fontSize: [36, 64],
            lineHeight: [48, 56],
            fontFamily: 'Raleway-Light',
          }}
        >
          Music NFTs on Stellar
        </Text>
        <Text
          tw="mt-4 text-center mb-9 leading-6"
          sx={{ fontFamily: 'Raleway-Light' }}
        >
          Upload, buy or sell music NFTs on the Stellar Network. Join a
          community of beatmakers!
        </Text>
        <Button tw="mt-4 text-lg" text="Sign up for free" onPress={() => {}} />
      </View>
      <Footer />
    </View>
  )
}
