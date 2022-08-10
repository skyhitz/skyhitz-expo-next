import SocialLinks from './social-links'
import { Text, View } from 'react-native'
import { Link } from 'solito/link'
import { tw } from 'app/design-system/tailwind'

const Footer = () => {
  return (
    <View style={tw`flex-row justify-end h-14 items-center w-full px-8`}>
      <Link href="/accounts/terms">
        <Text style={tw`mr-5 text-white`}>Terms of Use</Text>
      </Link>
      <Link href="/accounts/privacy">
        <Text style={tw`mr-5 text-white`}>Privacy Policy</Text>
      </Link>
      <SocialLinks />
    </View>
  )
}

export default Footer
