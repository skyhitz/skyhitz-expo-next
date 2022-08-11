import SocialLinks from './social-links'
import { TextLink, View } from 'app/design-system'

const Footer = () => {
  return (
    <View className="flex-row justify-end h-14 items-center w-full px-8">
      <TextLink tw="mr-5" href="/accounts/terms">
        Terms of Use
      </TextLink>
      <TextLink tw="mr-5" href="/accounts/privacy">
        Privacy Policy
      </TextLink>
      <SocialLinks />
    </View>
  )
}

export default Footer
