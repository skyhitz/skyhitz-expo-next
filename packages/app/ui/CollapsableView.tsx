import { IconProps } from "app/types";
import { tw } from "app/design-system/tailwind";
import { ReactNode, useState } from "react";
import { Pressable, Text, View } from "app/design-system";
import ChevronDown from "app/ui/icons/chevron-down";
import ChevronUp from "app/ui/icons/chevron-up";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from "react-native-reanimated";

type Props = {
  initCollapsed?: boolean;
  children?: ReactNode;
  icon?: (_: IconProps) => ReactNode;
  headerText: string;
  className?: string;
};

const springAnimationConfig = {
  damping: 60,
  mass: 0.1,
  stiffnes: 150,
  restDisplacementThreshold: 0.1,
};

const iconStyle: IconProps = {
  size: 24,
  color: tw.color("white"),
};

const DEFAULT_HEIGHT = 100;

export const CollapsableView = ({
  children,
  initCollapsed,
  headerText,
  icon,
  className,
}: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(initCollapsed === true);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const collapsableHeight = useSharedValue(initCollapsed ? 0 : height);

  const collapsibleStyle = useAnimatedStyle(() => {
    const borderTopWidth = interpolate(
      collapsableHeight.value,
      [1, 5],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      height: collapsableHeight.value,
      borderTopWidth,
    };
  });

  return (
    <View
      className={`border-[0.5px] mt-4 border-grey-light rounded-lg bg-blue-transparent w-full overflow-hidden ${
        className ?? ""
      }`}
    >
      <View className="flex flex-row items-center p-5 ">
        {icon && icon(iconStyle)}
        <Text className="flex-1 mx-2 font-bold">{headerText}</Text>
        <Pressable
          onPress={() => {
            collapsableHeight.value = withSpring(
              collapsed ? height : 0,
              springAnimationConfig
            );
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? (
            <ChevronDown {...iconStyle} />
          ) : (
            <ChevronUp {...iconStyle} />
          )}
        </Pressable>
      </View>
      <Animated.View
        style={[
          tw.style("border-grey-light overflow-hidden"),
          collapsibleStyle,
        ]}
      >
        <View
          onLayout={(e) => {
            if (!initialized) {
              setInitialized(true);
              setHeight(e.nativeEvent.layout.height);
              if (!collapsed) {
                collapsableHeight.value = e.nativeEvent.layout.height;
              }
            }
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};
