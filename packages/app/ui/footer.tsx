import SocialLinks from "./socialLinks";
import { TextLink, View } from "app/design-system";

const Footer = () => {
  return (
    <View className="flex flex-row justify-end items-center h-14 w-full px-8">
      <TextLink tw="mr-5 text-base leading-none" href="/accounts/terms">
        Terms of Use
      </TextLink>
      <TextLink tw="mr-5 text-base leading-none" href="/accounts/privacy">
        Privacy Policy
      </TextLink>
      <SocialLinks />
    </View>
  );
};

export default Footer;
