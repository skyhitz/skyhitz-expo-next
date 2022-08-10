import { View } from 'app/design-system'
import Github from 'app/ui/icons/github'
import Insta from 'app/ui/icons/instagram'
import Discord from 'app/ui/icons/discord'
import Twitter from 'app/ui/icons/twitter'

const SocialLinks = () => {
  return (
    <View tw="flex flex-row">
      <View tw="mr-2">
        <Twitter />
      </View>
      <View tw="mr-2">
        <Discord />
      </View>
      <View tw="mr-2">
        <Insta />
      </View>
      <View>
        <Github />
      </View>
      {/*<A*/}
      {/*  style={tw`mr-2`}*/}
      {/*  href="https://twitter.com/skyhitz"*/}
      {/*  aria-label="Read more about Skyhitz on twitter"*/}
      {/*  // @ts-expect-error react-native-web only types*/}
      {/*  hrefAttrs={{*/}
      {/*    target: '_blank',*/}
      {/*    rel: 'noreferrer',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Twitter />*/}
      {/*</A>*/}
      {/*<A*/}
      {/*  style={tw`mr-2`}*/}
      {/*  href="https://discord.gg/2C3HzsPEuZ"*/}
      {/*  aria-label="Join our server on Discord"*/}
      {/*  // @ts-expect-error react-native-web only types*/}
      {/*  hrefAttrs={{*/}
      {/*    target: '_blank',*/}
      {/*    rel: 'noreferrer',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Discord />*/}
      {/*</A>*/}
      {/*<A*/}
      {/*  style={tw`mr-2 text-white`}*/}
      {/*  href="https://instagram.com/skyhitz"*/}
      {/*  aria-label="Read more about Skyhitz on instagram"*/}
      {/*  // @ts-expect-error react-native-web only types*/}
      {/*  hrefAttrs={{*/}
      {/*    target: '_blank',*/}
      {/*    rel: 'noreferrer',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Insta />*/}
      {/*</A>*/}
      {/*<A*/}
      {/*  href="https://github.com/skyhitz"*/}
      {/*  aria-label="Audit the code of Skyhitz on github"*/}
      {/*  // @ts-expect-error react-native-web only types*/}
      {/*  hrefAttrs={{*/}
      {/*    target: '_blank',*/}
      {/*    rel: 'noreferrer',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Github />*/}
      {/*</A>*/}
    </View>
  )
}

export default SocialLinks
