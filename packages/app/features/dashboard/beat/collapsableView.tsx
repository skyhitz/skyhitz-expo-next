import { IconProps } from "app/types";
import { tw } from "app/design-system/tailwind";
import { ReactNode, useState } from "react";
import { Pressable, Text, View } from "app/design-system";
import ChevronDown from "app/ui/icons/chevron-down";
import ChevronUp from "app/ui/icons/chevron-up";

type Props = {
  initCollapsed?: boolean;
  children?: ReactNode;
  icon?: (_: IconProps) => ReactNode;
  headerText: string;
  className?: string;
};
const iconStyle: IconProps = {
  size: 24,
  color: tw.color("white"),
};
export const CollapsableView = ({
  children,
  initCollapsed,
  headerText,
  icon,
  className,
}: Props) => {
  const [collapsed, setCollapsed] = useState(initCollapsed);

  return (
    <View
      className={`border-[0.5px] mt-4 border-grey-light rounded-lg ${
        className ?? ""
      }`}
    >
      <View className="flex flex-row items-center p-5 ">
        {icon && icon(iconStyle)}
        <Text className="flex-1 mx-2 font-bold">{headerText}</Text>
        <Pressable onPress={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <ChevronDown {...iconStyle} />
          ) : (
            <ChevronUp {...iconStyle} />
          )}
        </Pressable>
      </View>
      <View
        className={`border-t-[0.5px] border-grey-light ${
          collapsed || !children ? "hidden" : ""
        }`}
      >
        {children}
      </View>
    </View>
  );
};