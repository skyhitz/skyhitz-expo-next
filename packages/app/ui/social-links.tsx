import { View } from "app/design-system"
import { A } from "dripsy"
import Github from "app/ui/icons/github"
import Insta from "app/ui/icons/instagram"
import Discord from "app/ui/icons/discord"
import Twitter from "app/ui/icons/twitter"

const SocialLinks = () => {
  return (
    <View tw="flex-row">
      <A
        href="https://twitter.com/skyhitz"
        aria-label="Read more about Skyhitz on twitter"
        // @ts-expect-error react-native-web only types
        hrefAttrs={{
          target: "_blank",
          rel: "noreferrer",
        }}
      >
        <Twitter />
      </A>
      <A
        href="https://discord.gg/2C3HzsPEuZ"
        aria-label="Join our server on Discord"
        // @ts-expect-error react-native-web only types
        hrefAttrs={{
          target: "_blank",
          rel: "noreferrer",
        }}
      >
        <Discord />
      </A>
      <A
        href="https://instagram.com/skyhitz"
        aria-label="Read more about Skyhitz on instagram"
        // @ts-expect-error react-native-web only types
        hrefAttrs={{
          target: "_blank",
          rel: "noreferrer",
        }}
      >
        <Insta />
      </A>
      <A
        href="https://github.com/skyhitz"
        aria-label="Audit the code of Skyhitz on github"
        // @ts-expect-error react-native-web only types
        hrefAttrs={{
          target: "_blank",
          rel: "noreferrer",
        }}
      >
        <Github />
      </A>
    </View>
  )
}

export default SocialLinks
