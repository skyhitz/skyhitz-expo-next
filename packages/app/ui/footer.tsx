import SocialLinks from './social-links'
import { View } from 'app/design-system'
import { TextLink } from 'solito/link'

const Footer = () => {
  return (
    <View tw="flex-row justify-end h-14 mt-5 items-center width[94%] absolute bottom-0">
      <TextLink href="/accounts/terms">Terms of Use</TextLink>
      <TextLink href="/accounts/privacy">Privacy Policy</TextLink>
      <SocialLinks />
    </View>
  )
}

export default Footer
