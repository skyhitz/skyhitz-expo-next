import { View } from "app/design-system";
import { useCallback } from "react";
import { Image, StyleProp, ViewStyle } from "react-native";
import { Link } from "solito/link";
import { tw } from "app/design-system/tailwind";
import { useSafeArea } from "app/provider/safe-area/useSafeArea";
import Search from "app/ui/icons/search";
import User from "app/ui/icons/user";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

const LinkStyle: StyleProp<ViewStyle> = {
  flex: 1,
  flexBasis: 0,
  padding: 10,
  alignItems: "center",
  justifyContent: "center",
  maxHeight: 64,
};

export default function DashboardTabBar({
  column,
  currentTabName,
}: {
  column?: boolean;
  currentTabName: string;
}) {
  const isActive = useCallback(
    (tabName: string): boolean => {
      return currentTabName === tabName;
    },
    [currentTabName]
  );

  const insets = useSafeArea();
  const user = useRecoilValue(userAtom);
  const rootViewStyle = column
    ? "flex-col"
    : "flex-row border-t-2 border-white";

  return (
    <View
      className={`flex bg-blue-dark ${rootViewStyle} pb-[${insets.bottom}px]`}
    >
      <Link viewProps={{ style: LinkStyle }} href="/dashboard/search">
        <Search
          size={28}
          color={isActive("search") ? tw.color("blue") : tw.color("white")}
        />
      </Link>
      <Link viewProps={{ style: LinkStyle }} href="/dashboard/chart">
        <Image
          style={
            isActive("chart")
              ? tw`w-8 h-8 rounded-full border-2 border-tab border-blue`
              : tw`w-8 h-8 rounded-full border-2 border-tab`
          }
          source={require("app/assets/images/icon.png")}
        />
      </Link>
      {user && (
        <Link viewProps={{ style: LinkStyle }} href="/dashboard/profile">
          <User
            size={28}
            color={isActive("profile") ? tw.color("blue") : tw.color("white")}
          />
        </Link>
      )}
    </View>
  );
}
