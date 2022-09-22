import { Pressable, View } from "app/design-system";
import Twitter from "app/ui/icons/twitter";
import Discord from "app/ui/icons/discord";
import Instagram from "app/ui/icons/instagram";
import Github from "app/ui/icons/github";
import { tw } from "app/design-system/tailwind";
import { Linking } from "react-native";

const iconSize = 18;
const iconColor = tw.color("white");

const SocialLinks = () => {
  return (
    <View className="flex-row">
      <Pressable
        className="mr-2"
        onPress={() => Linking.openURL("https://twitter.com/skyhitz")}
        aria-label="Read more about Skyhitz on twitter"
      >
        <Twitter size={iconSize} color={iconColor} />
      </Pressable>
      <Pressable
        className="mr-2"
        onPress={() => Linking.openURL("https://discord.com/invite/2C3HzsPEuZ")}
        aria-label="Join our server on Discord"
      >
        <Discord size={iconSize} color={iconColor} />
      </Pressable>
      <Pressable
        className="mr-2"
        onPress={() => Linking.openURL("https://instagram.com/skyhitz")}
        aria-label="Read more about Skyhitz on instagram"
      >
        <Instagram size={iconSize} color={iconColor} />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL("https://github.com/skyhitz")}
        aria-label="Audit the code of Skyhitz on github"
      >
        <Github size={iconSize} color={iconColor} />
      </Pressable>
    </View>
  );
};

export default SocialLinks;
