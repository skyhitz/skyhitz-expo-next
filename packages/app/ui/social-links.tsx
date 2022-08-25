import { View } from "app/design-system";
import { A } from "dripsy";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ICON_SIZE = 18;

const SocialLinks = () => {
  return (
    <View className="flex-row">
      <A
        style={{ marginRight: 8 }}
        href="https://twitter.com/skyhitz"
        aria-label="Read more about Skyhitz on twitter"
        // @ts-expect-error react-native-web only types
        hrefAttrs={{
          target: "_blank",
          rel: "noreferrer",
        }}
      >
        <Icon name="twitter" size={ICON_SIZE} />
      </A>
      <A
        style={{ marginRight: 8 }}
        href="https://discord.gg/2C3HzsPEuZ"
        aria-label="Join our server on Discord"
        // @ts-expect-error react-native-web only types
        hrefAttrs={{
          target: "_blank",
          rel: "noreferrer",
        }}
      >
        <Icon name="discord" size={ICON_SIZE} />
      </A>
      <A
        style={{ marginRight: 8 }}
        href="https://instagram.com/skyhitz"
        aria-label="Read more about Skyhitz on instagram"
        // @ts-expect-error react-native-web only types
        hrefAttrs={{
          target: "_blank",
          rel: "noreferrer",
        }}
      >
        <Icon name="instagram" size={ICON_SIZE} />
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
        <Icon name="github" size={ICON_SIZE} />
      </A>
    </View>
  );
};

export default SocialLinks;
