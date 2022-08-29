/* eslint-disable jsx-a11y/alt-text */
import { View } from "app/design-system";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Image, StyleProp, ViewStyle } from "react-native";
import { Link } from "solito/link";
import { tw } from "app/design-system/tailwind";
import { useSafeArea } from "app/provider/safe-area/use-safe-area";

const LinkStyle: StyleProp<ViewStyle> = {
  flex: 1,
  flexBasis: 0,
  padding: 10,
  alignItems: "center",
  justifyContent: "center",
  maxHeight: 64,
};

export default function DashboardTabBar({ column }: { column?: boolean }) {
  const insets = useSafeArea();
  const rootViewStyle = column
    ? "flex-col"
    : "flex-row border-t-2 border-white";

  return (
    <View
      className={`flex bg-blue-dark  ${rootViewStyle} pb-[${insets.bottom}px]`}
    >
      <Link viewProps={{ style: LinkStyle }} href={"/dashboard/search"}>
        <Icon name="magnify" size={32} color="white" />
      </Link>
      <Link viewProps={{ style: LinkStyle }} href={"/dashboard/chart"}>
        <Image
          style={tw`w-8 h-8 rounded-full border border-white`}
          source={require("app/assets/images/icon.png")}
        />
      </Link>
      <Link viewProps={{ style: LinkStyle }} href={"/dashboard/profile"}>
        <Icon name="account-outline" size={32} color="white" />
      </Link>
    </View>
  );
}